// Drafter eval-runner.
//
// Draait de testset (cases.mjs) tegen de LIVE drafter-chat Edge Function en scoort de
// suggesties op track-changes-betrouwbaarheid + scope (zie lib/score.mjs).
//
// Gebruik:
//   node evals/run.mjs                # alle cases
//   node evals/run.mjs --smoke        # eerste 5 (snelle rooktest)
//   node evals/run.mjs --only arb-01-salaris,huur-09-huurprijs
//   node evals/run.mjs --concurrency 6 --timeout 150000 --tag baseline
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
const ONLY = arg('only', '')
const CONCURRENCY = Number(arg('concurrency', 4))
const TIMEOUT = Number(arg('timeout', 150000))
const RETRIES = Number(arg('retries', 2))
const TAG = arg('tag', 'run')

let cases = CASES
if (ONLY) { const set = new Set(ONLY.split(',')); cases = cases.filter((c) => set.has(c.id)) }
else if (SMOKE) cases = cases.slice(0, 5)

// ── één case aanroepen (met retry/backoff op 429/5xx/netwerk) ────────────────
async function callOne(c) {
  const body = JSON.stringify({
    question: c.question,
    context: { selection: c.selection || '', body: DOCS[c.doc] || '' },
    profile: PROFILE,
  })
  let lastErr = null
  for (let attempt = 0; attempt <= RETRIES; attempt++) {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT)
    const t0 = Date.now()
    try {
      const res = await fetch(`${BASE}/drafter-chat`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', authorization: `Bearer ${ANON}` },
        body, signal: ctrl.signal,
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
      lastErr = e.name === 'AbortError' ? `timeout na ${TIMEOUT}ms` : e.message
      if (attempt < RETRIES) { await sleep(800 * 2 ** attempt); continue }
      return { ok: false, ms: Date.now() - t0, status: 0, error: lastErr }
    } finally { clearTimeout(timer) }
  }
  return { ok: false, status: 0, error: lastErr }
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

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
console.log(`Drafter evals — ${cases.length} cases @ ${BASE} (concurrency ${CONCURRENCY}, timeout ${TIMEOUT}ms)\n`)
const started = Date.now()
let done = 0

const results = await pool(cases, CONCURRENCY, async (c) => {
  const call = await callOne(c)
  let score
  if (call.ok && call.response) {
    score = scoreCase(c, DOCS[c.doc], call.response)
  } else {
    score = { id: c.id, category: c.category, pass: false, checks: {}, reasons: [`call mislukt: ${call.error || 'onbekend'}`], perSug: [], suggestionCount: 0, applicableCount: 0, targets: c.expect?.targets || [], touched: [] }
  }
  const line = { ...score, ms: call.ms, status: call.status, error: call.error || null,
    reply: call.response?.reply?.slice(0, 400) || null,
    suggestionsRaw: call.response?.suggestions || [], citations: call.response?.citations || [] }
  done++
  console.log(`${score.pass ? '✅' : '❌'} ${String(done).padStart(2)}/${cases.length} ${c.id.padEnd(24)} ${String(call.ms ?? 0).padStart(6)}ms  ${score.reasons.length ? '— ' + score.reasons[0] : ''}`)
  return line
})

const elapsed = ((Date.now() - started) / 1000).toFixed(1)
const passed = results.filter((r) => r.pass).length
const byCat = {}
for (const r of results) {
  byCat[r.category] ??= { pass: 0, total: 0 }
  byCat[r.category].total++; if (r.pass) byCat[r.category].pass++
}
const latencies = results.map((r) => r.ms || 0).filter(Boolean).sort((a, b) => a - b)
const p50 = latencies[Math.floor(latencies.length * 0.5)] || 0
const p95 = latencies[Math.floor(latencies.length * 0.95)] || 0

console.log(`\n── Resultaat ──`)
console.log(`Pass: ${passed}/${results.length}  (${((passed / results.length) * 100).toFixed(0)}%)   tijd ${elapsed}s   latency p50 ${p50}ms / p95 ${p95}ms`)
console.log('Per categorie:', Object.entries(byCat).map(([k, v]) => `${k} ${v.pass}/${v.total}`).join('  '))

// ── rapport wegschrijven ─────────────────────────────────────────────────────
await mkdir(join(__dir, 'report'), { recursive: true })
const stamp = { tag: TAG, base: BASE, profile: PROFILE, cases: results.length, passed, elapsedSec: Number(elapsed), p50, p95, byCat }
await writeFile(join(__dir, 'report', 'latest.json'), JSON.stringify({ stamp, results }, null, 2))

const md = buildMarkdown(stamp, results)
await writeFile(join(__dir, 'report', 'latest.md'), md)
console.log(`\nRapport: evals/report/latest.json + latest.md`)

function buildMarkdown(stamp, results) {
  const lines = []
  lines.push(`# Drafter eval-rapport — ${stamp.tag}`)
  lines.push('')
  lines.push(`**Pass: ${stamp.passed}/${stamp.cases} (${((stamp.passed / stamp.cases) * 100).toFixed(0)}%)** · latency p50 ${stamp.p50}ms / p95 ${stamp.p95}ms · ${stamp.elapsedSec}s · profiel \`${stamp.profile}\``)
  lines.push('')
  lines.push('Per categorie: ' + Object.entries(stamp.byCat).map(([k, v]) => `${k} ${v.pass}/${v.total}`).join(' · '))
  lines.push('')
  lines.push('| | Case | Cat | ms | #sug | toepasbaar | scope→ | Reden(en) |')
  lines.push('|---|---|---|---|---|---|---|---|')
  for (const r of results) {
    lines.push(`| ${r.pass ? '✅' : '❌'} | ${r.id} | ${r.category} | ${r.ms ?? ''} | ${r.suggestionCount} | ${r.applicableCount}/${r.suggestionCount} | ${r.touched.join(',') || '–'}${r.targets.length ? ' (doel ' + r.targets.join(',') + ')' : ''} | ${r.reasons.join('; ') || '—'} |`)
  }
  lines.push('')
  lines.push('## Niet-toepasbare suggesties (track-changes-risico)')
  for (const r of results) {
    const bad = (r.perSug || []).filter((p) => p.find && !p.applicable)
    if (!bad.length) continue
    lines.push(`- **${r.id}**:`)
    for (const p of bad) lines.push(`  - \`find\` (${p.findLen} tekens): ${p.issues.join('; ')}`)
  }
  return lines.join('\n')
}
