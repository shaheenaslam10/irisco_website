# IRISCO immersive website

A production-oriented Next.js website for IRISCO: café, bakery, curated pantry, cultural gallery, and community space.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run optimize:images
npm run lint
npm run typecheck
npm run build
```

Business details, navigation, catalog categories, products, and menu groups live in `lib/content/site.ts`. Unknown address, hours, phone, social, and direction details intentionally remain centralized placeholders.

Desktop scenes use GSAP ScrollTrigger with reversible, scrubbed, pinned chapters. Mobile uses shorter reveal choreography and static photographic end states. `prefers-reduced-motion` presents all core content without dependent animation.

Routes: `/`, `/menu`, `/shop`, `/shop/[slug]`, `/space`, and `/visit`.
