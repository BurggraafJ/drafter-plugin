#!/usr/bin/env node
/**
 * Pre-flight: faalt (exit 1) als er een directe fetch naar de Anthropic API bestaat
 * BUITEN de centrale wrapper supabase/functions/_shared/anthropic-fetch.ts.
 * Zo blijft alle AI-telemetrie geborgd via callAnthropic().
 */
const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const SCAN_DIRS = ['supabase/functions', 'src']
const WRAPPER = 'supabase/functions/_shared/anthropic-fetch.ts'
const NEEDLE = 'api.anthropic.com/v1/messages'

const offenders = []

function walk(dir) {
  const abs = path.join(ROOT, dir)
  if (!fs.existsSync(abs)) return
  for (const entry of fs.readdirSync(abs, { withFileTypes: true })) {
    const rel = path.join(dir, entry.name)
    if (entry.isDirectory()) { walk(rel); continue }
    if (!/\.(ts|tsx|js|jsx|cjs|mjs)$/.test(entry.name)) continue
    if (rel.replace(/\\/g, '/') === WRAPPER) continue
    const text = fs.readFileSync(path.join(ROOT, rel), 'utf8')
    if (text.includes(NEEDLE)) offenders.push(rel)
  }
}

SCAN_DIRS.forEach(walk)

if (offenders.length) {
  console.error('✗ Directe Anthropic-fetch buiten de wrapper gevonden in:')
  offenders.forEach((f) => console.error('  - ' + f))
  console.error('Gebruik callAnthropic() uit ' + WRAPPER)
  process.exit(1)
}
console.log('✓ Geen directe Anthropic-calls buiten de wrapper.')
process.exit(0)
