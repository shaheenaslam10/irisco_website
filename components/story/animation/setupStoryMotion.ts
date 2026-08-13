import type { gsap as GsapInstance } from "gsap";
import type { ScrollTrigger as ScrollTriggerInstance } from "gsap/ScrollTrigger";

export type StoryGsap = typeof GsapInstance;
export type StoryScrollTrigger = typeof ScrollTriggerInstance;
export type StoryMatchMedia = ReturnType<StoryGsap["matchMedia"]>;

export const DESKTOP_STORY_QUERY = "(min-width: 901px)";
export const COMPACT_STORY_QUERY = "(max-width: 900px)";

export async function setupStoryMotion() {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);

  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
}

function waitForImage(image: HTMLImageElement) {
  if (image.complete) return Promise.resolve();

  return new Promise<void>((resolve) => {
    const finish = () => resolve();
    image.addEventListener("load", finish, { once: true });
    image.addEventListener("error", finish, { once: true });
  });
}

export async function refreshStoryMotion(
  root: HTMLElement,
  ScrollTrigger: StoryScrollTrigger,
  isCancelled: () => boolean,
) {
  const fontsReady = document.fonts?.ready ?? Promise.resolve();
  const criticalImages = Array.from(
    root.querySelectorAll<HTMLImageElement>('img[fetchpriority="high"], img[loading="eager"]'),
  );

  await Promise.allSettled([fontsReady, ...criticalImages.map(waitForImage)]);
  if (isCancelled()) return;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (!isCancelled()) ScrollTrigger.refresh();
    });
  });
}
