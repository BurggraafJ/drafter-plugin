-- 0006 — OpenAI-key uit Supabase Vault beschikbaar maken voor de Edge Function.
-- De key staat in Vault (vault.secrets, naam 'OpenAI API Key'). De Edge Function draait met de
-- service-role client en leest 'm via deze SECURITY DEFINER RPC. SECURITY DEFINER omdat het
-- vault-schema niet door API-rollen leesbaar is; uitvoering uitsluitend voor service_role.
create or replace function public.drafter_openai_key()
returns text
language sql
security definer
set search_path = ''
as $$
  select decrypted_secret
  from vault.decrypted_secrets
  where name = 'OpenAI API Key'
  limit 1;
$$;

revoke all on function public.drafter_openai_key() from public;
grant execute on function public.drafter_openai_key() to service_role;
