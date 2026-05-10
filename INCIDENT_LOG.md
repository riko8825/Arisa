# INCIDENT_LOG.md — Arisa in WonderDolls

> Incidentai + postmortems. Append-only.
> Severity: P1 production down · P2 partial outage · P3 degraded UX · P4 dev-only

---

## I-001 · 2026-05-10 · Logo cache propagation delay (P4 dev-only)

**Severity:** P4 — preview environment, ne production. User confusion, ne data loss.

**Kas nutiko:**
Per logo dydžio iteraciją (sesijos commits `f29f1f8`, `bf33d2c`, `584f1cf`) user'is sakė "niekas nepasikeitė" net po sėkmingų git push'ų ir Vercel deploy'ų. Live serveryje patikrinta — visi pakeitimai buvo aktyvūs (curl atsakė teisingai), bet user'io Chrome browser cache rodė seną versiją.

**Root cause:**
Vercel `vercel.json` turi `Cache-Control: public, max-age=31536000, immutable` ant `/assets/*`. Tai reiškia:
- Browser cached `logo.jpg` 1 metams
- Net po image overwrite serveryje, user'io browser pasiima local cache versiją
- HTML su `<img src="assets/img/logo.jpg">` — neturi versioning, todėl URL identiškas — browser cache'ina

CSS pakeitimai pasirodė greitai (CSS file naudoja `must-revalidate` per `*.html` rule), bet image — ne.

**Kaip ištaisyta:**
1. Identifikuota per curl + Etag patikrinimą — patvirtinta, kad serveryje nauja versija yra
2. Pridėtas `?v=2` cache-bust query string ant visų logo references HTML'e (sesijos commit `a7d0cd9`)
3. Browser dabar mato `logo.jpg?v=2` kaip skirtingą URL → priverčia naują load
4. DECISION_LOG D-010 įrašytas — pattern'as ateities image edit'ams

**Prevencija:**
- Bet koks image asset edit reikalauja `?v=N` bump HTML'e (kur N didinama sequentially)
- Future automation: jei pridedam build step, naudoti content-hash (`logo.abc123.jpg`) automatiškai
- User'iui visada siūlyti incognito test'ą prieš debug'avimą cache'o problemoms

**Time wasted:** ~4 commits, ~30 min iteration time. Galima buvo išvengti, jei pirmu kartu būtų pasiūlytas cache-bust + image trim sprendimas, ne CSS height tweak.
