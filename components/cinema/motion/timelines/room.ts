import type { SceneSetup } from "./types";

/** 03 · The room. A drifting film plate behind a rising statement. */
export const setupRoom: SceneSetup = ({ gsap, scene }) => {
  const media = scene.querySelector<HTMLElement>("[data-room-media]");
  const band = scene.querySelector<HTMLElement>(".c-room-band");
  if (!media || !band) return;

  gsap.fromTo(
    media,
    { yPercent: -7, scale: 1.12 },
    {
      yPercent: 7,
      scale: 1.02,
      ease: "none",
      scrollTrigger: {
        trigger: band,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    },
  );
};
