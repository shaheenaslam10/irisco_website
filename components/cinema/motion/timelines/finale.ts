import type { SceneSetup } from "./types";

/**
 * 08 · Your move.
 *
 * The plate drifts, the ring draws in as the counter's ring did at the
 * beginning, and the word lands. Nothing pins here — the page should feel like
 * it is finally exhaling.
 */
export const setupFinale: SceneSetup = ({ gsap, scene }) => {
  const image = scene.querySelector<HTMLElement>("[data-finale-img]");
  const ring = scene.querySelector<HTMLElement>(".c-finale-ring");
  const ringCircle = scene.querySelector<SVGCircleElement>("[data-finale-ring]");

  if (image) {
    gsap.fromTo(
      image,
      { scale: 1.22, yPercent: -4 },
      {
        scale: 1,
        yPercent: 4,
        ease: "none",
        scrollTrigger: {
          trigger: scene,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
    );
  }

  if (ringCircle) {
    const length = ringCircle.getTotalLength?.() ?? 0;
    if (length) gsap.set(ringCircle, { strokeDasharray: length, strokeDashoffset: length });

    const draw = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: scene,
        start: "top 92%",
        end: "bottom 62%",
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });
    draw.to(ringCircle, { strokeDashoffset: 0, duration: 1 }, 0);
    if (ring) {
      draw.fromTo(
        ring,
        { scale: 1.4, opacity: 0.05 },
        { scale: 1, opacity: 0.55, duration: 1 },
        0,
      );
    }
  }
};
