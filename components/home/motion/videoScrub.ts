import type { Gsap } from "./gsapSetup";

export type VideoScrub = {
  /** Feed 0 → 1; the clip eases to that frame. */
  setProgress: (progress: number) => void;
  destroy: () => void;
};

/**
 * Scroll-driven video playback.
 *
 * The smoothness problem, and the fix
 * -----------------------------------
 * Seeking a video on *every* scroll tick is what makes this stutter: each seek
 * forces a decode, and most of those land on a frame the viewer is already
 * looking at. So instead of seeking continuously, we track a float frame
 * position, ease it toward the target, and only touch `currentTime` when the
 * frame number actually changes. Over a whole chapter that turns thousands of
 * seeks into one per frame — and the motion still reads as continuous because
 * the easing happens in between.
 *
 * Three guards on top of that:
 *   1. never seek while a seek is already in flight (and do not mark the frame
 *      as applied, so it is retried on the next tick rather than skipped);
 *   2. do nothing until there is enough data to draw a frame;
 *   3. clamp to the last drawable instant so we never park on a black frame.
 *
 * The scrub encodes are all-intra at 12fps, so every seek is a single-frame
 * decode with no dependency on a keyframe interval.
 */
export function createVideoScrub(gsap: Gsap, video: HTMLVideoElement | null): VideoScrub {
  const noop: VideoScrub = { setProgress: () => {}, destroy: () => {} };
  if (!video) return noop;

  let duration = 0;
  let frameCount = 0;
  let targetFrame = 0;
  let currentFrame = 0;
  let appliedFrame = -1;
  let active = true;

  const measure = () => {
    duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 0;
    // The scrub encodes are 12fps; if a different clip is ever used, fall back
    // to something sane rather than dividing by zero.
    frameCount = duration > 0 ? Math.max(2, Math.round(duration * 12)) : 0;
  };

  const tick = () => {
    if (!active || !duration || frameCount < 2 || video.readyState < 2) return;

    currentFrame += (targetFrame - currentFrame) * 0.2;
    if (Math.abs(targetFrame - currentFrame) < 0.01) currentFrame = targetFrame;

    const frame = Math.round(currentFrame);
    if (frame === appliedFrame) return;
    // Mid-seek: leave appliedFrame alone so this frame is retried next tick.
    if (video.seeking) return;

    appliedFrame = frame;
    const time = (frame / (frameCount - 1)) * duration;
    video.currentTime = Math.min(duration - 0.001, Math.max(0, time));
  };

  const begin = () => {
    measure();
    if (!duration) return;
    // Start from the frame the scroll is actually asking for.
    currentFrame = targetFrame;
    appliedFrame = -1;
    gsap.ticker.add(tick);
  };

  if (video.readyState >= 1) begin();
  else video.addEventListener("loadedmetadata", begin, { once: true });

  return {
    setProgress: (progress: number) => {
      const p = gsap.utils.clamp(0, 1, progress);
      if (!frameCount) measure();
      targetFrame = p * Math.max(0, frameCount - 1);
    },
    destroy: () => {
      active = false;
      video.removeEventListener("loadedmetadata", begin);
      gsap.ticker.remove(tick);
    },
  };
}
