"use client";

import { CinemaVideo } from "../motion/CinemaVideo";
import { idea } from "../content";

/** Each word gets its own span so the timeline can light them up one by one. */
function Words({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="w">{word}</span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

export function Idea() {
  return (
    <section
      className="c-section c-idea tone-espresso"
      data-cinema-scene="idea"
      id="chapter-idea"
    >
      <div className="c-idea-bed" aria-hidden="true">
        <CinemaVideo slug="macro" className="c-abs-fill" alt="" />
      </div>

      <div className="c-idea-inner">
        <div className="c-idea-kicker" data-reveal-group>
          <p className="c-index" data-reveal>
            <b>{idea.index}</b> {idea.label}
          </p>
          <p className="c-eyebrow" data-reveal>
            {idea.kicker}
          </p>
        </div>

        <p className="c-statement" data-statement>
          <Words text={idea.statement} />
        </p>

        <p className="c-idea-sign" data-reveal>
          {idea.signature}
        </p>
      </div>
    </section>
  );
}
