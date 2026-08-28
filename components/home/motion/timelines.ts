import type { Motion } from "./gsapSetup";
import { createSequenceScrub } from "./sequence";
import { setScroll } from "./scrollState";
import type { SequenceSlug } from "../content";

export type SceneCtx = {
  motion: Motion;
  scene: HTMLElement;
  mode: "desktop" | "compact";
};

type Setup = (ctx: SceneCtx) => void | (() => void);

/* -------------------------------------------------------------- 00 arrival */

export const setupArrival: Setup = ({ motion, scene, mode }) => {
  const { gsap, ScrollTrigger } = motion;
  const fades = scene.querySelectorAll<HTMLElement>("[data-hero-fade]");
  const copy = scene.querySelector<HTMLElement>(".h-hero-copy");
  const stage = scene.querySelector<HTMLElement>(".h-hero-cup");

  const intro = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.45 });
  if (fades.length) {
    intro.fromTo(
      fades,
      { opacity: 0, y: 26 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 },
      0,
    );
  }

  // Feed the WebGL cup its scroll progress.
  ScrollTrigger.create({
    trigger: scene,
    start: "top top",
    end: "bottom top",
    scrub: true,
    invalidateOnRefresh: true,
    onUpdate: (self) => setScroll("hero", self.progress),
  });

  const exit = gsap.timeline({
    scrollTrigger: { trigger: scene, start: "top top", end: "bottom top", scrub: true },
  });
  if (copy) exit.to(copy, { yPercent: -12, opacity: 0, ease: "none" }, 0);
  if (stage) {
    exit.to(stage, { yPercent: mode === "compact" ? 5 : 9, scale: 0.9, ease: "none" }, 0);
  }
};

/* ----------------------------------------------------------------- 02 pour */

/**
 * The wheel is the playhead. Pin the stage, scrubbing a 40-frame sequence and
 * handing the caption over to each beat as it arrives.
 */
export const setupPour: Setup = ({ motion, scene, mode }) => {
  const { gsap, ScrollTrigger } = motion;
  const pin = scene.querySelector<HTMLElement>("[data-pour-pin]");
  const img = scene.querySelector<HTMLImageElement>("[data-seq]");
  const beats = Array.from(scene.querySelectorAll<HTMLElement>("[data-pour-beat]"));
  if (!pin) return;

  // Compact: no pin. Let the sequence play through on its own scrub instead.
  const isCompact = mode === "compact";

  const slug = (img?.dataset.seq ?? "pour") as SequenceSlug;
  const scrub = img ? createSequenceScrub(gsap, img, slug) : null;

  gsap.set(beats.slice(1), { opacity: 0, y: 18 });
  gsap.set(beats[0], { opacity: 1, y: 0 });
  let active = 0;

  const st = ScrollTrigger.create({
    trigger: pin,
    start: "top top",
    end: () => `+=${window.innerHeight * (isCompact ? 1.6 : 2.6)}`,
    pin: isCompact ? false : pin,
    pinSpacing: !isCompact,
    anticipatePin: isCompact ? 0 : 1,
    scrub: true,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      scrub?.setProgress(self.progress);
      setScroll("pour", self.progress);

      const index = Math.min(beats.length - 1, Math.floor(self.progress * beats.length));
      if (index === active) return;
      active = index;
      beats.forEach((beat, i) => {
        gsap.to(beat, {
          opacity: i === index ? 1 : 0,
          y: i === index ? 0 : i < index ? -16 : 16,
          duration: 0.45,
          overwrite: true,
        });
        beat.dataset.on = i === index ? "true" : "false";
      });
    },
  });

  return () => {
    st.kill();
    scrub?.destroy();
  };
};

/* ---------------------------------------------------------------- 03 craft */

/**
 * Objects on paths. The bean layer arcs across the chapter on a real
 * MotionPath curve while the photographs drift at their own ScrollSmoother
 * speeds — the composition reorganises rather than merely scrolling.
 */
export const setupCraft: Setup = ({ motion, scene }) => {
  const { gsap, MotionPathPlugin } = motion;
  void MotionPathPlugin;

  const bean = scene.querySelector<HTMLElement>("[data-craft-path]");
  if (!bean) return;

  gsap.fromTo(
    bean,
    { xPercent: -50, yPercent: -50, rotate: -40, opacity: 0.5 },
    {
      motionPath: {
        path: [
          { x: 0, y: 0 },
          { x: 180, y: -220 },
          { x: -90, y: -420 },
          { x: 120, y: -640 },
          { x: -40, y: -860 },
        ],
        curviness: 1.5,
      },
      rotate: 220,
      opacity: 0.95,
      ease: "none",
      scrollTrigger: {
        trigger: scene,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    },
  );
};

/* -------------------------------------------------------------- 04 counter */

export const setupCounter: Setup = ({ motion, scene }) => {
  const { gsap } = motion;
  const figure = scene.querySelector<HTMLElement>("[data-counter-figure]");
  const image = scene.querySelector<HTMLElement>("[data-counter-img]");
  if (!figure) return;

  // The ring itself is drawn by `data-draw` (DrawSVGPlugin). Here we open the
  // lens behind it as the ring completes.
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
  tl.fromTo(
    figure,
    { clipPath: "circle(0% at 50% 50%)" },
    { clipPath: "circle(80% at 50% 50%)", duration: 1.3 },
    0.4,
  );
  if (image) tl.fromTo(image, { scale: 1.34 }, { scale: 1, duration: 1.9 }, 0.4);
};

/* --------------------------------------------------------------- 05 pantry */

export const setupPantry: Setup = ({ motion, scene, mode }) => {
  const { gsap, ScrollTrigger } = motion;
  const pin = scene.querySelector<HTMLElement>("[data-pantry-pin]");
  const viewport = scene.querySelector<HTMLElement>("[data-pantry-viewport]");
  const track = scene.querySelector<HTMLElement>("[data-pantry-track]");
  const progress = scene.querySelector<HTMLElement>("[data-pantry-progress]");
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

  void ScrollTrigger;

  return () => {
    drift.scrollTrigger?.kill();
    drift.kill();
  };
};

/* --------------------------------------------------------------- 08 invite */

export const setupInvite: Setup = ({ motion, scene }) => {
  const { gsap } = motion;
  const cup = scene.querySelector<HTMLElement>(".h-invite-cup");
  if (!cup) return;

  // The last echo of the hero: the cup rises one final time.
  gsap.fromTo(
    cup,
    { yPercent: 22, opacity: 0.15, scale: 0.9 },
    {
      yPercent: -6,
      opacity: 0.45,
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: scene,
        start: "top bottom",
        end: "bottom bottom",
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    },
  );
};

/* ---------------------------------------------------------------- registry */

export const sceneSetups: Record<string, Setup> = {
  arrival: setupArrival,
  pour: setupPour,
  craft: setupCraft,
  counter: setupCounter,
  pantry: setupPantry,
  invite: setupInvite,
};
