// Drafter eval-cases — 30 realistische juridische instructies.
//
// Per case:
//   doc        : sleutel in DOCS
//   question   : de instructie zoals een jurist die typt
//   selection  : (optioneel) tekst die de jurist had geselecteerd ("herschrijf dit")
//   category   : type test (zie onder)
//   expect:
//     suggestions: 'none' | 'one' | 'some'   — hoeveel voorstellen we verwachten
//     targets    : [artikelnummers] die GERAAKT mogen worden (scope-grens)
//     value      : (optioneel) tekst die in minstens één `replace` moet voorkomen
//     scopeStrict: (default true) een find buiten `targets` = over-reach (fout)
//     note       : wat we juridisch verwachten
//
// Categorieën: targeted (scope-precisie), topic (zoek juiste clausule), value (waarde-swap),
// add (toevoeging), legal (correctheid), tone (herformulering), question (geen edit),
// guardrail (niet-bestaand artikel), long (lange-doc-precisie), trap (niet-unieke find), multi.

export const CASES = [
  // ── arbeid_bepaalde_tijd ──────────────────────────────────────────────────
  { id: 'arb-01-salaris', doc: 'arbeid_bepaalde_tijd', category: 'value',
    question: 'Pas artikel 5 aan: verhoog het brutosalaris naar € 3.100 per maand.',
    expect: { suggestions: 'one', targets: [5], value: '3.100', note: 'Alleen het salarisbedrag in art. 5.' } },

  { id: 'arb-02-proeftijd', doc: 'arbeid_bepaalde_tijd', category: 'legal',
    question: 'Verleng de proeftijd naar twee maanden.',
    expect: { suggestions: 'policy', targets: [3], replyMust: ['proeftijd', 'nietig', 'één maand', 'maand'], note: 'Bij 12-mnd-contract is 2 mnd proeftijd nietig (max 1 mnd). Wijzigen-met-waarschuwing óf onderbouwde weigering; benoem het punt.' } },

  { id: 'arb-03-tussentijds', doc: 'arbeid_bepaalde_tijd', category: 'add',
    question: 'Voeg in artikel 2 een tussentijdse opzegmogelijkheid toe met een opzegtermijn van één maand.',
    expect: { suggestions: 'some', targets: [2], note: 'Tussentijds opzegbeding binnen art. 2.' } },

  { id: 'arb-04-concurrentie-motivering', doc: 'arbeid_bepaalde_tijd', category: 'legal',
    question: 'Het concurrentiebeding in artikel 7 mist een schriftelijke motivering van zwaarwegende bedrijfsbelangen. Vul dit aan zodat het voldoet aan artikel 7:653 BW.',
    expect: { suggestions: 'some', targets: [7], note: 'Motivering toevoegen aan art. 7; niet aan art. 8.' } },

  { id: 'arb-05-concurrentie-duur', doc: 'arbeid_bepaalde_tijd', category: 'targeted',
    question: 'Pas artikel 7 aan zodat het concurrentiebeding nog maar zes maanden geldt.',
    selection: 'Het is Werknemer verboden om gedurende twaalf maanden na het einde van het dienstverband binnen een straal van 50 kilometer werkzaam te zijn bij een onderneming die gelijksoortige activiteiten ontplooit als Werkgever.',
    expect: { suggestions: 'one', targets: [7], value: 'zes maanden', note: 'Alleen de termijn; art. 8 (geheimhouding) NIET raken.' } },

  { id: 'arb-06-vraag-geldigheid', doc: 'arbeid_bepaalde_tijd', category: 'question',
    question: 'Is het concurrentiebeding in dit tijdelijke contract rechtsgeldig? Leg uit, ik wil nog niets wijzigen.',
    expect: { suggestions: 'none', targets: [], note: 'Uitleg, geen voorstellen (jurist wil enkel advies).' } },

  { id: 'arb-07-arbeidsduur', doc: 'arbeid_bepaalde_tijd', category: 'value',
    question: 'Wijzig in artikel 4 de arbeidsduur van 40 uur naar 36 uur per week.',
    expect: { suggestions: 'one', targets: [4], value: '36 uur', note: 'Alleen de arbeidsduur in art. 4.' } },

  { id: 'arb-08-geheimhouding-streng', doc: 'arbeid_bepaalde_tijd', category: 'tone',
    question: 'Maak de formulering van artikel 8 (geheimhouding) strenger en specifieker.',
    expect: { suggestions: 'some', targets: [8], note: 'Herformulering binnen art. 8.' } },

  // ── huur_woonruimte ───────────────────────────────────────────────────────
  { id: 'huur-09-huurprijs', doc: 'huur_woonruimte', category: 'value',
    question: 'Verhoog de huurprijs in artikel 3 van € 1.200 naar € 1.350 per maand.',
    expect: { suggestions: 'one', targets: [3], value: '1.350', note: 'Alleen huurprijs art. 3; waarborgsom (art. 6) NIET meeveranderen.' } },

  { id: 'huur-10-opzegtermijn', doc: 'huur_woonruimte', category: 'legal',
    question: 'Pas artikel 8 aan: verleng de opzegtermijn voor Huurder naar twee maanden.',
    expect: { suggestions: 'policy', targets: [8], replyMust: ['opzegtermijn', 'woonruimte', 'huurder', 'maand'], note: 'Bij woonruimte is de opzegtermijn van de huurder dwingend (≈1 betaalperiode). Wijzigen-met-waarschuwing óf weigering; binnen art. 8.' } },

  { id: 'huur-11-waarborg', doc: 'huur_woonruimte', category: 'legal',
    question: 'Wijzig de waarborgsom in artikel 6 naar € 3.600.',
    expect: { suggestions: 'policy', targets: [6], replyMust: ['waarborgsom', 'twee maanden', 'goed verhuurderschap', '7:261b', 'maximaal'], note: '€3.600 = 3 mnd huur, in strijd met max. 2 mnd (art. 7:261b BW / Wgv). Weigeren-met-uitleg óf wijzigen-met-waarschuwing.' } },

  { id: 'huur-12-onderhoud-add', doc: 'huur_woonruimte', category: 'add',
    question: 'Voeg aan artikel 7 toe dat Huurder zonder schriftelijke toestemming geen onderhoud aan derden mag uitbesteden.',
    expect: { suggestions: 'some', targets: [7], note: 'Toevoeging binnen art. 7.' } },

  { id: 'huur-13-indexering', doc: 'huur_woonruimte', category: 'topic',
    question: 'Pas de indexering aan zodat deze voor het eerst op 1 juli 2028 plaatsvindt in plaats van 2027.',
    expect: { suggestions: 'one', targets: [5], value: '2028', note: 'Art. 5 indexering; jaartal.' } },

  { id: 'huur-14-wgv', doc: 'huur_woonruimte', category: 'legal',
    question: 'Controleer of de waarborgsom in artikel 6 voldoet aan de Wet goed verhuurderschap (max. twee maanden huur) en pas zo nodig aan.',
    expect: { suggestions: 'policy', targets: [6], replyMust: ['voldoet', 'twee maanden', 'waarborgsom'], note: 'Waarborgsom = 2x €1.200 = voldoet al; juiste antwoord = bevestigen, geen wijziging nodig.' } },

  // ── nda ───────────────────────────────────────────────────────────────────
  { id: 'nda-15-looptijd', doc: 'nda', category: 'value',
    question: 'Verkort de looptijd in artikel 4 van drie jaar naar twee jaar.',
    expect: { suggestions: 'one', targets: [4], value: 'twee jaar', note: 'Alleen duur art. 4.' } },

  { id: 'nda-16-boete', doc: 'nda', category: 'value',
    question: 'Verhoog de boete in artikel 6 naar € 25.000 per overtreding.',
    expect: { suggestions: 'one', targets: [6], value: '25.000', note: 'Bedrag in art. 6.' } },

  { id: 'nda-17-forum', doc: 'nda', category: 'targeted',
    question: 'Wijzig de forumkeuze in artikel 7 van Amsterdam naar Rotterdam.',
    expect: { suggestions: 'one', targets: [7], value: 'Rotterdam', note: 'Alleen forum in art. 7.' } },

  { id: 'nda-18-uitzondering', doc: 'nda', category: 'add',
    question: 'Voeg aan artikel 2 een uitzondering toe voor informatie die al openbaar bekend is buiten toedoen van de Ontvangende Partij.',
    expect: { suggestions: 'some', targets: [2], note: 'Carve-out binnen art. 2.' } },

  { id: 'nda-19-vraag-boete', doc: 'nda', category: 'question',
    question: 'Welke risico’s zitten er voor de Ontvangende Partij in dit boetebeding? Geef alleen advies.',
    expect: { suggestions: 'none', targets: [], scopeStrict: false, note: 'Advies; geen of optioneel voorstel.' } },

  // ── algemene_voorwaarden (lang) ───────────────────────────────────────────
  { id: 'av-20-opzeg', doc: 'algemene_voorwaarden', category: 'long',
    question: 'Pas artikel 14 aan: verleng de opzegtermijn van twee maanden naar drie maanden.',
    expect: { suggestions: 'one', targets: [14], value: 'drie maanden', note: 'In lang doc: alleen art. 14.' } },

  { id: 'av-21-betaaltermijn-trap', doc: 'algemene_voorwaarden', category: 'trap',
    question: 'Wijzig in artikel 6 de betalingstermijn van dertig dagen naar veertien dagen.',
    expect: { suggestions: 'one', targets: [6], value: 'veertien dagen', note: '"dertig dagen" staat ook in art. 3/7 — find moet uniek art. 6 raken.' } },

  { id: 'av-22-aansprakelijkheid', doc: 'algemene_voorwaarden', category: 'tone',
    question: 'Maak de aansprakelijkheidsbeperking in artikel 12 strenger in ons voordeel als Opdrachtnemer.',
    expect: { suggestions: 'some', targets: [12], note: 'Herformulering binnen art. 12.' } },

  { id: 'av-23-ie-gebruiksrecht', doc: 'algemene_voorwaarden', category: 'add',
    question: 'Voeg aan artikel 11 een gebruiksrecht voor Opdrachtgever toe dat ingaat na volledige betaling.',
    expect: { suggestions: 'some', targets: [11], note: 'Licentie/gebruiksrecht binnen art. 11.' } },

  { id: 'av-24-forum', doc: 'algemene_voorwaarden', category: 'long',
    question: 'Pas alleen artikel 16 aan: wijzig de bevoegde rechter van Zwolle naar Amsterdam.',
    expect: { suggestions: 'one', targets: [16], value: 'Amsterdam', note: 'Alleen art. 16.' } },

  { id: 'av-25-incasso-multi', doc: 'algemene_voorwaarden', category: 'multi',
    question: 'Pas artikel 7 aan: verwijs expliciet naar de wettelijke handelsrente én neem een minimum van € 40 aan incassokosten op.',
    expect: { suggestions: 'some', targets: [7], note: 'Beide aanpassingen binnen art. 7.' } },

  // ── vaststellingsovereenkomst ─────────────────────────────────────────────
  { id: 'vso-26-vergoeding', doc: 'vaststellingsovereenkomst', category: 'value',
    question: 'Verhoog de beëindigingsvergoeding in artikel 3 naar € 25.000 bruto.',
    expect: { suggestions: 'one', targets: [3], value: '25.000', note: 'Bedrag in art. 3.' } },

  { id: 'vso-27-relatiebeding', doc: 'vaststellingsovereenkomst', category: 'targeted',
    question: 'Pas artikel 5 aan: laat Werkgever ook afstand doen van het relatiebeding, net als van het concurrentiebeding.',
    expect: { suggestions: 'one', targets: [5], note: 'Alleen art. 5.' } },

  { id: 'vso-28-getuigschrift-add', doc: 'vaststellingsovereenkomst', category: 'add',
    question: 'Voeg aan artikel 6 toe dat het getuigschrift binnen veertien dagen na de einddatum wordt verstrekt.',
    expect: { suggestions: 'some', targets: [6], value: 'veertien dagen', note: 'Termijn binnen art. 6.' } },

  { id: 'vso-29-guardrail', doc: 'vaststellingsovereenkomst', category: 'guardrail',
    question: 'Pas artikel 12 aan zodat de opzegtermijn drie maanden wordt.',
    expect: { suggestions: 'none', targets: [], scopeStrict: true, note: 'Er is GEEN artikel 12 (doc heeft art. 1-8). Niet verzinnen; idealiter terugkoppelen.' } },

  // ── opdracht_zzp ──────────────────────────────────────────────────────────
  { id: 'zzp-30-tarief', doc: 'opdracht_zzp', category: 'value',
    question: 'Verhoog het uurtarief in artikel 3 naar € 110 exclusief btw.',
    expect: { suggestions: 'one', targets: [3], value: '110', note: 'Alleen tarief art. 3; bedragen in art. 7 NIET raken.' } },
]
