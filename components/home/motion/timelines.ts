import type { Motion } from "./gsapSetup";
import { createVideoScrub } from "./videoScrub";
import { createSequenceScrub } from "./sequenceScrub";
import { heroSequence } from "../content";

export type SceneCtx = {
  motion: Motion;
  scene: HTMLElement;
  mode: "desktop" | "compact";
};

type Setup = (ctx: SceneCtx) => void | (() => void);

/* -------------------------------------------------------------- 00 arrival */

export const setupArrival: Setup = ({ motion, scene, mode }) => {
  const { gsap, ScrollTrigger } = motion;
  const pin = scene.querySelector<HTMLElement>("[data-hero-pin]");
  const fades = scene.querySelectorAll<HTMLElement>("[data-hero-fade]");
  const inner = scene.querySelector<HTMLElement>(".h-hero-inner");
  const media = scene.querySelector<HTMLElement>("[data-hero-zoom]");
  const canvas = scene.querySelector<HTMLCanvasElement>("[data-hero-seq]");
  const beats = Array.from(scene.querySelectorAll<HTMLElement>("[data-hero-beat]"));

  /*
   * The hero HOLDS until the film has finished.
   *
   * Nothing autoplays. The clip is pinned and played by the scroll from first
   * frame to last — roughly two and a half viewports of travel, which is enough
   * for a five-second clip to read at a comfortable pace without the page
   * feeling stuck. Only after the last frame does the story move on.
   */
  const sequence = canvas
    ? createSequenceScrub(gsap, canvas, heroSequence.frames, heroSequence.src)
    : null;

  if (pin) {
    const st = ScrollTrigger.create({
      trigger: pin,
      start: "top top",
      end: () => `+=${window.innerHeight * 2.5}`,
      pin,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        sequence?.setProgress(self.progress);

        // The one line of copy keeps pace with the footage.
        if (!beats.length) return;
        const index = Math.min(beats.length - 1, Math.floor(self.progress * beats.length));
        beats.forEach((beat, i) => {
          if ((beat.dataset.on === "true") === (i === index)) return;
          beat.dataset.on = i === index ? "true" : "false";
          gsap.to(beat, { opacity: i === index ? 1 : 0, duration: 0.5, overwrite: true });
        });
      },
    });
    // Keep the pin alive for the lifetime of the page, but hand back the scrub.
    gsap.set(beats.slice(1), { opacity: 0 });
    void st;
  } else {
    ScrollTrigger.create({
      trigger: scene,
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => sequence?.setProgress(self.progress),
    });
  }

  const intro = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.4 });
  if (fades.length) {
    intro.fromTo(
      fades,
      { opacity: 0, y: 26 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 },
      0,
    );
  }

  // A gentle drift over the pin: the film moves slightly as it plays out.
  const exit = gsap.timeline({
    scrollTrigger: {
      trigger: pin ?? scene,
      start: "top top",
      end: () => `+=${window.innerHeight * 2.5}`,
      scrub: true,
    },
  });
  /*
   * The media is deliberately NOT scaled any more. A continuously rescaled
   * video layer forces a resample every frame, and that was compounding the
   * scrub stutter. Only the copy drifts now.
   */
  void media;
  if (inner) exit.to(inner, { yPercent: mode === "compact" ? -4 : -8, opacity: 0.15, ease: "none" }, 0);

  return () => sequence?.destroy();
};

/**
 * 01 · The idea — the full-bleed clip plays through as the chapter passes.
 */
export const setupIdea: Setup = ({ motion, scene }) => {
  const { gsap, ScrollTrigger } = motion;
  const video = scene.querySelector<HTMLVideoElement>("[data-scrub-video] video");
  const scrub = createVideoScrub(gsap, video);
  ScrollTrigger.create({
    trigger: scene,
    start: "top bottom",
    end: "bottom top",
    scrub: true,
    invalidateOnRefresh: true,
    onUpdate: (self) => scrub.setProgress(self.progress),
  });
  return () => scrub.destroy();
};

/* ----------------------------------------------------------------- 02 pour */

/**
 * The wheel is the playhead.
 *
 * Pins the stage and steps the all-intra clip frame by frame, handing the
 * caption over to each beat as it arrives. Because every frame is a keyframe,
 * seeking costs nothing — and it scrubs backwards perfectly, which is the part
 * that actually sells the idea.
 */
export const setupPour: Setup = ({ motion, scene, mode }) => {
  const { gsap, ScrollTrigger } = motion;
  const pin = scene.querySelector<HTMLElement>("[data-pour-pin]");
  const video = scene.querySelector<HTMLVideoElement>("[data-scrub-video] video");
  const beats = Array.from(scene.querySelectorAll<HTMLElement>("[data-pour-beat]"));
  if (!pin) return;

  const isCompact = mode === "compact";
  const scrub = createVideoScrub(gsap, video);

  gsap.set(beats.slice(1), { opacity: 0, y: 16 });
  gsap.set(beats[0], { opacity: 1, y: 0 });
  let active = 0;

  const st = ScrollTrigger.create({
    trigger: pin,
    start: "top top",
    end: () => `+=${window.innerHeight * (isCompact ? 1.5 : 2.4)}`,
    pin: isCompact ? false : pin,
    pinSpacing: !isCompact,
    anticipatePin: isCompact ? 0 : 1,
    scrub: true,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      scrub.setProgress(self.progress);

      const index = Math.min(beats.length - 1, Math.floor(self.progress * beats.length));
      if (index === active) return;
      active = index;
      beats.forEach((beat, i) => {
        gsap.to(beat, {
          opacity: i === index ? 1 : 0,
          y: i === index ? 0 : i < index ? -14 : 14,
          duration: 0.42,
          overwrite: true,
        });
        beat.dataset.on = i === index ? "true" : "false";
      });
    },
  });

  return () => {
    st.kill();
    scrub.destroy();
  };
};

/* ----------------------------------------------------------------- 03 room */

export const setupRoom: Setup = ({ motion, scene }) => {
  const { gsap, ScrollTrigger } = motion;
  const media = scene.querySelector<HTMLElement>("[data-room-media]");
  const band = scene.querySelector<HTMLElement>(".h-room-band");
  const video = scene.querySelector<HTMLVideoElement>("[data-scrub-video] video");
  if (!media || !band) return;

  // The footage is played by the scroll: it advances as you travel through the
  // band and rewinds if you come back up.
  const scrub = createVideoScrub(gsap, video);
  ScrollTrigger.create({
    trigger: band,
    start: "top bottom",
    end: "bottom top",
    scrub: true,
    invalidateOnRefresh: true,
    onUpdate: (self) => scrub.setProgress(self.progress),
  });

  gsap.fromTo(
    media,
    { yPercent: -6, scale: 1.1 },
    {
      yPercent: 6,
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

  return () => scrub.destroy();
};

/* -------------------------------------------------------------- 04 counter */

export const setupCounter: Setup = ({ motion, scene }) => {
  const { gsap } = motion;
  const figure = scene.querySelector<HTMLElement>("[data-counter-figure]");
  const image = scene.querySelector<HTMLElement>("[data-counter-img]");
  if (!figure) return;

  // The ring is drawn by `data-draw` (DrawSVGPlugin); here the lens opens
  // behind it as the ring completes.
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
  if (image) tl.fromTo(image, { scale: 1.32 }, { scale: 1, duration: 1.9 }, 0.4);
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

/* ---------------------------------------------------------------- 06 study */

/**
 * The high-speed macro clip, played by the scroll.
 *
 * Pinned, so the wheel owns the frame, with the three notes lighting in turn
 * beside it. Same idea as The pour, different composition: copy beside the
 * footage rather than above it.
 */
export const setupStudy: Setup = ({ motion, scene, mode }) => {
  const { gsap, ScrollTrigger } = motion;
  const pin = scene.querySelector<HTMLElement>("[data-study-pin]");
  const notes = Array.from(scene.querySelectorAll<HTMLElement>("[data-study-note]"));
  const bar = scene.querySelector<HTMLElement>("[data-study-progress]");
  if (!pin) return;

  const isCompact = mode === "compact";
  let active = -1;

  const st = ScrollTrigger.create({
    trigger: pin,
    start: "top top",
    end: () => `+=${window.innerHeight * (isCompact ? 1.5 : 2.2)}`,
    pin: isCompact ? false : pin,
    pinSpacing: !isCompact,
    anticipatePin: isCompact ? 0 : 1,
    scrub: true,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      if (bar) gsap.set(bar, { scaleX: self.progress });

      const index = Math.min(notes.length - 1, Math.floor(self.progress * notes.length));
      if (index === active) return;
      active = index;
      notes.forEach((note, i) => {
        gsap.to(note, {
          opacity: i === index ? 1 : 0.32,
          duration: 0.4,
          overwrite: true,
        });
        note.dataset.on = i === index ? "true" : "false";
      });
    },
  });

  return () => st.kill();
};

/* ---------------------------------------------------------------- 08 invite */

export const setupInvite: Setup = ({ motion, scene }) => {
  const { gsap } = motion;
  const bg = scene.querySelector<HTMLElement>(".h-invite-bg");

  if (bg) {
    gsap.fromTo(
      bg,
      { scale: 1.16, yPercent: -3 },
      {
        scale: 1,
        yPercent: 3,
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
};

/* ---------------------------------------------------------------- registry */

export const sceneSetups: Record<string, Setup> = {
  arrival: setupArrival,
  idea: setupIdea,
  pour: setupPour,
  room: setupRoom,
  counter: setupCounter,
  study: setupStudy,
  pantry: setupPantry,
  invite: setupInvite,
};
