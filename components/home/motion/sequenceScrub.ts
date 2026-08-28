import type { Gsap } from "./gsapSetup";

export type SequenceScrub = {
  setProgress: (progress: number) => void;
  ready: Promise<void>;
  destroy: () => void;
};

type Frame = ImageBitmap | HTMLImageElement;

/**
 * Scroll-driven playback from a pre-decoded image sequence.
 *
 * This exists because seeking a video is never going to be perfectly smooth:
 * every `currentTime` assignment forces a decode, and under continuous scrolling
 * a dropped decode is a visible stutter. There is no way to tune that away.
 *
 * A sequence has no such cost. Each frame is fetched and decoded ONCE at idle,
 * off the main thread via `createImageBitmap`, and after that a frame change is
 * a single `drawImage` — a straight blit to the GPU. Nothing to decode, nothing
 * to wait for, nothing to drop.
 *
 * Details that matter:
 *   • frames are decoded up front and held as ImageBitmaps, so scrub time is
 *     draw-only;
 *   • the canvas is sized to its CSS box × a capped device pixel ratio, so it
 *     is never drawing more pixels than the screen can show;
 *   • `object-fit: cover` is reproduced by hand, so a 2.29:1 frame fills any
 *     viewport without distortion;
 *   • like the video scrubber, it eases between frames and only redraws when
 *     the frame index actually changes.
 */
export function createSequenceScrub(
  gsap: Gsap,
  canvas: HTMLCanvasElement,
  frameCount: number,
  srcFor: (index: number) => string,
): SequenceScrub {
  const ctx = canvas.getContext("2d", { alpha: true });
  const frames: Array<Frame | null> = new Array(frameCount).fill(null);

  let target = 0;
  let current = 0;
  let applied = -1;
  let alive = true;

  const resize = () => {
    // Cap dpr: a 3x phone screen does not need 3x the fill rate here.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width * dpr));
    const h = Math.max(1, Math.round(rect.height * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      applied = -1; // force a redraw at the new size
    }
  };

  const draw = (index: number) => {
    const frame = frames[index];
    if (!frame || !ctx) return;
    const cw = canvas.width;
    const ch = canvas.height;
    const bw = "width" in frame ? frame.width : 0;
    const bh = "height" in frame ? frame.height : 0;
    if (!bw || !bh) return;

    // object-fit: cover
    const scale = Math.max(cw / bw, ch / bh);
    const dw = bw * scale;
    const dh = bh * scale;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(frame as CanvasImageSource, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  };

  const tick = () => {
    if (!alive || !frameCount) return;
    current += (target - current) * 0.22;
    if (Math.abs(target - current) < 0.008) current = target;
    const index = Math.min(frameCount - 1, Math.max(0, Math.round(current)));
    if (index === applied) return;
    // Not decoded yet — do not mark applied, so it is retried next tick.
    if (!frames[index]) return;
    applied = index;
    draw(index);
  };

  resize();
  window.addEventListener("resize", resize);
  gsap.ticker.add(tick);

  const ready = (async () => {
    for (let i = 0; i < frameCount; i += 1) {
      if (!alive) return;
      const url = srcFor(i);
      try {
        if (typeof createImageBitmap === "function") {
          const res = await fetch(url, { cache: "force-cache" });
          const blob = await res.blob();
          frames[i] = await createImageBitmap(blob);
        } else {
          const img = new Image();
          img.decoding = "async";
          img.src = url;
          await img.decode();
          frames[i] = img;
        }
      } catch {
        /* a missing frame is skipped; the previous one stays on screen */
      }
      // Yield periodically so preloading never blocks a scroll frame.
      if (i % 6 === 5) await new Promise((r) => setTimeout(r, 0));
      // Frame 0 should appear as early as possible.
      if (i === 0 && applied === -1) {
        applied = 0;
        draw(0);
      }
    }
    resize();
    applied = -1;
    tick();
  })();

  return {
    setProgress: (progress: number) => {
      target = gsap.utils.clamp(0, 1, progress) * (frameCount - 1);
    },
    ready,
    destroy: () => {
      alive = false;
      window.removeEventListener("resize", resize);
      gsap.ticker.remove(tick);
      frames.forEach((f) => {
        if (f && "close" in f) (f as ImageBitmap).close();
      });
    },
  };
}
