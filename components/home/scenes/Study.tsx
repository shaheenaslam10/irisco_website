"use client";

import { CinemaVideo } from "../motion/CinemaVideo";
import { study } from "../content";

/**
 * 06 · The study.
 *
 * The high-speed macro clip is the *room*, not a window onto it: full-bleed,
 * scrubbed by the scroll, and graded into the espresso ground with a scrim
 * sampled from the page's own palette so the footage melts into the section
 * instead of sitting on top of it as a boxed rectangle.
 */
export function Study() {
  return (
    <section className="h-study" data-scene="study" id="chapter-study">
      <div className="h-study-bg" aria-hidden="true">
        <CinemaVideo
          slug={study.film}
          mode="scrub"
          className="h-fill"
          data-scrub-video
          alt=""
        />
      </div>
      <div className="h-study-wash" aria-hidden="true" />

      <div className="h-study-pin" data-study-pin>
        <div className="h-study-copy" data-reveal-group>
          <div className="h-index" data-reveal>
            <b>{study.index}</b> {study.label}
          </div>
          <h2 className="h-h2" data-split>
            {study.heading}
          </h2>
          <p className="h-lede-sm" data-reveal>
            {study.lede}
          </p>

          <ol className="h-study-notes">
            {study.notes.map((note, i) => (
              <li key={note} data-study-note data-on={i === 0 ? "true" : "false"}>
                <b>{String(i + 1).padStart(2, "0")}</b>
                <span>{note}</span>
              </li>
            ))}
          </ol>

          <span className="h-study-progress" aria-hidden="true">
            <i data-study-progress />
          </span>
        </div>
      </div>
    </section>
  );
}
