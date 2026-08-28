import type { Gsap, Motion, ScrollTriggerType } from "./gsapSetup";

/**
 * Entrance choreography.
 *
 * Headings use GSAP's SplitText (`mask: "lines"`, `autoSplit`) rather than a
 * hand-rolled splitter — it re-splits on resize and on font load, keeps the
 * text accessible, and gives a real overflow mask per line.
 *
 * Everything else opts in with `data-reveal`:
 *   data-reveal            → rise + fade
 *   data-reveal="scale"    → settle from 1.06
 *   data-reveal="flip"     → rotateX in, like a card being dealt
 *   data-reveal-if="compact" → only animate at that breakpoint
 *
 * Every tween is `fromTo` with an explicit end value. V1's worst bug was
 * `gsap.from()` animating from a hidden CSS state to that same hidden state.
 */

type Mode = "desktop" | "compact";

export function buildSplitHeadings({ gsap, SplitText }: Pick<Motion, "gsap" | "SplitText">, root: HTMLElement) {
  const splits: Array<{ revert: () => void }> = [];

  root.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
    // The hero headline is already on screen at load, so it plays on a delay
    // rather than waiting for a scroll trigger that has already been passed.
    const isHero = !!el.closest('[data-scene="arrival"]');

    const split = SplitText.create(el, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      aria: "auto",
      linesClass: "sp-line",
      onSplit: (self) => {
        // CSS keeps split headings hidden until their masks exist; now they do.
        gsap.set(el, { opacity: 1 });
        return gsap.fromTo(
          self.lines,
          { yPercent: 112 },
          {
            yPercent: 0,
            duration: 1.25,
            stagger: 0.09,
            ease: "iris",
            delay: isHero ? 0.55 : 0,
            scrollTrigger: isHero
              ? undefined
              : { trigger: el, start: "top 90%", once: true },
          },
        );
      },
    });
    splits.push(split);
  });

  return () => splits.forEach((s) => s.revert());
}

export function buildReveals(gsap: Gsap, root: HTMLElement, mode: Mode = "desktop") {
  root.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
    group.querySelectorAll<HTMLElement>("[data-reveal]").forEach((child, i) => {
      child.dataset.revealIndex = String(i);
    });
  });

  root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
    const only = el.dataset.revealIf;
    if (only && only !== mode) return;

    const kind = el.dataset.reveal || "up";
    const delay = Number(el.dataset.revealIndex ?? 0) * 0.08;
    const scrollTrigger = { trigger: el, start: "top 90%", once: true } as const;

    if (kind === "scale") {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.15, delay, scrollTrigger, immediateRender: false },
      );
      return;
    }

    if (kind === "flip") {
      gsap.fromTo(
        el,
        { opacity: 0, rotateX: -32, y: 40, transformPerspective: 900 },
        {
          opacity: 1,
          rotateX: 0,
          y: 0,
          duration: 1.05,
          delay,
          ease: "iris",
          scrollTrigger,
          immediateRender: false,
        },
      );
      return;
    }

    gsap.fromTo(
      el,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.95, delay, scrollTrigger, immediateRender: false },
    );
  });
}

/**
 * The manifesto: words light up as you scroll through them.
 *
 * SplitText gives us real word elements; we then paint opacity from a rolling
 * head position rather than toggling classes, so the highlight is soft and the
 * sentence stays readable at any point in the scrub.
 */
export function buildWordHighlight(
  { gsap, SplitText, ScrollTrigger }: Pick<Motion, "gsap" | "SplitText" | "ScrollTrigger">,
  root: HTMLElement,
) {
  const el = root.querySelector<HTMLElement>("[data-words]");
  if (!el) return;

  const split = SplitText.create(el, {
    type: "words",
    autoSplit: true,
    wordsClass: "sp-word",
    aria: "auto",
    onSplit: (self) => {
      const words = self.words as HTMLElement[];
      const LEAD = 8;

      const paint = (progress: number) => {
        const head = progress * (words.length + LEAD);
        words.forEach((word, i) => {
          const t = gsap.utils.clamp(0, 1, (head - i) / LEAD);
          word.style.opacity = String(0.14 + 0.86 * t);
        });
      };

      paint(0);
      return ScrollTrigger.create({
        trigger: el,
        start: "top 78%",
        end: "bottom 55%",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (s) => paint(s.progress),
        onRefresh: (s) => paint(s.progress),
      });
    },
  });

  return () => split.revert();
}

/** Draws any `[data-draw]` SVG path/circle as the section scrolls past. */
export function buildDrawings(
  { gsap, DrawSVGPlugin }: Pick<Motion, "gsap" | "DrawSVGPlugin">,
  root: HTMLElement,
) {
  void DrawSVGPlugin;
  root.querySelectorAll<SVGGeometryElement>("[data-draw]").forEach((el) => {
    gsap.fromTo(
      el,
      { drawSVG: "0%" },
      {
        drawSVG: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: el.closest("[data-draw-scope]") ?? el,
          start: "top 85%",
          end: "bottom 60%",
          scrub: 0.6,
        },
      },
    );
  });
}

/** Continuous marquee that picks up scroll velocity. */
export function buildMarquee(gsap: Gsap, ScrollTrigger: ScrollTriggerType, root: HTMLElement) {
  const teardown: Array<() => void> = [];

  root.querySelectorAll<HTMLElement>("[data-marquee]").forEach((row) => {
    let distance = row.scrollWidth / 2;
    if (!distance) return;

    let x = 0;
    let scale = 1;
    const base = 1.05;

    const tick = () => {
      if (!distance) distance = row.scrollWidth / 2;
      x -= base * scale * gsap.ticker.deltaRatio();
      if (distance > 0 && x <= -distance) x += distance;
      row.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
    };

    const measure = () => {
      distance = row.scrollWidth / 2;
    };

    gsap.ticker.add(tick);
    window.addEventListener("resize", measure);
    void document.fonts?.ready.then(measure).catch(() => undefined);

    const st = ScrollTrigger.create({
      trigger: row.parentElement ?? row,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const v = self.getVelocity();
        scale = (v > 0 ? 1 : -1) * gsap.utils.clamp(1, 3.2, 1 + Math.abs(v) / 1500);
      },
      onLeave: () => {
        scale = 1;
      },
      onLeaveBack: () => {
        scale = 1;
      },
    });

    teardown.push(() => {
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", measure);
      st.kill();
    });
  });

  return () => teardown.forEach((fn) => fn());
}
