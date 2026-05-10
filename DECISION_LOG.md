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

## Template naujam įrašui

```
## D-XXX · YYYY-MM-DD · Trumpas sprendimo title

**Sprendimas:** [ką nutarėm]

**Kodėl:** [pagrindiniai 2-4 punktai]

**Trade-off:** [ką prarandam, ką atidedam]

**Kas paveikta:** [failai, sistemos]
```
