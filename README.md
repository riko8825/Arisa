# Arisa in WonderDolls

A premium boutique e-commerce + portfolio website for a one-woman reborn doll atelier.

## Pages

- `index.html` — Homepage
- `shop.html` — Nursery (product index)
- `product.html` — Product detail (template, "Liora")
- `gallery.html` — Portfolio masonry
- `about.html` — Atelier story
- `contact.html` — Adoption / contact form
- `privacy.html` — Privacy notice
- `terms.html` — Terms & conditions

## Stack

- Vanilla HTML / CSS / JS (zero build step)
- Cormorant Garamond + Jost + JetBrains Mono via Google Fonts
- Mobile-first; CWV-conscious (deferred JS, no external trackers, fonts preconnected)
- LocalStorage cart, SEO metadata, JSON-LD schema, sitemap.xml + robots.txt
- Vercel-ready static deploy — drop the folder in.

## Design system

| Token | Value |
| --- | --- |
| Porcelain | `#FFFCF8` |
| Cream paper | `#F8F2EA` |
| Soft blush | `#F0DAD2` |
| Dusted rose | `#D9A99E` |
| Whisper blue | `#D6DEE3` |
| Warm ink | `#2A2420` |

Editorial whitespace, generous serif display type, monospace eyebrow labels, striped placeholder imagery. Every placeholder identifies the photograph that should replace it.

## Next steps for the client

1. Replace striped placeholders with real photography (each carries a label naming the intended shot).
2. Wire `index.html` newsletter + `contact.html` form to a backend (Vercel Edge / Resend / Plausible).
3. Connect Stripe Checkout to the `Reserve` buttons; bank transfer flow already mocked in copy.
4. Drop the supplied logo file into `assets/` and replace the brand-mark SVG.
