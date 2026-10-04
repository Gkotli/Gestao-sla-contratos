// Edge Function "admin-users": operações de login que exigem a chave service_role,
// que nunca pode ir para o navegador. Só atende usuários com perfil DIRETORIA.
//
//   { action: 'set_password', profileId, password } → cria o login (se não existir) ou troca a
//                                                     senha, marcando-a como provisória. NÃO envia e-mail.
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

  let body: { action?: string; profileId?: string; password?: string };
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

  if (body.action === 'set_password') {
    const password = String(body.password || '');
    if (password.length < 8) return reply(400, { error: 'weak_password' });
    // A senha provisória obriga a pessoa a criar a própria no primeiro acesso
    const metadata = { precisaTrocarSenha: true };
    if (profile.auth_user_id) {
      const { error } = await admin.auth.admin.updateUserById(profile.auth_user_id, { password, user_metadata: metadata });
      if (error) return reply(400, { error: error.message });
      return reply(200, { ok: true });
    }
    // email_confirm: true = login já confirmado, sem e-mail de confirmação.
    // O gatilho do banco liga o novo login ao perfil pelo e-mail.
    const { error } = await admin.auth.admin.createUser({ email: profile.email, password, email_confirm: true, user_metadata: metadata });
    if (error) return reply(400, { error: error.message });
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
