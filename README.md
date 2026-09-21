# Revenant Marketing Website

Public site for **revenant.dev** — homepage, pricing, CLI docs, and open-source Toast component showcase.

Separate from `revenant-cloud-web` (the authenticated dashboard at `app.revenant.dev`).

## Develop

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Build

```bash
cp .env.example .env.production   # optional — defaults work for local build
npm run build
# static output in dist/
```

## Deploy

Serve `dist/` on `https://revenant.dev` (Vercel, Netlify, Cloudflare Pages, or nginx).

```bash
# .env.production
VITE_SITE_URL=https://revenant.dev
VITE_APP_URL=https://revenant-cloud-web.web.app
VITE_API_URL=https://revenant-api-171384186168.asia-south1.run.app
```

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Homepage — 3D logo hero, demos, CLI, pricing |
| `/docs` | Documentation (cloud-web light theme) |
| `/docs/:section/:module` | Individual doc pages |
| `/pricing` | Full plan comparison |
| `/talk` | Contact form → API → email |
| `/coffee` | Support / buy coffee form |

## Adding docs (no UI code changes)

1. Create `src/content/docs/sections/your-section.ts` exporting a `DocSection`
2. Import it in `src/content/docs/index.ts` and add to `DOC_SECTIONS`

Each module is `{ slug, title, summary, blocks[] }` with block types:
`paragraph`, `heading`, `code`, `list`, `callout`.

## Design

See [`docs/FIGMA_DESIGN_PROMPT.md`](docs/FIGMA_DESIGN_PROMPT.md) for copy-paste Figma AI prompts (shield / Aegis theme).
