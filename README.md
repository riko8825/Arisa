# Arisa in WonderDolls

E-commerce + portfolio website for a one-woman reborn doll atelier.

> **Working with Claude Code on this repo?** Read [`CLAUDE.md`](./CLAUDE.md) first — it's the single source of truth for project rules, brand, and tech decisions.

## Pages

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Hero, featured dolls, story, process |
| Nursery | `shop.html` | Product grid + filters |
| Product | `product.html` | Doll detail page |
| Portfolio | `gallery.html` | Past work masonry |
| The Atelier | `about.html` | Arisa's story, materials, process |
| Adoption | `contact.html` | Contact form, response time, shipping |
| Privacy | `privacy.html` | Privacy notice |
| Terms | `terms.html` | Terms & conditions |

## Stack

- Vanilla HTML / CSS / JS — zero build step
- Cormorant Garamond + Inter + JetBrains Mono (Google Fonts)
- Vercel hosting + Edge Functions (TypeScript) where needed
- Resend for transactional email
- localStorage cart, JSON-LD schema, sitemap.xml + robots.txt
- Mobile-first, Core Web Vitals conscious

## Repo structure

```
.
├── CLAUDE.md                  Project SSOT for AI agents
├── PROJECT_STATUS.md          Live progress matrix
├── SESSION_STATUS.md          Current session snapshot
├── DECISION_LOG.md            Architecture decisions
├── README.md                  This file
│
├── *.html                     8 static pages
├── robots.txt, sitemap.xml, vercel.json
│
├── assets/
│   ├── css/styles.css
│   ├── js/{main,cart}.js
│   ├── img/{products,gallery,og}/
│   └── favicon.svg
│
├── api/                       Vercel Edge Functions
│   ├── lead-capture.ts
│   └── _lib/{json,cors,validate,resend}.ts
│
├── content/                   Structured content (JSON)
│   ├── products.json
│   ├── testimonials.json
│   └── faq.json
│
├── docs/                      Agency docs
│   ├── brand.md
│   ├── content-guidelines.md
│   ├── seo-checklist.md
│   ├── automation-standards.md
│   ├── deployment.md
│   └── client-references.md
│
├── .env.example
└── .gitignore
```

## Local dev

Serve the folder with any static server (VS Code Live Server works):

```bash
# option 1: Vercel CLI (recommended — also runs Edge Functions)
npm i -g vercel
vercel dev

# option 2: any static server
npx serve .
# or open index.html via Live Server in VS Code
```

## Deploy

Push to `main` → Vercel auto-deploys.

```bash
git push origin main
```

Pre-deploy checklist: [`docs/deployment.md`](./docs/deployment.md)

## Environment

Copy [`.env.example`](./.env.example) → `.env.local` for dev. Production secrets live in Vercel dashboard.

## License

Proprietary — Empirra × Arisa in WonderDolls. All rights reserved.
