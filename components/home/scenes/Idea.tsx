"use client";

import { idea } from "../content";

/**
 * 01 · The idea.
 *
 * The manifesto reads itself — words brighten as the scroll head passes them.
 * Deliberately quiet: type on a dark ground, nothing else.
 */
export function Idea() {
  return (
    <section className="h-section h-idea" data-scene="idea" id="chapter-idea">
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
