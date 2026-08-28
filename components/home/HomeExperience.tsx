"use client";

import { useEffect, useRef } from "react";
import "./home.css";

import {
  COMPACT_QUERY,
  DESKTOP_QUERY,
  loadMotion,
  prefersReducedMotion,
  refreshAfterFonts,
  type Gsap,
  type Motion,
} from "./motion/gsapSetup";
import {
  buildDrawings,
  buildMarquee,
  buildReveals,
  buildSplitHeadings,
  buildWordHighlight,
} from "./motion/reveals";
import { sceneSetups } from "./motion/timelines";
import { chapters } from "./content";

import { Atmosphere, ChapterRail, Cursor, Preloader } from "./chrome/Chrome";
import { Marquee } from "./chrome/Marquee";
import { Arrival } from "./scenes/Arrival";
import { Counter } from "./scenes/Counter";
import { Gallery } from "./scenes/Gallery";
import { Idea } from "./scenes/Idea";
import { Invite } from "./scenes/Invite";
import { Pantry } from "./scenes/Pantry";
import { Pour } from "./scenes/Pour";
import { Quote } from "./scenes/Quote";
import { Room } from "./scenes/Room";
import { Study } from "./scenes/Study";

type Mode = "desktop" | "compact";

/* --------------------------------------------------------- rail activation */

function buildRail(motion: Motion, root: HTMLElement) {
  const { gsap, ScrollTrigger } = motion;

  // `data-rail-*` lives in a portal outside #smooth-content.
  const railItems = Array.from(document.querySelectorAll<HTMLElement>("[data-rail-item]"));
  const railBar = document.querySelector<HTMLElement>("[data-rail-progress]");

  if (railBar) {
    ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => gsap.set(railBar, { scaleY: self.progress }),
    });
  }

  const activate = (id: string) => {
    railItems.forEach((item) => {
      item.dataset.active = item.dataset.railItem === id ? "true" : "false";
    });
  };

  chapters.forEach((chapter) => {
    const scene = document.getElementById(`chapter-${chapter.id}`);
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

/* ------------------------------------------------------------------- layer */

function buildLayer(motion: Motion, root: HTMLElement, mode: Mode) {
  const teardown: Array<() => void> = [];

  const stopSplit = buildSplitHeadings(motion, root);
  if (stopSplit) teardown.push(stopSplit);
  const stopWords = buildWordHighlight(motion, root);
  if (stopWords) teardown.push(stopWords);

  buildReveals(motion.gsap, root, mode);
  buildDrawings(motion, root);
  const stopMarquee = buildMarquee(motion.gsap, motion.ScrollTrigger, root);
  if (stopMarquee) teardown.push(stopMarquee);

  for (const [name, setup] of Object.entries(sceneSetups)) {
    const scene = root.querySelector<HTMLElement>(`[data-scene="${name}"]`);
    if (!scene) continue;
    try {
      const stop = setup({ motion, scene, mode });
      if (stop) teardown.push(stop);
    } catch (error) {
      // One broken chapter must never take the rest of the story with it.
      console.error(`[home] chapter "${name}" failed`, error);
    }
  }

  buildRail(motion, root);

  return () => teardown.forEach((fn) => fn());
}

/**
 * The main page.
 *
 * One GSAP context owns every timeline so teardown is atomic; one `matchMedia`
 * per breakpoint so resizing across 1024px never leaves an orphaned pin.
 *
 * Every failure path lands on the same outcome — a finished, legible, static
 * page: reduced motion builds nothing; a failed load drops the motion flag; a
 * chapter that throws is caught; and a watchdog drops the flag if nothing
 * reports ready.
 */
export function HomeExperience() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) {
      document.documentElement.dataset.home = "static";
      return;
    }

    let cancelled = false;
    let context: { revert: () => void } | undefined;
    let media: ReturnType<Gsap["matchMedia"]> | undefined;

    const watchdog = window.setTimeout(() => {
      if (cancelled || document.documentElement.dataset.home === "ready") return;
      console.warn("[home] motion never reported ready — falling back to static");
      document.documentElement.classList.remove("js-motion");
      document.documentElement.dataset.home = "static";
    }, 4000);

    loadMotion()
      .then((motion) => {
        if (cancelled) return;
        try {
          context = motion.gsap.context(() => {
            media = motion.gsap.matchMedia();
            media.add(DESKTOP_QUERY, () => buildLayer(motion, el, "desktop"));
            media.add(COMPACT_QUERY, () => buildLayer(motion, el, "compact"));
          }, el);
          document.documentElement.dataset.home = "ready";
          window.clearTimeout(watchdog);
          void refreshAfterFonts(motion.ScrollTrigger, () => cancelled);
        } catch (error) {
          console.error("[home] failed to build scenes", error);
          document.documentElement.classList.remove("js-motion");
          document.documentElement.dataset.home = "static";
          window.clearTimeout(watchdog);
        }
      })
      .catch((error) => {
        console.error("[home] motion layer failed to load", error);
        window.clearTimeout(watchdog);
        document.documentElement.classList.remove("js-motion");
        document.documentElement.dataset.home = "static";
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
      <Atmosphere />
      <Cursor />
      <ChapterRail />

      <div className="home" ref={root} data-home-root>
        <Arrival />
        <Marquee />
        <Idea />
        <Pour />
        <Room />
        <Gallery />
        <Counter />
        <Study />
        <Pantry />
        <Marquee tone="teal" />
        <Quote />
        <Invite />
      </div>
    </>
  );
}
