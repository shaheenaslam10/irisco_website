import type { StoryGsap } from "./setupStoryMotion";

/**
 * The space — the "why", in daylight, and the only non-pinned scene. Two plates
 * drift at different rates against the reading column as the section passes
 * through the viewport (layered parallax reads as depth without stealing the
 * scroll). The copy lifts in once. No pin, so the page breathes before the
 * close. Compact collapses the grid (see story.css) and this stays desktop-only.
 */
export function createSpaceTimeline(gsap: StoryGsap, scene: HTMLElement) {
  const select = gsap.utils.selector(scene);
  const plateA = scene.querySelector<HTMLElement>('[data-space-plate="a"]');
  const plateB = scene.querySelector<HTMLElement>('[data-space-plate="b"]');
  const copyItems = select(".space-copy > *");

  if (plateA) {
    gsap.fromTo(
      plateA,
      { yPercent: -6 },
      {
        yPercent: 6,
        ease: "none",
        scrollTrigger: { trigger: scene, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  }

  if (plateB) {
    gsap.fromTo(
      plateB,
      { yPercent: 12 },
      {
        yPercent: -10,
        ease: "none",
        scrollTrigger: { trigger: scene, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  }

  if (copyItems.length) {
    gsap.from(copyItems, {
      y: 40,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: scene, start: "top 68%" },
    });
  }

  return gsap.timeline();
}
