# SEO Checklist — Arisa in WonderDolls

Brief sako: **"Important — but not #1 priority"**. Tikslas: foundation tvirta, advanced (link building, content marketing) — Phase 2+.

## Per-page checklist

Kiekvienas puslapis turi turėti:

- [ ] `<title>` — unikalus, 50-60 char, brand'as gale: `Page Topic — Arisa in WonderDolls`
- [ ] `<meta name="description">` — 140-160 char, su CTA žodžiu
- [ ] `<link rel="canonical">` — pilnas absolute URL
- [ ] `<meta property="og:title|description|image|url|type>`
- [ ] `<meta name="twitter:card" content="summary_large_image">`
- [ ] `<meta name="theme-color" content="#FFFCF8">`
- [ ] One `<h1>` (po jo `<h2>`, `<h3>` hierarchija)
- [ ] All `<img>` — `alt` atributas su prasme (ne "image", ne file name)
- [ ] Schema.org JSON-LD (žr. žemiau)
- [ ] Internal links iš/į kitus svetainės puslapius (min 2)

## Schema.org per-page

| Page | Schema type |
|---|---|
| `index.html` | `Store` ✅ (jau yra) + `WebSite` su SearchAction |
| `shop.html` | `ItemList` su Product items |
| `product.html` | `Product` + `Offer` + `AggregateRating` (jei testimonials) |
| `gallery.html` | `ImageGallery` arba `CollectionPage` |
| `about.html` | `AboutPage` + `Person` (Arisa) + `Organization` |
| `contact.html` | `ContactPage` + `LocalBusiness` |
| `privacy.html` | nereikia |
| `terms.html` | nereikia |

### `Store` extension
Add prie esamo `Store` schema (`index.html`):
```json
{
  "@type": "Store",
  "founder": {"@type": "Person", "name": "Arisa"},
  "foundingDate": "2020",
  "areaServed": "Worldwide",
  "paymentAccepted": "Bank Transfer"
}
```

### `Product` template (`product.html`)
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Liora",
  "description": "...",
  "image": "https://arisainwonderdolls.com/assets/img/products/liora-1.jpg",
  "brand": {"@type": "Brand", "name": "Arisa in WonderDolls"},
  "category": "Reborn doll",
  "offers": {
    "@type": "Offer",
    "url": "https://arisainwonderdolls.com/product.html?id=liora",
    "priceCurrency": "THB",
    "price": "1480",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition"
  }
}
```

## Sitemap (`sitemap.xml`)

- Update kiekvieną kartą kai prisideda puslapis
- `lastmod` — ISO date
- Priority: home 1.0, shop 0.9, product 0.8, about/contact 0.7, gallery 0.7, privacy/terms 0.3

## robots.txt

```
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://arisainwonderdolls.com/sitemap.xml
```

## Keyword targeting (Phase 2)

Primary keyword groups for Arisa:
- "reborn doll" + ["handmade", "artist", "Thailand", "Bangkok", "lifelike", "adoption"]
- "reborn baby" + ["sleeping", "newborn", "toddler", "awake"]
- "[doll name]" — long tail per product (Liora, Theo, Margot)
- "reborn nursery"
- "custom reborn doll commission"

**Geographic:** Worldwide shipping, but content geared toward EN-speaking collector communities (US/UK first).

## Performance (Core Web Vitals — must pass)

| Metric | Target | How |
|---|---|---|
| LCP | < 2.5s | Hero image lazy-load, font preload, no JS blocking |
| CLS | < 0.1 | All images have width/height, no layout shift |
| INP | < 200ms | Minimal JS, no heavy listeners |
| FCP | < 1.8s | Critical CSS inline (jei reikia), defer non-critical |

**Tools:**
- Chrome DevTools Lighthouse (run before each deploy)
- PageSpeed Insights (post-deploy)
- WebPageTest (pre-launch)

## Image SEO

- Format: WebP primary, JPG fallback
- Compression: Squoosh.app target 80% quality
- Naming: `liora-sleeping-newborn-19in.webp` (not `IMG_2034.jpg`)
- `alt`: descriptive — "Liora, a sleeping newborn reborn doll cradled in linen"
- `loading="lazy"` for below-fold
- `decoding="async"` for all

## Open Graph image (`assets/img/og/og.png`)

- 1200×630 px
- Brand mark + "Arisa in WonderDolls" + tagline
- Soft pastel bg
- Test in https://opengraph.xyz/

## Search Console / GA

- **Phase 1:** nereikia (klientas neapsisprendė tracking'o)
- **Phase 2:** Google Search Console — privaloma. GA4 — su GDPR consent banner (Cookiebot ar custom).
