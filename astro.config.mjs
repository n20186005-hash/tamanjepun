import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { routes, locales, localeMeta } from './src/i18n.ts';
const site = 'https://tamanjepun.com';
export default defineConfig({
  site,
  output: 'static',
  integrations: [sitemap({
    serialize(item) {
      const family = Object.values(routes).find(group => Object.values(group).some(path => new URL(path, site).href === item.url));
      if (family) item.links = [
        ...locales.map(locale => ({ lang: localeMeta[locale].hreflang, url: new URL(family[locale], site).href })),
        { lang: 'x-default', url: new URL(family.ms, site).href }
      ];
      return item;
    }
  })],
  vite: { plugins: [tailwindcss()] }
});
