# Deployment — Arisa in WonderDolls

## Stack

- **Hosting:** Vercel
- **Branch:** `main` → production auto-deploy
- **Preview:** every PR or branch → unique preview URL
- **Domain:** TBD — proposed `arisainwonderdolls.com`

## First-time setup (kai bus reikia)

### 1. Vercel projektą prijungti
```bash
# vienkartinis local install
npm i -g vercel
vercel login

# repo root'e
vercel link
# pasirinkti / sukurti project "arisa-wonderdolls"
```

### 2. Env vars Vercel'yje
Vercel dashboard → Project → Settings → Environment Variables:

| Var | Production | Preview | Development |
|---|---|---|---|
| `RESEND_API_KEY` | ✅ real | ✅ test | ✅ test |
| `LEAD_CAPTURE_SECRET` | ✅ unique | ✅ unique | ✅ unique |
| `RESERVE_SECRET` | ✅ unique | ✅ unique | ✅ unique |
| `ANTHROPIC_API_KEY` | (Phase 2) | (Phase 2) | (Phase 2) |

### 3. Domeno setup
- Pirkti per Vercel domains (lengviausia) arba Namecheap
- Vercel dashboard → Project → Domains → Add
- DNS auto-config jei pirkta per Vercel
- Jei kitur — A record + CNAME pagal Vercel instrukcijas
- SSL auto (Let's Encrypt)

### 4. `vercel.json` (jau yra)
Patikrinti, kad turi:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

## Pre-deploy checklist

- [ ] Visi 8 puslapiai render'ina lokaliai (`live-server` arba `vercel dev`)
- [ ] Mobile (375px, 414px) — visi puslapiai OK
- [ ] Visos formos pateikia teisingai (lokali toast / preview Edge Function)
- [ ] Lighthouse audit: Performance > 90, Accessibility > 95, SEO > 95
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] Visos `<a>` linkuoja teisingai (no broken links)
- [ ] Visi `<img>` turi `alt` ir `width`/`height`
- [ ] Console — be klaidų
- [ ] Env vars Vercel'yje sukonfigūruoti
- [ ] `robots.txt` ir `sitemap.xml` atnaujinti
- [ ] OG image generuotas (1200×630)
- [ ] Favicon — final logo (kai bus)

## Deploy procesas

```bash
# normalus deploy — auto via push
git push origin main

# Manual force preview
vercel --prod=false

# Manual production (vengti — naudoti git push)
vercel --prod
```

## Post-deploy verification

Po `git push origin main`:

1. Atidaryti https://arisainwonderdolls.com
2. Smoke test: home → nursery → product → contact → submit form
3. Patikrinti Resend dashboard — ar atėjo test email
4. Lighthouse audit live URL
5. Patikrinti Google Search Console (Phase 2) — indexing status

## Rollback

**Tik per Vercel dashboard arba `git revert`:**

```bash
# git revert — sukuria naują commit, kuris nuima prieš tai esantį
git revert HEAD
git push origin main
```

**Niekada `git reset --hard` po push'o.** Niekada `git push --force` į main.

Vercel dashboard → Deployments → praeitą deployment → "Promote to Production" — instant rollback be git operacijų.

## Performance budget

| Metric | Budget |
|---|---|
| Total page weight | < 1.5 MB |
| HTML | < 50 KB |
| CSS | < 80 KB (single file) |
| JS | < 30 KB (main+cart) |
| Hero image | < 250 KB (WebP) |
| Total fonts | < 150 KB |

Jei viršija — optimizuoti prieš deploy.

## Monitoring (Phase 1 → Phase 2)

**Phase 1:**
- Vercel Function logs (built-in)
- Manual Lighthouse runs po deploy

**Phase 2:**
- Sentry (error tracking)
- Vercel Analytics (RUM, Core Web Vitals real)
- Search Console alerts
- Slack webhook iš Edge Function jei 5xx
