import type { StoryGsap } from "./setupStoryMotion";

type OpeningMode = "desktop" | "compact";

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const segment = (value: number, start: number, end: number) =>
  clamp01((value - start) / (end - start));

export function createOpeningTimeline(gsap: StoryGsap, scene: HTMLElement, mode: OpeningMode) {
  const select = gsap.utils.selector(scene);
  const compact = mode === "compact";
  const videos = Array.from(scene.querySelectorAll<HTMLVideoElement>(".opening-video"));
  const layers = Array.from(scene.querySelectorAll<HTMLElement>(".opening-video-layer"));
  const luminance = scene.querySelector<HTMLElement>(".opening-luminance");
  const progress = { value: 0 };

  const scrub = () => {
    const value = progress.value;
    const shot1 = segment(value, 0, .36);
    const shot2 = segment(value, .30, .70);
    const shot3 = segment(value, .64, 1);
    const opacities = [
      value < .30 ? 1 : 1 - segment(value, .30, .37),
      value < .30 ? 0 : value < .37 ? segment(value, .30, .37) : value < .64 ? 1 : 1 - segment(value, .64, .71),
      value < .64 ? 0 : segment(value, .64, .71),
    ];

    [shot1, shot2, shot3].forEach((local, index) => {
      const video = videos[index];
      if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
      const target = local * Math.max(0, video.duration - .04);
      if (Math.abs(video.currentTime - target) > .025) video.currentTime = target;
    });
    layers.forEach((layer, index) => gsap.set(layer, { opacity: opacities[index] ?? 0 }));
    if (luminance) {
      const transition = Math.max(segment(value, .28, .48), 1 - segment(value, .48, .64));
      gsap.set(luminance, { opacity: .16 * transition });
    }
  };

  videos.forEach((video) => {
    video.pause();
    video.addEventListener("loadedmetadata", scrub, { once: true });
  });
  scrub();

  const textStates = select(".opening-text-state");
  const timeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: scene,
      start: "top top",
      end: compact ? "+=230%" : "+=460%",
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
    .to(progress, { value: 0, duration: .15, ease: "none" })
    .to(progress, { value: 1, duration: .85, ease: "none" })
    .to(select(".opening-text-arrival"), { y: -30, autoAlpha: 0, duration: .11 }, .12)
    .fromTo(select(".opening-text-ritual"), { x: -22, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: .11 }, .15)
    .to(select(".opening-text-ritual"), { x: 18, autoAlpha: 0, duration: .09 }, .31)
    .fromTo(select(".opening-text-reveal"), { x: 20, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: .11 }, .34)
    .to(select(".opening-text-reveal"), { y: -18, autoAlpha: 0, duration: .09 }, .49)
    .fromTo(select(".opening-text-coffee"), { x: -18, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: .1 }, .52)
    .to(select(".opening-text-coffee"), { y: 18, autoAlpha: 0, duration: .09 }, .68)
    .fromTo(select(".opening-text-resolution"), { x: 18, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: .1 }, .72)
    .to({}, { duration: compact ? .13 : .2 });

  return timeline;
}
