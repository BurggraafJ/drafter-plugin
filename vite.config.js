import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import { APP_VERSION } from './src/version.js'

const BUILD_TIME = new Date().toISOString()

// Office vereist HTTPS voor de taskpane. In dev gebruiken we de office-addin-dev-certs
// (zelfde certs als Yo Office) zodat https://localhost:3000 vertrouwd is in Word.
async function httpsOptions() {
  try {
    const devCerts = await import('office-addin-dev-certs')
    const opts = await devCerts.getHttpsServerOptions()
    return { key: opts.key, cert: opts.cert }
  } catch {
    // Geen certs geïnstalleerd (bv. CI of build) → http; alleen relevant voor `vite` dev-server.
    return false
  }
}

// Schrijft dist/version.json (buiten cache) zodat de Refresh-knop een verse versie kan ophalen.
function emitVersionJson() {
  return {
    name: 'emit-version-json',
    closeBundle() {
      fs.writeFileSync('dist/version.json', JSON.stringify({ version: APP_VERSION, builtAt: BUILD_TIME }))
    },
  }
}

export default defineConfig(async () => ({
  plugins: [react(), emitVersionJson()],
  define: {
    __APP_VERSION__: JSON.stringify(APP_VERSION),
    __BUILD_TIME__: JSON.stringify(BUILD_TIME),
  },
  server: {
    port: 3000,
    strictPort: true,
    https: await httpsOptions(),
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-supabase': ['@supabase/supabase-js'],
        },
      },
    },
  },
}))
