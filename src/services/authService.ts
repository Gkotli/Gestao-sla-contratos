// Login pelo Supabase Auth e perfis de acesso (tabela public.profiles).
// Usado só quando o Supabase está configurado; no modo local o login é de demonstração.
//
// Quem é o usuário (perfil, setor, fornecedor) vem do banco, e é o banco (RLS) que decide
// o que cada um pode ler e gravar. O navegador nunca guarda nem compara senhas.

import type { Session } from '@supabase/supabase-js';
import { User, UserRole } from '../types';
import { AuthLinkType, clearAuthLink, getSupabase, markPasswordRecovery, pendingAuthLink } from './supabaseClient';

export type AuthState =
  | { status: 'loading' }
  | { status: 'signed_out'; notice?: string }
  | { status: 'no_profile'; email: string }
  | { status: 'set_password'; reason: AuthLinkType; user: User }
  | { status: 'signed_in'; user: User; authUserId: string };

export interface ActionResult {
  ok: boolean;
  message: string;
}

interface ProfileRow {
  id: string;
  auth_user_id: string | null;
  email: string;
  nome: string;
  cargo: string;
  role: UserRole;
  setor_id: string | null;
  fornecedor_id: string | null;
}

const PROFILE_COLUMNS = 'id,auth_user_id,email,nome,cargo,role,setor_id,fornecedor_id';
const FUNCTION_NAME = 'admin-users';

function toUser(row: ProfileRow): User {
  return {
    id: row.id,
    nome: row.nome,
    email: row.email,
    cargo: row.cargo,
    role: row.role,
    setorId: row.setor_id || undefined,
    fornecedorId: row.fornecedor_id || undefined,
    acessoAtivo: Boolean(row.auth_user_id)
  };
}

// Volta sempre para a raiz do site, que precisa estar em "Redirect URLs" no painel
function appUrl(): string {
  return `${window.location.origin}/`;
}

function translateAuthError(error: { code?: string; message?: string; status?: number } | null): string {
  switch (error?.code) {
    case 'invalid_credentials':
      return 'E-mail ou senha incorretos. Por favor, verifique as credenciais informadas.';
    case 'email_not_confirmed':
      return 'Seu acesso ainda não foi ativado. Abra o convite recebido por e-mail ou use "Esqueci minha senha".';
    case 'over_request_rate_limit':
    case 'over_email_send_rate_limit':
      return 'Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente novamente.';
    case 'weak_password':
      return 'Senha fraca. Use pelo menos 8 caracteres, misturando letras e números.';
    case 'same_password':
      return 'A nova senha precisa ser diferente da atual.';
    case 'user_banned':
      return 'Este acesso está bloqueado. Procure a Diretoria Operacional.';
  }
  if (error?.status === 0 || /fetch|network/i.test(error?.message || '')) {
    return 'Sem conexão com o servidor. Verifique a internet e tente novamente.';
  }
  return error?.message || 'Não foi possível concluir a operação.';
}

function translateDbError(error: { code?: string; message?: string }): string {
  if (error.code === '23505') return 'Já existe um usuário cadastrado com este e-mail.';
  if (error.code === '42501') return 'Sem permissão: apenas a Diretoria gerencia usuários.';
  return error.message || 'Erro ao salvar no banco.';
}

async function loadProfile(authUserId: string): Promise<User | null> {
  const db = await getSupabase();
  const { data, error } = await db
    .from('profiles')
    .select(PROFILE_COLUMNS)
    .eq('auth_user_id', authUserId)
    .maybeSingle();
  if (error) throw error;
  return data ? toUser(data as ProfileRow) : null;
}

// Lê a resposta de erro da Edge Function ({ error: '...' }) quando existir
async function functionError(error: any): Promise<{ status: number; code: string }> {
  const response: Response | undefined = error?.context;
  let code = '';
  try {
    code = (await response?.json())?.error || '';
  } catch {}
  return { status: response?.status ?? 0, code };
}

let resolveCurrentSession: (() => void) | null = null;

export const AuthService = {
  // Acompanha a sessão: chama `listener` na abertura e a cada login/logout.
  watch(listener: (state: AuthState) => void): () => void {
    let cancelled = false;
    let unsubscribe = () => {};
    let lastSession: Session | null = null;

    const resolve = async (session: Session | null) => {
      if (cancelled) return;
      if (!session) {
        listener({ status: 'signed_out' });
        return;
      }
      try {
        const user = await loadProfile(session.user.id);
        if (cancelled) return;
        if (!user) {
          listener({ status: 'no_profile', email: session.user.email || '' });
          return;
        }
        // Senha provisória (definida pela Diretoria) obriga a criar a senha pessoal antes de entrar
        const linkType: AuthLinkType | null = pendingAuthLink()
          || (session.user.user_metadata?.precisaTrocarSenha ? 'temporary' : null);
        listener(linkType
          ? { status: 'set_password', reason: linkType, user }
          : { status: 'signed_in', user, authUserId: session.user.id });
      } catch (err) {
        console.error('[AuthService] Falha ao carregar o perfil:', err);
        listener({ status: 'signed_out', notice: 'Não foi possível carregar seu perfil de acesso. Verifique a conexão e entre novamente.' });
      }
    };

    resolveCurrentSession = () => void resolve(lastSession);

    getSupabase()
      .then(db => {
        if (cancelled) return;
        const { data } = db.auth.onAuthStateChange((event, session) => {
          lastSession = session;
          if (event === 'PASSWORD_RECOVERY') markPasswordRecovery();
          if (event === 'TOKEN_REFRESHED') return;
          // A biblioteca pede para não chamar o Supabase dentro deste callback
          setTimeout(() => void resolve(session), 0);
        });
        unsubscribe = () => data.subscription.unsubscribe();
      })
      .catch(err => {
        console.error('[AuthService] Supabase indisponível:', err);
        listener({ status: 'signed_out', notice: 'Não foi possível conectar ao servidor de autenticação.' });
      });

    return () => {
      cancelled = true;
      resolveCurrentSession = null;
      unsubscribe();
    };
  },

  async signIn(email: string, password: string): Promise<string | null> {
    try {
      const db = await getSupabase();
      const { error } = await db.auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
      return error ? translateAuthError(error) : null;
    } catch (err: any) {
      return translateAuthError(err);
    }
  },

  // Sai só neste navegador (o padrão da biblioteca encerraria as sessões em todos os dispositivos)
  async signOut(): Promise<void> {
    clearAuthLink();
    try {
      const db = await getSupabase();
      await db.auth.signOut({ scope: 'local' });
    } catch (err) {
      console.error('[AuthService] Falha ao sair:', err);
    }
  },

  // Define a senha depois de abrir o link de convite ou de recuperação
  async updatePassword(password: string): Promise<string | null> {
    try {
      const db = await getSupabase();
      const { error } = await db.auth.updateUser({ password, data: { precisaTrocarSenha: false } });
      if (error) return translateAuthError(error);
      clearAuthLink();
      resolveCurrentSession?.();
      return null;
    } catch (err: any) {
      return translateAuthError(err);
    }
  },

  // --- Gestão de usuários (a RLS só permite à DIRETORIA; os demais leem o próprio perfil) ---

  async listProfiles(): Promise<User[]> {
    const db = await getSupabase();
    const { data, error } = await db.from('profiles').select(PROFILE_COLUMNS).order('nome');
    if (error) throw error;
    return (data as ProfileRow[]).map(toUser);
  },

  async saveProfile(user: User, isNew: boolean): Promise<string | null> {
    const db = await getSupabase();
    const row = {
      email: user.email.trim().toLowerCase(),
      nome: user.nome.trim(),
      cargo: user.cargo.trim(),
      role: user.role,
      setor_id: user.role === 'FORNECEDOR' ? null : user.setorId || null,
      fornecedor_id: user.role === 'FORNECEDOR' ? user.fornecedorId || null : null
    };
    const { error } = isNew
      ? await db.from('profiles').insert({ id: user.id, ...row })
      : await db.from('profiles').update(row).eq('id', user.id);
    return error ? translateDbError(error) : null;
  },

  // Remove o perfil (o acesso acaba na hora) e, se possível, também o login.
  async deleteProfile(user: User): Promise<ActionResult> {
    const db = await getSupabase();
    let warning = '';
    if (user.acessoAtivo) {
      const { error } = await db.functions.invoke(FUNCTION_NAME, { body: { action: 'delete', profileId: user.id } });
      if (error) {
        warning = ' O login continua cadastrado no Supabase (sem acesso a nenhum dado); '
          + 'se quiser, apague-o em Authentication > Users.';
      }
    }
    const { error } = await db.from('profiles').delete().eq('id', user.id);
    if (error) return { ok: false, message: translateDbError(error) };
    return { ok: true, message: `Usuário ${user.nome} excluído.${warning}` };
  },

  // Cria o login (ou troca a senha) com uma senha provisória. Nenhum e-mail é enviado:
  // a Diretoria entrega a senha à pessoa, que cria a própria no primeiro acesso.
  async setTemporaryPassword(user: User, password: string): Promise<ActionResult> {
    const db = await getSupabase();
    const { error } = await db.functions.invoke(FUNCTION_NAME, {
      body: { action: 'set_password', profileId: user.id, password }
    });
    if (!error) {
      return {
        ok: true,
        message: user.acessoAtivo
          ? `Nova senha provisória definida para ${user.nome}. No próximo acesso, o sistema pedirá que crie a senha pessoal.`
          : `Acesso criado para ${user.nome}. Entregue a senha provisória pessoalmente; no primeiro acesso, o sistema pedirá que crie a senha pessoal.`
      };
    }
    const { status, code } = await functionError(error);
    const detail = status === 404 || status === 0
      ? 'a função admin-users não está publicada no Supabase (veja supabase/README.md).'
      : code === 'weak_password' ? 'a senha provisória precisa ter pelo menos 8 caracteres.' : code || error.message;
    return { ok: false, message: `Não foi possível definir a senha de ${user.nome}: ${detail}` };
  }

};
