// ─────────────────────────────────────────────────────────────────────────────
// Drafter ↔ Word integratielaag.
//
// ALLE document-interactie loopt via dit bestand. Geen losse `Word.run`-aanroepen
// in componenten — die importeren hieruit. Zo blijft de Office.js-API op één plek
// en testbaar/te-mocken.
//
// Belangrijk over Track Changes:
//  - We zetten `changeTrackingMode = trackAll` VOORDAT we tekst muteren, zodat élke
//    edit die Drafter doet als een herziening verschijnt die de gebruiker kan
//    accepteren of weigeren. Dit is het kernprincipe van de plugin: Drafter stelt
//    voor, de jurist beslist.
//  - changeTrackingMode vereist WordApi 1.4+. isTrackChangesSupported() checkt dat.
// ─────────────────────────────────────────────────────────────────────────────

/** Is de add-in daadwerkelijk in Word geladen (vs. /admin in een browser)? */
export function isInWord() {
  return typeof Office !== 'undefined' && Office.context?.host === Office.HostType?.Word
}

/** Vereist WordApi 1.4 voor changeTrackingMode. */
export function isTrackChangesSupported() {
  return typeof Office !== 'undefined' && Office.context?.requirements?.isSetSupported?.('WordApi', '1.4')
}

/** Geselecteerde tekst (leeg = geen selectie). */
export async function getSelectedText() {
  return Word.run(async (context) => {
    const sel = context.document.getSelection()
    sel.load('text')
    await context.sync()
    return sel.text || ''
  })
}

/** Volledige documenttekst — voor context naar het AI-model. */
export async function getDocumentText() {
  return Word.run(async (context) => {
    const body = context.document.body
    body.load('text')
    await context.sync()
    return body.text || ''
  })
}

/**
 * Rijke context voor het model: selectie + (optioneel) de hele body.
 * `maxBodyChars` knipt grote documenten af zodat we de token-budget bewaken.
 */
export async function getContext({ includeBody = true, maxBodyChars = 24000 } = {}) {
  return Word.run(async (context) => {
    const sel = context.document.getSelection()
    sel.load('text')
    const body = context.document.body
    if (includeBody) body.load('text')
    await context.sync()
    const fullBody = includeBody ? (body.text || '') : ''
    return {
      selection: sel.text || '',
      body: fullBody.length > maxBodyChars ? fullBody.slice(0, maxBodyChars) : fullBody,
      bodyTruncated: includeBody && fullBody.length > maxBodyChars,
    }
  })
}

/** Zet Track Changes aan/uit op documentniveau. */
export async function setTrackChanges(enabled) {
  if (!isTrackChangesSupported()) return false
  return Word.run(async (context) => {
    context.document.changeTrackingMode = enabled
      ? Word.ChangeTrackingMode.trackAll
      : Word.ChangeTrackingMode.off
    await context.sync()
    return enabled
  })
}

/** Huidige Track-Changes-modus uitlezen ('Off' | 'TrackAll' | 'TrackMineOnly'). */
export async function getTrackChangesMode() {
  if (!isTrackChangesSupported()) return 'Unsupported'
  return Word.run(async (context) => {
    const doc = context.document
    doc.load('changeTrackingMode')
    await context.sync()
    return doc.changeTrackingMode
  })
}

/**
 * Vervang de huidige selectie door `newText`. Als `track` aanstaat, zetten we eerst
 * Track Changes aan zodat de vervanging als herziening verschijnt.
 * Geeft `false` terug als er niets geselecteerd was.
 */
export async function replaceSelection(newText, { track = true } = {}) {
  return Word.run(async (context) => {
    if (track && isTrackChangesSupported()) {
      context.document.changeTrackingMode = Word.ChangeTrackingMode.trackAll
    }
    const sel = context.document.getSelection()
    sel.load('text')
    await context.sync()
    if (!sel.text) return false
    sel.insertText(newText, Word.InsertLocation.replace)
    await context.sync()
    return true
  })
}

/** Voeg tekst in op de cursor/na de selectie (track changes registreert de insert). */
export async function insertAtSelection(text, { location = 'After', track = true } = {}) {
  return Word.run(async (context) => {
    if (track && isTrackChangesSupported()) {
      context.document.changeTrackingMode = Word.ChangeTrackingMode.trackAll
    }
    const sel = context.document.getSelection()
    const loc = location === 'Replace' ? Word.InsertLocation.replace
      : location === 'Before' ? Word.InsertLocation.before
      : Word.InsertLocation.after
    sel.insertText(text, loc)
    await context.sync()
    return true
  })
}

/**
 * Zoek de eerste exacte match van `find` in de body en vervang door `replace`,
 * onder Track Changes. Gebruikt voor "herschrijf deze passage"-suggesties waarbij
 * het model de te-vervangen passage letterlijk teruggeeft.
 */
export async function replacePassage(find, replace, { track = true } = {}) {
  return Word.run(async (context) => {
    if (track && isTrackChangesSupported()) {
      context.document.changeTrackingMode = Word.ChangeTrackingMode.trackAll
    }
    const results = context.document.body.search(find, { matchCase: false, ignorePunct: false })
    results.load('items')
    await context.sync()
    if (results.items.length === 0) return false
    results.items[0].insertText(replace, Word.InsertLocation.replace)
    await context.sync()
    return true
  })
}

/** Accepteer alle herzieningen in het document. */
export async function acceptAllChanges() {
  return Word.run(async (context) => {
    context.document.body.getTrackedChanges().load('items')
    await context.sync()
    context.document.body.getTrackedChanges().items?.forEach((c) => c.accept())
    await context.sync()
    return true
  })
}

/** Weiger alle herzieningen in het document. */
export async function rejectAllChanges() {
  return Word.run(async (context) => {
    const changes = context.document.body.getTrackedChanges()
    changes.load('items')
    await context.sync()
    changes.items?.forEach((c) => c.reject())
    await context.sync()
    return true
  })
}

// ── Per-suggestie wiring voor het Wijzigingen-tabblad ────────────────────────
// Het herschrijf-contract: elke suggestie heeft `find` (huidige passage) en
// `replace` (nieuwe tekst). Toepassen = vervangen onder Track Changes; accepteren/
// weigeren = de tracked change(s) rondom de nieuwe tekst finaliseren of terugdraaien.

/** Pas één suggestie toe als tracked change. Geeft false als `find` niet gevonden is. */
export async function applyChange(change) {
  if (!change?.find) return false
  return replacePassage(change.find, change.replace ?? '', { track: true })
}

/** Accepteer/weiger de tracked changes die overlappen met de eerste match van `text`. */
async function resolveChangesNear(text, mode) {
  if (!text || !isTrackChangesSupported()) return false
  return Word.run(async (context) => {
    const results = context.document.body.search(text, { matchCase: false, ignorePunct: false })
    results.load('items')
    await context.sync()
    if (!results.items.length) return false
    // getTrackedChanges() op een Range vereist WordApi 1.6; val anders stil terug.
    const range = results.items[0]
    let changes
    try { changes = range.getTrackedChanges() } catch { return false }
    changes.load('items')
    await context.sync()
    changes.items?.forEach((c) => (mode === 'accept' ? c.accept() : c.reject()))
    await context.sync()
    return true
  })
}

export async function acceptChange(change) {
  return resolveChangesNear(change?.replace || change?.ins, 'accept')
}

export async function rejectChange(change) {
  return resolveChangesNear(change?.replace || change?.ins, 'reject')
}
