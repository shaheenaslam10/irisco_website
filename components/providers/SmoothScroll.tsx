"use client";

/**
 * GSAP ScrollSmoother.
 *
 * Replaces Lenis. Two reasons it is the better tool for this page:
 *
 *  1. It is GSAP's own scroller, so it shares the ticker with ScrollTrigger —
 *     there is no separate RAF loop to keep in sync and no scrub lag.
 *  2. `effects: true` turns on `data-speed` / `data-lag`, which gives any
 *     element genuine scroll-linked depth from a single attribute. That is what
 *     makes "objects move on scroll" cheap enough to use everywhere.
 *
 * Structural requirement: ScrollSmoother translates `#smooth-content`, and a
 * translated ancestor breaks `position: fixed` descendants. So the wrapper only
 * ever contains page content — the header, skip link, progress bar and all
 * fixed chrome are portalled or kept outside it.
 *
 * If anything at all goes wrong we fall back to native scrolling rather than
 * leaving the page unscrollable.
 */

import { useEffect } from "react";

declare global {
  interface Window {
    __smoother?: {
      kill: () => void;
      paused: (value?: boolean) => boolean | void;
      scrollTo: (target: unknown, smooth?: boolean, position?: string) => void;
    };
  }
}

export function SmoothScroll() {
  useEffect(() => {
    type Smoother = NonNullable<Window["__smoother"]>;
    let cancelled = false;
    let smoother: Smoother | undefined;

    void (async () => {
      const wrapper = document.getElementById("smooth-wrapper");
      const content = document.getElementById("smooth-content");
      if (!wrapper || !content) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        document.documentElement.dataset.smooth = "reduced";
        return;
      }

      try {
        const [{ gsap }, { ScrollTrigger }, { ScrollSmoother }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("gsap/ScrollSmoother"),
        ]);
        if (cancelled) return;

        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

        smoother = ScrollSmoother.create({
          wrapper,
          content,
          smooth: 1.25,
          effects: true,
          smoothTouch: 0.1,
          normalizeScroll: false,
          ignoreMobileResize: true,
        }) as unknown as Smoother;

        window.__smoother = smoother;
        document.documentElement.dataset.smooth = "on";

        // Fonts change every measurement on this page.
        void document.fonts?.ready.then(() => {
          if (!cancelled) ScrollTrigger.refresh();
        });
      } catch (error) {
        console.error("[smooth] ScrollSmoother failed — using native scroll", error);
        document.documentElement.dataset.smooth = "native";
      }
    })();

    return () => {
      cancelled = true;
      smoother?.kill();
      delete window.__smoother;
    };
  }, []);

  return null;
}
