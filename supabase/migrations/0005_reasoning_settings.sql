-- ─────────────────────────────────────────────────────────────────────────────
-- Drafter — instellingen voor reasoning-modellen (gpt-5.5).
--   gpt-5.5 is een reasoning-model: een deel van max_completion_tokens gaat naar
--   reasoning. Zonder ruim budget + reasoning_effort blijft de zichtbare output leeg.
-- ─────────────────────────────────────────────────────────────────────────────

update public.drafter_settings set value = '4000'::jsonb, updated_at = now() where key = 'max_tokens';
insert into public.drafter_settings (key, value) values
  ('max_tokens', '4000'::jsonb),
  ('reasoning_effort', '"low"'::jsonb)
on conflict (key) do update set value = excluded.value, updated_at = now();
