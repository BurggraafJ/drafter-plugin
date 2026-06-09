# Drafter evals

Geautomatiseerde testset die meet hoe betrouwbaar `drafter-chat` juridische wijzigingen voorstelt —
met de nadruk op **Track Changes**: raakt een "pas artikel 5 aan" écht alleen artikel 5, en is elke
voorgestelde wijziging ook daadwerkelijk in Word te plaatsen?

## Waarom

In Word wordt een suggestie toegepast via `body.search(find)` → eerste match → `insertText(replace)`
(zie [`src/office/word.js`](../src/office/word.js)). Daaruit volgen de faalmodi die we meten:

| Faalmodus | Gevolg in Word |
|---|---|
| `find` staat niet letterlijk in het document | wijziging wordt niet geplaatst |
| `find` > 255 tekens | `search()` gooit een exception → niets gebeurt |
| `find` bevat een alinea-einde | `search()` matcht niet over alinea's |
| `find` komt meer dan 1× voor | de **verkeerde** passage wordt aangepast |
| wijziging valt buiten het gevraagde artikel | over-reach: te veel aangepast |

## Draaien

```bash
node evals/run.mjs                 # alle 30 cases tegen de live Edge Function
node evals/run.mjs --smoke         # eerste 5 (snelle rooktest)
node evals/run.mjs --only arb-01-salaris,huur-09-huurprijs
node evals/run.mjs --concurrency 6 --tag mijn-experiment
```

Config via env (defaults zijn publiek-veilig — publishable key, RLS-afgeschermd):
`DRAFTER_FUNCTIONS_BASE`, `DRAFTER_ANON_KEY`, `DRAFTER_PROFILE`. Worden anders uit `.env` gelezen.

Output: console-tabel + `evals/report/latest.json` (volledig, incl. ruwe model-output) en
`evals/report/latest.md` (leesbare samenvatting + lijst van niet-toepasbare suggesties).

## Structuur

| Bestand | Inhoud |
|---|---|
| `corpus.mjs` | 6 realistische NL-documenten (arbeids-, huur-, NDA-, AV-, VSO-, opdrachtovereenkomst) met `Artikel N`-koppen |
| `cases.mjs` | 30 instructies + verwachtingen (scope-targets, waarde, beleid) |
| `lib/score.mjs` | scoring: find-validatie, scope-precisie/recall, waarde, reply |
| `run.mjs` | runner met concurrency, retry/timeout, rapportage |
| `report/` | gegenereerde rapporten (`baseline.*` / `improved.*` bewaard als bewijs) |

## Een case toevoegen

Voeg een document toe aan `corpus.mjs` (met `Artikel N`-koppen) en een case aan `cases.mjs`:

```js
{ id: 'kort-en-uniek', doc: 'huur_woonruimte', category: 'value',
  question: 'Verhoog de huurprijs in artikel 3 naar € 1.350.',
  expect: { suggestions: 'one', targets: [3], value: '1.350' } }
```

`expect.suggestions`: `'one'` | `'some'` | `'none'` | `'policy'` (juridisch oordeel: edit-met-waarschuwing
óf onderbouwde weigering, beide goed). `targets`: artikelnummers die geraakt mogen worden. `value`:
tekst die in een `replace` moet staan. `replyMust`: één van deze termen moet in de reply staan.

## Resultaat (8 jun 2026)

| | Pass | latency p50 | p95 |
|---|---|---|---|
| baseline (v7) | 20/30 (67%) | 13,2 s | 32,7 s |
| na productie-hardening (v8) | **30/30 (100%)** | **8,4 s** | **20,6 s** |

De verbetering kwam van: striktere prompt (korte, uniek-binnen-één-alinea `find`), server-side
verfijning (identieke kop-/staartregels wegknippen) + validatie/annotatie (`applicable`), en een
reply-fallback. Zie de bijbehorende skill `drafter-evals` voor het volledige verhaal.
