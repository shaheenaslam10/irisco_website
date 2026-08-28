# IRISCO — Premium scroll redesign direction

Branch: `feature/premium-scroll-redesign`. This documents the creative + technical
direction so the work reads as one intentional system, not scattered effects.

## The problem with the previous design

The previous site was technically competent (a genuinely production-grade GSAP +
ScrollTrigger engine) but read as templated. Two reasons, both diagnosable:

1. **No real typography.** It shipped only system-font stacks (`Iowan Old Style`,
   `Avenir Next`), which collapse to Times/Arial on most machines. Premium editorial
   feel is impossible without real type.
2. **It sat inside two "AI-default" looks at once:** a warm cream canvas
   (`#faf9f5`/`#f4f0e7`) + serif display + amber/clay accents, *and* a hairline-rule
   broadsheet layout. Those are the two most common generic directions, so the brand's
   single most distinctive asset — its deep teal identity — was buried as an accent.

Plus: the hero was an AI-generated coffee-cup **video prototype** (a tech demo, not a
thesis), mobile motion was mostly plain fades, and there was dead CSS from three
abandoned hero prototypes.

## Direction: "The teal hour"

Invert the palette. Make **deep teal the immersive canvas** and ivory the relief. The
site becomes a cinematic journey through IRISCO's real teal-lit room, alternating
**immersive teal "night" chapters** (type-forward, pinned, cinematic) with **ivory
"daylight" chapters** (airy, editorial, readable). That alternation *is* the scroll
rhythm — and it's true to the brand, not a default.

### Color (roles, not just hex)

- `--ink` deep teal `#062b34` — dominant canvas for cinematic chapters
- `--ink-2` `#043844` — layered teal
- `--brand` `#07536a` — IRISCO teal, structural
- `--spark` cobalt `#1f5fe0` (from the cobalt seating) — the electric accent; used sparingly
- `--aqua` `#8fd3ce` — luminous highlight, ring glow partner
- `--glow` amber `#e7a64d` — the chandelier light; reserved for the signature ring
- `--paper` `#f5f1e8` / `--ivory` `#efe9db` — daylight reading surfaces
- `--chilli` `#b8432a` — one warm product accent only

### Type

- **Display: Fraunces** (variable, optical sizing) — soft, characterful old-style serif.
  Carries craft/heritage warmth (coffee, bakery, Pakistani cultural memory). Used big,
  tight, and with restraint. Not Playfair — deliberately less "Didone default."
- **Body/UI: Hanken Grotesk** (variable) — a clean, warm contemporary grotesque for
  body, navigation, labels, buttons. Contemporary counterweight to the serif.
- Two families only (performance). Labels are Hanken uppercase, wide-tracked.

### Signature: the IRISCO ring

The room's real centerpiece is a **circular chandelier** hung over Quaid-e-Azam artwork.
A thin luminous ring becomes the recurring signature: it draws in on load, expands as a
**circular clip-path lens** that reveals imagery, marks chapters, and doubles as the
scroll-progress indicator. It echoes a chandelier, a cup rim, a shared table — the whole
idea of things (and people) finding their place around a center.

### Motion

Keep the existing production engine (matchMedia, `gsap.context`, reduced-motion guard,
`invalidateOnRefresh`, font/image-ready refresh). Add:

- **Lenis** smooth scroll, integrated through the GSAP ticker (the one dependency added).
- Orchestrated **hero load** sequence (ring draw + line-masked headline).
- **Circular reveal** hero→intro transition (teal night → ivory day).
- A **horizontal "pantry shelf"** section (the site had no horizontal scroll).
- Real **mobile choreography** (not just fades): shorter reveals, kept parallax, the ring.
- Micro: magnetic primary CTA, line-reveal headings, image hover scale, scroll-aware nav.
- `prefers-reduced-motion`: all content resolves to static, legible end states.

## What we keep / change / cut

- **Keep:** Next 16 / React 19 / Tailwind 4 / GSAP stack, the `lib/content/site.ts`
  content model, all real photography, the motion infrastructure, the
  `[data-reveal]`/`[data-parallax]` primitive, routing, SEO structure.
- **Change:** typography, color direction, hero, header, footer, every section's
  composition + type, mobile motion, product/menu/space/visit page skins.
- **Cut:** the prototype coffee video as hero, the orphaned `CoffeeScene` +
  `coffeeTimeline`, and the dead "Phase 4B/4D/4E" duplicated CSS.

We do not invent business facts. "To be confirmed" details stay centralized in
`lib/content/site.ts`.
