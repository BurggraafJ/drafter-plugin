// Scoring voor de Drafter-evals. Meet de track-changes-betrouwbaarheid van de
// suggesties die drafter-chat teruggeeft, t.o.v. het bron-document.
//
// De harde realiteit (zie src/office/word.js replacePassage): een suggestie wordt in Word
// toegepast via body.search(find) → eerste match → insertText(replace). Daaruit volgen de
// faalmodi die we hier meten:
//   - find moet LETTERLIJK in het document staan (anders: niet toepasbaar)
//   - Word's search heeft een limiet van 255 tekens (langer → exception, niets gebeurt)
//   - search matcht niet over alineagrenzen (find met \n/\r → geen match)
//   - search pakt de EERSTE match → niet-unieke find kan de VERKEERDE passage raken
//   - scope: de match moet in het bedoelde artikel vallen (niet te veel/te weinig aanpassen)

export const WORD_SEARCH_MAX = 255

export function normalize(s) {
  return String(s ?? '')
    .replace(/[‘’‚‛]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, '-')
    .replace(/ /g, ' ')
}

export function countOccurrences(haystack, needle) {
  if (!needle) return 0
  const h = normalize(haystack).toLowerCase()
  const n = normalize(needle).toLowerCase()
  if (!n.trim()) return 0
  let count = 0, i = 0
  while ((i = h.indexOf(n, i)) !== -1) { count++; i += n.length }
  return count
}

// Splits document in artikel-spans op basis van "Artikel N"-koppen.
// Bijlage-bewust: artikelen ná een "BIJLAGE N"-kop krijgen het id 'B<bijlage>.<artikel>'
// (string), omdat bijlagen vaak een EIGEN artikelnummering hebben. Zo kan een scope-check
// onderscheid maken tussen artikel 1 van de hoofdtekst en artikel 1 van Bijlage 1.
export function splitArticles(doc) {
  const re = /(^|\n)[ \t]*(?:BIJLAGE|Bijlage)\s+(\d+)\b|(^|\n)[ \t]*Artikel\s+(\d+)\b/g
  const marks = []
  let m
  while ((m = re.exec(doc)) !== null) {
    if (m[2] != null) marks.push({ type: 'bijlage', num: Number(m[2]), start: m.index + (m[1] ? m[1].length : 0) })
    else marks.push({ type: 'artikel', num: Number(m[4]), start: m.index + (m[3] ? m[3].length : 0) })
  }
  const headStarts = marks.map((mk) => mk.start)
  const spans = []
  let bijlage = null
  for (const mk of marks) {
    if (mk.type === 'bijlage') { bijlage = mk.num; continue }
    const nextHead = headStarts.find((h) => h > mk.start)
    spans.push({
      num: bijlage == null ? mk.num : `B${bijlage}.${mk.num}`,
      start: mk.start,
      end: nextHead ?? doc.length,
    })
  }
  return spans
}

export function articleAt(articles, idx) {
  if (idx < 0) return null
  for (const a of articles) if (idx >= a.start && idx < a.end) return a.num
  return null // preambule / buiten elk artikel
}

// Beoordeel één suggestie t.o.v. het document.
export function scoreSuggestion(doc, articles, s) {
  const find = normalize(s?.find ?? '')
  const replace = normalize(s?.replace ?? '')
  const issues = []

  const findLen = (s?.find ?? '').length
  const multiline = /[\r\n]/.test(s?.find ?? '')
  // Tabs markeren in Word tabelcel-grenzen; search matcht niet over cellen heen.
  const hasTab = /\t/.test(s?.find ?? '')
  const tooLong = findLen > WORD_SEARCH_MAX
  const countStrict = (() => {
    // exacte (case-insensitive) telling zónder quote-normalisatie = wat Word ziet
    const h = String(doc).toLowerCase()
    const n = String(s?.find ?? '').toLowerCase()
    if (!n.trim()) return 0
    let c = 0, i = 0
    while ((i = h.indexOf(n, i)) !== -1) { c++; i += n.length }
    return c
  })()
  const countNorm = countOccurrences(doc, s?.find)

  const foundStrict = countStrict >= 1
  const foundNorm = countNorm >= 1
  const unique = countStrict === 1

  // Locatie (artikel) van de eerste match — Word pakt immers items[0].
  let article = null
  if (foundNorm) {
    const idx = normalize(doc).toLowerCase().indexOf(normalize(s?.find).toLowerCase())
    article = articleAt(articles, idx)
  }

  // Opmaak-suggesties ({action:'format'}) hebben geen replace; invoeg-suggesties
  // ({action:'insert', content, position}) hebben geen find — de server valideert de
  // positie/het anker en zet de applicable-vlag, die we hier respecteren.
  const isFormat = s?.action === 'format'
  const isInsert = s?.action === 'insert'
  if (isInsert) {
    const hasContent = typeof s?.content === 'string' && s.content.trim().length > 0
    const applicable = s?.applicable !== false && hasContent
    const issues = []
    if (!hasContent) issues.push('insert zonder content')
    if (s?.applicable === false) issues.push(`door server gemarkeerd als niet-toepasbaar${s?.findIssue ? ` (${s.findIssue})` : ''}`)
    // Anker-artikel bepalen voor scope-rapportage (end/start → geen artikel).
    const anchor = s?.position?.after || s?.position?.before || ''
    let article = null
    if (anchor) {
      const idx = normalize(doc).toLowerCase().indexOf(normalize(anchor).toLowerCase())
      if (idx >= 0) article = articleAt(articles, idx)
    }
    return { find: '', findLen: 0, multiline: false, tooLong: false, countStrict: 0, foundStrict: true, foundNorm: true, unique: true, article, isInsert: true, content: s?.content, replaceDiffers: hasContent, applicable, issues }
  }
  const hasFormat = isFormat && s?.format && typeof s.format === 'object' && Object.keys(s.format).length > 0
  const replaceDiffers = isFormat
    ? hasFormat
    : normalize(replace).trim() !== find.trim() && (replace.trim().length > 0 || (s?.del && !s?.ins))

  // De server (drafter-chat annotateSuggestion) markeert onplaatsbare suggesties met
  // applicable=false en word.js slaat die over. Zo'n suggestie wordt dus NOOIT geplaatst,
  // ook als de tekst toevallig wél in het volledige document staat (bv. na truncatie).
  const serverRejected = s?.applicable === false

  if (!s?.find) issues.push('find ontbreekt')
  else {
    if (!foundStrict && !foundNorm) issues.push('find niet in document (niet toepasbaar)')
    else if (!foundStrict && foundNorm) issues.push('find matcht alleen na quote/spatie-normalisatie (faalt in Word)')
    if (tooLong) issues.push(`find ${findLen} tekens > ${WORD_SEARCH_MAX} (Word search-limiet)`)
    if (multiline) issues.push('find bevat alinea-einde (Word search matcht niet over alineas)')
    if (hasTab) issues.push('find bevat een tab (kruist tabelcel-grens — Word search matcht niet over cellen)')
    if (foundStrict && !unique) issues.push(`find komt ${countStrict}x voor (niet uniek → mogelijk verkeerde locatie)`)
    if (!replaceDiffers) issues.push(isFormat ? 'opmaak-suggestie zonder geldige format-keys' : 'replace verschilt niet van find (geen effectieve wijziging)')
    if (serverRejected) issues.push(`door server gemarkeerd als niet-toepasbaar${s?.findIssue ? ` (${s.findIssue})` : ''}`)
  }

  const applicable = !serverRejected && foundStrict && !tooLong && !multiline && !hasTab && unique && (!isFormat || hasFormat)
  return { find: s?.find ?? '', findLen, multiline, tooLong, countStrict, foundStrict, foundNorm, unique, article, isFormat, format: isFormat ? s?.format : undefined, replaceDiffers, applicable, issues }
}

// Beoordeel een volledige case.
export function scoreCase(c, doc, response) {
  const articles = splitArticles(doc)
  const expect = c.expect || {}
  const scopeStrict = expect.scopeStrict !== false
  const reasons = []
  const suggestions = Array.isArray(response?.suggestions) ? response.suggestions : []
  const perSug = suggestions.map((s) => scoreSuggestion(doc, articles, s))

  const applicable = perSug.filter((p) => p.applicable)
  const touched = [...new Set(applicable.map((p) => p.article).filter((x) => x != null))]
  const targets = expect.targets || []

  // 1) Aantal voorstellen t.o.v. verwachting
  let countOk = true
  if (expect.suggestions === 'none') {
    countOk = applicable.length === 0
    if (!countOk) reasons.push(`verwacht GEEN wijziging, kreeg ${applicable.length} toepasbare`)
  } else if (expect.suggestions === 'one') {
    countOk = suggestions.length >= 1
    if (!countOk) reasons.push('verwacht 1 voorstel, kreeg 0')
    if (suggestions.length > 2) reasons.push(`verwacht ~1 voorstel, kreeg ${suggestions.length} (mogelijk te veel)`)
  } else if (expect.suggestions === 'some') {
    countOk = suggestions.length >= 1
    if (!countOk) reasons.push('verwacht ≥1 voorstel, kreeg 0')
  } else if (expect.suggestions === 'policy') {
    // Juridisch oordeel: zowel "wijziging mét waarschuwing" als "onderbouwde weigering" is goed,
    // mits eventuele wijzigingen in scope blijven en de reply het juridische punt benoemt.
    countOk = true
  } else if (expect.suggestions === 'clarify') {
    // De instructie is bewust ambigu: verwacht een verduidelijkingsvraag (clarify-blok met
    // minstens één vraag) en GEEN geplaatste wijzigingen.
    const clarify = response?.clarify
    countOk = !!(clarify && Array.isArray(clarify.questions) && clarify.questions.length >= 1) && applicable.length === 0
    if (!countOk) reasons.push(clarify ? 'clarify mét wijzigingen (hoort één van beide te zijn)' : 'verwachtte een verduidelijkingsvraag (clarify), kreeg er geen')
  }

  // 2) Applicability — elk voorstel moet toepasbaar zijn in Word
  const inapplicable = perSug.filter((p) => p.find && !p.applicable)
  const applicabilityOk = inapplicable.length === 0
  if (!applicabilityOk) reasons.push(`${inapplicable.length}/${perSug.length} voorstel(len) niet toepasbaar in Word`)

  // 3) Scope-precisie — niets buiten de targets raken
  let precisionOk = true
  if (targets.length && applicable.length) {
    const outside = touched.filter((t) => !targets.includes(t))
    if (outside.length && scopeStrict) { precisionOk = false; reasons.push(`raakt ook artikel(en) ${outside.join(', ')} buiten target ${targets.join(', ')} (over-reach)`) }
  }

  // 4) Scope-recall — elk target moet geraakt worden (alleen bij verplichte edit-cases)
  let recallOk = true
  if (targets.length && (expect.suggestions === 'one' || expect.suggestions === 'some')) {
    const missing = targets.filter((t) => !touched.includes(t))
    if (missing.length) { recallOk = false; reasons.push(`target-artikel(en) ${missing.join(', ')} niet geraakt`) }
  }

  // 5) Waarde aanwezig in een replace (of in insert-content)
  let valueOk = true
  if (expect.value) {
    const hay = normalize(suggestions.map((s) => `${s.replace ?? ''} ${s.ins ?? ''} ${s.content ?? ''}`).join(' ')).toLowerCase()
    valueOk = hay.includes(normalize(expect.value).toLowerCase())
    if (!valueOk) reasons.push(`verwachte waarde "${expect.value}" niet in replace/content gevonden`)
  }

  // 5a-bis) Invoeg-verwachting: minstens één toepasbare insert-suggestie.
  let insertOk = true
  if (expect.mustInsert) {
    insertOk = applicable.some((p) => p.isInsert)
    if (!insertOk) reasons.push('verwachtte een insert-suggestie (nieuwe tekst in het document), maar kreeg er geen toepasbare')
  }

  // 5a) Opmaak-verwachting: expect.format = 'highlight'|'bold'|… → minstens één toepasbare
  // opmaak-suggestie moet die key zetten.
  let formatOk = true
  if (expect.format) {
    formatOk = applicable.some((p) => p.isFormat && p.format && p.format[expect.format])
    if (!formatOk) reasons.push(`verwachte opmaak-suggestie met "${expect.format}" niet gevonden`)
  }

  // 5b) findMust / findMustNot — borgt dat het JUISTE voorkomen verankerd is (bv. "alleen
  // de eerste 'Opdrachtnemer'"): minstens één toepasbare find moet findMust bevatten, en
  // géén toepasbare find mag findMustNot bevatten.
  let findMustOk = true
  if (expect.findMust) {
    const want = normalize(expect.findMust).toLowerCase()
    findMustOk = applicable.some((p) => normalize(p.find).toLowerCase().includes(want))
    if (!findMustOk) reasons.push(`geen toepasbare find bevat "${expect.findMust}" (verkeerde plek verankerd?)`)
  }
  let findMustNotOk = true
  if (expect.findMustNot) {
    const bad = normalize(expect.findMustNot).toLowerCase()
    findMustNotOk = !applicable.some((p) => normalize(p.find).toLowerCase().includes(bad))
    if (!findMustNotOk) reasons.push(`een find bevat "${expect.findMustNot}" terwijl die plek juist niet geraakt mocht worden`)
  }

  // 6) Reply aanwezig
  const replyOk = typeof response?.reply === 'string' && response.reply.trim().length > 0
  if (!replyOk) reasons.push('lege reply')

  // 7) Reply benoemt het juridische punt (bij policy-/legal-cases)
  let replyMustOk = true
  if (Array.isArray(expect.replyMust) && expect.replyMust.length) {
    const rl = normalize(response?.reply || '').toLowerCase()
    replyMustOk = expect.replyMust.some((w) => rl.includes(normalize(w).toLowerCase()))
    if (!replyMustOk) reasons.push(`reply benoemt het juridische punt niet (verwacht één van: ${expect.replyMust.join(', ')})`)
  }

  const pass = countOk && applicabilityOk && precisionOk && recallOk && valueOk && formatOk && insertOk && findMustOk && findMustNotOk && replyOk && replyMustOk
  return {
    id: c.id, category: c.category, pass,
    checks: { countOk, applicabilityOk, precisionOk, recallOk, valueOk, formatOk, insertOk, findMustOk, findMustNotOk, replyOk, replyMustOk },
    targets, touched,
    suggestionCount: suggestions.length, applicableCount: applicable.length,
    reasons, perSug,
  }
}
