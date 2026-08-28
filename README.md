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
npm run optimize:images                                   # reference photos → optimized/
FFMPEG=/path/to/ffmpeg ./scripts/build-sequences.sh       # homepage frame sequences
```

## What is where

| Route | What it is |
|---|---|
| `/` | **The main page** — a nine-chapter, scroll-driven story with a WebGL cup, frame-sequence playback and layered object parallax. See [`docs/MAIN_PAGE.md`](docs/MAIN_PAGE.md). |
| `/menu` | Menu groups |
| `/shop`, `/shop/[slug]` | Curated pantry catalogue + product pages |
| `/space` | IRISCO Space |
| `/visit` | Visit details |

Business details, navigation, catalog categories, products, and menu groups live
in `lib/content/site.ts`. Homepage story copy lives in
`components/cinema/content.ts`. Unknown address, hours, phone, social, and
direction details intentionally remain centralized placeholders.

## Design system

- **Canvas** — warm-black *espresso* (`#0b0806`), so the café photography sits
  at its true warmth instead of being graded onto a colder surface.
- **Product** — IRISCO navy/teal (`#183c55`, `#2d4b67`) on anything the brand
  makes, since the real cups are navy.
- **Light** — amber (`#e7a64d`) for the chandelier, reserved for signature
  moments. Aqua (`#8fd3ce`) as the luminous highlight.
- **Type** — Fraunces (display) + Hanken Grotesk (body), both self-hosted
  variable woff2 in `app/fonts/`. Two families only.
- **Signature** — the IRISCO ring: a thin amber circle that draws itself and
  opens as a lens. It echoes the chandelier, a cup rim, and people gathering
  round a table.
- **Brand tokens** — every mark and colour lives in `lib/brand.ts`, so the logo
  and palette can be swapped in one file.

## Motion

GSAP 3.15 — whose premium plugins are all free — drives everything:
**ScrollSmoother** for smooth scroll and `data-speed` depth, **ScrollTrigger**
for pins and scrubs, **SplitText** for masked line reveals, **DrawSVG** for the
ring, **MotionPath** for objects on curves, **CustomEase** for a signature
curve, and **Flip / Observer / ScrollTo** for the rest. The hero cup is real
WebGL (`three` + `@react-three/fiber`), lathed from a profile, with a layered
2.5D fallback for machines without it.

There is **no background video anywhere**. The generated clips are used as
scroll-scrubbed frame sequences: scroll down pours the coffee, scroll up pours
it backwards.

`prefers-reduced-motion` — and any failure of the motion layer — presents all
core content as a finished, static page.

Routes: `/`, `/menu`, `/shop`, `/shop/[slug]`, `/space`, and `/visit`.
