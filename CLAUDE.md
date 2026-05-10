# CLAUDE.md — Arisa in WonderDolls

> Empirra client project. Šis failas — single source of truth Claude Code'ui.
> Originalus brief: client intake form, 2026-05-10 (submission `8d8a2989-5c2e-42b3-907e-fef6bb27f6f6`).
> **Globalus** `~/.claude/CLAUDE.md` taip pat galioja, bet šis failas turi pirmenybę konfliktuose.

Kalba: **lietuvių** (su Arisa — anglų).

---

## PROJEKTAS

**Pavadinimas:** Arisa in WonderDolls (Reborn Nursery)
**Industrija:** Reborn dolls & handmade art (e-commerce + portfolio)
**Klientas:** Arisa — `arisainwonderdolls@gmail.com`
**Repo:** https://github.com/riko8825/Arisa
**Estimacijos:** Flexible deadline, quality over speed
**Domeno statusas:** Need to register — siūlome `arisainwonderdolls.com`

### Ką darome
E-commerce + portfolio svetainė vienos moters atelier'ui, kuri rankomis kuria reborn dolls. Lankytojas turi galėti:
1. Naršyti dolls (~20 vnt., updateable)
2. Rezervuoti / "adopt" doll (manual reserve checkout, ne Stripe iš pradžių)
3. Skaityti apie procesą, atelier, Arisa istoriją
4. Susisiekti per kontaktinę formą (lead → email per Resend)

### Auditorija (ICP)
- **Primary:** Doll collectors (moterys 25+) — emocinis ryšys, comfort, therapy use
- **Secondary:** Mergaitės 9–12 (pirkėjas — tėvai/seneliai, gift)
- **Tertiary:** Therapists, kurie rekomenduoja reborn dolls clients'ams

---

## BRAND

**Tagline:** Unique reborn dolls for collectors and dreamers
**Vibe:** Soft pink, cream, blue, white — dreamy luxury nursery aesthetic, editorial atelier feel
**Theme:** Light only (jokio dark mode)
**Logo:** Arisa atsiųs failą — kol nėra, naudojam monogram favicon (`assets/favicon.svg`)

### Color tokens (jau implementuoti `assets/css/styles.css`)
- `--porcelain` `#FFFCF8` — main background
- `--paper` / `--paper-2` — soft section backgrounds
- `--blush` `#F1DCD0` — pink accent
- `--blue` `#C9D4D9` — soft blue accent
- `--cream` `#EDE2D0` — warm cream
- `--ink` `#1A1410` — primary text / footer / CTA
- `--gold` `#B08D57` — subtle highlights only

### Tipografija
- **Display:** Cormorant Garamond (serif, italic swashes)
- **Body:** Inter (clean sans)
- **Mono:** JetBrains Mono (eyebrows, prices, meta)

→ Detaliau: `docs/brand.md`

---

## VOICE & COPY

**Tone:** Friendly, warm, approachable. Editorial. Tender, not aggressive.
**Žodynas:** Simple, clear sentences. **No emojis. Ever.**
**Auditorijai 9–12** — neinfantilizuoti. Kalbam kaip su jaunu collector, ne kaip su vaiku.
**Auditorijai 25+** — emocinis, bet neperdėta. "Held", "tender", "quietly made", "souls" — taip. "Cute", "adorable", "sweetie" — ne.

→ Detaliau ir pavyzdžiai: `docs/content-guidelines.md`

---

## TECH STACK

| Sluoksnis | Įrankis | Pastabos |
|---|---|---|
| Frontend | Vanilla HTML/CSS/JS | Panaši struktūra kaip empirra.com |
| Hosting | Vercel | Auto-deploy iš `main` |
| Backend | Vercel Edge Functions (TypeScript) | Tik kur reikia (lead capture, sitemap-gen) |
| Email | Resend | Lead notifications, transactional |
| Payments | Manual reserve (Phase 1) → Stripe (Phase 2) | Žr. `docs/deployment.md` |
| DB | Nereikia Phase 1 | Supabase tik jei pridedam newsletter/CRM |
| Analytics | Nereikia / TBD | Klientas neapsisprendė |

### Kategoriškai NE
- React, Next.js, build tools — vanilla stack, jokio framework lock-in
- Inline CSS / inline JS — viskas iš `assets/`
- API raktai į frontend ar git — tik `process.env.*` Edge Function'ose
- Dark mode — tik light theme
- Emojis bet kurioje copy vietoje

---

## STRUKTŪRA

```
Arisa/
├── CLAUDE.md, README.md              ← tu čia
├── PROJECT_STATUS.md                 ← live status, kas baigta / liko
├── SESSION_STATUS.md                 ← šios sesijos snapshot
├── DECISION_LOG.md                   ← architektūros sprendimai + kodėl
│
├── *.html                            ← 8 puslapiai (žr. PAGES)
├── robots.txt, sitemap.xml, vercel.json
│
├── assets/
│   ├── css/styles.css                ← single stylesheet, BEM-ish klasės
│   ├── js/main.js                    ← UI interactions
│   ├── js/cart.js                    ← localStorage basket
│   ├── img/                          ← real photos (Arisa atsiųs)
│   └── favicon.svg
│
├── api/                              ← Vercel Edge Functions
│   ├── lead-capture.ts
│   └── _lib/                         ← shared (resend, validate)
│
├── content/                          ← struktūruotas turinys (JSON)
│   ├── products.json                 ← master list (~20 dolls)
│   ├── testimonials.json
│   └── faq.json
│
├── docs/                             ← Empirra agency docs
│   ├── brand.md
│   ├── content-guidelines.md
│   ├── seo-checklist.md
│   ├── automation-standards.md
│   ├── deployment.md
│   └── client-references.md
│
├── .env.example                      ← env vars template
└── .gitignore
```

---

## PAGES (8)

| Page | File | Status | Priority |
|---|---|---|---|
| Home | `index.html` | ✅ structure done | P0 |
| Nursery (shop) | `shop.html` | ✅ structure done | P0 |
| Product detail | `product.html` | ✅ structure done | P0 |
| Portfolio (gallery) | `gallery.html` | ✅ structure done | P1 |
| The Atelier (about) | `about.html` | ✅ structure done | P1 |
| Adoption (contact) | `contact.html` | ✅ structure done | P0 |
| Privacy | `privacy.html` | ✅ structure done | P2 |
| Terms | `terms.html` | ✅ structure done | P2 |

→ Per-page meta, schema, copy status: `PROJECT_STATUS.md`

---

## FUNCTIONALITY

| Feature | Phase | Pastabos |
|---|---|---|
| Product browsing | P1 (now) | `shop.html` + `product.html`, content iš `content/products.json` |
| Cart / basket | P1 (now) | localStorage, drawer UI — jau veikia |
| Manual reserve checkout | P1 (now) | Form → email Arisai → ji siunčia bank transfer detales |
| Contact form | P1 (now) | Vercel Edge Function → Resend → Arisa email |
| SEO foundation | P1 (now) | Per-page meta, OG, schema.org (Store + Product), sitemap |
| Stripe checkout | P2 (later) | Po to, kai Arisa turi business entity |
| Newsletter | P3 (later) | Brief sako "later" |
| Blog | P3 (later) | Brief sako "later — placeholder" |
| Analytics / GA4 | TBD | Klientas neapsisprendė — paklausti pirmo deploy metu |
| AI lead scoring | P2 | Brief mini "Lead Response <2min su AI scoring" — Phase 2 |

---

## AUTOMATIONS (planuojamos)

| Automation | Status | Endpoint | Tikslas |
|---|---|---|---|
| Lead capture | ⬜ TODO P1 | `api/lead-capture.ts` | Contact form → Resend → Arisa email |
| Reserve doll | ⬜ TODO P1 | `api/reserve.ts` | Cart "Continue to adoption" → email su doll details |
| Sitemap generator | ⬜ TODO P1 | static, `sitemap.xml` | Manual update kai prisideda puslapis |
| AI lead scoring | ⬜ TODO P2 | `api/lead-score.ts` | Claude API įvertina lead intent (collector vs casual) |
| Newsletter subscribe | ⬜ TODO P3 | `api/newsletter.ts` | Resend audiences |

→ Detalūs specifikacijos: `docs/automation-standards.md`

---

## DEPLOYMENT

- **Hosting:** Vercel — `main` branch auto-deploy
- **Domain:** TBD — siūlome `arisainwonderdolls.com` (registracija per Vercel arba Namecheap)
- **Env vars:** Žr. `.env.example`. Production secrets — Vercel dashboard, **niekada** git'e.
- **Pre-deploy checklist:** `docs/deployment.md`

---

## SAUGUMAS

- Edge Function endpoints — `x-api-key` auth privalomas (Empirra standard, žr. globalų CLAUDE.md)
- Atskiras `*_SECRET` env var per endpoint, ne shared
- Input validacija visur kur priimam user input (kontaktas, reserve form)
- Resend API key — tik server side
- `.env` — niekada commit'inti. `.gitignore` jį pagavęs.
- Rollback — tik `git revert`, niekada `git reset --hard` po push'o

---

## KAIP DIRBAM (workflow)

1. **Sesijos pradžia:** `/start-task` → Claude perskaito šį failą + `SESSION_STATUS.md` + `PROJECT_STATUS.md`
2. **Per sesiją:** edit'ai → patikrinti lokaliai (`vercel dev` arba live-server) → commit
3. **Sesijos pabaiga:** `/close-session` → atnaujina `SESSION_STATUS.md`, `PROJECT_STATUS.md`, jei reikia `DECISION_LOG.md`
4. **Prieš deploy į main:** `/qa-tester` skill arba rankinis check — visi puslapiai render'ina, mobile OK, formos veikia
5. **Naujos automatizacijos:** `/automacija-nauja` skill — brief → architektūra → kodas → deploy
6. **Naujas puslapis:** `/puslapis-naujas` skill — mobile-first nuo nulio

---

## NEXT STEPS (pagal originalų brief)

1. ✅ Patvirtinti CLAUDE.md (šis failas)
2. ⬜ Atsakyti Arisai per email: kickoff confirmation + missing assets list (logo, doll photos, testimonials)
3. ⬜ Užregistruoti domeną `arisainwonderdolls.com`
4. ⬜ Sukurti `content/products.json` su placeholder doll data → vėliau real
5. ⬜ Implementuoti `api/lead-capture.ts` + Resend setup
6. ⬜ Mobile audit visų 8 puslapių (`/mobilios-versijos` skill)
7. ⬜ Core Web Vitals patikrinimas prieš production
8. ⬜ Deploy į Vercel preview, Arisa review
9. ⬜ Production deploy + DNS

---

## NEVER (raudonos linijos)

- ❌ Skip mobile testing — 60%+ traffic from phone
- ❌ Inline CSS / inline JS HTML failuose
- ❌ Ship be Core Web Vitals pass
- ❌ Change scope be Arisa patvirtinimo
- ❌ Push į main su lūžusia formos validacija
- ❌ Use emojis copy'e (visiems lygiams — H1, body, button, alt)
- ❌ Add tracking / analytics be kliento patvirtinimo (GDPR)
- ❌ Hardcode'inti API raktus

---

## CLIENT COMMUNICATION

- **Email:** `arisainwonderdolls@gmail.com`
- **Reply SLA:** 24h
- **Decision log:** Visi reikšmingi sprendimai, kuriuos darom be Arisa input'o → įrašyti į `DECISION_LOG.md`, kad per review galėtų matyti kontekstą
- **Status updates:** Po kiekvieno milestone (P1 done, deploy live) — short email su preview link
