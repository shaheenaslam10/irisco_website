import type { StoryGsap } from "./setupStoryMotion";

type OpeningMode = "desktop" | "compact";

export function createOpeningTimeline(gsap: StoryGsap, scene: HTMLElement, mode: OpeningMode) {
  const select = gsap.utils.selector(scene);
  const compact = mode === "compact";
  const video = scene.querySelector<HTMLVideoElement>("[data-opening-master-video]");
  const progress = { value: 0 };

  if (!video) return gsap.timeline();

  const scrub = () => {
    if (!Number.isFinite(video.duration) || video.duration <= 0) return;
    const target = progress.value * Math.max(0, video.duration - .04);
    if (Math.abs(video.currentTime - target) > .02) video.currentTime = target;
  };

  video.pause();
  video.currentTime = 0;
  video.addEventListener("loadedmetadata", scrub, { once: true });
  scrub();

  const textStates = select(".opening-text-state");
  const timeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: scene,
      start: "top top",
      end: compact ? "+=190%" : "+=460%",
      scrub: compact ? .7 : 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
    onUpdate: scrub,
    onReverseComplete: scrub,
  });

  gsap.set(textStates, { autoAlpha: 0 });
  gsap.set(select(".opening-text-arrival"), { autoAlpha: 1 });

  timeline
    .to(progress, { value: 0, duration: compact ? .2 : .15 })
    .to(progress, { value: 1, duration: .85, onUpdate: scrub })
    .to(select(".opening-text-arrival"), { y: -12, autoAlpha: 0, duration: .08 }, .2)
    .fromTo(select(".opening-text-ritual"), { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .08 }, .28)
    .to(select(".opening-text-ritual"), { y: -12, autoAlpha: 0, duration: .08 }, .62)
    .fromTo(select(".opening-text-resolution"), { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .08 }, .7)
    .to({}, { duration: compact ? .13 : .2 });

  return timeline;
}
