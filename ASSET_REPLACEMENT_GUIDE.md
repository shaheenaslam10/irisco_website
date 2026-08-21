# IRISCO asset replacement guide

All originals are preserved in `public/assets/irisco/reference/`. Optimized WebP and AVIF derivatives live in `public/assets/irisco/optimized/` and regenerate with `npm run optimize:images`.

| Source asset | Current use | Status |
|---|---|---|
| `logo.jpg` | Header and brand reference | Final; never distort or crop through the wordmark |
| `logo_with_cups.png` | Hero and coffee ritual masked composition | Final artwork; an isolated cup would improve future depth |
| `main-counter.jpg` | Bakery reveal and final collage | Final environmental photograph |
| `table_rak.jpg` | Pantry shelf final state and shop hero | Final environmental photograph |
| `product_honey.jpg` | Pantry object, catalog, final collage | Final shelf detail |
| `product_flour.jpg` | Pantry object and catalog | Final shelf detail |
| `product_fragrance_candles.jpg` | Pantry object, catalog, final collage | Final shelf detail |
| `762018791_18118018009841859_137573672561098918_n.jpg` | Chilli-oil spotlight | Final shelf detail |
| `interior-gallery.jpg` | Culture/chandelier sequence | Final; preserve artwork exactly |
| `interior-gallery-1.jpg` | Space editorial section | Final wide photograph |
| `community-chess.jpg` | Community chapter and story page | Final; do not manipulate guests or faces |

## Optional future photography

- Branded coffee cup and lid as separate transparent assets: matched front three-quarter view, 3000 px minimum, soft grounded shadow supplied separately.
- Individual pastries and pantry products: consistent three-quarter camera angle and light direction, transparent background, 2400 px minimum.
- Sandwich, book/art card, chess piece, and candle: identical light direction for the final table composition.
- Keep 12% clear mobile-safe space around every isolated object.
- Image sequence: 40–60 WebP/AVIF frames at 1600×1600. Video alternative: 4K ProRes 422 without burned-in text.

Use lowercase kebab case: `category-product-angle-01.ext`. Keep originals immutable; append width to derivatives, e.g. `coffee-branded-cup-front-01-1600.webp`.
