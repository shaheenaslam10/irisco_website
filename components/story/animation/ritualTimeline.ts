import type { StoryGsap } from "./setupStoryMotion";

/**
 * The coffee ritual — the engineered peak, and the longest pin on the page.
 * Four frames (ground, pulled, poured, served) cross-fade as the scroll is
 * scrubbed, each with its own slow Ken Burns push and a caption that rises in
 * as the frame takes over. The warm espresso tone is a deliberate day/night
 * break from the surrounding teal. On reduced motion the engine is skipped and
 * story.css shows the four frames as a plain vertical gallery.
 */
export function createRitualTimeline(gsap: StoryGsap, scene: HTMLElement) {
  const select = gsap.utils.selector(scene);
  const frames = select(".ritual-frame");
  if (!frames.length) return gsap.timeline();

  // Controlled start state: only the first frame is visible.
  gsap.set(frames, { autoAlpha: 0 });
  gsap.set(frames[0], { autoAlpha: 1 });

  const timeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: scene,
      start: "top top",
      end: "+=400%",
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  const seg = 1;

  frames.forEach((frame, index) => {
    const img = frame.querySelector("img");
    const cap = frame.querySelector(".ritual-cap");
    const enter = index * seg;
    const kbAt = Math.max(0, enter - seg * 0.25);
    const capAt = Math.max(0, enter - seg * 0.1);

    // Cross-fade this frame in over the previous one.
    if (index > 0) {
      timeline
        .to(frames[index - 1], { autoAlpha: 0, duration: seg * 0.5 }, kbAt)
        .to(frame, { autoAlpha: 1, duration: seg * 0.5 }, kbAt);
    }

    // Slow push on the image while it holds the frame.
    if (img) {
      timeline.fromTo(img, { scale: 1.12 }, { scale: 1, duration: seg * 1.35, ease: "power1.out" }, kbAt);
    }

    // Caption rises as the frame arrives.
    if (cap) {
      timeline.fromTo(
        cap,
        { autoAlpha: 0, yPercent: 8 },
        { autoAlpha: 1, yPercent: 0, duration: seg * 0.5, ease: "power2.out" },
        capAt,
      );
    }
  });

  // Hold the final frame before releasing the pin.
  timeline.to({}, { duration: seg * 0.5 });

  return timeline;
}
