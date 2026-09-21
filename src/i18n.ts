export const locales = ['ms', 'en', 'zh'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ms';

export const localeMeta: Record<Locale, { htmlLang: string; ogLocale: string; hreflang: string; shortLabel: string }> = {
  ms: { htmlLang: 'ms', ogLocale: 'ms_MY', hreflang: 'ms-MY', shortLabel: 'MS' },
  en: { htmlLang: 'en', ogLocale: 'en_MY', hreflang: 'en-MY', shortLabel: 'EN' },
  zh: { htmlLang: 'zh-Hans', ogLocale: 'zh_CN', hreflang: 'zh-Hans', shortLabel: '中文' }
};

/**
 * Peta laluan bagi setiap halaman. Kekunci yang sama digunakan oleh
 * hreflang, penukar bahasa, breadcrumb dan sitemap — jadi ms / en / zh
 * sentiasa saling menunjuk ke halaman yang sepadan, bukan ke laman utama.
 */
export const routes = {
  home: { ms: '/', en: '/en/', zh: '/zh/' },
  tickets: { ms: '/tiket-masuk/', en: '/en/ticket-price/', zh: '/zh/ticket-price/' },
  transport: { ms: '/cara-ke-sana/', en: '/en/how-to-get-here/', zh: '/zh/how-to-get-here/' },
  photos: { ms: '/foto-kimono/', en: '/en/photos-kimono/', zh: '/zh/photos-kimono/' }
} as const;

export type RouteKey = keyof typeof routes;

export const routeKeys: RouteKey[] = ['home', 'tickets', 'transport', 'photos'];

export function pathFor(route: RouteKey, locale: Locale): string {
  return routes[route][locale];
}

/** Senarai alternatif untuk <link rel="alternate" hreflang="..."> termasuk x-default. */
export function alternatesFor(route: RouteKey) {
  const list = locales.map((locale) => ({ hreflang: localeMeta[locale].hreflang, path: pathFor(route, locale) }));
  return [...list, { hreflang: 'x-default', path: pathFor(route, defaultLocale) }];
}
