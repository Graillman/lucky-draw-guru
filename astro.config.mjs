import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import AstroPWA from '@vite-pwa/astro';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  output: 'static',
  site: 'https://realwheelpicker.com',
  trailingSlash: 'never',
  // CRITICAL for Cloudflare Pages: emit /page.html (flat files) instead of
  // /page/index.html. With directory output CF serves the page at /page/ and
  // 308-redirects /page -> /page/, which fights trailingSlash:'never' and
  // recreated the /page vs /page/ duplicate-indexing problem in GSC.
  build: { format: 'file' },
  redirects: {
    // Legacy slug fixes — many internal links point to slugs that don't
    // resolve to a page. Audit found 50+ broken cross-links. These 301s
    // preserve any organic SEO value and prevent in-app 404s.
    // Point straight at the final target (/classroom-picker) instead of
    // /team-generator, which is itself 301'd -> avoids a 301->301 chain.
    '/random-team-selector': '/classroom-picker',
    '/yes-or-no-wheel': '/yes-no-wheel',
    '/random-number-generator': '/random-number-picker',
    // /coin-flip is now its own dedicated EN page (src/pages/coin-flip.astro)
    // hreflang-paired with /pile-ou-face (FR), so no redirect needed.
    '/random-decision-maker': '/decision-wheel',
    '/random-winner-picker': '/giveaway-picker',
    // Removed 2026-05-30 (trademark risk: Warner/Harry Potter IP). 301 to the
    // themed-wheel gallery so the old URLs don't 404.
    '/harry-potter-wheel': '/templates',
    '/magical-creature-wheel': '/templates',
  },
  integrations: [
    react(),
    tailwind({
      configFile: './tailwind.config.ts',
      applyBaseStyles: false,
    }),
    // NOTE: @astrojs/sitemap intentionally removed. It generated an orphan
    // sitemap-index.xml/sitemap-0.xml (not referenced by robots.txt) that could
    // expose divergent URLs to Google. The single authoritative sitemap is
    // dist/sitemap.xml, produced by scripts/generate-sitemap.mjs (postbuild)
    // with curated priorities, and declared in public/robots.txt.
    AstroPWA({
      // Auto-update: the SW silently fetches a new build and swaps it on the
      // next navigation — no update prompt UI needed for a stateless tool.
      registerType: 'autoUpdate',
      // We register the SW ourselves in Layout.astro via virtual:pwa-register
      // (immediate), so disable the integration's auto-injected <script>.
      injectRegister: false,
      manifest: {
        name: 'Real Wheel Picker',
        short_name: 'Wheel Picker',
        description: 'Free random name picker wheel — spin to pick winners, teams or decisions.',
        // standalone = launches chrome-less like a native app (key for the
        // "installable" retention goal and the stream/presenter use case).
        display: 'standalone',
        start_url: '/',
        scope: '/',
        // Match the existing <meta name="theme-color"> in Layout.astro and the
        // dark gradient background of the app shell.
        theme_color: '#0a0f1a',
        background_color: '#0a0f1a',
        orientation: 'any',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
          // Reuse the 512 as maskable so Android adaptive icons don't crop the
          // logo (the asset has enough padding to act as a safe-zone maskable).
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // build.format:'file' emits flat *.html files. The default globPatterns
        // only precaches css/js/html — widen it so the full app shell (icons,
        // fonts, svg) is available offline.
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2}'],
        // Static export can ship many small HTML pages; lift the per-file cap so
        // large precache entries (e.g. og images) are not silently skipped.
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        navigateFallback: '/index.html',
        cleanupOutdatedCaches: true,
      },
      // Keep the SW active in `astro dev` so PWA wiring can be verified locally.
      devOptions: {
        enabled: false,
      },
    }),
  ],
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
});
