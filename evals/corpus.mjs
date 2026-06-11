// Drafter eval-corpus — realistische Nederlandse juridische documenten.
//
// Elk document is opgebouwd met "Artikel N"-koppen zodat de scoring de artikel-spans
// kan detecteren en kan controleren of een wijziging ECHT alleen het bedoelde artikel raakt
// (de kern-zorg bij track changes: past hij te veel/te weinig/de verkeerde passage aan?).
//
// Houd waarden uniek (bedragen, termijnen) zodat een `find`-anker ondubbelzinnig te plaatsen is.

export const DOCS = {
  // ── 1. Arbeidsovereenkomst voor bepaalde tijd ──────────────────────────────
  arbeid_bepaalde_tijd: `ARBEIDSOVEREENKOMST VOOR BEPAALDE TIJD

De ondergetekenden:
1. Maasveld Logistiek B.V., gevestigd te Rotterdam, hierbij rechtsgeldig vertegenwoordigd door mevrouw J. de Wit, hierna te noemen: "Werkgever";
2. de heer P. Jansen, wonende te Schiedam, hierna te noemen: "Werknemer";

komen het volgende overeen:

Artikel 1 — Functie en aanvang
Werknemer treedt met ingang van 1 september 2026 in dienst van Werkgever in de functie van logistiek medewerker. Werknemer verricht zijn werkzaamheden vanuit de vestiging te Rotterdam.

Artikel 2 — Duur van de overeenkomst
Deze arbeidsovereenkomst is aangegaan voor bepaalde tijd, te weten voor de duur van twaalf (12) maanden. De overeenkomst eindigt van rechtswege op 31 augustus 2027, zonder dat opzegging is vereist.

Artikel 3 — Proeftijd
Gedurende de eerste maand van het dienstverband geldt een proeftijd als bedoeld in artikel 7:652 BW. Tijdens de proeftijd kan ieder der partijen de arbeidsovereenkomst met onmiddellijke ingang beëindigen.

Artikel 4 — Arbeidsduur en werktijden
De arbeidsduur bedraagt 40 uur per week, verdeeld over vijf werkdagen van maandag tot en met vrijdag. De gebruikelijke werktijden zijn van 08:30 tot 17:00 uur.

Artikel 5 — Salaris
Het brutosalaris bedraagt € 2.800 per maand, te voldoen uiterlijk op de laatste dag van iedere kalendermaand. Werknemer heeft daarnaast recht op 8% vakantietoeslag, jaarlijks uit te keren in de maand mei.

Artikel 6 — Vakantie
Werknemer heeft recht op 25 vakantiedagen per kalenderjaar op basis van een voltijds dienstverband, met behoud van salaris.

Artikel 7 — Concurrentiebeding
Het is Werknemer verboden om gedurende twaalf maanden na het einde van het dienstverband binnen een straal van 50 kilometer werkzaam te zijn bij een onderneming die gelijksoortige activiteiten ontplooit als Werkgever.

Artikel 8 — Geheimhouding
Werknemer is verplicht tot geheimhouding van alle vertrouwelijke informatie waarvan hij in het kader van zijn dienstverband kennisneemt, zowel gedurende als na afloop van de arbeidsovereenkomst.

Artikel 9 — Toepasselijk recht
Op deze arbeidsovereenkomst is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter te Rotterdam.

Aldus overeengekomen en in tweevoud opgemaakt te Rotterdam.`,

  // ── 2. Huurovereenkomst woonruimte ─────────────────────────────────────────
  huur_woonruimte: `HUUROVEREENKOMST WOONRUIMTE

De ondergetekenden:
1. Stadshof Vastgoed B.V., hierna te noemen: "Verhuurder";
2. mevrouw S. el Amrani, hierna te noemen: "Huurder";

zijn overeengekomen als volgt:

Artikel 1 — Het gehuurde
Verhuurder verhuurt aan Huurder de zelfstandige woonruimte gelegen aan de Lindelaan 14-B te Utrecht, bestemd om te worden gebruikt als woonruimte.

Artikel 2 — Duur en ingangsdatum
Deze huurovereenkomst is aangegaan voor onbepaalde tijd en gaat in op 1 oktober 2026.

Artikel 3 — Huurprijs
De huurprijs bedraagt € 1.200 per maand. De huurprijs dient bij vooruitbetaling te worden voldaan, telkens vóór de eerste dag van de maand.

Artikel 4 — Servicekosten
Naast de huurprijs is Huurder een voorschot op de servicekosten verschuldigd van € 95 per maand, jaarlijks te verrekenen op basis van de werkelijke kosten.

Artikel 5 — Indexering
De huurprijs wordt jaarlijks per 1 juli aangepast conform de consumentenprijsindex (CPI) van het CBS, voor het eerst op 1 juli 2027.

Artikel 6 — Waarborgsom
Huurder betaalt bij aanvang van de huur een waarborgsom van € 2.400, gelijk aan twee maanden huur, die na het einde van de huur wordt terugbetaald onder verrekening van eventuele schade.

Artikel 7 — Onderhoud
Het dagelijks onderhoud en de kleine herstellingen komen voor rekening van Huurder. Het groot onderhoud komt voor rekening van Verhuurder.

Artikel 8 — Opzegging
Huurder kan de huurovereenkomst opzeggen met inachtneming van een opzegtermijn van één maand. Opzegging geschiedt schriftelijk per aangetekende brief.

Artikel 9 — Toepasselijk recht
Op deze overeenkomst is Nederlands recht van toepassing.`,

  // ── 3. Geheimhoudingsovereenkomst (NDA) ────────────────────────────────────
  nda: `GEHEIMHOUDINGSOVEREENKOMST

De ondergetekenden:
1. Nuvolar Technologies B.V., hierna te noemen: "Verstrekkende Partij";
2. Brightline Consulting B.V., hierna te noemen: "Ontvangende Partij";

overwegende dat partijen in het kader van een mogelijke samenwerking vertrouwelijke informatie uitwisselen, komen overeen:

Artikel 1 — Definitie vertrouwelijke informatie
Onder vertrouwelijke informatie wordt verstaan alle informatie, in welke vorm dan ook, die door de Verstrekkende Partij als vertrouwelijk is aangemerkt of waarvan de Ontvangende Partij redelijkerwijs kan vermoeden dat deze vertrouwelijk is.

Artikel 2 — Geheimhoudingsplicht
De Ontvangende Partij verbindt zich de vertrouwelijke informatie strikt geheim te houden en niet aan derden te verstrekken zonder voorafgaande schriftelijke toestemming van de Verstrekkende Partij.

Artikel 3 — Gebruiksbeperking
De Ontvangende Partij gebruikt de vertrouwelijke informatie uitsluitend voor het doel waarvoor deze is verstrekt, te weten de beoordeling van de mogelijke samenwerking.

Artikel 4 — Duur
De verplichtingen uit deze overeenkomst gelden gedurende een periode van drie jaar na de datum van ondertekening.

Artikel 5 — Teruggave
Op eerste verzoek van de Verstrekkende Partij retourneert of vernietigt de Ontvangende Partij alle dragers van vertrouwelijke informatie.

Artikel 6 — Boetebeding
Bij iedere overtreding van de verplichtingen uit deze overeenkomst verbeurt de Ontvangende Partij een direct opeisbare boete van € 10.000 per overtreding, onverminderd het recht op volledige schadevergoeding.

Artikel 7 — Toepasselijk recht en forumkeuze
Op deze overeenkomst is Nederlands recht van toepassing. Geschillen worden bij uitsluiting voorgelegd aan de rechtbank Amsterdam.`,

  // ── 4. Algemene voorwaarden (lang — voor lange-document-tests) ─────────────
  algemene_voorwaarden: `ALGEMENE VOORWAARDEN VELDKAMP SOFTWARE B.V.

Artikel 1 — Definities
In deze algemene voorwaarden wordt verstaan onder: "Opdrachtnemer": Veldkamp Software B.V.; "Opdrachtgever": de wederpartij; "Overeenkomst": iedere overeenkomst tussen partijen.

Artikel 2 — Toepasselijkheid
Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, offertes en overeenkomsten van Opdrachtnemer. Afwijkingen gelden uitsluitend indien schriftelijk overeengekomen.

Artikel 3 — Aanbiedingen en offertes
Alle aanbiedingen en offertes van Opdrachtnemer zijn vrijblijvend en geldig gedurende dertig dagen, tenzij anders aangegeven.

Artikel 4 — Totstandkoming van de overeenkomst
De overeenkomst komt tot stand op het moment dat Opdrachtgever de offerte schriftelijk aanvaardt dan wel op het moment dat Opdrachtnemer met de uitvoering aanvangt.

Artikel 5 — Prijzen
Alle prijzen zijn exclusief btw en exclusief eventuele reis- en verblijfkosten, tenzij uitdrukkelijk anders vermeld.

Artikel 6 — Betaling
Betaling dient te geschieden binnen dertig dagen na factuurdatum. Bij overschrijding van de betalingstermijn is Opdrachtgever van rechtswege in verzuim.

Artikel 7 — Verzuim en incassokosten
Bij verzuim is Opdrachtgever de wettelijke handelsrente verschuldigd alsmede de buitengerechtelijke incassokosten conform de Wet normering buitengerechtelijke incassokosten.

Artikel 8 — Uitvoering van de overeenkomst
Opdrachtnemer voert de overeenkomst naar beste inzicht en vermogen uit. Alle verbintenissen van Opdrachtnemer zijn inspanningsverbintenissen.

Artikel 9 — Termijnen
Overeengekomen termijnen zijn nimmer fatale termijnen, tenzij uitdrukkelijk schriftelijk anders is overeengekomen.

Artikel 10 — Wijzigingen en meerwerk
Indien tijdens de uitvoering blijkt dat wijziging of aanvulling nodig is, zal Opdrachtnemer Opdrachtgever hierover tijdig informeren. Meerwerk wordt afzonderlijk in rekening gebracht.

Artikel 11 — Intellectuele eigendom
Alle intellectuele eigendomsrechten op de door Opdrachtnemer ontwikkelde werken berusten bij Opdrachtnemer, tenzij schriftelijk anders is overeengekomen.

Artikel 12 — Aansprakelijkheid
De aansprakelijkheid van Opdrachtnemer is beperkt tot het bedrag dat in het betreffende geval door de aansprakelijkheidsverzekering wordt uitgekeerd. Indien de verzekering niet uitkeert, is de aansprakelijkheid beperkt tot het factuurbedrag van de betreffende opdracht.

Artikel 13 — Overmacht
In geval van overmacht is Opdrachtnemer gerechtigd de uitvoering op te schorten zonder tot enige schadevergoeding gehouden te zijn.

Artikel 14 — Opzegging en ontbinding
Elk der partijen kan de overeenkomst schriftelijk opzeggen met inachtneming van een opzegtermijn van twee maanden. Ontbinding is mogelijk bij een toerekenbare tekortkoming na schriftelijke ingebrekestelling.

Artikel 15 — Geheimhouding
Partijen behandelen alle vertrouwelijke informatie die zij van elkaar ontvangen vertrouwelijk.

Artikel 16 — Toepasselijk recht en geschillen
Op alle overeenkomsten is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter te Zwolle.`,

  // ── 5. Vaststellingsovereenkomst (beëindiging arbeid) ──────────────────────
  vaststellingsovereenkomst: `VASTSTELLINGSOVEREENKOMST

De ondergetekenden:
1. Hoofdstad Retail B.V., hierna te noemen: "Werkgever";
2. de heer M. Bakker, hierna te noemen: "Werknemer";

nemen het volgende in aanmerking en komen overeen:

Artikel 1 — Einde dienstverband
De tussen partijen bestaande arbeidsovereenkomst eindigt met wederzijds goedvinden per 1 december 2026. Het initiatief tot beëindiging is uitgegaan van Werkgever.

Artikel 2 — Vrijstelling van werk
Werknemer wordt met ingang van 1 november 2026 vrijgesteld van werk, met behoud van salaris en onder doorbetaling van emolumenten tot de einddatum.

Artikel 3 — Beëindigingsvergoeding
Werkgever betaalt aan Werknemer een beëindigingsvergoeding van € 18.000 bruto, te voldoen binnen één maand na de einddatum, op de wijze als bedoeld in artikel 7:673 BW.

Artikel 4 — Eindafrekening
Bij het einde van het dienstverband ontvangt Werknemer de gebruikelijke eindafrekening, waaronder de uitbetaling van niet-genoten vakantiedagen en de opgebouwde vakantietoeslag.

Artikel 5 — Concurrentie- en relatiebeding
Werkgever doet afstand van het tussen partijen geldende concurrentiebeding. Het relatiebeding blijft onverkort van kracht gedurende twaalf maanden na de einddatum.

Artikel 6 — Getuigschrift
Werkgever verstrekt Werknemer op diens verzoek een positief en neutraal geformuleerd getuigschrift.

Artikel 7 — Finale kwijting
Na uitvoering van het in deze overeenkomst bepaalde verlenen partijen elkaar over en weer finale kwijting ter zake van de arbeidsovereenkomst en de beëindiging daarvan.

Artikel 8 — Toepasselijk recht
Op deze overeenkomst is Nederlands recht van toepassing.`,

  // ── 6. Opdrachtovereenkomst (ZZP) ──────────────────────────────────────────
  opdracht_zzp: `OVEREENKOMST VAN OPDRACHT

De ondergetekenden:
1. Kernpunt Advies B.V., hierna te noemen: "Opdrachtgever";
2. de heer T. Visser, handelend onder de naam Visser Interim, hierna te noemen: "Opdrachtnemer";

komen overeen:

Artikel 1 — De opdracht
Opdrachtnemer verricht voor Opdrachtgever werkzaamheden als interim projectmanager ten behoeve van het project "Migratie Klantsysteem".

Artikel 2 — Duur en omvang
De opdracht vangt aan op 1 oktober 2026 en wordt aangegaan voor de duur van zes maanden, voor gemiddeld 24 uur per week.

Artikel 3 — Tarief
Opdrachtnemer brengt een uurtarief van € 95 exclusief btw in rekening. Facturering vindt maandelijks plaats op basis van de werkelijk bestede uren.

Artikel 4 — Betaling
Opdrachtgever voldoet de facturen binnen veertien dagen na factuurdatum.

Artikel 5 — Zelfstandigheid
Opdrachtnemer verricht de werkzaamheden zelfstandig en naar eigen inzicht. Tussen partijen is uitdrukkelijk geen arbeidsovereenkomst beoogd.

Artikel 6 — Vervanging
Opdrachtnemer is gerechtigd zich bij de uitvoering van de opdracht te laten vervangen door een gelijkwaardig gekwalificeerde persoon, na voorafgaande melding aan Opdrachtgever.

Artikel 7 — Aansprakelijkheid
De aansprakelijkheid van Opdrachtnemer is per gebeurtenis beperkt tot het factuurbedrag over de laatste drie maanden, met een maximum van € 25.000.

Artikel 8 — Intellectuele eigendom
Alle intellectuele eigendomsrechten op de resultaten van de opdracht gaan na volledige betaling over op Opdrachtgever.

Artikel 9 — Tussentijdse opzegging
Beide partijen kunnen de opdracht tussentijds opzeggen met inachtneming van een opzegtermijn van één maand.

Artikel 10 — Toepasselijk recht
Op deze overeenkomst is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de rechtbank Midden-Nederland.`,

  // ── 7. Aandeelhoudersovereenkomst (BV) — vennootschapsrecht ────────────────
  aandeelhouders: `AANDEELHOUDERSOVEREENKOMST INNOVATECH SOLUTIONS B.V.

De ondergetekenden:
1. Bloemendaal Beheer B.V., houdster van 60% van de aandelen, hierna: "Bloemendaal";
2. Van Galen Holding B.V., houdster van 40% van de aandelen, hierna: "Van Galen";
gezamenlijk de aandeelhouders van Innovatech Solutions B.V., hierna: "de Vennootschap";

komen overeen:

Artikel 1 — Definities
In deze overeenkomst wordt verstaan onder: "Aandelen": alle door een aandeelhouder gehouden aandelen in het kapitaal van de Vennootschap; "Overdracht": iedere vervreemding of bezwaring van Aandelen; "Derde": iedere partij die geen partij is bij deze overeenkomst.

Artikel 2 — Bestuur en besluitvorming
Het bestuur van de Vennootschap behoeft de voorafgaande goedkeuring van beide aandeelhouders voor besluiten omtrent: het aangaan van verplichtingen boven € 150.000, het vestigen van zekerheden, het benoemen of ontslaan van statutair bestuurders en het wijzigen van de strategie.

Artikel 3 — Dividendbeleid
De Vennootschap keert jaarlijks ten minste 40% van de nettowinst uit als dividend, tenzij beide aandeelhouders schriftelijk anders besluiten of de uitkeringstoets van artikel 2:216 BW zich daartegen verzet.

Artikel 4 — Aanbiedingsplicht
De aandeelhouder die zijn Aandelen geheel of gedeeltelijk wenst over te dragen, biedt deze eerst te koop aan aan de andere aandeelhouder. De andere aandeelhouder heeft een reactietermijn van dertig dagen na ontvangst van het aanbod.

Artikel 5 — Blokkeringsregeling
Overdracht van Aandelen aan een Derde behoeft de voorafgaande goedkeuring van de algemene vergadering, overeenkomstig de blokkeringsregeling in de statuten van de Vennootschap.

Artikel 6 — Meeverkooprecht (tag-along)
Indien Bloemendaal haar Aandelen geheel of gedeeltelijk aan een Derde verkoopt, heeft Van Galen het recht om haar Aandelen onder dezelfde voorwaarden en tegen dezelfde prijs per aandeel mee te verkopen.

Artikel 7 — Informatierechten
De Vennootschap verstrekt iedere aandeelhouder binnen vijfenveertig dagen na afloop van ieder kwartaal de kwartaalcijfers, alsmede jaarlijks de conceptjaarrekening.

Artikel 8 — Non-concurrentie
Het is een aandeelhouder verboden om gedurende de periode dat hij Aandelen houdt en gedurende twee jaar na Overdracht van al zijn Aandelen, direct of indirect concurrerende activiteiten te ontplooien ten opzichte van de Vennootschap.

Artikel 9 — Geheimhouding
De aandeelhouders houden alle informatie omtrent de Vennootschap waarvan zij weten of behoren te weten dat deze vertrouwelijk is, strikt geheim.

Artikel 10 — Boetebeding
Bij overtreding van artikel 8 of artikel 9 verbeurt de overtredende aandeelhouder een direct opeisbare boete van € 100.000 per overtreding, onverminderd het recht van de andere partij op volledige schadevergoeding.

Artikel 11 — Duur
Deze overeenkomst geldt zolang beide partijen aandeelhouder van de Vennootschap zijn en eindigt van rechtswege ten aanzien van een partij zodra die partij geen Aandelen meer houdt.

Artikel 12 — Toepasselijk recht en forumkeuze
Op deze overeenkomst is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de rechtbank Noord-Holland, locatie Haarlem.`,

  // ── 8. Verwerkersovereenkomst (AVG) ─────────────────────────────────────────
  verwerkers: `VERWERKERSOVEREENKOMST

De ondergetekenden:
1. Praktijk De Linde B.V., hierna: "Verwerkingsverantwoordelijke";
2. CloudAdmin Services B.V., hierna: "Verwerker";

in aanmerking nemende dat Verwerker in opdracht van Verwerkingsverantwoordelijke persoonsgegevens verwerkt in het kader van de salaris- en personeelsadministratie, komen overeen:

Artikel 1 — Definities
De begrippen in deze overeenkomst hebben de betekenis die daaraan wordt gegeven in de Algemene verordening gegevensbescherming (AVG), waaronder: "Persoonsgegevens", "Verwerking", "Betrokkene" en "Datalek" (inbreuk in verband met persoonsgegevens).

Artikel 2 — Voorwerp van de verwerking
Verwerker verwerkt uitsluitend de volgende categorieën persoonsgegevens: naam, adres, woonplaats, geboortedatum, burgerservicenummer, salarisgegevens en verzuimgegevens, van de categorie betrokkenen: werknemers van Verwerkingsverantwoordelijke, met als doel het voeren van de salaris- en personeelsadministratie, voor de duur van de hoofdovereenkomst.

Artikel 3 — Instructies
Verwerker verwerkt de persoonsgegevens uitsluitend op basis van schriftelijke instructies van Verwerkingsverantwoordelijke, behoudens afwijkende wettelijke verplichtingen.

Artikel 4 — Geheimhouding
Verwerker waarborgt dat personen die onder haar gezag persoonsgegevens verwerken, zich tot geheimhouding hebben verbonden.

Artikel 5 — Beveiliging
Verwerker treft passende technische en organisatorische maatregelen, waaronder versleuteling van gegevens in rust en tijdens transport, logische toegangscontrole op basis van least privilege en periodieke beveiligingstests.

Artikel 6 — Sub-verwerkers
Verwerker schakelt geen sub-verwerkers in zonder voorafgaande specifieke schriftelijke toestemming van Verwerkingsverantwoordelijke. Verwerker legt aan iedere sub-verwerker dezelfde verplichtingen op als in deze overeenkomst zijn opgenomen.

Artikel 7 — Doorgifte buiten de EER
Verwerker verwerkt de persoonsgegevens uitsluitend binnen de Europese Economische Ruimte, tenzij Verwerkingsverantwoordelijke vooraf schriftelijk instemt en passende waarborgen als bedoeld in hoofdstuk V van de AVG zijn getroffen.

Artikel 8 — Datalekken
Verwerker informeert Verwerkingsverantwoordelijke zonder onredelijke vertraging, doch uiterlijk binnen 48 uur na ontdekking, over ieder Datalek, en verstrekt daarbij alle informatie die nodig is om aan de wettelijke meldplicht te kunnen voldoen.

Artikel 9 — Rechten van betrokkenen
Verwerker verleent Verwerkingsverantwoordelijke alle redelijke bijstand bij het vervullen van diens plicht om verzoeken van Betrokkenen tot inzage, rectificatie of verwijdering te beantwoorden.

Artikel 10 — Audit
Verwerker stelt alle informatie ter beschikking die nodig is om naleving van deze overeenkomst aan te tonen en maakt audits door of namens Verwerkingsverantwoordelijke mogelijk, ten hoogste eenmaal per jaar.

Artikel 11 — Teruggave en verwijdering
Na afloop van de hoofdovereenkomst retourneert of verwijdert Verwerker alle persoonsgegevens binnen zestig dagen, naar keuze van Verwerkingsverantwoordelijke, behoudens wettelijke bewaarplichten.

Artikel 12 — Toepasselijk recht
Op deze overeenkomst is Nederlands recht van toepassing.`,

  // ── 9. Licentie-/SaaS-voorwaarden (IE & tech, met staffel-lijst) ────────────
  saas_licentie: `LICENTIE- EN SAAS-VOORWAARDEN NOVAPLAN SOFTWARE B.V.

Artikel 1 — Definities
In deze voorwaarden wordt verstaan onder: "Novaplan": Novaplan Software B.V.; "Klant": de wederpartij van Novaplan; "Software": de programmatuur Novaplan Studio, zoals als onlinedienst ter beschikking gesteld; "Abonnement": het recht op toegang tot en gebruik van de Software.

Artikel 2 — Licentie
Novaplan verleent Klant voor de duur van het Abonnement een niet-exclusief, niet-overdraagbaar en niet-sublicentieerbaar recht om de Software te gebruiken binnen de eigen organisatie van Klant, uitsluitend voor diens interne bedrijfsvoering.

Artikel 3 — Beschikbaarheid
Novaplan spant zich in voor een beschikbaarheid van de Software van ten minste 99,5% per kalendermaand, gemeten buiten aangekondigde onderhoudsvensters.

Artikel 4 — Duur en verlenging
Het Abonnement wordt aangegaan voor een initiële periode van twaalf maanden en wordt daarna telkens stilzwijgend verlengd met perioden van twaalf maanden, behoudens schriftelijke opzegging uiterlijk drie maanden voor het einde van de lopende periode.

Artikel 5 — Vergoeding
De abonnementsvergoeding bedraagt € 450 per maand per omgeving, jaarlijks per 1 januari te indexeren conform de Dienstenprijsindex (DPI) van het CBS.

Artikel 6 — Servicecredits
Indien de beschikbaarheid in een kalendermaand lager is dan toegezegd, heeft Klant recht op een servicecredit op de maandvergoeding volgens de volgende staffel:
a. bij een beschikbaarheid lager dan 99,5% maar ten minste 99,0%: een credit van 5% van de maandvergoeding;
b. bij een beschikbaarheid lager dan 99,0% maar ten minste 97,0%: een credit van 10% van de maandvergoeding;
c. bij een beschikbaarheid lager dan 97,0%: een credit van 20% van de maandvergoeding.

Artikel 7 — Onderhoud en updates
Novaplan houdt de Software in stand en stelt updates en upgrades ter beschikking zodra deze algemeen beschikbaar zijn. Aangekondigd onderhoud vindt zoveel mogelijk buiten kantooruren plaats.

Artikel 8 — Intellectuele eigendom
Alle intellectuele eigendomsrechten op de Software, de documentatie en daarmee samenhangende materialen berusten uitsluitend bij Novaplan of haar licentiegevers. Er vindt geen overdracht van intellectuele eigendomsrechten aan Klant plaats.

Artikel 9 — Broncode en escrow
Klant verkrijgt geen toegang tot de broncode van de Software. Een broncode-escrowregeling maakt geen deel uit van het Abonnement en wordt slechts getroffen indien partijen dit afzonderlijk schriftelijk overeenkomen.

Artikel 10 — Klantdata
Alle door of namens Klant in de Software ingevoerde gegevens blijven eigendom van Klant. Novaplan stelt na het einde van het Abonnement gedurende dertig dagen een export van de klantdata beschikbaar in een gangbaar formaat.

Artikel 11 — Aansprakelijkheid
De totale aansprakelijkheid van Novaplan per kalenderjaar is beperkt tot de door Klant in de twaalf voorafgaande maanden betaalde abonnementsvergoedingen, met een maximum van € 75.000. Aansprakelijkheid voor indirecte schade, waaronder gederfde winst en verlies van gegevens, is uitgesloten.

Artikel 12 — Gebruiksaudit
Novaplan is gerechtigd ten hoogste eenmaal per jaar het gebruik van de Software door Klant te controleren op overeenstemming met het Abonnement, na voorafgaande aankondiging van ten minste tien werkdagen.

Artikel 13 — Opschorting
Novaplan mag de toegang tot de Software opschorten indien Klant na aanmaning in gebreke blijft met betaling of indien het gebruik de veiligheid of integriteit van de dienst bedreigt.

Artikel 14 — Toepasselijk recht en forumkeuze
Op deze voorwaarden is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de rechtbank Den Haag.`,

  // ── 10. Franchiseovereenkomst — adversarieel: bijlage met eigen nummering,
  //        typografische aanhalingstekens, non-breaking space, dubbele spatie,
  //        en drie voorkomens van "dertig dagen" (art. 4, 5 en 10) ─────────────
  franchise: `FRANCHISEOVEREENKOMST HET GOUDEN BROOD

De ondergetekenden:
1. Het Gouden Brood Formule B.V., gevestigd te Apeldoorn, hierna te noemen: "Franchisegever";
2. Vermeulen Brood V.O.F., gevestigd te Deventer, hierna te noemen: "Franchisenemer";

komen overeen:

Artikel 1 — Definities
In deze overeenkomst wordt verstaan onder: "Formule": het door Franchisegever ontwikkelde bedrijfsconcept voor ambachtelijke bakkerijwinkels, met inbegrip van merknaam, huisstijl en werkwijzen; "Handboek": het handboek waarin de Formule is beschreven; "Vertrouwelijke Informatie": alle recepturen, de inhoud van het Handboek en overige bedrijfsgeheimen van Franchisegever; "Rayon": het in Bijlage 1 omschreven verzorgingsgebied.

Artikel 2 — De Formule en het Rayon
Franchisegever verleent Franchisenemer het exclusieve recht om de Formule te exploiteren binnen het Rayon. Franchisenemer exploiteert binnen het Rayon één bakkerijwinkel volgens de Formule.

Artikel 3 — Duur
Deze overeenkomst wordt aangegaan voor de duur van vijf jaar, ingaande op 1 januari 2027. Verlenging geschiedt telkens met perioden van vijf jaar, tenzij een der partijen uiterlijk twaalf maanden voor het einde van de lopende periode schriftelijk opzegt.

Artikel 4 — Franchisevergoeding
Franchisenemer is bij aanvang een eenmalige entreevergoeding van € 35.000 verschuldigd. Daarnaast is Franchisenemer een doorlopende franchisevergoeding verschuldigd van 6% van de maandomzet exclusief btw, te voldoen binnen dertig dagen na afloop van de betreffende kalendermaand.

Artikel 5 — Marketingbijdrage
Franchisenemer draagt maandelijks 2% van de maandomzet exclusief btw af aan het landelijke marketingfonds. De afdracht geschiedt gelijktijdig met de in artikel 4 bedoelde franchisevergoeding, binnen dertig dagen na afloop van de kalendermaand.

Artikel 6 — Het Handboek
Franchisenemer ontvangt bij aanvang één exemplaar van het Handboek in bruikleen. Het Handboek en alle wijzigingen daarvan behoren tot de Vertrouwelijke Informatie en blijven eigendom van Franchisegever.

Artikel 7 — Opleiding
Franchisenemer en diens bedrijfsleider volgen voor de opening de opleiding “Startklaar Plus” aan de formule-academie te Apeldoorn. De opleiding duurt tien werkdagen en de kosten daarvan zijn begrepen in de entreevergoeding.

Artikel 8 — Non-concurrentie, relatiebeding en geheimhouding
8.1 Het is Franchisenemer gedurende de looptijd van deze overeenkomst en gedurende één jaar na het einde daarvan verboden om binnen het Rayon, dan wel binnen een straal van tien kilometer daarbuiten, direct of indirect betrokken te zijn bij een onderneming die brood- of banketproducten verkoopt volgens een met de Formule vergelijkbaar concept.
8.2 Het is Franchisenemer gedurende dezelfde periode verboden om leveranciers of personeelsleden van Franchisegever of van andere franchisenemers van de Formule te bewegen hun relatie met Franchisegever te beëindigen.
8.3 Franchisenemer houdt alle Vertrouwelijke Informatie strikt geheim, zowel tijdens als na afloop van deze overeenkomst, en gebruikt deze uitsluitend voor de exploitatie van de Formule binnen het Rayon.

Artikel 9 — Boetes
Bij overtreding van deze overeenkomst is Franchisenemer de volgende direct opeisbare boetes verschuldigd, onverminderd het recht van Franchisegever op volledige schadevergoeding:
a. bij te late betaling van enige vergoeding: € 250 per dag dat de betaling uitblijft;
b. bij schending van de geheimhoudingsplicht: € 12.500 per overtreding;
c. bij schending van het non-concurrentiebeding: € 25.000 per overtreding, vermeerderd met € 1.000 per dag dat de overtreding voortduurt.

Artikel 10 — Inkoopverplichting
Franchisenemer betrekt ten minste 80% van het assortiment van Franchisegever of van door Franchisegever aangewezen leveranciers. Facturen voor leveringen worden voldaan binnen dertig dagen na factuurdatum.

Artikel 11 — Prijsbeleid
Franchisegever verstrekt jaarlijks adviesprijzen voor het kernassortiment. Voor het standaardbrood “Goudkorst” geldt een consumentenadviesprijs van € 3,95. De adviesprijslijst wordt  jaarlijks geactualiseerd; Franchisenemer blijft vrij zijn eigen verkoopprijzen vast te stellen.

Artikel 12 — Administratie en controle
Franchisenemer voert een deugdelijke administratie en verstrekt Franchisegever maandelijks een omzetopgave. Franchisegever is gerechtigd de administratie eenmaal per jaar door een accountant te laten controleren, ter verificatie van de in artikel 4 bedoelde franchisevergoeding.

Artikel 13 — Overdracht
Franchisenemer kan zijn rechten uit deze overeenkomst niet overdragen zonder voorafgaande schriftelijke toestemming van Franchisegever. Franchisegever onthoudt die toestemming niet op onredelijke gronden.

Artikel 14 — Tussentijdse beëindiging
Ieder der partijen kan deze overeenkomst met onmiddellijke ingang beëindigen indien de andere partij in staat van faillissement wordt verklaard, surseance van betaling aanvraagt of toerekenbaar tekortschiet en die tekortkoming niet binnen veertien dagen na schriftelijke ingebrekestelling herstelt.

Artikel 15 — Gevolgen van beëindiging
Bij het einde van deze overeenkomst staakt Franchisenemer onmiddellijk ieder gebruik van de Formule, retourneert hij het Handboek en alle overige dragers van Vertrouwelijke Informatie, en verwijdert hij alle uitingen van de huisstijl uit en aan het pand.

Artikel 16 — Toepasselijk recht en forumkeuze
Op deze overeenkomst is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de rechtbank Overijssel, locatie Zwolle.

BIJLAGE 1 — RAYON EN VESTIGINGSEISEN

Artikel 1 — Het Rayon
Het Rayon omvat de bebouwde kom van de gemeente Deventer, postcodegebieden 7411 tot en met 7429.

Artikel 2 — Vestigingseisen
De winkel heeft een verkoopvloeroppervlak van ten minste 85 m², voldoet aan de inrichtingseisen uit het Handboek en beschikt over een afbakoven van het in het Handboek voorgeschreven type.

Artikel 3 — Openingstijden
De winkel is geopend van maandag tot en met zaterdag van ten minste 08:00 tot 18:00 uur, met uitzondering van algemeen erkende feestdagen.`,

  // ── 12. Dienstverleningsovereenkomst met TAB-TABEL ──────────────────────────
  //        Tabs (\t) markeren tabelcel-grenzen: Word's search matcht niet over
  //        cellen heen, dus een bruikbaar anker blijft binnen één cel.
  tarieven_tabel: `DIENSTVERLENINGSOVEREENKOMST IMPLEMENTATIE HRM-SUITE

De ondergetekenden:
1. Gemeente Waterlanden, hierna te noemen: "Opdrachtgever";
2. Solvix Consulting B.V., gevestigd te Utrecht, hierna te noemen: "Opdrachtnemer";

komen overeen:

Artikel 1 — De opdracht
Opdrachtnemer implementeert voor Opdrachtgever de HRM-suite "PeopleFlow", inclusief inrichting, datamigratie, koppelingen en training van eindgebruikers.

Artikel 2 — Projectorganisatie
Partijen wijzen ieder een projectleider aan. De stuurgroep komt maandelijks bijeen en besluit over wijzigingen in scope, planning en budget.

Artikel 3 — Vergoeding per fase
De implementatie wordt uitgevoerd in drie fasen. Per fase gelden de volgende vaste vergoeding en uitvoeringsperiode:
Fase\tOmschrijving\tVergoeding\tDoorlooptijd
Fase 1\tInrichting en configuratie\t€ 18.500\t6 weken
Fase 2\tDatamigratie en koppelingen\t€ 24.750\t8 weken
Fase 3\tTraining en nazorg\t€ 9.800\t4 weken
De vergoedingen zijn exclusief btw en worden per fase na schriftelijke acceptatie gefactureerd.

Artikel 4 — Acceptatie
Opdrachtgever toetst elk faseresultaat binnen tien werkdagen aan de acceptatiecriteria. Na afronding van Fase 2 vindt bovendien een integrale keten-test plaats voordat Fase 3 aanvangt.

Artikel 5 — Meerwerk
Werkzaamheden buiten de fase-omschrijvingen gelden als meerwerk en worden vooraf geoffreerd tegen een uurtarief van € 145 exclusief btw.

Artikel 6 — Toepasselijk recht
Op deze overeenkomst is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de rechtbank Midden-Nederland, locatie Utrecht.`,

  // ── 13. Leveringsvoorwaarden met SPECIALE TEKENS ────────────────────────────
  //        §-verwijzingen, gedachtestreepjes (—), beletselteken (…), ½, curly
  //        apostrof (’s-Gravenhage, manco’s) en diacritiek (geïndexeerd).
  gekke_tekens: `LEVERINGS- EN BETALINGSVOORWAARDEN NOORDSTAR HANDEL B.V.

Artikel 1 — Toepasselijkheid
Deze voorwaarden zijn van toepassing op alle offertes en overeenkomsten van Noordstar Handel B.V., hierna: "Noordstar".

Artikel 2 — Kwaliteit
De geleverde zaken voldoen aan de specificaties zoals vastgelegd in § 6.2 van het kwaliteitshandboek van Noordstar. Afwijkingen binnen de in § 6.4 genoemde toleranties gelden niet als gebrek.

Artikel 3 — Prijzen
De prijs bedraagt € 1.234,56 per pallet, af magazijn Zwolle, exclusief btw en exclusief transport.

Artikel 4 — Betaling
Betaling geschiedt binnen dertig dagen na factuurdatum. Bij overschrijding is de afnemer een kredietbeperkingstoeslag van 1½% per maand verschuldigd over het openstaande bedrag.

Artikel 5 — Levertijd
De levertijd — behoudens overmacht — bedraagt veertien werkdagen na orderbevestiging. Overschrijding van de levertijd geeft geen recht op schadevergoeding.

Artikel 6 — Reclames
Zichtbare gebreken meldt de afnemer binnen achtenveertig uur na levering, waaronder begrepen transportschade, manco’s en kleurafwijkingen… Latere meldingen worden niet in behandeling genomen.

Artikel 7 — Forumkeuze
Alle geschillen worden bij uitsluiting voorgelegd aan de rechtbank te ’s-Gravenhage.

Artikel 8 — Indexering
De overeengekomen prijzen worden jaarlijks per 1 januari geïndexeerd volgens de dienstenprijsindex; de coördinatie van de jaarlijkse aanpassing ligt bij Noordstar, die daarbij een reëel kostenniveau hanteert.`,

  // ── 14. Samenwerkingsovereenkomst met KRUISVERWIJZINGEN in alle smaken ──────
  //        Hernummerings-/cascade-tests: verwijzingen naar artikel 5 in vier
  //        schrijfwijzen ("artikel 5", "art. 5", "conform artikel 5 lid 1",
  //        tabel-cel "art. 5 lid 2") + bijlage-verwijzing; lid/sub-verwijzing
  //        naar artikel 4; genummerde lijst met 3× "binnen dertig dagen".
  verwijzingen_mix: `SAMENWERKINGSOVEREENKOMST DATAPLATFORM REGIO-ANALYSE

De ondergetekenden:
1. TechNova Solutions B.V., gevestigd te Eindhoven, hierna: "TechNova";
2. Stichting Regio Analytics, gevestigd te Tilburg, hierna: "de Stichting";

komen overeen:

Artikel 1 — Definities
In deze overeenkomst wordt verstaan onder: "Dataplatform": de gezamenlijk te exploiteren analyse-omgeving; "Datasets": de in Bijlage 1 omschreven gegevensverzamelingen; "Stuurgroep": het in artikel 3 bedoelde overlegorgaan.

Artikel 2 — Doel van de samenwerking
Partijen ontwikkelen en exploiteren gezamenlijk het Dataplatform. De geheimhouding van uitgewisselde informatie is geregeld zoals omschreven in artikel 5; de besluitvorming verloopt conform Art. 8 lid 2 van deze overeenkomst.

Artikel 3 — Stuurgroep
De Stuurgroep bestaat uit twee vertegenwoordigers per partij en vergadert ten minste eenmaal per kwartaal. De Stuurgroep besluit bij unanimiteit.

Artikel 4 — Inbreng van partijen
1. TechNova brengt de technische infrastructuur en ontwikkelcapaciteit in.
2. De verdeling van exploitatiekosten is als volgt: a. TechNova draagt zestig procent; b. de Stichting draagt veertig procent.

Artikel 5 — Geheimhouding
Partijen houden alle in het kader van de samenwerking uitgewisselde informatie strikt vertrouwelijk en gebruiken deze uitsluitend voor het Dataplatform. Deze verplichting blijft vijf jaar na het einde van de samenwerking van kracht.

Artikel 6 — Kosten en facturering
Voor de gezamenlijke kosten geldt het volgende:
1. De begroting wordt jaarlijks vóór 1 november door de Stuurgroep vastgesteld.
2. Licentiekosten van derden worden binnen dertig dagen na factuurdatum voldaan door TechNova.
3. Hostingkosten worden per kwartaal vooraf gefactureerd.
4. Facturen voor gezamenlijke infrastructuur worden binnen dertig dagen na ontvangst voldaan volgens de verdeelsleutel.
5. Personeelskosten blijven voor rekening van de inbrengende partij.
6. Overige gezamenlijke kosten worden binnen dertig dagen na goedkeuring door de Stuurgroep verrekend.

Artikel 7 — Aansprakelijkheid
De aansprakelijkheid van ieder der partijen is beperkt tot directe schade, met toepassing van de verdeelsleutel van artikel 4 lid 2 sub a, tot een maximum van € 200.000 per gebeurtenis.

Artikel 8 — Governance en wijzigingen
1. Wijzigingen van deze overeenkomst behoeven schriftelijke instemming van beide partijen.
2. Geschilpunten worden eerst aan de Stuurgroep voorgelegd; zie ook art. 5 voor de vertrouwelijkheid van die behandeling.

Artikel 9 — Duur
Deze overeenkomst wordt aangegaan voor vier jaar en wordt telkens stilzwijgend met twee jaar verlengd, behoudens opzegging met een termijn van zes maanden.

Artikel 10 — Beëindiging
Bij beëindiging worden de Datasets ontvlochten volgens het exitplan. De verplichtingen conform artikel 5 lid 1 blijven na beëindiging onverkort van kracht.

Artikel 11 — Rapportage
De Stuurgroep ontvangt de volgende rapportages:
Kwartaal\tRapport\tGrondslag
Q1\tVoortgangsrapport ontwikkeling\tart. 5 lid 2
Q2\tFinancieel overzicht\tartikel 6
Q3\tDatakwaliteitsrapport\tBijlage 1
Q4\tJaarevaluatie\tartikel 9

Artikel 12 — Toepasselijk recht
Op deze overeenkomst is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de rechtbank Oost-Brabant.

BIJLAGE 1 — DATASETS EN GEBRUIKSVOORWAARDEN

Artikel 1 — Datasets
De samenwerking omvat de volgende gegevensverzamelingen: regionale mobiliteitsdata, geanonimiseerde demografische data en open geodata.

Artikel 2 — Gebruiksvoorwaarden
Op het gebruik van de Datasets is artikel 5 van de hoofdovereenkomst van overeenkomstige toepassing. Sublicentiëring aan derden is niet toegestaan.`,

  // ── 15. Leeg document — test het opstellen van nieuwe tekst (insert) ────────
  leeg_document: ``,
}

// ── 11. Raamovereenkomst ICT (gegenereerd, > 24.000 tekens) ──────────────────
// Test: lange-document-precisie én truncatie. De client (src/office/word.js
// getContext) knipt de body op 24.000 tekens; artikel 27 ligt dáár voorbij.
// Artikel 22 (kwaliteitsborgingsbudget € 8.450) ligt nog binnen het venster;
// artikel 27 (exitvergoeding € 4.699) is voor het model onzichtbaar.
function buildRaamovereenkomst() {
  const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  const onderwerpen = [
    'Definities en rangorde', 'Voorwerp van de raamovereenkomst', 'Wijze van opdrachtverstrekking',
    'Implementatiediensten', 'Beheer en ondersteuning', 'Servicedesk en responstijden',
    'Personeel en vervanging', 'Onderaanneming', 'Tarieven en indexering',
    'Facturering en betaling', 'Meerwerk en minderwerk', 'Acceptatieprocedure',
    'Documentatie en kennisoverdracht', 'Beveiliging en continuïteit', 'Privacy en gegevensbescherming',
    'Intellectuele eigendomsrechten', 'Garanties', 'Aansprakelijkheid en vrijwaring',
    'Verzekering', 'Overmacht', 'Geheimhouding', 'Kwaliteitsborging en rapportage',
    'Wijzigingsprocedure', 'Duur en verlenging', 'Opzegging', 'Gevolgen van beëindiging',
    'Exit en overdracht van werkzaamheden', 'Toepasselijk recht en geschillen',
  ]
  const head = `RAAMOVEREENKOMST ICT-DIENSTVERLENING

De ondergetekenden:
1. Provincie Flevoland, zetelend te Lelystad, hierna te noemen: "Opdrachtgever";
2. Helix Digital B.V., gevestigd te Almere, hierna te noemen: "Opdrachtnemer";

komen het volgende overeen:
`
  const blokken = onderwerpen.map((onderwerp, i) => {
    const n = i + 1
    const bedrag = fmt(2000 + n * 731)
    const dagen = 5 + ((n * 3) % 40)
    const pct = 1 + (n % 9)
    const zinnen = [
      `Dit artikel regelt ${onderwerp.toLowerCase()} tussen Opdrachtgever en Opdrachtnemer, binnen de kaders van deze raamovereenkomst en de daaronder te sluiten nadere overeenkomsten.`,
      `Voor de toepassing van dit artikel geldt een referentiebedrag van € ${bedrag} per kalenderjaar, dat jaarlijks per 1 januari wordt geïndexeerd volgens de consumentenprijsindex van het CBS.`,
      `Meldingen en verzoeken uit hoofde van dit artikel worden schriftelijk gedaan en binnen ${dagen} werkdagen na ontvangst inhoudelijk beantwoord, bij gebreke waarvan het verzoek geacht wordt te zijn afgewezen.`,
      `Indien de uitvoering aantoonbaar afwijkt van de overeengekomen norm, geldt een correctie van ${pct} procent op de eerstvolgende maandfactuur, onverminderd de overige rechten van Opdrachtgever uit deze raamovereenkomst.`,
      `Partijen evalueren de werking van dit artikel ten minste eenmaal per jaar in het periodieke contractoverleg en leggen verbeterafspraken vast in het verslag van dat overleg.`,
    ]
    if (n === 22) zinnen.push('Opdrachtgever reserveert voor kwaliteitsborging jaarlijks een kwaliteitsborgingsbudget van € 8.450, te besteden in overleg met de stuurgroep.')
    if (n === 27) zinnen.push('Bij beëindiging van de raamovereenkomst voert Opdrachtnemer de exitwerkzaamheden uit tegen een eenmalige exitvergoeding van € 4.699.')
    return `Artikel ${n} — ${onderwerp}\n${zinnen.join(' ')}`
  })
  return `${head}\n${blokken.join('\n\n')}`
}

DOCS.raam_lang = buildRaamovereenkomst()
