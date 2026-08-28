import { createVideoScrub } from "../videoScrub";
import type { SceneSetup } from "./types";

/**
 * 02 · The ritual.
 *
 * Desktop pins the stage for three extra viewport heights and drives the
 * all-intra clip frame-by-frame with the scroll wheel, handing the caption
 * over to each of the four steps as its beat arrives.
 *
 * Compact keeps the same stage but lets the clip simply play, and reads the
 * steps as an ordinary (revealed) list.
 */
export const setupRitual: SceneSetup = ({ gsap, ScrollTrigger, scene, mode }) => {
  const pin = scene.querySelector<HTMLElement>("[data-ritual-pin]");
  const film = scene.querySelector<HTMLElement>("[data-ritual-film]");
  const video = scene.querySelector<HTMLVideoElement>("[data-scrub-video] video");
  const bar = scene.querySelector<HTMLElement>("[data-ritual-bar]");
  const steps = gsap.utils.toArray<HTMLElement>(scene.querySelectorAll("[data-ritual-step]"));
  const ticks = gsap.utils.toArray<HTMLElement>(scene.querySelectorAll("[data-ritual-ticks] span"));

  if (mode === "compact" || !pin || !steps.length) {
    if (film) {
      gsap.fromTo(
        film,
        { scale: 0.94, opacity: 0.7 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: { trigger: film, start: "top 92%", end: "top 40%", scrub: true },
        },
      );
    }
    return;
  }

  const scrub = createVideoScrub(gsap, video);

  gsap.set(steps, { opacity: 0, y: 24 });
  gsap.set(steps[0], { opacity: 1, y: 0 });

  let active = 0;

  const st = ScrollTrigger.create({
    trigger: pin,
    start: "top top",
    end: () => `+=${window.innerHeight * 3}`,
    pin,
    pinSpacing: true,
    anticipatePin: 1,
    scrub: true,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      scrub.setProgress(self.progress);
      if (bar) gsap.set(bar, { scaleX: self.progress });

      const index = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
      if (index === active) return;
      active = index;

      steps.forEach((step, i) => {
        gsap.to(step, {
          opacity: i === index ? 1 : 0,
          y: i === index ? 0 : i < index ? -20 : 20,
          duration: 0.5,
          ease: "power2.out",
          overwrite: true,
        });
      });
      ticks.forEach((tick, i) => {
        tick.dataset.on = i === index ? "true" : "false";
      });
    },
  });

  return () => {
    st.kill();
    scrub.destroy();
  };
};
