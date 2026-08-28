import type { StoryGsap } from "./setupStoryMotion";

/**
 * Horizontal "shelf" — the section pins and the track translates left across the
 * full scroll distance. Panel meta reveals are driven off the same tween via
 * ScrollTrigger's containerAnimation. Only mounted on desktop; on compact the
 * track is a normal vertical stack (see story.css) and this never runs.
 */
export function createPantryTimeline(gsap: StoryGsap, scene: HTMLElement) {
  const track = scene.querySelector<HTMLElement>(".pantry-track");
  if (!track) return gsap.timeline();

  const distance = () => Math.max(0, track.scrollWidth - scene.offsetWidth);

  const timeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: scene,
      start: "top top",
      end: () => "+=" + distance(),
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  timeline.to(track, { x: () => -distance() });

  // Reveal each panel's copy as it enters, measured against the horizontal tween.
  gsap.utils.toArray<HTMLElement>(scene.querySelectorAll(".pantry-item")).forEach((item) => {
    const meta = item.querySelector(".pantry-item-meta");
    const image = item.querySelector(".pantry-item-image img");
    if (meta) {
      gsap.from(meta, {
        y: 48,
        autoAlpha: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          containerAnimation: timeline,
          start: "left 82%",
          toggleActions: "play none none reverse",
        },
      });
    }
    if (image) {
      gsap.fromTo(
        image,
        { scale: 1.14 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            containerAnimation: timeline,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        },
      );
    }
  });

  return timeline;
}
