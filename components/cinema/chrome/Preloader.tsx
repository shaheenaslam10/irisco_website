"use client";

import { useEffect, useRef } from "react";
import { REDUCED_QUERY } from "../motion/gsapSetup";

const DURATION = 950;
const RADIUS = 47;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * A short curtain while the first frames decode.
 *
 * It is gated on `html.js-motion` (set by the inline bootstrap in <head>), so a
 * visitor without JS — or with reduced motion — never sees it and never waits.
 *
 * The counter is written straight to the DOM rather than through React state:
 * it updates every frame, and there is nothing here a render needs to know.
 */
export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const sweepRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const finish = () => {
      root.dataset.done = "true";
      document.body.style.overflow = "";
      window.__lenis?.start();
    };

    if (window.matchMedia(REDUCED_QUERY).matches) {
      finish();
      return;
    }

    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    let startedAt: number | null = null;
    let frame = 0;

    const step = (now: number) => {
      if (startedAt === null) startedAt = now;
      const progress = Math.min(1, (now - startedAt) / DURATION);
      const value = Math.round(progress * 100);

      if (countRef.current) countRef.current.textContent = String(value).padStart(3, "0");
      if (sweepRef.current) {
        sweepRef.current.setAttribute(
          "stroke-dashoffset",
          String(CIRCUMFERENCE * (1 - value / 100)),
        );
      }

      if (progress < 1) {
        frame = requestAnimationFrame(step);
        return;
      }
      finish();
    };

    frame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = "";
      window.__lenis?.start();
    };
  }, []);

  return (
    <div className="c-preloader" data-done="false" ref={rootRef} aria-hidden="true">
      <div className="c-preloader-inner">
        <svg className="c-preloader-ring" viewBox="0 0 100 100">
          <circle className="track" cx="50" cy="50" r={RADIUS} />
          <circle
            ref={sweepRef}
            className="sweep"
            cx="50"
            cy="50"
            r={RADIUS}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
          />
        </svg>
        <span className="c-preloader-word">irisco</span>
        <span className="c-preloader-count" ref={countRef}>
          000
        </span>
      </div>
    </div>
  );
}
