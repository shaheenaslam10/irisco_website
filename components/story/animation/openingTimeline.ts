import type { StoryGsap } from "./setupStoryMotion";

type OpeningMode = "desktop" | "compact";

export function createOpeningTimeline(gsap: StoryGsap, scene: HTMLElement, mode: OpeningMode) {
  const select = gsap.utils.selector(scene);
  const compact = mode === "compact";
  const video = scene.querySelector<HTMLVideoElement>("[data-opening-master-video]");
  const playhead = { time: 0 };

  if (!video) return gsap.timeline();

  let ready = video.readyState >= 2;
  let destroyed = false;
  let rafId = 0;

  const render = () => {
    if (!destroyed && ready && Number.isFinite(video.duration) && video.duration > 0) {
      const normalized = Math.min(1, Math.max(0, playhead.time));
      const target = normalized * Math.max(0, video.duration - .04);
      if (Math.abs(video.currentTime - target) > .01) video.currentTime = target;
    }
    if (!destroyed) rafId = window.requestAnimationFrame(render);
  };

  const markReady = () => { ready = true; };
  const cleanup = () => {
    destroyed = true;
    window.cancelAnimationFrame(rafId);
    video.removeEventListener("loadeddata", markReady);
    video.removeEventListener("canplaythrough", markReady);
  };

  video.pause();
  video.preload = "auto";
  video.currentTime = 0;
  video.addEventListener("loadeddata", markReady);
  video.addEventListener("canplaythrough", markReady);
  if (video.readyState === 0) video.load();
  rafId = window.requestAnimationFrame(render);

  const textStates = select(".opening-text-state");
  const timeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: scene,
      start: "top top",
      end: compact ? "+=190%" : "+=460%",
      scrub: compact ? .4 : .45,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onKill: cleanup,
    },
  });

  gsap.set(textStates, { autoAlpha: 0 });
  gsap.set(select(".opening-text-arrival"), { autoAlpha: 1 });

  timeline
    .to(playhead, { time: 0, duration: .02 })
    .to(playhead, { time: .3, duration: .28 })
    .to(playhead, { time: .62, duration: .32 })
    .to(playhead, { time: .7, duration: .08 })
    .to(playhead, { time: .96, duration: .26 })
    .to(playhead, { time: 1, duration: .04 })
    .to(select(".opening-text-arrival"), { y: -12, autoAlpha: 0, duration: .08 }, .2)
    .fromTo(select(".opening-text-ritual"), { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .08 }, .28)
    .to(select(".opening-text-ritual"), { y: -12, autoAlpha: 0, duration: .08 }, .62)
    .fromTo(select(".opening-text-resolution"), { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .08 }, .7);

  return timeline;
}
