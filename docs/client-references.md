# Client References — Arisa in WonderDolls

Klientė pateikė 5 reference svetaines. Analizė — ką imti, ko vengti.

## 1. https://www.bountifulbaby.com/

**Industry:** Reborn doll supplier (kits, supplies)
**Take:** Product taxonomy (newborn / toddler / awake / sleeping / open eye / closed eye), filter UX
**Avoid:** Catalog feel, busy layout, banners, sale tags, low-trust visual quality

## 2. https://onlyreborns.com/

**Industry:** Reborn doll marketplace
**Take:** Per-product detail page structure (specs, story), "adoption" language
**Avoid:** Cluttered grid, multi-vendor confusion, no editorial presence — Arisa = single artist

## 3. https://babyclon.com/en/home/

**Industry:** Hyperrealistic reborn doll artist
**Take:** Premium positioning, hero photography, single-artist storytelling, certificate-of-authenticity vibe
**Avoid:** Heavy red/gold luxury palette (too "high-end watch") — Arisa = soft pastel, not opulent

## 4. https://www.maisonette.com/

**Industry:** Children's lifestyle / curated retail
**Take:** Editorial layout, hero whitespace, magazine-like sections, "for every kind of waiting" tone
**Avoid:** Multi-brand model, lifestyle photography that's not Arisa's actual product

## 5. https://www.scandiborn.co.uk/

**Industry:** Scandinavian children's products
**Take:** Soft pastel palette, calm typography, generous whitespace, "considered" pace
**Avoid:** Modern Scandi minimalism that feels cold — Arisa needs warmth too

## Synthesis — Arisa's positioning sweet spot

```
Bountiful Baby ──[catalog]──┐
                            │
Only Reborns ───[market]────┤
                            ├──────► Arisa = Atelier (single artist) +
Babyclon ──────[premium]────┤        Editorial (story-led) +
                            │        Soft pastel (warm, not opulent) +
Maisonette ───[editorial]───┤        Personal voice
                            │
Scandiborn ────[calm]───────┘
```

## Visual moves we borrowed

| From | What | Where in Arisa |
|---|---|---|
| Maisonette | Section-head with eyebrow + display H2 + body-l on right | All section heads |
| Scandiborn | Generous vertical rhythm, soft section bg colors | `section`, `bg-paper`, `bg-blush` |
| Babyclon | Premium product card with serif name + mono price | `.product-card .meta-row` |
| Bountiful Baby | Filter chips by attribute | `shop.html` `.chips` |
| Editorial mags (NYT Style) | Italic swash on emotional words | `.swash`, `.italic` |

## Visual moves we explicitly rejected

- ❌ Sliding hero carousels (Bountiful Baby) — slow, low CWV, unfocused
- ❌ "On Sale" red badges (Only Reborns) — wrong brand register
- ❌ Heavy gold/red luxury (Babyclon) — wrong palette per brief
- ❌ Avatar / multi-artist UGC sections (Only Reborns) — Arisa is solo
- ❌ "As seen in" press logos — Arisa doesn't have press yet (don't fake)
- ❌ Pop-up newsletters on first visit — friction, brand-incongruent

## Things to ask Arisa about

After seeing the references:
1. Babyclon has "Certificate of Authenticity" — Arisa says "Adoption certificate". Confirm wording.
2. Several reference sites use "Reserve" language — we use "Adopt / Begin an adoption". Confirm.
3. Some sites show artist photo + bio. Does Arisa want her face on the About page?
4. Some sites have video (atelier process). Future Phase?
