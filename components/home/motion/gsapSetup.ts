import type { gsap as GsapCore } from "gsap";
import type { ScrollTrigger as ScrollTriggerCore } from "gsap/ScrollTrigger";

export type Gsap = typeof GsapCore;
export type ScrollTriggerType = typeof ScrollTriggerCore;

export const DESKTOP_QUERY = "(min-width: 1024px)";
export const COMPACT_QUERY = "(max-width: 1023px)";
export const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

export type Motion = {
  gsap: Gsap;
  ScrollTrigger: ScrollTriggerType;
  SplitText: typeof import("gsap/SplitText").SplitText;
  DrawSVGPlugin: typeof import("gsap/DrawSVGPlugin").DrawSVGPlugin;
  MotionPathPlugin: typeof import("gsap/MotionPathPlugin").MotionPathPlugin;
  CustomEase: typeof import("gsap/CustomEase").CustomEase;
  Flip: typeof import("gsap/Flip").Flip;
  ScrollToPlugin: typeof import("gsap/ScrollToPlugin").ScrollToPlugin;
  Observer: typeof import("gsap/Observer").Observer;
  ScrambleTextPlugin: typeof import("gsap/ScrambleTextPlugin").ScrambleTextPlugin;
};

/**
 * Loads GSAP and every plugin the page uses, once, on demand.
 *
 * All of these were Club GreenSock members' only until GSAP 3.13 made the whole
 * toolkit free — they are already in node_modules, so this costs nothing extra
 * in licences and buys a much better motion system than hand-rolled code:
 *
 *   SplitText       real line/word splitting with masking and auto re-split
 *   ScrollTrigger   pins, scrubs, container animations
 *   DrawSVGPlugin   the ring and rule lines draw themselves
 *   MotionPathPlugin objects travelling along real curves
 *   CustomEase      a signature easing curve
 *   Flip            card → detail layout transitions
 *   Observer        drag / swipe / wheel gestures
 *   ScrollToPlugin  smooth anchor jumps
 *   ScrambleTextPlugin text reveals
 */
let pending: Promise<Motion> | undefined;

export function loadMotion(): Promise<Motion> {
  if (pending) return pending;

  pending = (async () => {
    const [{ gsap }, { ScrollTrigger }, { SplitText }, { DrawSVGPlugin }, { MotionPathPlugin }, { CustomEase }, { Flip }, { ScrollToPlugin }, { Observer }, { ScrambleTextPlugin }] =
      await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/SplitText"),
        import("gsap/DrawSVGPlugin"),
        import("gsap/MotionPathPlugin"),
        import("gsap/CustomEase"),
        import("gsap/Flip"),
        import("gsap/ScrollToPlugin"),
        import("gsap/Observer"),
        import("gsap/ScrambleTextPlugin"),
      ]);

    gsap.registerPlugin(
      ScrollTrigger,
      SplitText,
      DrawSVGPlugin,
      MotionPathPlugin,
      CustomEase,
      Flip,
      ScrollToPlugin,
      Observer,
      ScrambleTextPlugin,
    );

    // Two signature curves, so the page's motion has a voice of its own rather
    // than sounding like every other GSAP site.
    if (!gsap.parseEase("iris")) {
      CustomEase.create("iris", "M0,0 C0.12,0.72 0.18,1 1,1");
      CustomEase.create("irisInOut", "M0,0 C0.7,0 0.3,1 1,1");
    }

    gsap.defaults({ ease: "power3.out" });

    return {
      gsap,
      ScrollTrigger,
      SplitText,
      DrawSVGPlugin,
      MotionPathPlugin,
      CustomEase,
      Flip,
      ScrollToPlugin,
      Observer,
      ScrambleTextPlugin,
    };
  })();

  return pending;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(REDUCED_QUERY).matches;
}

/** Re-measure once fonts land, or every pin start/end is wrong. */
export async function refreshAfterFonts(
  ScrollTrigger: ScrollTriggerType,
  isCancelled: () => boolean,
) {
  try {
    await document.fonts?.ready;
  } catch {
    /* fonts API unavailable — nothing to wait for */
  }
  if (isCancelled()) return;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (!isCancelled()) ScrollTrigger.refresh();
    });
  });
}
