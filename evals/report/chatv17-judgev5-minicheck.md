# Drafter eval-rapport — chatv17-judgev5-minicheck

**Pass: 6/6 (100%)** · latency p50 9660ms / p95 44389ms · 57.2s · profiel `default`

Per categorie: value 1/1 · guardrail 2/2 · targeted 1/1 · add 2/2

Per faalmodus: waarde 1/1 · verduidelijking 3/3 · insert-nieuw-document 2/2

**Judge (juridische inhoud):** gemiddeld 100/100 over 6 cases · verdicts: pass 6

| | Case | Cat | Faalmodus | ms | #sug | toepasbaar | scope→ | Judge | Reden(en) |
|---|---|---|---|---|---|---|---|---|---|
| ✅ | arb-01-salaris | value | waarde | 5612 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| ✅ | clr-95-ambigu-termijn | guardrail | verduidelijking | 9660 | 0 | 0/0 | – | 100 pass | — |
| ✅ | clr-96-ambigu-bedrag | guardrail | verduidelijking | 6713 | 0 | 0/0 | – | 100 pass | — |
| ✅ | clr-97-redelijke-default | targeted | verduidelijking | 9660 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | ins-98-leeg-document | add | insert-nieuw-document | 44389 | 1 | 1/1 | – | 100 pass | — |
| ✅ | ins-99-nieuw-artikel | add | insert-nieuw-document | 14567 | 2 | 2/2 | 10 | 100 pass | — |

## Niet-toepasbare suggesties (track-changes-risico)

## Judge-bevindingen (juridische inhoud)
- **clr-95-ambigu-termijn** (100/100, pass): De instructie was werkelijk ambigu: meerdere termijnen in het document konden met 'de termijn' worden bedoeld.; De verduidelijkingsvraag is scherp en relevant doordat concrete opties zijn gegeven.
- **clr-96-ambigu-bedrag** (100/100, pass): De instructie was inhoudelijk ambigu omdat meerdere geldbedragen in het document voorkomen.; De verduidelijkingsvraag noemt concreet de relevante opties en is daarmee scherp en uitvoerbaar.
- **clr-97-redelijke-default** (100/100, pass): De assistent heeft de verhoging concreet ingevuld met € 25.000; dat is een redelijke standaardinterpretatie van “wat hoger” en niet onnodig afwijken van de instructie.; De waarschuwing over rechterlijke matiging ex artikel 6:94 BW is juridisch juist en passend bij een boetebeding.; De wijziging raakt uitsluitend het bedrag in het boetebeding en blijft daarmee netjes in scope.
- **ins-98-leeg-document** (100/100, pass): De forumkeuze is wat onhandig geformuleerd (“de bevoegde rechter van de rechtbank [plaats]”); juridisch kan dat beter worden aangescherpt naar een concrete rechtbanklocatie.; De NDA is beknopt en bevat de kernbepalingen, maar noemt niet expliciet dat boete matigbaar is of dat de boete naast schadevergoeding geldt onder voorwaarden van het Nederlandse recht. Dat is hier geen fout, maar wel een gebruikelijke verfijning.
- **ins-99-nieuw-artikel** (100/100, pass): De mediationbepaling is juridisch aanvaardbaar en laat terecht ruimte voor spoedeisende maatregelen.; De doornummering van het bestaande artikel over toepasselijk recht is correct verwerkt.