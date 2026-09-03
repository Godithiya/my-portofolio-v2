/**
 * Header Doc
 * Tujuan    : Konfigurasi build Astro — integrasi (MDX, sitemap, icon), plugin
 *             Tailwind v4 (Vite), dan site URL untuk canonical/sitemap/RSS/OG.
 * Caller    : Astro CLI (`astro dev`, `astro build`) — dibaca otomatis saat build.
 * Dependensi: @astrojs/mdx, @astrojs/sitemap, astro-icon, @tailwindcss/vite
 * Main Functions: export default defineConfig (tanpa fungsi custom)
 * Side Effects: `site` membaca env SITE_URL saat build. Production build TANPA
 *               SITE_URL akan mencetak warning — jangan diabaikan saat deploy.
 *               Shiki dual-theme: code block light by default, dark via CSS.
 */

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

import tailwindcss from '@tailwindcss/vite';

const siteUrl = process.env.SITE_URL || 'http://localhost:4321';

if (!process.env.SITE_URL && process.env.NODE_ENV === 'production') {
  console.warn(
    '\n[WARNING] Env SITE_URL tidak di-set — canonical/og:url/sitemap/RSS akan\n' +
      'memakai http://localhost:4321. Set SITE_URL sebelum deploy production!\n'
  );
}

export default defineConfig({
  site: siteUrl,
  integrations: [mdx(), sitemap(), icon()],
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-default' },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
