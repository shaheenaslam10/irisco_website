import type { StoryGsap } from "./setupStoryMotion";

type OpeningMode = "desktop" | "compact";

/**
 * The IRISCO hero. Two independent timelines on disjoint target sets:
 *  - `intro` plays once on load (ring draw, iris-in of the room, line-masked headline).
 *  - `scroll` is pinned + scrubbed (slow push-in, teal "night" grade lifting to day,
 *    and three cross-fading text states).
 * CSS holds the fully-revealed static state, so under reduced motion (this whole
 * engine is skipped) the hero still reads correctly.
 */
export function createOpeningTimeline(gsap: StoryGsap, scene: HTMLElement, mode: OpeningMode) {
  const select = gsap.utils.selector(scene);
  const compact = mode === "compact";

  const ring = select(".opening-ring");
  const ringCircle = select(".opening-ring circle");
  const lens = select(".opening-lens");
  const lensImg = select(".opening-lens img");
  const grade = select(".opening-grade");
  const kicker = select(".opening-kicker");
  const titleLines = select(".opening-title .line-inner");
  const lede = select(".opening-text-arrival .opening-lede");
  const actions = select(".opening-text-arrival .hero-actions");
  const arrival = select(".opening-text-arrival");
  const ritual = select(".opening-text-ritual");
  const resolution = select(".opening-text-resolution");

  // ---- intro (load) ---------------------------------------------------------
  gsap.set(lens, { autoAlpha: 0, clipPath: "inset(14% round 10px)" });
  gsap.set(ring, { autoAlpha: 0, scale: 0.7, transformOrigin: "50% 50%" });
  gsap.set(ringCircle, { strokeDashoffset: 1 });
  gsap.set(kicker, { autoAlpha: 0, y: 16 });
  gsap.set(titleLines, { yPercent: 120 });
  gsap.set([lede, actions], { autoAlpha: 0, y: 22 });

  const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
  intro
    .to(lens, { autoAlpha: 1, clipPath: "inset(0% round 0px)", duration: 1.5, ease: "power2.out" }, 0)
    .to(ring, { autoAlpha: 1, scale: 1, duration: 1.2, ease: "power2.out" }, 0.1)
    .to(ringCircle, { strokeDashoffset: 0, duration: 1.5, ease: "power1.inOut" }, 0.1)
    .to(kicker, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.55)
    .to(titleLines, { yPercent: 0, duration: 1.1, stagger: 0.12, ease: "power4.out" }, 0.6)
    .to([lede, actions], { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12 }, 1)
    .to(ring, { autoAlpha: 0, scale: 1.55, duration: 1.2, ease: "power1.inOut" }, 1.7);

  // ---- scroll (pinned scrub) ------------------------------------------------
  gsap.set([ritual, resolution], { autoAlpha: 0 });

  const timeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: scene,
      start: "top top",
      end: compact ? "+=150%" : "+=240%",
      scrub: compact ? 0.6 : 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  timeline
    .fromTo(lensImg, { scale: 1.05 }, { scale: 1.18, duration: 1 }, 0)
    .fromTo(grade, { opacity: 0.74 }, { opacity: 0.14, duration: 0.7 }, 0)
    .to(arrival, { autoAlpha: 0, yPercent: -12, duration: 0.18 }, 0.22)
    .fromTo(ritual, { autoAlpha: 0, yPercent: 12 }, { autoAlpha: 1, yPercent: 0, duration: 0.16 }, 0.32)
    .to(ritual, { autoAlpha: 0, yPercent: -12, duration: 0.16 }, 0.58)
    .fromTo(resolution, { autoAlpha: 0, yPercent: 12 }, { autoAlpha: 1, yPercent: 0, duration: 0.18 }, 0.66)
    .to({}, { duration: 0.2 });

  return timeline;
}
