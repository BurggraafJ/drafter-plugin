-- ─────────────────────────────────────────────────────────────────────────────
-- Drafter — OpenAI als AI-provider.
--   Zet het default-model op gpt-5.5 (aanpasbaar via /admin-instellingen).
--   De key komt uit de Edge Function secret OPENAI_API_KEY (niet in de DB).
-- ─────────────────────────────────────────────────────────────────────────────

update public.drafter_settings set value = '"gpt-5.5"'::jsonb, updated_at = now() where key = 'model';
insert into public.drafter_settings (key, value)
  values ('model', '"gpt-5.5"'::jsonb)
  on conflict (key) do nothing;
