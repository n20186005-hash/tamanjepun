import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Satu-satunya tempat untuk menetapkan URL produksi.
// GSC menunjukkan klik masuk melalui http://tamanjepun.com — canonical HTTPS wajib diterbitkan.
const site = 'https://tamanjepun.com';

export default defineConfig({
  site: site || undefined,
  output: 'static',
  integrations: site
    ? [
        sitemap({
          // Sitemap turut menerbitkan xhtml:link alternates supaya Google tahu
          // / , /en/ dan /zh/ ialah tiga versi bahasa bagi halaman yang sama.
          i18n: {
            defaultLocale: 'ms',
            locales: {
              ms: 'ms-MY',
              en: 'en-MY',
              zh: 'zh-Hans'
            }
          }
        })
      ]
    : [],
  vite: {
    plugins: [tailwindcss()]
  }
});
