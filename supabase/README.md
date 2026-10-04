# Supabase — login, perfis de acesso e migração

Este documento é para quem vai aplicar a mudança no projeto Supabase de produção
(www.slarededor.com.br). Tempo estimado: 30–45 minutos, com alguns minutos de indisponibilidade.

## O que muda

| Antes | Depois |
|---|---|
| Usuários na coleção `users` de `sla_records`, com `senha` em texto puro | Perfis em `public.profiles` (sem senha); senhas só no **Supabase Auth** |
| Login conferido no navegador (qualquer um podia ler as senhas pela API) | Login pelo Supabase Auth (e-mail + senha) |
| Política RLS `using (true)` para `anon`: quem tinha o link lia e gravava tudo | `anon` sem acesso; cada perfil só lê/grava o que lhe cabe (tabela abaixo) |
| Filtro de setor/fornecedor só na tela | Filtro aplicado pelo banco (RLS), inclusive no tempo real |
| Recuperação de senha por EmailJS + código salvo no navegador | Link de redefinição enviado pelo próprio Supabase |
| Botão "Acesso rápido" e "Entrar como este usuário" sem senha | Existem apenas no modo local de demonstração |

### Permissões por perfil (aplicadas pelo banco)

| Perfil | Lê | Grava |
|---|---|---|
| **DIRETORIA** | tudo | tudo; único que gerencia usuários, fornecedores e setores |
| **GESTOR** | setor, fornecedores, avaliações e planos de ação do **próprio setor** | avaliações e planos de ação do próprio setor |
| **FORNECEDOR** | as **próprias avaliações** (e planos de ação delas), o próprio cadastro e o nome do setor avaliador | só ciência/assinatura (`statusAssinatura`, `dataCiencia`, `nomeSignatario`, `cargoSignatario`, `parecerFornecedor`, `assinaturaBase64`, `assinaturaDigitalUrl`), pela função `registrar_ciencia` |
| Logado sem perfil / `anon` | nada | nada |

A tela "Gestão de Usuários" continua visível só para o administrador do sistema
(`isSystemAdmin` em `src/utils/security.ts`); o banco permite a qualquer DIRETORIA.

### Arquivos

- `schema.sql` — tabela `sla_records` (base). Só é necessário em projeto novo.
- `migrations/002_auth_rls.sql` — perfis, migração dos usuários, RLS, gatilhos e `registrar_ciencia`. Idempotente.
- `functions/admin-users/index.ts` — Edge Function para convidar/excluir logins (usa a chave service_role no servidor).

---

## Passo a passo (produção)

> Faça os passos 1 a 6 **antes** de publicar o novo frontend. Entre o passo 5 (SQL) e o passo 8
> (deploy) o site antigo deixa de funcionar — faça-os em sequência, em horário de pouco uso.

### 1. Backup

Em **Database → Backups** confira que existe um backup recente. Opcional, para guardar a lista
de usuários atual (sem as senhas) antes da migração, rode no **SQL Editor**:

```sql
select id, data - 'senha' as usuario from public.sla_records where collection = 'users';
```

### 2. Autenticação

**Authentication → Sign In / Providers**
- **Email**: habilitado.
- **Allow new users to sign up**: **desligado** (só entra quem for convidado).
- **Confirm email**: ligado.
- **Minimum password length**: 8 (o app já exige 8).

**Authentication → URL Configuration**
- **Site URL**: `https://www.slarededor.com.br`
- **Redirect URLs** (adicione):
  - `https://www.slarededor.com.br/**`
  - `https://slarededor.com.br/**`
  - `http://localhost:3000/**` (desenvolvimento)

### 3. Envio de e-mails (SMTP)

O servidor de e-mail padrão do Supabase só entrega para membros da equipe do projeto e tem
limite de poucos e-mails por hora — **não serve para produção**. Em
**Authentication → Emails → SMTP Settings**, habilite **Custom SMTP** com o SMTP corporativo
(ou um serviço como Resend, SendGrid, Amazon SES). Remetente sugerido:
`nao-responda@slarededor.com.br`, nome "Gestão de SLA — Rede D'Or".

Depois, em **Authentication → Rate Limits**, ajuste "emails sent per hour" para comportar o
convite inicial de todos os usuários (ex.: 60).

### 4. Modelos de e-mail em português

Em **Authentication → Emails → Templates**:

**Invite user** — Assunto: `Convite: Gestão de SLA e Avaliação de Contratos`
```html
<h2>Você foi convidado(a) para o sistema de Gestão de SLA</h2>
<p>A Diretoria Operacional liberou seu acesso ao sistema de Gestão de SLA e Avaliação de Contratos.</p>
<p><a href="{{ .ConfirmationURL }}">Clique aqui para criar sua senha e entrar</a></p>
<p>O link é pessoal, vale por tempo limitado e só pode ser usado uma vez.</p>
```

**Reset Password** — Assunto: `Redefinição de senha — Gestão de SLA`
```html
<h2>Redefinição de senha</h2>
<p>Recebemos um pedido para redefinir a senha do seu acesso ao sistema de Gestão de SLA.</p>
<p><a href="{{ .ConfirmationURL }}">Clique aqui para criar uma nova senha</a></p>
<p>Se você não fez este pedido, ignore este e-mail: sua senha atual continua valendo.</p>
```

### 5. Rodar a migração

No **SQL Editor**, cole e execute todo o conteúdo de `migrations/002_auth_rls.sql`
(projeto novo: rode antes `schema.sql`). Ela roda dentro de uma transação: se algo falhar,
nada é alterado.

Confira o resultado:

```sql
-- Perfis migrados (não há coluna de senha)
select id, email, role, setor_id, fornecedor_id, auth_user_id is not null as tem_login
from public.profiles order by role, nome;

-- Deve retornar 0: a coleção com senhas foi apagada
select count(*) from public.sla_records where collection = 'users';

-- Políticas ativas (não deve existir nenhuma "to anon")
select policyname, roles, cmd from pg_policies where tablename in ('sla_records', 'profiles');
```

Usuários da coleção antiga com e-mail repetido ou perfil inválido são ignorados — compare a
lista com o backup do passo 1 e cadastre manualmente o que faltar.

### 6. Publicar a Edge Function `admin-users`

Ela envia os convites e apaga logins, usando a chave service_role **no servidor**.

**Opção A — pelo painel:** **Edge Functions → Deploy a new function → Via Editor**, nome
`admin-users`, cole o conteúdo de `functions/admin-users/index.ts` e publique. Mantenha
**Verify JWT** ligado.

**Opção B — pela CLI:**
```bash
npx supabase login
npx supabase functions deploy admin-users --project-ref <ref-do-projeto>
```

As variáveis `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` já existem nas funções; não é
preciso configurar nada. Sem a função o sistema funciona, mas os convites precisam ser
enviados à mão (Authentication → Users → Invite user).

### 7. Primeiro acesso da Diretoria

Em **Authentication → Users → Add user → Send invitation**, informe o e-mail do administrador
(`gabriel.kotliarenko@vilanovastar.com.br`). O login é vinculado ao perfil automaticamente
(pelo e-mail). Abra o convite, crie a senha e confirme que entra como Diretoria.

### 8. Publicar o frontend

- Faça o merge/deploy desta versão na Vercel.
- Em **Vercel → Settings → Environment Variables**: mantenha `VITE_SUPABASE_URL` e
  `VITE_SUPABASE_ANON_KEY` (ou `VITE_SUPABASE_PUBLISHABLE_KEY`); **remova** as
  `VITE_EMAILJS_*`, que não são mais usadas. Nunca coloque a chave service_role/secret ali.

### 9. Convidar os demais usuários

Logado como administrador, abra **Gestão de Usuários**. Cada perfil mostra
"Login: ativo" ou "convite pendente". Clique em **Convidar pendentes (N)** para enviar todos os
convites de uma vez (ou "Enviar convite" em cada um). Avise os gestores que chegará um e-mail
para criarem a própria senha — as senhas antigas ("123") deixam de existir.

Se o envio pela tela falhar, a mensagem explica o motivo; o caminho manual é sempre
**Authentication → Users → Add user → Send invitation** com o e-mail do perfil.

---

## Operação no dia a dia

- **Novo usuário:** Gestão de Usuários → Cadastrar Novo Usuário. O convite sai ao salvar.
- **Esqueceu a senha:** o próprio usuário usa "Esqueci minha senha" no login; ou o
  administrador clica em "Enviar link de nova senha" no cartão do usuário.
- **Remover acesso:** excluir o usuário na tela. O perfil é apagado (o acesso acaba na hora) e
  a Edge Function apaga o login. Se a função não estiver publicada, o login fica em
  Authentication → Users sem acesso a nada; apague-o por lá se quiser.
- **Trocar perfil/setor:** editar o usuário. Vale no próximo carregamento da página dele.
- **Trocar e-mail:** editar o usuário e enviar convite para o novo e-mail. O perfil passa a
  valer para o login que tiver o e-mail novo.

## Modo local de demonstração

Sem `VITE_SUPABASE_URL`/chave, o sistema roda só no navegador com a base de exemplo: entra-se
informando um e-mail da base (sem senha) e é possível alternar entre usuários. Serve para
demonstração e desenvolvimento — **não use com dados reais**. Um aviso aparece no login e no rodapé.

## Problemas comuns

| Sintoma | Causa provável |
|---|---|
| "Seu login não está vinculado a um perfil" | O e-mail do login é diferente do cadastrado em `profiles`. Corrija o e-mail do perfil (o vínculo é refeito sozinho). |
| Convite/recuperação não chega | SMTP customizado não configurado (passo 3) ou limite de e-mails por hora. Veja **Authentication → Logs**. |
| O link do e-mail abre e volta para o login com "link inválido ou expirado" | Link já usado ou expirado, ou a URL do site não está em Redirect URLs (passo 2). |
| "N alteração(ões) não foram salvas por falta de permissão" | O banco recusou uma gravação fora do perfil do usuário; a tela é recarregada com os dados do banco. |
| Gestor não vê nada | Perfil GESTOR sem `setor_id`, ou setor com id diferente do usado nos fornecedores. |
