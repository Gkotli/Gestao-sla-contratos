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
| Recuperação de senha por EmailJS + código salvo no navegador | Primeiro acesso e "esqueci a senha" por link enviado ao próprio e-mail (Supabase) |
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
- `functions/admin-users/index.ts` — Edge Function do "primeiro acesso / esqueci a senha" e das ações da Diretoria (senha provisória, exclusão de login); usa a chave service_role no servidor.

---

## Como o usuário cria e recupera a senha

- **A Diretoria não recebe nenhum e-mail** quando uma conta é criada ou acessada.
- **Primeiro acesso:** a Diretoria cadastra a pessoa em Gestão de Usuários (só nome, e-mail,
  perfil e setor/fornecedor). No login, a pessoa clica em **"Primeiro acesso ou esqueci a
  senha"**, informa o e-mail e recebe **no próprio e-mail** o link para criar a senha.
- **Esqueci a senha:** o mesmo botão envia o link de redefinição para o e-mail cadastrado.
- Só e-mails cadastrados pela Diretoria recebem o link, e a tela não informa se um e-mail está
  cadastrado (evita que alguém descubra contas).
- **Alternativa**, se o e-mail não chegar: a Diretoria define uma senha provisória no cartão do
  usuário; no primeiro acesso o sistema obriga a pessoa a criar a própria senha.

## Antes da produção: ensaio num projeto de teste (recomendado)

A migração tira o acesso público ao banco e troca o login. Um erro no meio deixaria todos
sem acesso, por isso ensaie antes num projeto separado (o plano gratuito permite 2 projetos):

1. No Supabase, crie um projeto novo (ex.: `gesta-sla-teste`, região São Paulo).
2. No SQL Editor dele rode, nesta ordem: `schema.sql`, `backup.sql` e `migrations/002_auth_rls.sql`.
3. Faça os passos 2, 5 e 6 abaixo nesse projeto. Para o teste não precisa de SMTP: o envio
   padrão do Supabase entrega para os e-mails da equipe do projeto (o seu).
4. Na Vercel, em **Settings → Environment Variables**, edite `VITE_SUPABASE_URL` e
   `VITE_SUPABASE_PUBLISHABLE_KEY` **só para o ambiente Preview** com os dados do projeto de teste.
5. Abra o pull request: o link de prévia da Vercel usará o banco de teste. Entre como Diretoria
   (passo 7), cadastre um Gestor e um Fornecedor e confira, entrando com cada um, o que cada
   perfil vê e consegue gravar. Teste também "Primeiro acesso ou esqueci a senha" com o seu e-mail.
6. Deu tudo certo? Siga o passo a passo abaixo no projeto de produção.

## Passo a passo (produção)

> Faça os passos 1 a 6 **antes** de publicar o novo frontend. Entre o passo 5 (SQL) e o passo 8
> (deploy) o site antigo deixa de funcionar — faça-os em sequência, em horário de pouco uso.

### 1. Backup

O backup automático (`backup.sql`) já guarda uma cópia diária e o histórico de alterações.
Antes de migrar, baixe também uma cópia manual: no site, **Gestão de Usuários → Baixar Backup**.

### 2. Autenticação

**Authentication → Sign In / Providers → Email**
- **Email**: habilitado.
- **Allow new users to sign up**: **desligado** (ninguém se cadastra sozinho; só e-mails
  cadastrados pela Diretoria recebem o link de primeiro acesso).
- **Minimum password length**: 8.

**Authentication → URL Configuration**
- **Site URL**: `https://www.slarededor.com.br`
- **Redirect URLs** (adicione): `https://www.slarededor.com.br/**`, `https://slarededor.com.br/**`
  e, para o ensaio, o endereço das prévias da Vercel (ex.: `https://*-vila-nova-star.vercel.app/**`).

### 3. Envio de e-mails para os usuários (SMTP)

O envio padrão do Supabase só entrega para a equipe do projeto e tem limite baixo por hora.
Para os links chegarem aos gestores e fornecedores, em **Authentication → Emails → SMTP
Settings** habilite **Custom SMTP**. Opção mais simples: uma conta Gmail própria do sistema com
"senha de app" (Conta Google → Segurança → Verificação em duas etapas → Senhas de app):
host `smtp.gmail.com`, porta `465`, usuário = o e-mail da conta, senha = a senha de app
(limite de ~500 e-mails/dia). Nome do remetente sugerido: "SLA de Fornecedores — Rede D'Or".

### 4. Modelos de e-mail em português

Em **Authentication → Emails → Templates**:

**Invite user** (primeiro acesso) — Assunto: `Crie sua senha — SLA de Fornecedores`
```html
<h2>Crie a sua senha de acesso</h2>
<p>Recebemos o pedido de primeiro acesso ao sistema SLA de Fornecedores para este e-mail.</p>
<p><a href="{{ .ConfirmationURL }}">Clique aqui para criar sua senha e entrar</a></p>
<p>O link é pessoal, vale por tempo limitado e só pode ser usado uma vez. Se você não fez este pedido, ignore este e-mail.</p>
```

**Reset Password** — Assunto: `Redefinição de senha — SLA de Fornecedores`
```html
<h2>Redefinição de senha</h2>
<p>Recebemos um pedido para redefinir a senha do seu acesso ao sistema SLA de Fornecedores.</p>
<p><a href="{{ .ConfirmationURL }}">Clique aqui para criar uma nova senha</a></p>
<p>Se você não fez este pedido, ignore este e-mail: sua senha atual continua valendo.</p>
```

### 5. Rodar a migração

No **SQL Editor**, cole e execute todo o conteúdo de `migrations/002_auth_rls.sql`.
Ela roda dentro de uma transação: se algo falhar, nada é alterado. Confira:

```sql
-- Perfis migrados (não há coluna de senha)
select id, email, role, setor_id, fornecedor_id, auth_user_id is not null as tem_login
from public.profiles order by role, nome;

-- Deve retornar 0: a coleção antiga de usuários foi apagada
select count(*) from public.sla_records where collection = 'users';

-- Políticas ativas (nenhuma deve ser "to anon")
select policyname, roles, cmd from pg_policies where tablename in ('sla_records', 'profiles');
```

### 6. Publicar a Edge Function `admin-users`

Ela atende o "Primeiro acesso ou esqueci a senha" e as ações da Diretoria (senha provisória e
exclusão de logins), usando a chave service_role **no servidor**. Em **Edge Functions → Deploy
a new function → Via Editor**, nome `admin-users`, cole o conteúdo de
`functions/admin-users/index.ts` e publique. Depois, nas configurações da função, **desligue
"Verify JWT"**: o primeiro acesso é feito por quem ainda não entrou, e as ações da Diretoria
conferem o login dentro da própria função. As variáveis `SUPABASE_URL` e
`SUPABASE_SERVICE_ROLE_KEY` já existem nas funções.

### 7. Primeiro acesso da Diretoria

Em **Authentication → Users → Add user → Create new user**: e-mail do administrador
(`gabriel.kotliarenko@vilanovastar.com.br`), uma senha forte e **Auto Confirm User** marcado.
O login é ligado ao perfil automaticamente (pelo e-mail).

### 8. Publicar o frontend

- Faça o merge do pull request (a Vercel publica sozinha).
- Em **Vercel → Settings → Environment Variables**: mantenha `VITE_SUPABASE_URL` e
  `VITE_SUPABASE_PUBLISHABLE_KEY`; **remova** as `VITE_EMAILJS_*`, que não são mais usadas.
  Nunca coloque a chave service_role/secret na Vercel.

### 9. Avisar os usuários

Os perfis já foram copiados pela migração. Avise a equipe que as senhas antigas ("123")
deixaram de valer e que, no login, cada um deve clicar em **"Primeiro acesso ou esqueci a
senha"** para receber o link no próprio e-mail.

---

## Operação no dia a dia

- **Novo usuário:** Gestão de Usuários → Cadastrar Novo Usuário. A pessoa cria a senha pelo
  "Primeiro acesso" no login.
- **Esqueceu a senha:** "Primeiro acesso ou esqueci a senha" no login. Se o e-mail não chegar,
  a Diretoria define uma senha provisória no cartão do usuário.
- **Remover acesso:** excluir o usuário na tela. O perfil é apagado (o acesso acaba na hora) e
  a Edge Function apaga o login.
- **Trocar perfil/setor:** editar o usuário. Vale no próximo carregamento da página dele.
- **Trocar e-mail:** editar o usuário; a pessoa faz o "Primeiro acesso" com o e-mail novo.

## Modo local de demonstração

Sem `VITE_SUPABASE_URL`/chave, o sistema roda só no navegador com a base de exemplo: entra-se
informando um e-mail da base (sem senha) e é possível alternar entre usuários. Serve para
demonstração e desenvolvimento — **não use com dados reais**. Um aviso aparece no login e no rodapé.

## Problemas comuns

| Sintoma | Causa provável |
|---|---|
| O link de primeiro acesso/redefinição não chega | SMTP não configurado (passo 3), e-mail diferente do cadastrado ou limite de envio. Veja **Authentication → Logs**. |
| O link abre e volta para o login com "link inválido ou expirado" | Link já usado ou expirado, ou o endereço do site não está em Redirect URLs (passo 2). |
| "Seu login não está vinculado a um perfil" | O e-mail do login é diferente do cadastrado em `profiles`. Corrija o e-mail do perfil (o vínculo é refeito sozinho). |
| Erro ao enviar o link logo após publicar | Edge Function não publicada ou com "Verify JWT" ligado (passo 6). |
| "N alteração(ões) não foram salvas por falta de permissão" | O banco recusou uma gravação fora do perfil do usuário; a tela é recarregada com os dados do banco. |
| Gestor não vê nada | Perfil GESTOR sem `setor_id`, ou setor com id diferente do usado nos fornecedores. |
