-- ─────────────────────────────────────────────────────────────────────────────
-- Drafter — initieel schema
--   system-messages (draft → published → history), instellingen, admin-allowlist,
--   en een log van AI-aanroepen. Schrijven kan alléén via SECURITY DEFINER RPC's;
--   anon/authenticated krijgen geen vrije tabel-toegang (zelfde patroon als Academy).
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. Profielen met system-message ─────────────────────────────────────────────
create table if not exists public.system_message_profiles (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  label         text not null,
  draft_text    text,
  published_text text,
  published_at  timestamptz,
  is_active     boolean not null default true,
  sort_order    int not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
comment on table public.system_message_profiles is
  'System-message profielen voor Drafter. draft_text = preview (admin), published_text = wat de plugin gebruikt.';

-- 2. Historie van publicaties ─────────────────────────────────────────────────
create table if not exists public.system_message_history (
  id            uuid primary key default gen_random_uuid(),
  profile_slug  text not null,
  content       text not null,
  note          text,
  published_at  timestamptz not null default now(),
  published_by  uuid
);
comment on table public.system_message_history is
  'Onveranderlijke snapshot bij elke publicatie van een system-message.';

-- 3. Generieke instellingen (key/value) ───────────────────────────────────────
create table if not exists public.drafter_settings (
  key         text primary key,
  value       jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now()
);
comment on table public.drafter_settings is
  'Globale Drafter-instellingen: model, max_tokens, temperature, default-profiel, enz.';

-- 4. Admin-allowlist ──────────────────────────────────────────────────────────
create table if not exists public.admin_emails (
  email      text primary key,
  created_at timestamptz not null default now()
);
comment on table public.admin_emails is 'Allowlist van beheer-accounts (e-mail uit JWT).';

-- 5. Log van AI-aanroepen (cost-attributie / loop-detectie) ───────────────────
create table if not exists public.drafter_api_calls (
  id             uuid primary key default gen_random_uuid(),
  edge_function  text,
  profile_slug   text,
  model          text,
  input_tokens   int,
  output_tokens  int,
  duration_ms    int,
  status         text,
  error          text,
  created_at     timestamptz not null default now()
);
comment on table public.drafter_api_calls is 'Telemetrie per Anthropic-aanroep via callAnthropic-wrapper.';

-- ── is_admin() helper ─────────────────────────────────────────────────────────
create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.admin_emails
    where email = lower(coalesce((auth.jwt() ->> 'email'), ''))
  );
$$;

-- ── Publieke view: alleen slug+label van actieve profielen (geen prompt-tekst) ─
create or replace view public.drafter_profiles_public as
  select slug, label, sort_order
  from public.system_message_profiles
  where is_active = true;
comment on view public.drafter_profiles_public is
  'Wat de taskpane-dropdown leest: alleen slug+label, nooit de prompt-tekst zelf.';

-- ── RPC: draft opslaan (admin) ────────────────────────────────────────────────
create or replace function public.save_system_message_draft(p_slug text, p_draft text)
returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'not authorized'; end if;
  update public.system_message_profiles
     set draft_text = p_draft, updated_at = now()
   where slug = p_slug;
end;
$$;

-- ── RPC: publiceren (admin) — draft → published + history-snapshot ────────────
create or replace function public.publish_system_message(p_slug text, p_note text default '')
returns void
language plpgsql security definer set search_path = public as $$
declare v_text text;
begin
  if not public.is_admin() then raise exception 'not authorized'; end if;
  update public.system_message_profiles
     set published_text = coalesce(draft_text, published_text),
         published_at = now(), updated_at = now()
   where slug = p_slug
   returning published_text into v_text;
  insert into public.system_message_history (profile_slug, content, note, published_by)
  values (p_slug, v_text, nullif(p_note, ''), auth.uid());
end;
$$;

-- ── RLS ───────────────────────────────────────────────────────────────────────
alter table public.system_message_profiles enable row level security;
alter table public.system_message_history  enable row level security;
alter table public.drafter_settings        enable row level security;
alter table public.admin_emails            enable row level security;
alter table public.drafter_api_calls       enable row level security;

-- Profielen: lezen alleen door admin (de taskpane gebruikt de view + de Edge Function
-- leest server-side met service-role). Schrijven enkel via de SECURITY DEFINER RPC's.
create policy "profiles admin read"  on public.system_message_profiles for select using (public.is_admin());
create policy "history admin read"   on public.system_message_history  for select using (public.is_admin());
create policy "settings admin read"  on public.drafter_settings        for select using (public.is_admin());
create policy "settings admin write" on public.drafter_settings        for all    using (public.is_admin()) with check (public.is_admin());

-- De publieke view erft RLS van de basistabel; geef anon expliciet leesrecht op de view.
grant select on public.drafter_profiles_public to anon, authenticated;

-- ── Seed: standaardprofiel + basisinstellingen ───────────────────────────────
insert into public.system_message_profiles (slug, label, draft_text, published_text, published_at, sort_order)
values (
  'default', 'Standaard juridisch',
  $sys$Je bent Drafter, een juridische AI-assistent die in Microsoft Word meewerkt aan Nederlandse juridische documenten. Je antwoordt feitelijk en bondig, citeert waar mogelijk de relevante wet- of regelgeving, en maakt nooit feiten of bronnen op. Wanneer je een passage verbetert, geef je je voorstel terug als een herschrijving zodat de gebruiker het via Track Changes kan accepteren of weigeren.$sys$,
  $sys$Je bent Drafter, een juridische AI-assistent die in Microsoft Word meewerkt aan Nederlandse juridische documenten. Je antwoordt feitelijk en bondig, citeert waar mogelijk de relevante wet- of regelgeving, en maakt nooit feiten of bronnen op. Wanneer je een passage verbetert, geef je je voorstel terug als een herschrijving zodat de gebruiker het via Track Changes kan accepteren of weigeren.$sys$,
  now(), 0
) on conflict (slug) do nothing;

insert into public.drafter_settings (key, value) values
  ('model', '"claude-opus-4-8"'::jsonb),
  ('max_tokens', '2048'::jsonb),
  ('temperature', '0.3'::jsonb),
  ('default_profile', '"default"'::jsonb)
on conflict (key) do nothing;
