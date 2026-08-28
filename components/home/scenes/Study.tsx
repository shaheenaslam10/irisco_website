"use client";

import { CinemaVideo } from "../motion/CinemaVideo";
import { study } from "../content";

/**
 * 06 · The study.
 *
 * Was running the macro clip full-bleed, which read as blurry — macro footage
 * is soft by nature, and at full width it fell apart. Now runs a landscape
 * crop of the 4K clip: 2160x1215 taken from a genuinely 4K frame, delivered at
 * 1536x864, so it holds up at full width instead of being upscaled mush.
 *
 * The wash is much lighter too — the blur was half the scrim's fault.
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
