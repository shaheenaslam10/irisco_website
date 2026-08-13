import type { StoryGsap } from "./setupStoryMotion";

export function createCoffeeTimeline(gsap: StoryGsap, scene: HTMLElement) {
  const select = gsap.utils.selector(scene);

  return gsap.timeline({
    scrollTrigger: { trigger: scene, start: "top top", end: "+=125%", scrub: 1, pin: true },
  })
    .fromTo(select(".coffee-orbit"), { yPercent: -45, rotate: -8, scale: .76 }, { yPercent: 1, rotate: 0, scale: 1, ease: "power2.inOut" })
    .fromTo(select(".coffee-shadow"), { scaleX: 1.8, opacity: .05 }, { scaleX: .85, opacity: .45 }, 0)
    .fromTo(select(".steam"), { opacity: 0, y: 20 }, { opacity: .65, y: -10, stagger: .08 }, .72);
}
