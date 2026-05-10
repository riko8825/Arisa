# PROJECT_STATUS.md — Arisa in WonderDolls

> Live status. Atnaujinama po kiekvienos sesijos (žr. `/close-session`).
> Last updated: 2026-05-10 (post close-session, naktis #4 — commits + push'inta)

## OVERALL

**Phase:** P1 — Foundation & Core Pages (80% — visual + photo content + consent + TH localization done; integrations + i18n pending)
**Pabaigtumas:** ~78% (svetainės content layer)
**Production:** ⚠️ Preview live `https://arisa-gules.vercel.app/` — ne owned domain
**Domain:** ⬜ Not registered (proposed: `arisainwonderdolls.com`)
**Repo:** https://github.com/riko8825/Arisa
**Branch:** `migrated-from-onedrive` @ `a99c22b` (active dev, push'inta) — 4 commits ahead of `main`. `main` (`22f6abb`) vis dar mapped į Vercel auto-deploy → preview rodo seną state.
**Locale:** Thailand (atelier), THB currency, EN copy. FX €→฿ ×38, kainos suapvalintos iki 500 THB.

---

## PAGES

| Page | File | Structure | Copy | Real images | SEO meta | Schema | Consent | FAB | Mobile QA | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| Home | `index.html` | ✅ | ⚠️ placeholder | ✅ 11 photos | ✅ | ✅ Store+founder (TH/THB) | ✅ | ✅ | ⬜ | 80% |
| Nursery | `shop.html` | ✅ | ⚠️ placeholder | ✅ 9 photos | ⬜ | ⚠️ ItemList (TH/THB) | ✅ | ✅ | ⬜ | 65% |
| Product | `product.html` | ✅ | ⚠️ placeholder | ✅ 9 photos | ⬜ | ⚠️ Product (THB price) | ✅ | ✅ | ⬜ | 65% |
| Portfolio | `gallery.html` | ✅ | ⚠️ placeholder | ✅ 13 photos | ⬜ | ⬜ ImageGallery | ✅ | ✅ | ⬜ | 60% |
| Atelier | `about.html` | ✅ | ⚠️ placeholder (TH studio) | ✅ 6 photos | ⬜ | ⚠️ Person partial | ✅ | ✅ | ⬜ | 65% |
| Adoption | `contact.html` | ✅ | ⚠️ placeholder | ⬜ | ⬜ | ⬜ ContactPage | ✅ | ✅ | ⬜ | 40% |
| Privacy | `privacy.html` | ✅ | ✅ legal copy (TH PDPA) | n/a | ⬜ | ⬜ | ✅ | ✅ | ⬜ | 70% |
| Terms | `terms.html` | ✅ | ✅ legal copy (Thai law) | n/a | ⬜ | ⬜ | ✅ | ✅ | ⬜ | 70% |

**Legend:** ✅ done · ⚠️ partial · ⬜ todo · n/a not applicable
**Consent:** Silktide + gtag Consent Mode V2 (3 kategorijos). **FAB:** WhatsApp + LINE floating buttons.

---

## ASSETS

| Asset | Status | Notes |
|---|---|---|
| `assets/css/styles.css` | ✅ | Editorial atelier stylesheet, responsive, ~1340 lines. Cache-bust `?v=3` aktyvus. Pridėta: `.legal-table`, `.fab-stack`/`.fab/--whatsapp/--line`, Silktide overrides. |
| `assets/js/main.js` | ✅ | Mobile menu, reveal, toast, chips, thumbs |
| `assets/js/cart.js` | ✅ | localStorage cart with drawer. `formatPrice()` rodo `฿` (THB). Cache-bust `?v=2` aktyvus. |
| `assets/js/consent-init.js` | ✅ NEW | Silktide config (3 kategorijos: necessary/analytics/advertising) + gtag mapping + footer Cookie Settings click handler. |
| `assets/silktide/silktide-consent-manager.js` | ✅ NEW | Vendor (54 KB) — consent manager core, kopija iš empirra-website. |
| `assets/silktide/silktide-consent-manager.css` | ✅ NEW | Vendor (12 KB) — consent banner + modal styling. |
| `assets/favicon.svg` | ✅ | SVG monogram (primary favicon) |
| `assets/img/logo.jpg` | ✅ | Trimmed logo, 600×337, 38 KB. Cache-bust `?v=2` aktyvus. |
| `assets/img/_raw/` | ✅ | Originals archive — 11 photos + transparent logo (~9.7 MB). NEDEPLOY (atskira folder, ne reference'inta HTML). |
| `assets/img/about/studio.jpg` | ✅ | 231 KB optimized (originalas 2.1 MB PNG → JPG, -89%). |
| `assets/img/products/` | ⚠️ | 3 lifestyle/doll photos (carrier, matcha-cafe, toddler-studio). Reikia tikrų Liora/Theo/Margot/Soren product shots. |
| `assets/img/testimonials/` | ✅ | 6 customer photos (mother-daughter, arisa-with-girl, girl-cafe/car/garden, mom-beach). |
| `assets/img/gallery/` | ⬜ | Folder yra, tuščias. Gallery puslapis dabar naudoja photos iš testimonials/products via background-image rotation. |
| `assets/img/og/` | ⚠️ | Using logo.jpg as OG fallback — need dedicated 1200×630 OG |
| Logo transparent PNG | ✅ archived | `_raw/logo-transparent.png` (456 KB). Per userio sprendimą HTML referencija lieka `logo.jpg`. |

---

## AUTOMATIONS

| # | Automation | Status | Endpoint | Notes |
|---|---|---|---|---|
| 1 | Lead capture (contact form) | 🟡 In Build (skeleton, not wired) | `api/lead-capture.ts` | Code parašyta, env vars + frontend wire-up + smoke test reikia |
| 2 | Reserve doll (cart submit) | ⬜ Planned | `api/reserve.ts` | Endpoint dar neparašytas |
| 3 | Newsletter subscribe | ⬜ Phase 3 | `api/newsletter.ts` | Resend audiences |
| 4 | AI lead scoring | ⬜ Phase 2 | `api/lead-score.ts` | Claude API → kategorizuoja lead intent |
| 5 | Sitemap generator | ✅ Production (static) | `sitemap.xml` | Manual update — yra repo'je, deploy'inta |
| 6 | Cookie consent (Silktide + gtag) | ✅ Production (frontend) | `assets/silktide/` + `assets/js/consent-init.js` | 3 kategorijos: necessary / analytics / advertising. Consent Mode V2 default deny. GA4 ID placeholder `G-XXXXXXXXXX` (uncomment kai Arisa pateiks). Footer "Cookie Settings" link atveria preferencijų modal. |
| 7 | Floating contact (WhatsApp + LINE) | ✅ Production (frontend) | n/a (HTML+CSS only) | WhatsApp `+66 96 202 6660`, LINE ID `dumver18`. Bottom-right FAB stack visuose 8 puslapiuose. |

**Pabaigtumas skaičiavimas:**
- #1 Lead capture: 0.3 (In Build)
- #2 Reserve: 0.0 (Planned)
- #3 Newsletter: 0.0 (Phase 3 Planned)
- #4 AI scoring: 0.0 (Phase 2 Planned)
- #5 Sitemap: 1.0 (Production)
- #6 Cookie consent: 1.0 (Production frontend; reikia Arisa GA4 ID activate analytics)
- #7 Floating contact: 1.0 (Production)
- **Total: 3.3 / 7 = 47%** (MVP excluding Phase 2/3 = 3.3/5 = 66%, su Phase 2/3 įtrauktais = 47%)

---

## CONTENT (`content/` JSON files)

| File | Status | Notes |
|---|---|---|
| `content/products.json` | ⬜ TODO | Placeholder schema sukurta, 20 dolls structure. `currency: THB`, "imported mohair" copy. |
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
| Repo location | ⚠️ Migration in progress — naujas folderis `OneDrive\Stalinis kompiuteris\Arisa` (branch `migrated-from-onedrive`, commit `57e32a9`). Senas `c:\Users\pinig\Arisa` paliktas backup'ui (`main`, `22f6abb`). Reikia merge sprendimo. |
| Vercel project linked | ⚠️ Auto-deploy live į `arisa-gules.vercel.app` (stebi `main` — t.y. dar seną state). Ownership unclear. |
| Domain registered | ⬜ TODO (`arisainwonderdolls.com`) |
| DNS configured | ⬜ TODO |
| `.env` configured Vercel'yje | ⬜ TODO (RESEND_API_KEY, LEAD_CAPTURE_SECRET) |
| Lighthouse audit | ⬜ TODO |
| Core Web Vitals pass | ⬜ TODO |
| Production live | ⬜ TODO (preview yra) |

---

## KNOWN ISSUES

- **Photo asignacijų netikslumai** — index.html hero rodo customer photo (`customer-girl-cafe.jpg` — mergaitė kavinėje su lėle) priskirtą kaip "Hero portrait · Liora, sleeping". Tekstas neatitinka turinio. Reikia review: kuriose vietose customer photos OK kaip placeholder vs. kur reikia realių product shots.
- **Per-page photo weight** — `gallery.html` 13 nuotraukų ≈ 3 MB (galimai virš 1.5 MB CLAUDE.md budget'o). Reikia Lighthouse run + galimai lazy loading via `loading="lazy"` background-image polyfill.
- **WebP nepalaikomas** — image optimization atlikta per System.Drawing PowerShell (built-in), kuris nepalaiko WebP. JPEG only. Galima būtų ~30% mažesni failai per `cwebp` (ImageMagick install reikalingas).
- **Cache buster nepilnas** — visos nuotraukos referenced'os su `?v=1`, išskyrus `customer-mother-daughter.jpg?v=2` (po rotation). Jei ateityje keisi nuotraukas, reikia rankinio bump'o.
- **Doll product data** — visi 4 hero dolls (`index.html`) yra hardcoded HTML'e. Reikia perkelti į `content/products.json` ir build/render workflow (arba palikti kaip yra, jei vanilla — manual update).
- ✅ ~~OG image — `assets/og.png` referenced HTML'e, bet failo nėra.~~ Pakeista į `assets/img/logo.jpg?v=2`. Phase 2 — sukurti dedicated 1200×630 OG.
- **Forms be backend** — visos formos dabar tik `event.preventDefault()` su toast. `api/lead-capture.ts` skeleton parašyta, bet **nesujungta su contact.html** ir Vercel env vars nesukonfigūruoti.
- **Vercel project ownership** — `arisa-gules.vercel.app` veikia, bet neaišku, kas valdo. Reikia `vercel link` arba sukurti naują project su geresniu URL.
- **Logo white background** — current JPG turi white bg. Veikia ant porcelain/whisper section'ų, bet ant blush/cream/dark — riboja layout pasirinkimus. Phase 2 — paprašyti Arisa transparent PNG/SVG.
- **Cache propagation** — Vercel `assets/*` turi `max-age=31536000, immutable`. Kiekvienas asset edit reikalauja `?v=N` cache-bust ant HTML reference'o. Dabar `?v=2` aktyvus.
- **Schema.org rich results** — Store schema neturi pilno address (tik `addressCountry: TH`). Local SEO ir Google rich result optimization Phase 2.
- **THB kainos = FX konvertavimas, ne real-world pricing** — visi 7 dolls kainos sugeneruotos €→฿ ×38 (FX 2026-05-10). Reikia Arisa patvirtinti realias THB kainas (`฿ 54,000 – 64,000` range, gali keistis pagal materials cost Tailande).
- **GA4 measurement ID placeholder** — `<head>` blokas turi `G-XXXXXXXXXX` užkommentuotą su TODO. Reikia gauti Arisa GA4 property ID ir uncomment 2 eilutes (gtag.js loader + config).
- **Cookie consent vendor** — Silktide failai (`assets/silktide/`) commit'inti, ne package'inti per CDN. Vendor update reikalauja manual replace iš empirra-website (jei vendor versija atsinaujins).

---

## NEXT SPRINT (recommended order)

1. **Commit šios sesijos darbą** — uncommitted: socials + photos (sesija #3) + cookie consent (sesija #4) + FAB + LT→TH migracija + cart.js THB. Logiški commit'ai: (a) socials, (b) photos, (c) cookie consent + FAB, (d) Lithuania→Thailand + THB.
2. **Arisa input — THB kainos + GA4 ID** — pateikti Arisa final THB kainas (FX placeholder dabar) + gauti GA4 measurement ID kad uncomment'inti tracking
3. **Photo asignacijų review** — peržiūrėti su Arisa, ar tinka customer photos kaip product placeholders. Realūs Liora/Theo/Margot/Soren shots reikalingi.
4. **Lokalizacija EN/TH** — userio prašymas paliktas neužbaigtas. Reikia atskiros sesijos. Scope sprendimas: tik UI dropdown vs. pilnas vertimas vs. `/th/` puslapiai (Thai script).
5. **Email Arisai** — kickoff confirmation + reikalingi assets (real product shots, IBAN/Thai bank, GA4 ID, founding year confirm) + preview link
6. **Vercel project ownership** — `vercel link` arba naujas project su `arisainwonderdolls.com` jau registracijoje
7. **`api/lead-capture.ts` integracija** — wire į contact.html, Vercel env vars (RESEND_API_KEY, LEAD_CAPTURE_SECRET), smoke test
8. **Per-page SEO meta + schema.org** — visi 8 puslapiai (`/seo-tekstai` skill, TH locale context)
9. **Mobile audit + Lighthouse** — Core Web Vitals fix po photo integration. Patikrinti Silktide consent banner mobile UX.
10. **Production deploy** — domain + DNS
