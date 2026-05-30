import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
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
  ],
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
});
