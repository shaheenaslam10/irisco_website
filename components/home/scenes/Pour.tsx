"use client";

import { CinemaVideo } from "../motion/CinemaVideo";
import { pour } from "../content";

/**
 * 02 · The pour.
 *
 * The signature moment: the wheel is the playhead. Scroll down and the coffee
 * pours, scroll up and it pours backwards.
 *
 * It is one streaming all-intra file rather than forty image requests — a
 * fraction of the network cost, and seeking costs nothing because every frame
 * is a keyframe.
 */
export function Pour() {
  return (
    <section className="h-pour" data-scene="pour" id="chapter-pour">
      <div className="h-pour-pin" data-pour-pin>
        <header className="h-pour-head" data-reveal-group>
          <div className="h-index" data-reveal>
            <b>{pour.index}</b> {pour.label}
          </div>
          <h2 className="h-h2" data-split>
            {pour.heading}
          </h2>
          <p className="h-lede-sm" data-reveal>
            {pour.lede}
          </p>
        </header>

        <div className="h-pour-stage">
          <div className="h-film" data-pour-film>
            <CinemaVideo
              slug="pour"
              mode="scrub"
              className="h-fill"
              data-scrub-video
              alt={pour.heading}
            />
          </div>
        </div>

        <div className="h-pour-track" data-draw-scope>
          <svg className="h-pour-rail" viewBox="0 0 100 1" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,0.5 H100" data-draw />
          </svg>
          <div className="h-pour-beats">
            {pour.beats.map((beat, i) => (
              <div
                className="h-pour-beat"
                key={beat.n}
                data-pour-beat
                data-on={i === 0 ? "true" : "false"}
              >
                <span className="h-pour-num">{beat.n}</span>
                <span className="h-pour-word">{beat.word}</span>
                <span className="h-pour-note">{beat.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="h-pour-closing" data-reveal>
        {pour.closing}
      </p>
    </section>
  );
}
