"use client";

import { useEffect, useRef } from "react";
import "./cinema.css";

import {
  COMPACT_QUERY,
  DESKTOP_QUERY,
  loadMotion,
  prefersReducedMotion,
  refreshAfterAssets,
  type Gsap,
  type ScrollTriggerType,
} from "./motion/gsapSetup";
import { buildMarquee, buildParallax, buildReveals } from "./motion/reveals";
import { setupCounter } from "./motion/timelines/counter";
import { setupFinale } from "./motion/timelines/finale";
import { setupHero } from "./motion/timelines/hero";
import { setupIdea } from "./motion/timelines/idea";
import { setupPantry } from "./motion/timelines/pantry";
import { setupRitual } from "./motion/timelines/ritual";
import { setupRoom } from "./motion/timelines/room";
import type { SceneSetup } from "./motion/timelines/types";

import { chapters } from "./content";
import { ChapterRail } from "./chrome/ChapterRail";
import { Cursor } from "./chrome/Cursor";
import { Marquee } from "./chrome/Marquee";
import { Preloader } from "./chrome/Preloader";
import { DebugHud } from "./chrome/DebugHud";
import { Counter } from "./scenes/Counter";
import { Gallery } from "./scenes/Gallery";
import { Hero } from "./scenes/Hero";
import { Idea } from "./scenes/Idea";
import { Invitation } from "./scenes/Invitation";
import { Pantry } from "./scenes/Pantry";
import { Ritual } from "./scenes/Ritual";
import { Room } from "./scenes/Room";
import { Table } from "./scenes/Table";

/** Per-chapter timelines, keyed by `data-cinema-scene`. */
const sceneSetups: Record<string, SceneSetup> = {
  hero: setupHero,
  idea: setupIdea,
  ritual: setupRitual,
  room: setupRoom,
  counter: setupCounter,
  pantry: setupPantry,
  invitation: setupFinale,
};

type Mode = "desktop" | "compact";

function buildSceneLayer(
  { gsap, ScrollTrigger }: { gsap: Gsap; ScrollTrigger: ScrollTriggerType },
  root: HTMLElement,
  mode: Mode,
) {
  const teardown: Array<() => void> = [];

  buildReveals(gsap, root, mode);
  buildParallax(gsap, root);
  const stopMarquee = buildMarquee(gsap, ScrollTrigger, root);
  if (stopMarquee) teardown.push(stopMarquee);

  for (const [name, setup] of Object.entries(sceneSetups)) {
    const scene = root.querySelector<HTMLElement>(`[data-cinema-scene="${name}"]`);
    if (!scene) continue;
    try {
      const stop = setup({ gsap, ScrollTrigger, scene, mode });
      if (stop) teardown.push(stop);
    } catch (error) {
      // One broken chapter must never take the rest of the film with it.
      console.error(`[cinema] chapter "${name}" failed to set up`, error);
    }
  }

  buildChapterRail(gsap, ScrollTrigger, root);

  return () => teardown.forEach((fn) => fn());
}

/** Marks the rail's active chapter and fills its progress line. */
function buildChapterRail(
  gsap: Gsap,
  ScrollTrigger: ScrollTriggerType,
  root: HTMLElement,
) {
  const items = Array.from(root.querySelectorAll<HTMLElement>("[data-rail-item]"));
  const bar = root.querySelector<HTMLElement>("[data-rail-progress]");

  if (bar) {
    ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => gsap.set(bar, { scaleY: self.progress }),
    });
  }

  const activate = (id: string) => {
    items.forEach((item) => {
      item.dataset.active = item.dataset.railItem === id ? "true" : "false";
    });
  };

  chapters.forEach((chapter) => {
    const scene = root.querySelector<HTMLElement>(`#chapter-${chapter.id}`);
    if (!scene) return;
    ScrollTrigger.create({
      trigger: scene,
      start: "top 55%",
      end: "bottom 55%",
      onToggle: (self) => {
        if (self.isActive) activate(chapter.id);
      },
    });
  });
}

/**
 * The main page as a single film.
 *
 * One GSAP context owns every timeline so teardown is atomic, and one
 * `matchMedia` per breakpoint means desktop and compact never leave orphaned
 * pins behind when a window is resized across the line.
 */
export function CinemaExperience() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    let cancelled = false;
    let context: { revert: () => void } | undefined;
    let media: ReturnType<Gsap["matchMedia"]> | undefined;

    // Last line of defence. `js-motion` is what hides elements before their
    // entrance animation runs; if anything at all stops the motion layer from
    // reporting back, drop the flag so the page is simply a finished document
    // rather than a set of invisible elements.
    const watchdog = window.setTimeout(() => {
      if (cancelled || document.documentElement.dataset.cinema === "ready") return;
      console.warn("[cinema] motion did not report ready — falling back to static");
      document.documentElement.classList.remove("js-motion", "js");
    }, 4000);

    void loadMotion()
      .then(({ gsap, ScrollTrigger }) => {
        if (cancelled) return;

        try {
          context = gsap.context(() => {
            media = gsap.matchMedia();
            media.add(DESKTOP_QUERY, () => buildSceneLayer({ gsap, ScrollTrigger }, el, "desktop"));
            media.add(COMPACT_QUERY, () => buildSceneLayer({ gsap, ScrollTrigger }, el, "compact"));
          }, el);
        } catch (error) {
          console.error("[cinema] failed to build scenes", error);
          document.documentElement.classList.remove("js-motion", "js");
          return;
        }

        document.documentElement.dataset.cinema = "ready";
        window.clearTimeout(watchdog);
        void refreshAfterAssets(el, ScrollTrigger, () => cancelled);
      })
      .catch((error) => {
        // If the motion layer never arrives, drop the flag that hides things
        // and let the page fall back to being an ordinary, finished document.
        console.error("[cinema] motion layer failed to load", error);
        window.clearTimeout(watchdog);
        document.documentElement.classList.remove("js-motion", "js");
      });

    return () => {
      cancelled = true;
      window.clearTimeout(watchdog);
      media?.revert();
      context?.revert();
    };
  }, []);

  return (
    <>
      <Preloader />

      <div className="cinema" ref={root} data-cinema-root>
        <Hero />
        <Marquee />
        <Idea />
        <Ritual />
        <Room />
        <Counter />
        <Pantry />
        <Gallery />
        <Marquee tone="teal" />
        <Table />
        <Invitation />
        <ChapterRail />
      </div>

      <div className="c-grain" aria-hidden="true" />
      <div className="c-vignette" aria-hidden="true" />
      <Cursor />
      <DebugHud />
    </>
  );
}
