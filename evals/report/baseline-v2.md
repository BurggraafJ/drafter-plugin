# Drafter eval-rapport — baseline-v2

**Pass: 66/67 (99%)** · latency p50 10158ms / p95 20000ms · 188.2s · profiel `default`

Per categorie: value 10/10 · legal 15/15 · add 7/7 · targeted 6/6 · question 5/5 · tone 2/3 · topic 3/3 · long 3/3 · trap 8/8 · multi 4/4 · guardrail 3/3

Per faalmodus: waarde 10/10 · dwingend-recht 14/14 · toevoeging-scope 6/6 · juridische-volledigheid 2/2 · scope-precisie 4/4 · advies-only 5/5 · herformulering-scope 2/2 · clausule-lokalisatie 3/3 · lang-document 3/3 · non-unieke-find 4/4 · multi-wijziging 1/1 · niet-bestaand-doel 2/2 · multi-artikel 1/1 · verwijdering 1/1 · lijst-staffel 1/1 · typografie 2/2 · kruisverwijzing-definitie 1/1 · bijlage-scope 2/2 · multi-alinea-lengte 0/1 · truncatie 1/1 · overal-vervangen-scope 1/1

| | Case | Cat | Faalmodus | ms | #sug | toepasbaar | scope→ | Reden(en) |
|---|---|---|---|---|---|---|---|---|
| ✅ | arb-01-salaris | value | waarde | 5151 | 1 | 1/1 | 5 (doel 5) | — |
| ✅ | arb-02-proeftijd | legal | dwingend-recht | 17260 | 1 | 1/1 | 3 (doel 3) | — |
| ✅ | arb-03-tussentijds | add | toevoeging-scope | 17355 | 1 | 1/1 | 2 (doel 2) | — |
| ✅ | arb-04-concurrentie-motivering | legal | juridische-volledigheid | 19324 | 1 | 1/1 | 7 (doel 7) | — |
| ✅ | arb-05-concurrentie-duur | targeted | scope-precisie | 8982 | 1 | 1/1 | 7 (doel 7) | — |
| ✅ | arb-06-vraag-geldigheid | question | advies-only | 11324 | 0 | 0/0 | – | — |
| ✅ | arb-07-arbeidsduur | value | waarde | 4336 | 1 | 1/1 | 4 (doel 4) | — |
| ✅ | arb-08-geheimhouding-streng | tone | herformulering-scope | 25508 | 1 | 1/1 | 8 (doel 8) | — |
| ✅ | huur-09-huurprijs | value | waarde | 6012 | 1 | 1/1 | 3 (doel 3) | — |
| ✅ | huur-10-opzegtermijn | legal | dwingend-recht | 14834 | 1 | 1/1 | 8 (doel 8) | — |
| ✅ | huur-11-waarborg | legal | dwingend-recht | 13751 | 1 | 1/1 | 6 (doel 6) | — |
| ✅ | huur-12-onderhoud-add | add | toevoeging-scope | 12435 | 1 | 1/1 | 7 (doel 7) | — |
| ✅ | huur-13-indexering | topic | clausule-lokalisatie | 7358 | 1 | 1/1 | 5 (doel 5) | — |
| ✅ | huur-14-wgv | legal | dwingend-recht | 6772 | 0 | 0/0 | – (doel 6) | — |
| ✅ | nda-15-looptijd | value | waarde | 3997 | 1 | 1/1 | 4 (doel 4) | — |
| ✅ | nda-16-boete | value | waarde | 7433 | 1 | 1/1 | 6 (doel 6) | — |
| ✅ | nda-17-forum | targeted | scope-precisie | 7319 | 1 | 1/1 | 7 (doel 7) | — |
| ✅ | nda-18-uitzondering | add | toevoeging-scope | 19721 | 1 | 1/1 | 2 (doel 2) | — |
| ✅ | nda-19-vraag-boete | question | advies-only | 19206 | 0 | 0/0 | – | — |
| ✅ | av-20-opzeg | long | lang-document | 8529 | 1 | 1/1 | 14 (doel 14) | — |
| ✅ | av-21-betaaltermijn-trap | trap | non-unieke-find | 9070 | 1 | 1/1 | 6 (doel 6) | — |
| ✅ | av-22-aansprakelijkheid | tone | herformulering-scope | 23450 | 2 | 2/2 | 12 (doel 12) | — |
| ✅ | av-23-ie-gebruiksrecht | add | toevoeging-scope | 15317 | 1 | 1/1 | 11 (doel 11) | — |
| ✅ | av-24-forum | long | lang-document | 4808 | 1 | 1/1 | 16 (doel 16) | — |
| ✅ | av-25-incasso-multi | multi | multi-wijziging | 12463 | 1 | 1/1 | 7 (doel 7) | — |
| ✅ | vso-26-vergoeding | value | waarde | 11503 | 1 | 1/1 | 3 (doel 3) | — |
| ✅ | vso-27-relatiebeding | targeted | scope-precisie | 11913 | 1 | 1/1 | 5 (doel 5) | — |
| ✅ | vso-28-getuigschrift-add | add | toevoeging-scope | 12088 | 1 | 1/1 | 6 (doel 6) | — |
| ✅ | vso-29-guardrail | guardrail | niet-bestaand-doel | 2994 | 0 | 0/0 | – | — |
| ✅ | zzp-30-tarief | value | waarde | 5592 | 1 | 1/1 | 3 (doel 3) | — |
| ✅ | h31-by-quote | topic | clausule-lokalisatie | 4438 | 1 | 1/1 | 7 (doel 7) | — |
| ✅ | h32-multi-article | multi | multi-artikel | 10928 | 2 | 2/2 | 3,4 (doel 3,4) | — |
| ✅ | h33-broad-multi-instance | trap | non-unieke-find | 7848 | 2 | 2/2 | 3,6 (doel 3,6) | — |
| ✅ | h34-deletion | targeted | verwijdering | 14778 | 1 | 1/1 | 7 (doel 7) | — |
| ✅ | h35-ambiguous-ref | topic | clausule-lokalisatie | 5565 | 1 | 1/1 | 14 (doel 14) | — |
| ✅ | ahv-36-dragalong | add | dwingend-recht | 15267 | 1 | 1/1 | 6 (doel 6) | — |
| ✅ | ahv-37-aanbiedingstermijn | value | waarde | 6256 | 1 | 1/1 | 4 (doel 4) | — |
| ✅ | ahv-38-noncompete-vijfjaar | legal | dwingend-recht | 13843 | 1 | 1/1 | 8 (doel 8) | — |
| ✅ | ahv-39-blokkering-statuten | legal | dwingend-recht | 13885 | 1 | 1/1 | 5 (doel 5) | — |
| ✅ | ahv-40-vraag-tagalong | question | advies-only | 6772 | 0 | 0/0 | – | — |
| ✅ | vwo-41-datalek-24u | value | waarde | 10158 | 1 | 1/1 | 8 (doel 8) | — |
| ✅ | vwo-42-audit-schrappen | legal | dwingend-recht | 15101 | 1 | 1/1 | 10 (doel 10) | — |
| ✅ | vwo-43-subverwerker | legal | dwingend-recht | 10809 | 1 | 1/1 | 6 (doel 6) | — |
| ✅ | vwo-44-doorgifte-vs | legal | dwingend-recht | 13598 | 1 | 1/1 | 7 (doel 7) | — |
| ✅ | vwo-45-2fa | add | toevoeging-scope | 10502 | 1 | 1/1 | 5 (doel 5) | — |
| ✅ | saas-46-staffel | trap | lijst-staffel | 6316 | 1 | 1/1 | 6 (doel 6) | — |
| ✅ | saas-47-verlenging | trap | non-unieke-find | 6198 | 1 | 1/1 | 4 (doel 4) | — |
| ✅ | saas-48-exclusief | targeted | scope-precisie | 8336 | 1 | 1/1 | 2 (doel 2) | — |
| ✅ | saas-49-cap | value | waarde | 8823 | 1 | 1/1 | 11 (doel 11) | — |
| ✅ | saas-50-escrow-vraag | question | advies-only | 7144 | 0 | 0/0 | – | — |
| ✅ | fr-51-typografie-quotes | trap | typografie | 3825 | 1 | 1/1 | 7 (doel 7) | — |
| ✅ | fr-52-typografie-nbsp | trap | typografie | 5566 | 1 | 1/1 | 11 (doel 11) | — |
| ✅ | fr-53-dertig-dagen | trap | non-unieke-find | 6195 | 1 | 1/1 | 4 (doel 4) | — |
| ✅ | fr-54-definitie-crossref | multi | kruisverwijzing-definitie | 11504 | 2 | 2/2 | 1,8 (doel 1,8) | — |
| ✅ | fr-55-bijlage-artikel | targeted | bijlage-scope | 4406 | 1 | 1/1 | B1.2 (doel B1.2) | — |
| ✅ | fr-56-hoofd-vs-bijlage | trap | bijlage-scope | 5195 | 1 | 1/1 | 1 (doel 1) | — |
| ❌ | fr-57-herschrijf-lang | tone | multi-alinea-lengte | 20000 | 3 | 2/3 | 8 (doel 8) | 1/3 voorstel(len) niet toepasbaar in Word |
| ✅ | fr-58-bijlage3-guardrail | guardrail | niet-bestaand-doel | 7790 | 0 | 0/0 | – | — |
| ✅ | raam-59-diep-in-doc | long | lang-document | 4218 | 1 | 1/1 | 22 (doel 22) | — |
| ✅ | raam-60-truncatie | guardrail | truncatie | 3617 | 0 | 0/0 | – | — |
| ✅ | arb-61-ketenregeling | question | advies-only | 6379 | 0 | 0/0 | – | — |
| ✅ | huur-62-verhoging-8pct | legal | dwingend-recht | 13098 | 1 | 1/1 | 3 (doel 3) | — |
| ✅ | huur-63-boete-te-laat | legal | dwingend-recht | 16366 | 1 | 1/1 | 3 | — |
| ✅ | av-64-overal-behalve | multi | overal-vervangen-scope | 20116 | 8 | 8/8 | 2,3,4,8,10,11,12,13 (doel 2,3,4,8,10,11,12,13) | — |
| ✅ | zzp-65-auteursrecht | legal | juridische-volledigheid | 15661 | 1 | 1/1 | 8 (doel 8) | — |
| ✅ | zzp-66-schijnzelfstandig | legal | dwingend-recht | 12617 | 1 | 1/1 | 5 (doel 5) | — |
| ✅ | vso-67-bedenktermijn | legal | dwingend-recht | 19667 | 1 | 1/1 | 8 | — |

## Niet-toepasbare suggesties (track-changes-risico)
- **fr-57-herschrijf-lang**:
  - `find` (345 tekens): find 345 tekens > 255 (Word search-limiet); door server gemarkeerd als niet-toepasbaar (te lang (>255 tekens))