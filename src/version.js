// Bron-van-waarheid voor de Drafter-versie. Voedt de versie-badge in het paneel
// én dist/version.json (via vite.config) dat de Refresh-knop ophaalt.
// Formaat: MAJOR.MINOR met 2-cijferige minor → 0.01, 0.02, ..., 0.10, 0.11.
// Elke deploy met zichtbare wijziging: minor +1. MAJOR-bump ALLEEN op expliciet verzoek van Jelle.
export const APP_VERSION = '0.08'
