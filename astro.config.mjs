// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { SITE_URL } from './src/data/site.ts';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    // /about/index.html → clean "/about/" URLs on Hostinger without rewrites
    format: 'directory',
    // ~13 KB gzipped: inlining saves a render-blocking round trip on first visit
    inlineStylesheets: 'always',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ur'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    {
      // Hydrate an island on the visitor's first interaction (keeps React off the critical path).
      name: 'client-interaction',
      hooks: {
        'astro:config:setup': ({ addClientDirective }) => {
          addClientDirective({ name: 'interaction', entrypoint: './src/lib/interaction-directive.js' });
        },
      },
    },
    react(),
    sitemap({
      filter: (page) => !page.includes('/404'),
      i18n: { defaultLocale: 'en', locales: { en: 'en-PK', ur: 'ur-PK' } },
    }),
  ],
  image: {
    // never upscale; client photos are small
    layout: 'constrained',
  },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  vite: {
    plugins: [tailwindcss()],
  },
});
