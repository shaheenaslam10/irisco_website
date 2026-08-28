import type { gsap as GsapInstance } from "gsap";
import type { ScrollTrigger as ScrollTriggerInstance } from "gsap/ScrollTrigger";

export type Gsap = typeof GsapInstance;
export type ScrollTriggerType = typeof ScrollTriggerInstance;
export type MotionScope = { gsap: Gsap; ScrollTrigger: ScrollTriggerType };

export const DESKTOP_QUERY = "(min-width: 1024px)";
export const COMPACT_QUERY = "(max-width: 1023px)";
export const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

/** `gsap` and `ScrollTrigger` are loaded on demand so they never block first paint. */
export async function loadMotion(): Promise<MotionScope> {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);
  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(REDUCED_QUERY).matches;
}

/** Wait for fonts + eager images, then let ScrollTrigger re-measure everything. */
export async function refreshAfterAssets(
  root: HTMLElement,
  ScrollTrigger: ScrollTriggerType,
  isCancelled: () => boolean,
) {
  const fontsReady = document.fonts?.ready ?? Promise.resolve();
  const critical = Array.from(
    root.querySelectorAll<HTMLImageElement>('img[fetchpriority="high"], img[loading="eager"]'),
  );
  const settled = critical.map(
    (img) =>
      new Promise<void>((resolve) => {
        if (img.complete) return resolve();
        const done = () => resolve();
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
      }),
  );

  await Promise.allSettled([fontsReady, ...settled]);
  if (isCancelled()) return;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (!isCancelled()) ScrollTrigger.refresh();
    });
  });
}
