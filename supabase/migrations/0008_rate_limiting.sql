-- 0008_rate_limiting.sql
-- Rate-limiting voor de open Edge-endpoints (drafter-chat / drafter-judge).
-- De Edge Function hasht het client-IP (SHA-256) en roept drafter_rate_check() aan
-- (service_role-only). Limieten zijn runtime instelbaar via drafter_settings:
--   rate_limit_per_minute     (default 30)   — per IP per minuut
--   rate_limit_per_day_ip     (default 1500) — per IP per 24 uur
--   rate_limit_per_day_global (default 4000) — alle IP's samen per 24 uur (kosten-plafond)

create table if not exists public.drafter_request_log (
  id bigint generated always as identity primary key,
  ip_hash text not null,
  endpoint text not null default 'drafter-chat',
  created_at timestamptz not null default now()
);

comment on table public.drafter_request_log is
  'Request-log voor rate-limiting van de open Drafter-endpoints (IP gehasht; geen persoonsgegevens in klare tekst). Opportunistisch opgeschoond na 48 uur.';

alter table public.drafter_request_log enable row level security;
-- Bewust géén policies: alleen service_role (RLS-bypass) leest/schrijft.

create index if not exists drafter_request_log_ip_time_idx
  on public.drafter_request_log (ip_hash, created_at desc);
create index if not exists drafter_request_log_time_idx
  on public.drafter_request_log (created_at desc);

create or replace function public.drafter_rate_check(p_ip_hash text, p_endpoint text default 'drafter-chat')
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  lim_minute     int := coalesce((select (value #>> '{}')::int from drafter_settings where key = 'rate_limit_per_minute'), 30);
  lim_day_ip     int := coalesce((select (value #>> '{}')::int from drafter_settings where key = 'rate_limit_per_day_ip'), 1500);
  lim_day_global int := coalesce((select (value #>> '{}')::int from drafter_settings where key = 'rate_limit_per_day_global'), 4000);
  v_minute     int;
  v_day_ip     int;
  v_day_global int;
begin
  insert into drafter_request_log (ip_hash, endpoint) values (p_ip_hash, p_endpoint);

  select count(*) into v_minute from drafter_request_log
    where ip_hash = p_ip_hash and created_at > now() - interval '1 minute';
  select count(*) into v_day_ip from drafter_request_log
    where ip_hash = p_ip_hash and created_at > now() - interval '24 hours';
  select count(*) into v_day_global from drafter_request_log
    where created_at > now() - interval '24 hours';

  -- Opportunistische opschoning (~1% van de calls); houdt de tabel klein zonder pg_cron.
  if random() < 0.01 then
    delete from drafter_request_log where created_at < now() - interval '48 hours';
  end if;

  return jsonb_build_object(
    'allowed', v_minute <= lim_minute and v_day_ip <= lim_day_ip and v_day_global <= lim_day_global,
    'reason', case
      when v_minute > lim_minute then 'per_minute'
      when v_day_ip > lim_day_ip then 'per_day_ip'
      when v_day_global > lim_day_global then 'per_day_global'
    end,
    'minute', v_minute, 'day_ip', v_day_ip, 'day_global', v_day_global
  );
end;
$$;

revoke execute on function public.drafter_rate_check(text, text) from public;
revoke execute on function public.drafter_rate_check(text, text) from anon;
revoke execute on function public.drafter_rate_check(text, text) from authenticated;
grant execute on function public.drafter_rate_check(text, text) to service_role;

-- Limieten zichtbaar + instelbaar maken in het admin-dashboard.
insert into public.drafter_settings (key, value) values
  ('rate_limit_per_minute', '30'::jsonb),
  ('rate_limit_per_day_ip', '1500'::jsonb),
  ('rate_limit_per_day_global', '4000'::jsonb)
on conflict (key) do nothing;
