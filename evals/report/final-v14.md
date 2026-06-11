# Drafter eval-rapport — final-v14

**Pass: 91/93 (98%)** · latency p50 6908ms / p95 19506ms · 296.8s · profiel `default`

Per categorie: value 12/12 · legal 16/16 · add 9/9 · targeted 8/8 · question 6/6 · tone 2/3 · topic 3/3 · long 3/3 · trap 20/21 · multi 6/6 · guardrail 6/6

Per faalmodus: waarde 10/10 · dwingend-recht 14/14 · toevoeging-scope 6/6 · juridische-volledigheid 2/2 · scope-precisie 4/4 · advies-only 6/6 · herformulering-scope 3/3 · clausule-lokalisatie 3/3 · lang-document 3/3 · non-unieke-find 5/5 · multi-wijziging 1/1 · niet-bestaand-doel 2/2 · multi-artikel 1/1 · verwijdering 1/1 · lijst-staffel 2/2 · typografie 3/3 · kruisverwijzing-definitie 1/1 · bijlage-scope 2/2 · multi-alinea-lengte 0/1 · truncatie 1/1 · overal-vervangen-scope 1/1 · tabel-cel 3/3 · capability-grens 3/3 · speciale-tekens 6/6 · positioneel-voorkomen 1/1 · enkel-woord-anker 2/3 · opmaak-actie 2/2 · hernummering-verwijzingen 3/3

**Judge (juridische inhoud):** gemiddeld 92/100 over 93 cases · verdicts: pass 77, borderline 13, fail 3

| | Case | Cat | Faalmodus | ms | #sug | toepasbaar | scope→ | Judge | Reden(en) |
|---|---|---|---|---|---|---|---|---|---|
| ✅ | arb-01-salaris | value | waarde | 3573 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| ✅ | arb-02-proeftijd | legal | dwingend-recht | 13943 | 1 | 1/1 | 3 (doel 3) | 70 borderline | — |
| ✅ | arb-03-tussentijds | add | toevoeging-scope | 13433 | 1 | 1/1 | 2 (doel 2) | 100 pass | — |
| ✅ | arb-04-concurrentie-motivering | legal | juridische-volledigheid | 20225 | 1 | 1/1 | 7 (doel 7) | 60 borderline | — |
| ✅ | arb-05-concurrentie-duur | targeted | scope-precisie | 12284 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| ✅ | arb-06-vraag-geldigheid | question | advies-only | 8272 | 0 | 0/0 | – | 100 pass | — |
| ✅ | arb-07-arbeidsduur | value | waarde | 5865 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| ✅ | arb-08-geheimhouding-streng | tone | herformulering-scope | 19506 | 1 | 1/1 | 8 (doel 8) | 35 fail | — |
| ✅ | huur-09-huurprijs | value | waarde | 6100 | 1 | 1/1 | 3 (doel 3) | 75 borderline | — |
| ✅ | huur-10-opzegtermijn | legal | dwingend-recht | 12677 | 0 | 0/0 | – (doel 8) | 100 pass | — |
| ✅ | huur-11-waarborg | legal | dwingend-recht | 19870 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | huur-12-onderhoud-add | add | toevoeging-scope | 12201 | 1 | 1/1 | 7 (doel 7) | 60 borderline | — |
| ✅ | huur-13-indexering | topic | clausule-lokalisatie | 4276 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| ✅ | huur-14-wgv | legal | dwingend-recht | 7433 | 0 | 0/0 | – (doel 6) | 100 pass | — |
| ✅ | nda-15-looptijd | value | waarde | 4682 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| ✅ | nda-16-boete | value | waarde | 7113 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | nda-17-forum | targeted | scope-precisie | 8399 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| ✅ | nda-18-uitzondering | add | toevoeging-scope | 9042 | 1 | 1/1 | 2 (doel 2) | 100 pass | — |
| ✅ | nda-19-vraag-boete | question | advies-only | 17488 | 0 | 0/0 | – | 100 pass | — |
| ✅ | av-20-opzeg | long | lang-document | 3674 | 1 | 1/1 | 14 (doel 14) | 100 pass | — |
| ✅ | av-21-betaaltermijn-trap | trap | non-unieke-find | 4409 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | av-22-aansprakelijkheid | tone | herformulering-scope | 26737 | 2 | 2/2 | 12 (doel 12) | 80 pass | — |
| ✅ | av-23-ie-gebruiksrecht | add | toevoeging-scope | 15622 | 1 | 1/1 | 11 (doel 11) | 100 pass | — |
| ✅ | av-24-forum | long | lang-document | 3608 | 1 | 1/1 | 16 (doel 16) | 100 pass | — |
| ✅ | av-25-incasso-multi | multi | multi-wijziging | 15451 | 1 | 1/1 | 7 (doel 7) | 70 borderline | — |
| ✅ | vso-26-vergoeding | value | waarde | 3710 | 1 | 1/1 | 3 (doel 3) | 100 pass | — |
| ✅ | vso-27-relatiebeding | targeted | scope-precisie | 9060 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| ✅ | vso-28-getuigschrift-add | add | toevoeging-scope | 10043 | 1 | 1/1 | 6 (doel 6) | 70 borderline | — |
| ✅ | vso-29-guardrail | guardrail | niet-bestaand-doel | 2804 | 0 | 0/0 | – | 100 pass | — |
| ✅ | zzp-30-tarief | value | waarde | 5146 | 1 | 1/1 | 3 (doel 3) | 100 pass | — |
| ✅ | h31-by-quote | topic | clausule-lokalisatie | 3861 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| ✅ | h32-multi-article | multi | multi-artikel | 5997 | 2 | 2/2 | 3,4 (doel 3,4) | 100 pass | — |
| ✅ | h33-broad-multi-instance | trap | non-unieke-find | 6872 | 2 | 2/2 | 3,6 (doel 3,6) | 100 pass | — |
| ✅ | h34-deletion | targeted | verwijdering | 6265 | 2 | 2/2 | 7 (doel 7) | 100 pass | — |
| ✅ | h35-ambiguous-ref | topic | clausule-lokalisatie | 4443 | 1 | 1/1 | 14 (doel 14) | 100 pass | — |
| ✅ | ahv-36-dragalong | add | dwingend-recht | 11530 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | ahv-37-aanbiedingstermijn | value | waarde | 4571 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| ✅ | ahv-38-noncompete-vijfjaar | legal | dwingend-recht | 10608 | 1 | 1/1 | 8 (doel 8) | 60 borderline | — |
| ✅ | ahv-39-blokkering-statuten | legal | dwingend-recht | 13806 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| ✅ | ahv-40-vraag-tagalong | question | advies-only | 7011 | 0 | 0/0 | – | 100 pass | — |
| ✅ | vwo-41-datalek-24u | value | waarde | 6763 | 1 | 1/1 | 8 (doel 8) | 100 pass | — |
| ✅ | vwo-42-audit-schrappen | legal | dwingend-recht | 12460 | 2 | 2/2 | 10 (doel 10) | 100 pass | — |
| ✅ | vwo-43-subverwerker | legal | dwingend-recht | 16191 | 1 | 1/1 | 6 (doel 6) | 75 borderline | — |
| ✅ | vwo-44-doorgifte-vs | legal | dwingend-recht | 9329 | 0 | 0/0 | – (doel 7) | 100 pass | — |
| ✅ | vwo-45-2fa | add | toevoeging-scope | 7285 | 1 | 1/1 | 5 (doel 5) | 90 pass | — |
| ✅ | saas-46-staffel | trap | lijst-staffel | 6133 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | saas-47-verlenging | trap | non-unieke-find | 5674 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| ✅ | saas-48-exclusief | targeted | scope-precisie | 5902 | 1 | 1/1 | 2 (doel 2) | 100 pass | — |
| ✅ | saas-49-cap | value | waarde | 6560 | 1 | 1/1 | 11 (doel 11) | 100 pass | — |
| ✅ | saas-50-escrow-vraag | question | advies-only | 19087 | 0 | 0/0 | – | 100 pass | — |
| ✅ | fr-51-typografie-quotes | trap | typografie | 8154 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| ✅ | fr-52-typografie-nbsp | trap | typografie | 6032 | 1 | 1/1 | 11 (doel 11) | 100 pass | — |
| ✅ | fr-53-dertig-dagen | trap | non-unieke-find | 16301 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| ✅ | fr-54-definitie-crossref | multi | kruisverwijzing-definitie | 9334 | 2 | 2/2 | 1,8 (doel 1,8) | 100 pass | — |
| ✅ | fr-55-bijlage-artikel | targeted | bijlage-scope | 4698 | 1 | 1/1 | B1.2 (doel B1.2) | 100 pass | — |
| ✅ | fr-56-hoofd-vs-bijlage | trap | bijlage-scope | 5681 | 1 | 1/1 | 1 (doel 1) | 100 pass | — |
| ❌ | fr-57-herschrijf-lang | tone | multi-alinea-lengte | 15547 | 3 | 2/3 | 8 (doel 8) | 40 fail | 1/3 voorstel(len) niet toepasbaar in Word |
| ✅ | fr-58-bijlage3-guardrail | guardrail | niet-bestaand-doel | 4681 | 0 | 0/0 | – | 100 pass | — |
| ✅ | raam-59-diep-in-doc | long | lang-document | 4501 | 1 | 1/1 | 22 (doel 22) | 100 pass | — |
| ✅ | raam-60-truncatie | guardrail | truncatie | 3192 | 0 | 0/0 | – | 100 pass | — |
| ✅ | arb-61-ketenregeling | question | advies-only | 8622 | 0 | 0/0 | – | 80 pass | — |
| ✅ | huur-62-verhoging-8pct | legal | dwingend-recht | 13042 | 1 | 1/1 | 3 (doel 3) | 100 pass | — |
| ✅ | huur-63-boete-te-laat | legal | dwingend-recht | 11539 | 1 | 1/1 | 3 | 70 borderline | — |
| ✅ | av-64-overal-behalve | multi | overal-vervangen-scope | 12413 | 10 | 10/10 | 2,3,4,8,10,11,12,13 (doel 2,3,4,8,10,11,12,13) | 100 pass | — |
| ✅ | zzp-65-auteursrecht | legal | juridische-volledigheid | 20392 | 1 | 1/1 | 8 (doel 8) | 85 pass | — |
| ✅ | zzp-66-schijnzelfstandig | legal | dwingend-recht | 14753 | 1 | 1/1 | 5 (doel 5) | 75 borderline | — |
| ✅ | vso-67-bedenktermijn | legal | dwingend-recht | 11625 | 0 | 0/0 | – | 100 pass | — |
| ✅ | tab-68-celwaarde | trap | tabel-cel | 4204 | 1 | 1/1 | 3 (doel 3) | 100 pass | — |
| ✅ | tab-69-twee-cellen | trap | tabel-cel | 5302 | 2 | 2/2 | 3 (doel 3) | 100 pass | — |
| ✅ | tab-71-capability-kolom | guardrail | capability-grens | 4946 | 0 | 0/0 | – | 85 pass | — |
| ✅ | tab-72-fase-overal | trap | tabel-cel | 8239 | 1 | 1/1 | 4 (doel 3,4) | 70 borderline | — |
| ✅ | tek-73-paragraafteken | trap | speciale-tekens | 3770 | 1 | 1/1 | 2 (doel 2) | 100 pass | — |
| ✅ | tek-74-gedachtestreep | trap | speciale-tekens | 7713 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| ✅ | tek-75-half-procent | trap | speciale-tekens | 5370 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| ✅ | tek-76-trema | value | speciale-tekens | 4608 | 1 | 1/1 | 8 (doel 8) | 100 pass | — |
| ✅ | tek-77-curly-apostrof | trap | typografie | 6908 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| ✅ | tek-78-bedrag-decimalen | value | speciale-tekens | 4888 | 1 | 1/1 | 3 (doel 3) | 100 pass | — |
| ✅ | tek-79-beletselteken | trap | speciale-tekens | 6593 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | pos-80-eerste-voorkomen | trap | positioneel-voorkomen | 4662 | 1 | 1/1 | 8 (doel 8) | 100 pass | — |
| ✅ | pos-81-enkel-woord | trap | enkel-woord-anker | 5193 | 1 | 1/1 | 4 (doel 4) | 80 pass | — |
| ❌ | pos-82-template-woord | trap | enkel-woord-anker | 3982 | 1 | 0/1 | – (doel 9) | 85 pass | 1/1 voorstel(len) niet toepasbaar in Word; target-artikel(en) 9 niet geraakt |
| ✅ | pos-83-woord-schrappen | targeted | enkel-woord-anker | 11815 | 1 | 1/1 | 2 (doel 2) | 100 pass | — |
| ✅ | cap-84-markeren | add | opmaak-actie | 5622 | 1 | 1/1 | 7 (doel 7) | 70 borderline | — |
| ✅ | cap-85-koppen-stijl | guardrail | capability-grens | 17683 | 16 | 16/16 | 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16 | 65 borderline | — |
| ✅ | cap-86-vet | add | opmaak-actie | 3692 | 1 | 1/1 | 3 (doel 3) | 35 fail | — |
| ✅ | cap-87-afbeelding | guardrail | capability-grens | 5364 | 0 | 0/0 | – | 100 pass | — |
| ✅ | ext-88-sub-item | trap | lijst-staffel | 5592 | 1 | 1/1 | 9 (doel 9) | 100 pass | — |
| ✅ | ext-89-inspanning-garantie | legal | herformulering-scope | 8068 | 1 | 1/1 | 3 (doel 3) | 100 pass | — |
| ✅ | ext-90-rekensom | question | advies-only | 1847 | 0 | 0/0 | – | 100 pass | — |
| ✅ | ren-91-hernoem-cascade | multi | hernummering-verwijzingen | 11127 | 6 | 6/6 | 5,2,8,10,11,B1.2 (doel 5,2,8,10,11,B1.2) | 100 pass | — |
| ✅ | ren-92-lid-sub | multi | hernummering-verwijzingen | 7152 | 2 | 2/2 | 4,7 (doel 4,7) | 100 pass | — |
| ✅ | ren-93-partieel | targeted | hernummering-verwijzingen | 4633 | 1 | 1/1 | 10 (doel 10) | 100 pass | — |
| ✅ | lst-94-punt-vier | trap | non-unieke-find | 4708 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |

## Niet-toepasbare suggesties (track-changes-risico)
- **fr-57-herschrijf-lang**:
  - `find` (341 tekens): find 341 tekens > 255 (Word search-limiet); door server gemarkeerd als niet-toepasbaar (te lang (>255 tekens))
- **pos-82-template-woord**:
  - `find` (40 tekens): find komt 28x voor (niet uniek → mogelijk verkeerde locatie); door server gemarkeerd als niet-toepasbaar (niet uniek)

## Judge-bevindingen (juridische inhoud)
- **arb-02-proeftijd** (70/100, borderline): De toelichting signaleert terecht dat een proeftijd van twee maanden bij een arbeidsovereenkomst voor bepaalde tijd van twaalf maanden in strijd is met art. 7:652 BW en nietig is.; Het wijzigingsvoorstel voert desondanks een juridisch nietige proeftijd in, zonder een juridisch houdbaar alternatief voor te stellen, zoals handhaving van één maand.; De formulering 'in beginsel nietig' is enigszins voorzichtig; zonder aanwijzing voor een relevante uitzondering is een proeftijd van twee maanden hier nietig.
- **arb-04-concurrentie-motivering** (60/100, borderline): De voorgestelde vervangende tekst breekt af met 'klant- en proces' en is daardoor juridisch en taalkundig onbruikbaar.; De motivering is vrij algemeen en mogelijk onvoldoende concreet toegespitst op de functie van logistiek medewerker en de daadwerkelijke bedrijfsbelangen.; De toelichting benoemt terecht dat bij een arbeidsovereenkomst voor bepaalde tijd een schriftelijke motivering van zwaarwegende bedrijfs- of dienstbelangen vereist is op grond van art. 7:653 BW.
- **arb-08-geheimhouding-streng** (35/100, fail): Het vervangingsvoorstel is afgebroken en eindigt met 'gebruik', waardoor de clausule juridisch en taalkundig onbruikbaar is.; De toelichting stelt dat een teruggave-/verwijderplicht wordt opgenomen, maar die staat niet daadwerkelijk in de voorgestelde tekst.; Er ontbreekt een noodzakelijke nuance dat geheimhouding niet geldt voor wettelijk verplichte of beschermde meldingen, zoals meldingen van misstanden/klokkenluiden of informatieverstrekking aan bevoegde autoriteiten.; De verwijzing naar art. 7:611 BW is op zichzelf juist, maar de uitwerking is onvolledig en te absoluut geformuleerd.
- **huur-09-huurprijs** (75/100, borderline): Geen waarschuwing dat de aanvangshuurprijs voor zelfstandige woonruimte mogelijk gebonden is aan het WWS/maximale huurprijsstelsel en, afhankelijk van punten/liberalisatie, niet zonder meer vrij kan worden verhoogd.; Wel terecht gesignaleerd dat artikel 6 rekenkundig inconsistent wordt met ‘twee maanden huur’ en terecht niet ongevraagd aangepast.
- **huur-12-onderhoud-add** (60/100, borderline): De verwijzing naar art. 7:217 BW dekt vooral kleine herstellingen door de huurder; groot onderhoud bij de verhuurder volgt niet zuiver uit die bepaling alleen.; De voorgestelde clausule is erg breed en kan ook wettelijke rechten van de huurder raken, bijvoorbeeld bij gebrekenherstel als de verhuurder tekortschiet.; Er ontbreekt een carve-out dat de bepaling geen afbreuk doet aan dwingendrechtelijke rechten en verplichtingen bij woonruimtehuur.; De waarschuwing over dwingend recht is nuttig, maar onvoldoende concreet gekoppeld aan de voorgestelde toestemmingsplicht.
- **av-22-aansprakelijkheid** (80/100, pass): De formulering 'uitsluitend beperkt tot directe schade' is juridisch en taalkundig onnauwkeurig; beter is dat aansprakelijkheid uitsluitend bestaat voor directe schade.; De waarschuwing over vernietigbaarheid van algemene voorwaarden is juist, maar blijft algemeen en benoemt niet dat bij consumentenrelaties ook de zwarte/grijze lijst relevant kan zijn.; Het voorbehoud 'opzet of bewuste roekeloosheid van de leiding' is gebruikelijk, maar had preciezer kunnen aansluiten bij de rechtspraak over leidinggevende ondergeschikten.
- **av-23-ie-gebruiksrecht** (100/100, pass): Geen wezenlijke juridisch-inhoudelijke gebreken.; De clausule had desgewenst nog duur en omvang van het gebruiksrecht kunnen specificeren, maar dat was niet noodzakelijk voor de gegeven instructie.
- **av-25-incasso-multi** (70/100, borderline): De verwijzing naar art. 6:119a BW en het minimum van € 40 op grond van art. 6:96 lid 4 BW zijn juist voor handelsovereenkomsten, maar de clausule is niet beperkt tot B2B/handelsovereenkomsten.; Er ontbreekt een expliciete waarschuwing dat wettelijke handelsrente en het € 40-minimum niet zonder meer gelden tegenover consumenten en dat bij consumenten de 14-dagenbrief en consumentenbescherming relevant zijn.; De vervanging verwijst algemeen naar art. 6:96 BW en laat de eerdere verwijzing naar de Wet normering buitengerechtelijke incassokosten vervallen, wat juridisch minder precies kan zijn.
- **vso-28-getuigschrift-add** (70/100, borderline): Artikel 7:656 BW bepaalt dat de werkgever op verzoek bij het einde van de arbeidsovereenkomst een getuigschrift verstrekt; een termijn van veertien dagen ná de einddatum kan daarmee op gespannen voet staan als de werknemer tijdig verzoekt.; De toelichting noemt de wettelijke verplichting, maar waarschuwt niet expliciet dat de voorgestelde formulering niet mag afdoen aan het wettelijke recht op verstrekking bij het einde van de arbeidsovereenkomst.
- **ahv-38-noncompete-vijfjaar** (60/100, borderline): De assistent signaleert wel een algemeen risico bij een non-concurrentiebeding van vijf jaar, maar benoemt niet concreet de mededingingsrechtelijke kwetsbaarheid van een langdurig en ruim aandeelhouders-non-concurrentiebeding in het kader van aandelenoverdracht.; De assistent mist dat artikel 11 bepaalt dat de overeenkomst eindigt zodra een partij geen aandelen meer houdt; zonder overlevingsbepaling kan het post-contractuele non-concurrentiebeding uit artikel 8 praktisch worden ondergraven.; De wijziging zelf voert de gevraagde tekstuele verlenging correct en beperkt uit.
- **vwo-43-subverwerker** (75/100, borderline): De assistent signaleert terecht dat volledig zonder toestemming niet strookt met art. 28 lid 2 AVG en kiest voor algemene schriftelijke toestemming.; De voorgestelde clausule mist het verplichte element dat de verwerkingsverantwoordelijke bij voorgenomen toevoegingen of vervangingen de mogelijkheid moet krijgen bezwaar te maken.; De toelichting stelt dat de verplichte informatieplicht is behouden, maar benoemt niet expliciet het bezwaarrecht uit art. 28 lid 2 AVG.
- **vwo-45-2fa** (90/100, pass): De gevraagde exclusiviteit ('uitsluitend met tweefactorauthenticatie') is niet expliciet overgenomen; de voorgestelde tekst noemt tweefactorauthenticatie slechts als beveiligingsmaatregel.; De verwijzing naar artikel 32 AVG is juridisch juist.
- **saas-48-exclusief** (100/100, pass): Geen wezenlijke juridisch-inhoudelijke gebreken.; De assistent signaleert terecht dat exclusiviteit nader kan worden afgebakend, bijvoorbeeld ten aanzien van bestaande klanten en groepsmaatschappijen.
- **fr-57-herschrijf-lang** (40/100, fail): De assistent signaleert artikel 7:920 lid 2 BW wel, maar waarschuwt niet dat de postcontractuele geografische beperking tot buiten het Rayon waarschijnlijk strijdig is met de wettelijke eis dat deze niet verder mag gaan dan het exclusieve gebied.; Artikel 8 is niet volledig herschreven: de kop ontbreekt en voorstel 1 bevat geen artikellidnummer in de FIND, waardoor het niet plaatsbaar is en 8.1 feitelijk niet wordt gewijzigd.; De instructie vroeg om volledige herschrijving van artikel 8; de wijzigingsvoorstellen dekken dit praktisch niet af doordat een essentieel onderdeel niet wordt toegepast.; De tekstwijzigingen zelf blijven inhoudelijk grotendeels binnen de gevraagde taalkundige modernisering.
- **arb-61-ketenregeling** (80/100, pass): Het antwoord begint met 'Ja' en stelt dat bij het derde contract een arbeidsovereenkomst voor onbepaalde tijd ontstaat, maar concludeert later terecht het tegenovergestelde.; De kernregel van art. 7:668a BW wordt verder grotendeels juist weergegeven: meer dan drie contracten of meer dan 36 maanden.; De tegenstrijdigheid maakt de toelichting verwarrend voor de gebruiker.
- **huur-63-boete-te-laat** (70/100, borderline): De waarschuwing dat het beding bij consumentenhuur/woonruimte juridisch kwetsbaar is, is terecht, maar had sterker moeten benoemen dat een oneerlijk boetebeding buiten toepassing kan blijven/vernietigbaar is en niet slechts kan worden gematigd.; De verwijzing naar rechterlijke matiging is op zichzelf juist voor boetebedingen, maar bij oneerlijke consumentenbedingen is matiging/reductie juridisch problematisch en doorgaans niet toegestaan.; Het voorstel voegt ongevraagd toe dat geen ingebrekestelling vereist is; dat raakt de verzuimregeling en gaat verder dan enkel de gevraagde boete.; Er is geen veiliger alternatief of maximum voorgesteld, ondanks het expliciet gesignaleerde risico.
- **zzp-65-auteursrecht** (85/100, pass): De toelichting benoemt terecht de akte-eis van art. 2 Auteurswet en de beperking ten aanzien van persoonlijkheidsrechten ex art. 25 Auteurswet.; De vervangingsmogelijkheid in artikel 6 maakt relevant dat Opdrachtnemer ook rechten van eventuele vervangers/derden moet laten overdragen of garanderen; dat ontbreekt.; Het voorstel vervangt de bestaande brede IE-bepaling volledig door een bepaling over auteursrechten op software, waardoor bescherming voor andere IE-rechten/resultaten ongevraagd kan vervallen.
- **zzp-66-schijnzelfstandig** (75/100, borderline): De waarschuwing voor herkwalificatie/gezagsverhouding onder art. 7:610 BW is terecht.; Het voorstel creëert een duidelijke spanning met artikel 2: dagelijks 9:00-17:00 uur aanwezigheid impliceert circa 40 uur per week, terwijl de opdracht gemiddeld 24 uur per week bedraagt.; De assistent beperkt 'alle instructies' terecht tot redelijke en opdrachtgerelateerde instructies, maar benoemt niet dat de gevraagde formulering ook inhoudelijk kan botsen met de zelfstandigheid van artikel 5 en de vervangingsmogelijkheid in artikel 6.
- **tab-71-capability-kolom** (85/100, pass): De assistent voert het legitieme wijzigingsverzoek niet uit en doet geen concreet find→replace-voorstel, bijvoorbeeld door de tabeltekst integraal te vervangen.; De toelichting bevat geen juridisch probleem; het gaat om een technische beperking, maar die leidt wel tot een onvolledige afhandeling van de instructie.
- **tab-72-fase-overal** (70/100, borderline): De instructie was om overal “Fase 2” te vervangen door “Fase 2A”, maar het voorkomen in artikel 3 is niet als wijzigingsvoorstel opgenomen.; De toelichting dat de tabelcel handmatig moet worden aangepast is onvoldoende onderbouwd en praktisch onnodig beperkend binnen de gegeven opdracht.; De assistent voert de opdracht slechts gedeeltelijk uit en legt de resterende wijziging bij de gebruiker neer.
- **pos-81-enkel-woord** (80/100, pass): De voorgestelde wijziging introduceert de aanduiding “CloudAdmin” terwijl deze term in de overeenkomst niet als partijnaam of verkorte aanduiding is gedefinieerd; de partij is gedefinieerd als “Verwerker”.; De assistent had kort moeten signaleren dat deze wijziging terminologische inconsistentie kan veroorzaken binnen de verwerkersovereenkomst.
- **pos-82-template-woord** (85/100, pass): Het wijzigingsvoorstel is niet plaatsbaar omdat de FIND-tekst vermoedelijk meerdere keren in het document voorkomt en niet specifiek aan artikel 9 is gekoppeld.; De gevraagde wijziging wordt daardoor feitelijk niet toegepast.; De FIND-tekst had meer context uit artikel 9 moeten bevatten om wijziging buiten artikel 9 te voorkomen.
- **cap-84-markeren** (70/100, borderline): Het wijzigingsvoorstel verwijdert de tekst van artikel 7 in plaats van deze geel te markeren.; De FIND omvat alleen de inhoudelijke zin van artikel 7 en niet de artikeltitel, terwijl gevraagd is artikel 7 te markeren.; De toelichting over het concurrentiebeding bij bepaalde tijd is juridisch juist, maar staat los van de gevraagde markeerhandeling.
- **cap-85-koppen-stijl** (65/100, borderline): De opdracht betrof uitsluitend opmaak; er zijn geen juridische inhoudelijke fouten gemaakt.; De wijzigingsvoorstellen hebben een lege REPLACE-tekst en zouden de artikelkoppen kunnen verwijderen in plaats van alleen blauw maken.; Het vergroten van het lettertype met één punt is niet uitgevoerd; daarmee is een expliciet onderdeel van de instructie niet afgedekt.; De voorstellen specificeren niet concreet welke opmaak wordt toegepast, zodat niet controleerbaar is dat de koppen daadwerkelijk blauw worden gemaakt.
- **cap-86-vet** (35/100, fail): Het wijzigingsvoorstel vervangt '€ 18.000 bruto' door een lege tekst en zou het bedrag dus verwijderen in plaats van vetgedrukt maken.; De toelichting zegt dat uitsluitend wordt vetgedrukt, maar het concrete voorstel doet iets anders en heeft wel degelijk juridische gevolgen doordat de vergoeding onbepaald kan worden.; De instructie is niet correct uitgevoerd; er ontbreekt een bruikbare find-replace met behoud van de tekst en alleen wijziging van opmaak.
- **ren-91-hernoem-cascade** (100/100, pass): De assistent heeft alle zichtbare verwijzingen naar artikel 5 correct bijgewerkt, inclusief rapportagetabel en bijlage.; De waarschuwing over het ontbreken van een genummerd lid 2 is terecht, maar hetzelfde geldt ook voor de verwijzing naar artikel 5A lid 1.