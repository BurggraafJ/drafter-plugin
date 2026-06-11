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
| `find` bevat een tab | tab = tabelcel-grens; `search()` matcht niet over cellen |
| `find` komt meer dan 1× voor | de **verkeerde** passage wordt aangepast |
| wijziging valt buiten het gevraagde artikel | over-reach: te veel aangepast |
| typografie (gekrulde quotes, harde spaties, § — … ½) niet gekopieerd | `find` matcht niet |
| bijlage met eigen artikelnummering | verkeerde "artikel N" geraakt |
| document afgekapt op 24k tekens (client-cap) | model fabriceert een wijziging die het niet kan zien |
| opmaak-/structuurverzoek (kleur, vet, kolom, logo) | kán niet via tekstvervanging — "doen alsof" is het risico |
| `^` in een zoekstring | `^` is in Word-search speciaal (^p, ^t); `word.js` escapet naar `^^` |

Extra asserties per case: `findMust`/`findMustNot` (is het JUISTE voorkomen verankerd — bv.
"alleen de eerste 'Opdrachtnemer'"), naast scope-targets, `value` en `replyMust`.

**Realisme:** de runner bootst de Word-client na — `context.body` wordt op 24.000 tekens gekapt
(+ `bodyTruncated`-vlag), exact zoals `getContext()` in `word.js`; de plaatsbaarheids-scoring toetst
tegen het volledige document (Word's `search` doorzoekt immers alles). Suggesties die de server als
`applicable: false` markeert tellen als niet-geplaatst (zo slaat `word.js` ze ook over).

## Draaien

```bash
npm run eval                                # alle 89 cases, mechanische scoring
npm run eval:smoke                          # eerste 5 (snelle rooktest)
npm run eval:full                           # volledige set + judge + 2 runs per case
npm run eval:compare -- baseline-v3 final-v12   # A/B: gefixt/gebroken/judge-delta
node evals/run.mjs --only arb-01-salaris,fr-51-typografie-quotes
node evals/run.mjs --failuremode tabel-cel  # alleen cases met deze faalmodus
node evals/run.mjs --tag baseline --repeat 3   # variantie: elke case 3× (pass = 3/3)
node evals/run.mjs --judge --tag final         # + juridische LLM-judge-pass
```

`compare.mjs` exit-code 2 betekent "er is iets gebroken t.o.v. de vorige run" (handig in CI;
let op in `&&`-ketens).

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
| `corpus.mjs` | 13 realistische NL-documenten: arbeids-, huur-, NDA-, AV-, VSO-, opdracht-, aandeelhouders-, verwerkers-, SaaS/licentie-, franchiseovereenkomst (Bijlage 1 + typografie-traps), gegenereerde raamovereenkomst (28k), dienstverleningsovereenkomst met **tab-tabel**, leveringsvoorwaarden met **speciale tekens** (§ — … ½ ’ diacritiek) |
| `cases.mjs` | 89 instructies + verwachtingen, elk gelabeld met `failureMode` |
| `lib/score.mjs` | scoring: find-validatie (incl. tab-celgrens), scope-precisie/recall (bijlage-bewust: `'B1.2'`), waarde, `findMust`/`findMustNot`, reply |
| `run.mjs` | runner met 24k-client-cap, concurrency, retry/timeout, `--repeat`, `--judge`, `--failuremode`, rapportage |
| `compare.mjs` | A/B-vergelijking van twee rapporten: gefixt/gebroken/judge-delta per case en per faalmodus |
| `report/` | gegenereerde rapporten (`baseline-v2/v3.*`, `final-v10/v11/v12.*` bewaard als bewijs) |

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

| | Pass | Judge |
|---|---|---|
| baseline (drafter-chat v7, 30 cases) | 20/30 (67%) | – |
| na productie-hardening (v8, 35 cases) | 35/35 (100%) | – |
| strengere set 67 cases tegen v8 (`baseline-v2`) | 66/67 (99%) | – |
| v10/v11 op 67 cases | 65–67/67 | 91–93/100 |
| **set v3: 89 cases tegen v11** (`baseline-v3`) | 79/89 (89%) | 94/100 |
| **v12 op 89 cases** (`final-v12`) | **87/89 (98%)** | 93/100 |

v3 voegde de faalmodi toe waar v11 doorheen zakte — en v12 dicht ze: **tabel-cellen 0/3 → 3/3**
(prompt: anker binnen één cel), **capability-grens 2/5 → 5/5** (opmaak/kolommen/logo's: eerlijk
"kan niet via tekstvoorstellen" i.p.v. doen-alsof; plus server-side no-op-vangnet),
**enkel-woord-anker 2/3 → 3/3** (greedy `makeUnique` die nu ook 249-tekens-ankers in
template-documenten vindt), **speciale tekens 5/6 → 6/6**. Regressiecheck (`compare.mjs`
final-v11 → final-v12): 0 gebroken op de oude 67. De 2 resterende fails zijn bekende
model-variantie (heel-artikel-herschrijving; huurverhogings-waarschuwing) die in beide versies
±50% optreedt — bewust niet "weggefixt" door de test te versoepelen.
