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

## Template naujam įrašui

```
## D-XXX · YYYY-MM-DD · Trumpas sprendimo title

**Sprendimas:** [ką nutarėm]

**Kodėl:** [pagrindiniai 2-4 punktai]

**Trade-off:** [ką prarandam, ką atidedam]

**Kas paveikta:** [failai, sistemos]
```
