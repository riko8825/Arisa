# SESSION_STATUS.md — Arisa in WonderDolls

> Šios sesijos snapshot. Perrašoma kiekvieną kartą su `/start-task` ir `/close-session`.

## Paskutinė sesija: 2026-05-10

**Self-score:** 7/10 · **Pabaigtumas:** 22% (1/5 modulių iš MVP scope)

### Kontekstas
Pirmoji setup sesija. Klientas (Arisa) atsiuntė intake form 2026-05-10. Repo turėjo 8 HTML puslapius be CSS/JS — puslapis lūžo (unstyled). Sesijos metu pridėtas pilnas vizualinis sluoksnis, agency-grade docs struktūra, integruotas kliento logo.

### Ką padarėme

**1. Foundation (commit `42ad8ef`):**
- `assets/css/styles.css` (~620 lines) — editorial atelier stylesheet, responsive
- `assets/js/main.js` — mobile menu, scroll reveal, toast, chip filters
- `assets/js/cart.js` — localStorage basket + drawer
- `assets/favicon.svg` — placeholder monogram

**2. Agency-grade struktūra (commit `c295372`):**
- `CLAUDE.md` — projekto SSOT su brand, voice, stack, never-list
- Tracking: `PROJECT_STATUS.md`, `SESSION_STATUS.md`, `DECISION_LOG.md` (D-001..D-007)
- Docs: `brand.md`, `content-guidelines.md`, `seo-checklist.md`, `automation-standards.md`, `deployment.md`, `client-references.md`
- Content: `products.json` (4 dolls schema), `testimonials.json`, `faq.json`
- API skeleton: `lead-capture.ts` + `_lib/{json,cors,validate,resend}.ts`
- `.env.example`, `.gitignore`, README rewrite

**3. Logo integracija (commit `8dfd5cc`):**
- `assets/img/logo.jpg` (45 KB original) — kopija iš `c:\Users\pinig\OneDrive\Stalinis kompiuteris\logo.arisa.jpg`
- Visi 8 puslapiai: header brand + mobile menu brand → `<img class="brand-logo">`
- Pašalintas `.brand-mark` gradient circle ir tekstinis wordmark (logo turi tekstą savyje)
- Footer logo su `filter: brightness(0) invert(1)` (white versija ant juodo footer)
- Favicon papildytas: `apple-touch-icon` + `alternate icon`
- OG image: `assets/og.png` (missing) → `assets/img/logo.jpg`
- Founding year 2021 → **2020** (per logo "Since 2020"): hero badge, gallery copy, Store schema (pridėta `foundingDate`, `founder`, `logo`)
- DECISION_LOG D-008 (year), D-009 (image-only logo header)

**4. Logo dydžio iteracijos (commits `f29f1f8`, `bf33d2c`, `584f1cf`):**
- 4 atskiri commits — header logo dydis: 60 → 65px, nav min-height: 88 → 80 → 90px
- Pridėtas `padding-right: 24px` ant `.brand` (breathe nuo nav links)
- HTML attrs `width="240" height="60"` (4:1 — neteisinga) → `width="65" height="65"` (1:1)

**5. Logo image trim — root cause fix (commit `a7d0cd9`):**
- Atrastas tikras root cause: original 1024×1024 logo turėjo ~50% whitespace aplink content. CSS height: 65px = ~35px vizualus content.
- Python+Pillow trim: `assets/img/logo.jpg` 1024×1024 (45 KB) → 600×337 (38 KB), aspect 1.78:1
- CSS: `.site-header .brand-logo` 65 → 70px desktop / mobile 56 → 60px / mobile menu 52 → 56px
- HTML attrs: `width="125" height="70"` (desktop), `width="100" height="56"` (mobile menu)
- Cache-bust `?v=2` ant visų logo references (Vercel `assets/*` turi 1-year immutable cache)

### Verifikacija (live `https://arisa-gules.vercel.app/`)
- ✅ Logo failas: 38 671 bytes (trimmed), Etag pasikeitė
- ✅ Visi 8 puslapiai (per cleanUrls redirect): 4-5 ref'ai į `?v=2` kiekvienam
- ✅ HTML attrs: 125×70 desktop, 100×56 mobile menu
- ✅ CSS: `.nav min-height: 90px`, `.site-header .brand-logo: 70px`
- ✅ Visi assets healthy: CSS (29.5 KB), main.js (3.1 KB), cart.js (3.6 KB), favicon (247 B)
- ⚠️ Vartotojo Chrome cache vėlavo per 4 commits — incognito atvėrė tikrą rezultatą

### Kas liko / nepatvirtinta
- ⬜ **Vartotojas dar nepatvirtinto galutinio logo dydžio** — paskutinis paklausimas dar laukia atsakymo, ar 70px desktop OK
- ⬜ Vercel project nepriklauso — deploy'inta `arisa-gules.vercel.app` (likely Arisa's account ar auto-generated). Reikia patvirtinti, kuris account valdo deploy
- ⬜ `lead-capture.ts` skeleton parašyta, bet **nesujungta** su `contact.html` — forma vis dar `event.preventDefault()` su toast
- ⬜ Vercel env vars (RESEND_API_KEY, LEAD_CAPTURE_SECRET) nesukonfigūruoti
- ⬜ Resend domain verification (`arisainwonderdolls.com`) — domeno dar nėra
- ⬜ Per-page SEO meta + schema.org neatnaujinta (visi 8 puslapiai)
- ⬜ Mobile audit nepadarytas
- ⬜ Lighthouse + Core Web Vitals nemerčiuoti
- ⬜ Real doll photos (`content/products.json` placeholder data, `assets/img/products/` tuščias)
- ⬜ Real testimonials — `content/testimonials.json` turi 1 placeholder

### Atviri klausimai klientui (Arisa) — palaukus atsakymo
1. ✅ ~~Logo file~~ — gauta. Phase 2: paprašyti **transparent PNG arba SVG** (dabar JPG su white bg)
2. ⬜ Doll photos — kiek dolls turim šiandien? Reikia 1+ photo per doll, idealu 3-5
3. ⬜ Real testimonials — ar yra realių collector reviews?
4. ⬜ Domain — patvirtinti `arisainwonderdolls.com` registraciją
5. ⬜ Bank transfer details — IBAN, gavėjas, instrukcijos kurias siųsti po reserve
6. ⬜ Analytics/GA4 — ar nori? (GDPR consent banner reikalingas jei taip)
7. ⬜ Shipping — kokios šalys, kainos, terminai?
8. ⬜ **Founding year confirmation** — logo sako 2020, brief sakė 2021. Padariom 2020 — patvirtinti.

### Kitas žingsnis (priority order)

1. **Email Arisai** — kickoff confirmation + reikalingų assets sąrašas (transparent logo, doll photos, testimonials, IBAN, founding year confirm) + preview link `https://arisa-gules.vercel.app/`
2. **Vercel project ownership** — patvirtinti, kad deploy controllable (kas valdo `arisa-gules.vercel.app`?). Jei reikia, perimti per `vercel link` arba sukurti naują project su geresniu URL
3. **Per-page SEO meta + schema.org** — visi 8 puslapiai (`/seo-tekstai` skill)
4. **Mobile audit** — `/mobilios-versijos` skill
5. **Lighthouse audit** — Core Web Vitals fix prieš production launch

### Commits šioje sesijoje
| # | Hash | Trumpinys |
|---|---|---|
| 1 | `42ad8ef` | Add stylesheet, JS and favicon |
| 2 | `c295372` | Add agency-grade docs, content schema and API skeleton |
| 3 | `8dfd5cc` | Integrate Arisa logo, fix founding year to 2020 |
| 4 | `f29f1f8` | Resize header logo to 65px with breathing room |
| 5 | `bf33d2c` | Set nav min-height to 80px per spec |
| 6 | `584f1cf` | Increase nav min-height to 90px for logo breathing room |
| 7 | `a7d0cd9` | Trim logo whitespace and bump display size |

7 commits, ~1900+ insertions, 30+ files touched.

---

---

## Sesija 2026-05-10 (vėlyvas vakaras): Token discipline + folder migration

**Self-score:** 8/10 · **Pabaigtumas:** 22% (be naujų automation modulių)

### Atlikta

**Token discipline (commit `22f6abb` senajame repo):**
- Identifikuoti sesijos token švaistymo šaltiniai (~25k tokens)
- CLAUDE.md sutrumpintas 245 → 88 eilučių (-64%)
- `.claude/settings.local.json` su safe Bash allowlist (~200 tokens/prompt sutaupyta)
- `memory/feedback.md` papildytas 5 token discipline rules

**Folder migration:**
- Naujas aktyvus folderis: `c:\Users\pinig\OneDrive\Stalinis kompiuteris\Arisa\`
- Senas `c:\Users\pinig\Arisa\` paliktas kaip backup (su pilna git istorija iki `22f6abb`)
- Naujas git repo inicializuotas `main` branch'e, prijungtas prie `riko8825/Arisa`
- `.gitignore` papildytas `.claude/scheduled_tasks.lock`
- Push'inta į **branch `migrated-from-onedrive`** (commit `57e32a9`, 41 files, 4935 insertions) — NE main, kad nepaveiktų live deploy
- Memory failai duplikuoti į `~/.claude/projects/c--Users-pinig-OneDrive-Stalinis-kompiuteris-Arisa/memory/`
- `project_arisa.md` + `reference.md` atnaujinti su nauju path

### Kas liko / nepatvirtinta

- ⬜ **Merge sprendimas:** `migrated-from-onedrive` → `main` GitHub'e — lemia, kuris repo'as kontroliuoja Vercel deploy
- ⬜ Vercel auto-deploy vis dar stebi senojo repo `main` — `arisa-gules.vercel.app` rodo `22f6abb`, ne naują migration commit'ą
- ⬜ Senas folderis `c:\Users\pinig\Arisa\` neištrintas, ne uždraustas push'inti — divergence rizika jei atsidarys per klaidą
- ⬜ Senas memory katalogas (`c--Users-pinig-Arisa`) paliktas — outdated path info viduje, gali sukelti confusion
- ⬜ `uploads/CLAUDE-arisa-in-wonderdolls-reborn-nursery.md` (intake form originalas) — commit'intas viešai į GitHub. Reikia paklausti Arisa, ar OK.

### Kitas žingsnis (priority order)

1. **Pasirinkti repo'o autoritetą:** dirbi iš naujo OneDrive folderio (→ merge'inti `migrated-from-onedrive` į `main`) ar grįžti į senąjį (→ uždaryti naują branch). Sprendimas lemia visą tolimesnę workflow.
2. **Vercel project ownership patvirtinimas** — kas valdo `arisa-gules.vercel.app`. Jei perimsi, pakeisti deploy source.
3. **`api/lead-capture.ts` integracija** — wire į `contact.html`, Vercel env vars (RESEND_API_KEY, LEAD_CAPTURE_SECRET), smoke test su realiu submit.

### Commits šioje sesijoje
| # | Hash | Repo | Branch | Trumpinys |
|---|---|---|---|---|
| 1 | `22f6abb` | senas (`c:\Users\pinig\Arisa`) | main | Token discipline: trim CLAUDE.md, add safe-command allowlist |
| 2 | `57e32a9` | naujas (OneDrive) | migrated-from-onedrive | Migrate to OneDrive folder (root commit, 41 files) |

---

## Sesija 2026-05-10 (naktis): Social icons + photo integration

**Self-score:** 7/10 · **Pabaigtumas:** ~70% (svetainės content layer)

### Kontekstas
Po folder migration sesijos. Klientas atsiuntė 3 wetransfer ZIP'us su nuotraukomis (logo, studio, customer photos, lifestyle shots). Reikėjo: pakeisti footerio social placeholders į realias nuorodas (TikTok + Facebook + Instagram), išskleisti ZIP'us, optimizuoti fotos ir integruoti į svetainę. Lokalizacija (EN/TH) aptarta, bet neimplementuota.

### Atlikta

**1. Social icons (visi 8 puslapiai):**
- `assets/css/styles.css`: `.social-icons` klasė (44×44px round, hover blush+lift) + contact-card variantas (48×48px ant šviesaus bg)
- Inline SVG ikonos: Instagram (outline), TikTok (filled), Facebook (filled) — be external dependencies
- Realios nuorodos: `instagram.com/arisa_in_wonderdolls`, `tiktok.com/@arisareborndollnersury`, `facebook.com/share/1AxGdXgPge/`
- Pašalinta visi `<a href="#">Instagram</a><a href="#">Pinterest</a>` placeholder'iai
- `target="_blank" rel="noopener noreferrer"` + `aria-label`

**2. Photo extraction & organization:**
- 3 ZIP'ai iš `Downloads`: `wetransfer_att-jpeg`, `wetransfer_my-studio-and-logo`, `wetransfer_customer-feedback-picture`
- 11 nuotraukų išskleistos ir suklasifikuotos:
  - `assets/img/_raw/logo-transparent.png` (456 KB) — archyvas (logo NEKEITĖM per userio sprendimą)
  - `assets/img/about/studio.jpg` (231 KB, originalas 2.1 MB PNG)
  - `assets/img/products/` — 3 doll/lifestyle (carrier, matcha-cafe, toddler-studio)
  - `assets/img/testimonials/` — 6 customer photos (mother-daughter, arisa-with-girl, girl-cafe/car/garden, mom-beach)

**3. Image optimization (System.Drawing PowerShell):**
- Resize logic: max width 1200-1600px pagal kategoriją, JPEG quality 80-85
- `customer-mother-daughter.jpg`: 4.3 MB → 142 KB (-96.7%)
- `studio.png` (2.1 MB) → `studio.jpg` (231 KB, -89%)
- 5 nuotraukos kur naujas dydis viršijo originalą → restored iš `_raw/`
- Originalai išsaugoti `_raw/` (~9.7 MB)

**4. HTML integration (48 imgph blocks across 5 files):**
- `assets/css/styles.css`: pridėta `.imgph.has-photo` modifier (background-image + cover, slepia gradient overlay'ą, label/corner išlieka)
- `index.html`: 11 imgph (hero, 4 product cards, atelier, customer quote, 3 collection cards) — manualiai mapped
- `gallery.html` (13), `shop.html` (9), `about.html` (6), `product.html` (9) — bulk regex inject su rotation per 10 photo pool
- Cache-buster `?v=1` ant visų bg-image references

**5. Photo rotation fix:**
- `customer-mother-daughter.jpg` rotated 90° counter-clockwise (RotateFlipType.Rotate270FlipNone)
- Cache bump `?v=1` → `?v=2` index.html + gallery.html

### Commits šioje sesijoje
NĖRA — visi pakeitimai uncommitted, 9 modified files + 4 new img dirs. Reikia commit'inti prieš deploy.

### Kas liko / nepatvirtinta

- ⬜ **Lokalizacija EN/TH** — userio prašymas paliktas neužbaigtas. Aptarta plana, neimplementuota (i18n turinio extraction reikalauja atskiros sesijos)
- ⬜ **Photo asignacijų korektūra** — `customer-girl-cafe.jpg` (mergaitė kavinėje su lėle) priskirta hero kaip "Liora, sleeping" — tekstas neatitinka turinio. Reikia review: ar tai customer photo, ar product photo?
- ⬜ **Per-page weight verification** — gallery.html turi 13 nuotraukų ≈ 3 MB → galimai virš 1.5 MB CLAUDE.md budget'o. Reikia Lighthouse run.
- ⬜ **Mobile responsive check** — naujos nuotraukos (background-image) gali turėti positioning issues mažuose ekranuose
- ⬜ **Commit + push** — 9 modified files dar neicommit'inta. Reikia atskiro commit'o socials + atskiro photos
- ⬜ **WebP conversion** — System.Drawing ne palaiko WebP. Galima būtų 30% mažesni failai per `cwebp` (tools install reikalingas)
- ⬜ Rotation cache bump padarytas tik 1 nuotraukai (`customer-mother-daughter.jpg ?v=2`), kitos 10 liko `?v=1` — jei ateityje keisi rotaciją, reiks rankinio bump'inimo

### Atviri klausimai klientui (Arisa)

1. ⬜ Ar užkliūna nuotraukos asignacijos? (Pvz. customer photo'ai naudoti kaip "product hero")
2. ⬜ Lokalizacija — pilnas EN/TH ar tik dropdown UI placeholder?
3. ⬜ Kitos nuotraukos su tikrų doll product shots?

### Kitas žingsnis (priority order)

1. **Commit'inti dabartinius pakeitimus** — 2 atskiri commits: (a) socialiniai tinklai 8 failuose + CSS, (b) photo integration + rotation
2. **Lokalizacija EN/TH** — naujoje sesijoje. Reikia pasirinkti scope (tik UI dropdown vs. pilnas vertimas vs. atskiri /th/ puslapiai)
3. **Photo asignacijų review** — peržiūrėti, ar product card pavadinimai atitinka realias nuotraukas (Liora, Theo, Margot, Soren — fictional names su customer photos)
4. **Lighthouse + mobile audit** — per-page weight, CLS, LCP po nuotraukų pridėjimo

---

## Sesija 2026-05-10 (naktis #4): Cookie consent + floating FAB + LT→TH migracija

**Self-score:** 8/10 · **Pabaigtumas:** ~78%

### Kontekstas
Po naktinės photo integration sesijos (uncommitted). Userio užklausos: (1) sukurti cookies setup'ą perimant viską iš empirra-website, (2) pridėti floating WhatsApp + LINE buttons (TH numeris `+66 96 202 6660`, LINE ID `dumver18`), (3) pakeisti Lithuania → Thailand visur, EUR → THB (užsakovas iš Tailando).

### Atlikta

**1. Cookie consent system (Silktide + Consent Mode V2):**
- Vendor failai nukopijuoti iš empirra-website: `assets/silktide/silktide-consent-manager.js` (54 KB) + `silktide-consent-manager.css` (12 KB)
- Naujas `assets/js/consent-init.js` — Arisa-tonal config (warm copy "the nursery is being visited"), 3 kategorijos (necessary / analytics / advertising), gtag mapping, footer Cookie Settings click handler per `getInstance().toggleModal(true)`
- Visi 8 puslapiai gavo `<head>` Consent Mode V2 default deny + GA4 placeholder `G-XXXXXXXXXX` (užkommentuotas, su TODO replace marker)
- Visi 8 puslapiai gavo Silktide loader prieš `main.js` (preload CSS + 2 script defer)
- "Cookie Settings" link footer'yje šalia Privacy/Terms (visi 8 puslapiai)
- `privacy.html` Cookies sekcija perrašyta — 3 kategorijų lentelė + processor lentelė (Silktide UK, Google USA, Vercel USA, Stripe USA)
- `styles.css` papildyta `.legal-table` styling + Silktide brand override (Inter + ink/gold linkai)

**2. Floating contact buttons (WhatsApp + LINE):**
- `.fab-stack` CSS — bottom-right fixed, 56×56px (52×52 mobile), z-index 120 (virš toast/100, po Silktide modal)
- WhatsApp `#25D366` + LINE `#06C755` brand colors, oficialios SVG ikonos (inline, vienas path per icon)
- Hover: `translateY(-2px) scale(1.04)` + stronger shadow + darker brand bg
- Focus-visible dvigubas ring (porcelain → ink) klaviatūrai
- `pointer-events: none` ant wrapper'io + `auto` ant `.fab` — clicks neperdengia tarp mygtukų
- `prefers-reduced-motion` blocks transition + transform
- HTML inject visuose 8 puslapiuose prieš `</body>`

**3. Lithuania → Thailand pilna migracija (87 substitution'ų 14 failuose):**
- Topbar `Atelier · Lithuania` / `EUR · EN` → `Atelier · Thailand` / `THB · EN`
- Visos kainos € → ฿, FX × 38, suapvalintos iki 500 THB:
  - Anouk ฿54k, Liora ฿56k, Wren ฿57.5k, Margot ฿58.5k, Elin ฿60k, Soren ฿61.5k, Theo ฿64k
  - contact.html ranges: ฿45.5k–57k / ฿57k–68.5k / ฿68.5k–95k
- `cart.js` — `formatPrice()` `'€ '` → `'฿ '`; cart `?v=2` cache buster
- 10 `data-product` JSON payload'ų atnaujinti su numeric THB price
- Schema.org: `priceCurrency: EUR` → `THB`, `priceRange: €€€` → `฿฿฿`, `addressCountry: EU` → `TH`, numeric prices recalc'ed
- `products.json` `currency: EUR` → `THB`
- Legal copy:
  - **privacy.html** — "Vilnius, Lithuania" → "based in Thailand", "EU accounting law" → "Thai accounting law", "Lithuanian tax authority" → "Thai tax authority", **VDAI → Thai PDPC under PDPA**
  - **terms.html** — "Republic of Lithuania" / "courts of Vilnius" → "Kingdom of Thailand" / "courts of Thailand", **SEPA → Thai bank transfer**, "Arisa Vaitkevičiūtė" → "Arisa", liability/governing law klauzulės perrašytos
  - **about.html** — "apartment studio in Vilnius" → "studio in Thailand", "Vilnius Craft Annual" → "Bangkok Craft Annual", "European mohair" → "imported mohair"
  - **contact.html** — "Vilnius (LT)" → "Thailand", "ship outside the EU" → "ship outside Thailand", FAQ shipping copy
  - footer'iai (visi 8) "Handmade in the EU" → "Handmade in Thailand"
- `docs/content-guidelines.md` + `docs/seo-checklist.md` + `docs/brand.md` (`ATELIER · LITHUANIA` → `ATELIER · THAILAND`) — sync'inta
- Cache: `styles.css?v=2 → ?v=3` (visi 8 pages)

**4. Docs sync:**
- `PROJECT_STATUS.md` — Phase 75% → 80%, OVERALL pridėtas Locale skyrius, ASSETS lentelė papildyta Silktide vendor + consent-init.js + bumped `?v=3`/`?v=2`, AUTOMATIONS gavo #6 Cookie consent + #7 Floating contact (47% bendras pabaigtumas), PAGES lentelė gavo Consent + FAB stulpelius, KNOWN ISSUES papildyta 3 nauji punktai (THB FX placeholder, GA4 ID placeholder, Silktide vendor update), NEXT SPRINT prioritetas perrikiuotas
- `docs/brand.md` — ATELIER mono label TH

### Verifikacija
- Lokalus `python http.server 8765` — visi 8 puslapiai grąžina FAB markup, Silktide assets 200, `Atelier · Thailand` + `THB · EN` topbar
- Audit grep `Lithuania|Vilnius|Lietuv|VDAI|European|EUR\b|€` per visą projektą = **0 matches**
- CSS turi 18 `fab-stack` referencijų + Silktide override blokai

### Kas liko / nepatvirtinta
- ⬜ **Visa sesija uncommitted** — 16 modified + 6 untracked (3 sesijos darbo: socials, photos, cookies+FAB+TH). Logiški atskiri commits prieš push.
- ⬜ **THB kainos = FX placeholder, ne real-world pricing** — Arisa turi patvirtinti realias TH market kainas
- ⬜ **GA4 measurement ID** — Arisa turi pateikti `G-XXXXXXXXXX`. Iki tol consent veikia, tracking neaktyvus.
- ⬜ **WhatsApp + LINE smoke test live** — lokalus mock OK, bet reikia patikrinti ant production deploy (Vercel preview)
- ⬜ **Mobile audit po FAB pridėjimo** — patikrinti, ar 52×52 FAB nesikerta su Silktide banner mobile (`bottomCenter` Silktide vs. `bottom-right` FAB — atskiras axis, OK teoriškai)

### Commits šioje sesijoje
NĖRA — visi pakeitimai uncommitted (3 ankstesnių sesijų darbas + ši = ~17 modified failai).

### Kitas žingsnis (priority order)
1. **Commit'inti šios + ankstesnių sesijų darbą** — atskirti į logiškus commits: (a) social icons (sesija #3), (b) photo integration (sesija #3), (c) cookie consent + FAB (sesija #4), (d) Lithuania→Thailand + THB (sesija #4)
2. **Email Arisai** — preview link + pateiktini assets (real product shots, GA4 ID, real THB pricing, Thai bank IBAN, founding year confirm)
3. **Lighthouse + mobile audit** — patikrinti FAB + Silktide UX mobile, Core Web Vitals po photo integration

---

## Istorija

| Data | Score | Pabaig. | Pagrindinis darbas |
|---|---|---|---|
| 2026-05-10 (rytas/vakaras) | 7/10 | 22% | Foundation: CSS/JS, agency docs, logo integration, image trim cache fix |
| 2026-05-10 (vėlyvas vakaras) | 8/10 | 22% | Token discipline (CLAUDE.md -64%, settings allowlist) + folder migration į OneDrive |
| 2026-05-10 (naktis) | 7/10 | ~70% | Social icons (TikTok+FB+IG, 8 files) + photo integration (11 photos optimized, 48 imgph blocks filled) |
| 2026-05-10 (naktis #4) | 8/10 | ~78% | Cookie consent (Silktide + Consent Mode V2, 3 kategorijos) + floating WhatsApp/LINE FAB + Lithuania→Thailand pilna migracija (87 subs, EUR→THB ×38) |
