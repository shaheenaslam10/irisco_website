import type { StoryGsap } from "./setupStoryMotion";

/**
 * Manifesto — the section pins and the four statement lines mask up one after
 * another as the scroll is scrubbed, while a faint halo drifts open behind
 * them. Shorter span than the hero and the ritual: this is the quiet beat
 * before the peak.
 */
export function createManifestoTimeline(gsap: StoryGsap, scene: HTMLElement) {
  const select = gsap.utils.selector(scene);
  const lines = select(".manifesto-statement .line-inner");
  const halo = select(".manifesto-halo");

  gsap.set(lines, { yPercent: 120 });

  const timeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: scene,
      start: "top top",
      end: "+=140%",
      scrub: 0.8,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  timeline
    .fromTo(halo, { scale: 0.82, autoAlpha: 0.28 }, { scale: 1.06, autoAlpha: 0.55, duration: 3 }, 0)
    .to(lines, { yPercent: 0, duration: 1, stagger: 0.55, ease: "power3.out" }, 0.1)
    .to({}, { duration: 0.4 });

  return timeline;
}
