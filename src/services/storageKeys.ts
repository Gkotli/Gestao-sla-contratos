// Chaves do localStorage (cache local) e o nome da coleção correspondente no banco compartilhado.

export const KEYS = {
  USERS: 'sla_hospital_users_v8',
  CURRENT_USER: 'sla_hospital_current_user_v8',
  SECTORS: 'sla_hospital_sectors_v8',
  SUPPLIERS: 'sla_hospital_suppliers_v8',
  EVALUATIONS: 'sla_hospital_evaluations_v8',
  ACTION_PLANS: 'sla_hospital_action_plans_v8',
  PASSWORD_RESETS: 'sla_hospital_pwd_resets_v8',
  SYNC_OUTBOX: 'sla_hospital_sync_outbox_v1'
};

export interface SyncedCollection {
  key: string;
  // Coleções em que registros novos entram no topo da lista (unshift) — mais recentes primeiro
  newestFirst: boolean;
}

// Sessão do usuário e códigos de recuperação de senha continuam apenas locais.
export const SYNCED_COLLECTIONS: Record<string, SyncedCollection> = {
  users: { key: KEYS.USERS, newestFirst: false },
  sectors: { key: KEYS.SECTORS, newestFirst: false },
  suppliers: { key: KEYS.SUPPLIERS, newestFirst: false },
  evaluations: { key: KEYS.EVALUATIONS, newestFirst: true },
  action_plans: { key: KEYS.ACTION_PLANS, newestFirst: true }
};

export function collectionForKey(key: string): string | undefined {
  return Object.keys(SYNCED_COLLECTIONS).find(name => SYNCED_COLLECTIONS[name].key === key);
}
