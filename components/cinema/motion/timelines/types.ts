import type { Gsap, ScrollTriggerType } from "../gsapSetup";

export type SceneContext = {
  gsap: Gsap;
  ScrollTrigger: ScrollTriggerType;
  scene: HTMLElement;
  mode: "desktop" | "compact";
};

export type SceneSetup = (ctx: SceneContext) => void | (() => void);
