import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Satu-satunya tempat untuk menetapkan URL produksi.
// GSC menunjukkan klik masuk melalui http://tamanjepun.com — canonical HTTPS wajib diterbitkan.
const site = 'https://tamanjepun.com';

export default defineConfig({
  site: site || undefined,
  output: 'static',
  integrations: site ? [sitemap()] : [],
  vite: {
    plugins: [tailwindcss()]
  }
});
