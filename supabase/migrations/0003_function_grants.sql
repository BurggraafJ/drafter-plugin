-- ─────────────────────────────────────────────────────────────────────────────
-- Drafter — functie-exposure dichttimmeren
--   SECURITY DEFINER-functies worden bij creatie standaard aan PUBLIC gegrant.
--   Revoke van PUBLIC (zodat anon ze niet kan aanroepen) en grant alleen aan
--   authenticated waar de admin ze nodig heeft. is_admin() is intern (wordt door
--   andere definer-functies aangeroepen als owner) → volledig dicht.
-- ─────────────────────────────────────────────────────────────────────────────

revoke execute on function public.is_admin() from public;

revoke execute on function public.save_system_message_draft(text, text)  from public;
revoke execute on function public.publish_system_message(text, text)     from public;
revoke execute on function public.get_system_message_profile(text)       from public;
revoke execute on function public.list_system_message_profiles()         from public;

grant execute on function public.save_system_message_draft(text, text)  to authenticated;
grant execute on function public.publish_system_message(text, text)     to authenticated;
grant execute on function public.get_system_message_profile(text)       to authenticated;
grant execute on function public.list_system_message_profiles()         to authenticated;
