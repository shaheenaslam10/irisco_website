# Main page — how it is built

**Status: built.** This is how the main page works, and why.

---

## 1. What the four references actually ask for

| Ref | Title | What it means for us |
|---|---|---|
| **F2qpSmHyPTc** | *3D Scroll Animated Coffee Website. Full Design Process* | The hero is a **product that turns in space**, driven by scroll. Not a photo, not a video plane. This is the primary reference. |
| **UqzITbr4cOw** | *Juice Animation Web Design In Figma* | Several independent objects, each with its own timing, composing a scene. Nothing moves as one block. |
| **dnp2WWJq4-o** | *Animated Coffee Shop Landing Page* | "Steaming coffee cups animate on scroll." Soft browns, creamy whites, cosy type, micro-interactions. |
| **q6DuLX9GX9E** | *Animated Website · parallaxscroll* | Layered depth — foreground/background separating as you scroll. |

## 2. Hard constraints from the brief

- ❌ **No background video. Not at all.** No full-bleed looping plate anywhere.
- ❌ **Not a static cup.** The cup must be built, turned, poured, steamed.
- ✅ Very smooth scrolling.
- ✅ Objects move on scroll — independently, at their own depths.
- ✅ Video *plays* on scroll — scroll is the playhead, forward and back.
- ✅ Real animation libraries, not hand-rolled.
- ✅ Use the assets folder.

---

## 3. Stack

Unchanged: Next 16 · React 19 · Tailwind 4 · TypeScript strict.

### The big find: GSAP 3.15 ships every premium plugin, free

`node_modules/gsap` already contains them (confirmed present, v3.15.0):

| Plugin | Why we want it |
|---|---|
| **ScrollSmoother** | GSAP's own smooth scroll. Gives every element `data-speed` / `data-lag` depth for free — one attribute instead of a hand-written parallax tween. Replaces Lenis. |
| **ScrollTrigger** | Pins, scrubs, container animations. |
| **SplitText** (v3.15) | Proper line/word/char splitting **with masking** (`mask`, `autoSplit`, `onSplit`), re-splits on resize, keeps `aria` intact. Replaces the hand-rolled word splitter. |
| **DrawSVGPlugin** | The IRISCO ring and rule lines draw themselves. |
| **MotionPathPlugin** | Objects travelling along real curves — beans arcing into the cup. |
| **CustomEase** | Bespoke easing so motion has a signature, not `power3.out` everywhere. |
| **Flip** / **Observer** / **ScrollToPlugin** / **ScrambleTextPlugin** | Card→detail transitions, drag/swipe, anchor jumps, text effects. |

Installable if wanted: `three` 0.185 · `@react-three/fiber` 9.7 · `@react-three/drei` 10.7 · `ogl` 1.0.11 · `motion` 13.1 · `locomotive-scroll` 5.0 · `rive-react` · `lottie-web`.

**Structural note:** ScrollSmoother needs `#smooth-wrapper > #smooth-content` and transforms that content, so `position: fixed` descendants break. The site header lives in `app/layout.tsx` (outside the wrapper — fine); the rail, grain, vignette and cursor will be portalled to `document.body` so they stay put.

---

## 4. The centrepiecpiece: "The Cup, assembled"

The repo already contains a complete, brand-accurate **transparent layer kit**. This is the single most valuable thing in the assets folder and the previous build never used it.

| Asset | Size | Alpha | Colour | Role |
|---|---|---|---|---|
| `irisco-navy-cup.png` | 1024×1536 | 53% | `#183c55` | The navy cup — hero object |
| `irisco-cup-ivory-open-1600.webp` | 1254×1254 | 35% | `#bfb8af` | Ivory cup, open |
| `irisco-lid-navy-1600.webp` | 1254×1254 | 36% | `#2d4b67` | Lid |
| `coffee-liquid-assets-1600.webp` | 1536×1024 | 20% | `#753821` | Pour / liquid |
| `coffee-steam-assets-1600.webp` | 1254×1254 | 20% | `#cccccd` | Steam |
| `coffee-bean-assets-1600.webp` | 1254×1254 | 46% | `#6f4334` | Beans |
| `coffee-surface.png` | 1254×1254 | 12% | `#352019` | Crema surface |
| `coffee-stone-surface` | 1600×900 | — | `#d5ccc3` | Plinth / ground |

> Note: five of the source **PNG** files are corrupt (they fail to decode), but every **WebP** counterpart is valid with alpha intact. We use the WebPs.

```
                    ~~~~  steam        data-speed 0.75 + endless drift
                 ┌ ─ ─ ─ ┐
                   lid                 data-speed 0.9  + rotateY on scroll
                 └ ─ ─ ─ ┘
              ╭─────────────╮
              │   liquid    │         data-speed 1.05
              │   CUP       │         data-speed 1.0  + rotateY −14° → +14°
              ╰─────────────╯
           ● beans ●                   MotionPath arcs, data-speed 1.35
        ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓            plinth, data-speed 0.6
```

- **On load:** an assembly sequence — plinth fades up, cup rises, liquid pours in, steam curls, lid settles, beans float in on curved paths.
- **On scroll:** the stage rotates in 3D space (`rotateY`, `rotateX`, `translateZ`), and every layer separates at its own `data-speed`, so the composition has genuine dimension. Headline splits (SplitText, masked) and drifts.

---

## 5. "Video plays on scroll" — image sequences

Four generated clips sit in `videos_v1` (1536×672, 4.5–6.6s). Instead of looping them, extract each into a **frame sequence**:

- ~48 frames per clip, 1280px wide, WebP ~q78 → roughly 1.2–1.8 MB per sequence
- Driven directly by scroll progress: **down pours the coffee, up un-pours it**
- Preloaded on approach with a progress readout; poster frame first so nothing is ever blank
- Frame-accurate everywhere, no codec/autoplay/iframe issues at all

Trade-off vs the current all-intra MP4 scrub: sequences cost more bytes and add ~200 files to the repo, but they never stutter and never hit an autoplay policy. Worth it for the hero moment; the MP4 scrub can stay for secondary beats.

---

## 6. Chapter arc

| # | Chapter | Device |
|---|---|---|
| 00 | **Arrival** | The cup assembles on a plinth. Masked SplitText headline. Layers separate on scroll. |
| 01 | **The idea** | Manifesto, SplitText word-by-word highlight driven by scroll progress. |
| 02 | **The pour** | Pinned. 48-frame sequence scrubbed by the wheel. Four beats on a DrawSVG progress rail. |
| 03 | **The craft** | Beans → grinder → tamp → extraction. Each photograph travels along its own MotionPath; layered `data-speed` depth. |
| 04 | **The counter** | The IRISCO ring draws (DrawSVG), then opens as a circular lens onto the bakery case. |
| 05 | **The pantry** | Pinned horizontal shelf. Flip a card → its detail panel. |
| 06 | **The room** | Deep photographic parallax stack. |
| 07 | **The table** | Sticky copy beside drifting objects; the chessboard. |
| 08 | **Your move** | Every layer converges back into the cup. Ring closes. CTA. |

---

## 7. Engineering guarantees (learned from V1)

V1 shipped four real bugs. All of them are now designed out, not patched over:

1. **Cascade collision** — `.cv { position: relative }` silently overrode the fill helpers, collapsing every clip to 0px. → V2 uses a single BEM-ish prefix and no competing single-class utilities.
2. **`gsap.from()` against CSS-owned start states** — animated hidden→hidden, so the hero copy never appeared. → V2: **every** tween is `fromTo`/`to` with an explicit end value. Lint-enforced by review.
3. **Media events firing before hydration** — → V2 uses image sequences, so there is no `canplay` to miss.
4. **One broken chapter blanking the rest** — → each scene setup stays in `try/catch`, with a watchdog that drops the motion flag if the layer never reports ready.

Also carried forward: no-JS and `prefers-reduced-motion` both receive a finished, legible page; `npm run lint` / `typecheck` / `build` must be green before every commit.

---

## 8. Decisions taken

| Question | Answer |
|---|---|
| 3D fidelity | **Hybrid** — WebGL cup for the hero, layered 2.5D from the real transparent artwork for every other chapter |
| Palette | **Espresso canvas** with navy/teal on the products and amber for the chandelier |
| Brand files | Build now; every mark and colour centralised in `lib/brand.ts` for a later swap |
| Business details | Keep placeholders, centralised in `lib/content/site.ts` |
| Scope | Main page only, weight not a constraint |
