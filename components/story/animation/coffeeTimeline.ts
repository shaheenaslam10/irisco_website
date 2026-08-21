import type { StoryGsap } from "./setupStoryMotion";

export function createCoffeeTimeline(gsap: StoryGsap, scene: HTMLElement) {
  const select = gsap.utils.selector(scene);

  return gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: { trigger: scene, start: "top top", end: "+=160%", scrub: 1, pin: true },
  })
    .fromTo(
      select(".coffee-object"),
      { xPercent: 28, yPercent: -27, rotate: 7, scale: 1.38, transformOrigin: "50% 88%" },
      { xPercent: 0, yPercent: 0, rotate: 0, scale: 1, duration: 1.08, ease: "power2.inOut" },
    )
    .fromTo(
      select(".coffee-shadow"),
      { scaleX: 1.7, scaleY: .72, opacity: .07 },
      { scaleX: 1.05, scaleY: .92, opacity: .18, duration: .86, ease: "power1.inOut" },
      0,
    )
    .fromTo(select(".coffee-surface i"), { scaleX: .65, opacity: .28 }, { scaleX: 1, opacity: .72, duration: .9 }, 0)
    .fromTo(select(".coffee-copy .chapter-index"), { x: -28, opacity: .3 }, { x: 0, opacity: .64, duration: .46 }, .24)
    .fromTo(select(".coffee-copy .eyebrow"), { x: -18, opacity: .35 }, { x: 0, opacity: 1, duration: .42 }, .38)
    .fromTo(select(".coffee-copy h2"), { x: -22 }, { x: 0, duration: .58, ease: "power1.out" }, .42)
    .fromTo(select(".coffee-copy > p:last-child"), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .4 }, .64)
    .to(select(".coffee-object"), { yPercent: .7, duration: .12, ease: "power1.in" }, .96)
    .to(select(".coffee-shadow"), { scaleX: 1, scaleY: 1, opacity: .28, duration: .18, ease: "power1.out" }, .94)
    .fromTo(select(".coffee-steam-line"), { opacity: 0, y: 14 }, { opacity: .42, y: 0, duration: .24, stagger: .055 }, 1.04)
    .fromTo(select(".coffee-stage-note"), { x: 18, opacity: 0 }, { x: 0, opacity: .62, duration: .24 }, 1.08)
    .to({}, { duration: .32 });
}

export function createCompactCoffeeTimeline(gsap: StoryGsap, scene: HTMLElement) {
  const select = gsap.utils.selector(scene);

  return gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: { trigger: scene, start: "top 82%", end: "top 18%", scrub: .7 },
  })
    .fromTo(
      select(".coffee-object"),
      { xPercent: 11, yPercent: -12, rotate: 3, scale: 1.08, transformOrigin: "50% 88%" },
      { xPercent: 0, yPercent: 0, rotate: 0, scale: 1, duration: .78, ease: "power2.out" },
    )
    .fromTo(select(".coffee-shadow"), { scaleX: 1.4, opacity: .08 }, { scaleX: 1, opacity: .24, duration: .74 }, 0)
    .fromTo(select(".coffee-copy"), { y: 18, opacity: .76 }, { y: 0, opacity: 1, duration: .58 }, .2)
    .fromTo(select(".coffee-steam-line"), { opacity: 0, y: 9 }, { opacity: .38, y: 0, duration: .2, stagger: .04 }, .66)
    .fromTo(select(".coffee-stage-note"), { opacity: 0 }, { opacity: .58, duration: .18 }, .7);
}
