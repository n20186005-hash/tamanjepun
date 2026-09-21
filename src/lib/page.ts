import { FACTS } from '../data/site';
import { defaultLocale, pathFor, type Locale } from '../i18n';
import type { ArticleKey, Content } from '../content/types';
import { attractionSchema, breadcrumbSchema, faqSchema } from './schema';

function absolute(site: URL | undefined, path: string): string {
  return site ? new URL(path, site).toString() : path;
}

/** JSON-LD laman utama: entiti TouristAttraction + FAQ yang benar-benar dipaparkan. */
export function homeJsonLd(site: URL | undefined, locale: Locale, t: Content) {
  const url = absolute(site, pathFor('home', locale));
  const image = absolute(site, FACTS.images.garden.src);
  const entityId = `${absolute(site, pathFor('home', defaultLocale))}#attraction`;
  return [attractionSchema({ url, image, id: entityId, description: t.meta.description }), faqSchema(t.faq.items)];
}

/** JSON-LD halaman panduan: FAQ khusus halaman + breadcrumb untuk navigasi. */
export function articleJsonLd(site: URL | undefined, locale: Locale, t: Content, key: ArticleKey) {
  const article = t.articles[key];
  const homeUrl = absolute(site, pathFor('home', locale));
  const url = absolute(site, pathFor(key, locale));
  return [
    faqSchema(article.faq),
    breadcrumbSchema([
      { name: t.labels.breadcrumbHome, url: homeUrl },
      { name: article.h1, url }
    ])
  ];
}
