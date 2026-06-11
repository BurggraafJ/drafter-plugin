// Drafter eval-cases — 67 realistische juridische instructies.
//
// Per case:
//   doc        : sleutel in DOCS
//   question   : de instructie zoals een jurist die typt
//   selection  : (optioneel) tekst die de jurist had geselecteerd ("herschrijf dit")
//   category   : type test (zie onder)
//   failureMode: welke faalmodus deze case primair test (voor clustering in het rapport)
//   expect:
//     suggestions: 'none' | 'one' | 'some' | 'policy' — hoeveel voorstellen we verwachten
//     targets    : [artikelnummers] die GERAAKT mogen worden (scope-grens).
//                  Bijlage-artikelen als string: 'B1.2' = Bijlage 1, artikel 2.
//     value      : (optioneel) tekst die in minstens één `replace` moet voorkomen
//     replyMust  : (optioneel) minstens één van deze termen moet in de reply staan
//     scopeStrict: (default true) een find buiten `targets` = over-reach (fout)
//     note       : wat we juridisch verwachten
//
// Categorieën: targeted (scope-precisie), topic (zoek juiste clausule), value (waarde-swap),
// add (toevoeging), legal (correctheid), tone (herformulering), question (geen edit),
// guardrail (niet-bestaand doel / truncatie), long (lange-doc-precisie), trap (niet-unieke
// find / typografie / lijst), multi.
//
// Faalmodi: waarde, scope-precisie, clausule-lokalisatie, toevoeging-scope, dwingend-recht,
// juridische-volledigheid, advies-only, herformulering-scope, lang-document, non-unieke-find,
// multi-wijziging, multi-artikel, verwijdering, niet-bestaand-doel, typografie, lijst-staffel,
// kruisverwijzing-definitie, bijlage-scope, multi-alinea-lengte, truncatie, overal-vervangen-scope.

export const CASES = [
  // ── arbeid_bepaalde_tijd ──────────────────────────────────────────────────
  { id: 'arb-01-salaris', doc: 'arbeid_bepaalde_tijd', category: 'value', failureMode: 'waarde',
    question: 'Pas artikel 5 aan: verhoog het brutosalaris naar € 3.100 per maand.',
    expect: { suggestions: 'one', targets: [5], value: '3.100', note: 'Alleen het salarisbedrag in art. 5.' } },

  { id: 'arb-02-proeftijd', doc: 'arbeid_bepaalde_tijd', category: 'legal', failureMode: 'dwingend-recht',
    question: 'Verleng de proeftijd naar twee maanden.',
    expect: { suggestions: 'policy', targets: [3], replyMust: ['proeftijd', 'nietig', 'één maand', 'maand'], note: 'Bij 12-mnd-contract is 2 mnd proeftijd nietig (max 1 mnd). Wijzigen-met-waarschuwing óf onderbouwde weigering; benoem het punt.' } },

  { id: 'arb-03-tussentijds', doc: 'arbeid_bepaalde_tijd', category: 'add', failureMode: 'toevoeging-scope',
    question: 'Voeg in artikel 2 een tussentijdse opzegmogelijkheid toe met een opzegtermijn van één maand.',
    expect: { suggestions: 'some', targets: [2], note: 'Tussentijds opzegbeding binnen art. 2.' } },

  { id: 'arb-04-concurrentie-motivering', doc: 'arbeid_bepaalde_tijd', category: 'legal', failureMode: 'juridische-volledigheid',
    question: 'Het concurrentiebeding in artikel 7 mist een schriftelijke motivering van zwaarwegende bedrijfsbelangen. Vul dit aan zodat het voldoet aan artikel 7:653 BW.',
    expect: { suggestions: 'some', targets: [7], note: 'Motivering toevoegen aan art. 7; niet aan art. 8.' } },

  { id: 'arb-05-concurrentie-duur', doc: 'arbeid_bepaalde_tijd', category: 'targeted', failureMode: 'scope-precisie',
    question: 'Pas artikel 7 aan zodat het concurrentiebeding nog maar zes maanden geldt.',
    selection: 'Het is Werknemer verboden om gedurende twaalf maanden na het einde van het dienstverband binnen een straal van 50 kilometer werkzaam te zijn bij een onderneming die gelijksoortige activiteiten ontplooit als Werkgever.',
    expect: { suggestions: 'one', targets: [7], value: 'zes maanden', note: 'Alleen de termijn; art. 8 (geheimhouding) NIET raken.' } },

  { id: 'arb-06-vraag-geldigheid', doc: 'arbeid_bepaalde_tijd', category: 'question', failureMode: 'advies-only',
    question: 'Is het concurrentiebeding in dit tijdelijke contract rechtsgeldig? Leg uit, ik wil nog niets wijzigen.',
    expect: { suggestions: 'none', targets: [], note: 'Uitleg, geen voorstellen (jurist wil enkel advies).' } },

  { id: 'arb-07-arbeidsduur', doc: 'arbeid_bepaalde_tijd', category: 'value', failureMode: 'waarde',
    question: 'Wijzig in artikel 4 de arbeidsduur van 40 uur naar 36 uur per week.',
    expect: { suggestions: 'one', targets: [4], value: '36 uur', note: 'Alleen de arbeidsduur in art. 4.' } },

  { id: 'arb-08-geheimhouding-streng', doc: 'arbeid_bepaalde_tijd', category: 'tone', failureMode: 'herformulering-scope',
    question: 'Maak de formulering van artikel 8 (geheimhouding) strenger en specifieker.',
    expect: { suggestions: 'some', targets: [8], note: 'Herformulering binnen art. 8.' } },

  // ── huur_woonruimte ───────────────────────────────────────────────────────
  { id: 'huur-09-huurprijs', doc: 'huur_woonruimte', category: 'value', failureMode: 'waarde',
    question: 'Verhoog de huurprijs in artikel 3 van € 1.200 naar € 1.350 per maand.',
    expect: { suggestions: 'one', targets: [3], value: '1.350', note: 'Alleen huurprijs art. 3; waarborgsom (art. 6) NIET meeveranderen.' } },

  { id: 'huur-10-opzegtermijn', doc: 'huur_woonruimte', category: 'legal', failureMode: 'dwingend-recht',
    question: 'Pas artikel 8 aan: verleng de opzegtermijn voor Huurder naar twee maanden.',
    expect: { suggestions: 'policy', targets: [8], replyMust: ['opzegtermijn', 'woonruimte', 'huurder', 'maand'], note: 'Bij woonruimte is de opzegtermijn van de huurder dwingend (≈1 betaalperiode). Wijzigen-met-waarschuwing óf weigering; binnen art. 8.' } },

  { id: 'huur-11-waarborg', doc: 'huur_woonruimte', category: 'legal', failureMode: 'dwingend-recht',
    question: 'Wijzig de waarborgsom in artikel 6 naar € 3.600.',
    expect: { suggestions: 'policy', targets: [6], replyMust: ['waarborgsom', 'twee maanden', 'goed verhuurderschap', '7:261b', 'maximaal'], note: '€3.600 = 3 mnd huur, in strijd met max. 2 mnd (art. 7:261b BW / Wgv). Weigeren-met-uitleg óf wijzigen-met-waarschuwing.' } },

  { id: 'huur-12-onderhoud-add', doc: 'huur_woonruimte', category: 'add', failureMode: 'toevoeging-scope',
    question: 'Voeg aan artikel 7 toe dat Huurder zonder schriftelijke toestemming geen onderhoud aan derden mag uitbesteden.',
    expect: { suggestions: 'some', targets: [7], note: 'Toevoeging binnen art. 7.' } },

  { id: 'huur-13-indexering', doc: 'huur_woonruimte', category: 'topic', failureMode: 'clausule-lokalisatie',
    question: 'Pas de indexering aan zodat deze voor het eerst op 1 juli 2028 plaatsvindt in plaats van 2027.',
    expect: { suggestions: 'one', targets: [5], value: '2028', note: 'Art. 5 indexering; jaartal.' } },

  { id: 'huur-14-wgv', doc: 'huur_woonruimte', category: 'legal', failureMode: 'dwingend-recht',
    question: 'Controleer of de waarborgsom in artikel 6 voldoet aan de Wet goed verhuurderschap (max. twee maanden huur) en pas zo nodig aan.',
    expect: { suggestions: 'policy', targets: [6], replyMust: ['voldoet', 'twee maanden', 'waarborgsom'], note: 'Waarborgsom = 2x €1.200 = voldoet al; juiste antwoord = bevestigen, geen wijziging nodig.' } },

  // ── nda ───────────────────────────────────────────────────────────────────
  { id: 'nda-15-looptijd', doc: 'nda', category: 'value', failureMode: 'waarde',
    question: 'Verkort de looptijd in artikel 4 van drie jaar naar twee jaar.',
    expect: { suggestions: 'one', targets: [4], value: 'twee jaar', note: 'Alleen duur art. 4.' } },

  { id: 'nda-16-boete', doc: 'nda', category: 'value', failureMode: 'waarde',
    question: 'Verhoog de boete in artikel 6 naar € 25.000 per overtreding.',
    expect: { suggestions: 'one', targets: [6], value: '25.000', note: 'Bedrag in art. 6.' } },

  { id: 'nda-17-forum', doc: 'nda', category: 'targeted', failureMode: 'scope-precisie',
    question: 'Wijzig de forumkeuze in artikel 7 van Amsterdam naar Rotterdam.',
    expect: { suggestions: 'one', targets: [7], value: 'Rotterdam', note: 'Alleen forum in art. 7.' } },

  { id: 'nda-18-uitzondering', doc: 'nda', category: 'add', failureMode: 'toevoeging-scope',
    question: 'Voeg aan artikel 2 een uitzondering toe voor informatie die al openbaar bekend is buiten toedoen van de Ontvangende Partij.',
    expect: { suggestions: 'some', targets: [2], note: 'Carve-out binnen art. 2.' } },

  { id: 'nda-19-vraag-boete', doc: 'nda', category: 'question', failureMode: 'advies-only',
    question: 'Welke risico’s zitten er voor de Ontvangende Partij in dit boetebeding? Geef alleen advies.',
    expect: { suggestions: 'none', targets: [], scopeStrict: false, note: 'Advies; geen of optioneel voorstel.' } },

  // ── algemene_voorwaarden (lang) ───────────────────────────────────────────
  { id: 'av-20-opzeg', doc: 'algemene_voorwaarden', category: 'long', failureMode: 'lang-document',
    question: 'Pas artikel 14 aan: verleng de opzegtermijn van twee maanden naar drie maanden.',
    expect: { suggestions: 'one', targets: [14], value: 'drie maanden', note: 'In lang doc: alleen art. 14.' } },

  { id: 'av-21-betaaltermijn-trap', doc: 'algemene_voorwaarden', category: 'trap', failureMode: 'non-unieke-find',
    question: 'Wijzig in artikel 6 de betalingstermijn van dertig dagen naar veertien dagen.',
    expect: { suggestions: 'one', targets: [6], value: 'veertien dagen', note: '"dertig dagen" staat ook in art. 3/7 — find moet uniek art. 6 raken.' } },

  { id: 'av-22-aansprakelijkheid', doc: 'algemene_voorwaarden', category: 'tone', failureMode: 'herformulering-scope',
    question: 'Maak de aansprakelijkheidsbeperking in artikel 12 strenger in ons voordeel als Opdrachtnemer.',
    expect: { suggestions: 'some', targets: [12], note: 'Herformulering binnen art. 12.' } },

  { id: 'av-23-ie-gebruiksrecht', doc: 'algemene_voorwaarden', category: 'add', failureMode: 'toevoeging-scope',
    question: 'Voeg aan artikel 11 een gebruiksrecht voor Opdrachtgever toe dat ingaat na volledige betaling.',
    expect: { suggestions: 'some', targets: [11], note: 'Licentie/gebruiksrecht binnen art. 11.' } },

  { id: 'av-24-forum', doc: 'algemene_voorwaarden', category: 'long', failureMode: 'lang-document',
    question: 'Pas alleen artikel 16 aan: wijzig de bevoegde rechter van Zwolle naar Amsterdam.',
    expect: { suggestions: 'one', targets: [16], value: 'Amsterdam', note: 'Alleen art. 16.' } },

  { id: 'av-25-incasso-multi', doc: 'algemene_voorwaarden', category: 'multi', failureMode: 'multi-wijziging',
    question: 'Pas artikel 7 aan: verwijs expliciet naar de wettelijke handelsrente én neem een minimum van € 40 aan incassokosten op.',
    expect: { suggestions: 'some', targets: [7], note: 'Beide aanpassingen binnen art. 7.' } },

  // ── vaststellingsovereenkomst ─────────────────────────────────────────────
  { id: 'vso-26-vergoeding', doc: 'vaststellingsovereenkomst', category: 'value', failureMode: 'waarde',
    question: 'Verhoog de beëindigingsvergoeding in artikel 3 naar € 25.000 bruto.',
    expect: { suggestions: 'one', targets: [3], value: '25.000', note: 'Bedrag in art. 3.' } },

  { id: 'vso-27-relatiebeding', doc: 'vaststellingsovereenkomst', category: 'targeted', failureMode: 'scope-precisie',
    question: 'Pas artikel 5 aan: laat Werkgever ook afstand doen van het relatiebeding, net als van het concurrentiebeding.',
    expect: { suggestions: 'one', targets: [5], note: 'Alleen art. 5.' } },

  { id: 'vso-28-getuigschrift-add', doc: 'vaststellingsovereenkomst', category: 'add', failureMode: 'toevoeging-scope',
    question: 'Voeg aan artikel 6 toe dat het getuigschrift binnen veertien dagen na de einddatum wordt verstrekt.',
    expect: { suggestions: 'some', targets: [6], value: 'veertien dagen', note: 'Termijn binnen art. 6.' } },

  { id: 'vso-29-guardrail', doc: 'vaststellingsovereenkomst', category: 'guardrail', failureMode: 'niet-bestaand-doel',
    question: 'Pas artikel 12 aan zodat de opzegtermijn drie maanden wordt.',
    expect: { suggestions: 'none', targets: [], scopeStrict: true, note: 'Er is GEEN artikel 12 (doc heeft art. 1-8). Niet verzinnen; idealiter terugkoppelen.' } },

  // ── opdracht_zzp ──────────────────────────────────────────────────────────
  { id: 'zzp-30-tarief', doc: 'opdracht_zzp', category: 'value', failureMode: 'waarde',
    question: 'Verhoog het uurtarief in artikel 3 naar € 110 exclusief btw.',
    expect: { suggestions: 'one', targets: [3], value: '110', note: 'Alleen tarief art. 3; bedragen in art. 7 NIET raken.' } },

  // ── HARD / adversarieel (breedte + diepte) ────────────────────────────────
  { id: 'h31-by-quote', doc: 'opdracht_zzp', category: 'topic', failureMode: 'clausule-lokalisatie',
    question: 'Wijzig de aansprakelijkheidsbepaling: de zin die begint met "De aansprakelijkheid van Opdrachtnemer is per gebeurtenis beperkt" moet uitkomen op een maximum van € 50.000.',
    expect: { suggestions: 'one', targets: [7], value: '50.000', note: 'Lokaliseren op inhoud (geen artikelnummer genoemd) → art. 7.' } },

  { id: 'h32-multi-article', doc: 'opdracht_zzp', category: 'multi', failureMode: 'multi-artikel',
    question: 'Pas het uurtarief in artikel 3 aan naar € 105 én verkort in artikel 4 de betaaltermijn naar zeven dagen.',
    expect: { suggestions: 'some', targets: [3, 4], value: '105', note: 'Twee artikelen tegelijk; beide moeten geraakt, niets anders.' } },

  { id: 'h33-broad-multi-instance', doc: 'algemene_voorwaarden', category: 'trap', failureMode: 'non-unieke-find',
    question: 'Wijzig overal in de algemene voorwaarden "dertig dagen" naar "veertien dagen".',
    expect: { suggestions: 'some', targets: [3, 6], value: 'veertien dagen', note: '"dertig dagen" staat in art. 3 én art. 6; beide unieke finds, niets anders.' } },

  { id: 'h34-deletion', doc: 'arbeid_bepaalde_tijd', category: 'targeted', failureMode: 'verwijdering',
    question: 'Verwijder het concurrentiebeding in artikel 7 volledig.',
    expect: { suggestions: 'some', targets: [7], scopeStrict: true, note: 'Verwijdering (replace leeg/ingekort); alleen art. 7.' } },

  { id: 'h35-ambiguous-ref', doc: 'algemene_voorwaarden', category: 'topic', failureMode: 'clausule-lokalisatie',
    question: 'Maak de opzegtermijn in de opzeg-/ontbindingsbepaling drie maanden.',
    expect: { suggestions: 'one', targets: [14], value: 'drie maanden', note: 'Geen artikelnummer → moet art. 14 vinden (niet art. 9 termijnen).' } },

  // ══ NIEUW — aandeelhoudersovereenkomst (vennootschapsrecht) ═══════════════
  { id: 'ahv-36-dragalong', doc: 'aandeelhouders', category: 'add', failureMode: 'dwingend-recht',
    question: 'Voeg na het meeverkooprecht in artikel 6 een drag-along toe: als Bloemendaal haar gehele belang verkoopt, is Van Galen verplicht haar Aandelen onder dezelfde voorwaarden mee te verkopen, zonder waarderingsmechanisme.',
    expect: { suggestions: 'policy', targets: [6], replyMust: ['waardering', 'minderheid', 'redelijk', 'billijkheid', 'prijsbepaling', 'bescherming'], note: 'Drag-along zonder fair valuation: toevoegen mág, maar met waarschuwing (redelijkheid/billijkheid 2:8 BW, minderheidsbescherming, waarderingsmechanisme adviseren).' } },

  { id: 'ahv-37-aanbiedingstermijn', doc: 'aandeelhouders', category: 'value', failureMode: 'waarde',
    question: 'Verleng in artikel 4 de reactietermijn van dertig dagen naar zestig dagen.',
    expect: { suggestions: 'one', targets: [4], value: 'zestig dagen', note: 'Alleen de reactietermijn in art. 4.' } },

  { id: 'ahv-38-noncompete-vijfjaar', doc: 'aandeelhouders', category: 'legal', failureMode: 'dwingend-recht',
    question: 'Verleng de non-concurrentie in artikel 8 naar vijf jaar na overdracht van de aandelen.',
    expect: { suggestions: 'policy', targets: [8], replyMust: ['mededinging', 'kartel', 'redelijk', 'nietig', 'twee jaar', 'drie jaar'], note: 'Non-compete aandeelhouder valt niet onder 7:653 maar onder het mededingingsrecht (nevenrestricties); 5 jaar is doorgaans te lang. Wijzigen-met-waarschuwing of weigeren.' } },

  { id: 'ahv-39-blokkering-statuten', doc: 'aandeelhouders', category: 'legal', failureMode: 'dwingend-recht',
    question: 'Schrap in artikel 5 het vereiste van goedkeuring door de algemene vergadering voor overdracht van aandelen.',
    expect: { suggestions: 'policy', targets: [5], replyMust: ['statuten', 'blokkering', '2:195', 'notari'], note: 'Contractueel schrappen werkt niet zolang de statutaire blokkeringsregeling bestaat (2:195 BW); statutenwijziging vereist. Waarschuwing of weigering.' } },

  { id: 'ahv-40-vraag-tagalong', doc: 'aandeelhouders', category: 'question', failureMode: 'advies-only',
    question: 'Wat is het verschil tussen het meeverkooprecht in artikel 6 en een drag-along-bepaling? Alleen uitleg, niets wijzigen.',
    expect: { suggestions: 'none', targets: [], replyMust: ['drag', 'meeverkoop'], note: 'Uitleg tag-along vs drag-along; geen wijzigingen.' } },

  // ══ NIEUW — verwerkersovereenkomst (AVG/GDPR) ═════════════════════════════
  { id: 'vwo-41-datalek-24u', doc: 'verwerkers', category: 'value', failureMode: 'waarde',
    question: 'Verkort in artikel 8 de meldtermijn voor datalekken van 48 uur naar 24 uur.',
    expect: { suggestions: 'one', targets: [8], value: '24 uur', note: 'Alleen de termijn in art. 8.' } },

  { id: 'vwo-42-audit-schrappen', doc: 'verwerkers', category: 'legal', failureMode: 'dwingend-recht',
    question: 'Schrap het auditrecht in artikel 10 volledig uit de overeenkomst.',
    expect: { suggestions: 'policy', targets: [10], replyMust: ['28', 'avg'], note: 'Art. 28 lid 3 sub h AVG verplicht audits mogelijk te maken; schrappen maakt de overeenkomst non-compliant. Weigeren of wijzigen-met-zware-waarschuwing.' } },

  { id: 'vwo-43-subverwerker', doc: 'verwerkers', category: 'legal', failureMode: 'dwingend-recht',
    question: 'Pas artikel 6 aan: CloudAdmin mag voortaan sub-verwerkers inschakelen zonder toestemming van Praktijk De Linde.',
    expect: { suggestions: 'policy', targets: [6], replyMust: ['toestemming', '28', 'algemene', 'bezwaar'], note: 'Art. 28 lid 2 AVG vereist minimaal algemene schriftelijke toestemming + informatieplicht + bezwaarrecht. Geheel zonder toestemming = non-compliant.' } },

  { id: 'vwo-44-doorgifte-vs', doc: 'verwerkers', category: 'legal', failureMode: 'dwingend-recht',
    question: 'Wijzig artikel 7 zodat doorgifte van de persoonsgegevens naar de Verenigde Staten zonder verdere voorwaarden is toegestaan.',
    expect: { suggestions: 'policy', targets: [7], replyMust: ['waarborg', 'scc', 'modelcontract', 'adequaat', 'hoofdstuk v', 'data privacy framework'], note: 'Doorgifte buiten EER vereist passende waarborgen (hfdst V AVG: adequaatheidsbesluit/DPF, SCC’s). Zonder voorwaarden = onrechtmatig.' } },

  { id: 'vwo-45-2fa', doc: 'verwerkers', category: 'add', failureMode: 'toevoeging-scope',
    question: 'Voeg aan artikel 5 toe dat toegang tot systemen met persoonsgegevens uitsluitend met tweefactorauthenticatie plaatsvindt.',
    expect: { suggestions: 'some', targets: [5], value: 'authenticatie', note: 'Toevoeging binnen art. 5 (beveiliging).' } },

  // ══ NIEUW — licentie/SaaS-voorwaarden (IE & tech) ═════════════════════════
  { id: 'saas-46-staffel', doc: 'saas_licentie', category: 'trap', failureMode: 'lijst-staffel',
    question: 'Verhoog in artikel 6 het servicecredit voor een beschikbaarheid lager dan 99,0% maar ten minste 97,0% naar 15% van de maandvergoeding.',
    expect: { suggestions: 'one', targets: [6], value: '15%', note: 'Alleen lid b van de staffel; "van de maandvergoeding" komt 3x voor — anker moet uniek lid b raken.' } },

  { id: 'saas-47-verlenging', doc: 'saas_licentie', category: 'trap', failureMode: 'non-unieke-find',
    question: 'Wijzig in artikel 4 de stilzwijgende verlengingsperiode van twaalf naar vierentwintig maanden.',
    expect: { suggestions: 'one', targets: [4], value: 'vierentwintig', note: '"twaalf maanden" staat 2x in art. 4 (initiële periode + verlenging); alleen de verlenging wijzigen.' } },

  { id: 'saas-48-exclusief', doc: 'saas_licentie', category: 'targeted', failureMode: 'scope-precisie',
    question: 'Maak de licentie in artikel 2 exclusief voor Klant binnen Nederland.',
    expect: { suggestions: 'one', targets: [2], value: 'exclusief', note: 'Alleen art. 2; van niet-exclusief naar exclusief binnen Nederland.' } },

  { id: 'saas-49-cap', doc: 'saas_licentie', category: 'value', failureMode: 'waarde',
    question: 'Verlaag het aansprakelijkheidsmaximum in artikel 11 naar € 25.000.',
    expect: { suggestions: 'one', targets: [11], value: '25.000', note: 'Alleen het maximumbedrag in art. 11.' } },

  { id: 'saas-50-escrow-vraag', doc: 'saas_licentie', category: 'question', failureMode: 'advies-only',
    question: 'Welke risico’s loopt Klant doordat er geen broncode-escrow is geregeld? Alleen advies, niets wijzigen.',
    expect: { suggestions: 'none', targets: [], replyMust: ['escrow', 'broncode', 'continuïteit', 'faillissement'], note: 'Adviesvraag: continuïteitsrisico bij faillissement/discontinuïteit leverancier; geen wijzigingen.' } },

  // ══ NIEUW — franchiseovereenkomst (adversarieel: typografie, bijlage, refs) ═
  { id: 'fr-51-typografie-quotes', doc: 'franchise', category: 'trap', failureMode: 'typografie',
    question: "Wijzig in artikel 7 de naam van de opleiding van 'Startklaar Plus' naar 'Startklaar Premium'.",
    expect: { suggestions: 'one', targets: [7], value: 'Startklaar Premium', note: 'Document gebruikt typografische aanhalingstekens (“Startklaar Plus”); find moet de LETTERLIJKE tekst bevatten, anders plaatst Word hem niet.' } },

  { id: 'fr-52-typografie-nbsp', doc: 'franchise', category: 'trap', failureMode: 'typografie',
    question: 'Verhoog in artikel 11 de consumentenadviesprijs van het standaardbrood naar € 4,25.',
    expect: { suggestions: 'one', targets: [11], value: '4,25', note: 'In het document staat een non-breaking space in "€ 3,95"; find moet het letterlijke teken bevatten.' } },

  { id: 'fr-53-dertig-dagen', doc: 'franchise', category: 'trap', failureMode: 'non-unieke-find',
    question: 'Verleng de betalingstermijn voor de doorlopende franchisevergoeding naar vijfenveertig dagen.',
    expect: { suggestions: 'one', targets: [4], value: 'vijfenveertig', note: '"dertig dagen" staat in art. 4, 5 én 10; alleen de termijn van de franchisevergoeding (art. 4) wijzigen, met uniek anker.' } },

  { id: 'fr-54-definitie-crossref', doc: 'franchise', category: 'multi', failureMode: 'kruisverwijzing-definitie',
    question: 'Breid de definitie van Vertrouwelijke Informatie in artikel 1 uit met klantgegevens en leverancierscondities, en laat de geheimhoudingsbepaling in artikel 8.3 expliciet verwijzen naar de definitie in artikel 1.',
    expect: { suggestions: 'some', targets: [1, 8], value: 'klantgegevens', note: 'Definitie (art. 1) én verwijzing (art. 8.3) bijwerken; andere plekken met "Vertrouwelijke Informatie" (art. 6, 15) ongemoeid laten.' } },

  { id: 'fr-55-bijlage-artikel', doc: 'franchise', category: 'targeted', failureMode: 'bijlage-scope',
    question: 'Pas in Bijlage 1 artikel 2 aan: verlaag het minimale verkoopvloeroppervlak naar 70 m².',
    expect: { suggestions: 'one', targets: ['B1.2'], value: '70', note: 'Alleen artikel 2 VAN BIJLAGE 1 (vestigingseisen), niet artikel 2 van de hoofdovereenkomst.' } },

  { id: 'fr-56-hoofd-vs-bijlage', doc: 'franchise', category: 'trap', failureMode: 'bijlage-scope',
    question: 'Pas artikel 1 van de overeenkomst aan: voeg aan de definitie van het Handboek toe dat daaronder ook digitale versies en updates vallen.',
    expect: { suggestions: 'one', targets: [1], value: 'digitale', note: 'Bijlage 1 heeft een EIGEN artikel 1 (Rayon); de wijziging moet in artikel 1 van de hoofdovereenkomst (definities).' } },

  { id: 'fr-57-herschrijf-lang', doc: 'franchise', category: 'tone', failureMode: 'multi-alinea-lengte',
    question: 'Herschrijf artikel 8 volledig in helder, modern en genderneutraal Nederlands, zonder de juridische strekking te wijzigen.',
    expect: { suggestions: 'some', targets: [8], note: 'Art. 8 bestaat uit 3 alinea’s (8.1–8.3, deels > 255 tekens); goede aanpak = meerdere kleine, elk-binnen-één-alinea replaces. Eén grote find faalt in Word.' } },

  { id: 'fr-58-bijlage3-guardrail', doc: 'franchise', category: 'guardrail', failureMode: 'niet-bestaand-doel',
    question: 'Pas Bijlage 3 aan: verruim de openingstijden naar 07:00 tot 19:00 uur.',
    expect: { suggestions: 'none', targets: [], replyMust: ['bijlage'], note: 'Er is geen Bijlage 3 (alleen Bijlage 1; openingstijden staan in Bijlage 1 art. 3). Niet gokken; terugkoppelen.' } },

  // ══ NIEUW — raamovereenkomst (lang document, > 24k tekens) ════════════════
  { id: 'raam-59-diep-in-doc', doc: 'raam_lang', category: 'long', failureMode: 'lang-document',
    question: 'Verhoog in artikel 22 het kwaliteitsborgingsbudget van € 8.450 naar € 9.500.',
    expect: { suggestions: 'one', targets: [22], value: '9.500', note: 'Diep in een lang document (positie ~21k van 28k); anker moet uniek zijn te midden van 28 gelijkvormige artikelen.' } },

  { id: 'raam-60-truncatie', doc: 'raam_lang', category: 'guardrail', failureMode: 'truncatie',
    question: 'Verhoog in artikel 27 de exitvergoeding naar € 6.000.',
    expect: { suggestions: 'none', targets: [], replyMust: ['niet', 'zichtbaar', 'afgekapt', 'ontbreekt', 'aangeleverd'], note: 'Artikel 27 ligt voorbij de 24.000-tekens-cap van de client; het model ziet het niet. Verwacht: GEEN gefabriceerde wijziging, wél uitleg dat het artikel niet in de aangeleverde tekst staat.' } },

  // ══ NIEUW — extra rechtsgebied-cases op bestaande documenten ══════════════
  { id: 'arb-61-ketenregeling', doc: 'arbeid_bepaalde_tijd', category: 'question', failureMode: 'advies-only',
    question: 'Na dit contract van twaalf maanden wil ik de werknemer nog twee tijdelijke contracten van elk een jaar aanbieden. Ontstaat er dan een arbeidsovereenkomst voor onbepaalde tijd? Leg alleen uit.',
    expect: { suggestions: 'none', targets: [], replyMust: ['668a', 'keten', '36', 'drie'], note: 'Ketenregeling 7:668a BW: max 3 contracten / 36 maanden. 3x12 = precies op de grens; 4e contract of > 36 mnd = vast. Alleen uitleg.' } },

  { id: 'huur-62-verhoging-8pct', doc: 'huur_woonruimte', category: 'legal', failureMode: 'dwingend-recht',
    question: 'Verhoog de huurprijs in artikel 3 met 8% per 1 juli 2027.',
    expect: { suggestions: 'policy', targets: [3], replyMust: ['maxim', 'wettelijk', 'toegesta'], note: 'Jaarlijkse huurverhoging woonruimte is wettelijk gemaximeerd (Wet maximering huurprijsverhogingen); 8% ligt daar ruim boven. Wijzigen-met-waarschuwing of weigeren.' } },

  { id: 'huur-63-boete-te-laat', doc: 'huur_woonruimte', category: 'legal', failureMode: 'dwingend-recht',
    question: 'Voeg een boetebepaling toe: bij te late betaling van de huur is Huurder een boete van € 250 per dag verschuldigd, zonder maximum.',
    expect: { suggestions: 'policy', targets: [], scopeStrict: false, replyMust: ['onredelijk', 'oneerlijk', 'matig', 'consument', 'vernietig', 'maximum'], note: 'Ongelimiteerd boetebeding jegens huurder-consument: onredelijk bezwarend / oneerlijk beding (6:233 BW, Richtlijn 93/13); rechter vernietigt of matigt. Waarschuwing vereist.' } },

  { id: 'av-64-overal-behalve', doc: 'algemene_voorwaarden', category: 'multi', failureMode: 'overal-vervangen-scope',
    question: "Vervang in deze algemene voorwaarden overal 'Opdrachtnemer' door 'Leverancier', behalve in artikel 1 (Definities) — dat artikel blijft ongewijzigd.",
    expect: { suggestions: 'some', targets: [2, 3, 4, 8, 10, 11, 12, 13], value: 'Leverancier', note: '"Opdrachtnemer" komt in 9 artikelen voor; alles vervangen BEHALVE art. 1. Test precision (art. 1 ongemoeid) én recall (alle andere voorkomens).' } },

  { id: 'zzp-65-auteursrecht', doc: 'opdracht_zzp', category: 'legal', failureMode: 'juridische-volledigheid',
    question: 'Pas artikel 8 zo aan dat alle auteursrechten op de in het kader van de opdracht ontwikkelde software bij voorbaat aan Opdrachtgever worden overgedragen.',
    expect: { suggestions: 'some', targets: [8], replyMust: ['morele rechten', 'persoonlijkheids', 'akte', 'afstand'], note: 'Overdracht auteursrecht vereist een daartoe bestemde akte; morele rechten (25 Aw) zijn niet overdraagbaar — afstandsverklaring adviseren. Reply moet die nuance benoemen.' } },

  { id: 'zzp-66-schijnzelfstandig', doc: 'opdracht_zzp', category: 'legal', failureMode: 'dwingend-recht',
    question: 'Voeg aan artikel 5 toe dat Opdrachtnemer alle instructies van Opdrachtgever opvolgt en dagelijks van 9:00 tot 17:00 uur op kantoor van Opdrachtgever aanwezig is.',
    expect: { suggestions: 'policy', targets: [5], replyMust: ['gezag', 'arbeidsovereenkomst', 'schijnzelfstandig', 'herkwalific', '7:610', 'dba'], note: 'Instructieplicht + vaste aanwezigheid wijst op gezagsverhouding → risico herkwalificatie als arbeidsovereenkomst (7:610 BW, handhaving Wet DBA). Waarschuwing vereist.' } },

  { id: 'vso-67-bedenktermijn', doc: 'vaststellingsovereenkomst', category: 'legal', failureMode: 'dwingend-recht',
    question: 'Voeg een artikel toe waarin Werknemer afstand doet van zijn wettelijke bedenktermijn.',
    expect: { suggestions: 'policy', targets: [], scopeStrict: false, replyMust: ['670b', 'dwingend', 'twee weken', 'veertien dagen', 'niet rechtsgeldig', 'nietig', 'kan geen afstand'], note: 'Bedenkrecht 7:670b BW is dwingend; afstand vooraf is niet rechtsgeldig. Idealiter weigeren met uitleg; wijzigen mét zware waarschuwing is acceptabel.' } },

  // ══ V3 — TABELLEN (tab = celgrens; anker moet binnen één cel blijven) ═════
  { id: 'tab-68-celwaarde', doc: 'tarieven_tabel', category: 'trap', failureMode: 'tabel-cel',
    question: 'Verhoog in de tabel van artikel 3 de vergoeding voor Fase 2 naar € 27.500.',
    expect: { suggestions: 'one', targets: [3], value: '27.500', note: 'Anker moet binnen de cel "€ 24.750" blijven (geen tab in find); de juiste rij raken.' } },

  { id: 'tab-69-twee-cellen', doc: 'tarieven_tabel', category: 'trap', failureMode: 'tabel-cel',
    question: 'Verkort in de tabel van artikel 3 de doorlooptijd van Fase 1 naar 5 weken en die van Fase 3 naar 3 weken.',
    expect: { suggestions: 'some', targets: [3], value: '5 weken', note: 'Twee losse cel-wijzigingen ("6 weken"→"5 weken", "4 weken"→"3 weken"); elk anker binnen zijn eigen cel.' } },

  { id: 'tab-71-capability-kolom', doc: 'tarieven_tabel', category: 'guardrail', failureMode: 'capability-grens',
    question: 'Voeg aan de tabel in artikel 3 een vierde kolom "Korting" toe met 5% per fase.',
    expect: { suggestions: 'none', targets: [], replyMust: ['kolom', 'handmatig', 'structuur', 'mogelijk'], note: 'Tabelstructuur wijzigen (kolom toevoegen) kan niet via tekst-vervangingen; eerlijk uitleggen, niet doen alsof.' } },

  { id: 'tab-72-fase-overal', doc: 'tarieven_tabel', category: 'trap', failureMode: 'tabel-cel',
    question: 'Vervang overal "Fase 2" door "Fase 2A".',
    expect: { suggestions: 'policy', targets: [3, 4], value: 'Fase 2A', replyMust: ['cel', 'tabel', 'handmatig', 'niet uniek', 'niet automatisch'], note: 'Het voorkomen in de lopende tekst (art. 4) is uniek te verankeren; de korte tabelcel "Fase 2" niet (uniek maken zou de celgrens kruisen). Goed gedrag: art. 4 wijzigen + melden dat de tabelcel handmatig moet.' } },

  // ══ V3 — SPECIALE TEKENS ═══════════════════════════════════════════════════
  { id: 'tek-73-paragraafteken', doc: 'gekke_tekens', category: 'trap', failureMode: 'speciale-tekens',
    question: 'Wijzig in artikel 2 de verwijzing naar § 6.2 in een verwijzing naar § 7.1.',
    expect: { suggestions: 'one', targets: [2], value: '7.1', findMust: '§', note: 'Het §-teken letterlijk kopiëren; § 6.4 in dezelfde alinea ongemoeid laten.' } },

  { id: 'tek-74-gedachtestreep', doc: 'gekke_tekens', category: 'trap', failureMode: 'speciale-tekens',
    question: "Herschrijf in artikel 5 het zinsdeel tussen de gedachtestreepjes naar 'behoudens overmacht en transportbelemmeringen'.",
    expect: { suggestions: 'one', targets: [5], value: 'transportbelemmeringen', note: 'Binnen óf inclusief de em-dashes (—) ankeren is allebei goed; neemt het model de dashes mee, dan moeten ze letterlijk gekopieerd zijn (typografie-check vangt dat).' } },

  { id: 'tek-75-half-procent', doc: 'gekke_tekens', category: 'trap', failureMode: 'speciale-tekens',
    question: 'Verhoog in artikel 4 de kredietbeperkingstoeslag van 1½% naar 2%.',
    expect: { suggestions: 'one', targets: [4], value: '2%', findMust: '1½', note: 'Het ½-teken (U+00BD) letterlijk kopiëren — niet "1 1/2" of "1,5".' } },

  { id: 'tek-76-trema', doc: 'gekke_tekens', category: 'value', failureMode: 'speciale-tekens',
    question: "Vervang in artikel 8 'geïndexeerd volgens de dienstenprijsindex' door 'aangepast aan de dienstenprijsindex van het CBS'.",
    expect: { suggestions: 'one', targets: [8], value: 'CBS', findMust: 'geïndexeerd', note: 'Diacritiek (ï) letterlijk kopiëren.' } },

  { id: 'tek-77-curly-apostrof', doc: 'gekke_tekens', category: 'trap', failureMode: 'typografie',
    question: "Wijzig de forumkeuze in artikel 7 van 's-Gravenhage naar Rotterdam.",
    expect: { suggestions: 'one', targets: [7], value: 'Rotterdam', note: 'Document gebruikt een typografische apostrof (’s-Gravenhage); de instructie een rechte. Find moet het letterlijke teken bevatten.' } },

  { id: 'tek-78-bedrag-decimalen', doc: 'gekke_tekens', category: 'value', failureMode: 'speciale-tekens',
    question: 'Verhoog de palletprijs in artikel 3 van € 1.234,56 naar € 1.299,00.',
    expect: { suggestions: 'one', targets: [3], value: '1.299,00', note: 'NL-notatie met punt én komma exact overnemen.' } },

  { id: 'tek-79-beletselteken', doc: 'gekke_tekens', category: 'trap', failureMode: 'speciale-tekens',
    question: "Vervang in artikel 6 'en kleurafwijkingen…' door 'en kleurafwijkingen, alsmede vergelijkbare gebreken.'",
    expect: { suggestions: 'one', targets: [6], value: 'vergelijkbare gebreken', findMust: '…', note: 'Het beletselteken (…, U+2026) is één teken — letterlijk kopiëren, niet drie punten.' } },

  // ══ V3 — POSITIONEEL / ÉÉN-WOORD-ANKERS ═══════════════════════════════════
  { id: 'pos-80-eerste-voorkomen', doc: 'algemene_voorwaarden', category: 'trap', failureMode: 'positioneel-voorkomen',
    question: "Vervang in artikel 8 alleen de EERSTE keer dat 'Opdrachtnemer' voorkomt door 'Veldkamp Software'; de tweede keer laten staan.",
    expect: { suggestions: 'one', targets: [8], value: 'Veldkamp Software', findMust: 'voert', findMustNot: 'inspanningsverbintenissen', note: 'Art. 8 bevat "Opdrachtnemer" 2x; het anker moet het eerste voorkomen ("Opdrachtnemer voert…") pakken, niet het tweede.' } },

  { id: 'pos-81-enkel-woord', doc: 'verwerkers', category: 'trap', failureMode: 'enkel-woord-anker',
    question: "Vervang in artikel 4 'Verwerker' door 'CloudAdmin'.",
    expect: { suggestions: 'one', targets: [4], value: 'CloudAdmin', findMust: 'waarborgt', note: '"Verwerker" komt in vrijwel elk artikel voor (en als substring in sub-verwerker); het anker moet context uit art. 4 meenemen.' } },

  { id: 'pos-82-template-woord', doc: 'raam_lang', category: 'trap', failureMode: 'enkel-woord-anker',
    question: "Vervang in artikel 9 het woord 'maandfactuur' door 'maandafrekening'.",
    expect: { suggestions: 'one', targets: [9], value: 'maandafrekening', note: 'Alle 28 artikelen bevatten dezelfde template-zin met "maandfactuur"; het anker moet via de unieke 32-werkdagen-zin van art. 9 lopen (~230 tekens, nét onder de limiet).' } },

  { id: 'pos-83-woord-schrappen', doc: 'nda', category: 'targeted', failureMode: 'enkel-woord-anker',
    question: "Schrap in artikel 2 het woord 'strikt'.",
    expect: { suggestions: 'one', targets: [2], findMust: 'strikt', note: 'Eén-woord-verwijdering: find bevat "strikt geheim te houden", replace zonder "strikt".' } },

  // ══ V3/V4 — OPMAAK: wat kán (format-suggestie) en wat de grens blijft ══════
  { id: 'cap-84-markeren', doc: 'arbeid_bepaalde_tijd', category: 'add', failureMode: 'opmaak-actie',
    question: 'Markeer artikel 7 met een gele achtergrond zodat we het intern kunnen bespreken.',
    expect: { suggestions: 'one', targets: [7], format: 'highlight', note: 'Markeren kan via een format-suggestie (highlight). Anker = de tekst van art. 7; opmaak verbreedt het anker niet.' } },

  { id: 'cap-85-koppen-stijl', doc: 'algemene_voorwaarden', category: 'guardrail', failureMode: 'capability-grens',
    question: 'Zet alle artikelkoppen in het blauw en maak het lettertype een punt groter.',
    expect: { suggestions: 'policy', targets: [], scopeStrict: false, replyMust: ['grootte', 'lettertype', 'handmatig', 'niet'], note: 'Tekstkleur kán (format-color); lettergrootte/lettertype NIET — de grens moet eerlijk benoemd worden. Kleur-suggesties voor de koppen zijn acceptabel, doen-alsof over de grootte niet.' } },

  { id: 'cap-86-vet', doc: 'vaststellingsovereenkomst', category: 'add', failureMode: 'opmaak-actie',
    question: 'Maak het bedrag van de beëindigingsvergoeding in artikel 3 vetgedrukt.',
    expect: { suggestions: 'one', targets: [3], format: 'bold', note: 'Vet kan via een format-suggestie (bold) — wordt door Word als Opmaak-revisie getrackt. Anker = het bedrag.' } },

  { id: 'cap-87-afbeelding', doc: 'saas_licentie', category: 'guardrail', failureMode: 'capability-grens',
    question: 'Voeg ons bedrijfslogo toe boven artikel 1.',
    expect: { suggestions: 'none', targets: [], replyMust: ['afbeelding', 'handmatig', 'logo'], note: 'Afbeeldingen invoegen blijft buiten bereik — eerlijk uitleggen.' } },

  // ══ V3 — EXTRA HARD ════════════════════════════════════════════════════════
  { id: 'ext-88-sub-item', doc: 'franchise', category: 'trap', failureMode: 'lijst-staffel',
    question: 'Verhoog in artikel 9 de boete voor schending van de geheimhoudingsplicht naar € 15.000; laat de overige boetes ongewijzigd.',
    expect: { suggestions: 'one', targets: [9], value: '15.000', findMustNot: '25.000', note: 'Alleen sub b (€ 12.500) raken; sub a en c ongemoeid.' } },

  { id: 'ext-89-inspanning-garantie', doc: 'saas_licentie', category: 'legal', failureMode: 'herformulering-scope',
    question: "Herschrijf de beschikbaarheidszin in artikel 3 naar: 'Novaplan garandeert een beschikbaarheid van ten minste 99,5% per kalendermaand, gemeten buiten aangekondigde onderhoudsvensters.'",
    expect: { suggestions: 'one', targets: [3], value: 'garandeert', replyMust: ['inspanning', 'garantie', 'resultaat'], note: 'Volledige-zin-vervanging (~150 tekens) én juridische duiding: van inspanningsverplichting naar garantie/resultaatsverbintenis is een wezenlijke verzwaring — benoemen.' } },

  { id: 'ext-90-rekensom', doc: 'tarieven_tabel', category: 'question', failureMode: 'advies-only',
    question: 'Wat is het totaalbedrag van de drie fasen samen, exclusief btw? Alleen antwoorden, niets wijzigen.',
    expect: { suggestions: 'none', targets: [], replyMust: ['53.050', '53050'], note: '18.500 + 24.750 + 9.800 = € 53.050; uit de tabel lezen en optellen, geen wijzigingen.' } },

  // ══ V4 — HERNUMMERING + VERWIJZINGEN-CASCADE (de zwaarste categorie) ═══════
  { id: 'ren-91-hernoem-cascade', doc: 'verwijzingen_mix', category: 'multi', failureMode: 'hernummering-verwijzingen',
    question: 'Hernoem artikel 5 naar artikel 5A en werk alle verwijzingen naar dit artikel bij — ook die in de rapportagetabel en in de bijlage.',
    expect: { suggestions: 'some', targets: [5, 2, 8, 10, 11, 'B1.2'], value: '5A', note: 'Kopregel (art. 5) + vier schrijfwijzen: "artikel 5" (art. 2), "art. 5" (art. 8), "artikel 5 lid 1" (art. 10), tabel-cel "art. 5 lid 2" (art. 11) en de bijlage-verwijzing (B1.2). Volledige recall over 6 plekken; art. 3-verwijzing in art. 1 ongemoeid.' } },

  { id: 'ren-92-lid-sub', doc: 'verwijzingen_mix', category: 'multi', failureMode: 'hernummering-verwijzingen',
    question: 'Hernoem artikel 4 naar artikel 4A en pas ook de verwijzing naar artikel 4 lid 2 sub a aan.',
    expect: { suggestions: 'some', targets: [4, 7], value: '4A', findMust: 'lid 2 sub a', note: 'Kop + de lid/sub-verwijzing in art. 7 ("de verdeelsleutel van artikel 4 lid 2 sub a") volledig meenemen — niet alleen "artikel 4".' } },

  { id: 'ren-93-partieel', doc: 'verwijzingen_mix', category: 'targeted', failureMode: 'hernummering-verwijzingen',
    question: 'Wijzig alléén de verwijzing naar artikel 5 in artikel 10 naar "artikel 5A"; de overige verwijzingen passen we later aan.',
    expect: { suggestions: 'one', targets: [10], value: '5A', replyMust: ['inconsistent', 'overige', 'later', 'tijdelijk', 'nog niet'], note: 'Bewust gedeeltelijke update: alleen art. 10 raken én waarschuwen dat het document tijdelijk inconsistente verwijzingen bevat.' } },

  { id: 'lst-94-punt-vier', doc: 'verwijzingen_mix', category: 'trap', failureMode: 'non-unieke-find',
    question: 'Pas in de kostenlijst van artikel 6 alleen punt 4 aan: maak de betaaltermijn veertien dagen in plaats van dertig.',
    expect: { suggestions: 'one', targets: [6], value: 'veertien', findMust: 'infrastructuur', note: '"binnen dertig dagen" staat in punt 2, 4 én 6 van de lijst; het anker moet punt 4 pakken (genummerde-lijst-variant van de non-unieke-find-trap).' } },

  // ══ V5 — VERDUIDELIJKINGSVRAGEN (alleen vragen als het écht moet) ══════════
  { id: 'clr-95-ambigu-termijn', doc: 'algemene_voorwaarden', category: 'guardrail', failureMode: 'verduidelijking',
    question: 'Pas de termijn aan naar vijfenveertig dagen.',
    expect: { suggestions: 'clarify', targets: [], note: 'Het document kent meerdere termijnen (offertegeldigheid art. 3, betaling art. 6, fatale termijnen art. 9, opzegging art. 14) en de instructie noemt er geen — een verkeerde gok schaadt. Verwacht: verduidelijkingsvraag, geen wijzigingen.' } },

  { id: 'clr-96-ambigu-bedrag', doc: 'huur_woonruimte', category: 'guardrail', failureMode: 'verduidelijking',
    question: 'Verhoog het bedrag met € 100.',
    expect: { suggestions: 'clarify', targets: [], note: 'Huurprijs (art. 3), servicekosten (art. 4) en waarborgsom (art. 6) zijn allemaal plausibel; "het bedrag" is onbepaald. Verwacht: verduidelijkingsvraag met opties.' } },

  { id: 'clr-97-redelijke-default', doc: 'nda', category: 'targeted', failureMode: 'verduidelijking',
    question: 'Maak de boete wat hoger.',
    expect: { suggestions: 'one', targets: [6], note: 'De rem-test: er is maar één boetebeding (art. 6) — géén vraag stellen maar een redelijke verhoging voorstellen en de aanname kort benoemen. Een clarify-vraag hier = te snel vragen = fail.' } },

  // ══ V5 — NIEUWE TEKST OPSTELLEN (insert, ook in een leeg document) ═════════
  { id: 'ins-98-leeg-document', doc: 'leeg_document', category: 'add', failureMode: 'insert-nieuw-document',
    question: 'Schrijf een beknopte geheimhoudingsovereenkomst tussen twee ondernemingen en zet die in het document.',
    expect: { suggestions: 'some', targets: [], scopeStrict: false, mustInsert: true, value: 'geheimhouding', note: 'Leeg document: verwacht een insert-suggestie (position "end") met een volledig uitgeschreven NDA — niet om een bestaande passage vragen.' } },

  { id: 'ins-99-nieuw-artikel', doc: 'opdracht_zzp', category: 'add', failureMode: 'insert-nieuw-document',
    question: 'Voeg een nieuw artikel toe over mediation bij geschillen, direct vóór het artikel over toepasselijk recht.',
    expect: { suggestions: 'some', targets: [], scopeStrict: false, mustInsert: true, value: 'mediation', note: 'Insert met positie-anker (before/after rond art. 10); volledig uitgeschreven artikeltekst.' } },
]
