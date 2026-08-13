import type { RefObject } from "react";
import { useEffect } from "react";
import { createBakeryTimeline } from "../animation/bakeryTimeline";
import { createCoffeeTimeline } from "../animation/coffeeTimeline";
import { createCommunityTimeline } from "../animation/communityTimeline";
import { createCultureTimeline } from "../animation/cultureTimeline";
import { createPantryTimeline } from "../animation/pantryTimeline";
import { createProductTimeline } from "../animation/productTimeline";
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

        media.add(DESKTOP_STORY_QUERY, () => {
          const coffee = scene(storyRoot, "coffee");
          const bakery = scene(storyRoot, "bakery");
          const pantry = scene(storyRoot, "pantry");
          const product = scene(storyRoot, "product");
          const culture = scene(storyRoot, "culture");
          const community = scene(storyRoot, "community");

          if (coffee) createCoffeeTimeline(gsap, coffee);
          if (bakery) createBakeryTimeline(gsap, bakery);
          if (pantry) createPantryTimeline(gsap, pantry);
          if (product) createProductTimeline(gsap, product);
          if (culture) createCultureTimeline(gsap, culture);
          if (community) createCommunityTimeline(gsap, community);
        });

        media.add(COMPACT_STORY_QUERY, () => {
          storyRoot.querySelectorAll<HTMLElement>(".mobile-reveal").forEach((element) => {
            gsap.from(element, {
              opacity: 0,
              y: 35,
              duration: .8,
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
