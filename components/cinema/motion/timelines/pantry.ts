import type { SceneSetup } from "./types";

/**
 * 05 · The pantry.
 *
 * Desktop pins the section and converts vertical scroll into horizontal travel
 * along the shelf; each card rises as it enters through the container
 * animation, so the shelf reveals itself rather than sliding in as a block.
 *
 * Compact leaves it as a native, snapping swipe and only mirrors the progress
 * bar.
 */
export const setupPantry: SceneSetup = ({ gsap, ScrollTrigger, scene, mode }) => {
  const pin = scene.querySelector<HTMLElement>("[data-pantry-pin]");
  const viewport = scene.querySelector<HTMLElement>("[data-pantry-viewport]");
  const track = scene.querySelector<HTMLElement>("[data-pantry-track]");
  const progress = scene.querySelector<HTMLElement>("[data-pantry-progress]");
  const items = gsap.utils.toArray<HTMLElement>(scene.querySelectorAll("[data-pantry-item]"));
  if (!viewport || !track) return;

  const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

  if (mode === "compact") {
    const sync = () => {
      const max = distance();
      if (progress && max > 0) {
        gsap.set(progress, { scaleX: gsap.utils.clamp(0, 1, viewport.scrollLeft / max) });
      }
    };
    viewport.addEventListener("scroll", sync, { passive: true });
    sync();
    return () => viewport.removeEventListener("scroll", sync);
  }

  if (!pin) return;

  const drift = gsap.to(track, {
    x: () => -distance(),
    ease: "none",
    scrollTrigger: {
      trigger: scene,
      start: "top top",
      end: () => `+=${distance() + window.innerHeight * 0.6}`,
      pin,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 0.5,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        if (progress) gsap.set(progress, { scaleX: self.progress });
      },
    },
  });

  const reveals = items.map((item, i) =>
    gsap.fromTo(
      item,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          containerAnimation: drift,
          start: "left 95%",
          once: true,
        },
        delay: (i % 2) * 0.05,
      },
    ),
  );

  void ScrollTrigger;

  return () => {
    drift.scrollTrigger?.kill();
    drift.kill();
    reveals.forEach((tween) => {
      tween.scrollTrigger?.kill();
      tween.kill();
    });
  };
};
