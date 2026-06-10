# Drafter eval-rapport — final-v11

**Pass: 65/67 (97%)** · latency p50 9768ms / p95 19208ms · 264.4s · profiel `default`

Per categorie: value 10/10 · legal 14/15 · add 7/7 · targeted 6/6 · question 5/5 · tone 2/3 · topic 3/3 · long 3/3 · trap 8/8 · multi 4/4 · guardrail 3/3

Per faalmodus: waarde 10/10 · dwingend-recht 13/14 · toevoeging-scope 6/6 · juridische-volledigheid 2/2 · scope-precisie 4/4 · advies-only 5/5 · herformulering-scope 2/2 · clausule-lokalisatie 3/3 · lang-document 3/3 · non-unieke-find 4/4 · multi-wijziging 1/1 · niet-bestaand-doel 2/2 · multi-artikel 1/1 · verwijdering 1/1 · lijst-staffel 1/1 · typografie 2/2 · kruisverwijzing-definitie 1/1 · bijlage-scope 2/2 · multi-alinea-lengte 0/1 · truncatie 1/1 · overal-vervangen-scope 1/1

**Judge (juridische inhoud):** gemiddeld 93/100 over 67 cases · verdicts: pass 59, borderline 4, fail 4

| | Case | Cat | Faalmodus | ms | #sug | toepasbaar | scope→ | Judge | Reden(en) |
|---|---|---|---|---|---|---|---|---|---|
| ✅ | arb-01-salaris | value | waarde | 6372 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| ✅ | arb-02-proeftijd | legal | dwingend-recht | 16032 | 1 | 1/1 | 3 (doel 3) | 75 borderline | — |
| ✅ | arb-03-tussentijds | add | toevoeging-scope | 15828 | 1 | 1/1 | 2 (doel 2) | 100 pass | — |
| ✅ | arb-04-concurrentie-motivering | legal | juridische-volledigheid | 25405 | 1 | 1/1 | 7 (doel 7) | 70 borderline | — |
| ✅ | arb-05-concurrentie-duur | targeted | scope-precisie | 13911 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| ✅ | arb-06-vraag-geldigheid | question | advies-only | 10579 | 0 | 0/0 | – | 100 pass | — |
| ✅ | arb-07-arbeidsduur | value | waarde | 7567 | 1 | 1/1 | 4 (doel 4) | 90 pass | — |
| ✅ | arb-08-geheimhouding-streng | tone | herformulering-scope | 19208 | 1 | 1/1 | 8 (doel 8) | 35 fail | — |
| ✅ | huur-09-huurprijs | value | waarde | 5124 | 1 | 1/1 | 3 (doel 3) | 100 pass | — |
| ✅ | huur-10-opzegtermijn | legal | dwingend-recht | 16625 | 1 | 1/1 | 8 (doel 8) | 85 pass | — |
| ✅ | huur-11-waarborg | legal | dwingend-recht | 18876 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | huur-12-onderhoud-add | add | toevoeging-scope | 13681 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| ✅ | huur-13-indexering | topic | clausule-lokalisatie | 6179 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| ✅ | huur-14-wgv | legal | dwingend-recht | 4581 | 0 | 0/0 | – (doel 6) | 100 pass | — |
| ✅ | nda-15-looptijd | value | waarde | 4383 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| ✅ | nda-16-boete | value | waarde | 8360 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | nda-17-forum | targeted | scope-precisie | 9768 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| ✅ | nda-18-uitzondering | add | toevoeging-scope | 10739 | 1 | 1/1 | 2 (doel 2) | 100 pass | — |
| ✅ | nda-19-vraag-boete | question | advies-only | 18815 | 0 | 0/0 | – | 100 pass | — |
| ✅ | av-20-opzeg | long | lang-document | 5849 | 1 | 1/1 | 14 (doel 14) | 100 pass | — |
| ✅ | av-21-betaaltermijn-trap | trap | non-unieke-find | 8669 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | av-22-aansprakelijkheid | tone | herformulering-scope | 31024 | 2 | 2/2 | 12 (doel 12) | 85 pass | — |
| ✅ | av-23-ie-gebruiksrecht | add | toevoeging-scope | 12651 | 1 | 1/1 | 11 (doel 11) | 100 pass | — |
| ✅ | av-24-forum | long | lang-document | 6694 | 1 | 1/1 | 16 (doel 16) | 65 fail | — |
| ✅ | av-25-incasso-multi | multi | multi-wijziging | 15031 | 1 | 1/1 | 7 (doel 7) | 60 borderline | — |
| ✅ | vso-26-vergoeding | value | waarde | 8879 | 1 | 1/1 | 3 (doel 3) | 100 pass | — |
| ✅ | vso-27-relatiebeding | targeted | scope-precisie | 12294 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| ✅ | vso-28-getuigschrift-add | add | toevoeging-scope | 11757 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | vso-29-guardrail | guardrail | niet-bestaand-doel | 2754 | 0 | 0/0 | – | 100 pass | — |
| ✅ | zzp-30-tarief | value | waarde | 5563 | 1 | 1/1 | 3 (doel 3) | 100 pass | — |
| ✅ | h31-by-quote | topic | clausule-lokalisatie | 8144 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| ✅ | h32-multi-article | multi | multi-artikel | 7661 | 2 | 2/2 | 3,4 (doel 3,4) | 100 pass | — |
| ✅ | h33-broad-multi-instance | trap | non-unieke-find | 8305 | 2 | 2/2 | 3,6 (doel 3,6) | 100 pass | — |
| ✅ | h34-deletion | targeted | verwijdering | 15323 | 1 | 1/1 | 7 (doel 7) | 85 pass | — |
| ✅ | h35-ambiguous-ref | topic | clausule-lokalisatie | 6342 | 1 | 1/1 | 14 (doel 14) | 100 pass | — |
| ✅ | ahv-36-dragalong | add | dwingend-recht | 16923 | 1 | 1/1 | 6 (doel 6) | 80 pass | — |
| ✅ | ahv-37-aanbiedingstermijn | value | waarde | 5956 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| ✅ | ahv-38-noncompete-vijfjaar | legal | dwingend-recht | 11876 | 1 | 1/1 | 8 (doel 8) | 90 pass | — |
| ✅ | ahv-39-blokkering-statuten | legal | dwingend-recht | 16267 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| ✅ | ahv-40-vraag-tagalong | question | advies-only | 8364 | 0 | 0/0 | – | 100 pass | — |
| ✅ | vwo-41-datalek-24u | value | waarde | 10952 | 1 | 1/1 | 8 (doel 8) | 100 pass | — |
| ✅ | vwo-42-audit-schrappen | legal | dwingend-recht | 12525 | 1 | 1/1 | 10 (doel 10) | 100 pass | — |
| ✅ | vwo-43-subverwerker | legal | dwingend-recht | 13765 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | vwo-44-doorgifte-vs | legal | dwingend-recht | 11728 | 0 | 0/0 | – (doel 7) | 100 pass | — |
| ✅ | vwo-45-2fa | add | toevoeging-scope | 9857 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| ✅ | saas-46-staffel | trap | lijst-staffel | 6821 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | saas-47-verlenging | trap | non-unieke-find | 6317 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| ✅ | saas-48-exclusief | targeted | scope-precisie | 7444 | 1 | 1/1 | 2 (doel 2) | 80 pass | — |
| ✅ | saas-49-cap | value | waarde | 6125 | 1 | 1/1 | 11 (doel 11) | 100 pass | — |
| ✅ | saas-50-escrow-vraag | question | advies-only | 17906 | 0 | 0/0 | – | 100 pass | — |
| ✅ | fr-51-typografie-quotes | trap | typografie | 4698 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| ✅ | fr-52-typografie-nbsp | trap | typografie | 7235 | 1 | 1/1 | 11 (doel 11) | 100 pass | — |
| ✅ | fr-53-dertig-dagen | trap | non-unieke-find | 13076 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| ✅ | fr-54-definitie-crossref | multi | kruisverwijzing-definitie | 9628 | 2 | 2/2 | 1,8 (doel 1,8) | 100 pass | — |
| ✅ | fr-55-bijlage-artikel | targeted | bijlage-scope | 4744 | 1 | 1/1 | B1.2 (doel B1.2) | 100 pass | — |
| ✅ | fr-56-hoofd-vs-bijlage | trap | bijlage-scope | 5592 | 1 | 1/1 | 1 (doel 1) | 100 pass | — |
| ❌ | fr-57-herschrijf-lang | tone | multi-alinea-lengte | 22212 | 3 | 2/3 | 8 (doel 8) | 60 borderline | 1/3 voorstel(len) niet toepasbaar in Word |
| ✅ | fr-58-bijlage3-guardrail | guardrail | niet-bestaand-doel | 3630 | 0 | 0/0 | – | 100 pass | — |
| ✅ | raam-59-diep-in-doc | long | lang-document | 4651 | 1 | 1/1 | 22 (doel 22) | 100 pass | — |
| ✅ | raam-60-truncatie | guardrail | truncatie | 2722 | 0 | 0/0 | – | 100 pass | — |
| ✅ | arb-61-ketenregeling | question | advies-only | 8295 | 0 | 0/0 | – | 80 pass | — |
| ❌ | huur-62-verhoging-8pct | legal | dwingend-recht | 15407 | 1 | 1/1 | 3 (doel 3) | 50 fail | reply benoemt het juridische punt niet (verwacht één van: maxim, wettelijk, toegesta) |
| ✅ | huur-63-boete-te-laat | legal | dwingend-recht | 17379 | 1 | 1/1 | 3 | 95 pass | — |
| ✅ | av-64-overal-behalve | multi | overal-vervangen-scope | 13982 | 10 | 10/10 | 2,3,4,8,10,11,12,13 (doel 2,3,4,8,10,11,12,13) | 65 fail | — |
| ✅ | zzp-65-auteursrecht | legal | juridische-volledigheid | 17409 | 1 | 1/1 | 8 (doel 8) | 100 pass | — |
| ✅ | zzp-66-schijnzelfstandig | legal | dwingend-recht | 15698 | 1 | 1/1 | 5 (doel 5) | 90 pass | — |
| ✅ | vso-67-bedenktermijn | legal | dwingend-recht | 7955 | 0 | 0/0 | – | 100 pass | — |

## Niet-toepasbare suggesties (track-changes-risico)
- **fr-57-herschrijf-lang**:
  - `find` (341 tekens): find 341 tekens > 255 (Word search-limiet); door server gemarkeerd als niet-toepasbaar (te lang (>255 tekens))

## Judge-bevindingen (juridische inhoud)
- **arb-02-proeftijd** (75/100, borderline): De waarschuwing is in de kern juist: bij een arbeidsovereenkomst voor bepaalde tijd van 12 maanden is een proeftijd van twee maanden in beginsel nietig.; De toelichting mist de nuance dat bij cao onder voorwaarden van de wettelijke maximumduur kan worden afgeweken.; Niet expliciet benoemd wordt dat een te lange proeftijd doorgaans leidt tot nietigheid van het proeftijdbeding als geheel, niet tot conversie naar één maand.; Er wordt geen compliant alternatief voorgesteld, zoals handhaving van één maand of aanpassing van de contractduur indien dat daadwerkelijk beoogd is.
- **arb-04-concurrentie-motivering** (70/100, borderline): De voorgestelde motivering eindigt onvolledig met 'klantrelaties' en vormt daardoor geen nette, sluitende contractstekst.; De motivering is deels generiek en beperkt toegespitst op de concrete functie van logistiek medewerker; toegang tot prijs- en tariefafspraken is feitelijk niet onderbouwd.; De toelichting noemt terecht art. 7:653 lid 2 BW en waarschuwt dat onvoldoende concrete motivering tot vernietiging kan leiden.; Het voorstel blijft beperkt tot artikel 7 en raakt geen ongerelateerde bepalingen.
- **arb-07-arbeidsduur** (90/100, pass): De wijziging is conform instructie doorgevoerd.; De assistent signaleert salaris en vakantiedagen, maar niet dat de gehandhaafde werktijden van 08:30 tot 17:00 uur op vijf werkdagen mogelijk niet aansluiten bij een arbeidsduur van 36 uur per week.
- **arb-08-geheimhouding-streng** (35/100, fail): Vervangende tekst is afgekapt en eindigt met 'zowel gedurende als na af', waardoor de clausule juridisch en tekstueel onbruikbaar is.; De toelichting/WHY vermeldt een teruggave-/verwijderplicht, maar die is niet in de voorgestelde tekst opgenomen.; Geen uitzondering of waarschuwing voor wettelijke meldplichten, klokkenluidersbescherming of andere rechtmatige openbaarmakingen; een te absoluut geheimhoudingsbeding kan daarmee te ruim zijn.; Artikel 7:611 BW is op zichzelf relevant, maar de uitwerking is onvolledig.
- **huur-10-opzegtermijn** (85/100, pass): De waarschuwing is inhoudelijk terecht: bij maandelijkse betaling is de wettelijke opzegtermijn voor de huurder één maand.; De kwalificatie 'mogelijk vernietigbaar/nietig' is te onzeker; afwijking van art. 7:271 BW ten nadele van de huurder is in beginsel nietig, niet slechts juridisch kwetsbaar.
- **nda-19-vraag-boete** (100/100, pass): Kleine nuance: 'direct opeisbaar' betekent niet in alle gevallen zonder meer dat wettelijke vereisten rond tekortkoming/verzuim irrelevant zijn, maar dit is in de context niet wezenlijk misleidend.; De opmerking over ontbrekende uitzonderingen ziet deels op de NDA als geheel en niet uitsluitend op het boetebeding, maar is relevant voor de boeterisico’s.
- **av-22-aansprakelijkheid** (85/100, pass): De voorgestelde tekst bevat een mogelijke inconsistentie: eerst geldt het laagste van verzekeringsuitkering en factuurbedrag, terwijl bij niet-uitkering alsnog het betaalde factuurbedrag als cap geldt; bij een uitkering van nihil of afwijzing kan dit discussie oproepen.; De waarschuwing over redelijkheid en billijkheid en onredelijk bezwarendheid is juist, maar blijft vrij algemeen en benoemt niet expliciet het onderscheid tussen B2B en consumenten/kleine wederpartijen.
- **av-24-forum** (65/100, fail): Geen waarschuwing dat een forumkeuze in algemene voorwaarden jegens consumenten onder Nederlands recht vernietigbaar/onredelijk bezwarend kan zijn, tenzij de consument na beroep op de clausule ten minste één maand krijgt om voor de wettelijk bevoegde rechter te kiezen.; De gevraagde wijziging is technisch correct en beperkt tot artikel 16, maar juridisch had een voorbehoud of consumentencarve-out moeten worden benoemd.
- **av-25-incasso-multi** (60/100, borderline): De verwijzing naar artikel 6:119a BW is juist voor handelsovereenkomsten, maar de clausule is onvoorwaardelijk geformuleerd terwijl Opdrachtgever niet expliciet tot zakelijke partijen is beperkt.; Bij consumenten gelden voor incassokosten de 14-dagenaanmaning van art. 6:96 lid 6 BW en beperkingen; de assistent waarschuwt wel, maar verwerkt dit niet in de tekst.; Het minimum van € 40 sluit aan bij handelstransacties, maar had beter beperkt moeten worden tot voor zover sprake is van een handelsovereenkomst.
- **h34-deletion** (85/100, pass): De instructie was om het concurrentiebeding in artikel 7 volledig te verwijderen; de assistent laat de kop 'Artikel 7 — Concurrentiebeding' staan en vervangt alleen de inhoud door 'Vervallen.'; Het voorstel behoudt bewust de artikelnummering, maar dat is niet expliciet gevraagd en resulteert niet in volledige verwijdering van artikel 7.
- **ahv-36-dragalong** (80/100, pass): De assistent signaleert terecht het ontbreken van een waarderingsmechanisme als risico en wijst op afstemming met statutaire blokkeringsregeling.; De voorgestelde drag-along mist enkele praktisch/juridisch relevante elementen, zoals verplichting tot ondertekening van transactiedocumentatie, levering bij notariële akte, volmacht/sanctie bij niet-meewerken en eventueel waarborg dat Van Galen niet méér garanties/verplichtingen geeft dan pro rata of titel/hoedanigheid.; De formulering 'onder dezelfde voorwaarden' kan onduidelijk zijn bij aandeelhoudersspecifieke garanties, vrijwaringen, escrow of non-compete, maar is niet evident onjuist.
- **ahv-38-noncompete-vijfjaar** (90/100, pass): De assistent signaleert terecht dat een non-concurrentiebeding van vijf jaar juridisch kwetsbaar kan zijn, onder meer mededingingsrechtelijk.; Een belangrijk punt ontbreekt: artikel 11 bepaalt dat de overeenkomst eindigt zodra een partij geen aandelen meer houdt, waardoor de post-contractuele werking van artikel 8 mogelijk wordt ondergraven; dit had moeten worden benoemd of aangepast.; De waarschuwing blijft vrij algemeen en benoemt niet concreet dat een duur van vijf jaar mededingingsrechtelijk vaak problematisch kan zijn zonder duidelijke beperking in scope, territorium en rechtvaardiging.
- **saas-48-exclusief** (80/100, pass): De voorgestelde tekst maakt de licentie wel exclusief binnen Nederland, maar is taalkundig en juridisch enigszins ambigu: niet geheel duidelijk is of het gebruiksrecht territoriaal tot Nederland wordt beperkt of alleen de exclusiviteit territoriaal geldt.; Bij een exclusieve auteursrechtelijke/softwarelicentie had de assistent moeten wijzen op het aktevereiste voor verlening van een exclusieve licentie.; De toelichting waarschuwt terecht voor beperking van Novaplan, maar noemt geen relevante juridische formaliteiten of mogelijke bestaande rechten/uitzonderingen.
- **fr-53-dertig-dagen** (100/100, pass): Geen wezenlijke juridisch-inhoudelijke gebreken; de assistent signaleert terecht de mogelijke spanning met artikel 5 en blijft binnen de instructie.
- **fr-57-herschrijf-lang** (60/100, borderline): De verwijzing naar art. 7:920 lid 2 BW is op zichzelf juist, maar de assistent signaleert niet concreet dat het postcontractuele gebied ‘Rayon plus 10 km daarbuiten’ mogelijk in strijd is met de wettelijke territoriale beperking.; Artikel 8 is niet volledig herschreven: het wijzigingsvoorstel voor lid 8.1 is niet plaatsbaar doordat het FIND-fragment het nummer ‘8.1’ mist en dus niet wordt toegepast.; De gevraagde volledige herschrijving van artikel 8 wordt daardoor praktisch niet gerealiseerd; slechts leden 8.2 en 8.3 worden effectief aangepast.; De guardrail is te algemeen: de noodzakelijke wettelijke voorwaarden voor een postcontractueel franchise-non-concurrentiebeding worden niet volledig benoemd.
- **arb-61-ketenregeling** (80/100, pass): Het antwoord begint met 'Ja', terwijl de daaropvolgende analyse terecht concludeert dat bij drie jaarcontracten binnen 36 maanden géén arbeidsovereenkomst voor onbepaalde tijd ontstaat.; De juridische regel van art. 7:668a lid 1 BW is verder grotendeels correct weergegeven, inclusief drie-contracten/36-maandengrens en cao-afwijking.; De interne tegenstrijdigheid maakt de toelichting onduidelijk op het kernpunt van de vraag.
- **huur-62-verhoging-8pct** (50/100, fail): Bij woonruimte gelden dwingendrechtelijke grenzen voor huurprijsverhogingen; een vaste verhoging van 8% per 1 juli 2027 kan (deels) niet afdwingbaar zijn als deze boven het wettelijke maximum uitkomt.; De assistent waarschuwt alleen voor mogelijke cumulatie met CPI-indexering in artikel 5, maar niet voor de wettelijke huurverhogingsmaxima en de noodzaak van een clausule 'voor zover wettelijk toegestaan'.; Artikel 5 blijft ongewijzigd, waardoor inderdaad onduidelijkheid of dubbele verhoging kan ontstaan; dit wordt wel gesignaleerd maar niet opgelost.
- **huur-63-boete-te-laat** (95/100, pass): Het wijzigingsvoorstel voegt ongevraagd toe dat geen ingebrekestelling vereist is en dat de boete direct opeisbaar is; dat is verwant aan de boete, maar gaat verder dan de expliciete instructie.; De waarschuwing over art. 7:264 BW en matiging ex art. 6:94 BW is juridisch juist en relevant bij woonruimte.
- **av-64-overal-behalve** (65/100, fail): De voorgestelde vervangingen dekken alle voorkomens van “Opdrachtnemer” buiten artikel 1 en raken artikel 1 niet.; De assistent waarschuwt niet dat hierdoor “Leverancier” buiten artikel 1 wordt gebruikt terwijl alleen “Opdrachtnemer” in artikel 1 is gedefinieerd; dit kan tot interpretatieproblemen leiden.; Geen onjuiste rechtsregels of wetsverwijzingen aangetroffen.
- **zzp-66-schijnzelfstandig** (90/100, pass): De assistent signaleert terecht het risico op een gezagsverhouding en verwijst correct naar art. 7:610 BW en art. 7:402 BW.; De voorgestelde dagelijkse aanwezigheid van 9:00 tot 17:00 uur botst mogelijk met artikel 2, waarin gemiddeld 24 uur per week is overeengekomen; dat wordt niet benoemd of opgelost.; De beperking van instructies tot de uitvoering van de opdracht is juridisch verdedigbaar en passend bij opdracht, maar wijkt enigszins af van de instructie om 'alle instructies' op te nemen.