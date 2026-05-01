import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  output: 'static',
  site: 'https://realwheelpicker.com',
  trailingSlash: 'never',
  redirects: {
    // Legacy slug fixes — many internal links point to slugs that don't
    // resolve to a page. Audit found 50+ broken cross-links. These 301s
    // preserve any organic SEO value and prevent in-app 404s.
    '/random-team-selector': '/team-generator',
    '/yes-or-no-wheel': '/yes-no-wheel',
    '/random-number-generator': '/random-number-picker',
    '/coin-flip': '/pile-ou-face',           // EN slug missing, FR page exists; TODO: build dedicated EN page
    '/random-decision-maker': '/decision-wheel',
    '/random-winner-picker': '/giveaway-picker',
  },
  integrations: [
    react(),
    tailwind({
      configFile: './tailwind.config.ts',
      applyBaseStyles: false,
    }),
    sitemap({
      filter: (page) =>
        !page.includes('/404') &&
        !page.includes('/embed'),
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
