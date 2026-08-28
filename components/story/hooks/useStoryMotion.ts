import type { RefObject } from "react";
import { useEffect } from "react";
import { createOpeningTimeline } from "../animation/openingTimeline";
import { createManifestoTimeline } from "../animation/manifestoTimeline";
import { createRitualTimeline } from "../animation/ritualTimeline";
import { createCounterTimeline } from "../animation/counterTimeline";
import { createPantryTimeline } from "../animation/pantryTimeline";
import { createSpaceTimeline } from "../animation/spaceTimeline";
import { createInvitationTimeline } from "../animation/invitationTimeline";
import {
  COMPACT_STORY_QUERY,
  DESKTOP_STORY_QUERY,
  refreshStoryMotion,
  setupStoryMotion,
} from "../animation/setupStoryMotion";
import type { StoryMatchMedia } from "../animation/setupStoryMotion";

const scene = (root: HTMLElement, name: string) =>
  root.querySelector<HTMLElement>(`[data-story-scene="${name}"]`);

export function useStoryMotion(root: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const storyRoot = root.current;
    const motionOK = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!storyRoot || !motionOK) return;

    let cancelled = false;
    let context: { revert: () => void } | undefined;
    let media: StoryMatchMedia | undefined;

    void setupStoryMotion().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      context = gsap.context(() => {
        media = gsap.matchMedia();

        // Desktop: seven distinct scroll devices, one per scene.
        media.add(DESKTOP_STORY_QUERY, () => {
          const opening = scene(storyRoot, "opening");
          const manifesto = scene(storyRoot, "manifesto");
          const ritual = scene(storyRoot, "ritual");
          const counter = scene(storyRoot, "counter");
          const pantry = scene(storyRoot, "pantry");
          const space = scene(storyRoot, "space");
          const invitation = scene(storyRoot, "invitation");
          if (opening) createOpeningTimeline(gsap, opening, "desktop");
          if (manifesto) createManifestoTimeline(gsap, manifesto);
          if (ritual) createRitualTimeline(gsap, ritual);
          if (counter) createCounterTimeline(gsap, counter);
          if (pantry) createPantryTimeline(gsap, pantry);
          if (space) createSpaceTimeline(gsap, space);
          if (invitation) createInvitationTimeline(gsap, invitation);
        });

        // Compact: the hero keeps its (shorter) scrub; every other scene is a
        // vertical stack that simply reveals as it enters.
        media.add(COMPACT_STORY_QUERY, () => {
          const opening = scene(storyRoot, "opening");
          if (opening) createOpeningTimeline(gsap, opening, "compact");
          storyRoot.querySelectorAll<HTMLElement>(".mobile-reveal").forEach((element) => {
            gsap.from(element, {
              opacity: 0,
              y: 35,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 88%" },
            });
          });
        });
      }, storyRoot);
      void refreshStoryMotion(storyRoot, ScrollTrigger, () => cancelled);
    });

    return () => {
      cancelled = true;
      media?.revert();
      context?.revert();
    };
  }, [root]);
}
