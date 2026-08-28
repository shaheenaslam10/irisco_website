"use client";

import { CinemaVideo } from "../motion/CinemaVideo";
import { idea } from "../content";

/**
 * 01 · The idea.
 *
 * The manifesto reads itself — words brighten as the scroll head passes them.
 *
 * This is where the macro clip lives. It is the softest clip in the set
 * (sharpness 106 against 600+ for the photography), so it is never asked to
 * carry detail: at 18% behind a heavy vignette it is a drifting warmth, which
 * is the one thing it is genuinely good at.
 */
export function Idea() {
  return (
    <section className="h-section h-idea" data-scene="idea" id="chapter-idea">
      <div className="h-idea-bed" aria-hidden="true">
        <CinemaVideo slug="macro" className="h-fill" alt="" />
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
