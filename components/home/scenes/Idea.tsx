"use client";

import { CinemaVideo } from "../motion/CinemaVideo";
import { idea } from "../content";

/**
 * 01 · The idea.
 *
 * Copy on the left, the clip on the right — matching The pour, so the page has
 * a consistent rhythm of words beside footage rather than words on top of it.
 *
 * The clip is lifted (see .h-idea-film) because the macro source is dark, and
 * dimmed further by compression the detail disappeared entirely.
 */
export function Idea() {
  return (
    <section className="h-section h-idea" data-scene="idea" id="chapter-idea">
      <div className="h-idea-grid">
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

        <div className="h-idea-stage">
          <div className="h-film h-idea-film">
            <CinemaVideo slug="macro" mode="scrub" className="h-fill" data-scrub-video alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
