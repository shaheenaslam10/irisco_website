import type { StoryGsap } from "./setupStoryMotion";

export function createProductTimeline(gsap: StoryGsap, scene: HTMLElement) {
  const select = gsap.utils.selector(scene);

  return gsap.timeline({
    scrollTrigger: { trigger: scene, start: "top top", end: "+=120%", scrub: 1, pin: true },
  })
    .fromTo(select(".product-photo"), { scale: 1.32, xPercent: -8 }, { scale: 1, xPercent: 0 })
    .from(select(".product-copy"), { x: 90, opacity: 0 }, .2)
    .from(select(".chilli-particle"), { y: -120, opacity: 0, stagger: .04 }, .1);
}
