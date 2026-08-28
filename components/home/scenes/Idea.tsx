"use client";

import { Backdrop } from "../chrome/Backdrop";
import { idea } from "../content";

/**
 * 01 · The idea.
 *
 * The manifesto reads itself — words brighten as the scroll head passes them.
 * A soft CSS bloom sits behind at low opacity, so the chapter is not just type
 * on black — without spending a clip on a background.
 */
export function Idea() {
  return (
    <section className="h-section h-idea" data-scene="idea" id="chapter-idea">
      <div className="h-idea-bed" aria-hidden="true">
        <Backdrop variant="cool" />
      </div>

      <div className="h-idea-inner">
        <div className="h-index" data-reveal>
          <b>{idea.index}</b> {idea.label}
        </div>
        <p className="h-kicker" data-reveal>
          {idea.kicker}
        </p>

        <p className="h-statement" data-words>
          {idea.statement}
        </p>

        <p className="h-sign" data-reveal>
          {idea.signature}
        </p>
      </div>
    </section>
  );
}
