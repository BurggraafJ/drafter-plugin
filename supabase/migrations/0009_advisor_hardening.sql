-- 0009_advisor_hardening.sql
-- Opvolging van de Supabase security/performance advisors (productie-audit 10 jun 2026):
--   1. is_admin() niet meer door anon aanroepbaar (was: anon EXECUTE op SECURITY DEFINER).
--   2. rls_auto_enable() alleen nog voor postgres/service_role (was: PUBLIC executable).
--   3. drafter_settings: dubbele permissive SELECT-policies opgelost — de "ALL"-schrijfpolicy
--      is gesplitst in INSERT/UPDATE/DELETE zodat SELECT maar één policy heeft.
--   4. Brede default-grants ingetrokken: anon/authenticated hadden INSERT/UPDATE/DELETE/
--      TRUNCATE/REFERENCES/TRIGGER op alle tabellen (Supabase-default). Alle schrijfpaden
--      lopen via SECURITY DEFINER RPC's of service_role; de frontend schrijft nergens direct.
--      NB: TRUNCATE valt NIET onder RLS — intrekken dicht een theoretisch gat.
--   5. Stale tabel-comment drafter_api_calls (verwees nog naar Anthropic/callAnthropic).

-- 1. is_admin: alleen authenticated (admin-UI) + service_role.
revoke execute on function public.is_admin() from anon;

-- 2. rls_auto_enable: intern hulpmiddel, niet via de API aanroepbaar.
revoke execute on function public.rls_auto_enable() from public;
revoke execute on function public.rls_auto_enable() from anon;
revoke execute on function public.rls_auto_enable() from authenticated;

-- 3. drafter_settings: schrijfpolicy splitsen (lost advisor "multiple permissive policies" op).
drop policy if exists "settings admin write" on public.drafter_settings;
create policy "settings admin insert" on public.drafter_settings
  for insert with check (is_admin());
create policy "settings admin update" on public.drafter_settings
  for update using (is_admin()) with check (is_admin());
create policy "settings admin delete" on public.drafter_settings
  for delete using (is_admin());

-- 4. Schrijf- en gevaarlijke grants intrekken voor de API-rollen.
revoke insert, update, delete, truncate, references, trigger
  on public.system_message_profiles, public.system_message_history,
     public.drafter_settings, public.admin_emails,
     public.drafter_api_calls, public.drafter_request_log
  from anon, authenticated;

-- Leesrechten: profielen houden hun kolom-beperkte SELECT (label/slug/sort_order);
-- settings/history blijven leesbaar voor admins via RLS. De pure service-tabellen
-- hoeven óók niet leesbaar te zijn voor de API-rollen.
revoke select on public.admin_emails, public.drafter_api_calls, public.drafter_request_log
  from anon, authenticated;

-- 5. Comment actualiseren (wrapper heet callOpenAI en logt OpenAI-aanroepen).
comment on table public.drafter_api_calls is
  'Telemetrie per OpenAI-aanroep via de callOpenAI-wrapper (edge function, model, tokens, duur, status).';
