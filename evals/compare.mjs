// Vergelijk twee eval-rapporten (A → B) en laat zien wat er gefixt, gebroken of
// verschoven is — hét gereedschap om te checken dat een verbetering nergens anders
// negatief op uitpakt.
//
// Gebruik:
//   node evals/compare.mjs baseline-v3 final-v12     # tags in evals/report/
//   node evals/compare.mjs pad/naar/a.json pad/naar/b.json
//   npm run eval:compare -- baseline-v3 final-v12

import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join, isAbsolute } from 'node:path'

const __dir = dirname(fileURLToPath(import.meta.url))

function resolveReport(arg) {
  if (!arg) return null
  if (arg.endsWith('.json')) return isAbsolute(arg) ? arg : join(process.cwd(), arg)
  return join(__dir, 'report', `${arg}.json`)
}

const [aArg, bArg] = process.argv.slice(2).filter((x) => !x.startsWith('--'))
if (!aArg || !bArg) {
  console.error('Gebruik: node evals/compare.mjs <oud: tag|pad.json> <nieuw: tag|pad.json>')
  process.exit(1)
}

const A = JSON.parse(await readFile(resolveReport(aArg), 'utf8'))
const B = JSON.parse(await readFile(resolveReport(bArg), 'utf8'))
const aMap = new Map(A.results.map((r) => [r.id, r]))
const bMap = new Map(B.results.map((r) => [r.id, r]))

const fixed = [], broken = [], stillFail = [], added = [], removed = []
for (const [id, b] of bMap) {
  const a = aMap.get(id)
  if (!a) { added.push(b); continue }
  if (!a.pass && b.pass) fixed.push({ a, b })
  else if (a.pass && !b.pass) broken.push({ a, b })
  else if (!a.pass && !b.pass) stillFail.push({ a, b })
}
for (const [id, a] of aMap) if (!bMap.has(id)) removed.push(a)

const aShared = [...aMap.values()].filter((r) => bMap.has(r.id))
const bShared = [...bMap.values()].filter((r) => aMap.has(r.id))
const aPass = aShared.filter((r) => r.pass).length
const bPass = bShared.filter((r) => r.pass).length

console.log(`\n══ Vergelijking ${A.stamp.tag} → ${B.stamp.tag} ══`)
console.log(`Gedeelde cases: ${aShared.length}   pass ${aPass} → ${bPass}  (${bPass - aPass >= 0 ? '+' : ''}${bPass - aPass})`)
if (added.length) console.log(`Nieuw in ${B.stamp.tag}: ${added.length} cases (${added.filter((r) => r.pass).length} pass): ${added.map((r) => r.id).join(', ')}`)
if (removed.length) console.log(`Verdwenen t.o.v. ${A.stamp.tag}: ${removed.map((r) => r.id).join(', ')}`)

if (broken.length) {
  console.log(`\n❌ GEBROKEN (${broken.length}) — was pass, nu fail (REGRESSIE!):`)
  for (const { b } of broken) console.log(`  - ${b.id} [${b.failureMode || b.category}]: ${b.reasons.join('; ')}`)
} else {
  console.log('\n✅ Geen regressies: alles wat slaagde, slaagt nog.')
}
if (fixed.length) {
  console.log(`\n🔧 GEFIXT (${fixed.length}) — was fail, nu pass:`)
  for (const { b } of fixed) console.log(`  - ${b.id} [${b.failureMode || b.category}]`)
}
if (stillFail.length) {
  console.log(`\n⏳ Nog steeds fail (${stillFail.length}):`)
  for (const { b } of stillFail) console.log(`  - ${b.id}: ${b.reasons.join('; ')}`)
}

// Judge-vergelijking (alleen voor cases die in beide runs een judge-score hebben).
const judged = bShared
  .map((b) => ({ b, a: aMap.get(b.id) }))
  .filter(({ a, b }) => a.judge && !a.judge.error && b.judge && !b.judge.error)
if (judged.length) {
  const avgA = Math.round(judged.reduce((s, { a }) => s + (a.judge.weighted100 ?? 0), 0) / judged.length)
  const avgB = Math.round(judged.reduce((s, { b }) => s + (b.judge.weighted100 ?? 0), 0) / judged.length)
  console.log(`\n⚖️  Judge (beide runs, n=${judged.length}): gemiddeld ${avgA} → ${avgB}  (${avgB - avgA >= 0 ? '+' : ''}${avgB - avgA})`)
  const moved = judged
    .map(({ a, b }) => ({ id: b.id, d: (b.judge.weighted100 ?? 0) - (a.judge.weighted100 ?? 0), to: b.judge.weighted100, verdict: b.judge.verdict }))
    .filter((x) => Math.abs(x.d) >= 20)
    .sort((x, y) => x.d - y.d)
  for (const m of moved) console.log(`  ${m.d < 0 ? '▼' : '▲'} ${m.id}: ${m.d >= 0 ? '+' : ''}${m.d} → ${m.to} (${m.verdict})`)
}

// Per-faalmodus delta.
function byMode(results) {
  const out = {}
  for (const r of results) {
    const k = r.failureMode || '–'
    out[k] ??= { pass: 0, total: 0 }
    out[k].total++; if (r.pass) out[k].pass++
  }
  return out
}
const ma = byMode(aShared), mb = byMode(bShared)
const modes = [...new Set([...Object.keys(ma), ...Object.keys(mb)])].sort()
const diffs = modes
  .map((k) => ({ k, a: ma[k] || { pass: 0, total: 0 }, b: mb[k] || { pass: 0, total: 0 } }))
  .filter(({ a, b }) => a.pass !== b.pass || a.total !== b.total)
if (diffs.length) {
  console.log('\nPer faalmodus (alleen verschillen):')
  for (const { k, a, b } of diffs) console.log(`  ${k}: ${a.pass}/${a.total} → ${b.pass}/${b.total}`)
}
console.log()
process.exit(broken.length ? 2 : 0)
