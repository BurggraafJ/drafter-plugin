# Drafter eval-rapport — final-v15

**Pass: 96/96 (100%)** · latency p50 7253ms / p95 24877ms · 307.1s · profiel `default`

Per categorie: value 12/12 · legal 16/16 · add 9/9 · targeted 9/9 · question 6/6 · tone 3/3 · topic 3/3 · long 3/3 · trap 21/21 · multi 6/6 · guardrail 8/8

Per faalmodus: waarde 10/10 · dwingend-recht 14/14 · toevoeging-scope 6/6 · juridische-volledigheid 2/2 · scope-precisie 4/4 · advies-only 6/6 · herformulering-scope 3/3 · clausule-lokalisatie 3/3 · lang-document 3/3 · non-unieke-find 5/5 · multi-wijziging 1/1 · niet-bestaand-doel 2/2 · multi-artikel 1/1 · verwijdering 1/1 · lijst-staffel 2/2 · typografie 3/3 · kruisverwijzing-definitie 1/1 · bijlage-scope 2/2 · multi-alinea-lengte 1/1 · truncatie 1/1 · overal-vervangen-scope 1/1 · tabel-cel 3/3 · capability-grens 3/3 · speciale-tekens 6/6 · positioneel-voorkomen 1/1 · enkel-woord-anker 3/3 · opmaak-actie 2/2 · hernummering-verwijzingen 3/3 · verduidelijking 3/3

**Judge (juridische inhoud):** gemiddeld 96/100 over 96 cases · verdicts: pass 87, borderline 7, fail 2

| | Case | Cat | Faalmodus | ms | #sug | toepasbaar | scope→ | Judge | Reden(en) |
|---|---|---|---|---|---|---|---|---|---|
| ✅ | arb-01-salaris | value | waarde | 5040 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| ✅ | arb-02-proeftijd | legal | dwingend-recht | 17526 | 1 | 1/1 | 3 (doel 3) | 100 pass | — |
| ✅ | arb-03-tussentijds | add | toevoeging-scope | 14561 | 1 | 1/1 | 2 (doel 2) | 100 pass | — |
| ✅ | arb-04-concurrentie-motivering | legal | juridische-volledigheid | 19233 | 1 | 1/1 | 7 (doel 7) | 60 borderline | — |
| ✅ | arb-05-concurrentie-duur | targeted | scope-precisie | 9799 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| ✅ | arb-06-vraag-geldigheid | question | advies-only | 11688 | 0 | 0/0 | – | 100 pass | — |
| ✅ | arb-07-arbeidsduur | value | waarde | 5306 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| ✅ | arb-08-geheimhouding-streng | tone | herformulering-scope | 31660 | 3 | 3/3 | 8 (doel 8) | 60 borderline | — |
| ✅ | huur-09-huurprijs | value | waarde | 7189 | 1 | 1/1 | 3 (doel 3) | 100 pass | — |
| ✅ | huur-10-opzegtermijn | legal | dwingend-recht | 16639 | 1 | 1/1 | 8 (doel 8) | 100 pass | — |
| ✅ | huur-11-waarborg | legal | dwingend-recht | 19717 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | huur-12-onderhoud-add | add | toevoeging-scope | 9546 | 1 | 1/1 | 7 (doel 7) | 95 pass | — |
| ✅ | huur-13-indexering | topic | clausule-lokalisatie | 6346 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| ✅ | huur-14-wgv | legal | dwingend-recht | 6664 | 0 | 0/0 | – (doel 6) | 85 pass | — |
| ✅ | nda-15-looptijd | value | waarde | 4110 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| ✅ | nda-16-boete | value | waarde | 7447 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | nda-17-forum | targeted | scope-precisie | 7199 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| ✅ | nda-18-uitzondering | add | toevoeging-scope | 8326 | 1 | 1/1 | 2 (doel 2) | 95 pass | — |
| ✅ | nda-19-vraag-boete | question | advies-only | 17972 | 0 | 0/0 | – | 100 pass | — |
| ✅ | av-20-opzeg | long | lang-document | 3833 | 1 | 1/1 | 14 (doel 14) | 100 pass | — |
| ✅ | av-21-betaaltermijn-trap | trap | non-unieke-find | 7576 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | av-22-aansprakelijkheid | tone | herformulering-scope | 24877 | 2 | 2/2 | 12 (doel 12) | 70 borderline | — |
| ✅ | av-23-ie-gebruiksrecht | add | toevoeging-scope | 9475 | 1 | 1/1 | 11 (doel 11) | 100 pass | — |
| ✅ | av-24-forum | long | lang-document | 4758 | 1 | 1/1 | 16 (doel 16) | 100 pass | — |
| ✅ | av-25-incasso-multi | multi | multi-wijziging | 12542 | 1 | 1/1 | 7 (doel 7) | 50 fail | — |
| ✅ | vso-26-vergoeding | value | waarde | 4565 | 1 | 1/1 | 3 (doel 3) | 100 pass | — |
| ✅ | vso-27-relatiebeding | targeted | scope-precisie | 5334 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| ✅ | vso-28-getuigschrift-add | add | toevoeging-scope | 9840 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | vso-29-guardrail | guardrail | niet-bestaand-doel | 3554 | 0 | 0/0 | – | 100 pass | — |
| ✅ | zzp-30-tarief | value | waarde | 3567 | 1 | 1/1 | 3 (doel 3) | 100 pass | — |
| ✅ | h31-by-quote | topic | clausule-lokalisatie | 6092 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| ✅ | h32-multi-article | multi | multi-artikel | 6529 | 2 | 2/2 | 3,4 (doel 3,4) | 100 pass | — |
| ✅ | h33-broad-multi-instance | trap | non-unieke-find | 7496 | 2 | 2/2 | 3,6 (doel 3,6) | 100 pass | — |
| ✅ | h34-deletion | targeted | verwijdering | 7672 | 2 | 2/2 | 7 (doel 7) | 100 pass | — |
| ✅ | h35-ambiguous-ref | topic | clausule-lokalisatie | 4629 | 1 | 1/1 | 14 (doel 14) | 100 pass | — |
| ✅ | ahv-36-dragalong | add | dwingend-recht | 12433 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | ahv-37-aanbiedingstermijn | value | waarde | 5039 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| ✅ | ahv-38-noncompete-vijfjaar | legal | dwingend-recht | 11702 | 1 | 1/1 | 8 (doel 8) | 90 pass | — |
| ✅ | ahv-39-blokkering-statuten | legal | dwingend-recht | 11565 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| ✅ | ahv-40-vraag-tagalong | question | advies-only | 7037 | 0 | 0/0 | – | 100 pass | — |
| ✅ | vwo-41-datalek-24u | value | waarde | 6846 | 1 | 1/1 | 8 (doel 8) | 100 pass | — |
| ✅ | vwo-42-audit-schrappen | legal | dwingend-recht | 14921 | 2 | 2/2 | 10 (doel 10) | 100 pass | — |
| ✅ | vwo-43-subverwerker | legal | dwingend-recht | 17812 | 2 | 2/2 | 6 (doel 6) | 90 pass | — |
| ✅ | vwo-44-doorgifte-vs | legal | dwingend-recht | 8383 | 0 | 0/0 | – (doel 7) | 100 pass | — |
| ✅ | vwo-45-2fa | add | toevoeging-scope | 7335 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| ✅ | saas-46-staffel | trap | lijst-staffel | 5613 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | saas-47-verlenging | trap | non-unieke-find | 5985 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| ✅ | saas-48-exclusief | targeted | scope-precisie | 8507 | 1 | 1/1 | 2 (doel 2) | 65 borderline | — |
| ✅ | saas-49-cap | value | waarde | 7253 | 1 | 1/1 | 11 (doel 11) | 100 pass | — |
| ✅ | saas-50-escrow-vraag | question | advies-only | 18908 | 0 | 0/0 | – | 100 pass | — |
| ✅ | fr-51-typografie-quotes | trap | typografie | 3357 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| ✅ | fr-52-typografie-nbsp | trap | typografie | 6122 | 1 | 1/1 | 11 (doel 11) | 100 pass | — |
| ✅ | fr-53-dertig-dagen | trap | non-unieke-find | 10340 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| ✅ | fr-54-definitie-crossref | multi | kruisverwijzing-definitie | 9596 | 2 | 2/2 | 1,8 (doel 1,8) | 100 pass | — |
| ✅ | fr-55-bijlage-artikel | targeted | bijlage-scope | 4647 | 1 | 1/1 | B1.2 (doel B1.2) | 100 pass | — |
| ✅ | fr-56-hoofd-vs-bijlage | trap | bijlage-scope | 11468 | 1 | 1/1 | 1 (doel 1) | 100 pass | — |
| ✅ | fr-57-herschrijf-lang | tone | multi-alinea-lengte | 33004 | 8 | 8/8 | 8 (doel 8) | 60 borderline | — |
| ✅ | fr-58-bijlage3-guardrail | guardrail | niet-bestaand-doel | 3261 | 0 | 0/0 | – | 85 pass | — |
| ✅ | raam-59-diep-in-doc | long | lang-document | 4571 | 1 | 1/1 | 22 (doel 22) | 100 pass | — |
| ✅ | raam-60-truncatie | guardrail | truncatie | 2720 | 0 | 0/0 | – | 100 pass | — |
| ✅ | arb-61-ketenregeling | question | advies-only | 6446 | 0 | 0/0 | – | 100 pass | — |
| ✅ | huur-62-verhoging-8pct | legal | dwingend-recht | 9786 | 1 | 1/1 | 3 (doel 3) | 90 pass | — |
| ✅ | huur-63-boete-te-laat | legal | dwingend-recht | 14439 | 1 | 1/1 | 3 | 100 pass | — |
| ✅ | av-64-overal-behalve | multi | overal-vervangen-scope | 14955 | 10 | 10/10 | 2,3,4,8,10,11,12,13 (doel 2,3,4,8,10,11,12,13) | 75 fail | — |
| ✅ | zzp-65-auteursrecht | legal | juridische-volledigheid | 13565 | 1 | 1/1 | 8 (doel 8) | 100 pass | — |
| ✅ | zzp-66-schijnzelfstandig | legal | dwingend-recht | 16888 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| ✅ | vso-67-bedenktermijn | legal | dwingend-recht | 9392 | 0 | 0/0 | – | 100 pass | — |
| ✅ | tab-68-celwaarde | trap | tabel-cel | 4592 | 1 | 1/1 | 3 (doel 3) | 100 pass | — |
| ✅ | tab-69-twee-cellen | trap | tabel-cel | 6006 | 2 | 2/2 | 3 (doel 3) | 100 pass | — |
| ✅ | tab-71-capability-kolom | guardrail | capability-grens | 7361 | 0 | 0/0 | – | 70 borderline | — |
| ✅ | tab-72-fase-overal | trap | tabel-cel | 26541 | 1 | 1/1 | 4 (doel 3,4) | 75 borderline | — |
| ✅ | tek-73-paragraafteken | trap | speciale-tekens | 4543 | 1 | 1/1 | 2 (doel 2) | 100 pass | — |
| ✅ | tek-74-gedachtestreep | trap | speciale-tekens | 4771 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| ✅ | tek-75-half-procent | trap | speciale-tekens | 5689 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| ✅ | tek-76-trema | value | speciale-tekens | 5292 | 1 | 1/1 | 8 (doel 8) | 100 pass | — |
| ✅ | tek-77-curly-apostrof | trap | typografie | 7993 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| ✅ | tek-78-bedrag-decimalen | value | speciale-tekens | 3617 | 1 | 1/1 | 3 (doel 3) | 100 pass | — |
| ✅ | tek-79-beletselteken | trap | speciale-tekens | 5084 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | pos-80-eerste-voorkomen | trap | positioneel-voorkomen | 5119 | 1 | 1/1 | 8 (doel 8) | 100 pass | — |
| ✅ | pos-81-enkel-woord | trap | enkel-woord-anker | 4912 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| ✅ | pos-82-template-woord | trap | enkel-woord-anker | 25317 | 1 | 1/1 | 9 (doel 9) | 100 pass | — |
| ✅ | pos-83-woord-schrappen | targeted | enkel-woord-anker | 4283 | 1 | 1/1 | 2 (doel 2) | 100 pass | — |
| ✅ | cap-84-markeren | add | opmaak-actie | 8109 | 2 | 2/2 | 7 (doel 7) | 100 pass | — |
| ✅ | cap-85-koppen-stijl | guardrail | capability-grens | 19550 | 16 | 16/16 | 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16 | 85 pass | — |
| ✅ | cap-86-vet | add | opmaak-actie | 5087 | 1 | 1/1 | 3 (doel 3) | 100 pass | — |
| ✅ | cap-87-afbeelding | guardrail | capability-grens | 4348 | 0 | 0/0 | – | 100 pass | — |
| ✅ | ext-88-sub-item | trap | lijst-staffel | 5021 | 1 | 1/1 | 9 (doel 9) | 100 pass | — |
| ✅ | ext-89-inspanning-garantie | legal | herformulering-scope | 6137 | 1 | 1/1 | 3 (doel 3) | 100 pass | — |
| ✅ | ext-90-rekensom | question | advies-only | 1808 | 0 | 0/0 | – | 100 pass | — |
| ✅ | ren-91-hernoem-cascade | multi | hernummering-verwijzingen | 12374 | 6 | 6/6 | 5,2,8,10,11,B1.2 (doel 5,2,8,10,11,B1.2) | 100 pass | — |
| ✅ | ren-92-lid-sub | multi | hernummering-verwijzingen | 6206 | 2 | 2/2 | 4,7 (doel 4,7) | 100 pass | — |
| ✅ | ren-93-partieel | targeted | hernummering-verwijzingen | 5639 | 1 | 1/1 | 10 (doel 10) | 100 pass | — |
| ✅ | lst-94-punt-vier | trap | non-unieke-find | 5424 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | clr-95-ambigu-termijn | guardrail | verduidelijking | 7947 | 0 | 0/0 | – | 100 pass | — |
| ✅ | clr-96-ambigu-bedrag | guardrail | verduidelijking | 4958 | 0 | 0/0 | – | 100 pass | — |
| ✅ | clr-97-redelijke-default | targeted | verduidelijking | 10582 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |

## Niet-toepasbare suggesties (track-changes-risico)

## Judge-bevindingen (juridische inhoud)
- **arb-04-concurrentie-motivering** (60/100, borderline): Het wijzigingsvoorstel is afgekapt en eindigt midden in een woord/zin: “klantrelaties en be”.; Daardoor is artikel 7 niet bruikbaar en voldoet de voorgestelde motivering niet als afgeronde schriftelijke motivering in de zin van art. 7:653 BW.; De toelichting noemt terecht dat bij een arbeidsovereenkomst voor bepaalde tijd een concrete, functiespecifieke motivering van zwaarwegende bedrijfs- of dienstbelangen vereist is.; De voorgestelde motivering blijft bovendien vrij algemeen voor de functie van logistiek medewerker en onderbouwt beperkt waarom juist een concurrentiebeding noodzakelijk is, in plaats van bijvoorbeeld geheimhouding.
- **arb-08-geheimhouding-streng** (60/100, borderline): De voorgestelde aanscherping bevat geen expliciete uitzondering voor wettelijk beschermde meldingen, zoals klokkenluidersmeldingen, meldingen aan toezichthouders of overleg met juridisch adviseurs/vertegenwoordigers.; De uitzondering 'tenzij ... een wettelijke verplichting daartoe bestaat' is te smal geformuleerd, omdat openbaarmaking soms berust op een wettelijk recht of beschermde melding en niet alleen op een verplichting.; Het verbod op kopiëren is zeer absoluut geformuleerd en kan praktisch botsen met normale taakuitoefening, tenzij dit intern nader wordt toegestaan.; De wijzigingen maken artikel 8 wel duidelijk strenger en specifieker en blijven beperkt tot de geheimhoudingsbepaling.
- **huur-12-onderhoud-add** (95/100, pass): De voorgestelde bepaling gebruikt 'zijn rekening' terwijl Huurder in de overeenkomst een vrouw is; beter is 'haar rekening' of neutraal 'voor rekening van Huurder'.; De toelichting is juridisch begrijpelijk, maar vrij algemeen en noemt geen specifieke wettelijke basis zoals art. 7:217 BW/Besluit kleine herstellingen.
- **huur-14-wgv** (85/100, pass): De inhoudelijke conclusie is juist: € 2.400 is tweemaal de kale maandhuur van € 1.200 en dus toegestaan.; De wetsverwijzing lijkt onjuist: het maximum voor de waarborgsom staat niet in art. 2 lid 2 onder d Wgv, maar in een ander onderdeel van art. 2 lid 2 Wgv.
- **nda-18-uitzondering** (95/100, pass): Het voorstel voegt naast 'reeds openbaar bekend' ook 'openbaar bekend wordt' toe; dat is gebruikelijk, maar iets ruimer dan strikt gevraagd.
- **av-22-aansprakelijkheid** (70/100, borderline): Eerste wijziging is niet eenduidig strenger in het voordeel van Opdrachtnemer: toevoeging van het eigen risico verhoogt de cap ten opzichte van alleen het door de verzekering uitgekeerde bedrag.; Tweede vervangtekst is afgekapt en eindigt met 'Opdrachtneme', waardoor de clausule juridisch en taalkundig onvolledig is.; De uitzondering voor opzet of bewuste roekeloosheid is terecht, maar had zorgvuldiger volledig geformuleerd moeten worden.
- **av-25-incasso-multi** (50/100, fail): De voorgestelde clausule past wettelijke handelsrente en het minimum van € 40 onvoorwaardelijk toe, terwijl art. 6:119a BW en art. 6:96 lid 4 BW zien op handelstransacties en niet zonder meer op consumenten.; Er ontbreekt een waarschuwing dat, als Opdrachtgever ook consument kan zijn, wettelijke rente ex art. 6:119 BW en de consumentenregels voor incassokosten/veertiendagenbrief relevant zijn.; De verwijzing naar art. 6:119a BW en het minimum van € 40 bij handelstransacties is op zichzelf juist.
- **ahv-38-noncompete-vijfjaar** (90/100, pass): De assistent wijst terecht op kwetsbaarheid van een non-concurrentiebeding van vijf jaar onder redelijkheid en billijkheid en mogelijk mededingingsrecht.; De assistent mist dat artikel 11 bepaalt dat de overeenkomst van rechtswege eindigt zodra een partij geen aandelen meer houdt; daardoor kan artikel 8 na overdracht mogelijk niet meer doorwerken zonder carve-out/survival-bepaling.; De gevraagde termijnwijziging zelf is correct en beperkt tot artikel 8.
- **vwo-43-subverwerker** (90/100, pass): De assistent herkent terecht dat volledig zonder toestemming strijdig is met art. 28 lid 2 AVG en kiest voor algemene schriftelijke toestemming met informatie- en bezwaarrecht.; De voorgestelde clausule mist wel een expliciete bepaling dat Verwerker jegens de Verwerkingsverantwoordelijke volledig aansprakelijk blijft voor de nakoming door de sub-verwerker, zoals volgt uit art. 28 lid 4 AVG.
- **saas-48-exclusief** (65/100, borderline): De formulering 'een exclusief binnen Nederland ... recht' is juridisch wat onzuiver/ongelukkig en kan discussie geven over de exacte territoriale reikwijdte van gebruik versus exclusiviteit.; De assistent waarschuwt terecht dat exclusiviteit Novaplan kan beperken richting derden in Nederland, maar noemt niet dat een exclusieve auteursrechtelijke/softwarelicentie onder Nederlands recht schriftelijk en voldoende bepaald moet worden vastgelegd.; De wijziging maakt niet expliciet dat Novaplan binnen Nederland geen licenties aan derden mag verlenen of zelf concurrerend gebruik mag toestaan; dat kan bij exclusiviteit relevant zijn.
- **fr-57-herschrijf-lang** (60/100, borderline): De assistent noemt art. 7:920 lid 2 BW terecht, maar past de waarschuwing niet concreet toe op het beding: de postcontractuele non-concurrentie strekt zich uit tot 10 km buiten het Rayon en lijkt daarmee ruimer dan het gebied waarin de formule is geëxploiteerd.; De instructie vroeg om artikel 8 volledig te herschrijven; de assistent geeft alleen losse find/replace-voorstellen en geen integrale vervangende tekst voor artikel 8.; De juridische strekking wordt inderdaad grotendeels behouden, maar daardoor blijft een mogelijk niet-afdwingbaar postcontractueel non-concurrentiebeding ongewijzigd zonder expliciete waarschuwing bij de concrete passage.
- **fr-58-bijlage3-guardrail** (85/100, pass): De assistent heeft terecht niet zonder meer Bijlage 1 aangepast terwijl de instructie specifiek Bijlage 3 noemt.; Gezien de zichtbare bepaling over openingstijden in Bijlage 1 had de assistent beter een gerichte verduidelijkingsvraag kunnen stellen of dit artikel bedoeld was.; De wijziging naar 07:00–19:00 is niet voorgesteld, waardoor de opdracht materieel niet is uitgevoerd.
- **huur-62-verhoging-8pct** (90/100, pass): De wijziging in artikel 3 botst mogelijk met artikel 5, dat eveneens per 1 juli 2027 een CPI-indexering voorschrijft; dit kan leiden tot onduidelijkheid of cumulatie van verhogingen.; De assistent had moeten signaleren dat artikel 5 mogelijk ook moet worden aangepast of verduidelijkt om de 8%-verhoging juridisch consistent te verwerken.
- **av-64-overal-behalve** (75/100, fail): De assistent signaleert niet dat door artikel 1 ongewijzigd te laten de term ‘Leverancier’ buiten de definities wordt gebruikt terwijl alleen ‘Opdrachtnemer’ is gedefinieerd.; Alle voorkomens van ‘Opdrachtnemer’ buiten artikel 1 lijken wel correct en uitsluitend conform instructie te zijn vervangen.
- **tab-71-capability-kolom** (70/100, borderline): De assistent weigert onnodig: de tabel is als tab-gescheiden tekst aangeleverd en kon met find→replace-regels worden aangepast.; De gevraagde vierde kolom 'Korting' met '5%' per fase is niet toegevoegd.; De toelichting schuift de uitvoering ten onrechte door naar handmatige bewerking in Word.
- **tab-72-fase-overal** (75/100, borderline): De instructie was om overal “Fase 2” te vervangen door “Fase 2A”, maar het voorkomen in de tabel bij artikel 3 is niet als wijzigingsvoorstel opgenomen.; De toelichting schuift de tabelwijziging ten onrechte door naar handmatige aanpassing; de instructie was uitvoerbaar met een afzonderlijk voorstel voor die exacte tekst.
- **cap-85-koppen-stijl** (85/100, pass): De assistent voert slechts het blauw maken uit en verwerkt niet de gevraagde vergroting van het lettertype met één punt.; De weigering/mededeling dat lettergrootte niet als opmaaksuggestie kan worden verwerkt lijkt onnodig binnen de gevraagde opmaaktaak.