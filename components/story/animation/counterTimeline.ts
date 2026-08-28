import type { StoryGsap } from "./setupStoryMotion";

/**
 * The counter — one image opening from a small centred window to full bleed.
 * The scene pins and the window relaxes to zero inset while the image settles
 * from a slight over-scale, the copy arriving as the frame fills. A single
 * device (image small → fullscreen) so it reads differently from every frame
 * around it. Compact / reduced motion keep the image full and the copy present.
 *
 * The inset is driven from one scalar via onUpdate rather than tweening the
 * clip-path string directly: getComputedStyle collapses a symmetric inset to
 * its 2-value shorthand, so GSAP's own string interpolation loses the bottom
 * and left edges on refresh. Driving all four edges from `p` keeps it square.
 */
export function createCounterTimeline(gsap: StoryGsap, scene: HTMLElement) {
  const media = scene.querySelector<HTMLElement>(".counter-media");
  const img = scene.querySelector<HTMLElement>(".counter-media img");
  const copy = scene.querySelector<HTMLElement>(".counter-copy");

  const inset = (open: number) => {
    // open: 0 = small window, 1 = full bleed
    const v = 1 - open;
    return `inset(${(16 * v).toFixed(3)}% ${(32 * v).toFixed(3)}% ${(16 * v).toFixed(3)}% ${(32 * v).toFixed(3)}%)`;
  };

  if (media) media.style.clipPath = inset(0);
  if (copy) gsap.set(copy, { autoAlpha: 0, yPercent: 12 });

  const timeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: scene,
      start: "top top",
      end: "+=150%",
      scrub: 0.8,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  if (img) timeline.fromTo(img, { scale: 1.2 }, { scale: 1, duration: 1 }, 0);
  if (media) {
    const state = { open: 0 };
    timeline.to(
      state,
      {
        open: 1,
        duration: 1,
        ease: "power2.inOut",
        onUpdate: () => {
          media.style.clipPath = inset(state.open);
        },
      },
      0,
    );
  }
  if (copy) timeline.to(copy, { autoAlpha: 1, yPercent: 0, duration: 0.4, ease: "power2.out" }, 0.55);

  return timeline;
}
