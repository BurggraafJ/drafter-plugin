-- 0010_usage_daily_view.sql
-- Observability: dagelijkse usage per Edge Function (calls, fouten, tokens, latency).
-- security_invoker + geen grants voor anon/authenticated → alleen service_role en de
-- SQL-editor (Jelle) kunnen dit lezen; drafter_api_calls blijft RLS-afgeschermd.
create or replace view public.drafter_usage_daily
with (security_invoker = true) as
select date_trunc('day', created_at)::date as dag,
       edge_function,
       count(*) as calls,
       count(*) filter (where status <> 'ok') as errors,
       sum(coalesce(input_tokens, 0)) as input_tokens,
       sum(coalesce(output_tokens, 0)) as output_tokens,
       round(avg(duration_ms)) as avg_ms
from public.drafter_api_calls
group by 1, 2
order by 1 desc, 2;

revoke select on public.drafter_usage_daily from anon, authenticated;
comment on view public.drafter_usage_daily is
  'Dagelijkse OpenAI-usage per Edge Function (kostenbewaking). Alleen service_role/SQL-editor.';
