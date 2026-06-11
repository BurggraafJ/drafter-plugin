// Judge-A/B: beoordeel de OPGESLAGEN antwoorden uit een eerder rapport opnieuw met een
// ander judge-model en meet de overeenstemming met de oorspronkelijke judge. Zo toets je
// of een goedkoper judge-model streng genoeg is — op identieke input, dus zonder
// chat-variantie in de meting.
//
// Gebruik:
//   node evals/judge-ab.mjs final-v15 gpt-5.4-mini
//
// Vereist: het rapport is gedraaid mét --judge (referentie-scores) en bevat volledige replies.

import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { DOCS } from './corpus.mjs'
import { CASES } from './cases.mjs'

const __dir = dirname(fileURLToPath(import.meta.url))

async function readDotEnv() {
  try {
    const txt = await readFile(join(__dir, '..', '.env'), 'utf8')
    const env = {}
    for (const line of txt.split('\n')) { const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/); if (m) env[m[1]] = m[2].trim() }
    return env
  } catch { return {} }
}
const dotenv = await readDotEnv()
const BASE = process.env.DRAFTER_FUNCTIONS_BASE || dotenv.VITE_DRAFTER_FUNCTIONS_BASE ||
  'https://pwpoqyhzkzwuridlzwzr.supabase.co/functions/v1'
const ANON = process.env.DRAFTER_ANON_KEY || dotenv.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_BjIR5jXTT55swZ3kcpSkUw__QBka-Mz'

const [tag, judgeModel] = process.argv.slice(2)
if (!tag || !judgeModel) { console.error('Gebruik: node evals/judge-ab.mjs <rapport-tag> <judge-model>'); process.exit(1) }

const report = JSON.parse(await readFile(join(__dir, 'report', `${tag}.json`), 'utf8'))
const caseById = new Map(CASES.map((c) => [c.id, c]))
const CLIENT_BODY_CAP = 24000

const targets = report.results.filter((r) => r.judge && !r.judge.error && (r.reply || r.suggestionsRaw?.length))
console.log(`Judge-A/B — ${targets.length} cases uit ${tag}: referentie (opgeslagen) vs ${judgeModel}\n`)

async function judgeOne(r) {
  const c = caseById.get(r.id)
  if (!c) return null
  const full = DOCS[c.doc] || ''
  const payload = {
    caseId: r.id,
    question: c.question,
    selection: c.selection || '',
    body: full.length > CLIENT_BODY_CAP ? full.slice(0, CLIENT_BODY_CAP) : full,
    reply: r.reply || '',
    suggestions: (r.suggestionsRaw || []).map((s) => ({
      find: s.find, replace: s.replace, why: s.why, applicable: s.applicable !== false,
      action: s.action, format: s.format,
    })),
    ...(r.clarify ? { clarify: r.clarify } : {}),
    model: judgeModel,
  }
  for (let attempt = 0; attempt <= 2; attempt++) {
    try {
      const res = await fetch(`${BASE}/drafter-judge`, {
        method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${ANON}` },
        body: JSON.stringify(payload),
      })
      const j = await res.json().catch(() => null)
      if (res.status === 429 || res.status >= 500) { await new Promise((x) => setTimeout(x, 1500 * (attempt + 1))); continue }
      return res.ok && j?.scores ? j : { error: j?.error || `HTTP ${res.status}` }
    } catch (e) { if (attempt === 2) return { error: e.message }; await new Promise((x) => setTimeout(x, 1500)) }
  }
  return { error: 'uitgeput' }
}

// Bescheiden concurrency: judge-calls zijn relatief zwaar.
const out = []
let idx = 0, done = 0
await Promise.all(Array.from({ length: 5 }, async () => {
  while (idx < targets.length) {
    const i = idx++
    const r = targets[i]
    const b = await judgeOne(r)
    done++
    if (done % 10 === 0) console.log(`  ${done}/${targets.length}…`)
    out.push({ id: r.id, failureMode: r.failureMode, a: r.judge, b })
  }
}))

const ok = out.filter((x) => x.b && !x.b.error)
const errs = out.length - ok.length
const agree = ok.filter((x) => x.a.verdict === x.b.verdict).length
const mae = ok.reduce((s, x) => s + Math.abs((x.a.weighted100 ?? 0) - (x.b.weighted100 ?? 0)), 0) / (ok.length || 1)
const aFails = ok.filter((x) => x.a.verdict === 'fail')
const failRecall = aFails.length ? aFails.filter((x) => x.b.verdict !== 'pass').length / aFails.length : null
const aFlag = ok.filter((x) => x.a.verdict !== 'pass')
const flagRecall = aFlag.length ? aFlag.filter((x) => x.b.verdict !== 'pass').length / aFlag.length : null

console.log(`\n══ Overeenstemming (n=${ok.length}${errs ? `, ${errs} fouten` : ''}) ══`)
console.log(`Verdict-agreement : ${agree}/${ok.length} (${Math.round((agree / ok.length) * 100)}%)`)
console.log(`Score MAE         : ${mae.toFixed(1)} punten (gem. |verschil| op 0-100)`)
console.log(`Fail-recall       : ${failRecall == null ? 'n.v.t. (geen fails in referentie)' : `${Math.round(failRecall * 100)}% van de referentie-fails ook door ${judgeModel} geflagd (niet-pass)`}`)
console.log(`Flag-recall       : ${flagRecall == null ? 'n.v.t.' : `${Math.round(flagRecall * 100)}% van alle referentie-flags (fail+borderline) ook geflagd`}`)

const diff = ok.filter((x) => x.a.verdict !== x.b.verdict)
  .sort((x, y) => Math.abs((y.a.weighted100 ?? 0) - (y.b.weighted100 ?? 0)) - Math.abs((x.a.weighted100 ?? 0) - (x.b.weighted100 ?? 0)))
if (diff.length) {
  console.log(`\nVerschillen (${diff.length}):`)
  for (const x of diff) console.log(`  - ${x.id} [${x.failureMode}]: ref ${x.a.weighted100} ${x.a.verdict} → ${judgeModel} ${x.b.weighted100} ${x.b.verdict}`)
}
