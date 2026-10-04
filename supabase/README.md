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
| Recuperação de senha por EmailJS + código salvo no navegador | Nenhum e-mail: a Diretoria define uma senha provisória |
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
- `functions/admin-users/index.ts` — Edge Function para criar logins com senha provisória (sem e-mail) e excluir logins (usa a chave service_role no servidor).

---

## Sem envio de e-mails (decisão atual)

Por enquanto **o sistema não envia nenhum e-mail** aos usuários: não há convite, link de
recuperação nem confirmação. O acesso funciona assim:

1. A Diretoria cadastra a pessoa em **Gestão de Usuários** e define uma **senha provisória**
   (o botão "Gerar" cria uma). O login é criado direto no Supabase, já confirmado.
2. A Diretoria entrega a senha provisória pessoalmente.
3. No primeiro acesso, o sistema obriga a pessoa a **criar a própria senha** (mín. 8 caracteres,
   com letras e números). A provisória deixa de valer.
4. Esqueceu a senha? O login orienta a procurar a Diretoria, que define uma nova senha
   provisória no cartão do usuário ("Nova senha provisória").

Não é preciso configurar SMTP. Se um dia quiserem convites e "Esqueci minha senha" por e-mail,
será preciso configurar um SMTP próprio (o padrão do Supabase só entrega para a equipe do projeto).

## Antes da produção: ensaio num projeto de teste (recomendado)

A migração tira o acesso público ao banco e troca o login. Um erro no meio deixaria todos
sem acesso, por isso ensaie antes num projeto separado (o plano gratuito permite 2 projetos):

1. No Supabase, crie um projeto novo (ex.: `gesta-sla-teste`, região São Paulo).
2. No SQL Editor dele rode, nesta ordem: `schema.sql`, `backup.sql` e `migrations/002_auth_rls.sql`.
3. Faça os passos 2, 4 e 5 abaixo nesse projeto.
4. Na Vercel, em **Settings → Environment Variables**, edite `VITE_SUPABASE_URL` e
   `VITE_SUPABASE_PUBLISHABLE_KEY` **só para o ambiente Preview** com os dados do projeto de teste.
5. Abra o pull request: o link de prévia da Vercel usará o banco de teste. Entre como Diretoria
   (passo 5), cadastre um Gestor e um Fornecedor com senhas provisórias e confira, entrando
   com cada um, o que cada perfil vê e consegue gravar.
6. Deu tudo certo? Siga o passo a passo abaixo no projeto de produção.

## Passo a passo (produção)

> Faça os passos 1 a 4 **antes** de publicar o novo frontend. Entre o passo 3 (SQL) e o passo 6
> (deploy) o site antigo deixa de funcionar — faça-os em sequência, em horário de pouco uso.

### 1. Backup

O backup automático (`backup.sql`) já guarda uma cópia diária e o histórico de alterações.
Antes de migrar, baixe também uma cópia manual: no site, **Gestão de Usuários → Baixar Backup**.

### 2. Autenticação

**Authentication → Sign In / Providers → Email**
- **Email**: habilitado.
- **Allow new users to sign up**: **desligado** (ninguém se cadastra sozinho).
- **Minimum password length**: 8.

**Authentication → URL Configuration**
- **Site URL**: `https://www.slarededor.com.br`

### 3. Rodar a migração

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

### 4. Publicar a Edge Function `admin-users`

Ela cria logins e troca senhas provisórias (sem enviar e-mail) e apaga logins, usando a chave
service_role **no servidor**. Em **Edge Functions → Deploy a new function → Via Editor**, nome
`admin-users`, cole o conteúdo de `functions/admin-users/index.ts` e publique. Mantenha
**Verify JWT** ligado. As variáveis `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` já existem
nas funções.

### 5. Primeiro acesso da Diretoria

Em **Authentication → Users → Add user → Create new user**: e-mail do administrador
(`gabriel.kotliarenko@vilanovastar.com.br`), uma senha forte e **Auto Confirm User** marcado.
Nenhum e-mail é enviado. O login é ligado ao perfil automaticamente (pelo e-mail).

### 6. Publicar o frontend

- Faça o merge do pull request (a Vercel publica sozinha).
- Em **Vercel → Settings → Environment Variables**: mantenha `VITE_SUPABASE_URL` e
  `VITE_SUPABASE_PUBLISHABLE_KEY`; **remova** as `VITE_EMAILJS_*`, que não são mais usadas.
  Nunca coloque a chave service_role/secret na Vercel.

### 7. Criar o acesso dos demais usuários

Entre como administrador e abra **Gestão de Usuários**. Cada cartão mostra "Login: ativo" ou
"sem acesso". Clique em **Criar acesso**, confirme a senha provisória sugerida (ou digite outra)
e entregue-a à pessoa. As senhas antigas ("123") deixam de existir.

---

## Operação no dia a dia

- **Novo usuário:** Gestão de Usuários → Cadastrar Novo Usuário, com senha provisória.
- **Esqueceu a senha:** o administrador clica em "Nova senha provisória" no cartão do usuário.
- **Remover acesso:** excluir o usuário na tela. O perfil é apagado (o acesso acaba na hora) e
  a Edge Function apaga o login.
- **Trocar perfil/setor:** editar o usuário. Vale no próximo carregamento da página dele.
- **Trocar e-mail:** editar o usuário e definir uma nova senha provisória (cria o login do
  e-mail novo).

## Modo local de demonstração

Sem `VITE_SUPABASE_URL`/chave, o sistema roda só no navegador com a base de exemplo: entra-se
informando um e-mail da base (sem senha) e é possível alternar entre usuários. Serve para
demonstração e desenvolvimento — **não use com dados reais**. Um aviso aparece no login e no rodapé.

## Problemas comuns

| Sintoma | Causa provável |
|---|---|
| "Seu login não está vinculado a um perfil" | O e-mail do login é diferente do cadastrado em `profiles`. Corrija o e-mail do perfil (o vínculo é refeito sozinho). |
| "A função admin-users não está publicada" | Faça o passo 4. Enquanto isso, crie logins em Authentication → Users → Create new user. |
| "N alteração(ões) não foram salvas por falta de permissão" | O banco recusou uma gravação fora do perfil do usuário; a tela é recarregada com os dados do banco. |
| Gestor não vê nada | Perfil GESTOR sem `setor_id`, ou setor com id diferente do usado nos fornecedores. |
