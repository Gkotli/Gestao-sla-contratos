// Sincronização do cache local (localStorage) com o banco compartilhado no Supabase.
//
// Sem VITE_SUPABASE_URL / chave o sistema funciona em modo local. Com o Supabase:
//  - a sincronização começa depois do login (start) e termina no logout (stop);
//  - ao entrar, baixa os registros que o perfil pode ver (RLS) e substitui o cache local;
//  - se o banco estiver vazio e quem entrou é da Diretoria, envia a base inicial (primeira carga);
//  - cada alteração local vira uma operação na "caixa de saída", enviada ao banco
//    e mantida no localStorage até ser confirmada (sobrevive a queda de rede / F5);
//  - o fornecedor grava a ciência pela função registrar_ciencia (não tem acesso direto à tabela);
//  - operações recusadas pelo banco (sem permissão) são descartadas e o cache é recarregado;
//  - alterações de outros usuários chegam em tempo real e atualizam a tela.
//
// Tabelas e políticas: veja supabase/README.md.

import type { RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';
import type { UserRole } from '../types';
import { KEYS, SYNCED_COLLECTIONS } from './storageKeys';
import { SUPABASE_CONFIGURED, getSupabase } from './supabaseClient';
import { INITIAL_ACTION_PLANS, INITIAL_EVALUATIONS, INITIAL_SECTORS, INITIAL_SUPPLIERS } from './mockData';

export type SyncStatus = 'local' | 'connecting' | 'online' | 'error';

interface OutboxOp {
  collection: string;
  id: string;
  data: unknown | null; // null = exclusão
}

interface RecordRow {
  collection: string;
  id: string;
  data: any;
  seq?: number;
}

interface SyncSession {
  authUserId: string;
  role: UserRole;
}

const TABLE = 'sla_records';
const PAGE_SIZE = 1000;

const INITIAL_DATA: Record<string, unknown[]> = {
  sectors: INITIAL_SECTORS,
  suppliers: INITIAL_SUPPLIERS,
  evaluations: INITIAL_EVALUATIONS,
  action_plans: INITIAL_ACTION_PLANS
};

type StatusListener = (status: SyncStatus) => void;
type DataListener = () => void;
type RejectedListener = (message: string) => void;

let client: SupabaseClient | null = null;
let channel: RealtimeChannel | null = null;
let session: SyncSession | null = null;
// Muda a cada start/stop: respostas atrasadas de uma sessão anterior são ignoradas
let generation = 0;
let status: SyncStatus = SUPABASE_CONFIGURED ? 'connecting' : 'local';
let flushing: Promise<void> | null = null;
let resyncNeeded = false;
let windowListenersAdded = false;
const statusListeners = new Set<StatusListener>();
const dataListeners = new Set<DataListener>();
const rejectedListeners = new Set<RejectedListener>();

function setStatus(next: SyncStatus) {
  status = next;
  statusListeners.forEach(l => l(next));
}

function notifyData() {
  dataListeners.forEach(l => l());
}

function readArray(key: string): any[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function readOutbox(): OutboxOp[] {
  return readArray(KEYS.SYNC_OUTBOX);
}

function writeOutbox(ops: OutboxOp[]) {
  localStorage.setItem(KEYS.SYNC_OUTBOX, JSON.stringify(ops));
}

function opKey(op: { collection: string; id: string }) {
  return `${op.collection}:${op.id}`;
}

function enqueue(ops: OutboxOp[]) {
  if (ops.length === 0) return;
  // Mantém só a última operação por registro
  const byKey = new Map<string, OutboxOp>();
  for (const op of [...readOutbox(), ...ops]) {
    byKey.set(opKey(op), op);
  }
  writeOutbox(Array.from(byKey.values()));
}

// Tira da caixa de saída a operação enviada, se não foi alterada de novo enquanto isso
function dequeue(sent: OutboxOp) {
  const sentData = JSON.stringify(sent.data);
  writeOutbox(readOutbox().filter(op => opKey(op) !== opKey(sent) || JSON.stringify(op.data) !== sentData));
}

// Cache e caixa de saída de um login não podem vazar para o próximo usuário do navegador
function clearLocalData() {
  Object.values(SYNCED_COLLECTIONS).forEach(cfg => localStorage.removeItem(cfg.key));
  localStorage.removeItem(KEYS.SYNC_OUTBOX);
}

// Aplica uma alteração vinda do banco no cache local, respeitando a ordem da lista.
function applyToCache(collection: string, id: string, data: any | null): boolean {
  const cfg = SYNCED_COLLECTIONS[collection];
  if (!cfg) return false;
  const list = readArray(cfg.key);
  const idx = list.findIndex(item => item?.id === id);
  if (data === null) {
    if (idx < 0) return false;
    list.splice(idx, 1);
  } else if (idx >= 0) {
    if (JSON.stringify(list[idx]) === JSON.stringify(data)) return false;
    list[idx] = data;
  } else if (cfg.newestFirst) {
    list.unshift(data);
  } else {
    list.push(data);
  }
  localStorage.setItem(cfg.key, JSON.stringify(list));
  return true;
}

// Erros que não se resolvem tentando de novo: sem permissão (RLS) ou dado inválido
function isPermanentError(err: any): boolean {
  const code = String(err?.code || '');
  return code === '42501' || code.startsWith('23') || code.startsWith('22') || code === 'PGRST204';
}

async function fetchAllRows(db: SupabaseClient): Promise<RecordRow[]> {
  const rows: RecordRow[] = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await db
      .from(TABLE)
      .select('collection,id,data,seq')
      .order('seq', { ascending: true })
      .range(from, from + PAGE_SIZE - 1);
    if (error) throw error;
    rows.push(...(data as RecordRow[]));
    if (!data || data.length < PAGE_SIZE) return rows;
  }
}

// Primeira carga (banco vazio, só pela Diretoria): envia o cache deste navegador
// ou, se ele estiver vazio, a base oficial de setores/fornecedores.
async function seedRemote(db: SupabaseClient) {
  const rows: RecordRow[] = [];
  for (const [collection, cfg] of Object.entries(SYNCED_COLLECTIONS)) {
    const cached = readArray(cfg.key).filter(item => item?.id);
    const list = cached.length > 0 ? cached : (INITIAL_DATA[collection] as any[]);
    // `seq` cresce na ordem de inserção; listas "mais recentes primeiro" entram invertidas
    const ordered = cfg.newestFirst ? [...list].reverse() : list;
    ordered.forEach(item => rows.push({ collection, id: String(item.id), data: item }));
  }
  for (let i = 0; i < rows.length; i += 500) {
    const { error } = await db.from(TABLE).upsert(rows.slice(i, i + 500));
    if (error) throw error;
  }
  writeOutbox([]);
}

// Substitui o cache local pelo conteúdo do banco, reaplicando o que ainda não foi enviado.
async function pull(db: SupabaseClient, gen: number, allowSeed = true): Promise<void> {
  const rows = await fetchAllRows(db);
  if (gen !== generation) return;
  if (rows.length === 0 && allowSeed && session?.role === 'DIRETORIA') {
    await seedRemote(db);
    return pull(db, gen, false);
  }

  for (const [collection, cfg] of Object.entries(SYNCED_COLLECTIONS)) {
    const items = rows.filter(r => r.collection === collection).map(r => r.data);
    if (cfg.newestFirst) items.reverse();
    localStorage.setItem(cfg.key, JSON.stringify(items));
  }
  for (const op of readOutbox()) {
    applyToCache(op.collection, op.id, op.data);
  }
  notifyData();
}

async function sendOp(db: SupabaseClient, role: UserRole, op: OutboxOp) {
  if (role === 'FORNECEDOR') {
    // O fornecedor só registra ciência/assinatura nas próprias avaliações
    if (op.collection !== 'evaluations' || op.data === null) {
      throw { code: '42501', message: 'Fornecedor só pode registrar ciência de avaliações.' };
    }
    const { data, error } = await db.rpc('registrar_ciencia', { p_evaluation_id: op.id, p_ciencia: op.data });
    if (error) throw error;
    // A data/hora e a identidade da validação são definidas pelo servidor: mostra a versão gravada
    if (data && applyToCache('evaluations', op.id, data)) notifyData();
    return;
  }
  if (op.data === null) {
    const { error } = await db.from(TABLE).delete().match({ collection: op.collection, id: op.id });
    if (error) throw error;
    return;
  }
  const { error } = await db.from(TABLE).upsert({ collection: op.collection, id: op.id, data: op.data });
  if (error) throw error;
}

async function flushOnce(db: SupabaseClient, role: UserRole) {
  const rejected: string[] = [];
  for (const op of readOutbox()) {
    try {
      await sendOp(db, role, op);
    } catch (err: any) {
      if (!isPermanentError(err)) throw err; // rede/sessão: tenta de novo depois
      console.warn(`[RemoteSync] Alteração recusada pelo banco (${opKey(op)}):`, err);
      rejected.push(err?.message || opKey(op));
    }
    dequeue(op);
  }
  if (rejected.length > 0) {
    resyncNeeded = true;
    const message = `${rejected.length} alteração(ões) não foram salvas por falta de permissão e foram desfeitas.`;
    rejectedListeners.forEach(l => l(message));
  }
}

function flush(): Promise<void> {
  if (!client || !session) return Promise.resolve();
  if (flushing) return flushing;
  const db = client;
  const { role } = session;
  const gen = generation;
  flushing = flushOnce(db, role)
    .then(() => {
      if (gen === generation) setStatus('online');
    })
    .catch(err => {
      console.error('[RemoteSync] Falha ao enviar alterações:', err);
      if (gen === generation) setStatus('error');
    })
    .finally(() => {
      flushing = null;
      if (gen !== generation) return;
      if (resyncNeeded) {
        resyncNeeded = false;
        void pull(db, gen).catch(err => console.error('[RemoteSync] Falha ao recarregar:', err));
      }
      if (readOutbox().length > 0 && status === 'online') void flush();
    });
  return flushing;
}

async function refresh() {
  if (!client || !session) return;
  const gen = generation;
  try {
    await flush();
    const flushFailed = status === 'error';
    await pull(client, gen);
    if (gen === generation) setStatus(flushFailed ? 'error' : 'online');
  } catch (err) {
    console.error('[RemoteSync] Falha ao atualizar do banco:', err);
    if (gen === generation) setStatus('error');
  }
}

function subscribeRealtime(db: SupabaseClient) {
  // O Realtime aplica as mesmas políticas (RLS): cada usuário só recebe o que pode ler.
  channel = db
    .channel(`sla-records-${generation}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: TABLE }, payload => {
      const row = (payload.eventType === 'DELETE' ? payload.old : payload.new) as Partial<RecordRow>;
      if (!row?.collection || !row.id) return;
      // Não sobrescreve algo que este navegador alterou e ainda não enviou
      if (readOutbox().some(op => op.collection === row.collection && op.id === row.id)) return;
      const changed = applyToCache(row.collection, row.id, payload.eventType === 'DELETE' ? null : row.data);
      if (changed) notifyData();
    })
    .subscribe();
}

// Outra aba do mesmo navegador gravou no cache: a mudança já está aqui, só falta atualizar a tela.
window.addEventListener('storage', event => {
  if (event.key && Object.values(SYNCED_COLLECTIONS).some(cfg => cfg.key === event.key)) notifyData();
});

export const RemoteSync = {
  isEnabled(): boolean {
    return SUPABASE_CONFIGURED;
  },

  getStatus(): SyncStatus {
    return status;
  },

  subscribe(onStatus: StatusListener, onData: DataListener, onRejected?: RejectedListener): () => void {
    statusListeners.add(onStatus);
    dataListeners.add(onData);
    if (onRejected) rejectedListeners.add(onRejected);
    onStatus(status);
    return () => {
      statusListeners.delete(onStatus);
      dataListeners.delete(onData);
      if (onRejected) rejectedListeners.delete(onRejected);
    };
  },

  hasPendingChanges(): boolean {
    return readOutbox().length > 0;
  },

  // Chamado depois do login, com o perfil vindo do banco.
  async start(user: SyncSession): Promise<void> {
    if (!SUPABASE_CONFIGURED) return;
    if (session?.authUserId === user.authUserId) {
      session.role = user.role;
      return;
    }
    if (session) await this.stop();

    // Se outro login usou este navegador por último, o cache e a caixa de saída eram dele
    if (localStorage.getItem(KEYS.SYNC_OWNER) !== user.authUserId) {
      clearLocalData();
      localStorage.setItem(KEYS.SYNC_OWNER, user.authUserId);
      notifyData();
    }

    generation++;
    session = { ...user };
    setStatus('connecting');
    try {
      client = await getSupabase();
      await refresh();
      subscribeRealtime(client);
      if (!windowListenersAdded) {
        windowListenersAdded = true;
        window.addEventListener('focus', () => void refresh());
        window.addEventListener('online', () => void refresh());
      }
    } catch (err) {
      console.error('[RemoteSync] Não foi possível conectar ao Supabase:', err);
      setStatus('error');
    }
  },

  // Logout: para a sincronização e apaga os dados deste login do navegador.
  async stop(): Promise<void> {
    generation++;
    session = null;
    if (channel && client) {
      const old = channel;
      channel = null;
      await client.removeChannel(old).catch(() => undefined);
    }
    clearLocalData();
    localStorage.removeItem(KEYS.SYNC_OWNER);
    setStatus(SUPABASE_CONFIGURED ? 'connecting' : 'local');
    notifyData();
  },

  // Chamado pelo StorageService a cada gravação local: calcula o que mudou e envia.
  recordChange(collection: string, previous: any[], next: any[]): void {
    if (!session) return;

    const before = new Map(previous.filter(i => i?.id).map(i => [String(i.id), JSON.stringify(i)]));
    const ops: OutboxOp[] = [];
    const seen = new Set<string>();

    for (const item of next) {
      if (!item?.id) continue;
      const id = String(item.id);
      seen.add(id);
      if (before.get(id) !== JSON.stringify(item)) ops.push({ collection, id, data: item });
    }
    for (const id of before.keys()) {
      if (!seen.has(id)) ops.push({ collection, id, data: null });
    }

    enqueue(ops);
    void flush();
  }
};
