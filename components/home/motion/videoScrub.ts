import type { Gsap } from "./gsapSetup";

export type VideoScrub = {
  /** Feed 0→1 scroll progress; the clip eases toward that frame. */
  setProgress: (progress: number) => void;
  destroy: () => void;
};

/**
 * Frame-accurate, scroll-driven video playback.
 *
 * The scrub encodes are all-intra (every frame is a keyframe), so seeking is
 * cheap — but seeking on *every* scroll event still stutters. Instead we keep a
 * target time and a current time and ease between them on the GSAP ticker,
 * which is the same clock driving Lenis and every other tween on the page.
 *
 * Three guards keep it smooth:
 *   1. skip while the media element is mid-seek,
 *   2. skip sub-perceptual deltas (<20ms),
 *   3. do nothing until there is enough data to draw a frame.
 */
export function createVideoScrub(gsap: Gsap, video: HTMLVideoElement | null): VideoScrub {
  const noop: VideoScrub = { setProgress: () => {}, destroy: () => {} };
  if (!video) return noop;

  let duration = 0;
  let target = 0;
  let current = 0;
  let active = true;

  const readDuration = () => {
    duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 0;
  };

  const tick = () => {
    if (!active || !duration || video.readyState < 2) return;
    current += (target - current) * 0.16;
    if (Math.abs(target - current) < 0.003) current = target;
    const time = gsap.utils.clamp(0, duration - 0.03, current * duration);
    if (!video.seeking && Math.abs(video.currentTime - time) > 0.02) {
      video.currentTime = time;
    }
  };

  const start = () => {
    readDuration();
    current = video.currentTime && duration ? video.currentTime / duration : 0;
    gsap.ticker.add(tick);
  };

  if (video.readyState >= 1) start();
  else video.addEventListener("loadedmetadata", start, { once: true });

  return {
    setProgress: (progress: number) => {
      target = gsap.utils.clamp(0, 1, progress);
      if (!duration) readDuration();
    },
    destroy: () => {
      active = false;
      video.removeEventListener("loadedmetadata", start);
      gsap.ticker.remove(tick);
    },
  };
}

/** Draw an SVG circle's stroke as progress: `data-ring` elements use it. */
export function setRingProgress(circle: SVGCircleElement | null, progress: number) {
  if (!circle) return;
  const length = circle.getTotalLength?.() ?? 0;
  if (!length) return;
  circle.style.strokeDasharray = `${length}`;
  circle.style.strokeDashoffset = `${length * (1 - progress)}`;
}
