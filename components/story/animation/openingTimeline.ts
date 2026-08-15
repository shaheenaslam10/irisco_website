import type { StoryGsap } from "./setupStoryMotion";

type OpeningMode = "desktop" | "compact";

export function createOpeningTimeline(gsap: StoryGsap, scene: HTMLElement, mode: OpeningMode) {
  const select = gsap.utils.selector(scene);
  const compact = mode === "compact";

  return gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: scene,
      start: "top top",
      end: compact ? "+=210%" : "+=420%",
      scrub: compact ? .75 : 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  })
    .fromTo(select(".opening-cup-wrap"),
      { xPercent: compact ? 18 : 30, yPercent: compact ? -16 : -25, scale: compact ? 1.25 : 1.52, rotate: 6, transformOrigin: "50% 88%" },
      { xPercent: compact ? 2 : 8, yPercent: compact ? -6 : -8, scale: compact ? 1.1 : 1.2, rotate: 3, duration: .16, ease: "power2.inOut" },
    )
    .fromTo(select(".opening-state-hero"), { y: 0, opacity: 1 }, { y: compact ? -24 : -60, opacity: 0, duration: .14 }, .02)
    .fromTo(select(".opening-stone"), { yPercent: 24, opacity: 0 }, { yPercent: 8, opacity: .72, duration: .24, ease: "power1.out" }, .1)
    .fromTo(select(".opening-state-ritual"), { xPercent: -8, yPercent: 12, opacity: 0 }, { xPercent: 0, yPercent: 0, opacity: 1, duration: .2, ease: "power2.out" }, .12)
    .to(select(".opening-cup-wrap"), { xPercent: 0, yPercent: 0, scale: 1, rotate: 0, duration: .2, ease: "power2.inOut" }, .24)
    .to(select(".opening-state-ritual"), { xPercent: 4, opacity: 0, duration: .12 }, .26)
    .fromTo(select(".opening-state-lid"), { xPercent: -3, yPercent: 10, opacity: 0 }, { xPercent: 0, yPercent: 0, opacity: 1, duration: .14 }, .28)
    .fromTo(select(".opening-cup-closed"), { opacity: 1 }, { opacity: 0, duration: .055 }, .37)
    .fromTo(select(".opening-cup-open"), { opacity: 0 }, { opacity: 1, duration: .055 }, .37)
    .fromTo(select(".opening-lid"),
      { xPercent: 0, yPercent: 0, rotate: 0, scale: 1 },
      { xPercent: compact ? 8 : 12, yPercent: compact ? -26 : -34, rotate: -7, scale: .92, duration: .16, ease: "power1.inOut" },
      .36,
    )
    .fromTo(select(".opening-coffee-surface"), { opacity: 0, scale: .72 }, { opacity: .86, scale: 1, duration: .1 }, .405)
    .to(select(".opening-state-lid"), { yPercent: -10, opacity: 0, duration: .1 }, .47)
    .fromTo(select(".opening-state-liquid"), { xPercent: 4, yPercent: 8, opacity: 0 }, { xPercent: 0, yPercent: 0, opacity: 1, duration: .13 }, .47)
    .to(select(".opening-cup-wrap"), { xPercent: compact ? -2 : -4, yPercent: compact ? 1 : 2, duration: .12, ease: "power1.inOut" }, .5)
    .fromTo(select(".opening-liquid"), { xPercent: -3, yPercent: 8, scale: .24, rotate: -6, opacity: 0, transformOrigin: "50% 12%" }, { xPercent: 0, yPercent: -2, scale: 1, rotate: 0, opacity: .96, duration: .18, ease: "power2.out" }, .57)
    .fromTo(select(".opening-bean-one"), { xPercent: -50, yPercent: 20, scale: .45, opacity: 0 }, { xPercent: 0, yPercent: 0, scale: 1, opacity: .9, duration: .11 }, .6)
    .fromTo(select(".opening-bean-two"), { xPercent: 60, yPercent: -18, scale: .35, opacity: 0 }, { xPercent: 0, yPercent: 0, scale: 1, opacity: .8, duration: .12 }, .64)
    .fromTo(select(".opening-bean-three"), { xPercent: 30, yPercent: 25, scale: .28, opacity: 0 }, { xPercent: 0, yPercent: 0, scale: 1, opacity: .82, duration: .12 }, .67)
    .to(select(".opening-liquid"), { xPercent: compact ? 0 : 2, yPercent: 18, scale: .16, rotate: 3, opacity: 0, duration: .18, ease: "power2.in" }, .75)
    .to(select(".opening-bean-one, .opening-bean-two, .opening-bean-three"), { yPercent: -14, opacity: 0, duration: .1, stagger: .025 }, .77)
    .to(select(".opening-state-liquid"), { xPercent: -3, opacity: 0, duration: .1 }, .76)
    .fromTo(select(".opening-state-final"), { xPercent: 4, yPercent: 8, opacity: 0 }, { xPercent: 0, yPercent: 0, opacity: 1, duration: .14, ease: "power1.out" }, .81)
    .to(select(".opening-cup-wrap"), { xPercent: 0, yPercent: compact ? 2 : 3, scale: compact ? .92 : .88, rotate: 0, duration: .15, ease: "power2.inOut" }, .8)
    .fromTo(select(".opening-cup-shadow"), { scaleX: 1.65, scaleY: .68, opacity: 0 }, { scaleX: 1, scaleY: 1, opacity: .28, duration: .16, ease: "power1.out" }, .82)
    .fromTo(select(".opening-steam"), { yPercent: 8, scale: .72, opacity: 0 }, { yPercent: 0, scale: 1, opacity: .62, duration: .14, ease: "power1.out" }, .86)
    .fromTo(select(".opening-hook"), { xPercent: 14, opacity: 0 }, { xPercent: 0, opacity: .62, duration: .1 }, .89)
    .to({}, { duration: compact ? .1 : .22 });
}
