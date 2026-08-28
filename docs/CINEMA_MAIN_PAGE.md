# The main page as cinema

`app/page.tsx` renders one component: `components/cinema/CinemaExperience.tsx`.
Everything below describes what it does and how to change it safely.

## The idea

The homepage is a nine-chapter film, not a stack of sections. The scroll wheel is
the playhead: chapters **pin** so a single frame can hold the viewport while an
animation plays out, videos are **scrubbed frame-by-frame** instead of simply
autoplaying, and the canvas alternates between warm-black *espresso* chapters and
deep *teal* chapters so the scroll has a rhythm you can feel.

| # | Chapter | Canvas | The device |
|---|---------|--------|-----------|
| 00 | Arrival | espresso | Full-bleed hero clip, masked line reveal, scrubbed parallax exit |
| 01 | The idea | espresso | Word-by-word highlight driven by scroll progress |
| 02 | The ritual | espresso | **Pinned** stage, frame-scrubbed clip, four beats on a progress bar |
| 03 | The room | teal | Full-bleed drifting plate under a rising statement |
| 04 | The counter | teal | The IRISCO ring draws, then opens as a circular lens onto the case |
| 05 | The pantry | teal | **Pinned** horizontal shelf, scroll converted to X travel |
| 06 | The gallery | teal | Staggered wall, every frame drifting at its own depth |
| 07 | The table | espresso | Sticky copy beside slow images, closing pull-quote |
| 08 | Your move | espresso | Ring draws in, plate settles, the door is open |

Two marquee belts run between chapters and pick up scroll velocity.

## Motion architecture

```
CinemaExperience.tsx      one GSAP context + one matchMedia per breakpoint
├── motion/gsapSetup.ts   on-demand gsap + ScrollTrigger, asset-ready refresh
├── motion/reveals.ts     data-reveal / data-parallax / data-marquee primitives
├── motion/videoScrub.ts  eased, frame-accurate video scrubbing on the ticker
├── motion/CinemaVideo.tsx  lazy, responsive, reduced-motion-aware clip delivery
├── motion/timelines/*.ts   one setup function per chapter
└── scenes/*.tsx            markup only; never touches GSAP
```

**One context, one matchMedia.** Every timeline is created inside a single
`gsap.context()` so teardown is atomic, and each breakpoint gets its own
`matchMedia()` branch so resizing across 1024px never leaves an orphaned pin.

**Hidden states live in CSS, behind `html.js-motion`.** An inline bootstrap in
`app/layout.tsx` adds `js-motion` to `<html>` before first paint — but only when
the visitor has *not* asked for reduced motion. Consequences:

- No JS ⇒ no `js-motion` ⇒ nothing is hidden ⇒ the page is complete and legible.
- `prefers-reduced-motion` ⇒ no `js-motion` ⇒ no pins, no hiding, no preloader.
- JS present but GSAP fails to load ⇒ the promise rejection handler removes the
  flag and the page degrades to the same static, finished document.

## The clips

`public/assets/irisco/videos_v1/` holds four generated Hailuo clips, all
1536×672 (2.2857:1). `scripts/build-cinema-media.sh` derives everything the page
uses into `public/assets/irisco/cinema/`:

```bash
FFMPEG=/path/to/ffmpeg ./scripts/build-cinema-media.sh
```

| Derivative | Why |
|---|---|
| `<name>-loop.mp4` / `.webm` | h264/VP9, faststart, **ping-pong** (forward + reversed) so the ambient loop has no visible cut |
| `<name>-mob.mp4` | half-width encode for small screens |
| `<name>-scrub.mp4` | **all-intra** (`-g 1`) at 12fps — every frame is independently decodable, so seeking from a scroll scrub resolves instantly |
| `<name>-poster.jpg` / `.webp` / `.avif` | the real first paint; the video fades over it only once it can play |

All-intra is the trick that makes frame scrubbing feel solid. Inter-frame h264
can only seek to keyframes, so a scrub would stutter to the nearest I-frame. 12fps
halves the payload *and* reads better when the timeline is driven by a wheel.
`motion/videoScrub.ts` then eases between the target time and the current time on
the GSAP ticker (the same clock as Lenis) and skips sub-20ms deltas.

Semantic names: `pour` (hero + ritual), `macro` (idea bed), `bakery` (room band),
`product` (pantry bed).

## Typography

Both families are **self-hosted variable woff2** in `app/fonts/`, wired up with
`next/font/local` in `app/layout.tsx` — no build-time request to Google Fonts, no
fallback flash, and the full Fraunces axis set (weight, optical size, SOFT, WONK)
with `font-optical-sizing: auto`.

- **Fraunces** — display. Everything large, tight, and slightly warm.
- **Hanken Grotesk** — body, UI, and the wide-tracked uppercase labels.

## Changing it

- **Copy** lives entirely in `components/cinema/content.ts`. Nothing else owns
  words. Business facts still come from `lib/content/site.ts`; anything the
  business has not confirmed stays a deliberate placeholder.
- **Chapters** are listed twice — in `content.ts` (for the rail) and as
  `data-cinema-scene` / `id="chapter-*"` on each scene. Keep them in step.
- **Motion** for a chapter lives in `motion/timelines/<name>.ts` and is registered
  in the `sceneSetups` map in `CinemaExperience.tsx`.
- **Adding a reveal** is markup-only: `data-reveal`, `data-reveal="mask"` (inner
  `<span>` slides out of an overflow clip) or `data-reveal="scale"`, wrapped in
  `data-reveal-group` to stagger. `data-reveal-if="compact"` scopes one to a
  breakpoint.
- **Adding depth** is `data-parallax="0.18"` inside a `data-parallax-frame`.

## Quality gates

```bash
npm run lint
npm run typecheck
npm run build
```

Verified: TypeScript clean, ESLint clean, production build green.
