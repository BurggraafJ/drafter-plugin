# Drafter eval-rapport — improved-v9

**Pass: 64/67 (96%)** · 2 runs/case · flaky 1 · latency p50 8989ms / p95 21867ms · 382.6s · profiel `default`

Per categorie: value 10/10 · legal 15/15 · add 6/7 · targeted 6/6 · question 5/5 · tone 1/3 · topic 3/3 · long 3/3 · trap 8/8 · multi 4/4 · guardrail 3/3

Per faalmodus: waarde 10/10 · dwingend-recht 13/14 · toevoeging-scope 6/6 · juridische-volledigheid 2/2 · scope-precisie 4/4 · advies-only 5/5 · herformulering-scope 1/2 · clausule-lokalisatie 3/3 · lang-document 3/3 · non-unieke-find 4/4 · multi-wijziging 1/1 · niet-bestaand-doel 2/2 · multi-artikel 1/1 · verwijdering 1/1 · lijst-staffel 1/1 · typografie 2/2 · kruisverwijzing-definitie 1/1 · bijlage-scope 2/2 · multi-alinea-lengte 0/1 · truncatie 1/1 · overal-vervangen-scope 1/1

**Judge (juridische inhoud):** gemiddeld 93/100 over 67 cases · verdicts: pass 57, borderline 9, fail 1

| | Case | Cat | Faalmodus | ms | #sug | toepasbaar | scope→ | Judge | Reden(en) |
|---|---|---|---|---|---|---|---|---|---|
| 2/2 | arb-01-salaris | value | waarde | 4800 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| 2/2 | arb-02-proeftijd | legal | dwingend-recht | 12179 | 1 | 1/1 | 3 (doel 3) | 100 pass | — |
| 2/2 | arb-03-tussentijds | add | toevoeging-scope | 13662 | 1 | 1/1 | 2 (doel 2) | 70 borderline | — |
| 2/2 | arb-04-concurrentie-motivering | legal | juridische-volledigheid | 21364 | 1 | 1/1 | 7 (doel 7) | 60 borderline | — |
| 2/2 | arb-05-concurrentie-duur | targeted | scope-precisie | 8681 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| 2/2 | arb-06-vraag-geldigheid | question | advies-only | 10727 | 0 | 0/0 | – | 100 pass | — |
| 2/2 | arb-07-arbeidsduur | value | waarde | 5999 | 1 | 1/1 | 4 (doel 4) | 90 pass | — |
| 2/2 | arb-08-geheimhouding-streng | tone | herformulering-scope | 21678 | 1 | 1/1 | 8 (doel 8) | 35 fail | — |
| 2/2 | huur-09-huurprijs | value | waarde | 5862 | 1 | 1/1 | 3 (doel 3) | 75 borderline | — |
| 2/2 | huur-10-opzegtermijn | legal | dwingend-recht | 16600 | 1 | 1/1 | 8 (doel 8) | 85 pass | — |
| 2/2 | huur-11-waarborg | legal | dwingend-recht | 13906 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| 2/2 | huur-12-onderhoud-add | add | toevoeging-scope | 10880 | 1 | 1/1 | 7 (doel 7) | 70 borderline | — |
| 2/2 | huur-13-indexering | topic | clausule-lokalisatie | 7014 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| 2/2 | huur-14-wgv | legal | dwingend-recht | 8030 | 0 | 0/0 | – (doel 6) | 100 pass | — |
| 2/2 | nda-15-looptijd | value | waarde | 4428 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| 2/2 | nda-16-boete | value | waarde | 8851 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| 2/2 | nda-17-forum | targeted | scope-precisie | 8634 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| 2/2 | nda-18-uitzondering | add | toevoeging-scope | 8175 | 1 | 1/1 | 2 (doel 2) | 100 pass | — |
| 2/2 | nda-19-vraag-boete | question | advies-only | 25314 | 0 | 0/0 | – | 100 pass | — |
| 2/2 | av-20-opzeg | long | lang-document | 4420 | 1 | 1/1 | 14 (doel 14) | 100 pass | — |
| 2/2 | av-21-betaaltermijn-trap | trap | non-unieke-find | 6563 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| 1/2 | av-22-aansprakelijkheid | tone | herformulering-scope | 20958 | 3 | 2/3 | 12 (doel 12) | 65 borderline | 1/3 voorstel(len) niet toepasbaar in Word |
| 2/2 | av-23-ie-gebruiksrecht | add | toevoeging-scope | 10274 | 1 | 1/1 | 11 (doel 11) | 100 pass | — |
| 2/2 | av-24-forum | long | lang-document | 6124 | 1 | 1/1 | 16 (doel 16) | 100 pass | — |
| 2/2 | av-25-incasso-multi | multi | multi-wijziging | 18714 | 2 | 2/2 | 7 (doel 7) | 85 pass | — |
| 2/2 | vso-26-vergoeding | value | waarde | 5921 | 1 | 1/1 | 3 (doel 3) | 100 pass | — |
| 2/2 | vso-27-relatiebeding | targeted | scope-precisie | 14324 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| 2/2 | vso-28-getuigschrift-add | add | toevoeging-scope | 15084 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| 2/2 | vso-29-guardrail | guardrail | niet-bestaand-doel | 2976 | 0 | 0/0 | – | 100 pass | — |
| 2/2 | zzp-30-tarief | value | waarde | 4671 | 1 | 1/1 | 3 (doel 3) | 100 pass | — |
| 2/2 | h31-by-quote | topic | clausule-lokalisatie | 6407 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| 2/2 | h32-multi-article | multi | multi-artikel | 7356 | 2 | 2/2 | 3,4 (doel 3,4) | 100 pass | — |
| 2/2 | h33-broad-multi-instance | trap | non-unieke-find | 7314 | 2 | 2/2 | 3,6 (doel 3,6) | 100 pass | — |
| 2/2 | h34-deletion | targeted | verwijdering | 16926 | 1 | 1/1 | 7 (doel 7) | 85 pass | — |
| 2/2 | h35-ambiguous-ref | topic | clausule-lokalisatie | 20739 | 1 | 1/1 | 14 (doel 14) | 100 pass | — |
| 0/2 | ahv-36-dragalong | add | dwingend-recht | 10739 | 1 | 1/1 | 6 (doel 6) | 100 pass | reply benoemt het juridische punt niet (verwacht één van: waardering, minderheid, redelijk, billijkheid, prijsbepaling, bescherming) |
| 2/2 | ahv-37-aanbiedingstermijn | value | waarde | 7164 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| 2/2 | ahv-38-noncompete-vijfjaar | legal | dwingend-recht | 13189 | 1 | 1/1 | 8 (doel 8) | 80 pass | — |
| 2/2 | ahv-39-blokkering-statuten | legal | dwingend-recht | 13202 | 1 | 1/1 | 5 (doel 5) | 75 borderline | — |
| 2/2 | ahv-40-vraag-tagalong | question | advies-only | 7862 | 0 | 0/0 | – | 100 pass | — |
| 2/2 | vwo-41-datalek-24u | value | waarde | 13147 | 1 | 1/1 | 8 (doel 8) | 100 pass | — |
| 2/2 | vwo-42-audit-schrappen | legal | dwingend-recht | 15426 | 1 | 1/1 | 10 (doel 10) | 90 pass | — |
| 2/2 | vwo-43-subverwerker | legal | dwingend-recht | 11830 | 1 | 1/1 | 6 (doel 6) | 90 pass | — |
| 2/2 | vwo-44-doorgifte-vs | legal | dwingend-recht | 17195 | 1 | 1/1 | 7 (doel 7) | 85 pass | — |
| 2/2 | vwo-45-2fa | add | toevoeging-scope | 7459 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| 2/2 | saas-46-staffel | trap | lijst-staffel | 6707 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| 2/2 | saas-47-verlenging | trap | non-unieke-find | 6136 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| 2/2 | saas-48-exclusief | targeted | scope-precisie | 8989 | 1 | 1/1 | 2 (doel 2) | 75 borderline | — |
| 2/2 | saas-49-cap | value | waarde | 11849 | 1 | 1/1 | 11 (doel 11) | 100 pass | — |
| 2/2 | saas-50-escrow-vraag | question | advies-only | 6547 | 0 | 0/0 | – | 100 pass | — |
| 2/2 | fr-51-typografie-quotes | trap | typografie | 4215 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| 2/2 | fr-52-typografie-nbsp | trap | typografie | 7376 | 1 | 1/1 | 11 (doel 11) | 100 pass | — |
| 2/2 | fr-53-dertig-dagen | trap | non-unieke-find | 10849 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| 2/2 | fr-54-definitie-crossref | multi | kruisverwijzing-definitie | 9612 | 2 | 2/2 | 1,8 (doel 1,8) | 100 pass | — |
| 2/2 | fr-55-bijlage-artikel | targeted | bijlage-scope | 4675 | 1 | 1/1 | B1.2 (doel B1.2) | 100 pass | — |
| 2/2 | fr-56-hoofd-vs-bijlage | trap | bijlage-scope | 10895 | 1 | 1/1 | 1 (doel 1) | 100 pass | — |
| 0/2 | fr-57-herschrijf-lang | tone | multi-alinea-lengte | 20008 | 3 | 2/3 | 8 (doel 8) | 90 pass | 1/3 voorstel(len) niet toepasbaar in Word |
| 2/2 | fr-58-bijlage3-guardrail | guardrail | niet-bestaand-doel | 4200 | 0 | 0/0 | – | 90 pass | — |
| 2/2 | raam-59-diep-in-doc | long | lang-document | 4125 | 1 | 1/1 | 22 (doel 22) | 100 pass | — |
| 2/2 | raam-60-truncatie | guardrail | truncatie | 3134 | 0 | 0/0 | – | 100 pass | — |
| 2/2 | arb-61-ketenregeling | question | advies-only | 8736 | 0 | 0/0 | – | 70 borderline | — |
| 2/2 | huur-62-verhoging-8pct | legal | dwingend-recht | 13006 | 1 | 1/1 | 3 (doel 3) | 90 pass | — |
| 2/2 | huur-63-boete-te-laat | legal | dwingend-recht | 14919 | 1 | 1/1 | 3 | 75 borderline | — |
| 2/2 | av-64-overal-behalve | multi | overal-vervangen-scope | 15829 | 10 | 10/10 | 2,3,4,8,10,11,12,13 (doel 2,3,4,8,10,11,12,13) | 100 pass | — |
| 2/2 | zzp-65-auteursrecht | legal | juridische-volledigheid | 14635 | 1 | 1/1 | 8 (doel 8) | 100 pass | — |
| 2/2 | zzp-66-schijnzelfstandig | legal | dwingend-recht | 11710 | 1 | 1/1 | 5 (doel 5) | 90 pass | — |
| 2/2 | vso-67-bedenktermijn | legal | dwingend-recht | 13267 | 0 | 0/0 | – | 90 pass | — |

## Niet-toepasbare suggesties (track-changes-risico)
- **av-22-aansprakelijkheid**:
  - `find` (31 tekens): find niet in document (niet toepasbaar); door server gemarkeerd als niet-toepasbaar (niet in document)
- **fr-57-herschrijf-lang**:
  - `find` (341 tekens): find 341 tekens > 255 (Word search-limiet); door server gemarkeerd als niet-toepasbaar (te lang (>255 tekens))

## Judge-bevindingen (juridische inhoud)
- **arb-03-tussentijds** (70/100, borderline): Het tussentijds opzegbeding is terecht wederkerig en schriftelijk geformuleerd conform art. 7:667 lid 3 BW.; De voorgestelde tekst vermeldt niet dat opzegging door de werkgever alleen kan met inachtneming van de wettelijke ontslagregels, zoals toestemming UWV, ontbinding of instemming van werknemer.; De toelichting bij art. 7:672 BW is globaal juist, maar had ook moeten onderkennen dat opzegging in beginsel tegen het einde van de maand plaatsvindt, tenzij anders overeengekomen of gebruikelijk.
- **arb-04-concurrentie-motivering** (60/100, borderline): Het wijzigingsvoorstel eindigt midden in een zin: “Gelet op de duur van deze arbeidsovereenkomst, de”, waardoor de clausule juridisch en taalkundig onbruikbaar is.; De motivering is vrij generiek en mogelijk onvoldoende concreet toegespitst op de specifieke functie, werkzaamheden en bedrijfsbelangen, terwijl artikel 7:653 BW een concrete noodzakelijkheid wegens zwaarwegende bedrijfs- of dienstbelangen vereist.; De toelichting noemt terecht het risico bij een arbeidsovereenkomst voor bepaalde tijd en verwijst in hoofdlijnen juist naar artikel 7:653 BW.; Niet alle geldigheidsvereisten van een concurrentiebeding worden benoemd, zoals schriftelijkheid en meerderjarigheid, al lag de nadruk van de instructie op de motivering.
- **arb-07-arbeidsduur** (90/100, pass): Na wijziging blijft artikel 4 de gebruikelijke werktijden 08:30 tot 17:00 uur op vijf werkdagen noemen, wat mogelijk niet aansluit bij een arbeidsduur van 36 uur per week.; De toelichting waarschuwt wel algemeen voor herbeoordeling van andere arbeidsvoorwaarden, maar benoemt de mogelijke inconsistentie met de werktijden niet expliciet.
- **arb-08-geheimhouding-streng** (35/100, fail): Het vervangende artikel is afgebroken en bevat daardoor een onvolledige, juridisch onbruikbare zin.; De toelichting noemt teruggave/verwijdering bij einde dienstverband, maar dit is niet daadwerkelijk in de voorgestelde tekst opgenomen.; Er ontbreekt een noodzakelijke uitzondering voor wettelijke verplichtingen, rechterlijke/overheidsbevelen en beschermde meldingen zoals klokkenluidersmeldingen.; De bepaling is door de formulering potentieel te absoluut, omdat zij ook rechtmatig gebruik of openbaarmaking kan raken zonder adequate carve-outs.
- **huur-09-huurprijs** (75/100, borderline): Geen waarschuwing dat de aanvangshuur voor zelfstandige woonruimte mogelijk onder dwingend huurprijsrecht/WWS en wettelijke maximale huurprijs kan vallen.; De assistent signaleert terecht de inconsistentie met de waarborgsom, maar benoemt geen bredere huurrechtelijke compliance-risico’s bij verhoging van de woonruimtehuur.
- **huur-10-opzegtermijn** (85/100, pass): De kernregel van art. 7:271 lid 5 onder a BW is juist weergegeven: bij maandelijkse betaling is de opzegtermijn voor de huurder één maand.; De kwalificatie als ‘juridisch kwetsbaar’ en ‘mogelijk nietig/vernietigbaar’ is te voorzichtig en deels onnauwkeurig; afwijking ten nadele van de huurder is in beginsel nietig op grond van art. 7:271 BW.; De assistent voert de gevraagde wijziging wel door, maar waarschuwt expliciet voor het woonruimterechtelijke risico.
- **huur-12-onderhoud-add** (70/100, borderline): De voorgestelde bepaling is erg ruim: 'geen onderhoud' kan ook kleine herstellingen omvatten die wettelijk voor rekening van Huurder komen en waarvoor Huurder praktisch een derde moet kunnen inschakelen.; De assistent waarschuwt niet voor het risico dat een absoluut toestemmingsvereiste in woonruimtehuur onredelijk of te belemmerend kan uitpakken, met name bij kleine of spoedeisende herstellingen.; De verwijzing naar art. 7:217 BW is in grote lijnen juist, maar onderbouwt niet zonder meer een verbod op uitbesteding aan derden.
- **av-22-aansprakelijkheid** (65/100, borderline): De waarschuwing over opzet/bewuste roekeloosheid en art. 6:248 lid 2 BW is juist, maar er ontbreekt een expliciete clausule-uitzondering daarvoor.; Niet gewaarschuwd voor mogelijke toetsing van een vergaande aansprakelijkheidsbeperking in algemene voorwaarden, met name bij consumenten via art. 6:237 sub f BW of bredere onredelijk-bezwarendheid.; Het voorstel om het uitgekeerde verzekeringsbedrag te verminderen met het eigen risico kan juridisch/contractueel onduidelijk zijn, omdat een verzekeringsuitkering vaak al netto na eigen risico wordt vastgesteld.; Het belangrijkste voorstel tot uitsluiting van indirecte schade is door de server niet plaatsbaar en wordt dus niet toegepast, waardoor de beoogde aanscherping deels ontbreekt.
- **av-25-incasso-multi** (85/100, pass): Verwijzing naar art. 6:119a BW is juist voor wettelijke handelsrente.; Minimum van € 40 bij handelsovereenkomsten volgt specifiek uit art. 6:96 lid 4 BW; de replace verwijst slechts algemeen naar art. 6:96 BW en het Besluit, waardoor de wettelijke grondslag minder precies is.; De formulering houdt geen rekening met mogelijke consumentenrelaties, maar de instructie en context lijken B2B-algemene voorwaarden te betreffen.
- **h34-deletion** (85/100, pass): Artikel 7 wordt niet volledig verwijderd: de artikelkop blijft staan en er wordt geen voorstel gedaan voor verwijdering of hernummering.; De toelichting beroept zich op een niet-toegelichte beperking dat artikelkoppen niet mogen worden vervangen, waardoor de opdracht slechts gedeeltelijk wordt uitgevoerd.
- **ahv-38-noncompete-vijfjaar** (80/100, pass): De waarschuwing over de juridische kwetsbaarheid van een non-concurrentiebeding van vijf jaar is juist, maar blijft vrij algemeen.; De assistent signaleert niet dat artikel 11 bepaalt dat de overeenkomst eindigt zodra een partij geen aandelen meer houdt, waardoor de post-contractuele werking van artikel 8 na overdracht problematisch kan zijn.; Er wordt geen voorstel gedaan of waarschuwing gegeven over een survival-bepaling voor artikel 8/10 na einde van de overeenkomst.
- **ahv-39-blokkering-statuten** (75/100, borderline): De waarschuwing dat een statutaire blokkeringsregeling niet contractueel opzij kan worden gezet is juist.; De voorgestelde vervanging 'behoeft geen voorafgaande goedkeuring' kan juridisch misleidend zijn als de statuten die goedkeuring nog steeds vereisen; beter zou zijn te beperken tot het contractuele goedkeuringsvereiste of expliciet 'uit hoofde van deze overeenkomst' op te nemen.; De assistent verwerkt niet volledig dat voor daadwerkelijke afschaffing van een statutair goedkeuringsvereiste een statutenwijziging nodig kan zijn.
- **vwo-42-audit-schrappen** (90/100, pass): De assistent laat de kop 'Artikel 10 — Audit' staan, waardoor het auditartikel formeel leeg achterblijft en de opdracht om het auditrecht volledig uit de overeenkomst te schrappen niet geheel netjes is uitgevoerd.; De juridische waarschuwing over art. 28 lid 3 onder h AVG is juist en relevant.
- **vwo-43-subverwerker** (90/100, pass): De waarschuwing over art. 28 lid 2 AVG is juist: volledige inschakeling zonder toestemming is niet AVG-conform.; De assistent noemt niet de AVG-conforme route van algemene schriftelijke toestemming met voorafgaande informatie over wijzigingen en mogelijkheid tot bezwaar.; Het wijzigingsvoorstel zelf bevat een niet-compliant clausule, al wordt dit wel expliciet gesignaleerd.
- **vwo-44-doorgifte-vs** (85/100, pass): De voorgestelde vervangende tekst suggereert contractueel dat doorgifte naar de VS zonder verdere voorwaarden mag, terwijl dit materieel in strijd kan zijn met hoofdstuk V AVG.; De waarschuwing benoemt wel correct dat art. 44 AVG en hoofdstuk V AVG dwingend blijven gelden en niet contractueel opzijgezet kunnen worden.
- **saas-48-exclusief** (75/100, borderline): De voorgestelde formulering is juridisch niet onjuist, maar ambigu: zij maakt niet expliciet of Novaplan binnen Nederland zelf nog mag exploiteren of alleen geen licenties aan derden mag verlenen.; De territoriale exclusiviteit wordt niet uitgewerkt in een duidelijke verplichting van Novaplan, bijvoorbeeld om gedurende de abonnementsduur geen rechten aan derden in Nederland te verlenen.; Er wordt terecht opgemerkt dat gebruik buiten Nederland eventueel aanvullend moet worden geregeld.
- **fr-57-herschrijf-lang** (90/100, pass): De assistent signaleert terecht art. 7:920 lid 2 BW en noemt kernvoorwaarden voor een postcontractueel non-concurrentiebeding in franchise.; De opdracht vroeg artikel 8 volledig te herschrijven; de assistent doet dit slechts via drie losse zinsvervangingen en neemt de artikelkop/nummering niet mee.; De eerste wijziging is door de server als niet-plaatsbaar gemarkeerd en wordt dus niet toegepast, waardoor artikel 8 feitelijk niet volledig wordt herschreven.
- **fr-58-bijlage3-guardrail** (90/100, pass): De assistent signaleert terecht dat Bijlage 3 niet in de aangeleverde tekst voorkomt.; De assistent had vollediger kunnen zijn door expliciet om bevestiging te vragen of bedoeld was Bijlage 1, artikel 3 aan te passen, eventueel met een concept-wijziging onder voorbehoud.
- **arb-61-ketenregeling** (70/100, borderline): Het antwoord begint met 'Ja', terwijl de daaropvolgende analyse juist uitkomt op 'nee' bij drie contracten van elk twaalf maanden.; De hoofdvraag wordt daardoor juridisch onjuist en verwarrend beantwoord.; De ketenregeling van art. 7:668a lid 1 BW wordt verder grotendeels correct weergegeven, inclusief de grenzen van meer dan drie contracten of meer dan 36 maanden en de cao-uitzondering.
- **huur-62-verhoging-8pct** (90/100, pass): De assistent signaleert terecht dat woonruimtehuurprijsverhogingen aan wettelijke maxima kunnen zijn gebonden.; De voorgestelde tekst laat artikel 5 ongewijzigd, waardoor mogelijk een dubbele of onduidelijke verhoging per 1 juli 2027 ontstaat; dit wordt wel benoemd maar niet tekstueel opgelost.; De wijziging bevat geen beperking zoals 'voor zover wettelijk toegestaan', waardoor de clausule bij overschrijding van het wettelijke maximum deels niet afdwingbaar kan zijn.
- **huur-63-boete-te-laat** (75/100, borderline): De waarschuwing is terecht, maar te voorzichtig geformuleerd: bij woonruimte met een particuliere huurder is een boete van € 250 per dag zonder maximum zeer waarschijnlijk onredelijk bezwarend/oneerlijk en mogelijk niet afdwingbaar.; Relevante huurrechtelijke/consumentenrechtelijke kaders zoals art. 7:264 BW en ambtshalve toetsing aan Richtlijn 93/13/EEG worden niet genoemd.; De voorgestelde clausule neemt de gevraagde risicovolle boete letterlijk over zonder juridisch veiliger alternatief of maximering voor te stellen.
- **zzp-66-schijnzelfstandig** (90/100, pass): De assistent signaleert terecht het risico op kwalificatie als arbeidsovereenkomst wegens gezag in de zin van art. 7:610 BW.; De assistent mist dat dagelijkse aanwezigheid van 9:00 tot 17:00 uur moeilijk verenigbaar is met artikel 2, waarin gemiddeld 24 uur per week is afgesproken.; Er wordt niet benoemd dat 'alle instructies' zeer ruim is en beter beperkt zou kunnen worden tot redelijke instructies binnen de opdracht, al is de kernwaarschuwing wel gegeven.
- **vso-67-bedenktermijn** (90/100, pass): De assistent signaleert terecht dat afstand van de wettelijke bedenktermijn nietig is op grond van art. 7:670b lid 6 BW.; De assistent noemt terecht de 14-dagentermijn en verlenging naar 3 weken bij ontbreken van vermelding.; De assistent biedt wel aan dat een rechtsgeldige bepaling mogelijk is, maar geeft geen concreet wijzigingsvoorstel of tekst voor zo’n bepaling.