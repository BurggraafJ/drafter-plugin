-- ─────────────────────────────────────────────────────────────────────────────
-- Drafter — security hardening (n.a.v. Supabase advisors)
--   * vervang de SECURITY DEFINER view door een SECURITY INVOKER view
--   * publieke lees-toegang kolom-scoped: anon ziet alleen slug+label+sort_order
--     van actieve profielen, NOOIT de prompt-tekst
--   * admin leest het volledige profiel via SECURITY DEFINER RPC's i.p.v. directe select
--   * schrijf-RPC's niet door anon aanroepbaar
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. Basistabel: anon/authenticated mogen alleen ACTIEVE rijen zien...
drop policy if exists "profiles admin read" on public.system_message_profiles;
create policy "profiles read active"
  on public.system_message_profiles for select
  to anon, authenticated
  using (is_active = true);

-- ...en alleen de veilige kolommen (nooit draft_text / published_text).
revoke select on public.system_message_profiles from anon, authenticated;
grant select (slug, label, sort_order) on public.system_message_profiles to anon, authenticated;

-- 2. View als SECURITY INVOKER → erft nu de RLS + kolomrechten van de aanroeper.
drop view if exists public.drafter_profiles_public;
create view public.drafter_profiles_public with (security_invoker = on) as
  select slug, label, sort_order
  from public.system_message_profiles
  where is_active = true;
comment on view public.drafter_profiles_public is
  'Publieke profiel-lijst (slug+label+sort_order). security_invoker → erft RLS + kolomrechten van de aanroeper.';

-- 3. Admin leest het volledige profiel (incl. prompt-tekst) via definer-RPC's.
create or replace function public.get_system_message_profile(p_slug text)
returns public.system_message_profiles
language plpgsql stable security definer set search_path = public as $$
declare r public.system_message_profiles;
begin
  if not public.is_admin() then raise exception 'not authorized'; end if;
  select * into r from public.system_message_profiles where slug = p_slug;
  return r;
end;
$$;

create or replace function public.list_system_message_profiles()
returns setof public.system_message_profiles
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'not authorized'; end if;
  return query select * from public.system_message_profiles order by sort_order;
end;
$$;

-- 4. SECURITY DEFINER-functies niet door anon aanroepbaar (admin = authenticated).
revoke execute on function public.save_system_message_draft(text, text) from anon;
revoke execute on function public.publish_system_message(text, text) from anon;
revoke execute on function public.get_system_message_profile(text) from anon;
revoke execute on function public.list_system_message_profiles() from anon;
