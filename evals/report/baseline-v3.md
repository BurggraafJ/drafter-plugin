# Drafter eval-rapport — baseline-v3

**Pass: 79/89 (89%)** · latency p50 7925ms / p95 21848ms · 327.8s · profiel `default`

Per categorie: value 12/12 · legal 15/16 · add 7/7 · targeted 7/7 · question 6/6 · tone 2/3 · topic 3/3 · long 3/3 · trap 15/20 · multi 4/4 · guardrail 5/8

Per faalmodus: waarde 10/10 · dwingend-recht 13/14 · toevoeging-scope 6/6 · juridische-volledigheid 2/2 · scope-precisie 4/4 · advies-only 6/6 · herformulering-scope 2/3 · clausule-lokalisatie 3/3 · lang-document 3/3 · non-unieke-find 4/4 · multi-wijziging 1/1 · niet-bestaand-doel 2/2 · multi-artikel 1/1 · verwijdering 1/1 · lijst-staffel 2/2 · typografie 3/3 · kruisverwijzing-definitie 1/1 · bijlage-scope 2/2 · multi-alinea-lengte 1/1 · truncatie 1/1 · overal-vervangen-scope 1/1 · tabel-cel 0/3 · capability-grens 2/5 · speciale-tekens 5/6 · positioneel-voorkomen 1/1 · enkel-woord-anker 2/3

**Judge (juridische inhoud):** gemiddeld 94/100 over 89 cases · verdicts: pass 77, borderline 11, fail 1

| | Case | Cat | Faalmodus | ms | #sug | toepasbaar | scope→ | Judge | Reden(en) |
|---|---|---|---|---|---|---|---|---|---|
| ✅ | arb-01-salaris | value | waarde | 5412 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| ✅ | arb-02-proeftijd | legal | dwingend-recht | 14780 | 1 | 1/1 | 3 (doel 3) | 70 borderline | — |
| ✅ | arb-03-tussentijds | add | toevoeging-scope | 11866 | 1 | 1/1 | 2 (doel 2) | 70 borderline | — |
| ✅ | arb-04-concurrentie-motivering | legal | juridische-volledigheid | 18110 | 1 | 1/1 | 7 (doel 7) | 60 borderline | — |
| ✅ | arb-05-concurrentie-duur | targeted | scope-precisie | 10644 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| ✅ | arb-06-vraag-geldigheid | question | advies-only | 8011 | 0 | 0/0 | – | 85 pass | — |
| ✅ | arb-07-arbeidsduur | value | waarde | 5706 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| ✅ | arb-08-geheimhouding-streng | tone | herformulering-scope | 21789 | 2 | 2/2 | 8 (doel 8) | 60 borderline | — |
| ✅ | huur-09-huurprijs | value | waarde | 6183 | 1 | 1/1 | 3 (doel 3) | 90 pass | — |
| ✅ | huur-10-opzegtermijn | legal | dwingend-recht | 13708 | 1 | 1/1 | 8 (doel 8) | 85 pass | — |
| ✅ | huur-11-waarborg | legal | dwingend-recht | 19334 | 2 | 2/2 | 6 (doel 6) | 100 pass | — |
| ✅ | huur-12-onderhoud-add | add | toevoeging-scope | 12385 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| ✅ | huur-13-indexering | topic | clausule-lokalisatie | 4210 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| ✅ | huur-14-wgv | legal | dwingend-recht | 12935 | 0 | 0/0 | – (doel 6) | 100 pass | — |
| ✅ | nda-15-looptijd | value | waarde | 4778 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| ✅ | nda-16-boete | value | waarde | 8119 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | nda-17-forum | targeted | scope-precisie | 7684 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| ✅ | nda-18-uitzondering | add | toevoeging-scope | 8620 | 1 | 1/1 | 2 (doel 2) | 100 pass | — |
| ✅ | nda-19-vraag-boete | question | advies-only | 25813 | 0 | 0/0 | – | 100 pass | — |
| ✅ | av-20-opzeg | long | lang-document | 4747 | 1 | 1/1 | 14 (doel 14) | 70 borderline | — |
| ✅ | av-21-betaaltermijn-trap | trap | non-unieke-find | 7296 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ❌ | av-22-aansprakelijkheid | tone | herformulering-scope | 21848 | 3 | 2/3 | 12 (doel 12) | 90 pass | 1/3 voorstel(len) niet toepasbaar in Word |
| ✅ | av-23-ie-gebruiksrecht | add | toevoeging-scope | 13110 | 1 | 1/1 | 11 (doel 11) | 95 pass | — |
| ✅ | av-24-forum | long | lang-document | 7768 | 1 | 1/1 | 16 (doel 16) | 100 pass | — |
| ✅ | av-25-incasso-multi | multi | multi-wijziging | 12176 | 1 | 1/1 | 7 (doel 7) | 60 borderline | — |
| ✅ | vso-26-vergoeding | value | waarde | 5594 | 1 | 1/1 | 3 (doel 3) | 100 pass | — |
| ✅ | vso-27-relatiebeding | targeted | scope-precisie | 15061 | 2 | 2/2 | 5 (doel 5) | 100 pass | — |
| ✅ | vso-28-getuigschrift-add | add | toevoeging-scope | 10354 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | vso-29-guardrail | guardrail | niet-bestaand-doel | 2934 | 0 | 0/0 | – | 100 pass | — |
| ✅ | zzp-30-tarief | value | waarde | 6041 | 1 | 1/1 | 3 (doel 3) | 100 pass | — |
| ✅ | h31-by-quote | topic | clausule-lokalisatie | 4881 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| ✅ | h32-multi-article | multi | multi-artikel | 6147 | 2 | 2/2 | 3,4 (doel 3,4) | 100 pass | — |
| ✅ | h33-broad-multi-instance | trap | non-unieke-find | 8752 | 2 | 2/2 | 3,6 (doel 3,6) | 100 pass | — |
| ✅ | h34-deletion | targeted | verwijdering | 20387 | 1 | 1/1 | 7 (doel 7) | 90 pass | — |
| ✅ | h35-ambiguous-ref | topic | clausule-lokalisatie | 6627 | 1 | 1/1 | 14 (doel 14) | 100 pass | — |
| ✅ | ahv-36-dragalong | add | dwingend-recht | 9795 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | ahv-37-aanbiedingstermijn | value | waarde | 6314 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| ❌ | ahv-38-noncompete-vijfjaar | legal | dwingend-recht | 15863 | 1 | 1/1 | 8 (doel 8) | 65 borderline | reply benoemt het juridische punt niet (verwacht één van: mededinging, kartel, redelijk, nietig, twee jaar, drie jaar) |
| ✅ | ahv-39-blokkering-statuten | legal | dwingend-recht | 17032 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| ✅ | ahv-40-vraag-tagalong | question | advies-only | 7239 | 0 | 0/0 | – | 100 pass | — |
| ✅ | vwo-41-datalek-24u | value | waarde | 6872 | 1 | 1/1 | 8 (doel 8) | 100 pass | — |
| ✅ | vwo-42-audit-schrappen | legal | dwingend-recht | 16791 | 1 | 1/1 | 10 (doel 10) | 100 pass | — |
| ✅ | vwo-43-subverwerker | legal | dwingend-recht | 13677 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | vwo-44-doorgifte-vs | legal | dwingend-recht | 16682 | 1 | 1/1 | 7 (doel 7) | 75 borderline | — |
| ✅ | vwo-45-2fa | add | toevoeging-scope | 8025 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| ✅ | saas-46-staffel | trap | lijst-staffel | 5789 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | saas-47-verlenging | trap | non-unieke-find | 8453 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| ✅ | saas-48-exclusief | targeted | scope-precisie | 12019 | 1 | 1/1 | 2 (doel 2) | 65 borderline | — |
| ✅ | saas-49-cap | value | waarde | 7420 | 1 | 1/1 | 11 (doel 11) | 100 pass | — |
| ✅ | saas-50-escrow-vraag | question | advies-only | 22382 | 0 | 0/0 | – | 100 pass | — |
| ✅ | fr-51-typografie-quotes | trap | typografie | 4575 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| ✅ | fr-52-typografie-nbsp | trap | typografie | 7868 | 1 | 1/1 | 11 (doel 11) | 100 pass | — |
| ✅ | fr-53-dertig-dagen | trap | non-unieke-find | 7728 | 1 | 1/1 | 4 (doel 4) | 90 pass | — |
| ✅ | fr-54-definitie-crossref | multi | kruisverwijzing-definitie | 8163 | 2 | 2/2 | 1,8 (doel 1,8) | 100 pass | — |
| ✅ | fr-55-bijlage-artikel | targeted | bijlage-scope | 4323 | 1 | 1/1 | B1.2 (doel B1.2) | 100 pass | — |
| ✅ | fr-56-hoofd-vs-bijlage | trap | bijlage-scope | 10428 | 1 | 1/1 | 1 (doel 1) | 100 pass | — |
| ✅ | fr-57-herschrijf-lang | tone | multi-alinea-lengte | 21857 | 5 | 5/5 | 8 (doel 8) | 75 borderline | — |
| ✅ | fr-58-bijlage3-guardrail | guardrail | niet-bestaand-doel | 3231 | 0 | 0/0 | – | 100 pass | — |
| ✅ | raam-59-diep-in-doc | long | lang-document | 3964 | 1 | 1/1 | 22 (doel 22) | 100 pass | — |
| ✅ | raam-60-truncatie | guardrail | truncatie | 3093 | 0 | 0/0 | – | 100 pass | — |
| ✅ | arb-61-ketenregeling | question | advies-only | 7107 | 0 | 0/0 | – | 55 fail | — |
| ✅ | huur-62-verhoging-8pct | legal | dwingend-recht | 15575 | 1 | 1/1 | 3 (doel 3) | 90 pass | — |
| ✅ | huur-63-boete-te-laat | legal | dwingend-recht | 18156 | 1 | 1/1 | 3 | 85 pass | — |
| ✅ | av-64-overal-behalve | multi | overal-vervangen-scope | 13358 | 10 | 10/10 | 2,3,4,8,10,11,12,13 (doel 2,3,4,8,10,11,12,13) | 100 pass | — |
| ✅ | zzp-65-auteursrecht | legal | juridische-volledigheid | 17107 | 1 | 1/1 | 8 (doel 8) | 90 pass | — |
| ✅ | zzp-66-schijnzelfstandig | legal | dwingend-recht | 13983 | 1 | 1/1 | 5 (doel 5) | 75 borderline | — |
| ✅ | vso-67-bedenktermijn | legal | dwingend-recht | 7925 | 0 | 0/0 | – | 100 pass | — |
| ❌ | tab-68-celwaarde | trap | tabel-cel | 6126 | 1 | 0/1 | – (doel 3) | 100 pass | 1/1 voorstel(len) niet toepasbaar in Word; target-artikel(en) 3 niet geraakt |
| ❌ | tab-69-twee-cellen | trap | tabel-cel | 10516 | 2 | 0/2 | – (doel 3) | 100 pass | 2/2 voorstel(len) niet toepasbaar in Word; target-artikel(en) 3 niet geraakt |
| ❌ | tab-71-capability-kolom | guardrail | capability-grens | 10266 | 4 | 0/4 | – | 100 pass | 4/4 voorstel(len) niet toepasbaar in Word |
| ❌ | tab-72-fase-overal | trap | tabel-cel | 7398 | 2 | 1/2 | 4 (doel 3,4) | 100 pass | 1/2 voorstel(len) niet toepasbaar in Word; reply benoemt het juridische punt niet (verwacht één van: cel, tabel, handmatig, niet uniek, niet automatisch) |
| ✅ | tek-73-paragraafteken | trap | speciale-tekens | 8411 | 1 | 1/1 | 2 (doel 2) | 100 pass | — |
| ❌ | tek-74-gedachtestreep | trap | speciale-tekens | 6409 | 1 | 1/1 | 5 (doel 5) | 100 pass | geen toepasbare find bevat "—" (verkeerde plek verankerd?) |
| ✅ | tek-75-half-procent | trap | speciale-tekens | 6521 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| ✅ | tek-76-trema | value | speciale-tekens | 4914 | 1 | 1/1 | 8 (doel 8) | 100 pass | — |
| ✅ | tek-77-curly-apostrof | trap | typografie | 8874 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| ✅ | tek-78-bedrag-decimalen | value | speciale-tekens | 4358 | 1 | 1/1 | 3 (doel 3) | 100 pass | — |
| ✅ | tek-79-beletselteken | trap | speciale-tekens | 5871 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | pos-80-eerste-voorkomen | trap | positioneel-voorkomen | 4838 | 1 | 1/1 | 8 (doel 8) | 100 pass | — |
| ✅ | pos-81-enkel-woord | trap | enkel-woord-anker | 7279 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| ❌ | pos-82-template-woord | trap | enkel-woord-anker | 31915 | 1 | 0/1 | – (doel 9) | 80 pass | 1/1 voorstel(len) niet toepasbaar in Word; target-artikel(en) 9 niet geraakt |
| ✅ | pos-83-woord-schrappen | targeted | enkel-woord-anker | 5791 | 1 | 1/1 | 2 (doel 2) | 100 pass | — |
| ❌ | cap-84-markeren | guardrail | capability-grens | 12495 | 1 | 1/1 | 7 | 90 pass | verwacht GEEN wijziging, kreeg 1 toepasbare; reply benoemt het juridische punt niet (verwacht één van: opmaak, markering, handmatig, kleur) |
| ✅ | cap-85-koppen-stijl | guardrail | capability-grens | 6998 | 0 | 0/0 | – | 90 pass | — |
| ❌ | cap-86-vet | guardrail | capability-grens | 7686 | 1 | 1/1 | 3 | 95 pass | verwacht GEEN wijziging, kreeg 1 toepasbare |
| ✅ | cap-87-afbeelding | guardrail | capability-grens | 7095 | 0 | 0/0 | – | 100 pass | — |
| ✅ | ext-88-sub-item | trap | lijst-staffel | 6691 | 1 | 1/1 | 9 (doel 9) | 100 pass | — |
| ✅ | ext-89-inspanning-garantie | legal | herformulering-scope | 7056 | 1 | 1/1 | 3 (doel 3) | 100 pass | — |
| ✅ | ext-90-rekensom | question | advies-only | 6712 | 0 | 0/0 | – | 100 pass | — |

## Niet-toepasbare suggesties (track-changes-risico)
- **av-22-aansprakelijkheid**:
  - `find` (11 tekens): find niet in document (niet toepasbaar); door server gemarkeerd als niet-toepasbaar (niet in document)
- **tab-68-celwaarde**:
  - `find` (51 tekens): find bevat een tab (kruist tabelcel-grens — Word search matcht niet over cellen)
- **tab-69-twee-cellen**:
  - `find` (50 tekens): find bevat een tab (kruist tabelcel-grens — Word search matcht niet over cellen)
  - `find` (41 tekens): find bevat een tab (kruist tabelcel-grens — Word search matcht niet over cellen)
- **tab-71-capability-kolom**:
  - `find` (41 tekens): find bevat een tab (kruist tabelcel-grens — Word search matcht niet over cellen)
  - `find` (50 tekens): find bevat een tab (kruist tabelcel-grens — Word search matcht niet over cellen)
  - `find` (51 tekens): find bevat een tab (kruist tabelcel-grens — Word search matcht niet over cellen)
  - `find` (41 tekens): find bevat een tab (kruist tabelcel-grens — Word search matcht niet over cellen)
- **tab-72-fase-overal**:
  - `find` (34 tekens): find bevat een tab (kruist tabelcel-grens — Word search matcht niet over cellen)
- **pos-82-template-woord**:
  - `find` (12 tekens): find komt 28x voor (niet uniek → mogelijk verkeerde locatie); door server gemarkeerd als niet-toepasbaar (niet uniek)

## Judge-bevindingen (juridische inhoud)
- **arb-02-proeftijd** (70/100, borderline): Een proeftijd van twee maanden bij een arbeidsovereenkomst voor bepaalde tijd van twaalf maanden is zonder toepasselijke cao-afwijking nietig; de voorgestelde tekst blijft juridisch riskant.; De toevoeging 'voor zover rechtsgeldig overeengekomen' repareert de nietigheid niet en kan tot onzekerheid leiden.; De assistent had duidelijker moeten adviseren de wijziging niet door te voeren tenzij concreet is vastgesteld dat een toepasselijke cao afwijking toestaat.
- **arb-03-tussentijds** (70/100, borderline): De toelichting vermeldt terecht dat tussentijdse opzegging bij een arbeidsovereenkomst voor bepaalde tijd schriftelijk voor beide partijen moet zijn overeengekomen.; De voorgestelde clausule suggereert te ruim dat beide partijen zonder meer tussentijds kunnen opzeggen; voor de werkgever blijven de wettelijke ontslagregels gelden, zoals toestemming UWV, ontbinding door de kantonrechter of instemming van de werknemer.; De opzegtermijn van één maand is op zichzelf passend, maar de clausule had zorgvuldiger kunnen verwijzen naar de wettelijke vereisten en eventueel opzegging tegen het einde van de maand.
- **arb-04-concurrentie-motivering** (60/100, borderline): Vervangende tekst is afgebroken: eindigt met ‘waarin Werkgever actie’, waardoor de clausule juridisch en taalkundig onbruikbaar is.; Motivering blijft vrij algemeen en onderbouwt onvoldoende concreet waarom juist dit concurrentiebeding voor deze logistiek medewerker noodzakelijk is wegens zwaarwegende bedrijfs- of dienstbelangen.; De toelichting bevat terecht de waarschuwing dat bij een arbeidsovereenkomst voor bepaalde tijd een schriftelijke, specifieke motivering vereist is op grond van art. 7:653 BW.; Er wordt alleen artikel 7 gewijzigd, conform de instructie.
- **arb-06-vraag-geldigheid** (85/100, pass): Kernanalyse is juist: bij een arbeidsovereenkomst voor bepaalde tijd ontbreekt de vereiste schriftelijke motivering van zwaarwegende bedrijfs- of dienstbelangen.; De verwijzing naar artikel 7:653 lid 3 BW voor de algemene onbillijke-benadelingstoets is vermoedelijk onjuist; die toets staat niet in lid 3 maar in een later lid van artikel 7:653 BW.; De formulering 'waarschijnlijk niet rechtsgeldig' is wat voorzichtig; bij ontbreken van de wettelijke motivering is het beding in beginsel nietig/onhoudbaar.
- **arb-08-geheimhouding-streng** (60/100, borderline): De uitzondering is te beperkt geformuleerd: alleen 'wettelijke verplichting' dekt niet zonder meer beschermde meldingen, klokkenluidersrechten, melding aan toezichthouders of gebruik van informatie ter verdediging van eigen rechtspositie.; De assistent waarschuwt niet expliciet dat een geheimhoudingsbeding niet zo ruim mag worden toegepast dat wettelijke rechten van werknemer worden beperkt.; Verwijzing naar de Wet bescherming bedrijfsgeheimen is op hoofdlijnen juist, maar de daarbij behorende wettelijke uitzonderingen worden niet benoemd of verwerkt.
- **huur-09-huurprijs** (90/100, pass): De wijziging in artikel 3 is juridisch juist en conform instructie uitgevoerd.; De assistent waarschuwt terecht dat bij woonruimte huurprijsbescherming en toetsing aan het woningwaarderingsstelsel kunnen spelen.; De assistent signaleert niet dat artikel 6 door de huurverhoging intern inconsistent wordt: € 2.400 is niet langer gelijk aan twee maanden huur bij een huurprijs van € 1.350.
- **huur-10-opzegtermijn** (85/100, pass): De verwijzing naar art. 7:271 lid 5 onder a BW en de hoofdregel voor de opzegtermijn van de huurder zijn juist.; De assistent waarschuwt terecht dat twee maanden bij maandelijkse huurbetaling afwijkt ten nadele van de huurder.; De kwalificatie als 'juridisch kwetsbaar en mogelijk nietig' is te voorzichtig; een dergelijk beding is naar woonruimterecht in beginsel nietig voor zover het afwijkt van art. 7:271 BW.
- **av-20-opzeg** (70/100, borderline): De wijziging zelf is conform de instructie en beperkt zich tot artikel 14.; De toelichting is te stellig dat geen wettelijke beperking zichtbaar is; bij algemene voorwaarden kan een opzegtermijn van drie maanden onder omstandigheden problematisch zijn, met name bij consumenten of bij overeenkomsten van opdracht in verband met art. 7:408 BW en de regels over onredelijk bezwarende bedingen.; Er is geen korte voorbehoudswaarschuwing opgenomen voor toepasselijkheid op consumenten/niet-professionele opdrachtgevers.
- **av-22-aansprakelijkheid** (90/100, pass): Het belangrijkste inhoudelijke extra beding, de uitsluiting van indirecte schade, is als afzonderlijk wijzigingsvoorstel niet plaatsbaar en wordt daardoor niet toegepast.; De tekst definieert niet wat onder 'directe schade' valt, wat in aansprakelijkheidsclausules tot interpretatieruimte kan leiden.
- **av-23-ie-gebruiksrecht** (95/100, pass): Het voorstel voegt inhoudelijke beperkingen toe aan het gebruiksrecht, zoals uitsluitend intern gebruik en niet-overdraagbaarheid, terwijl de instructie alleen vroeg om een gebruiksrecht na volledige betaling.; De clausule is juridisch in hoofdlijnen juist en behoudt de intellectuele eigendom bij Opdrachtnemer terwijl een contractuele licentie wordt verleend.
- **av-25-incasso-multi** (60/100, borderline): De wettelijke handelsrente ex artikel 6:119a BW en het minimum van € 40 ex artikel 6:96 lid 4 BW gelden alleen bij handelsovereenkomsten; de voorgestelde clausule is niet beperkt tot B2B/handelsovereenkomsten terwijl de algemene voorwaarden ook op andere opdrachtgevers kunnen zien.; De assistent noemt wel dat het minimum geldt bij handelsovereenkomsten, maar waarschuwt niet expliciet dat toepassing richting consumenten juridisch problematisch kan zijn en verwerkt die beperking niet in de tekst.; Door de bestaande verwijzing naar de WIK geheel te vervangen door alleen artikel 6:96 lid 4 BW blijft minder duidelijk hoe incassokosten boven het minimum worden berekend.
- **h34-deletion** (90/100, pass): Het voorstel laat de kop 'Artikel 7 — Concurrentiebeding' staan, terwijl gevraagd is het concurrentiebeding in artikel 7 volledig te verwijderen; dit kan verwarrend zijn.; De wijziging verwijdert wel de materiële inhoud van het beding en vervangt die door 'Vervallen.', waardoor de nummering intact blijft.
- **ahv-36-dragalong** (100/100, pass): Geen wezenlijke juridisch-inhoudelijke gebreken geconstateerd.; De toelichting benoemt terecht dat het ontbreken van een waarderingsmechanisme de positie van Van Galen verzwakt.
- **ahv-38-noncompete-vijfjaar** (65/100, borderline): Waarschuwing voor juridische kwetsbaarheid is terecht, maar benoemt het mededingingsrechtelijke risico van een vijfjarig non-concurrentiebeding niet expliciet.; De verwijzing naar 'matiging' is minder precies: een non-concurrentiebeding wordt eerder beperkt, buiten toepassing gelaten of nietig geacht dan gematigd zoals een boete.; Artikel 11 wordt terecht gesignaleerd als probleem voor nawerking, maar er wordt geen voorstel gedaan om dit op te lossen; daardoor kan de beoogde verlenging praktisch ineffectief blijven.
- **vwo-44-doorgifte-vs** (75/100, borderline): De voorgestelde vervangende tekst staat onvoorwaardelijke doorgifte naar de VS toe en is daarmee als contractsbepaling niet AVG-conform zonder passend doorgiftemechanisme onder hoofdstuk V AVG.; De toelichting waarschuwt terecht voor strijd met hoofdstuk V AVG, maar biedt geen juridisch houdbaar alternatief of formulering met noodzakelijke voorwaarden.; Er wordt niet benoemd dat doorgifte naar de VS onder omstandigheden wel mogelijk kan zijn, bijvoorbeeld bij een adequaatheidsbesluit/DPF-certificering of standaardcontractbepalingen met aanvullende beoordeling.
- **saas-48-exclusief** (65/100, borderline): De voorgestelde formulering maakt de licentie wel exclusief binnen Nederland, maar blijft enigszins ambigu over de precieze reikwijdte van de exclusiviteit en eventueel eigen gebruik door Novaplan.; Bij een exclusieve auteursrechtelijke/softwarelicentie had de assistent moeten wijzen op het aktevereiste voor exclusieve licenties onder de Auteurswet.; De waarschuwing dat Novaplan binnen Nederland geen vergelijkbare licenties aan anderen kan verlenen is terecht, maar niet volledig uitgewerkt.
- **fr-53-dertig-dagen** (90/100, pass): Artikel 5 bevat een koppeling dat de marketingbijdrage gelijktijdig met de artikel 4-franchisevergoeding wordt voldaan, maar ook binnen dertig dagen; dit kan de verlenging naar vijfenveertig dagen praktisch doorkruisen of tot inconsistentie leiden.; De assistent benoemt artikel 5 wel, maar onderkent de interne spanning door 'gelijktijdig' onvoldoende.
- **fr-57-herschrijf-lang** (75/100, borderline): De verwijzing naar art. 7:920 BW is juist, maar de assistent benoemt niet concreet dat de bestaande geografische reikwijdte mogelijk problematisch is voor een postcontractueel non-concurrentiebeding in franchise.; De opdracht was artikel 8 volledig te herschrijven; de assistent geeft slechts losse find/replace-wijzigingen en geen integraal herschreven artikel 8.; De juridische strekking wordt inhoudelijk grotendeels behouden en de wijzigingen blijven beperkt tot artikel 8.
- **arb-61-ketenregeling** (55/100, fail): De assistent beantwoordt de kernvraag ten onrechte met 'Ja' en stelt onjuist dat bij het aangaan van het derde tijdelijke contract al een arbeidsovereenkomst voor onbepaalde tijd ontstaat.; De later genoemde regel dat maximaal drie tijdelijke contracten in maximaal 36 maanden zijn toegestaan is op zichzelf juist, maar staat in directe tegenspraak met de conclusie.; Er wordt niet duidelijk uitgelegd dat drie opeenvolgende jaarcontracten in beginsel juist nog géén arbeidsovereenkomst voor onbepaalde tijd opleveren, zolang de 36 maanden niet worden overschreden en het niet om een vierde contract gaat.; Relevante nuances zoals tussenpozen van ten hoogste zes maanden, cao-afwijkingen en uitzonderingen worden niet genoemd.
- **huur-62-verhoging-8pct** (90/100, pass): De assistent signaleert terecht dat een huurverhoging woonruimte aan wettelijke maxima en vereisten is gebonden.; De berekening van 8% over € 1.200 naar € 1.296 is juist.; De mogelijke samenloop met artikel 5 wordt wel benoemd, maar niet opgelost of als optionele aanvullende wijziging uitgewerkt, waardoor de contractuele regeling per 1 juli 2027 onduidelijk kan blijven.
- **huur-63-boete-te-laat** (85/100, pass): De waarschuwing over oneerlijke bedingen is juist, maar te algemeen: bij een particuliere huurder van woonruimte is een boete van € 250 per dag zonder maximum zeer waarschijnlijk vernietigbaar/oneerlijk en ambtshalve toetsbaar, niet slechts 'kwetsbaar'.; De toevoeging 'onverminderd de overige rechten van Verhuurder' kan cumulatie met wettelijke rente/incassokosten suggereren en vergroot juist het risico op oneerlijkheid; dat wordt niet benoemd.; Het wettelijke voorbehoud 'voor zover wettelijk toegestaan' maakt een mogelijk oneerlijk beding niet zonder meer geldig.
- **zzp-65-auteursrecht** (90/100, pass): De voorgestelde akteformulering is juridisch in de kern juist en benoemt terecht art. 2 lid 1 Auteurswet en persoonlijkheidsrechten.; De clausule regelt niet dat Opdrachtnemer ook rechten van eventuele vervangers, hulppersonen of derden moet verkrijgen en doorleveren, terwijl artikel 6 vervanging toestaat.; Er ontbreekt een waarborg/verklaring dat Opdrachtnemer beschikkingsbevoegd is of zal zorgdragen voor een geldige rechtenketen voor alle softwarecomponenten.
- **zzp-66-schijnzelfstandig** (75/100, borderline): De waarschuwing voor het risico op kwalificatie als arbeidsovereenkomst wegens gezagsverhouding en organisatorische inbedding is juist.; De voorgestelde aanwezigheidsplicht 'dagelijks van 9:00 tot 17:00 uur' is moeilijk verenigbaar met artikel 2, waarin gemiddeld 24 uur per week is afgesproken; dit wordt niet benoemd of opgelost.; De formulering 'gedurende de overeengekomen omvang dagelijks van 9:00 tot 17:00 uur' is juridisch en praktisch onduidelijk: dagelijks 8 uur impliceert doorgaans 40 uur per week.; De instructiebevoegdheid is terecht beperkt tot redelijke en opdrachtgerelateerde instructies, maar daarmee wordt de oorspronkelijke instructie inhoudelijk afgezwakt zonder expliciet te maken dat volledige uitvoering juridisch risicovol zou zijn.
- **tab-71-capability-kolom** (100/100, pass): De assistent signaleert terecht dat niet duidelijk is of de korting al in de genoemde vergoedingen is verwerkt of daarop nog in mindering komt.; De wijzigingsvoorstellen beperken zich tot de tabel in artikel 3 en voegen per fase 5% korting toe.
- **pos-82-template-woord** (80/100, pass): Het wijzigingsvoorstel gebruikt alleen FIND: "maandfactuur", terwijl dit woord in veel artikelen voorkomt; daarmee is het voorstel niet daadwerkelijk beperkt tot artikel 9.; De wijziging is door de server als niet-plaatsbaar gemarkeerd en wordt dus niet toegepast; de gevraagde vervanging wordt feitelijk niet gerealiseerd.; Een plaatsbaar voorstel had de volledige zin of een unieke passage uit artikel 9 als FIND moeten gebruiken.
- **cap-84-markeren** (90/100, pass): Artikel 7 omvat ook het kopje 'Artikel 7 — Concurrentiebeding', maar het wijzigingsvoorstel ziet alleen op de inhoudelijke alinea.; De gele markering is niet zichtbaar uit de find/replace-tekst zelf; alleen de WHY vermeldt een opmaakwijziging.
- **cap-85-koppen-stijl** (90/100, pass): De assistent voert de gevraagde opmaakwijziging niet uit en geeft geen concrete wijzigingsvoorstellen, maar motiveert dat dit binnen de beschikbare Track Changes-structuur niet kan.; De verwijzing naar alleen “Artikel 1” t/m “Artikel 16” is iets onnauwkeurig, omdat de volledige artikelkoppen ook de koptekst na het nummer omvatten.
- **cap-86-vet** (95/100, pass): Het voorstel maakt ook het woord 'bruto' vet, terwijl strikt genomen alleen het bedrag zelf is gevraagd.; De replace-tekst gebruikt Markdown-asterisken; als die letterlijk in Word worden ingevoegd, is dat geen zuivere vet-opmaak.