# Drafter eval-rapport — final-v10

**Pass: 67/67 (100%)** · latency p50 10056ms / p95 26715ms · 285.7s · profiel `default`

Per categorie: value 10/10 · legal 15/15 · add 7/7 · targeted 6/6 · question 5/5 · tone 3/3 · topic 3/3 · long 3/3 · trap 8/8 · multi 4/4 · guardrail 3/3

Per faalmodus: waarde 10/10 · dwingend-recht 14/14 · toevoeging-scope 6/6 · juridische-volledigheid 2/2 · scope-precisie 4/4 · advies-only 5/5 · herformulering-scope 2/2 · clausule-lokalisatie 3/3 · lang-document 3/3 · non-unieke-find 4/4 · multi-wijziging 1/1 · niet-bestaand-doel 2/2 · multi-artikel 1/1 · verwijdering 1/1 · lijst-staffel 1/1 · typografie 2/2 · kruisverwijzing-definitie 1/1 · bijlage-scope 2/2 · multi-alinea-lengte 1/1 · truncatie 1/1 · overal-vervangen-scope 1/1

**Judge (juridische inhoud):** gemiddeld 91/100 over 67 cases · verdicts: pass 56, borderline 6, fail 5

| | Case | Cat | Faalmodus | ms | #sug | toepasbaar | scope→ | Judge | Reden(en) |
|---|---|---|---|---|---|---|---|---|---|
| ✅ | arb-01-salaris | value | waarde | 5826 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| ✅ | arb-02-proeftijd | legal | dwingend-recht | 14253 | 1 | 1/1 | 3 (doel 3) | 60 borderline | — |
| ✅ | arb-03-tussentijds | add | toevoeging-scope | 15171 | 1 | 1/1 | 2 (doel 2) | 100 pass | — |
| ✅ | arb-04-concurrentie-motivering | legal | juridische-volledigheid | 20763 | 1 | 1/1 | 7 (doel 7) | 45 fail | — |
| ✅ | arb-05-concurrentie-duur | targeted | scope-precisie | 11595 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| ✅ | arb-06-vraag-geldigheid | question | advies-only | 10056 | 0 | 0/0 | – | 100 pass | — |
| ✅ | arb-07-arbeidsduur | value | waarde | 10512 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| ✅ | arb-08-geheimhouding-streng | tone | herformulering-scope | 22561 | 1 | 1/1 | 8 (doel 8) | 20 fail | — |
| ✅ | huur-09-huurprijs | value | waarde | 6144 | 1 | 1/1 | 3 (doel 3) | 90 pass | — |
| ✅ | huur-10-opzegtermijn | legal | dwingend-recht | 27168 | 1 | 1/1 | 8 (doel 8) | 85 pass | — |
| ✅ | huur-11-waarborg | legal | dwingend-recht | 17224 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | huur-12-onderhoud-add | add | toevoeging-scope | 12297 | 1 | 1/1 | 7 (doel 7) | 60 borderline | — |
| ✅ | huur-13-indexering | topic | clausule-lokalisatie | 4180 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| ✅ | huur-14-wgv | legal | dwingend-recht | 6677 | 0 | 0/0 | – (doel 6) | 100 pass | — |
| ✅ | nda-15-looptijd | value | waarde | 3739 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| ✅ | nda-16-boete | value | waarde | 8753 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | nda-17-forum | targeted | scope-precisie | 9572 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| ✅ | nda-18-uitzondering | add | toevoeging-scope | 10093 | 1 | 1/1 | 2 (doel 2) | 100 pass | — |
| ✅ | nda-19-vraag-boete | question | advies-only | 21424 | 0 | 0/0 | – | 100 pass | — |
| ✅ | av-20-opzeg | long | lang-document | 4555 | 1 | 1/1 | 14 (doel 14) | 100 pass | — |
| ✅ | av-21-betaaltermijn-trap | trap | non-unieke-find | 5890 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | av-22-aansprakelijkheid | tone | herformulering-scope | 26715 | 2 | 2/2 | 12 (doel 12) | 100 pass | — |
| ✅ | av-23-ie-gebruiksrecht | add | toevoeging-scope | 16245 | 1 | 1/1 | 11 (doel 11) | 100 pass | — |
| ✅ | av-24-forum | long | lang-document | 9074 | 1 | 1/1 | 16 (doel 16) | 100 pass | — |
| ✅ | av-25-incasso-multi | multi | multi-wijziging | 28720 | 1 | 1/1 | 7 (doel 7) | 40 fail | — |
| ✅ | vso-26-vergoeding | value | waarde | 9130 | 1 | 1/1 | 3 (doel 3) | 100 pass | — |
| ✅ | vso-27-relatiebeding | targeted | scope-precisie | 10256 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| ✅ | vso-28-getuigschrift-add | add | toevoeging-scope | 10246 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | vso-29-guardrail | guardrail | niet-bestaand-doel | 3991 | 0 | 0/0 | – | 100 pass | — |
| ✅ | zzp-30-tarief | value | waarde | 4323 | 1 | 1/1 | 3 (doel 3) | 100 pass | — |
| ✅ | h31-by-quote | topic | clausule-lokalisatie | 14583 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| ✅ | h32-multi-article | multi | multi-artikel | 7506 | 2 | 2/2 | 3,4 (doel 3,4) | 100 pass | — |
| ✅ | h33-broad-multi-instance | trap | non-unieke-find | 9719 | 2 | 2/2 | 3,6 (doel 3,6) | 100 pass | — |
| ✅ | h34-deletion | targeted | verwijdering | 15801 | 1 | 1/1 | 7 (doel 7) | 85 pass | — |
| ✅ | h35-ambiguous-ref | topic | clausule-lokalisatie | 5453 | 1 | 1/1 | 14 (doel 14) | 100 pass | — |
| ✅ | ahv-36-dragalong | add | dwingend-recht | 18468 | 1 | 1/1 | 6 (doel 6) | 80 pass | — |
| ✅ | ahv-37-aanbiedingstermijn | value | waarde | 5547 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| ✅ | ahv-38-noncompete-vijfjaar | legal | dwingend-recht | 11608 | 1 | 1/1 | 8 (doel 8) | 60 borderline | — |
| ✅ | ahv-39-blokkering-statuten | legal | dwingend-recht | 16419 | 1 | 1/1 | 5 (doel 5) | 100 pass | — |
| ✅ | ahv-40-vraag-tagalong | question | advies-only | 7185 | 0 | 0/0 | – | 100 pass | — |
| ✅ | vwo-41-datalek-24u | value | waarde | 7918 | 1 | 1/1 | 8 (doel 8) | 100 pass | — |
| ✅ | vwo-42-audit-schrappen | legal | dwingend-recht | 15927 | 1 | 1/1 | 10 (doel 10) | 100 pass | — |
| ✅ | vwo-43-subverwerker | legal | dwingend-recht | 20937 | 2 | 2/2 | 6 (doel 6) | 100 pass | — |
| ✅ | vwo-44-doorgifte-vs | legal | dwingend-recht | 14931 | 1 | 1/1 | 7 (doel 7) | 60 fail | — |
| ✅ | vwo-45-2fa | add | toevoeging-scope | 9112 | 1 | 1/1 | 5 (doel 5) | 90 pass | — |
| ✅ | saas-46-staffel | trap | lijst-staffel | 5947 | 1 | 1/1 | 6 (doel 6) | 100 pass | — |
| ✅ | saas-47-verlenging | trap | non-unieke-find | 6382 | 1 | 1/1 | 4 (doel 4) | 100 pass | — |
| ✅ | saas-48-exclusief | targeted | scope-precisie | 9444 | 1 | 1/1 | 2 (doel 2) | 100 pass | — |
| ✅ | saas-49-cap | value | waarde | 13749 | 1 | 1/1 | 11 (doel 11) | 100 pass | — |
| ✅ | saas-50-escrow-vraag | question | advies-only | 23455 | 0 | 0/0 | – | 100 pass | — |
| ✅ | fr-51-typografie-quotes | trap | typografie | 4447 | 1 | 1/1 | 7 (doel 7) | 100 pass | — |
| ✅ | fr-52-typografie-nbsp | trap | typografie | 8554 | 1 | 1/1 | 11 (doel 11) | 100 pass | — |
| ✅ | fr-53-dertig-dagen | trap | non-unieke-find | 6955 | 1 | 1/1 | 4 (doel 4) | 90 pass | — |
| ✅ | fr-54-definitie-crossref | multi | kruisverwijzing-definitie | 10233 | 2 | 2/2 | 1,8 (doel 1,8) | 100 pass | — |
| ✅ | fr-55-bijlage-artikel | targeted | bijlage-scope | 4823 | 1 | 1/1 | B1.2 (doel B1.2) | 100 pass | — |
| ✅ | fr-56-hoofd-vs-bijlage | trap | bijlage-scope | 5158 | 1 | 1/1 | 1 (doel 1) | 100 pass | — |
| ✅ | fr-57-herschrijf-lang | tone | multi-alinea-lengte | 30547 | 7 | 7/7 | 8 (doel 8) | 55 fail | — |
| ✅ | fr-58-bijlage3-guardrail | guardrail | niet-bestaand-doel | 3416 | 0 | 0/0 | – | 100 pass | — |
| ✅ | raam-59-diep-in-doc | long | lang-document | 3958 | 1 | 1/1 | 22 (doel 22) | 100 pass | — |
| ✅ | raam-60-truncatie | guardrail | truncatie | 2961 | 0 | 0/0 | – | 100 pass | — |
| ✅ | arb-61-ketenregeling | question | advies-only | 7455 | 0 | 0/0 | – | 90 pass | — |
| ✅ | huur-62-verhoging-8pct | legal | dwingend-recht | 16929 | 1 | 1/1 | 3 (doel 3) | 60 borderline | — |
| ✅ | huur-63-boete-te-laat | legal | dwingend-recht | 13509 | 1 | 1/1 | 3 | 75 borderline | — |
| ✅ | av-64-overal-behalve | multi | overal-vervangen-scope | 18317 | 10 | 10/10 | 2,3,4,8,10,11,12,13 (doel 2,3,4,8,10,11,12,13) | 100 pass | — |
| ✅ | zzp-65-auteursrecht | legal | juridische-volledigheid | 12643 | 1 | 1/1 | 8 (doel 8) | 100 pass | — |
| ✅ | zzp-66-schijnzelfstandig | legal | dwingend-recht | 11482 | 1 | 1/1 | 5 (doel 5) | 90 pass | — |
| ✅ | vso-67-bedenktermijn | legal | dwingend-recht | 8104 | 0 | 0/0 | – | 75 borderline | — |

## Niet-toepasbare suggesties (track-changes-risico)

## Judge-bevindingen (juridische inhoud)
- **arb-02-proeftijd** (60/100, borderline): De assistent vermeldt ten onrechte dat de proeftijd van twee maanden slechts 'voor het meerdere' nietig is; naar Nederlands arbeidsrecht leidt overschrijding van de wettelijke maximumduur in beginsel tot nietigheid van het proeftijdbeding als geheel.; De assistent had sterker moeten adviseren de wijziging niet door te voeren of een juridisch geldige alternatieve oplossing te kiezen.; De waarschuwing benoemt wel terecht dat bij een arbeidsovereenkomst voor bepaalde tijd van twaalf maanden maximaal één maand proeftijd is toegestaan op grond van artikel 7:652 BW.
- **arb-04-concurrentie-motivering** (45/100, fail): Het vervangingsvoorstel is afgekapt midden in een zin en levert daardoor geen bruikbare of geldige motivering op.; De motivering blijft vrij algemeen en is onvoldoende concreet toegespitst op waarom juist deze logistiek medewerker door zijn functie een zwaarwegend bedrijfs- of dienstbelang raakt.; De toelichting noemt terecht artikel 7:653 lid 2 BW en waarschuwt dat de motivering concreet en functiegebonden moet zijn, maar het voorstel zelf voldoet daar onvoldoende aan.; Er wordt alleen artikel 7 geraakt, dus de wijziging blijft binnen de gevraagde scope.
- **arb-08-geheimhouding-streng** (20/100, fail): De voorgestelde vervangende tekst is afgekapt en eindigt midden in de zin met 'tenzij Werkge', waardoor artikel 8 juridisch en taalkundig onbruikbaar is.; De toelichting stelt dat uitzonderingen en een teruggave-/verwijderplicht zijn opgenomen, maar die ontbreken in de daadwerkelijke replacement.; Bij een strengere geheimhoudingsclausule ontbreekt een noodzakelijke uitzondering voor wettelijke meldplichten, rechterlijke/overheidsverzoeken en klokkenluidersbescherming.; De verwijzing naar art. 7:611 BW is op zichzelf juist, maar de voorgestelde clausule is te absoluut en onvoldoende juridisch afgebakend.
- **huur-09-huurprijs** (90/100, pass): De waarschuwing over huurprijsbescherming en maximale huurprijsregels is juridisch juist.; De wijziging raakt alleen artikel 3 en voert de instructie correct uit.; Niet gesignaleerd is dat artikel 6 door de wijziging inconsistent wordt: € 2.400 is na verhoging niet langer gelijk aan twee maanden huur.
- **huur-10-opzegtermijn** (85/100, pass): De voorgestelde vervanging neemt een voor woonruimte bij maandelijkse betaling juridisch ongeldige/vernietigbare althans nietige opzegtermijn op ten nadele van de huurder.; De waarschuwing is inhoudelijk juist in strekking, maar formuleert te voorzichtig met 'mogelijk nietig'; afwijking van art. 7:271 BW ten nadele van de huurder is dwingendrechtelijk niet toegestaan.
- **huur-11-waarborg** (100/100, pass): De waarschuwing had iets stelliger kunnen formuleren dat € 3.600 bij een maandhuur van € 1.200 in strijd is met de wettelijke maximumwaarborgsom, maar de kern is correct benoemd.
- **huur-12-onderhoud-add** (60/100, borderline): De voorgestelde tekst is erg ruim: 'geen onderhoud' omvat ook onderhoud dat niet voor rekening van Huurder komt of eenvoudige kleine herstellingen die Huurder zelf moet kunnen laten uitvoeren.; Er ontbreekt een juridische nuancering zoals 'voor zover het onderhoud voor rekening van Huurder komt' en eventueel dat toestemming niet onredelijk mag worden onthouden.; De assistent waarschuwt niet voor mogelijke onredelijkheid/onevenwichtigheid van een absoluut toestemmingsvereiste in een woonruimtehuurovereenkomst met een particuliere huurder.
- **av-25-incasso-multi** (40/100, fail): Geen waarschuwing dat wettelijke handelsrente ex art. 6:119a BW alleen geldt bij handelsovereenkomsten en niet jegens consumenten.; Geen aandacht voor consumentenincasso: bij consumenten is voor buitengerechtelijke incassokosten eerst een correcte 14-dagenaanmaning vereist.; Het minimum van € 40 wordt wel juist gekoppeld aan het Besluit vergoeding voor buitengerechtelijke incassokosten, maar de voorgestelde clausule is te absoluut geformuleerd voor algemene voorwaarden die niet expliciet B2B zijn beperkt.; De toelichting bevat storende interne/debugtekst en dubbele passages, wat de professionele helderheid ernstig schaadt.
- **h34-deletion** (85/100, pass): De instructie was om artikel 7 volledig te verwijderen, maar het wijzigingsvoorstel verwijdert alleen de tekst van het beding en laat de artikelkop staan.; De toelichting schuift het verwijderen van de artikelkop door als optioneel, terwijl dit onderdeel was van de opdracht.
- **ahv-36-dragalong** (80/100, pass): De voorgestelde drag-along is in de kern juridisch mogelijk en volgt de instructie, maar mist praktische/ juridische uitwerking zoals kennisgeving, medewerkingsverplichtingen, levering bij notariële akte en eventuele benodigde goedkeuringen.; De assistent waarschuwt terecht voor het ontbreken van een waarderingsmechanisme, maar benoemt niet dat de contractuele drag-along moet worden afgestemd op de statutaire blokkeringsregeling en artikel 5; een aandeelhoudersovereenkomst kan statutaire overdrachtsbeperkingen niet zonder meer opzijzetten.; De formulering ‘onder dezelfde voorwaarden’ kan discussie geven of dit ook exact dezelfde prijs per aandeel omvat; dit had explicieter gekund.
- **ahv-38-noncompete-vijfjaar** (60/100, borderline): De assistent waarschuwt wel algemeen voor redelijkheid en billijkheid, maar benoemt niet het relevante mededingingsrechtelijke risico van een vijfjarig non-concurrentiebeding tussen aandeelhouders/ondernemingen.; Niet onderkend dat artikel 11 bepaalt dat de overeenkomst eindigt zodra een partij geen aandelen meer houdt, waardoor het post-contractuele non-concurrentiebeding mogelijk niet effectief doorwerkt zonder survival-bepaling.; Geen voorstel om geografische reikwijdte, materiële scope of rechtvaardiging van het beding aan te scherpen, terwijl de assistent zelf signaleert dat die ontbreken.
- **vwo-44-doorgifte-vs** (60/100, fail): Het voorgestelde vervangende artikel staat doorgifte naar de VS zonder voorwaarden toe en is daarmee in strijd met hoofdstuk V AVG.; De waarschuwing is terecht, maar de voorgestelde contracttekst verwerkt geen juridisch noodzakelijke voorwaarden zoals een adequaatheidsbesluit, EU-US Data Privacy Framework-certificering, SCC’s of andere passende waarborgen.; De formulering 'kan in strijd zijn' is te zwak voor een bepaling die doorgifte zonder enige AVG-voorwaarde toestaat.
- **vwo-45-2fa** (90/100, pass): De voorgestelde tekst neemt niet expliciet het woord 'uitsluitend' of een gelijkwaardige exclusiviteitsformulering op, terwijl de instructie daarom vroeg.
- **fr-53-dertig-dagen** (90/100, pass): De wijziging verlengt artikel 4 correct naar vijfenveertig dagen.; De assistent signaleert niet dat artikel 5 bepaalt dat de marketingbijdrage gelijktijdig met de franchisevergoeding wordt betaald, maar tevens binnen dertig dagen; na wijziging van artikel 4 ontstaat daardoor een mogelijke interne inconsistentie.
- **fr-57-herschrijf-lang** (55/100, fail): Het postcontractuele non-concurrentiebeding lijkt mogelijk in strijd met art. 7:920 lid 2 BW voor zover het geografisch verder gaat dan het Rayon waarbinnen de formule wordt geëxploiteerd.; De toelichting noemt art. 7:920 BW, maar waarschuwt niet concreet dat de bestaande reikwijdte en/of het ontbreken van een expliciete knowhow-beschermingsgrond juridisch risicovol kan zijn.; De opdracht was artikel 8 volledig te herschrijven; de assistent geeft losse find/replace-wijzigingen en geen geïntegreerde nieuwe tekst van artikel 8.; De vervanging van 'personeelsleden' door 'medewerkers' kan de reikwijdte van het relatiebeding inhoudelijk wijzigen, omdat 'medewerkers' ruimer kan zijn dan werknemers/personeelsleden.
- **arb-61-ketenregeling** (90/100, pass): De uitleg noemt cao-afwijking, maar benoemt niet expliciet dat eerdere contracten of opvolgend werkgeverschap kunnen meetellen in de ketenregeling.; Ook wordt niet vermeld dat de ketenregeling ziet op opeenvolgende contracten met tussenpozen van ten hoogste zes maanden.
- **huur-62-verhoging-8pct** (60/100, borderline): Het voorstel legt een onvoorwaardelijke huurverhoging van 8% vast zonder voorbehoud dat deze slechts geldt voor zover wettelijk toegestaan; bij woonruimte kan dat in strijd zijn met dwingendrechtelijke huurprijsbescherming.; De waarschuwing over wettelijke maxima is te algemeen en toetst niet of 8% per 1 juli 2027 mogelijk boven het dan geldende maximum uitkomt.; Artikel 5 voorziet al in CPI-indexering per 1 juli 2027; de assistent signaleert samenloop maar lost de mogelijke dubbele of tegenstrijdige huurverhoging niet op.; De verwijzing naar art. 7:248 BW is op zichzelf niet evident onjuist, maar de relevante wettelijke systematiek wordt onvolledig benoemd.
- **huur-63-boete-te-laat** (75/100, borderline): De waarschuwing is terecht maar te algemeen; bij woonruimte met een particuliere huurder is een boete van € 250 per dag zonder maximum zeer waarschijnlijk onredelijk bezwarend/oneerlijk en kan buiten toepassing blijven.; Er wordt niet gewezen op de consumentenrechtelijke toetsing, waaronder Richtlijn 93/13/EEG en de ambtshalve toetsing door de rechter, noch op de relevantie van proportionaliteit en een maximum.; De assistent voert de gevraagde risicovolle formulering volledig door zonder een juridisch veiliger alternatief, zoals een redelijke maximering, voor te stellen.
- **zzp-66-schijnzelfstandig** (90/100, pass): De waarschuwing voor het risico op kwalificatie als arbeidsovereenkomst wegens gezag en vaste aanwezigheid is juridisch juist.; De assistent noemt terecht art. 7:610 BW en de criteria arbeid, loon en gezag.; Niet gesignaleerd is dat dagelijkse aanwezigheid van 9:00 tot 17:00 uur spanning oplevert met artikel 2, waarin gemiddeld 24 uur per week is afgesproken.
- **vso-67-bedenktermijn** (75/100, borderline): De kernregel is juist: afstand van de wettelijke bedenktermijn is nietig en werknemer behoudt het ontbindingsrecht.; De verwijzing naar art. 7:670b lid 6 BW is onjuist; de nietigheid staat in art. 7:670b lid 5 BW.; De assistent had vollediger kunnen zijn door een rechtsgeldige alternatieve bepaling voor te stellen waarin de werknemer op de wettelijke bedenktermijn wordt gewezen, nu het document die vermelding mist.