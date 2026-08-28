import type { SceneSetup } from "./types";

/**
 * 00 · Arrival.
 *
 * Two separate timelines by design: a non-scrubbed *intro* that plays once on
 * load, and a scrubbed *exit* tied to the hero leaving the viewport. They never
 * animate the same property on the same element, so they cannot fight.
 *
 * Every tween here is an explicit `fromTo`. That matters: the hidden start
 * state lives in CSS (so the page is complete without JS), which means the
 * element's *current* value is already the hidden one. A `gsap.from()` would
 * animate from hidden to hidden and the hero would never appear.
 */
export const setupHero: SceneSetup = ({ gsap, ScrollTrigger, scene, mode }) => {
  const zoom = scene.querySelector<HTMLElement>("[data-hero-zoom]");
  const inner = scene.querySelector<HTMLElement>(".c-hero-inner");
  const cue = scene.querySelector<HTMLElement>(".c-scrollcue");
  const lines = scene.querySelectorAll<HTMLElement>("[data-hero-line] > span");
  const fades = scene.querySelectorAll<HTMLElement>("[data-hero-fade]");

  void ScrollTrigger;

  const intro = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.2 });

  if (lines.length) {
    // `y: 0` is deliberate: GSAP reads the CSS `translateY(106%)` off the
    // computed matrix as a pixel `y`, and would otherwise leave it in place.
    intro.fromTo(
      lines,
      { y: 0, yPercent: 108 },
      { y: 0, yPercent: 0, duration: 1.25, stagger: 0.1 },
      0,
    );
  }
  if (zoom) {
    intro.fromTo(
      zoom,
      { opacity: 0 },
      { opacity: 1, duration: 1.4, ease: "power2.out" },
      0,
    );
  }
  if (fades.length) {
    intro.fromTo(
      fades,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.11 },
      0.5,
    );
  }

  const exit = gsap.timeline({
    scrollTrigger: {
      trigger: scene,
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  if (zoom) exit.to(zoom, { scale: 1.16, yPercent: 5, ease: "none" }, 0);
  if (inner) exit.to(inner, { yPercent: mode === "compact" ? -10 : -20, opacity: 0, ease: "none" }, 0);
  if (cue) exit.to(cue, { opacity: 0, duration: 0.15, ease: "none" }, 0);
};
