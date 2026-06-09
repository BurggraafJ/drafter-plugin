# Drafter eval-rapport — baseline

**Pass: 20/30 (67%)** · latency p50 13226ms / p95 32664ms · 114.7s · profiel `default`

Per categorie: value 5/8 · topic 1/2 · add 5/5 · legal 0/2 · targeted 2/4 · question 2/2 · tone 0/2 · long 2/2 · trap 1/1 · multi 1/1 · guardrail 1/1

| | Case | Cat | ms | #sug | toepasbaar | scope→ | Reden(en) |
|---|---|---|---|---|---|---|---|
| ❌ | arb-01-salaris | value | 8690 | 1 | 1/1 | 5 (doel 5) | lege reply |
| ❌ | arb-02-proeftijd | topic | 11535 | 0 | 0/0 | – (doel 3) | verwacht ≥1 voorstel, kreeg 0; target-artikel(en) 3 niet geraakt |
| ✅ | arb-03-tussentijds | add | 20733 | 1 | 1/1 | 2 (doel 2) | — |
| ❌ | arb-04-concurrentie-motivering | legal | 32594 | 1 | 0/1 | – (doel 7) | 1/1 voorstel(len) niet toepasbaar in Word; target-artikel(en) 7 niet geraakt |
| ✅ | arb-05-concurrentie-duur | targeted | 12001 | 1 | 1/1 | 7 (doel 7) | — |
| ✅ | arb-06-vraag-geldigheid | question | 15386 | 0 | 0/0 | – | — |
| ✅ | arb-07-arbeidsduur | value | 9457 | 1 | 1/1 | 4 (doel 4) | — |
| ❌ | arb-08-geheimhouding-streng | tone | 32733 | 1 | 0/1 | – (doel 8) | 1/1 voorstel(len) niet toepasbaar in Word; target-artikel(en) 8 niet geraakt |
| ✅ | huur-09-huurprijs | value | 20483 | 1 | 1/1 | 3 (doel 3) | — |
| ❌ | huur-10-opzegtermijn | targeted | 19622 | 0 | 0/0 | – (doel 8) | verwacht 1 voorstel, kreeg 0; target-artikel(en) 8 niet geraakt; verwachte waarde "twee maanden" niet in replace gevonden |
| ❌ | huur-11-waarborg | value | 10339 | 0 | 0/0 | – (doel 6) | verwacht 1 voorstel, kreeg 0; target-artikel(en) 6 niet geraakt; verwachte waarde "3.600" niet in replace gevonden |
| ✅ | huur-12-onderhoud-add | add | 14038 | 1 | 1/1 | 7 (doel 7) | — |
| ✅ | huur-13-indexering | topic | 13791 | 1 | 1/1 | 5 (doel 5) | — |
| ❌ | huur-14-wgv | legal | 15510 | 0 | 0/0 | – (doel 6) | verwacht ≥1 voorstel, kreeg 0; target-artikel(en) 6 niet geraakt |
| ❌ | nda-15-looptijd | value | 7275 | 1 | 1/1 | 4 (doel 4) | lege reply |
| ✅ | nda-16-boete | value | 9112 | 1 | 1/1 | 6 (doel 6) | — |
| ❌ | nda-17-forum | targeted | 7085 | 1 | 1/1 | 7 (doel 7) | lege reply |
| ✅ | nda-18-uitzondering | add | 15759 | 1 | 1/1 | 2 (doel 2) | — |
| ✅ | nda-19-vraag-boete | question | 24419 | 0 | 0/0 | – | — |
| ✅ | av-20-opzeg | long | 17755 | 1 | 1/1 | 14 (doel 14) | — |
| ✅ | av-21-betaaltermijn-trap | trap | 7738 | 1 | 1/1 | 6 (doel 6) | — |
| ❌ | av-22-aansprakelijkheid | tone | 32664 | 1 | 0/1 | – (doel 12) | 1/1 voorstel(len) niet toepasbaar in Word; target-artikel(en) 12 niet geraakt |
| ✅ | av-23-ie-gebruiksrecht | add | 15622 | 1 | 1/1 | 11 (doel 11) | — |
| ✅ | av-24-forum | long | 7923 | 1 | 1/1 | 16 (doel 16) | — |
| ✅ | av-25-incasso-multi | multi | 13226 | 1 | 1/1 | 7 (doel 7) | — |
| ✅ | vso-26-vergoeding | value | 11002 | 1 | 1/1 | 3 (doel 3) | — |
| ✅ | vso-27-relatiebeding | targeted | 11516 | 1 | 1/1 | 5 (doel 5) | — |
| ✅ | vso-28-getuigschrift-add | add | 11948 | 1 | 1/1 | 6 (doel 6) | — |
| ✅ | vso-29-guardrail | guardrail | 8166 | 0 | 0/0 | – | — |
| ✅ | zzp-30-tarief | value | 7334 | 1 | 1/1 | 3 (doel 3) | — |

## Niet-toepasbare suggesties (track-changes-risico)
- **arb-04-concurrentie-motivering**:
  - `find` (248 tekens): find bevat alinea-einde (Word search matcht niet over alineas)
- **arb-08-geheimhouding-streng**:
  - `find` (220 tekens): find bevat alinea-einde (Word search matcht niet over alineas)
- **av-22-aansprakelijkheid**:
  - `find` (269 tekens): find 269 tekens > 255 (Word search-limiet)