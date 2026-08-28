"use client";

import { CinemaVideo } from "../motion/CinemaVideo";
import { study } from "../content";

/**
 * 06 · The study.
 *
 * The high-speed macro clip, played by the scroll. Pinned so the wheel owns
 * the frame: it advances as you go down and rewinds as you come back up, with
 * the notes on the left lighting up beat by beat alongside it.
 *
 * Composed as a split — copy beside the footage — so it reads differently from
 * The pour, which centres the film under the heading.
 */
export function Study() {
  return (
    <section className="h-study" data-scene="study" id="chapter-study">
      <div className="h-study-pin" data-study-pin>
        <div className="h-study-grid">
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
          </div>

          <div className="h-study-stage">
            <div className="h-film" data-study-film>
              <CinemaVideo
                slug={study.film}
                mode="scrub"
                className="h-fill"
                data-scrub-video
                alt={study.heading}
              />
            </div>
            <span className="h-study-progress" aria-hidden="true">
              <i data-study-progress />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
