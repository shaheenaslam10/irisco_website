"use client";

import { useRef } from "react";
import { pour, sequence } from "../content";

/**
 * 02 · The pour.
 *
 * The clip is a 40-frame image sequence, and the wheel is the playhead: scroll
 * down and it pours, scroll up and it pours backwards. No autoplay, no codec,
 * no loop — the sequence only ever exists in the direction you move.
 */
export function Pour() {
  const imgRef = useRef<HTMLImageElement>(null);

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
          <div className="h-seq">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              className="h-seq-img"
              data-seq="pour"
              src={sequence.pour.poster}
              alt="Espresso pouring into an IRISCO cup, played by your scroll"
              decoding="async"
            />
            <span className="h-seq-frame" data-seq-progress aria-hidden="true" />
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
