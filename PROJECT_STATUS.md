# PROJECT_STATUS.md — Arisa in WonderDolls

> Live status. Atnaujinama po kiekvienos sesijos (žr. `/close-session`).
> Last updated: 2026-05-10 (post close-session, sesija #5 — full content layer + numbered catalog)

## OVERALL

**Phase:** P1 — Foundation & Core Pages (90% — full content layer + numbered catalog done; SEO + integrations + Vercel deploy switch pending)
**Pabaigtumas:** ~85% (svetainės content layer)
**Production:** ⚠️ Preview live `https://arisa-gules.vercel.app/` — vis dar rodo seną `main` state (Lithuania/EUR/placeholder). Reikia Vercel UI production branch switch į `migrated-from-onedrive`.
**Domain:** ⬜ Not registered (proposed: `arisainwonderdolls.com`)
**Repo:** https://github.com/riko8825/Arisa
**Branch:** `migrated-from-onedrive` @ `9f1ce09` (active dev, push'inta) — 9 commits ahead of `main` (unrelated histories). `main` (`22f6abb`) vis dar mapped į Vercel auto-deploy. Lokali `main` ištrinta po sesijos #5 saugumui.
**Locale:** Thailand (atelier), THB currency, EN copy. FX €→฿ ×38, kainos suapvalintos iki 500 THB.
**Photos:** 61 unikalios nuotraukos production'e (7 dolls + process + atelier + customers + earlier intake), pilnas numbered katalogas gallery.html.

---

## PAGES

| Page | File | Structure | Copy | Real images | SEO meta | Schema | Consent | FAB | Mobile QA | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| Home | `index.html` | ✅ | ⚠️ placeholder | ✅ 11 real | ✅ | ✅ Store+founder (TH/THB) | ✅ | ✅ | ⬜ | 85% |
| Nursery | `shop.html` | ✅ | ⚠️ placeholder | ✅ 9 real (8 cards: 7 dolls + 1 WIP) | ⬜ | ⚠️ ItemList (TH/THB) | ✅ | ✅ | ⬜ | 75% |
| Product | `product.html` | ✅ | ⚠️ placeholder (Pickle flagship) | ✅ 8 real (Pickle hero + 4 thumbs + diary + 3 related) | ⬜ | ⚠️ Product (THB price) | ✅ | ✅ | ⬜ | 75% |
| Portfolio | `gallery.html` | ✅ FULL CATALOG | ✅ catalog copy | ✅ 61 numbered photos (No. 001–061) | ⬜ | ⬜ ImageGallery | ✅ | ✅ | ⬜ | 80% |
| Atelier | `about.html` | ✅ | ⚠️ placeholder (TH studio) | ✅ 6 Arisa portraits | ⬜ | ⚠️ Person partial | ✅ | ✅ | ⬜ | 75% |
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
| `assets/img/_raw/` | ✅ | Originals archive — `_raw/` (11 photos batch1) + `_raw/batch2/` (7 photos+logo, 9.7 MB) + `_raw/batch3/` (40 photos, 47 MB) + `_raw/batch4/` (4 photos, 14 MB). Total ~78 MB raw. NEDEPLOY (ne reference'inta HTML). |
| `assets/img/about/` | ✅ | 7 photos: studio.jpg + 6 Arisa portraits (`arisa-{portrait,pink-studio,gray-studio,bear-doll,kimono,expo}.jpg`) |
| `assets/img/products/<kit>/` | ✅ | 7 kit folders, 33 photos: pickle (7), june (4), luisa (6), demi (5), elf-fee (3), meadow (4), sue-sue (4) |
| `assets/img/products/` (legacy) | ⚠️ | 3 earlier intake photos (carrier, matcha-cafe, toddler-studio) — only used in gallery.html "Earlier intake" section No. 059–061 |
| `assets/img/process/` | ✅ NEW | 11 technique photos: 3 hair painting + 8 hair rooting (gallery No. 034–044) |
| `assets/img/testimonials/` | ✅ | 7 photos: 6 customer + 1 arisa-restaurant (orphan asset, dar ne ref'inta) |
| `assets/img/gallery/` | ⬜ | Folder yra, tuščias. Gallery dabar naudoja photos iš products/process/about/testimonials. |
| `assets/img/og/` | ⚠️ | Using logo.jpg as OG fallback — need dedicated 1200×630 OG |
| Logo transparent PNG | ✅ archived | `_raw/logo-transparent.png` + `_raw/logo-transparent-v2.png` (per userio sprendimą HTML referencija lieka `logo.jpg`). |

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
| `content/products.json` | ✅ Real (7 dolls) | THB currency + fxNote (EUR→THB ×38). 7 dolls: Pickle/June/Luisa/Demi/Elf Fee/Meadow/Sue Sue su pilnomis story/specs/images. Pickle = flagship, Sue Sue = reserved. Story tekstai laukia Arisa review |
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
