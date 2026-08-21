import type { StoryGsap } from "./setupStoryMotion";

export function createBakeryTimeline(gsap: StoryGsap, scene: HTMLElement) {
  const select = gsap.utils.selector(scene);

  return gsap.timeline({
    scrollTrigger: { trigger: scene, start: "top top", end: "+=135%", scrub: 1, pin: true },
  })
    .fromTo(select(".bakery-photo"), { clipPath: "inset(48% 47% 48% 47%)", scale: 1.16 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1 })
    .from(select(".bakery-note"), { x: 80, opacity: 0, stagger: .12 }, .2);
}
