# Content Guidelines — Arisa in WonderDolls

## Voice charter

**Friendly, warm, approachable** (per kliento brief). **Editorial. Tender.**

Imagine Arisa writing a letter to a collector who's been waiting six months. Not a marketing manager writing for SEO.

## Audience awareness

Three audiences read the same words. Copy must work for all three:

| Audience | What they want to feel | Don't talk to them like |
|---|---|---|
| Collectors (women 25+) | Discerning, taken seriously, part of something rare | A first-time buyer |
| Girls 9–12 (parents read first) | Mature respect, not condescended to | A child |
| Therapy/comfort buyers | Safe, dignified, not pathologized | A patient |

**One voice for all three:** quiet, respectful, slightly literary.

## Rules

### ✅ Do

- Write short sentences. One thought per sentence.
- Use specific sensory verbs: *traced*, *placed*, *rooted*, *cradled*, *breathed*
- Use numbers: "30 layers of paint", "six to ten weeks", "217 souls adopted"
- Refer to dolls as **she/he/they**, names. Not "it" or "the product".
- Use "adoption" for purchase. "Adopt", "homecoming", "in the nursery", "wait list".
- Footnote facts that build trust: "Genesis heat-set paint", "German glass eyes", "imported mohair"

### ❌ Don't

- **No emojis. Anywhere.** (Brief explicitly said.)
- No exclamation marks (one allowed per page max, in a quote).
- No "click here", "buy now", "limited time", "sale", "hurry", "don't miss"
- No "cute", "adorable", "sweetie", "darling" (Arisa doesn't talk about her work that way)
- No "amazing", "awesome", "incredible", "stunning"
- No "we're excited to", "we're proud to", "we believe"
- No fake scarcity ("only 2 left!" unless literally true)
- No corporate hedge: "may", "might", "can help to", "is designed to"

### Tone calibration

**Too cold (don't):**
> Reborn doll. 19in. Genesis paint. ฿56,000. In stock.

**Too hot (don't):**
> Meet Liora! 💕 She's an absolutely stunning sleeping baby and we just KNOW you're going to fall in love with her perfect little face!

**Right:**
> **Liora** · sleeping newborn, 19 in.
> Painted in 28 layers of Genesis heat-set. Mohair rooted by hand over four evenings. She is waiting.

## Page-by-page copy briefs

### Home (`index.html`)
- Hero: emotional hook (one short headline + one paragraph)
- Trust strip: 4 plain facts (made one at a time, paint method, hair, shipping)
- Featured 4 dolls: name, type, price
- Editorial split: a quote-like statement + photo
- Process: 4 steps, calm and short
- Testimonial: one, from a real collector if possible
- Newsletter: "Two or three letters a year"

### Nursery (`shop.html`)
- Quiet intro line (1 sentence)
- Filter chips (newborn / toddler / sleeping / awake)
- Grid of available dolls
- Wait list CTA at bottom

### Product (`product.html`)
- Doll name (display serif, large)
- One-line subtitle (sleeping toddler · 21in · mohair)
- Price + "VAT included · insured shipping at checkout"
- Story paragraph (3-5 sentences — who is she, what's she like)
- Spec list (data attribute keys: kit, weight, hair, eyes, paint, shipping)
- "Begin an adoption" CTA → cart
- Care notes accordion

### About / Atelier (`about.html`)
- Intro: Arisa, the atelier, the why
- "How a doll is made" — same 4 steps as home but expanded
- Materials: paint brand, mohair source, kits used
- Personal note from Arisa

### Contact / Adoption (`contact.html`)
- Intro: "Tell us a little about who you're hoping to bring home"
- Form fields: name, email, message, optional doll-of-interest dropdown
- Cards: response time (24h), shipping, returns

### Privacy / Terms
- Plain language. No "WHEREAS". One paragraph per topic.

## Content sources (where to pull facts)

When writing copy, source facts from:
1. `content/products.json` — doll specs, never invent
2. `content/faq.json` — shipping, returns, care
3. `content/testimonials.json` — quotes only from this file (real, not fabricated)
4. Arisa's own materials — original brief, future emails

**Never invent:** prices, doll counts, materials, awards, press mentions, adoption numbers.

## Localization

Phase 1: English only.
If multi-lang Phase 2 — start with Thai, then English-only collector market.
