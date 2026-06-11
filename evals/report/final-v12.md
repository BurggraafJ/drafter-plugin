# Drafter eval-rapport — final-v12

**Pass: 87/89 (98%)** · latency p50 8515ms / p95 20648ms · 331.6s · profiel `default`

Per categorie: value 12/12 · legal 15/16 · add 7/7 · targeted 7/7 · question 6/6 · tone 2/3 · topic 3/3 · long 3/3 · trap 20/20 · multi 4/4 · guardrail 8/8

Per faalmodus: waarde 10/10 · dwingend-recht 13/14 · toevoeging-scope 6/6 · juridische-volledigheid 2/2 · scope-precisie 4/4 · advies-only 6/6 · herformulering-scope 3/3 · clausule-lokalisatie 3/3 · lang-document 3/3 · non-unieke-find 4/4 · multi-wijziging 1/1 · niet-bestaand-doel 2/2 · multi-artikel 1/1 · verwijdering 1/1 · lijst-staffel 2/2 · typografie 3/3 · kruisverwijzing-definitie 1/1 · bijlage-scope 2/2 · multi-alinea-lengte 0/1 · truncatie 1/1 · overal-vervangen-scope 1/1 · tabel-cel 3/3 · capability-grens 5/5 · speciale-tekens 6/6 · positioneel-voorkomen 1/1 · enkel-woord-anker 3/3

**Judge (juridische inhoud):** gemiddeld 93/100 over 89 cases · verdicts: pass 76, borderline 11, fail 2

| | Case | Cat | Faalmodus | ms | #sug | toepasbaar | scope→ | Judge | Reden(en) |
|---|---|---|---|---|---|---|---|---|---|
| ✅ | arb-01-salaris | value | waarde | 9953 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| ✅ | arb-02-proeftijd | legal | dwingend-recht | 16873 | 1 | 1/1 | 3 (doel 3) | 75 borderline | — |
| ✅ | arb-03-tussentijds | add | toevoeging-scope | 17241 | 1 | 1/1 | 2 (doel 2) | 100 pass | — |
| ✅ | arb-04-concurrentie-motivering | legal | juridische-volledigheid | 16855 | 1 | 1/1 | 7 (doel 7) | 70 borderline | — |
| ✅ | arb-05-concurrentie-duur | targeted | scope-precisie | 12216 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| ✅ | arb-06-vraag-geldigheid | question | advies-only | 16710 | 0 | 0/0 | – | 100 pass | — |
| ✅ | arb-07-arbeidsduur | value | waarde | 5239 | 1 | 1/1 | 4 (doel 4) | 90 pass | — |
| ✅ | arb-08-geheimhouding-streng | tone | herformulering-scope | 32407 | 2 | 2/2 | 8 (doel 8) | 60 borderline | — |
| ✅ | huur-09-huurprijs | value | waarde | 7724 | 1 | 1/1 | 3 (doel 3) | 85 pass | — |
| ✅ | huur-10-opzegtermijn | legal | dwingend-recht | 15555 | 1 | 1/1 | 8 (doel 8) | 85 pass | — |
| ✅ | huur-11-waarborg | legal | dwingend-recht | 12595 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | huur-12-onderhoud-add | add | toevoeging-scope | 11392 | 1 | 1/1 | 7 (doel 7) | 65 borderline | — |
| ✅ | huur-13-indexering | topic | clausule-lokalisatie | 10520 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| ✅ | huur-14-wgv | legal | dwingend-recht | 15224 | 0 | 0/0 | – (doel 6) | 100 pass | — |
| ✅ | nda-15-looptijd | value | waarde | 5448 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| ✅ | nda-16-boete | value | waarde | 7642 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | nda-17-forum | targeted | scope-precisie | 3855 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| ✅ | nda-18-uitzondering | add | toevoeging-scope | 9971 | 1 | 1/1 | 2 (doel 2) | 95 pass | — |
| ✅ | nda-19-vraag-boete | question | advies-only | 15573 | 0 | 0/0 | – | 85 pass | — |
| ✅ | av-20-opzeg | long | lang-document | 12111 | 1 | 1/1 | 14 (doel 14) | 100 pass | — |
| ✅ | av-21-betaaltermijn-trap | trap | non-unieke-find | 5220 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | av-22-aansprakelijkheid | tone | herformulering-scope | 26642 | 2 | 2/2 | 12 (doel 12) | 80 pass | — |
| ✅ | av-23-ie-gebruiksrecht | add | toevoeging-scope | 11210 | 1 | 1/1 | 11 (doel 11) | 100 pass | — |
| ✅ | av-24-forum | long | lang-document | 7167 | 1 | 1/1 | 16 (doel 16) | 100 pass | — |
| ✅ | av-25-incasso-multi | multi | multi-wijziging | 14170 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| ✅ | vso-26-vergoeding | value | waarde | 7418 | 1 | 1/1 | 3 (doel 3) | 85 pass | — |
| ✅ | vso-27-relatiebeding | targeted | scope-precisie | 9781 | 2 | 2/2 | 5 (doel 5) | 100 pass | — |
| ✅ | vso-28-getuigschrift-add | add | toevoeging-scope | 10275 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | vso-29-guardrail | guardrail | niet-bestaand-doel | 2638 | 0 | 0/0 | – | 100 pass | — |
| ✅ | zzp-30-tarief | value | waarde | 3823 | 1 | 1/1 | 3 (doel 3) | 100 pass | — |
| ✅ | h31-by-quote | topic | clausule-lokalisatie | 6199 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| ✅ | h32-multi-article | multi | multi-artikel | 6048 | 2 | 2/2 | 3,4 (doel 3,4) | 100 pass | — |
| ✅ | h33-broad-multi-instance | trap | non-unieke-find | 8515 | 2 | 2/2 | 3,6 (doel 3,6) | 100 pass | — |
| ✅ | h34-deletion | targeted | verwijdering | 10455 | 1 | 1/1 | 7 (doel 7) | 80 pass | — |
| ✅ | h35-ambiguous-ref | topic | clausule-lokalisatie | 4378 | 1 | 1/1 | 14 (doel 14) | 100 pass | — |
| ✅ | ahv-36-dragalong | add | dwingend-recht | 9744 | 1 | 1/1 | 6 (doel 6) | 90 pass | — |
| ✅ | ahv-37-aanbiedingstermijn | value | waarde | 4987 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| ✅ | ahv-38-noncompete-vijfjaar | legal | dwingend-recht | 11615 | 1 | 1/1 | 8 (doel 8) | 75 borderline | — |
| ✅ | ahv-39-blokkering-statuten | legal | dwingend-recht | 12680 | 1 | 1/1 | 5 (doel 5) | 95 pass | — |
| ✅ | ahv-40-vraag-tagalong | question | advies-only | 7997 | 0 | 0/0 | – | 100 pass | — |
| ✅ | vwo-41-datalek-24u | value | waarde | 15897 | 1 | 1/1 | 8 (doel 8) | 100 pass | — |
| ✅ | vwo-42-audit-schrappen | legal | dwingend-recht | 15125 | 1 | 1/1 | 10 (doel 10) | 100 pass | — |
| ✅ | vwo-43-subverwerker | legal | dwingend-recht | 19706 | 2 | 2/2 | 6 (doel 6) | 90 pass | — |
| ✅ | vwo-44-doorgifte-vs | legal | dwingend-recht | 9852 | 0 | 0/0 | – (doel 7) | 100 pass | — |
| ✅ | vwo-45-2fa | add | toevoeging-scope | 9259 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| ✅ | saas-46-staffel | trap | lijst-staffel | 5254 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | saas-47-verlenging | trap | non-unieke-find | 5819 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| ✅ | saas-48-exclusief | targeted | scope-precisie | 9667 | 1 | 1/1 | 2 (doel 2) | 75 borderline | — |
| ✅ | saas-49-cap | value | waarde | 8087 | 1 | 1/1 | 11 (doel 11) | 100 pass | — |
| ✅ | saas-50-escrow-vraag | question | advies-only | 20648 | 0 | 0/0 | – | 100 pass | — |
| ✅ | fr-51-typografie-quotes | trap | typografie | 4994 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| ✅ | fr-52-typografie-nbsp | trap | typografie | 7084 | 1 | 1/1 | 11 (doel 11) | 100 pass | — |
| ✅ | fr-53-dertig-dagen | trap | non-unieke-find | 8312 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| ✅ | fr-54-definitie-crossref | multi | kruisverwijzing-definitie | 9918 | 2 | 2/2 | 1,8 (doel 1,8) | 100 pass | — |
| ✅ | fr-55-bijlage-artikel | targeted | bijlage-scope | 5592 | 1 | 1/1 | B1.2 (doel B1.2) | 100 pass | — |
| ✅ | fr-56-hoofd-vs-bijlage | trap | bijlage-scope | 5217 | 1 | 1/1 | 1 (doel 1) | 100 pass | — |
| ❌ | fr-57-herschrijf-lang | tone | multi-alinea-lengte | 29920 | 3 | 2/3 | 8 (doel 8) | 60 borderline | 1/3 voorstel(len) niet toepasbaar in Word |
| ✅ | fr-58-bijlage3-guardrail | guardrail | niet-bestaand-doel | 3179 | 0 | 0/0 | – | 90 pass | — |
| ✅ | raam-59-diep-in-doc | long | lang-document | 3588 | 1 | 1/1 | 22 (doel 22) | 100 pass | — |
| ✅ | raam-60-truncatie | guardrail | truncatie | 3658 | 0 | 0/0 | – | 100 pass | — |
| ✅ | arb-61-ketenregeling | question | advies-only | 6548 | 0 | 0/0 | – | 100 pass | — |
| ❌ | huur-62-verhoging-8pct | legal | dwingend-recht | 66238 | 0 | 0/0 | – (doel 3) | 15 fail | reply benoemt het juridische punt niet (verwacht één van: maxim, wettelijk, toegesta) |
| ✅ | huur-63-boete-te-laat | legal | dwingend-recht | 14965 | 1 | 1/1 | 3 | 55 fail | — |
| ✅ | av-64-overal-behalve | multi | overal-vervangen-scope | 14210 | 10 | 10/10 | 2,3,4,8,10,11,12,13 (doel 2,3,4,8,10,11,12,13) | 100 pass | — |
| ✅ | zzp-65-auteursrecht | legal | juridische-volledigheid | 15319 | 1 | 1/1 | 8 (doel 8) | 100 pass | — |
| ✅ | zzp-66-schijnzelfstandig | legal | dwingend-recht | 12722 | 1 | 1/1 | 5 (doel 5) | 70 borderline | — |
| ✅ | vso-67-bedenktermijn | legal | dwingend-recht | 15801 | 0 | 0/0 | – | 100 pass | — |
| ✅ | tab-68-celwaarde | trap | tabel-cel | 4182 | 1 | 1/1 | 3 (doel 3) | 100 pass | — |
| ✅ | tab-69-twee-cellen | trap | tabel-cel | 6188 | 2 | 2/2 | 3 (doel 3) | 100 pass | — |
| ✅ | tab-71-capability-kolom | guardrail | capability-grens | 3000 | 0 | 0/0 | – | 70 borderline | — |
| ✅ | tab-72-fase-overal | trap | tabel-cel | 10340 | 1 | 1/1 | 4 (doel 3,4) | 75 borderline | — |
| ✅ | tek-73-paragraafteken | trap | speciale-tekens | 6385 | 1 | 1/1 | 2 (doel 2) | 95 pass | — |
| ✅ | tek-74-gedachtestreep | trap | speciale-tekens | 4153 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| ✅ | tek-75-half-procent | trap | speciale-tekens | 6717 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| ✅ | tek-76-trema | value | speciale-tekens | 6687 | 1 | 1/1 | 8 (doel 8) | 100 pass | — |
| ✅ | tek-77-curly-apostrof | trap | typografie | 7423 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| ✅ | tek-78-bedrag-decimalen | value | speciale-tekens | 5839 | 1 | 1/1 | 3 (doel 3) | 100 pass | — |
| ✅ | tek-79-beletselteken | trap | speciale-tekens | 4752 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | pos-80-eerste-voorkomen | trap | positioneel-voorkomen | 5375 | 1 | 1/1 | 8 (doel 8) | 100 pass | — |
| ✅ | pos-81-enkel-woord | trap | enkel-woord-anker | 5286 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| ✅ | pos-82-template-woord | trap | enkel-woord-anker | 4820 | 1 | 1/1 | 9 (doel 9) | 100 pass | — |
| ✅ | pos-83-woord-schrappen | targeted | enkel-woord-anker | 5445 | 1 | 1/1 | 2 (doel 2) | 100 pass | — |
| ✅ | cap-84-markeren | guardrail | capability-grens | 15829 | 0 | 0/0 | – | 90 pass | — |
| ✅ | cap-85-koppen-stijl | guardrail | capability-grens | 10793 | 0 | 0/0 | – | 85 pass | — |
| ✅ | cap-86-vet | guardrail | capability-grens | 2423 | 0 | 0/0 | – | 70 borderline | — |
| ✅ | cap-87-afbeelding | guardrail | capability-grens | 11329 | 0 | 0/0 | – | 100 pass | — |
| ✅ | ext-88-sub-item | trap | lijst-staffel | 6367 | 1 | 1/1 | 9 (doel 9) | 100 pass | — |
| ✅ | ext-89-inspanning-garantie | legal | herformulering-scope | 8727 | 1 | 1/1 | 3 (doel 3) | 100 pass | — |
| ✅ | ext-90-rekensom | question | advies-only | 2202 | 0 | 0/0 | – | 100 pass | — |

## Niet-toepasbare suggesties (track-changes-risico)
- **fr-57-herschrijf-lang**:
  - `find` (341 tekens): find 341 tekens > 255 (Word search-limiet); door server gemarkeerd als niet-toepasbaar (te lang (>255 tekens))

## Judge-bevindingen (juridische inhoud)
- **arb-02-proeftijd** (75/100, borderline): Een proeftijd van twee maanden bij een arbeidsovereenkomst voor bepaalde tijd van twaalf maanden is in beginsel niet toegestaan; de assistent signaleert dit terecht.; De toelichting dat de langere proeftijd slechts nietig is “voor zover” deze de maximumduur overschrijdt is juridisch onzuiver: het proeftijdbeding kan als geheel nietig zijn.; De assistent voert wel de juridisch ongeldige wijziging door en biedt geen compliant alternatief, zoals handhaving van één maand.
- **arb-04-concurrentie-motivering** (70/100, borderline): Het wijzigingsvoorstel eindigt afgebroken met 'zwaarwegende bedrijfsbelange', waardoor de clausule taalkundig en juridisch onvolledig is.; De motivering is wel enigszins toegespitst op functie en informatie, maar blijft vrij algemeen en werkt niet expliciet uit waarom juist dit concurrentiebeding qua duur, geografische reikwijdte en soort werkzaamheden noodzakelijk is.; De toelichting noemt terecht artikel 7:653 lid 2 BW en waarschuwt dat een algemene motivering onvoldoende kan zijn.
- **arb-07-arbeidsduur** (90/100, pass): De wijziging is juridisch op zichzelf juist en beperkt tot de gevraagde aanpassing.; De assistent signaleert wel gevolgen voor salaris/vakantie, maar benoemt niet dat de ongewijzigde werktijden van 08:30 tot 17:00 uur op vijf werkdagen mogelijk niet aansluiten bij een arbeidsduur van 36 uur per week.
- **arb-08-geheimhouding-streng** (60/100, borderline): De voorgestelde geheimhoudingsplicht is erg absoluut geformuleerd en bevat geen uitzondering voor wettelijke verplichtingen, rechterlijke/overheidsbevelen, juridisch advies of meldingen onder de Wet bescherming klokkenluiders.; Het verbod op kopiëren is onvoorwaardelijk geformuleerd en kan botsen met kopiëren dat nodig is voor de normale uitvoering van de werkzaamheden.; De toelichting op de Wet bescherming bedrijfsgeheimen is op hoofdlijnen juist, maar de voorgestelde tekst waarborgt niet expliciet dat bedrijfsgeheimen ook als zodanig redelijkerwijs geheim worden gehouden.
- **huur-09-huurprijs** (85/100, pass): De wijziging van artikel 3 is correct uitgevoerd en de inconsistentie met artikel 6 is terecht gesignaleerd.; Bij woonruimte had de assistent vollediger kunnen waarschuwen dat de huurprijs mogelijk onder het woningwaarderingsstelsel/middenhuurregime en wettelijke huurprijsbescherming kan vallen, zodat € 1.350 niet zonder meer afdwingbaar is als deze boven de wettelijke maximale huur uitkomt.
- **huur-10-opzegtermijn** (85/100, pass): De voorgestelde wijziging zelf leidt bij maandelijkse huurbetaling vermoedelijk tot een nietig beding; de toelichting waarschuwt daarvoor, maar formuleert dit te voorzichtig als 'kan nietig zijn'.; De assistent had sterker kunnen aangeven dat de wettelijk toegestane opzegtermijn voor Huurder hier één maand is.
- **huur-12-onderhoud-add** (65/100, borderline): De voorgestelde clausule is te ruim geformuleerd: 'onderhoudswerkzaamheden' kan ook onderhoud omvatten dat wettelijk of contractueel voor rekening van Verhuurder komt.; De toelichting noemt terecht art. 7:217 BW en het Besluit kleine herstellingen, maar verwerkt de beperking tot onderhoud voor rekening van Huurder niet expliciet in de vervangende tekst.; Er wordt niet benoemd dat een toestemmingsvereiste de wettelijke onderhoudsverdeling en de praktische uitvoering van kleine herstellingen niet mag doorkruisen.
- **nda-18-uitzondering** (95/100, pass): De voorgestelde uitzondering is juridisch gebruikelijk en inhoudelijk juist.; De replace-tekst gaat iets verder dan gevraagd door ook informatie op te nemen die later openbaar bekend wordt.; De formulering kan grammaticaal zo worden gelezen dat 'buiten toedoen of nalaten' alleen ziet op later openbaar worden, niet op reeds openbaar bekende informatie.
- **nda-19-vraag-boete** (85/100, pass): De stelling dat door 'direct opeisbaar' zonder meer geen ingebrekestelling of herstelmogelijkheid nodig is, is te stellig; art. 6:93 BW koppelt opeisbaarheid van een boete in beginsel aan dezelfde vereisten als schadevergoeding, tenzij partijen daarvan voldoende duidelijk afwijken of nakoming blijvend onmogelijk is.; Het punt over boete bij incidenten buiten schuld is terecht als procesrisico, maar had juridisch preciezer kunnen worden gekoppeld aan toerekenbaarheid/verzuim en de systematiek van art. 6:91-6:94 BW.
- **av-22-aansprakelijkheid** (80/100, pass): De waarschuwing over vernietigbaarheid is juist, maar blijft vrij algemeen; bij algemene voorwaarden had ook consumentenbescherming/grey list art. 6:237 BW kunnen worden genoemd indien Opdrachtgever ook consument kan zijn.; De voorgestelde beperking tot ‘directe schade’ wordt niet nader gedefinieerd, wat in aansprakelijkheidsclausules tot interpretatierisico kan leiden.; De uitzondering voor opzet of bewuste roekeloosheid van de leiding van Opdrachtnemer is juridisch gebruikelijk en correct verwerkt.
- **vso-26-vergoeding** (85/100, pass): De opmerking dat de verwijzing naar artikel 7:673 BW kan blijven staan is juridisch verdedigbaar, maar enigszins onnauwkeurig: bij beëindiging met wederzijds goedvinden is de wettelijke transitievergoeding niet rechtstreeks verschuldigd en de verwijzing kan bij een afwijkend bedrag tot interpretatievragen leiden.
- **h34-deletion** (80/100, pass): De instructie was om het concurrentiebeding in artikel 7 volledig te verwijderen; de assistent laat de artikelkop 'Artikel 7 — Concurrentiebeding' staan.; De assistent schuift het verwijderen van de kop en eventuele hernummering ten onrechte door naar handmatige aanpassing, terwijl dit binnen wijzigingsvoorstellen had kunnen worden meegenomen.; Er wordt alleen de materiële bedingtekst verwijderd, waardoor een leeg artikel met misleidende titel resteert.
- **ahv-36-dragalong** (90/100, pass): De drag-along is inhoudelijk in lijn met de instructie en bevat geen afzonderlijk waarderingsmechanisme.; De assistent waarschuwt terecht dat het ontbreken van een waarderingsmechanisme de positie van Van Galen verzwakt.; De voorgestelde tekst adresseert niet expliciet de verhouding tot de aanbiedingsplicht en blokkeringsregeling/statuten, bijvoorbeeld via een voorrangs- of medewerkingsbepaling.
- **ahv-38-noncompete-vijfjaar** (75/100, borderline): De assistent waarschuwt terecht dat een non-concurrentiebeding van vijf jaar juridisch kwetsbaar kan zijn en noemt artikel 6 Mededingingswet terecht als mogelijk relevant.; De waarschuwing is te algemeen: bij een non-concurrentiebeding van vijf jaar in een aandeelhouders-/overdrachtscontext had explicieter moeten worden gewezen op het reële risico van nietigheid wegens mededingingsrechtelijke ontoelaatbaarheid of disproportionaliteit.; De assistent mist dat artikel 11 bepaalt dat de overeenkomst eindigt zodra een partij geen aandelen meer houdt, wat de afdwingbaarheid van het post-transfer non-concurrentiebeding kan ondergraven.; Er wordt geen voorstel gedaan om artikel 11 of een survival-bepaling aan te passen, terwijl dat juridisch noodzakelijk kan zijn voor de beoogde werking na overdracht.
- **ahv-39-blokkering-statuten** (95/100, pass): De waarschuwing dat een statutaire blokkerings- of goedkeuringsregeling blijft gelden is terecht.; Het wijzigingsvoorstel raakt alleen artikel 5, maar de formulering 'is toegestaan' kan enigszins ruim worden gelezen en mogelijk spanning oproepen met de aanbiedingsplicht in artikel 4, omdat niet wordt verwezen naar overige contractuele beperkingen.
- **vwo-43-subverwerker** (90/100, pass): Terecht gesignaleerd dat volledig zonder toestemming in strijd is met art. 28 lid 2 AVG.; De voorgestelde algemene toestemming met informatieplicht en bezwaarrecht sluit aan bij art. 28 lid 2 AVG.; Artikel 28 lid 4 AVG vereist ook dat de verwerker volledig aansprakelijk blijft jegens de verwerkingsverantwoordelijke voor het nakomen van verplichtingen door de sub-verwerker; dit is niet toegevoegd.; De regeling bevat geen nadere termijn of procedure voor bezwaar, hoewel dat niet expliciet wettelijk voorgeschreven is.
- **saas-48-exclusief** (75/100, borderline): De voorgestelde formulering 'een exclusief voor Klant binnen Nederland ... recht' is juridisch en taalkundig onzuiver en laat onduidelijk wat de exclusiviteit precies inhoudt.; Niet benoemd dat een exclusieve auteursrechtelijke licentie naar Nederlands recht in beginsel bij akte moet worden verleend.; De afbakening van exclusiviteit ten opzichte van Novaplan zelf, bestaande klanten en licenties buiten Nederland is slechts deels gesignaleerd en niet verwerkt.
- **fr-57-herschrijf-lang** (60/100, borderline): De assistent noemt art. 7:920 lid 2 BW terecht, maar waarschuwt niet concreet dat de geografische reikwijdte 'Rayon plus 10 km' waarschijnlijk verder gaat dan toegestaan voor een postcontractueel non-concurrentiebeding in franchise.; Artikel 8 is niet volledig effectief herschreven, omdat wijzigingsvoorstel 1 als niet-plaatsbaar is gemarkeerd en dus niet wordt toegepast.; De toelichting suggereert behoud van juridische strekking zonder te signaleren dat die strekking mogelijk deels niet afdwingbaar/nietig is wegens de wettelijke franchisevoorwaarden.; De kop van artikel 8 is niet meegenomen, hoewel om volledige herschrijving van artikel 8 is gevraagd.
- **fr-58-bijlage3-guardrail** (90/100, pass): Bijlage 3 komt niet voor in de aangeleverde tekst; de assistent heeft terecht niet zonder bevestiging Bijlage 1 aangepast.; De assistent had vollediger kunnen zijn door een concreet alternatief wijzigingsvoorstel voor Bijlage 1 artikel 3 te formuleren onder voorbehoud van bevestiging.
- **huur-62-verhoging-8pct** (15/100, fail): Geen wijzigingsvoorstel gedaan voor artikel 3 ondanks expliciete instructie.; Geen waarschuwing gegeven dat een huurverhoging van 8% voor woonruimte mogelijk wettelijk gemaximeerd is en afhankelijk is van het toepasselijke huurprijsregime en de regels per 1 juli 2027.; Geen afstemming met artikel 5 over CPI-indexering, waardoor mogelijke inconsistentie of cumulatie van huurverhogingen onbesproken blijft.; De mededeling dat het antwoord te lang was en is afgekapt is niet inhoudelijk en helpt de jurist niet verder.
- **huur-63-boete-te-laat** (55/100, fail): Waarschuwing is te beperkt: bij woonruimte met particuliere huurder kan een boete van € 250 per dag zonder maximum als oneerlijk beding worden vernietigd/buiten toepassing blijven, niet slechts worden gematigd op grond van art. 6:94 BW.; Geen aandacht voor consumentenbescherming en de wettelijke regeling rond incassokosten/14-dagenbrief bij particuliere huurders.; Het voorstel voegt ongevraagd behoud van wettelijke rente en aanvullende schadevergoeding toe, wat de sanctie verzwaart en buiten de instructie valt.; De boete zonder maximum wordt wel letterlijk ingevoegd ondanks aanzienlijke afdwingbaarheidsrisico’s; een veiliger alternatief of explicietere juridische waarschuwing ontbreekt.
- **zzp-66-schijnzelfstandig** (70/100, borderline): De waarschuwing voor het risico op kwalificatie als arbeidsovereenkomst vanwege gezag en vaste aanwezigheid is terecht en verwijst correct naar art. 7:610 BW.; De voorgestelde dagelijkse aanwezigheid van 9:00 tot 17:00 uur is niet verenigbaar met artikel 2, waarin gemiddeld 24 uur per week is overeengekomen; dit conflict wordt niet benoemd of opgelost.; De instructie vroeg om 'alle instructies'; de assistent beperkt dit tot 'redelijke instructies' betreffende uitvoering en afstemming. Dat is juridisch verdedigbaar, maar wijkt wel af van de opdracht.; De toevoeging 'op werkdagen' is een interpretatie van 'dagelijks' en beperkt de gevraagde formulering zonder expliciete toelichting.
- **tab-71-capability-kolom** (70/100, borderline): De assistent voert de gevraagde wijziging niet uit en geeft geen find→replace-voorstel.; De weigering is onnodig: ook bij een tabel in platte tekst kan een tekstueel vervangingsvoorstel worden gedaan waarmee de kolom 'Korting' en per rij '5%' wordt toegevoegd.; Er is geen juridisch risico dat een waarschuwing of weigering rechtvaardigt.
- **tab-72-fase-overal** (75/100, borderline): De instructie was om overal “Fase 2” te vervangen door “Fase 2A”; het voorstel dekt slechts artikel 4 en laat artikel 3/tabel ongewijzigd.; De opgegeven reden om de tabelcel niet te wijzigen is geen juridisch-inhoudelijke waarschuwing en leidt ertoe dat de opdracht niet volledig wordt uitgevoerd.
- **tek-73-paragraafteken** (95/100, pass): Het wijzigingsvoorstel zoekt enkel op “§ 6.2” en is niet verankerd in artikel 2 of de volledige zin, waardoor bij eventuele andere voorkomens in het document ook onbedoeld kan worden vervangen.
- **cap-84-markeren** (90/100, pass): De assistent voert de gevraagde markering niet uit en geeft geen alternatief wijzigingsvoorstel waarmee artikel 7 herkenbaar wordt gemarkeerd.; Er is geen juridisch-inhoudelijke beoordeling gevraagd; het uitblijven daarvan is daarom niet problematisch.
- **cap-85-koppen-stijl** (85/100, pass): Het verzoek betrof uitsluitend opmaak; er is geen juridisch-inhoudelijke onjuistheid.; De assistent voert het legitieme verzoek niet uit en geeft slechts aan dat dit handmatig moet worden toegepast.; Er worden geen ongerelateerde tekstuele wijzigingen voorgesteld.
- **cap-86-vet** (70/100, borderline): De assistent voert de concrete instructie niet uit en geeft geen wijzigingsvoorstel om het bedrag vet te maken.; Het verzoek is legitiem en niet juridisch riskant; de weigering/afwijzing is onnodig.; Er zijn geen juridische onjuistheden, maar de gevraagde Word-wijziging blijft achterwege.