-- 0007 — HARDENING. Supabase grant nieuwe public-functies automatisch EXECUTE aan anon en
-- authenticated. drafter_openai_key() geeft een Vault-secret terug en mag UITSLUITEND door de
-- Edge Function (service_role) aangeroepen worden — anders kan een anon-caller de key exfiltreren.
revoke execute on function public.drafter_openai_key() from anon, authenticated;
