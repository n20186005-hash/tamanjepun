# Taman Jepun Bukit Tinggi

Single-page tourism guide built with Astro + Tailwind CSS + TypeScript for deployment as static assets on Cloudflare Workers.

## Runtime pins
- Node.js: `24.19.0` (`.node-version` + `engines`)
- pnpm: `9.15.5` (`packageManager`)
- Astro: `7.2.0`
- Tailwind CSS: `4.3.3`
- TypeScript: `5.9.3` (inside `@astrojs/check@0.9.10` peer range `^5 || ^6`)

## Domain / site URL
The site URL is configured in **one place only**: the `const site = '';` value used by Astro's `site` option in `astro.config.mjs`.

Without a domain, keep `const site = '';` and run `pnpm build`. The build still works; canonical / absolute OG URL / sitemap are gracefully omitted or relative.

When the real domain is ready, fill only that value in `astro.config.mjs`, then rebuild. `@astrojs/sitemap` is enabled only when `site` has a real value.

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
