// Drafter eval-runner.
//
// Draait de testset (cases.mjs) tegen de LIVE drafter-chat Edge Function en scoort de
// suggesties op track-changes-betrouwbaarheid + scope (zie lib/score.mjs). Optioneel volgt
// een LLM-judge-pass (drafter-judge Edge Function) die de juridisch-inhoudelijke kwaliteit
// beoordeelt — los van de mechanische scoring.
//
// Gebruik:
//   node evals/run.mjs                       # alle cases, mechanische scoring
//   node evals/run.mjs --smoke               # eerste 5 (snelle rooktest)
//   node evals/run.mjs --only arb-01-salaris,fr-51-typografie-quotes
//   node evals/run.mjs --tag baseline --repeat 3        # variantie: elke case 3x
//   node evals/run.mjs --judge --tag final              # + juridische LLM-judge
//   node evals/run.mjs --concurrency 6 --timeout 150000
//
// Realisme: de Word-client (src/office/word.js getContext) knipt de documenttekst op
// 24.000 tekens vóór die naar het model gaat; Word's body.search doorzoekt daarna wél het
// VOLLEDIGE document. De runner bootst dat na: context.body wordt gekapt (+ bodyTruncated-
// vlag), maar de scoring toetst plaatsbaarheid tegen het volledige document.
//
// Config via env (met publiek-veilige defaults — publishable key, RLS-afgeschermd):
//   DRAFTER_FUNCTIONS_BASE, DRAFTER_ANON_KEY, DRAFTER_PROFILE

import { writeFile, mkdir, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { DOCS } from './corpus.mjs'
import { CASES } from './cases.mjs'
import { scoreCase } from './lib/score.mjs'

const __dir = dirname(fileURLToPath(import.meta.url))

// Zelfde cap als src/office/word.js getContext({ maxBodyChars: 24000 }).
const CLIENT_BODY_CAP = 24000

// ── config ───────────────────────────────────────────────────────────────────
async function readDotEnv() {
  try {
    const txt = await readFile(join(__dir, '..', '.env'), 'utf8')
    const env = {}
    for (const line of txt.split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
      if (m) env[m[1]] = m[2].trim()
    }
    return env
  } catch { return {} }
}
const dotenv = await readDotEnv()
const BASE = process.env.DRAFTER_FUNCTIONS_BASE || dotenv.VITE_DRAFTER_FUNCTIONS_BASE ||
  'https://pwpoqyhzkzwuridlzwzr.supabase.co/functions/v1'
const ANON = process.env.DRAFTER_ANON_KEY || dotenv.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_BjIR5jXTT55swZ3kcpSkUw__QBka-Mz'
const PROFILE = process.env.DRAFTER_PROFILE || 'default'

// ── args ─────────────────────────────────────────────────────────────────────
function arg(name, def) {
  const i = process.argv.indexOf(`--${name}`)
  return i !== -1 && process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[i + 1] : def
}
const SMOKE = process.argv.includes('--smoke')
const JUDGE = process.argv.includes('--judge')
const ONLY = arg('only', '')
const TAGFILTER = arg('failuremode', '')
const CONCURRENCY = Number(arg('concurrency', 4))
const TIMEOUT = Number(arg('timeout', 150000))
const RETRIES = Number(arg('retries', 2))
const REPEAT = Math.max(1, Number(arg('repeat', 1)))
const TAG = arg('tag', 'run')

let cases = CASES
if (ONLY) { const set = new Set(ONLY.split(',')); cases = cases.filter((c) => set.has(c.id)) }
else if (TAGFILTER) cases = cases.filter((c) => c.failureMode === TAGFILTER)
else if (SMOKE) cases = cases.slice(0, 5)

// ── HTTP helper met retry/backoff op 429/5xx/netwerk ─────────────────────────
async function postJson(path, payload, timeoutMs = TIMEOUT) {
  let lastErr = null
  for (let attempt = 0; attempt <= RETRIES; attempt++) {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), timeoutMs)
    const t0 = Date.now()
    try {
      const res = await fetch(`${BASE}${path}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', authorization: `Bearer ${ANON}` },
        body: JSON.stringify(payload), signal: ctrl.signal,
      })
      const ms = Date.now() - t0
      const text = await res.text()
      let json = null
      try { json = JSON.parse(text) } catch { /* niet-JSON */ }
      if (res.status === 429 || res.status >= 500) {
        lastErr = `HTTP ${res.status}: ${text.slice(0, 200)}`
        const wait = Number(res.headers.get('retry-after')) * 1000 || (800 * 2 ** attempt)
        if (attempt < RETRIES) { await sleep(wait); continue }
        return { ok: false, ms, status: res.status, error: lastErr, response: json }
      }
      return { ok: res.ok, ms, status: res.status, response: json, raw: json ? null : text.slice(0, 500) }
    } catch (e) {
      lastErr = e.name === 'AbortError' ? `timeout na ${timeoutMs}ms` : e.message
      if (attempt < RETRIES) { await sleep(800 * 2 ** attempt); continue }
      return { ok: false, ms: Date.now() - t0, status: 0, error: lastErr }
    } finally { clearTimeout(timer) }
  }
  return { ok: false, status: 0, error: lastErr }
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// ── context bouwen zoals de Word-client dat doet ─────────────────────────────
function clientContext(c) {
  const full = DOCS[c.doc] || ''
  return {
    selection: c.selection || '',
    body: full.length > CLIENT_BODY_CAP ? full.slice(0, CLIENT_BODY_CAP) : full,
    bodyTruncated: full.length > CLIENT_BODY_CAP,
  }
}

async function callChat(c) {
  return postJson('/drafter-chat', { question: c.question, context: clientContext(c), profile: PROFILE })
}

async function callJudge(c, chatResponse) {
  const ctx = clientContext(c)
  return postJson('/drafter-judge', {
    caseId: c.id,
    question: c.question,
    selection: ctx.selection,
    body: ctx.body,
    reply: chatResponse?.reply || '',
    suggestions: (chatResponse?.suggestions || []).map((s) => ({
      find: s.find, replace: s.replace, why: s.why, applicable: s.applicable !== false,
    })),
    // Bewust GEEN expect/note meesturen: de judge oordeelt blind, zonder te weten
    // wat de testcase verwacht — dat houdt de inhoudelijke beoordeling onafhankelijk.
  }, 180000)
}

// ── concurrency-pool ─────────────────────────────────────────────────────────
async function pool(items, n, fn) {
  const out = new Array(items.length)
  let idx = 0
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, async () => {
    while (idx < items.length) {
      const i = idx++
      out[i] = await fn(items[i], i)
    }
  }))
  return out
}

// ── run ──────────────────────────────────────────────────────────────────────
const attempts = []
for (let r = 0; r < REPEAT; r++) for (const c of cases) attempts.push({ c, attempt: r })

console.log(`Drafter evals — ${cases.length} cases × ${REPEAT} run(s)${JUDGE ? ' + judge' : ''} @ ${BASE} (concurrency ${CONCURRENCY}, timeout ${TIMEOUT}ms)\n`)
const started = Date.now()
let done = 0

const attemptResults = await pool(attempts, CONCURRENCY, async ({ c, attempt }) => {
  const call = await callChat(c)
  let score
  if (call.ok && call.response) {
    score = scoreCase(c, DOCS[c.doc], call.response)
  } else {
    score = { id: c.id, category: c.category, pass: false, checks: {}, reasons: [`call mislukt: ${call.error || 'onbekend'}`], perSug: [], suggestionCount: 0, applicableCount: 0, targets: c.expect?.targets || [], touched: [] }
  }
  // LLM-judge: alleen op de eerste attempt per case (kostenbeheersing).
  let judge = null
  if (JUDGE && attempt === 0) {
    const j = await callJudge(c, call.response)
    judge = j.ok && j.response ? j.response : { error: j.error || `HTTP ${j.status}` }
  }
  const line = { ...score, failureMode: c.failureMode || null, attempt, ms: call.ms, status: call.status, error: call.error || null,
    reply: call.response?.reply?.slice(0, 400) || null,
    suggestionsRaw: call.response?.suggestions || [], citations: call.response?.citations || [], judge }
  done++
  const rep = REPEAT > 1 ? ` (r${attempt + 1})` : ''
  console.log(`${score.pass ? '✅' : '❌'} ${String(done).padStart(3)}/${attempts.length} ${(c.id + rep).padEnd(28)} ${String(call.ms ?? 0).padStart(6)}ms  ${score.reasons.length ? '— ' + score.reasons[0] : ''}`)
  return line
})

// ── aggregeren per case (over attempts heen) ─────────────────────────────────
const byId = new Map()
for (const r of attemptResults) {
  if (!byId.has(r.id)) byId.set(r.id, [])
  byId.get(r.id).push(r)
}
const results = [...byId.entries()].map(([id, runs]) => {
  runs.sort((a, b) => a.attempt - b.attempt)
  const passCount = runs.filter((x) => x.pass).length
  const first = runs[0]
  return { ...first, pass: passCount === runs.length, passCount, attemptCount: runs.length,
    reasons: [...new Set(runs.flatMap((x) => x.reasons))], attempts: REPEAT > 1 ? runs.map((x) => ({ attempt: x.attempt, pass: x.pass, ms: x.ms, reasons: x.reasons })) : undefined }
})

const elapsed = ((Date.now() - started) / 1000).toFixed(1)
const passed = results.filter((r) => r.pass).length
const flaky = results.filter((r) => r.passCount > 0 && r.passCount < r.attemptCount).length
const byCat = {}
const byMode = {}
for (const r of results) {
  byCat[r.category] ??= { pass: 0, total: 0 }
  byCat[r.category].total++; if (r.pass) byCat[r.category].pass++
  const fm = r.failureMode || '–'
  byMode[fm] ??= { pass: 0, total: 0 }
  byMode[fm].total++; if (r.pass) byMode[fm].pass++
}
const latencies = attemptResults.map((r) => r.ms || 0).filter(Boolean).sort((a, b) => a - b)
const p50 = latencies[Math.floor(latencies.length * 0.5)] || 0
const p95 = latencies[Math.floor(latencies.length * 0.95)] || 0

// Judge-aggregatie
const judged = results.filter((r) => r.judge && !r.judge.error)
const judgeErrors = results.filter((r) => r.judge?.error).length
const judgeAvg = judged.length ? Math.round(judged.reduce((s, r) => s + (r.judge.weighted100 ?? 0), 0) / judged.length) : null
const judgeVerdicts = {}
for (const r of judged) { const v = r.judge.verdict || '–'; judgeVerdicts[v] = (judgeVerdicts[v] || 0) + 1 }

console.log(`\n── Resultaat ──`)
console.log(`Pass: ${passed}/${results.length}  (${((passed / results.length) * 100).toFixed(0)}%)${REPEAT > 1 ? `   flaky: ${flaky}` : ''}   tijd ${elapsed}s   latency p50 ${p50}ms / p95 ${p95}ms`)
console.log('Per categorie:', Object.entries(byCat).map(([k, v]) => `${k} ${v.pass}/${v.total}`).join('  '))
console.log('Per faalmodus:', Object.entries(byMode).map(([k, v]) => `${k} ${v.pass}/${v.total}`).join('  '))
if (JUDGE) console.log(`Judge: gem. ${judgeAvg ?? '–'}/100 over ${judged.length} cases  ${Object.entries(judgeVerdicts).map(([k, v]) => `${k}:${v}`).join(' ')}${judgeErrors ? `  (${judgeErrors} judge-fouten)` : ''}`)

// ── rapport wegschrijven ─────────────────────────────────────────────────────
await mkdir(join(__dir, 'report'), { recursive: true })
const stamp = { tag: TAG, base: BASE, profile: PROFILE, cases: results.length, repeat: REPEAT, passed, flaky,
  elapsedSec: Number(elapsed), p50, p95, byCat, byMode,
  judge: JUDGE ? { avg: judgeAvg, count: judged.length, errors: judgeErrors, verdicts: judgeVerdicts } : null }
const reportJson = JSON.stringify({ stamp, results }, null, 2)
await writeFile(join(__dir, 'report', 'latest.json'), reportJson)
const md = buildMarkdown(stamp, results)
await writeFile(join(__dir, 'report', 'latest.md'), md)
if (TAG && TAG !== 'run') {
  await writeFile(join(__dir, 'report', `${TAG}.json`), reportJson)
  await writeFile(join(__dir, 'report', `${TAG}.md`), md)
}
console.log(`\nRapport: evals/report/latest.json + latest.md${TAG && TAG !== 'run' ? ` (+ ${TAG}.json/.md)` : ''}`)

function buildMarkdown(stamp, results) {
  const lines = []
  lines.push(`# Drafter eval-rapport — ${stamp.tag}`)
  lines.push('')
  lines.push(`**Pass: ${stamp.passed}/${stamp.cases} (${((stamp.passed / stamp.cases) * 100).toFixed(0)}%)**${stamp.repeat > 1 ? ` · ${stamp.repeat} runs/case · flaky ${stamp.flaky}` : ''} · latency p50 ${stamp.p50}ms / p95 ${stamp.p95}ms · ${stamp.elapsedSec}s · profiel \`${stamp.profile}\``)
  lines.push('')
  lines.push('Per categorie: ' + Object.entries(stamp.byCat).map(([k, v]) => `${k} ${v.pass}/${v.total}`).join(' · '))
  lines.push('')
  lines.push('Per faalmodus: ' + Object.entries(stamp.byMode).map(([k, v]) => `${k} ${v.pass}/${v.total}`).join(' · '))
  if (stamp.judge) {
    lines.push('')
    lines.push(`**Judge (juridische inhoud):** gemiddeld ${stamp.judge.avg ?? '–'}/100 over ${stamp.judge.count} cases · verdicts: ${Object.entries(stamp.judge.verdicts).map(([k, v]) => `${k} ${v}`).join(', ')}${stamp.judge.errors ? ` · ${stamp.judge.errors} judge-fouten` : ''}`)
  }
  lines.push('')
  lines.push(`| | Case | Cat | Faalmodus | ms | #sug | toepasbaar | scope→ |${stamp.judge ? ' Judge |' : ''} Reden(en) |`)
  lines.push(`|---|---|---|---|---|---|---|---|${stamp.judge ? '---|' : ''}---|`)
  for (const r of results) {
    const passMark = r.attemptCount > 1 ? `${r.passCount}/${r.attemptCount}` : (r.pass ? '✅' : '❌')
    const judgeCol = stamp.judge ? ` ${r.judge && !r.judge.error ? `${r.judge.weighted100 ?? '–'} ${r.judge.verdict || ''}`.trim() : (r.judge?.error ? 'err' : '–')} |` : ''
    lines.push(`| ${passMark} | ${r.id} | ${r.category} | ${r.failureMode || '–'} | ${r.ms ?? ''} | ${r.suggestionCount} | ${r.applicableCount}/${r.suggestionCount} | ${r.touched.join(',') || '–'}${r.targets.length ? ' (doel ' + r.targets.join(',') + ')' : ''} |${judgeCol} ${r.reasons.join('; ') || '—'} |`)
  }
  lines.push('')
  lines.push('## Niet-toepasbare suggesties (track-changes-risico)')
  for (const r of results) {
    const bad = (r.perSug || []).filter((p) => p.find && !p.applicable)
    if (!bad.length) continue
    lines.push(`- **${r.id}**:`)
    for (const p of bad) lines.push(`  - \`find\` (${p.findLen} tekens): ${p.issues.join('; ')}`)
  }
  const flawed = results.filter((r) => r.judge && !r.judge.error && Array.isArray(r.judge.issues) && r.judge.issues.length)
  if (flawed.length) {
    lines.push('')
    lines.push('## Judge-bevindingen (juridische inhoud)')
    for (const r of flawed) {
      lines.push(`- **${r.id}** (${r.judge.weighted100}/100, ${r.judge.verdict}): ${r.judge.issues.join('; ')}`)
    }
  }
  return lines.join('\n')
}
