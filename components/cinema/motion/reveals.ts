import type { Gsap, ScrollTriggerType } from "./gsapSetup";

const EASE = "power3.out";

/**
 * Declarative entrance choreography.
 *
 * Any element in the cinema can opt in with `data-reveal`:
 *   data-reveal            → rise + fade (default)
 *   data-reveal="scale"    → settle from 1.06 + fade
 *   data-reveal="mask"     → the inner <span> slides up out of an overflow clip
 *   data-reveal="words"    → per-word scrubbed highlight (handled by the scene)
 *
 * Wrap siblings in `data-reveal-group` to stagger them in DOM order.
 *
 * The hidden start state lives in CSS behind `html.js-motion`, which means a
 * visitor without JS (or with reduced motion) simply gets the finished page.
 */
export function buildReveals(gsap: Gsap, root: HTMLElement, mode: "desktop" | "compact" = "desktop") {
  root.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
    group.querySelectorAll<HTMLElement>("[data-reveal]").forEach((child, i) => {
      child.dataset.revealIndex = String(i);
    });
  });

  root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
    if (el.dataset.reveal === "words") return; // owned by the scene timeline
    // A scene can ask for a reveal only at one breakpoint — e.g. the ritual
    // steps crossfade on desktop but read as a normal list on a phone.
    const only = el.dataset.revealIf;
    if (only && only !== mode) return;
    const kind = el.dataset.reveal || "up";
    const delay = Number(el.dataset.revealIndex ?? 0) * 0.085;
    const trigger = (el.closest("[data-reveal-scope]") as HTMLElement | null) ?? el;

    const scrollTrigger = {
      trigger,
      start: "top 88%",
      once: true,
    } as const;

    if (kind === "mask") {
      const inner = el.querySelector("span") ?? el;
      // `y: 0` matters: the CSS start state is `translateY(106%)`, which GSAP
      // reads off the computed matrix as a pixel `y`. Animating `yPercent` alone
      // would leave that pixel offset behind and the line would stay clipped.
      gsap.fromTo(
        inner,
        { y: 0, yPercent: 106 },
        { y: 0, yPercent: 0, duration: 1.05, ease: EASE, delay, scrollTrigger, immediateRender: false },
      );
      return;
    }

    if (kind === "scale") {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.15, ease: EASE, delay, scrollTrigger, immediateRender: false },
      );
      return;
    }

    gsap.fromTo(
      el,
      { opacity: 0, y: 34 },
      { opacity: 1, y: 0, duration: 0.95, ease: EASE, delay, scrollTrigger, immediateRender: false },
    );
  });
}

/**
 * Scroll-linked depth. `data-parallax` holds a depth factor (0 → none,
 * ~0.25 → pronounced); the element must sit inside an overflow-hidden frame
 * with enough bleed to move into.
 */
export function buildParallax(gsap: Gsap, root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
    const depth = Number(el.dataset.parallax ?? 0.12);
    const frame = (el.closest("[data-parallax-frame]") as HTMLElement | null) ?? el.parentElement;
    if (!frame) return;
    const shift = depth * 30; // yPercent — kept inside the frame's bleed
    gsap.fromTo(
      el,
      { yPercent: -shift },
      {
        yPercent: shift,
        ease: "none",
        scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  });
}

/**
 * Continuous marquee with a nudge of scroll velocity.
 *
 * Driven from the GSAP ticker rather than a tween: the belt's width depends on
 * the display font, so we re-measure it once the webfonts land (and on resize)
 * instead of trusting the fallback metrics captured during setup.
 */
export function buildMarquee(gsap: Gsap, ScrollTrigger: ScrollTriggerType, root: HTMLElement) {
  const teardown: Array<() => void> = [];

  root.querySelectorAll<HTMLElement>("[data-marquee]").forEach((row) => {
    let distance = row.scrollWidth / 2;
    if (!distance) return;

    let x = 0;
    let timeScale = 1;
    const baseSpeed = 1.05; // px per 60fps frame

    const tick = () => {
      distance = distance || row.scrollWidth / 2;
      x -= baseSpeed * timeScale * gsap.ticker.deltaRatio();
      if (distance > 0 && x <= -distance) x += distance;
      row.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
    };

    const measure = () => {
      distance = row.scrollWidth / 2;
    };

    gsap.ticker.add(tick);
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure).catch(() => undefined);

    // Scrolling gives the belt a little extra pull — and reverses it uphill.
    const st = ScrollTrigger.create({
      trigger: row.parentElement ?? row,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const v = self.getVelocity();
        const dir = v > 0 ? 1 : -1;
        timeScale = dir * gsap.utils.clamp(1, 3.2, 1 + Math.abs(v) / 1500);
      },
      onLeave: () => {
        timeScale = 1;
      },
      onLeaveBack: () => {
        timeScale = 1;
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
