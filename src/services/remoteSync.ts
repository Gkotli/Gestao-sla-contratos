// Sincronização do cache local (localStorage) com um banco compartilhado no Supabase.
//
// Sem VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY o sistema funciona exatamente como antes
// (modo local). Com as variáveis configuradas:
//  - ao abrir, baixa todos os registros e substitui o cache local;
//  - se o banco estiver vazio, envia a base local atual (primeira carga);
//  - cada alteração local vira uma operação na "caixa de saída", enviada ao banco
//    e mantida no localStorage até ser confirmada (sobrevive a queda de rede / F5);
//  - alterações de outros gestores chegam em tempo real e atualizam a tela.
//
// Tabela esperada: veja supabase/schema.sql.

import type { RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';
import { KEYS, SYNCED_COLLECTIONS } from './storageKeys';

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

const TABLE = 'sla_records';
const PAGE_SIZE = 1000;

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
// Aceita o nome antigo (anon) e o novo (publishable) que o painel do Supabase mostra
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

type StatusListener = (status: SyncStatus) => void;
type DataListener = () => void;

let client: SupabaseClient | null = null;
let channel: RealtimeChannel | null = null;
let status: SyncStatus = SUPABASE_URL && SUPABASE_ANON_KEY ? 'connecting' : 'local';
let started = false;
let flushing: Promise<void> | null = null;
const statusListeners = new Set<StatusListener>();
const dataListeners = new Set<DataListener>();

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

function enqueue(ops: OutboxOp[]) {
  if (ops.length === 0) return;
  // Mantém só a última operação por registro
  const byKey = new Map<string, OutboxOp>();
  for (const op of [...readOutbox(), ...ops]) {
    byKey.set(`${op.collection}:${op.id}`, op);
  }
  writeOutbox(Array.from(byKey.values()));
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

// Primeira carga: o banco está vazio, então envia a base local atual.
async function seedRemote(db: SupabaseClient) {
  const rows: RecordRow[] = [];
  for (const [collection, cfg] of Object.entries(SYNCED_COLLECTIONS)) {
    const list = readArray(cfg.key).filter(item => item?.id);
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
async function pull(db: SupabaseClient) {
  const rows = await fetchAllRows(db);
  if (rows.length === 0) {
    await seedRemote(db);
    return;
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

async function flushOnce(db: SupabaseClient) {
  const ops = readOutbox();
  if (ops.length === 0) return;

  const upserts = ops.filter(op => op.data !== null)
    .map(op => ({ collection: op.collection, id: op.id, data: op.data, updated_at: new Date().toISOString() }));
  const deletes = ops.filter(op => op.data === null);

  if (upserts.length > 0) {
    const { error } = await db.from(TABLE).upsert(upserts);
    if (error) throw error;
  }
  for (const op of deletes) {
    const { error } = await db.from(TABLE).delete().match({ collection: op.collection, id: op.id });
    if (error) throw error;
  }

  // Remove do outbox só o que foi enviado sem alteração posterior
  const sent = new Map(ops.map(op => [`${op.collection}:${op.id}`, JSON.stringify(op.data)]));
  writeOutbox(readOutbox().filter(op => sent.get(`${op.collection}:${op.id}`) !== JSON.stringify(op.data)));
}

function flush(): Promise<void> {
  if (!client) return Promise.resolve();
  if (flushing) return flushing;
  const db = client;
  flushing = flushOnce(db)
    .then(() => setStatus('online'))
    .catch(err => {
      console.error('[RemoteSync] Falha ao enviar alterações:', err);
      setStatus('error');
    })
    .finally(() => {
      flushing = null;
      if (readOutbox().length > 0 && status === 'online') void flush();
    });
  return flushing;
}

async function refresh() {
  if (!client) return;
  try {
    await flush();
    const flushFailed = status === 'error';
    await pull(client);
    setStatus(flushFailed ? 'error' : 'online');
  } catch (err) {
    console.error('[RemoteSync] Falha ao atualizar do banco:', err);
    setStatus('error');
  }
}

function subscribeRealtime(db: SupabaseClient) {
  channel = db
    .channel('sla-records')
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
    return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
  },

  getStatus(): SyncStatus {
    return status;
  },

  subscribe(onStatus: StatusListener, onData: DataListener): () => void {
    statusListeners.add(onStatus);
    dataListeners.add(onData);
    onStatus(status);
    return () => {
      statusListeners.delete(onStatus);
      dataListeners.delete(onData);
    };
  },

  async start(): Promise<void> {
    if (!this.isEnabled() || started) return;
    started = true;
    setStatus('connecting');
    try {
      const { createClient } = await import('@supabase/supabase-js');
      client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      await refresh();
      subscribeRealtime(client);
      window.addEventListener('focus', () => void refresh());
      window.addEventListener('online', () => void refresh());
    } catch (err) {
      console.error('[RemoteSync] Não foi possível conectar ao Supabase:', err);
      setStatus('error');
    }
  },

  // Chamado pelo StorageService a cada gravação local: calcula o que mudou e envia.
  recordChange(collection: string, previousRaw: string | null, next: any[]): void {
    if (!this.isEnabled()) return;

    let previous: any[] = [];
    try {
      const parsed = previousRaw ? JSON.parse(previousRaw) : [];
      previous = Array.isArray(parsed) ? parsed : [];
    } catch {}

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

