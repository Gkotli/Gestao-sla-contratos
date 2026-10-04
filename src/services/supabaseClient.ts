// Cliente único do Supabase (login + banco). Sem VITE_SUPABASE_URL / chave o sistema roda
// em modo local de demonstração e esta biblioteca nem é baixada.

import type { SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
// Aceita o nome antigo (anon) e o novo (publishable) que o painel do Supabase mostra
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

export const SUPABASE_CONFIGURED = Boolean(SUPABASE_URL && SUPABASE_KEY);

export type AuthLinkType = 'invite' | 'recovery';

// Links de convite e de "esqueci minha senha" voltam para o site com
// #access_token=...&type=invite|recovery. O supabase-js consome esse trecho ao iniciar,
// então o tipo é lido aqui antes, para o app saber que precisa pedir a nova senha.
function readAuthLink(): { type: AuthLinkType | null; error: string | null } {
  try {
    const params = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    const type = params.get('type');
    const error = params.get('error_description');
    return {
      type: type === 'invite' || type === 'recovery' ? type : null,
      error: error ? error.replace(/\+/g, ' ') : null
    };
  } catch {
    return { type: null, error: null };
  }
}

const initialLink = readAuthLink();
let pendingLinkType: AuthLinkType | null = initialLink.type;
export const AUTH_LINK_ERROR = initialLink.error;

export function pendingAuthLink(): AuthLinkType | null {
  return pendingLinkType;
}

export function markPasswordRecovery(): void {
  pendingLinkType = 'recovery';
}

export function clearAuthLink(): void {
  pendingLinkType = null;
  if (window.location.hash) {
    try {
      window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search);
    } catch {}
  }
}

let clientPromise: Promise<SupabaseClient> | null = null;

export function getSupabase(): Promise<SupabaseClient> {
  if (!SUPABASE_CONFIGURED) return Promise.reject(new Error('Supabase não configurado'));
  if (!clientPromise) {
    clientPromise = import('@supabase/supabase-js').then(({ createClient }) =>
      createClient(SUPABASE_URL, SUPABASE_KEY, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
      })
    );
  }
  return clientPromise;
}
