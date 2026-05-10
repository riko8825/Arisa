# CLAUDE.md — Arisa in WonderDolls

> Empirra kliento projektas. Šis failas — projekto SSOT.
> Detalės: `docs/`. Live status: `PROJECT_STATUS.md`. Sesijos: `SESSION_STATUS.md`.

Kalba: **lietuvių**. Su Arisa — anglų.

## Projektas trumpai

- **Klientas:** Arisa — `arisainwonderdolls@gmail.com`
- **Tipas:** Reborn dolls e-commerce + portfolio (single-artist atelier)
- **Repo:** https://github.com/riko8825/Arisa
- **Preview:** https://arisa-gules.vercel.app/
- **Domeno tikslas:** `arisainwonderdolls.com` (dar neregistruotas)
- **Founding year:** **2020** (per logo "Since 2020", NE 2021)

## Stack

Vanilla HTML/CSS/JS · Vercel hosting + Edge Functions (TypeScript) · Resend email · Manual reserve checkout (Phase 1 → Stripe Phase 2). Jokio React/Next, jokio build step.

→ Detaliau: `docs/deployment.md`

## Brand voice

Friendly, warm, editorial. **Be emojis. Be exclamation marks.**
- ✅ "tender", "held", "quietly", "atelier", "adoption", "souls"
- ❌ "cute", "adorable", "amazing", "buy now", "limited time"

→ Pilnas charter'is: `docs/content-guidelines.md` · brand tokens: `docs/brand.md`

## Struktūra

```
Arisa/
├── CLAUDE.md, PROJECT_STATUS.md, SESSION_STATUS.md, DECISION_LOG.md, INCIDENT_LOG.md
├── *.html (8 puslapiai, flat — NE src/pages/)
├── assets/{css,js,img}/
├── api/{lead-capture.ts, _lib/}
├── content/{products,testimonials,faq}.json
└── docs/{brand,content-guidelines,seo-checklist,automation-standards,deployment,client-references}.md
```

## Privalomos taisyklės (kasdien aktualu)

### Asset edits
- Bet koks `assets/img/*` edit → **`?v=N` bump HTML reference'uose** (Vercel cache 1 metai). Žr. `DECISION_LOG.md` D-010.
- Logo: `assets/img/logo.jpg` (600×337, 1.78:1 aspect, trimmed)

### Code rules
- Niekada inline CSS/JS HTML'e
- Niekada API raktų į frontend ar git
- Forms backend: Edge Function + Resend, atskiras `*_SECRET` env var per endpoint
- Rollback: tik `git revert`, niekada `git reset --hard`

### Workflow rules (token discipline)
- Multi-file edits (3+ failų, identiškas pakeitimas) → `for f in *.html; do sed -i ...; done`, NE Edit per failą
- "Niekas nepasikeitė" frontend → `curl -sI` + incognito test PIRMA, kodas ANTRA
- Commit summary'ai → viena eilutė. Pilnas summary tik per `/close-session` arba pagal prašymą

### Per-page sec/perf budget
- Total page weight < 1.5 MB
- LCP < 2.5s, CLS < 0.1, INP < 200ms
- Mobile-first (60%+ traffic from phone)

→ Pilnas SEO + CWV checklist: `docs/seo-checklist.md`

## NEVER

- Inline CSS/JS · emojis copy'e · skip mobile testing · ship be CWV pass
- Push į main su lūžusia formos validacija · scope keisti be Arisa patvirtinimo
- Hardcode'inti API raktus · GA4/tracking be GDPR consent

## Sesijos workflow

1. **Pradžia:** `/start-task` → perskaito šį failą + `SESSION_STATUS.md` + `PROJECT_STATUS.md`
2. **Per sesiją:** edit → patikrinti lokaliai (`vercel dev`) → commit
3. **Pabaiga:** `/close-session` → atnaujina tracking failus, pridės DECISION_LOG/INCIDENT_LOG jei reikia

## Klientas — kas dar trūksta iš Arisa

1. Logo transparent PNG/SVG (dabar JPG su white bg)
2. Doll photos (`assets/img/products/` tuščias)
3. Real testimonials (1 placeholder dabar)
4. Bank IBAN + reserve confirmation flow detalės
5. Domain registration patvirtinimas
6. Founding year confirm (2020 vs 2021)

→ Pilnas next-steps backlog: `PROJECT_STATUS.md` "NEXT SPRINT"
