"use client";

import { layer } from "../content";
import { idea } from "../content";

/**
 * 01 · The idea.
 *
 * The manifesto reads itself: words brighten as the scroll head passes them.
 * A bean layer drifts behind at its own speed (`data-speed`, handled entirely
 * by ScrollSmoother — no tween needed).
 */
export function Idea() {
  return (
    <section className="h-section h-idea" data-scene="idea" id="chapter-idea">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="h-idea-beans"
        src={layer.bean}
        alt=""
        aria-hidden="true"
        data-speed="0.82"
        loading="lazy"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="h-idea-steam"
        src={layer.steam}
        alt=""
        aria-hidden="true"
        data-speed="1.28"
        loading="lazy"
      />

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
