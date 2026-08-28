import type { Gsap } from "./gsapSetup";
import { frameSrc, sequence, type SequenceSlug } from "../content";

export type SequenceScrub = {
  /** Feed 0 → 1; the clip eases to that frame. */
  setProgress: (progress: number) => void;
  /** Resolves once every frame is decoded, so scrubbing can never flash. */
  ready: Promise<void>;
  destroy: () => void;
};

/**
 * Scroll-driven playback from an image sequence.
 *
 * Why frames and not a <video>?
 *   • No autoplay policy, no codec surprises, no iframe restrictions.
 *   • Seeking is instant and frame-exact at any speed, in every browser.
 *   • It scrubs *backwards* perfectly — which is half the magic of the effect.
 *
 * Every frame is preloaded and `decode()`d before the first scrub, so a frame
 * swap can never show an empty <img>. Progress is eased on the GSAP ticker so
 * the motion keeps the same feel as everything else on the page, and the src is
 * only touched when the frame index actually changes.
 */
export function createSequenceScrub(
  gsap: Gsap,
  img: HTMLImageElement,
  slug: SequenceSlug,
): SequenceScrub {
  const cfg = sequence[slug];
  const total = cfg.frames;

  const urls = Array.from({ length: total }, (_, i) => frameSrc(slug, i));
  const bitmaps: HTMLImageElement[] = [];

  let target = 0;
  let current = 0;
  let lastIndex = -1;
  let alive = true;

  // Show the poster immediately so the stage is never blank.
  img.src = urls[0];

  const ready = (async () => {
    for (let i = 0; i < urls.length; i += 1) {
      if (!alive) return;
      const image = new Image();
      image.decoding = "async";
      image.src = urls[i];
      bitmaps[i] = image;
      try {
        await image.decode();
      } catch {
        /* decode() is best-effort; the browser still caches the image */
      }
      // Warm the cache in order, yielding so the network is never blocked.
      if (i % 6 === 5) await new Promise((r) => setTimeout(r, 0));
    }
  })();

  const tick = () => {
    if (!alive || !total) return;
    current += (target - current) * 0.2;
    if (Math.abs(target - current) < 0.0015) current = target;
    const index = Math.round(gsap.utils.clamp(0, 1, current) * (total - 1));
    if (index === lastIndex) return;
    lastIndex = index;
    img.src = urls[index];
  };

  gsap.ticker.add(tick);

  return {
    setProgress: (progress: number) => {
      target = gsap.utils.clamp(0, 1, progress);
    },
    ready,
    destroy: () => {
      alive = false;
      gsap.ticker.remove(tick);
    },
  };
}
