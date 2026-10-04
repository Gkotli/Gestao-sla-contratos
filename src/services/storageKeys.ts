// Chaves do localStorage (cache local) e o nome da coleção correspondente no banco compartilhado.

export const KEYS = {
  USERS: 'sla_hospital_users_v8',               // só no modo local (no Supabase: tabela profiles)
  CURRENT_USER: 'sla_hospital_current_user_v8', // só no modo local (no Supabase: sessão do Auth)
  SECTORS: 'sla_hospital_sectors_v8',
  SUPPLIERS: 'sla_hospital_suppliers_v8',
  EVALUATIONS: 'sla_hospital_evaluations_v8',
  ACTION_PLANS: 'sla_hospital_action_plans_v8',
  SYNC_OUTBOX: 'sla_hospital_sync_outbox_v1',
  SYNC_OWNER: 'sla_hospital_sync_owner_v1'      // login dono do cache e da caixa de saída
};

// Chaves de versões antigas que guardavam senhas/códigos no navegador — apagadas ao abrir.
export const LEGACY_KEYS = {
  PASSWORD_RESETS: 'sla_hospital_pwd_resets_v8'
};

export interface SyncedCollection {
  key: string;
  // Coleções em que registros novos entram no topo da lista (unshift) — mais recentes primeiro
  newestFirst: boolean;
}

// Usuários não entram aqui: ficam em public.profiles e as senhas no Supabase Auth.
export const SYNCED_COLLECTIONS: Record<string, SyncedCollection> = {
  sectors: { key: KEYS.SECTORS, newestFirst: false },
  suppliers: { key: KEYS.SUPPLIERS, newestFirst: false },
  evaluations: { key: KEYS.EVALUATIONS, newestFirst: true },
  action_plans: { key: KEYS.ACTION_PLANS, newestFirst: true }
};

export function collectionForKey(key: string): string | undefined {
  return Object.keys(SYNCED_COLLECTIONS).find(name => SYNCED_COLLECTIONS[name].key === key);
}
