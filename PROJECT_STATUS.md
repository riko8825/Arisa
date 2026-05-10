# PROJECT_STATUS.md — Arisa in WonderDolls

> Live status. Atnaujinama po kiekvienos sesijos (žr. `/close-session`).
> Last updated: 2026-05-10

## OVERALL

**Phase:** P1 — Foundation & Core Pages
**Production:** ⬜ Not deployed
**Domain:** ⬜ Not registered (proposed: `arisainwonderdolls.com`)
**Repo:** https://github.com/riko8825/Arisa
**Branch:** `main` (auto-deploy enabled jei prijungta prie Vercel)

---

## PAGES

| Page | File | Structure | Copy | Real images | SEO meta | Schema | Mobile QA | Status |
|---|---|---|---|---|---|---|---|---|
| Home | `index.html` | ✅ | ⚠️ placeholder | ⬜ | ✅ | ✅ Store | ⬜ | 60% |
| Nursery | `shop.html` | ✅ | ⚠️ placeholder | ⬜ | ⬜ | ⬜ ItemList | ⬜ | 40% |
| Product | `product.html` | ✅ | ⚠️ placeholder | ⬜ | ⬜ | ⬜ Product | ⬜ | 40% |
| Portfolio | `gallery.html` | ✅ | ⚠️ placeholder | ⬜ | ⬜ | ⬜ ImageGallery | ⬜ | 35% |
| Atelier | `about.html` | ✅ | ⚠️ placeholder | ⬜ | ⬜ | ⬜ AboutPage | ⬜ | 35% |
| Adoption | `contact.html` | ✅ | ⚠️ placeholder | ⬜ | ⬜ | ⬜ ContactPage | ⬜ | 35% |
| Privacy | `privacy.html` | ✅ | ⚠️ template | n/a | ⬜ | ⬜ | ⬜ | 50% |
| Terms | `terms.html` | ✅ | ⚠️ template | n/a | ⬜ | ⬜ | ⬜ | 50% |

**Legend:** ✅ done · ⚠️ partial · ⬜ todo · n/a not applicable

---

## ASSETS

| Asset | Status | Notes |
|---|---|---|
| `assets/css/styles.css` | ✅ | Editorial atelier stylesheet, responsive, ~600 lines |
| `assets/js/main.js` | ✅ | Mobile menu, reveal, toast, chips, thumbs |
| `assets/js/cart.js` | ✅ | localStorage cart with drawer |
| `assets/favicon.svg` | ✅ | SVG monogram (primary favicon) |
| `assets/img/logo.jpg` | ✅ | Real logo from Arisa, 45 KB, used everywhere |
| `assets/img/products/` | ⬜ | Need 20 doll photos from Arisa |
| `assets/img/gallery/` | ⬜ | Need atelier + behind-the-scenes shots |
| `assets/img/og/` | ⚠️ | Using logo.jpg as OG fallback — need 1200×630 dedicated OG |
| Logo SVG/PNG transparent | ⬜ | Phase 2 ask Arisa — current JPG has white bg |

---

## AUTOMATIONS

| # | Automation | Status | Endpoint | Notes |
|---|---|---|---|---|
| 1 | Lead capture (contact form) | ⬜ TODO | `api/lead-capture.ts` | Resend → arisainwonderdolls@gmail.com |
| 2 | Reserve doll (cart submit) | ⬜ TODO | `api/reserve.ts` | Email Arisai su doll details + buyer info |
| 3 | Newsletter subscribe | ⬜ Phase 3 | `api/newsletter.ts` | Resend audiences |
| 4 | AI lead scoring | ⬜ Phase 2 | `api/lead-score.ts` | Claude API → kategorizuoja lead intent |
| 5 | Sitemap generator | ⬜ TODO | static `sitemap.xml` | Manual update kol mažai puslapių |

---

## CONTENT (`content/` JSON files)

| File | Status | Notes |
|---|---|---|
| `content/products.json` | ⬜ TODO | Placeholder schema sukurta, 20 dolls structure |
| `content/testimonials.json` | ⬜ TODO | Phase 1 — 3-5 placeholder, Phase 2 — real iš Arisa |
| `content/faq.json` | ⬜ TODO | Adoption process, shipping, care, returns |

---

## DOCS

| Doc | Status |
|---|---|
| `CLAUDE.md` | ✅ |
| `docs/brand.md` | ✅ |
| `docs/content-guidelines.md` | ✅ |
| `docs/seo-checklist.md` | ✅ |
| `docs/automation-standards.md` | ✅ |
| `docs/deployment.md` | ✅ |
| `docs/client-references.md` | ✅ |

---

## DEPLOYMENT

| Step | Status |
|---|---|
| GitHub repo | ✅ Connected (`riko8825/Arisa`) |
| Vercel project linked | ⬜ TODO |
| Domain registered | ⬜ TODO |
| DNS configured | ⬜ TODO |
| `.env` configured Vercel'yje | ⬜ TODO (after first automation) |
| Lighthouse audit | ⬜ TODO |
| Core Web Vitals pass | ⬜ TODO |
| Production live | ⬜ TODO |

---

## KNOWN ISSUES

- **Doll product data** — visi 4 hero dolls (`index.html`) yra hardcoded HTML'e. Reikia perkelti į `content/products.json` ir build/render workflow (arba palikti kaip yra, jei vanilla — manual update).
- **OG image** — `assets/og.png` referenced HTML'e, bet failo nėra. Reikia sukurti.
- **Forms be backend** — visos formos dabar tik `event.preventDefault()` su toast. Reikia įjungti `api/lead-capture.ts`.

---

## NEXT SPRINT (recommended order)

1. Setup `.env.example` + Vercel project link
2. `content/products.json` su 20 dolls schema (placeholder data)
3. `api/lead-capture.ts` + Resend integration
4. Per-page SEO meta + schema.org (`/seo-tekstai` skill)
5. Mobile audit (`/mobilios-versijos` skill)
6. Lighthouse audit + Core Web Vitals fix
7. Vercel deploy preview → Arisa review
8. Production deploy
