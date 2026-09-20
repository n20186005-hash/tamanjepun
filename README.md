# Taman Jepun Bukit Tinggi

Single-page tourism guide built with Astro + Tailwind CSS + TypeScript for deployment as static assets on Cloudflare Workers.

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
- `sitemap-index.xml` (via `@astrojs/sitemap`) and a `Sitemap:` line in `robots.txt`

If you ever need to build without a domain, set `const site = '';` — the build still works and canonical / sitemap / absolute OG URLs are gracefully omitted.

## HTTPS enforcement (HTTP → HTTPS)
Search Console showed clicks landing on `http://tamanjepun.com/`, so the HTTP variant must stop serving content:

1. Cloudflare dashboard → **SSL/TLS → Edge Certificates → Always Use HTTPS: On** (this performs the 301 from HTTP to HTTPS at the edge).
2. `public/_headers` ships `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` plus `nosniff` / `Referrer-Policy`. It is copied into `dist/_headers` on every build and applied by Cloudflare Workers static assets.
3. Keep all internal links and the canonical on the HTTPS origin.

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

## Notes
- No database, login or CMS.
- GA4 ID: `G-HXM22WWPKP`.
- Google Maps embed is localized to Malay / Malaysia (`ms`, `my`).
- `pnpm-workspace.yaml` is intentionally not used for this single-package project.
- JSON-LD: `TouristAttraction` (rating 4.0 / 9,930 reviews, opening hours 08:00–22:00, price range, geo, `hasMap`) + `FAQPage`. Update `reviewCount` when the Google Maps count changes.
- NAP consistency (Name / Address / Phone) is maintained in the page footer and in the `TouristAttraction` schema — edit both together.
- Mobile-first: >90% of impressions come from mobile; keep the hero image eager and all other imagery `loading="lazy"`.
