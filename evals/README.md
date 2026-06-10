# Drafter evals

Geautomatiseerde testset die meet hoe betrouwbaar `drafter-chat` juridische wijzigingen voorstelt —
met de nadruk op **Track Changes**: raakt een "pas artikel 5 aan" écht alleen artikel 5, en is elke
voorgestelde wijziging ook daadwerkelijk in Word te plaatsen? Sinds 10 jun 2026 met een tweede laag:
een **LLM-judge** (`drafter-judge`) die de juridisch-inhoudelijke kwaliteit beoordeelt.

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
| typografie (gekrulde quotes, harde spaties) niet gekopieerd | `find` matcht niet |
| bijlage met eigen artikelnummering | verkeerde "artikel N" geraakt |
| document afgekapt op 24k tekens (client-cap) | model fabriceert een wijziging die het niet kan zien |

**Realisme:** de runner bootst de Word-client na — `context.body` wordt op 24.000 tekens gekapt
(+ `bodyTruncated`-vlag), exact zoals `getContext()` in `word.js`; de plaatsbaarheids-scoring toetst
tegen het volledige document (Word's `search` doorzoekt immers alles). Suggesties die de server als
`applicable: false` markeert tellen als niet-geplaatst (zo slaat `word.js` ze ook over).

## Draaien

```bash
node evals/run.mjs                          # alle 67 cases, mechanische scoring
node evals/run.mjs --smoke                  # eerste 5 (snelle rooktest)
node evals/run.mjs --only arb-01-salaris,fr-51-typografie-quotes
node evals/run.mjs --failuremode typografie # alleen cases met deze faalmodus
node evals/run.mjs --tag baseline --repeat 3   # variantie: elke case 3× (pass = 3/3)
node evals/run.mjs --judge --tag final         # + juridische LLM-judge-pass
node evals/run.mjs --concurrency 6 --timeout 150000
```

Config via env (defaults zijn publiek-veilig — publishable key, RLS-afgeschermd):
`DRAFTER_FUNCTIONS_BASE`, `DRAFTER_ANON_KEY`, `DRAFTER_PROFILE`. Worden anders uit `.env` gelezen.

Output: console-tabel + `evals/report/latest.json` (volledig, incl. ruwe model-output) en
`evals/report/latest.md` (samenvatting per categorie én per faalmodus + niet-toepasbare suggesties +
judge-bevindingen). Met `--tag x` wordt het rapport ook als `report/x.json|.md` bewaard.

Let op: het live-endpoint heeft rate-limiting (60/min per IP, daglimieten via `drafter_settings`);
de volle set + judge + repeats past daar ruim binnen, maar draai niet meer dan ~5 volle runs per dag.

## De LLM-judge (juridische inhoud)

De mechanische scoring zegt niets over juridische juistheid. Daarvoor is er `--judge`: per case wordt
de eerste run beoordeeld door de Edge Function `drafter-judge` (zelfde gpt-5.5, eigen rubric):

| Dimensie | Gewicht | Vraag |
|---|---|---|
| legal_accuracy | ×3 | juridisch juist, juiste wetsartikelen, geen hallucinaties |
| guardrail | ×2 | dwingend recht herkend → gewaarschuwd of onderbouwd geweigerd |
| completeness | ×2 | alle onderdelen + wettelijk vereiste elementen afgedekt |
| scope_fidelity | ×1 | alleen het gevraagde aangepast |
| clarity | ×1 | helder zakelijk juridisch Nederlands |
| refusal_balance | ×1 | niet onnodig geweigerd / niet klakkeloos uitgevoerd |

Elke dimensie 0–2 ("nvt" telt als 2). Score = gewogen 0–100. Het **verdict is deterministisch**
(server-side afgeleid): `fail` bij legal_accuracy=0 of guardrail=0, anders `pass` ≥ 80,
`borderline` ≥ 60. De judge oordeelt **blind** (kent de testverwachting niet). Beperkingen: het is
zelf-beoordeling door hetzelfde model (cross-model judging — bv. Claude — staat op de backlog) en
reasoning-modellen zijn niet volledig deterministisch; gebruik `--repeat` en periodieke menselijke
steekproeven voor kalibratie.

## Structuur

| Bestand | Inhoud |
|---|---|
| `corpus.mjs` | 11 realistische NL-documenten: arbeids-, huur-, NDA-, AV-, VSO-, opdracht-, aandeelhouders-, verwerkers-, SaaS/licentie-, franchiseovereenkomst (met Bijlage 1 + typografie-traps) + gegenereerde raamovereenkomst van 28k tekens |
| `cases.mjs` | 67 instructies + verwachtingen, elk gelabeld met `failureMode` |
| `lib/score.mjs` | scoring: find-validatie, scope-precisie/recall (bijlage-bewust: target `'B1.2'`), waarde, reply |
| `run.mjs` | runner met 24k-client-cap, concurrency, retry/timeout, `--repeat`, `--judge`, rapportage |
| `report/` | gegenereerde rapporten (`baseline-v2.*` / `improved-v9.*` bewaard als bewijs) |

## Een case toevoegen

Voeg een document toe aan `corpus.mjs` (met `Artikel N`-koppen) en een case aan `cases.mjs`:

```js
{ id: 'kort-en-uniek', doc: 'huur_woonruimte', category: 'value', failureMode: 'waarde',
  question: 'Verhoog de huurprijs in artikel 3 naar € 1.350.',
  expect: { suggestions: 'one', targets: [3], value: '1.350' } }
```

`expect.suggestions`: `'one'` | `'some'` | `'none'` | `'policy'` (juridisch oordeel: edit-met-waarschuwing
óf onderbouwde weigering, beide goed). `targets`: artikelnummers die geraakt mogen worden — gebruik
`'B1.2'` voor artikel 2 van Bijlage 1. `value`: tekst die in een `replace` moet staan. `replyMust`:
minstens één van deze termen moet in de reply staan (borgt dat het juridische punt benoemd wordt).
`failureMode`: label voor clustering in het rapport.

## Resultaten

| | Pass | latency p50 | p95 |
|---|---|---|---|
| baseline (drafter-chat v7, 30 cases) | 20/30 (67%) | 13,2 s | 32,7 s |
| na productie-hardening (v8, 35 cases) | 35/35 (100%) | 10,3 s | 24,8 s |
| **strengere set 67 cases tegen v8** (`baseline-v2`) | 66/67 (99%) | 10,2 s | 20,0 s |
| **v9** (typografie-/uniekheid-/lengte-herstel server-side, truncatie-melding, prompt) | zie `report/improved-v9.*` | | |

De enige v8-fail op de strengere set: `fr-57-herschrijf-lang` (heel artikel herschrijven → één find
van 345 tekens > 255). v9 pakt dit aan met prompt-discipline (splitsen per zin) + server-side
`trimCommonAffixWords`. De typografie-, bijlage-, truncatie- en overal-vervangen-traps hield v8 al —
v9 voegt server-side vangnetten toe zodat dat ook bij model-variantie zo blijft
(`repairedTypografie` / `repairedUniek` / `repairedLengte` in de response tonen wanneer het vangnet
iets repareerde).
