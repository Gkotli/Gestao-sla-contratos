// Edge Function "admin-users": operações de login que exigem a chave service_role,
// que nunca pode ir para o navegador. Só atende usuários com perfil DIRETORIA.
//
//   { action: 'invite', profileId, redirectTo }  → envia convite por e-mail para o perfil
//   { action: 'delete', profileId }              → apaga o login (auth.users) do perfil
//
// Deploy: veja supabase/README.md (CLI ou editor do painel). Mantenha "Verify JWT" ligado.

import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

function reply(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

Deno.serve(async req => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return reply(405, { error: 'Método não permitido' });

  const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
    auth: { persistSession: false, autoRefreshToken: false }
  });

  // Quem está chamando: valida o token do usuário logado e confere o perfil
  const token = (req.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
  const { data: caller, error: callerError } = await admin.auth.getUser(token);
  if (callerError || !caller?.user) return reply(401, { error: 'Sessão inválida' });

  const { data: callerProfile } = await admin
    .from('profiles')
    .select('role')
    .eq('auth_user_id', caller.user.id)
    .maybeSingle();
  if (callerProfile?.role !== 'DIRETORIA') return reply(403, { error: 'Apenas a Diretoria gerencia usuários' });

  let body: { action?: string; profileId?: string; redirectTo?: string };
  try {
    body = await req.json();
  } catch {
    return reply(400, { error: 'Requisição inválida' });
  }

  const { data: profile } = await admin
    .from('profiles')
    .select('id, email, auth_user_id')
    .eq('id', body.profileId ?? '')
    .maybeSingle();
  if (!profile) return reply(404, { error: 'Perfil não encontrado' });

  if (body.action === 'invite') {
    if (profile.auth_user_id) return reply(409, { error: 'already_registered' });
    const { error } = await admin.auth.admin.inviteUserByEmail(profile.email, { redirectTo: body.redirectTo });
    if (error) {
      const already = /already/i.test(error.message);
      return reply(already ? 409 : 400, { error: already ? 'already_registered' : error.message });
    }
    return reply(200, { ok: true });
  }

  if (body.action === 'delete') {
    if (!profile.auth_user_id) return reply(200, { ok: true });
    if (profile.auth_user_id === caller.user.id) return reply(400, { error: 'Não é possível excluir o próprio login' });
    const { error } = await admin.auth.admin.deleteUser(profile.auth_user_id);
    if (error) return reply(400, { error: error.message });
    return reply(200, { ok: true });
  }

  return reply(400, { error: 'Ação desconhecida' });
});
