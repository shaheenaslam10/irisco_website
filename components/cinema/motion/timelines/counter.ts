import type { SceneSetup } from "./types";

/**
 * 04 · The counter.
 *
 * The ring draws itself, then opens as a circular lens onto the bakery case
 * while the photograph settles out of an over-scale. One continuous scrub —
 * the lens only makes sense if the ring and the image breathe together.
 */
export const setupCounter: SceneSetup = ({ gsap, scene }) => {
  const ring = scene.querySelector<SVGCircleElement>("[data-counter-ring]");
  const figure = scene.querySelector<HTMLElement>("[data-counter-figure]");
  const image = scene.querySelector<HTMLElement>("[data-counter-img]");
  if (!figure) return;

  if (ring) {
    const length = ring.getTotalLength?.() ?? 0;
    if (length) gsap.set(ring, { strokeDasharray: length, strokeDashoffset: length });
  }

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: scene,
      start: "top 82%",
      end: "bottom 65%",
      scrub: 0.6,
      invalidateOnRefresh: true,
    },
  });

  if (ring) tl.to(ring, { strokeDashoffset: 0, duration: 1 }, 0);
  tl.fromTo(
    figure,
    { clipPath: "circle(0% at 50% 50%)" },
    { clipPath: "circle(78% at 50% 50%)", duration: 1.3 },
    0.4,
  );
  if (image) tl.fromTo(image, { scale: 1.32 }, { scale: 1, duration: 1.9 }, 0.4);
};
