import type { StoryGsap } from "./setupStoryMotion";

export function createCommunityTimeline(gsap: StoryGsap, scene: HTMLElement) {
  const select = gsap.utils.selector(scene);

  return gsap.timeline({
    scrollTrigger: { trigger: scene, start: "top top", end: "+=120%", scrub: 1, pin: true },
  })
    .from(select(".chess-piece"), {
      y: (index: number) => index % 2 ? -100 : 100,
      x: (index: number) => index % 2 ? 80 : -60,
      stagger: .06,
    })
    .to(select(".chess-overlay"), { perspective: 600, rotateX: 54, y: 90, scale: .76 }, .25)
    .fromTo(select(".community-photo"), { clipPath: "inset(48% 48% 48% 48%)", scale: 1.08 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1 }, .38);
}
