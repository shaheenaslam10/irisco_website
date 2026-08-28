# IRISCO immersive website

A production-oriented Next.js website for IRISCO: café, bakery, curated pantry,
cultural gallery, and community space.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
npm run optimize:images            # reference photos → public/assets/irisco/optimized
FFMPEG=/path/to/ffmpeg ./scripts/build-cinema-media.sh   # homepage film derivatives
```

## What is where

| Route | What it is |
|---|---|
| `/` | **The cinema** — a nine-chapter, scroll-driven film built from the generated clips. See [`docs/CINEMA_MAIN_PAGE.md`](docs/CINEMA_MAIN_PAGE.md). |
| `/menu` | Menu groups |
| `/shop`, `/shop/[slug]` | Curated pantry catalogue + product pages |
| `/space` | IRISCO Space |
| `/visit` | Visit details |

Business details, navigation, catalog categories, products, and menu groups live
in `lib/content/site.ts`. Homepage story copy lives in
`components/cinema/content.ts`. Unknown address, hours, phone, social, and
direction details intentionally remain centralized placeholders.

## Design system

- **Palette** — warm-black *espresso* (`#0b0806`) for the outer chapters, deep
  IRISCO *teal* (`#062b34`) for the middle ones, with amber (`#e7a64d`) as the
  chandelier accent and aqua (`#8fd3ce`) as the luminous highlight.
- **Type** — Fraunces (display, self-hosted variable) + Hanken Grotesk (body,
  self-hosted variable). Two families only.
- **Signature** — the IRISCO ring: a thin amber circle that draws itself and
  opens as a lens. It echoes the chandelier, a cup rim, and people gathering
  round a table.

## Motion

Desktop scenes use GSAP ScrollTrigger with reversible, scrubbed, pinned chapters
plus Lenis smooth-scroll driven through the GSAP ticker. Mobile keeps shorter
reveal choreography, native swiping for the horizontal shelf, and complete
photographic end states. `prefers-reduced-motion` — and any failure to load the
motion layer — presents all core content without dependent animation.

The homepage clips in `public/assets/irisco/videos_v1/` are the source for
`public/assets/irisco/cinema/`; the pipeline (ambient loops, half-width mobile
encodes, all-intra scrub tracks, posters) is documented in
[`docs/CINEMA_MAIN_PAGE.md`](docs/CINEMA_MAIN_PAGE.md).

Routes: `/`, `/menu`, `/shop`, `/shop/[slug]`, `/space`, and `/visit`.
