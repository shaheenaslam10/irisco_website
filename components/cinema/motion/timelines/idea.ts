import type { SceneSetup } from "./types";

/**
 * 01 · The idea.
 *
 * The manifesto lights up one word at a time as the reader scrolls through it —
 * a soft rolling highlight rather than a hard on/off, so the sentence stays
 * readable at any point in the scrub.
 */
export const setupIdea: SceneSetup = ({ gsap, ScrollTrigger, scene }) => {
  const statement = scene.querySelector<HTMLElement>("[data-statement]");
  if (!statement) return;

  const words = Array.from(statement.querySelectorAll<HTMLElement>(".w"));
  if (!words.length) return;

  const LEAD = 7; // how many words the highlight bleeds across
  const DIM = 0.16;
  const LIT = 0.94;

  const paint = (progress: number) => {
    const head = progress * (words.length + LEAD);
    words.forEach((word, i) => {
      const t = gsap.utils.clamp(0, 1, (head - i) / LEAD);
      word.style.color = `rgba(245, 241, 232, ${(DIM + (LIT - DIM) * t).toFixed(3)})`;
    });
  };

  paint(0);

  ScrollTrigger.create({
    trigger: statement,
    start: "top 78%",
    end: "bottom 55%",
    scrub: true,
    invalidateOnRefresh: true,
    onUpdate: (self) => paint(self.progress),
    onRefresh: (self) => paint(self.progress),
  });
};
