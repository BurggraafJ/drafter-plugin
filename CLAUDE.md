# Drafter — projectregels voor Claude

Auto-geladen aan het begin van elke Claude-sessie in deze repo. Hard-rules, geborgd boven memory.

Diepe context (architectuur, Office.js/Word.run, database, recipes, admin, dev-flow): laad de skill
`legalmind-word-addin` (`C:\Users\LM\.claude\skills\legalmind-word-addin\`).

## Wat is dit

**Drafter** = de legal-AI **Microsoft Word add-in** van Legal Mind. Een taskpane (paneel in Word)
waarmee juristen juridische vragen stellen, passages laten herschrijven en wijzigingen accepteren
via **Track Changes**. Plus een los **beheer-dashboard** (/admin) voor system-messages en instellingen.

## Stack

- Vite 5 + React 18 (JavaScript, **geen** TypeScript) + react-router-dom 6
- **Office.js** (CDN) + **Word.run** voor documentinteractie; eindproduct = `manifest.xml`
- Conceptuele bootstrap met **Yo Office**; we bouwen de taskpane bewust met **Vite** (huisstack) i.p.v. de webpack-default
- Supabase (eigen project) — user storage + Edge Functions (Deno + TS)
- Vercel auto-deploy bij push naar `main` (host voor taskpane + /admin)
- Auth0 (Office-Add-in-Auth0): **uitgesteld** tot productie — fase 1 taskpane is open, alleen /admin achter Supabase-auth

## ⛔ HARD-RULE: alle document-interactie via `src/office/word.js`

Geen losse `Word.run(...)` in componenten. Importeer helpers uit `src/office/word.js`. Mutaties die
het document veranderen zetten **eerst Track Changes aan** (`changeTrackingMode = trackAll`) zodat élke
edit een herziening is die de jurist accepteert/weigert. Drafter stelt voor, de jurist beslist.

## ⛔ HARD-RULE: Supabase realtime channels via helper

Gebruik NOOIT `supabase.channel('vaste-naam')` direct. Altijd via `createRealtimeChannel(prefix)` uit
`src/lib/supabase.js` (random suffix → geen channel-callback-crash bij StrictMode/dubbele mount).

Pre-flight: `grep -rn "\.channel(" src/ | grep -v createRealtimeChannel | grep -v lib/supabase.js` → leeg.

## ⛔ HARD-RULE: Anthropic-calls via centrale wrapper

Vanuit Edge Functions NOOIT direct `fetch('https://api.anthropic.com/v1/messages')`. Altijd via
`callAnthropic()` uit `supabase/functions/_shared/anthropic-fetch.ts` (logt naar `drafter_api_calls`).

Pre-flight: `node scripts/audit-anthropic-calls.cjs` → exit 0.

## ⛔ HARD-RULE: Versiebeheer

Bron van waarheid: `src/version.js` → `APP_VERSION`. Formaat `MAJOR.MINOR` met 2-cijferige minor
(`0.01`, `0.02`, ...). Elke deploy met zichtbare wijziging: minor +1 in dezelfde commit. MAJOR-bump
ALLEEN op expliciet verzoek van Jelle. De Refresh-knop in het paneel vergelijkt `version.json` met `APP_VERSION`.

## ⛔ HARD-RULE: manifest.xml — de `<Id>` GUID is heilig

Wijzig de `<Id>` in `manifest.xml` (productie) NOOIT na publicatie — Office identificeert de add-in
erop. `manifest.local.xml` heeft bewust een andere `<Id>` zodat dev + prod naast elkaar kunnen sideloaden.
Taskpane draait in een iframe van Office → géén `X-Frame-Options: DENY` (gebruik `frame-ancestors` in CSP).

## ⛔ HARD-RULE: Commit-author MOET matchen met Vercel-account

Commit altijd als `Jelle Burggraaf <burggraaf@legal-mind.nl>` (anders blokkeert Vercel: `COMMIT_AUTHOR_REQUIRED`).

## Belangrijke conventies

- **CSS:** geen inline `style={{}}` behalve data-driven dimensies (scaffold gebruikt nog inline; bij groei → CSS-modules).
- **Bestandscap:** < 400 LOC per file. Splits in sub-files.
- **Hooks scheiden van UI:** data/Office-logica in `src/hooks/` + `src/lib/` + `src/office/`, render in `src/components/`.
- **Geen FooV2-files:** refactor in-place.
- **Schrijven naar Supabase:** alleen via SECURITY DEFINER RPC's; anon krijgt geen vrije tabel-toegang.

## Lokaal draaien

```bash
cd "C:\Users\LM\Documents\-- coding\drafter-plugin"
npm install
npm run dev      # Vite dev-server op https://localhost:3000 (HTTPS verplicht voor Office)
npm run start    # sideload manifest.local.xml in Word desktop
```

## Pre-flight checklist vóór `git push`

1. `npm run build` groen
2. `grep -rn "\.channel(" src/ | grep -v createRealtimeChannel | grep -v lib/supabase.js` — leeg
3. `node scripts/audit-anthropic-calls.cjs` — exit 0
4. `npm run validate` — manifest.xml valide
5. Zichtbare wijziging? Bump `APP_VERSION` (minor +1) in `src/version.js`

## Confluence

Eigen Drafter-tree onder LM-space (root id wordt ingevuld bij setup). Prefix `Drafter — `.
Volledig tree-overzicht: skill `legalmind-word-addin/references/confluence.md`.
