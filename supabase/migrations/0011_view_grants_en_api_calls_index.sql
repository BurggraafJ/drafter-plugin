-- 0011_view_grants_en_api_calls_index.sql
-- Productie-readiness-check 11 jun 2026 — twee restpunten uit de advisor/grants-audit:
--   1. De views hielden brede write-grants uit de Supabase default privileges
--      (0009 trok ze in op de TABELLEN; 0010 maakte de usage-view daarna aan en
--      kreeg dezelfde defaults weer mee). drafter_profiles_public is bovendien een
--      auto-updatable simple view — writes liepen al stuk op de ontbrekende
--      table-grants + RLS van system_message_profiles (dubbel slot), maar de
--      grants horen er niet (defense in depth + schone audits).
--   2. drafter_usage_daily aggregeert per dag over drafter_api_calls; zonder index
--      op created_at is dat een seq scan die meegroeit met de telemetrie.

-- 1a. Taskpane-view: alleen lezen (slug/label/sort_order), niets anders.
revoke all on public.drafter_profiles_public from anon, authenticated;
grant select on public.drafter_profiles_public to anon, authenticated;

-- 1b. Operator-view (service_role/SQL-editor): API-rollen volledig eraf.
revoke all on public.drafter_usage_daily from anon, authenticated;

-- 2. Telemetrie-index voor de dag-aggregatie en tijd-gefilterde kostenqueries.
create index if not exists drafter_api_calls_time_idx
  on public.drafter_api_calls using btree (created_at desc);
