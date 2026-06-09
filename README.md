# Drafter — Legal Mind Word add-in

Legal-AI assistent die **in Microsoft Word** meewerkt: juridische vragen stellen, passages laten
herschrijven en wijzigingen accepteren/weigeren via **Track Changes**. Plus een beheer-dashboard
(`/admin`) voor system-messages en instellingen.

> Diepe documentatie (architectuur, Office.js, database, recipes): Claude-skill `legalmind-word-addin`.
> Projectstatus & beslissingen: Confluence-tree `Drafter — …` in de LM-space.

## Stack

| Laag | Keuze |
|---|---|
| Frontend | Vite 5 + React 18 + JavaScript |
| Word-integratie | Office.js (CDN) + Word.run → `manifest.xml` |
| Backend | Supabase (eigen project) + Edge Functions (Deno + TS) |
| AI | Claude via `callAnthropic`-wrapper (Edge Function `drafter-chat`) |
| Hosting | Vercel auto-deploy bij push naar `main` |
| Auth | Fase 1: taskpane open, `/admin` achter Supabase-auth. Auth0 later. |

## Lokaal draaien

```bash
npm install
cp .env.example .env        # vul Supabase URL + anon key in
npm run dev                 # https://localhost:3000  (HTTPS verplicht voor Office)
npm run start               # sideload manifest.local.xml in Word desktop
```

Office vereist HTTPS; `office-addin-dev-certs` levert het lokale certificaat (eenmalig vertrouwen via
`npx office-addin-dev-certs install`).

## Projectstructuur

```
manifest.xml            # productie-manifest (wijst naar Vercel-URL) — <Id> is heilig
manifest.local.xml      # dev-manifest (localhost:3000)
index.html              # laadt office.js van de CDN + de React-bundle
src/
  office/word.js        # ALLE Word.run-interactie + Track Changes (hard-rule)
  lib/                  # supabase client, drafterApi, systemMessages
  hooks/useOfficeReady  # wacht op Office.onReady, detecteert in-Word vs browser
  components/views/
    taskpane/           # het paneel in Word
    admin/              # beheer-dashboard (/admin)
supabase/
  migrations/0001_init.sql
  functions/drafter-chat/      # kern-AI Edge Function
  functions/_shared/anthropic-fetch.ts
scripts/audit-anthropic-calls.cjs
```

## Hard-rules

Zie `CLAUDE.md`. Kort: Word.run alleen via `src/office/word.js` · realtime via `createRealtimeChannel` ·
Anthropic via `callAnthropic` · `APP_VERSION` bumpen bij zichtbare wijziging · `<Id>` in manifest nooit
wijzigen · commit als `Jelle Burggraaf <burggraaf@legal-mind.nl>`.
