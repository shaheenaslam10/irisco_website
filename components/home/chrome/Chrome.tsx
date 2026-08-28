"use client";

import { useCallback, useEffect, useRef } from "react";
import { chapters } from "../content";
import { Portal } from "@/components/ui/Portal";

/**
 * Fixed page chrome, portalled to <body>.
 *
 * ScrollSmoother translates #smooth-content, and a translated ancestor becomes
 * the containing block for position: fixed — so anything fixed inside the page
 * would scroll away with the content. Everything here lives outside it.
 */

export function ChapterRail() {
  const go = useCallback((id: string) => {
    const target = document.getElementById(`chapter-${id}`);
    if (!target) return;
    window.__smoother?.scrollTo(target, true, "top top");
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <Portal>
      <aside className="h-rail" aria-label="Chapters">
        <ol className="h-rail-list">
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <button
                type="button"
                className="h-rail-item"
                data-rail-item={chapter.id}
                data-active={chapter.id === "arrival" ? "true" : "false"}
                onClick={() => go(chapter.id)}
              >
                <span>{chapter.label}</span>
                <b>{chapter.index}</b>
                <i aria-hidden="true" />
              </button>
            </li>
          ))}
        </ol>
        <span className="h-rail-line" aria-hidden="true">
          <i data-rail-progress />
        </span>
      </aside>
    </Portal>
  );
}

/**
 * Atmosphere.
 *
 * The grain is a small static tile at low opacity — deliberately NOT a
 * viewport-sized layer with mix-blend-mode, which forces the compositor to
 * re-blend a full-screen surface every frame. That was the single biggest
 * frame-time cost of the previous build.
 */
export function Atmosphere() {
  return (
    <Portal>
      <div className="h-grain" aria-hidden="true" />
      <div className="h-vignette" aria-hidden="true" />
    </Portal>
  );
}

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = ref.current;
    if (!dot) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let frame = 0;
    let shown = false;

    const onMove = (event: PointerEvent) => {
      tx = event.clientX;
      ty = event.clientY;
      if (!shown) {
        shown = true;
        dot.style.opacity = "1";
      }
      dot.dataset.hot = (event.target as Element | null)?.closest?.(
        'a, button, [role="button"]',
      )
        ? "true"
        : "false";
    };
    const onLeave = () => {
      shown = false;
      dot.style.opacity = "0";
    };
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <Portal>
      <div ref={ref} className="h-cursor" aria-hidden="true" />
    </Portal>
  );
}

export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const sweepRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const R = 46;
    const C = 2 * Math.PI * R;

    const finish = () => {
      root.dataset.done = "true";
      document.body.style.overflow = "";
      window.__smoother?.paused(false);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    document.body.style.overflow = "hidden";
    window.__smoother?.paused(true);

    let start: number | null = null;
    let frame = 0;

    const step = (now: number) => {
      if (start === null) start = now;
      const p = Math.min(1, (now - start) / 900);
      const value = Math.round(p * 100);
      if (countRef.current) countRef.current.textContent = String(value).padStart(3, "0");
      if (sweepRef.current) {
        sweepRef.current.setAttribute("stroke-dashoffset", String(C * (1 - value / 100)));
      }
      if (p < 1) {
        frame = requestAnimationFrame(step);
        return;
      }
      finish();
    };

    frame = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = "";
      window.__smoother?.paused(false);
    };
  }, []);

  return (
    <Portal>
      <div className="h-preloader" data-done="false" ref={rootRef} aria-hidden="true">
        <div className="h-preloader-inner">
          <svg className="h-preloader-ring" viewBox="0 0 100 100">
            <circle className="is-track" cx="50" cy="50" r={46} />
            <circle
              ref={sweepRef}
              className="is-sweep"
              cx="50"
              cy="50"
              r={46}
              strokeDasharray={2 * Math.PI * 46}
              strokeDashoffset={2 * Math.PI * 46}
            />
          </svg>
          <span className="h-preloader-word">irisco</span>
          <span className="h-preloader-count" ref={countRef}>
            000
          </span>
        </div>
      </div>
    </Portal>
  );
}
