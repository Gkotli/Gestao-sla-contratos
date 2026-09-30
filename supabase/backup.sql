-- =====================================================================
-- Backup automático do SLA de Fornecedores (Supabase)
-- Rode uma vez em: Supabase > SQL Editor > New query > Run
--
-- Cria duas proteções, ambas PRIVADAS (a chave pública do site não lê):
--   1. sla_records_historico: guarda a versão anterior de TODA alteração
--      ou exclusão, na hora (desfaz erros de edição e exclusões)
--   2. sla_records_backup: cópia completa diária, mantida por 30 dias
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. Histórico de alterações e exclusões (gatilho)
-- ---------------------------------------------------------------------
create table if not exists public.sla_records_historico (
  historico_id  bigint      generated always as identity primary key,
  operacao      text        not null,           -- 'UPDATE' ou 'DELETE'
  alterado_em   timestamptz not null default now(),
  collection    text        not null,
  id            text        not null,
  data          jsonb       not null            -- conteúdo ANTES da mudança
);

create index if not exists sla_records_historico_idx
  on public.sla_records_historico (collection, id, alterado_em desc);

create or replace function public.sla_records_guardar_historico()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Ignora gravações que não mudam o conteúdo
  if tg_op = 'UPDATE' and old.data = new.data then
    return new;
  end if;
  insert into public.sla_records_historico (operacao, collection, id, data)
  values (tg_op, old.collection, old.id, old.data);
  return coalesce(new, old);
end;
$$;

drop trigger if exists sla_records_historico_trg on public.sla_records;
create trigger sla_records_historico_trg
  after update or delete on public.sla_records
  for each row execute function public.sla_records_guardar_historico();

-- ---------------------------------------------------------------------
-- 2. Cópia completa diária (pg_cron)
-- ---------------------------------------------------------------------
create table if not exists public.sla_records_backup (
  backup_em   timestamptz not null,
  collection  text        not null,
  id          text        not null,
  data        jsonb       not null,
  primary key (backup_em, collection, id)
);

create or replace function public.sla_backup_diario()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  agora timestamptz := now();
begin
  insert into public.sla_records_backup (backup_em, collection, id, data)
  select agora, collection, id, data from public.sla_records;

  -- Retenção: cópias diárias por 30 dias, histórico de alterações por 180 dias
  delete from public.sla_records_backup   where backup_em   < agora - interval '30 days';
  delete from public.sla_records_historico where alterado_em < agora - interval '180 days';
end;
$$;

-- Se der erro aqui, ative em: Database > Extensions > pg_cron (ou Integrations > Cron)
create extension if not exists pg_cron;

-- Todo dia às 06:00 UTC (03:00 de Brasília)
select cron.unschedule('sla-backup-diario')
where exists (select 1 from cron.job where jobname = 'sla-backup-diario');
select cron.schedule('sla-backup-diario', '0 6 * * *', $$select public.sla_backup_diario();$$);

-- Primeira cópia agora mesmo
select public.sla_backup_diario();

-- ---------------------------------------------------------------------
-- Acesso: RLS ligado e SEM políticas = só o painel do Supabase (SQL Editor)
-- consegue ler. O site e a chave pública não enxergam os backups.
-- ---------------------------------------------------------------------
alter table public.sla_records_historico enable row level security;
alter table public.sla_records_backup    enable row level security;
revoke all on public.sla_records_historico from anon, authenticated;
revoke all on public.sla_records_backup    from anon, authenticated;
revoke all on function public.sla_backup_diario()               from anon, authenticated, public;
revoke all on function public.sla_records_guardar_historico()  from anon, authenticated, public;

-- =====================================================================
-- COMO CONSULTAR / RESTAURAR (rode só o trecho necessário, no SQL Editor)
-- =====================================================================
--
-- Cópias diárias disponíveis:
--   select backup_em, count(*) from sla_records_backup group by 1 order by 1 desc;
--
-- Últimas alterações/exclusões:
--   select alterado_em, operacao, collection, id from sla_records_historico
--   order by alterado_em desc limit 50;
--
-- Restaurar UM registro para a versão anterior (ex.: avaliação apagada/alterada):
--   insert into sla_records (collection, id, data)
--   select collection, id, data from sla_records_historico
--   where collection = 'evaluations' and id = 'COLOQUE_O_ID'
--   order by alterado_em desc limit 1
--   on conflict (collection, id) do update set data = excluded.data, updated_at = now();
--
-- Restaurar TUDO para uma cópia diária (substitui os dados atuais!):
--   begin;
--   delete from sla_records;
--   insert into sla_records (collection, id, data)
--   select collection, id, data from sla_records_backup
--   where backup_em = 'COLE_A_DATA_DA_COPIA';
--   commit;
--
-- Depois de restaurar, peça para os usuários recarregarem o site (F5).
