import type { StoryGsap } from "./setupStoryMotion";

export function createPantryTimeline(gsap: StoryGsap, scene: HTMLElement) {
  const select = gsap.utils.selector(scene);

  return gsap.timeline({
    scrollTrigger: { trigger: scene, start: "top top", end: "+=155%", scrub: 1, pin: true },
  })
    .from(select(".shelf-line"), { scaleX: 0, transformOrigin: "left", stagger: .08 })
    .from(select(".shelf-object"), { y: 180, rotate: (index: number) => index % 2 ? 5 : -4, opacity: 0, stagger: .08 }, 0)
    .to(select(".shelf-object"), { opacity: 0, duration: .2 }, .72)
    .fromTo(select(".pantry-photo"), { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1 }, .72);
}
