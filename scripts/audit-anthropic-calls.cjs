#!/usr/bin/env node
/**
 * Pre-flight: faalt (exit 1) als er een directe fetch naar een AI-provider-API bestaat
 * BUITEN de centrale wrapper (supabase/functions/_shared/openai-fetch.ts).
 * Zo blijft alle AI-telemetrie geborgd via callOpenAI(). (Bestandsnaam is historisch;
 * de check dekt zowel OpenAI als Anthropic.)
 */
const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const SCAN_DIRS = ['supabase/functions', 'src']
const WRAPPERS = [
  'supabase/functions/_shared/openai-fetch.ts',
  'supabase/functions/_shared/anthropic-fetch.ts',
]
const NEEDLE = /api\.(openai|anthropic)\.com/

const offenders = []

function walk(dir) {
  const abs = path.join(ROOT, dir)
  if (!fs.existsSync(abs)) return
  for (const entry of fs.readdirSync(abs, { withFileTypes: true })) {
    const rel = path.join(dir, entry.name)
    if (entry.isDirectory()) { walk(rel); continue }
    if (!/\.(ts|tsx|js|jsx|cjs|mjs)$/.test(entry.name)) continue
    if (WRAPPERS.includes(rel.replace(/\\/g, '/'))) continue
    const text = fs.readFileSync(path.join(ROOT, rel), 'utf8')
    if (NEEDLE.test(text)) offenders.push(rel)
  }
}

SCAN_DIRS.forEach(walk)

if (offenders.length) {
  console.error('✗ Directe AI-provider-fetch buiten de wrapper gevonden in:')
  offenders.forEach((f) => console.error('  - ' + f))
  console.error('Gebruik callOpenAI() uit supabase/functions/_shared/openai-fetch.ts')
  process.exit(1)
}
console.log('✓ Geen directe AI-provider-calls buiten de wrapper.')
process.exit(0)
