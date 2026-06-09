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
}
