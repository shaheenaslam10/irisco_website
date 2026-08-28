"use client";

import { CinemaVideo } from "../motion/CinemaVideo";
import { idea } from "../content";

/**
 * 01 · The idea.
 *
 * The clip runs full-bleed behind the manifesto, bright, scrubbed by the
 * scroll. It is not a window on the right any more — the wash handles the
 * balance instead: dark behind the words on the left, clearing to the right so
 * the footage and the cup in it stay plainly visible.
 *
 * The source also carried a "MINIMAX | Hailuo AI" watermark in its bottom-right
 * corner; the shipped encode is cropped above it.
 */
export function Idea() {
  return (
    <section className="h-section h-idea" data-scene="idea" id="chapter-idea">
      <div className="h-idea-bg" aria-hidden="true">
        <CinemaVideo slug="macro" mode="scrub" className="h-fill" data-scrub-video alt="" />
      </div>
      <div className="h-idea-wash" aria-hidden="true" />

      <div className="h-idea-inner" data-reveal-group>
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
