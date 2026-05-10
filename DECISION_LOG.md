# DECISION_LOG.md — Arisa in WonderDolls

> Architektūriniai ir produktiniai sprendimai. Append-only — nieko netriname, tik žymime "superseded".

---

## D-001 · 2026-05-10 · Stack: Vanilla HTML/CSS/JS (ne React/Next)

**Sprendimas:** Visa svetainė vanilla HTML, single CSS, du JS modules. Jokio build step.

**Kodėl:**
- Brief'e nurodyta "panaši struktūra kaip empirra.com" (irgi vanilla)
- Klientas — vienas žmogus, ne tech-savvy. Vanilla = lengva pridėti naują doll be developer'io
- Core Web Vitals reikalavimas — vanilla = nėra hidratacijos, nėra JS bundle
- Tik 8 puslapiai, ~20 produktų — overkill naudoti SPA framework

**Trade-off:** Naujo doll pridėjimas = HTML edit (manual), ne CMS. Phase 3 — galima pridėti static site generator (11ty, Astro), jei kataloglas užaugs >50.

**Kas paveikta:** visa repo struktūra, deploy pipeline (tik static)

---

## D-002 · 2026-05-10 · Payment: Manual reserve (Phase 1) — ne Stripe iš pradžių

**Sprendimas:** Phase 1 — checkout = forma → email Arisai → ji atsako su bank transfer detalėmis. Stripe = Phase 2.

**Kodėl:**
- Klientas nurodė "Bank transfer (manual), Not sure — suggest"
- Stripe reikalauja business entity, tax setup → kelios savaitės delay
- Reborn dolls — premium, low-volume. Manual touch tinka brand'ui (warm, personal)
- Reborn doll perka apgalvotai, ne impulse — checkout friction nėra critical

**Trade-off:** Mažesnis conversion rate vs auto-checkout. Phase 2 pridedam Stripe kai Arisa pasiruošus business setup.

**Kas paveikta:** `api/reserve.ts` skeleton, `contact.html` "Adoption" forma, content copy ("Begin an adoption" ne "Buy now")

---

## D-003 · 2026-05-10 · Lead delivery: Resend → email Arisai (be DB)

**Sprendimas:** Lead capture endpoint siunčia email per Resend tiesiogiai į `arisainwonderdolls@gmail.com`. Be Supabase log'inimo Phase 1.

**Kodėl:**
- Empirra standard pattern — žinom, veikia
- Phase 1 lead volume bus mažas (<10/sav.)
- Email = Arisa darbo įrankis, ji ten gyvena
- Supabase pridedam Phase 2 jei reiks AI scoring / CRM / segmentation

**Trade-off:** Nėra struktūruoto lead history. Jei Arisa norės reports, reikės pridėti DB layer.

**Kas paveikta:** `api/lead-capture.ts`, `.env.example` (RESEND_API_KEY)

---

## D-004 · 2026-05-10 · Tipografija: Cormorant Garamond + Inter + JetBrains Mono

**Sprendimas:** 3-font stack:
- Display/serif — Cormorant Garamond (italic swashes — "tenderly", "souls")
- Body — Inter (clean, modern)
- Mono — JetBrains Mono (eyebrows, prices, meta)

**Kodėl:**
- Cormorant — luxury editorial feel, matches "dreamy nursery" brief
- Inter — neutralus, gerai readable, free
- Mono — atskiria meta nuo content, "atelier ledger" aesthetic
- Visos trys — Google Fonts, free, fast loading

**Trade-off:** 3 font families = ~120kb. Mitigation: `display=swap`, preconnect.

**Alternatyvos atmestos:**
- Playfair Display — perdaug "fashion magazine"
- Crimson Text — per saiku
- DM Serif — per heavy

---

## D-005 · 2026-05-10 · Color paletė: Porcelain/blush/cream/blue

**Sprendimas:** Light theme only. Paletė: porcelain (#FFFCF8) base, blush (#F1DCD0) accent, blue (#C9D4D9) accent, ink (#1A1410) text.

**Kodėl:**
- Brief: "soft pink, cream, blue and white"
- Reborn dolls — nursery aesthetic = pastels
- Ink ne pure black — softer, less harsh
- Light only — brief sako "Light theme"

**Trade-off:** Nėra dark mode. OK — ne primary use case (collectors browse'ina dieną).

---

## D-006 · 2026-05-10 · Asset path konvencija

**Sprendimas:** Visi assets — `assets/` root. Subfolders: `css/`, `js/`, `img/products/`, `img/gallery/`, `img/og/`.

**Kodėl:**
- Sutampa su HTML jau referenced path'ais (`assets/favicon.svg`, `assets/css/styles.css`)
- Standartas Vercel static deploy
- Vienas `assets/` katalogas = vienas cache rule

---

## D-007 · 2026-05-10 · Cart implementation: localStorage

**Sprendimas:** Cart state — `localStorage`, key `arisa_cart_v1`. Be backend session.

**Kodėl:**
- Phase 1 = no auth, no accounts
- Reserve flow — vartotojas užpildo formą su savo info, todėl session nereikia
- Versioned key (`_v1`) — ateičiai jei keisim schema

**Trade-off:** Cart neatkuriamas tarp devices. OK — premium product, vartotojas baigia vieną sessioną.

---

## D-008 · 2026-05-10 · Founding year: 2020 (per logo, ne 2021)

**Sprendimas:** Visur svetainėje, schema.org, ir docs — `foundingDate: 2020`. Atnaujinom HTML, CLAUDE.md, brand.md, seo-checklist.md.

**Kodėl:**
- Arisa atsiuntė logo, kuriame parašyta "Since 2020"
- Logo = brand source of truth, ne pradinis brief
- Geriau pataisyti vietoje, nei klausti ir atidėti deploy

**Trade-off:** Jei Arisa pasakys, kad iš tiesų 2021 (logo klaida), reikės atstatyti — bet tai 1 atstatymo commit, žinome kur ieškoti (`grep "2020"`).

**Kas paveikta:** index.html (hero badge + Store schema), gallery.html, CLAUDE.md, brand.md, seo-checklist.md, products.json (ateičiai)

---

## D-009 · 2026-05-10 · Logo: image-only header, be teksto

**Sprendimas:** Header brand = vienas `<img class="brand-logo">`. Pašalintas `.brand-mark` gradient circle ir tekstinis "Arisa in WonderDolls" iš header'io ir mobile menu head'o. Logo image jau turi visą wordmark.

**Kodėl:**
- Logo turi pilną wordmark + sleeping baby + subtitle — tekstas šalia būtų dubliavimas
- Tipografija logo'je labai specifinė (script handlettering) — bandymas matchint sistemos šriftais atrodytų prastai
- Vienas image = paprastesnis maintenance, mažiau CSS, labiau brand-coherent

**Trade-off:**
- LCP — header logo dabar yra image (45 KB JPG). Atsipirkimas: image cached 1 metus per Vercel header (`max-age=31536000, immutable`).
- Accessibility: `alt="Arisa in WonderDolls — Reborn Nursery"` + `aria-label` ant `<a>` — screen readers gauna pilną tekstą.

**Kas paveikta:** visi 8 HTML failai, `assets/css/styles.css` (.brand, .brand-logo, .brand-mark removed)

---

## D-010 · 2026-05-10 · Asset cache-bust per `?v=N` query string

**Sprendimas:** Visi `assets/img/*` references HTML'e — su `?v=N` query string. Kai paimsim image → bumpinam N (`?v=2`, `?v=3`, ...).

**Kodėl:**
- Vercel `vercel.json` agresyviai cache'ina `assets/*` su `Cache-Control: public, max-age=31536000, immutable` (1 metai)
- Be cache-bust, bet koks image edit nepasiekia user'io kol jo browser tikras paspaus hard reload
- Per logo iteraciją (sesijos commit `a7d0cd9`) — user nematė pakeitimų net po 4 atskirų deploy'ų
- `?v=N` = pigiausia, vanilla, jokio build step

**Trade-off:**
- Manual disciplina — kiekvienas image edit reikalauja N bumpinti rankomis HTML'e
- N versioning sukasi forever — Phase 2 galima pakeisti į content-hash (`?v=abc123`) jei prisidėtų build step

**Alternatyvos atmestos:**
- Sumažinti `max-age` iki valandų — pakenktų performance metrics, image užkraunamas pakartotinai
- Filename hashing (`logo.abc123.jpg`) — reikia build step
- Service Worker cache invalidation — over-engineering vanilla site'ui

**Kas paveikta:** visi 8 HTML failai (`?v=2` ant logo refs), `vercel.json` (paliktas — cache rule reikalingas)

---

## D-011 · 2026-05-10 · Token discipline: trim CLAUDE.md + safe-command allowlist

**Sprendimas:** CLAUDE.md sutrumpintas 245 → 88 eilučių (-64%), perkeliant detales į `docs/`. Pridėtas `.claude/settings.local.json` su safe Bash command allowlist (git status/diff/log/add/commit/push, curl, sed loops, python, mkdir, cp).

**Kodėl:**
- CLAUDE.md perskaitomas kiekvienos sesijos pradžioje — kiekviena eilutė kainuoja kiekvienai sesijai forever
- Sesijos token'ų analizė parodė ~25k token'ų sušvaistyta dėl: 4 logo iteracijų, HTML edits per Edit tool (vietoj sed), perteklinai summary'ių, permission prompts spam'o
- `.claude/settings.local.json` sumažina ~200 tokens per kiekvieną permission prompt × ~20-30 prompts/sesija = ~5k tokens

**Trade-off:**
- Sutrumpinant CLAUDE.md, kai kuriais atvejais reikės follow-up Read'o į `docs/` failą (jei užduotis liečia tą sluoksnį) — kompromisas vertas
- Settings allowlist turi atnaujinti, kai prisidedu naujų safe commands

**Kas paveikta:** `CLAUDE.md`, `.claude/settings.local.json` (naujas), `~/.claude/projects/c--Users-pinig-Arisa/memory/feedback.md` (papildytas su 5 token discipline rules)

---

## D-012 · 2026-05-10 · Repo folder migration į `OneDrive\Stalinis kompiuteris\Arisa`

**Sprendimas:** Aktyvus projekto folderis perkeliamas iš `c:\Users\pinig\Arisa` į `c:\Users\pinig\OneDrive\Stalinis kompiuteris\Arisa` (kur user'is laiko kitus projektus — Veriva, Empirra, etc.). Naujam folderiui inicializuotas šviežias git repo, prijungtas prie `riko8825/Arisa`. Push'inta į **branch `migrated-from-onedrive`**, NE main — kad nebreak Vercel deploy'o.

**Kodėl:**
- Visi kiti user'io projektai gyvena `OneDrive\Stalinis kompiuteris\` — vienoje vietoje, OneDrive sync, vienoje IDE workspace folder
- `c:\Users\pinig\Arisa` buvo izoliuotas — sunkiau organizuoti
- Branch'as vietoj force push į main — saugu (sena istorija nepraranda, Vercel nesugriūna)

**Trade-off:**
- Du paraleliai veikiantys git lokai (senas + naujas) — divergence rizika kol user'is nepriims merge sprendimo
- Senas `~/.claude/projects/c--Users-pinig-Arisa/memory/` paliktas — outdated path info viduje
- Vercel deploy nesinkronizuotas — kol nesumerge'inta į main, `arisa-gules.vercel.app` rodo seną state

**Alternatyvos atmestos:**
- Force push į `main` — destruktyvu, nutrauktų 8-commit istoriją GitHub'e
- Symbolic link nuo seno path į naują — Windows specific, nesaugu, painu Claude'ui
- Palikti senąjį folderį pagrindiniu — neištrauktų user'io iš multi-projektinio organizavimo

**Kas paveikta:** Visa repo struktūra (41 failai), git remote, GitHub branch'ai, memory katalogas (duplikuotas į naują projekto-id)

---

## D-013 · 2026-05-10 · Photo integration: background-image ant `.imgph` (ne `<img>` tag)

**Sprendimas:** Esamiems 48 `<div class="imgph ar-XXX">` placeholder elementams pridėtas modifier `.imgph.has-photo` su `background-image: url(...)`. Nepakeista į `<img>` tag.

**Kodėl:**
- Esama `.imgph` struktūra turi corner+label overlay'us, kurie po realių nuotraukų turi išlikti
- `.imgph` jau turi `aspect-ratio` per ar-tall/ar-portrait/ar-square/ar-landscape — naudojam tą patį layout
- Vienas CSS modifier (`has-photo`) leido bulk regex inject 37 placeholder'ius keturiuose failuose vienu žingsniu (vs. ~150 individualių edit'ų jei keistume struktūrą į `<img>`)
- Background-image automatiškai `cover` + `center` — nereikia rūpintis intrinsic dimensions'ais

**Trade-off:**
- Background-image SEO weaker nei `<img alt="...">` (Google neindexuoja background images)
- Lazy loading reikalauja CSS hack'o (vs. native `loading="lazy"` ant `<img>`)
- Phase 2: jei reikia stiprios SEO image presence, refactor į `<img>` + Schema.org ImageObject

**Kas paveikta:** `assets/css/styles.css` (+9 lines `.imgph.has-photo`), `index.html` (10 imgph), `gallery.html` (13), `shop.html` (9), `about.html` (6), `product.html` (9)

---

## D-014 · 2026-05-10 · Photo rotation pool (11 photos / 48 slots)

**Sprendimas:** 11 nuotraukų pool'as cikliškai paskirstytas ~37 grid placeholder'iuose per regex inject scriptą. Index.html 10 placeholder'ių mapped manualiai (hero, atelier, customer quote — kontekstui priklauso).

**Kodėl:**
- Klientas turi tik 11 nuotraukų vs. 48 placeholder slots
- Atskirti hero/atelier/quote placeholder'iai turi semantinį priskirimą (Liora hero, Mira's homecoming testimonial) — manualiai mapped
- Gallery/grid puslapiuose semantika "Liora · sleeping" yra placeholder copy iki Arisa atsiųs realius product shots — rotation acceptable

**Trade-off:**
- Tos pačios nuotraukos pasikartoja per puslapius (pvz. `customer-girl-cafe.jpg` rodoma index.html hero + index.html collection card + gallery.html)
- Pavadinimai grid'e (Liora, Theo, Margot, Soren) neatitinka tikro turinio (customer photos)
- Sprendimas laikinas — pakeisti kai gausim realius product shots iš Arisa

**Kas paveikta:** Photo pool defined `assets/img/{about,products,testimonials}/`, originalai `assets/img/_raw/`, 5 HTML failai

---

## D-015 · 2026-05-10 · Cookie consent: Silktide vendor (ne custom)

**Sprendimas:** Cookie consent stack — `silktide-consent-manager.js` + `.css` (vendor, ~66 KB iš empirra-website) + custom `consent-init.js` config su 3 kategorijomis (necessary / analytics / advertising) + Google Consent Mode V2 default deny `<head>` bootstrap. Vendor failai commit'inti į `assets/silktide/` (ne CDN).

**Kodėl:**
- Empirra jau naudoja Silktide'ą — žinom, veikia, pagal GDPR
- Custom solution (kaip empirra `cookie-banner.js` 117-eilių vanilla) nepalaiko granular per-kategorijos consent + atskirų `onAccept`/`onReject` hookų į gtag
- Consent Mode V2 default deny + `wait_for_update: 500` — Google reikalavimas EU/EEA traffic; geriau iš karto teisingas setup nei refactor vėliau
- 3 kategorijos (ne 2) nors Advertising dabar neaktyvus — future-proof, lengviau pridėti FB Pixel/Google Ads be schema reorganizavimo
- GA4 ID `G-XXXXXXXXXX` placeholder užkommentuotas su TODO marker — Arisa pateiks vėliau, iki tol consent mode aktyvus, tracking neaktyvus

**Trade-off:**
- Vendor failai (~66 KB) commit'inti į repo — vendor update reikalauja manual replace iš empirra-website (jei vendor versija atsinaujins)
- Silktide vendor pre-defined `consentTypes` schema (`label`, `defaultValue`, `onAccept`, `onReject`) — savo brand override per CSS only (`.stcm-banner`, `.stcm-modal`)
- Cookie Settings link footer'yje per `[data-cookie-settings]` data-attr + click handler `consent-init.js` apačioje (nėra public Silktide method'o openModal, naudojam `getInstance().toggleModal(true)`)

**Alternatyvos atmestos:**
- Custom Empirra-style `cookie-banner.js` (vanilla, 1 kategorija) — nepakanka GDPR per-purpose granular consent
- Cookiebot / CookieYes (SaaS) — kaina + cross-domain dependency
- iubenda — overkill mažam atelier site'ui

**Kas paveikta:** `assets/silktide/` (vendor, naujas), `assets/js/consent-init.js` (naujas), visi 8 HTML failai (`<head>` Consent Mode V2 + footer Silktide loader + Cookie Settings link), `privacy.html` (Cookies sekcija perrašyta — 3 kategorijų lentelė + processor lentelė), `assets/css/styles.css` (`.legal-table` + Silktide overrides)

---

## D-016 · 2026-05-10 · Floating contact buttons: WhatsApp + LINE (TH market)

**Sprendimas:** Bottom-right `.fab-stack` su 2 floating action button'ais — WhatsApp (`+66 96 202 6660`) + LINE (`dumver18`). Inline SVG ikonos, brand spalvos (`#25D366` / `#06C755`), z-index 120 (virš toast 110, po Silktide modal). Mobile 52×52px, desktop 56×56px. Hover: `translateY(-2px) scale(1.04)` + stronger shadow + darker brand bg.

**Kodėl:**
- Tailande LINE = primary messaging app (vyrauja virš WhatsApp). WhatsApp — tarptautiniams collectoriams
- FAB pattern jau yra empirra.com (`whatsapp-float`) — žinome, veikia, mobile-friendly
- 2 buttons stack vertically — užtikrintas spacing, nesutampa, abu visada matomi
- Inline SVG (vienas path per icon) — be HTTP request'ų, perfect dark/light theme compatibility (currentColor / fixed white fill)
- `pointer-events: none` ant wrapper'io + `auto` ant `.fab` — clicks neperdengia tarp mygtukų, viskas tikslu
- `prefers-reduced-motion` blocks transition + transform — accessibility

**Trade-off:**
- Brand spalvos žalios (abu) — vizualiai kontrastas tik per shade (#25D366 vs #06C755). Mitigation: skirtingos ikonos + aria-label
- Z-index 120 fix'as priklauso nuo Silktide naudojantis high z-index (~2147483XXX) modal'ui — jei Silktide pakeis, reikės re-test
- LINE brand guidelines reikalauja rodyti "LINE" tekstą šalia logo (oficialios brand rules) — neimplementuota dabar (minimalistic), gali reikėti pridėti tooltip vėliau

**Alternatyvos atmestos:**
- Tik WhatsApp (kaip empirra) — TH context reikalauja LINE
- 1 toggle button → expand 2 — perdaug clicks user'iui
- Bottom toolbar fixed bar — užima vertical space, konfliktuoja su mobile cart drawer
- Tooltips on hover — desktop only, mobile užmasiruoja

**Kas paveikta:** `assets/css/styles.css` (~50 lines `.fab-stack`/`.fab/--whatsapp/--line` + media queries + reduced-motion), visi 8 HTML failai (FAB block prieš `</body>`)

---

## D-017 · 2026-05-10 · Locale: Lithuania → Thailand pilna migracija

**Sprendimas:** Visi Lithuania/Vilnius/EU/EUR/€ referencijai pakeisti į Thailand/THB context. 87 substitution'ai 14 failuose: 8 HTML + `cart.js` + `styles.css` (jokio pakeitimo, tik `?v=3` cache bump) + `products.json` + `docs/{brand,content-guidelines,seo-checklist}.md` + `PROJECT_STATUS.md`. Kainos konvertuotos €→฿ pagal FX × 38 (gegužė 2026), suapvalintos iki 500 THB.

**Kodėl:**
- Užsakovas (Arisa) yra iš Tailando, ne Lietuvos. Pirmoji setup sesija turėjo placeholder LT context (development assumption, pirminė intake forma neaiški dėl lokacijos)
- Pilna migracija saugesnė nei dalinė — palieka 0 leftover'ių, ir vartotojui (atelier owner), ir SEO (Google nemato mixed signals "Vilnius atelier" + "Thailand based")
- Legal copy (privacy.html VDAI → PDPC, terms.html "Republic of Lithuania" → "Kingdom of Thailand", SEPA → Thai bank transfer) — atelier registracija, jurisdikcija, tax authority — visi turi atitikti realią vietą
- FX × 38 (€1 ≈ ฿38 gegužę 2026) — placeholder pricing, Arisa patvirtins/koreguos pagal TH market (materials, labor, shipping kainos kitokios)

**Trade-off:**
- THB kainos = FX placeholder, ne real-world pricing — Arisa turi peer'ižiūrėti ar `฿ 56,000` realistiška Liora kainai (galimai daug per žemai/aukštai pagal TH reborn doll market)
- Brand voice charter (`docs/content-guidelines.md`) per multi-lang Phase 2 plan'ą perrašyta iš "Lithuanian, then German" į "Thai, then English-only collector market" — Phase 2 lokalizacija reikalauja Thai script puslapio
- Sesijų istorija (SESSION_STATUS.md) NEPAKEISTA — paliekam istorinį kontekstą (ankstesnės sesijos vyko su LT placeholder'iu, faktas)
- "European mohair" → "imported mohair" — bendroji, nes mohair tikrai importuojamas (Suri alpaca / Angora gallows) iš farms užsienyje, nepriklausomai nuo atelier vietos

**Alternatyvos atmestos:**
- Dual-locale (LT ir TH versijos) — overkill, atelier vienoje vietoje
- Tik topbar pakeitimas — palikti rest of copy "Vilnius atelier" — mixed signals, useris explicit "kad nieko neliktu"
- "Vilnius Craft Annual" → "Bangkok Craft Annual" placeholder — gali būti realus event, bet kontekste tik filler copy. Phase 2 — pakeisti į realų TH craft event arba pašalinti

**Kas paveikta:** 16 modified failų (8 HTML + `cart.js` + `styles.css` + `products.json` + 3 docs/ + 3 tracking failai)

---

## D-018 · 2026-05-10 · Cart price formatting: hardcoded `฿` (ne i18n)

**Sprendimas:** `cart.js` `formatPrice()` returns `'฿ ' + n.toLocaleString('en-US')`. Hardcoded simbolis, ne dinamiškas iš currency config'o.

**Kodėl:**
- Single-locale site Phase 1 — i18n stack (Intl.NumberFormat su currency options) overkill
- Inline string replace = 1 eilutė, lengva grep'inti jei reikės keisti
- `toLocaleString('en-US')` palieka thousand separator commas (`฿ 56,000`) — atitinka site'o EN locale (tai ne THB native format `฿56,000.00`, bet užtikrina visual consistency)
- Phase 2 (jei multi-currency / multi-locale) — pakeisti į `Intl.NumberFormat('en-US', { style: 'currency', currency: 'THB' })` arba locale-aware

**Trade-off:**
- Numeric `data-product` JSON payload (`"price":56000`) — tai jau "raw integer THB". Jei Arisa sutiks Phase 2 turėti €/฿ toggle, reikės pridėti `"currency"` field per produktą + dynamic format'inimą
- `?v=2` cache bump ant cart.js — visi vartotojai atsisiųs naują versiją; senas cart state localStorage'e su senais EUR price values (1480) gali būti misleading (rodys ฿ 1,480 vietoj ฿ 56,000). Mitigation: localStorage key versioning (`arisa_cart_v1`) leidžia pridėti `_v2` jei norėsim force-clear

**Kas paveikta:** `assets/js/cart.js` (1 eilutė), `cart.js?v=2` cache buster visuose 8 puslapiuose, 10 `data-product` JSON payload'ų atnaujinti su numeric THB price

---

## Template naujam įrašui

```
## D-XXX · YYYY-MM-DD · Trumpas sprendimo title

**Sprendimas:** [ką nutarėm]

**Kodėl:** [pagrindiniai 2-4 punktai]

**Trade-off:** [ką prarandam, ką atidedam]

**Kas paveikta:** [failai, sistemos]
```
