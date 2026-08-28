"use client";

/**
 * Lenis smooth scroll, driven by the GSAP ticker so it stays perfectly in sync
 * with every ScrollTrigger (pin, scrub, snap) on the site. This is the standard
 * integration pattern for premium GSAP-driven sites.
 *
 * - Disabled entirely under `prefers-reduced-motion` (native scroll takes over).
 * - Exposes the instance on `window.__lenis` for anchor scrolling helpers.
 * - Fully torn down on unmount / route change guard.
 */

import { useEffect } from "react";

declare global {
  interface Window {
    __lenis?: import("lenis").default;
  }
}

export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
        smoothWheel: true,
        touchMultiplier: 1.6,
        wheelMultiplier: 1,
      });
      window.__lenis = lenis;

      lenis.on("scroll", ScrollTrigger.update);

      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      // Let ScrollTrigger recompute once Lenis owns the scroll.
      ScrollTrigger.refresh();

      cleanup = () => {
        gsap.ticker.remove(raf);
        lenis.off("scroll", ScrollTrigger.update);
        lenis.destroy();
        if (window.__lenis === lenis) delete window.__lenis;
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}
