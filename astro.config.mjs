import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import path from 'path';
import { fileURLToPath } from 'url';

import cloudflare from "@astrojs/cloudflare";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  output: 'static',
  site: 'https://realwheelpicker.com',
  trailingSlash: 'never',

  redirects: {
    '/random-team-selector': '/team-generator',
  },

  integrations: [
    react(),
    tailwind({
      configFile: './tailwind.config.ts',
      applyBaseStyles: false,
    }),
  ],

  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },

  adapter: cloudflare()
});