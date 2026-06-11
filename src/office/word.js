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
 * In Word's zoeksyntaxis is '^' óók zonder wildcards een speciaal teken (^p = alinea,
 * ^t = tab, ^^ = letterlijke caret). Onze `find` is altijd LETTERLIJKE documenttekst,
 * dus een caret moet op de zoek-plek verdubbeld worden.
 * Zie learn.microsoft.com/office/dev/add-ins/word/search-option-guidance.
 */
function toSearchText(find) {
  return String(find).replace(/\^/g, '^^')
}

/**
 * Zoek de eerste exacte match van `find` in de body en vervang door `replace`,
 * onder Track Changes. Gebruikt voor "herschrijf deze passage"-suggesties waarbij
 * het model de te-vervangen passage letterlijk teruggeeft.
 */
export async function replacePassage(find, replace, { track = true } = {}) {
  // Word's body.search() gooit een GeneralException bij zoekstrings > 255 tekens of met
  // alinea-einden, en matcht niet over tabelcel-grenzen (tabs). We vangen dat af zodat
  // één onplaatsbare suggestie de hele apply-lus niet breekt.
  if (!find || /[\r\n\t]/.test(find)) return false
  const searchText = toSearchText(find)
  if (searchText.length > 255) return false
  return Word.run(async (context) => {
    if (track && isTrackChangesSupported()) {
      context.document.changeTrackingMode = Word.ChangeTrackingMode.trackAll
    }
    const results = context.document.body.search(searchText, { matchCase: false, ignorePunct: false })
    results.load('items')
    await context.sync()
    if (results.items.length === 0) return false
    results.items[0].insertText(replace, Word.InsertLocation.replace)
    await context.sync()
    return true
  }).catch(() => false)
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

/**
 * Opmaak toepassen op de eerste match van `find`. Vet/cursief/onderstrepen/tekstkleur worden
 * door Word als "Opmaak"-revisie getrackt; MARKEREN (highlightColor) valt buiten Words
 * track changes — daarom kan undoFormat() die expliciet terugdraaien (de Afwijzen-knop).
 * Ondersteunde keys (server-allowlist): bold, italic, underline, highlight, color.
 */
function applyFontProps(range, format, { invert = false } = {}) {
  if (format.bold) range.font.bold = !invert
  if (format.italic) range.font.italic = !invert
  if (format.underline) range.font.underline = invert ? 'None' : 'Single'
  if (format.highlight) range.font.highlightColor = invert ? null : format.highlight
  if (format.color) range.font.color = invert ? '#000000' : format.color
}

export async function formatPassage(find, format, { track = true, invert = false } = {}) {
  if (!find || /[\r\n\t]/.test(find) || !format || typeof format !== 'object') return false
  const searchText = toSearchText(find)
  if (searchText.length > 255) return false
  return Word.run(async (context) => {
    if (track && isTrackChangesSupported()) {
      context.document.changeTrackingMode = Word.ChangeTrackingMode.trackAll
    }
    const results = context.document.body.search(searchText, { matchCase: false, ignorePunct: false })
    results.load('items')
    await context.sync()
    if (results.items.length === 0) return false
    applyFontProps(results.items[0], format, { invert })
    await context.sync()
    return true
  }).catch(() => false)
}

/** Draai een opmaak-suggestie terug (voor Afwijzen — markering kent geen revisie). */
export async function undoFormat(change) {
  if (!change?.find || !change?.format) return false
  return formatPassage(change.find, change.format, { track: true, invert: true })
}

// ── Per-suggestie wiring voor het Wijzigingen-tabblad ────────────────────────
// Het contract: tekst-suggesties hebben `find` (huidige passage) en `replace` (nieuwe
// tekst); opmaak-suggesties hebben `find` + `format` ({bold, italic, underline,
// highlight, color}). Toepassen = onder Track Changes; accepteren/weigeren = de tracked
// change(s) finaliseren of terugdraaien (markering wordt expliciet teruggedraaid).

/**
 * Pas één suggestie toe als tracked change. Geeft false als de wijziging niet plaatsbaar is.
 * De server markeert onplaatsbare suggesties met `applicable === false`; die slaan we over.
 */
export async function applyChange(change) {
  if (!change?.find || change.applicable === false) return false
  if (change.action === 'format' && change.format) {
    return formatPassage(change.find, change.format, { track: true })
  }
  return replacePassage(change.find, change.replace ?? '', { track: true })
}

/** Accepteer/weiger de tracked changes die overlappen met de eerste match van `text`. */
async function resolveChangesNear(text, mode) {
  if (!text || !isTrackChangesSupported()) return false
  // Neem de eerste regel/cel als anker (search kan niet over alinea- of celgrenzen) en
  // blijf ruim onder de 255-tekens-limiet, ook na ^-escaping.
  const searchText = toSearchText(String(text).split(/[\r\n\t]/)[0].slice(0, 200))
  if (!searchText || searchText.length > 255) return false
  return Word.run(async (context) => {
    const results = context.document.body.search(searchText, { matchCase: false, ignorePunct: false })
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
  // Opmaak: de getrackte opmaak-revisies accepteren; markering is al toegepast (geen revisie).
  if (change?.action === 'format') return resolveChangesNear(change?.find, 'accept')
  return resolveChangesNear(change?.replace || change?.ins, 'accept')
}

export async function rejectChange(change) {
  if (change?.action === 'format') {
    // Getrackte opmaak-revisies (vet/cursief/kleur) terugdraaien…
    const ok = await resolveChangesNear(change?.find, 'reject')
    // …en markering expliciet weghalen: die valt buiten Words track changes, dus een
    // revisie-reject raakt hem niet. Alleen de highlight inverteren — andere props zijn
    // al door de revisie-reject hersteld (blind inverteren zou origineel-vette tekst slopen).
    if (change?.format?.highlight) {
      await formatPassage(change.find, { highlight: change.format.highlight }, { track: true, invert: true })
    }
    return ok
  }
  return resolveChangesNear(change?.replace || change?.ins, 'reject')
}
