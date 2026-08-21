import type { StoryGsap } from "./setupStoryMotion";

export function createCultureTimeline(gsap: StoryGsap, scene: HTMLElement) {
  const select = gsap.utils.selector(scene);

  return gsap.timeline({
    scrollTrigger: { trigger: scene, start: "top top", end: "+=135%", scrub: 1, pin: true },
  })
    .fromTo(select(".culture-photo"), { clipPath: "circle(15% at 50% 28%)", scale: 1.12 }, { clipPath: "circle(78% at 50% 48%)", scale: 1 })
    .fromTo(select(".chandelier-ring"), { strokeDashoffset: 900 }, { strokeDashoffset: 0 }, 0)
    .from(select(".bulb"), { opacity: .1, filter: "brightness(.4)", stagger: .05 }, .3);
}
