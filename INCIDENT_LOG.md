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

---

## I-002 · 2026-05-10 · `git checkout main` perrašė working tree (P3 near-miss)

**Severity:** P3 — near-incident (atstatymas sėkmingas, bet pavojingas move'as)

**Kontekstas:** Sesija #5 pabaigoje, atsakant į kliento "push" prašymą, asistentas bandė `git checkout -b main origin/main` + merge migrated-from-onedrive. Checkout sukėlė full working tree perrašymą su senuoju Lithuania/EUR content (placeholder dolls Liora/Theo/Margot/Soren, products.json `currency: EUR`, about.html "Vilnius", etc).

**Kas nutiko:**
1. `git checkout -b main origin/main` perjungė į `main` branch'ą — sėkmingai
2. Working tree (HTML failai diske) pasikeitė į main commit content (lithuania placeholders), nes lokalūs failai trackinami git'u
3. `git merge --ff-only migrated-from-onedrive` fail'ino: "fatal: refusing to merge unrelated histories"
4. System reminder pranešė user'iui apie 5 modified files (products.json, index.html, about.html, product.html, shop.html, gallery.html) — visi su senuoju content
5. Atstatymas: `git checkout migrated-from-onedrive` grąžino į prieš tai buvusį working tree (working tree clean post-checkout, nes `origin/migrated-from-onedrive` buvo up-to-date — neturėjo uncommitted changes)

**Priežastis:**
- Asistentas neperžiūrėjo `git log` arba `git fetch` prieš checkout — nežinota, kad `main` ir `migrated-from-onedrive` yra unrelated histories
- Net jei būtų žinota apie unrelated histories, `git checkout` su working tree pakeitimu yra default git behavior — jokio warning'o nėra
- Risk window: jei būtų buvę uncommitted changes, jos būtų buvusios prarastos arba reikėtų stash'o

**Kaip ištaisyta:**
- `git checkout migrated-from-onedrive` — atstatė į prieš checkout state
- Patvirtinta `git status` (working tree clean) ir `head -3 content/products.json` (THB currency) — viskas vietoje
- Lokali `main` branch ištrinta `git branch -d main` — saugu, nes origin/main GitHub'e nepalietėm

**Prevencija:**
- Prieš `git checkout` į neradikalinį branch'ą — `git fetch` + `git log --oneline origin/<branch>..HEAD` + `git log --oneline HEAD..origin/<branch>` kad pamatyti divergence
- Jei branch'es turi unrelated histories — NIEKADA `--allow-unrelated-histories` automatiškai. Vercel UI / external deploy switch yra saugesnė
- Multi-branch repo'uose vengti `git checkout -b <local> <remote>` jei nesi tikras apie history relationship — geriau `git fetch` + `git log` pirma

**Time wasted:** ~3 min (atstatymas), bet tai galėjo būti masinis data loss, jei būtų buvę uncommitted changes. Pavojinga move'as su pasisekusiu outcome.
