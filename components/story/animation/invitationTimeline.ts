import type { StoryGsap } from "./setupStoryMotion";

/**
 * The invitation — the close. The final image settles from a gentle over-scale
 * as the scene arrives, then holds; the line and actions lift in once. No pin
 * and no exit animation, so the film resolves and stays on screen rather than
 * fading into the footer.
 */
export function createInvitationTimeline(gsap: StoryGsap, scene: HTMLElement) {
  const select = gsap.utils.selector(scene);
  const img = scene.querySelector<HTMLElement>(".invitation-media img");
  const inner = select(".invitation-inner > *");

  if (img) {
    gsap.fromTo(
      img,
      { scale: 1.12 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: scene, start: "top bottom", end: "top top", scrub: true },
      },
    );
  }

  if (inner.length) {
    gsap.from(inner, {
      y: 34,
      autoAlpha: 0,
      duration: 0.9,
      stagger: 0.14,
      ease: "power3.out",
      scrollTrigger: { trigger: scene, start: "top 62%" },
    });
  }

  return gsap.timeline();
}
