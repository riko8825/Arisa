# PROJECT_STATUS.md — Arisa in WonderDolls

> Live status. Atnaujinama po kiekvienos sesijos (žr. `/close-session`).
> Last updated: 2026-05-10 (post close-session)

## OVERALL

**Phase:** P1 — Foundation & Core Pages (60% — visual layer done, integrations + content pending)
**Pabaigtumas:** 22% (1/5 MVP modulių production-ready)
**Production:** ⚠️ Preview live `https://arisa-gules.vercel.app/` — ne owned domain
**Domain:** ⬜ Not registered (proposed: `arisainwonderdolls.com`)
**Repo:** https://github.com/riko8825/Arisa
**Branch:** `main` (auto-deploy aktyvus į arisa-gules.vercel.app)

---

## PAGES

| Page | File | Structure | Copy | Real images | SEO meta | Schema | Mobile QA | Status |
|---|---|---|---|---|---|---|---|---|
| Home | `index.html` | ✅ | ⚠️ placeholder | ⬜ logo only | ✅ | ✅ Store+founder | ⬜ | 65% |
| Nursery | `shop.html` | ✅ | ⚠️ placeholder | ⬜ | ⬜ | ⚠️ ItemList partial | ⬜ | 45% |
| Product | `product.html` | ✅ | ⚠️ placeholder | ⬜ | ⬜ | ⚠️ Product partial | ⬜ | 45% |
| Portfolio | `gallery.html` | ✅ | ⚠️ placeholder | ⬜ | ⬜ | ⬜ ImageGallery | ⬜ | 35% |
| Atelier | `about.html` | ✅ | ⚠️ placeholder | ⬜ | ⬜ | ⚠️ Person partial | ⬜ | 40% |
| Adoption | `contact.html` | ✅ | ⚠️ placeholder | ⬜ | ⬜ | ⬜ ContactPage | ⬜ | 35% |
| Privacy | `privacy.html` | ✅ | ✅ legal copy | n/a | ⬜ | ⬜ | ⬜ | 60% |
| Terms | `terms.html` | ✅ | ✅ legal copy | n/a | ⬜ | ⬜ | ⬜ | 60% |

**Legend:** ✅ done · ⚠️ partial · ⬜ todo · n/a not applicable

---

## ASSETS

| Asset | Status | Notes |
|---|---|---|
| `assets/css/styles.css` | ✅ | Editorial atelier stylesheet, responsive, ~620 lines |
| `assets/js/main.js` | ✅ | Mobile menu, reveal, toast, chips, thumbs |
| `assets/js/cart.js` | ✅ | localStorage cart with drawer |
| `assets/favicon.svg` | ✅ | SVG monogram (primary favicon) |
| `assets/img/logo.jpg` | ✅ | Trimmed logo, 600×337, 38 KB. Cache-bust `?v=2` aktyvus. |
| `assets/img/products/` | ⬜ | Need 20 doll photos from Arisa (folder yra, tuščias) |
| `assets/img/gallery/` | ⬜ | Need atelier + behind-the-scenes shots (folder yra, tuščias) |
| `assets/img/og/` | ⚠️ | Using logo.jpg as OG fallback — need dedicated 1200×630 OG |
| Logo SVG/PNG transparent | ⬜ | Phase 2 ask Arisa — current JPG has white bg, riboja darkbg use |

---

## AUTOMATIONS

| # | Automation | Status | Endpoint | Notes |
|---|---|---|---|---|
| 1 | Lead capture (contact form) | 🟡 In Build (skeleton, not wired) | `api/lead-capture.ts` | Code parašyta, env vars + frontend wire-up + smoke test reikia |
| 2 | Reserve doll (cart submit) | ⬜ Planned | `api/reserve.ts` | Endpoint dar neparašytas |
| 3 | Newsletter subscribe | ⬜ Phase 3 | `api/newsletter.ts` | Resend audiences |
| 4 | AI lead scoring | ⬜ Phase 2 | `api/lead-score.ts` | Claude API → kategorizuoja lead intent |
| 5 | Sitemap generator | ✅ Production (static) | `sitemap.xml` | Manual update — yra repo'je, deploy'inta |

**Pabaigtumas skaičiavimas:**
- #1 Lead capture: 0.3 (In Build)
- #2 Reserve: 0.0 (Planned)
- #3 Newsletter: 0.0 (Phase 3 Planned)
- #4 AI scoring: 0.0 (Phase 2 Planned)
- #5 Sitemap: 1.0 (Production)
- **Total: 1.3 / 5 = 26%** (artimas 22% MVP scope skaičiavimui — MVP excluding Phase 2/3 = 1.3/3 = 43%, bet su Phase 2/3 įtrauktais = 26%)

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
| Vercel project linked | ⚠️ Auto-deploy live į `arisa-gules.vercel.app` — ownership unclear, reikia patvirtinti |
| Domain registered | ⬜ TODO (`arisainwonderdolls.com`) |
| DNS configured | ⬜ TODO |
| `.env` configured Vercel'yje | ⬜ TODO (RESEND_API_KEY, LEAD_CAPTURE_SECRET) |
| Lighthouse audit | ⬜ TODO |
| Core Web Vitals pass | ⬜ TODO |
| Production live | ⬜ TODO (preview yra) |

---

## KNOWN ISSUES

- **Doll product data** — visi 4 hero dolls (`index.html`) yra hardcoded HTML'e. Reikia perkelti į `content/products.json` ir build/render workflow (arba palikti kaip yra, jei vanilla — manual update).
- ✅ ~~OG image — `assets/og.png` referenced HTML'e, bet failo nėra.~~ Pakeista į `assets/img/logo.jpg?v=2`. Phase 2 — sukurti dedicated 1200×630 OG.
- **Forms be backend** — visos formos dabar tik `event.preventDefault()` su toast. `api/lead-capture.ts` skeleton parašyta, bet **nesujungta su contact.html** ir Vercel env vars nesukonfigūruoti.
- **Vercel project ownership** — `arisa-gules.vercel.app` veikia, bet neaišku, kas valdo. Reikia `vercel link` arba sukurti naują project su geresniu URL.
- **Logo white background** — current JPG turi white bg. Veikia ant porcelain/whisper section'ų, bet ant blush/cream/dark — riboja layout pasirinkimus. Phase 2 — paprašyti Arisa transparent PNG/SVG.
- **Cache propagation** — Vercel `assets/*` turi `max-age=31536000, immutable`. Kiekvienas asset edit reikalauja `?v=N` cache-bust ant HTML reference'o. Dabar `?v=2` aktyvus.
- **Schema.org rich results** — Store schema neturi pilno address (tik `addressCountry: EU`). Local SEO ir Google rich result optimization Phase 2.

---

## NEXT SPRINT (recommended order)

1. **Email Arisai** — kickoff confirmation + reikalingi assets (transparent logo, doll photos, IBAN, founding year confirm) + preview link
2. **Vercel project ownership** — `vercel link` arba naujas project su `arisainwonderdolls.com` jau registracijoje
3. **`api/lead-capture.ts` integracija** — wire į contact.html, Vercel env vars (RESEND_API_KEY, LEAD_CAPTURE_SECRET), smoke test su realiu submit
4. **Per-page SEO meta + schema.org** — visi 8 puslapiai (`/seo-tekstai` skill)
5. **Mobile audit** — `/mobilios-versijos` skill
6. **Lighthouse audit** — Core Web Vitals fix
7. **Real content** — kai gausim iš Arisos: doll photos → `assets/img/products/`, real testimonials → `content/testimonials.json`
8. **Production deploy** — domain + DNS
