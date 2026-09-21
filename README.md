# Taman Jepun Bukit Tinggi

Multi-language visitor guide (3 locales × 4 pages) built with Astro + Tailwind CSS + TypeScript for deployment as static assets on Cloudflare Workers.

## Runtime pins
- Node.js: `24.19.0` (`.node-version` + `engines`)
- pnpm: `9.15.5` (`packageManager`)
- Astro: `7.2.0`
- Tailwind CSS: `4.3.3`
- TypeScript: `5.9.3` (inside `@astrojs/check@0.9.10` peer range `^5 || ^6`)

## Domain / site URL
Production domain: **https://tamanjepun.com**

The site URL is configured in **one place only**: the `const site = 'https://tamanjepun.com';` value used by Astro's `site` option in `astro.config.mjs`.

Because `site` is set, the build emits:
- `<link rel="canonical">` + absolute `og:url` / `og:image`
- `hreflang` alternates for every page (including `x-default`)
- `sitemap-index.xml` (via `@astrojs/sitemap`) with `xhtml:link` alternates, plus a `Sitemap:` line in `robots.txt`

If you ever need to build without a domain, set `const site = '';` — the build still works and canonical / sitemap / alternate / absolute OG URLs are gracefully omitted.

## Languages & routes
Three locales share the same facts and the same page keys, so every page points at its own translations:

| Page key | ms (default) | en | zh |
| --- | --- | --- | --- |
| `home` | `/` | `/en/` | `/zh/` |
| `tickets` | `/tiket-masuk/` | `/en/ticket-price/` | `/zh/ticket-price/` |
| `transport` | `/cara-ke-sana/` | `/en/how-to-get-here/` | `/zh/how-to-get-here/` |
| `photos` | `/foto-kimono/` | `/en/photos-kimono/` | `/zh/photos-kimono/` |

Where things live:
- `src/i18n.ts` — locales, `htmlLang` / `og:locale` / `hreflang` codes, and the `routes` map used by canonical, hreflang, breadcrumbs, nav and the language switcher.
- `src/content/<locale>.ts` — all copy for a language (hero, sections, FAQ, and the three guide articles), typed by `src/content/types.ts`.
- `src/data/site.ts` — language-neutral facts (NAP, geo, opening hours, prices, rating, images, map links). Edit here, not in the locale files, whenever a price or phone number changes.
- `src/lib/schema.ts` + `src/lib/page.ts` — JSON-LD builders (`TouristAttraction`, `FAQPage`, `BreadcrumbList`).
- `src/layouts/BaseLayout.astro` — head (TDK, canonical, hreflang, OG, JSON-LD, hero preload), header, footer.
- `src/components/sections/*.astro` — the page sections shared by all three home pages.

Adding a language = add a locale to `src/i18n.ts`, add `src/content/<locale>.ts`, and add the four page files under `src/pages/<prefix>/`.

## SEO conventions
- **Title / description** per locale live in `content.meta` (home) and `content.articles.<key>` (guides). They are written for click-through, not just for naming the place: price, hours and the main intent are in the first 60 characters.
- **JSON-LD**: `TouristAttraction` (rating 4.0 / 9,930 reviews, opening hours 08:00–22:00, price range, geo, `hasMap`) + `FAQPage` on the home pages; `FAQPage` + `BreadcrumbList` on the guide pages. Update `reviewCount` in `src/data/site.ts` when the Google Maps count changes.
- The `TouristAttraction` `@id` is pinned to the ms (default locale) URL, so the three language versions describe one entity rather than three.
- NAP consistency (Name / Address / Phone) is rendered from `src/data/site.ts` in both the footer and the schema — never hard-code it in a page.
- Mobile-first: >90% of impressions come from mobile, so the hero image is preloaded and eager while every other image stays `loading="lazy"`.

## HTTPS enforcement (HTTP → HTTPS)
Search Console showed clicks landing on `http://tamanjepun.com/`, so the HTTP variant must stop serving content:

1. Cloudflare dashboard → **SSL/TLS → Edge Certificates → Always Use HTTPS: On** (this performs the 301 from HTTP to HTTPS at the edge).
2. `public/_headers` ships `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` plus `nosniff` / `Referrer-Policy`. It is copied into `dist/_headers` on every build and applied by Cloudflare Workers static assets.
3. Keep all internal links, the canonical and the sitemap on the HTTPS origin (this is guaranteed by `astro.config.mjs` + `src/i18n.ts`).
4. In Search Console, verify the **HTTPS** property (`https://tamanjepun.com/`) owns the sitemap, and use URL Inspection → Request Indexing on the HTTPS home page after the redirect is live.

## 404 handling
`wrangler.jsonc` uses `"not_found_handling": "404-page"`, and `src/pages/404.astro` renders `dist/404.html`. Unknown URLs return a real 404 instead of the SPA fallback (which previously returned 200 with the homepage — a soft-404 risk).

## Commands
```bash
corepack enable
CI=1 corepack pnpm install --frozen-lockfile
pnpm check
pnpm build
pnpm deploy
```

`pnpm deploy` pins Wrangler at `4.95.0` via `pnpm dlx` and deploys `./dist` as Cloudflare Worker static assets using `wrangler.jsonc`.

On Windows, install with the standalone pnpm and a clean environment (the sandbox shim breaks deletes inside `node_modules`):

```powershell
$env:NODE_OPTIONS = ""; $env:CODEBUDDY_SAFE_DELETE_SHIM_DIR = ""; $env:GENIE_TRASH_DIR = ""
$env:PATH = "C:\Users\dcc\.workbuddy\binaries\node\versions\node-v24.19.0-win-x64;$env:PATH"
node $env:LOCALAPPDATA\pnpm\.tools\pnpm\9.15.5\node_modules\pnpm\bin\pnpm.cjs install --config.node-linker=hoisted
node node_modules\astro\bin\astro.mjs build
```

## Notes
- No database, login or CMS.
- GA4 ID: `G-HXM22WWPKP` (set once in `src/data/site.ts`).
- Google Maps embed is localized to Malay / Malaysia (`ms`, `my`).
- `pnpm-workspace.yaml` is intentionally not used for this single-package project.
- A full build emits 13 HTML files (12 pages + `404.html`) and takes roughly 1½ minutes locally.
