"use client";

import { useCallback } from "react";
import { chapters } from "../content";

/**
 * The table of contents for the film. Active state is written by the motion
 * layer (one ScrollTrigger per chapter); clicking uses Lenis when it owns the
 * scroll so the jump is as smooth as everything else.
 */
export function ChapterRail() {
  const go = useCallback((id: string) => {
    const target = document.getElementById(`chapter-${id}`);
    if (!target) return;
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    else target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <aside className="c-rail" aria-label="Chapters">
      <div className="c-rail-list">
        {chapters.map((chapter) => (
          <button
            key={chapter.id}
            type="button"
            className="c-rail-item"
            data-rail-item={chapter.id}
            data-active={chapter.id === "hero" ? "true" : "false"}
            onClick={() => go(chapter.id)}
          >
            <span>{chapter.label}</span>
            <b>{chapter.index}</b>
            <i aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="c-rail-line" aria-hidden="true">
        <i data-rail-progress />
      </div>
    </aside>
  );
}
