"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Backdrop } from "../chrome/Backdrop";
import { CinemaVideo } from "../motion/CinemaVideo";
import { arrival } from "../content";

/**
 * 00 · Arrival.
 *
 * Pinned for the length of the film: the page holds here, the studio clip plays
 * from first frame to last as you scroll, and only then does the story move on.
 * Nothing autoplays.
 *
 * The only thing that changes while it plays is one line of copy, which keeps
 * pace with the footage. There is deliberately no caption explaining the
 * mechanic — the previous one sat under the section saying "this film is played
 * by your scroll", which is the sort of thing a visitor should discover by
 * doing it, not read about.
 */
export function Arrival() {
  return (
    <section className="h-hero" data-scene="arrival" id="chapter-arrival">
      <div className="h-hero-pin" data-hero-pin>
        <div className="h-hero-media" data-hero-zoom>
          <Backdrop />
          <CinemaVideo
            slug="product"
            mode="scrub"
            priority
            className="h-fill h-hero-ground"
            data-scrub-video
            alt=""
          />
        </div>
        <div className="h-hero-scrim" aria-hidden="true" />

        <div className="h-hero-inner">
          <p className="h-eyebrow" data-hero-fade>
            {arrival.eyebrow}
          </p>

          <h1 className="h-display" data-split>
            Part café.
            <br />
            Part living room.
            <br />
            <em>Entirely IRISCO.</em>
          </h1>

          <div className="h-hero-beats" data-hero-beats>
            {arrival.beats.map((beat, i) => (
              <p
                className="h-lede h-hero-beat"
                key={beat}
                data-hero-beat
                data-on={i === 0 ? "true" : "false"}
              >
                {beat}
              </p>
            ))}
          </div>

          <div className="h-hero-actions" data-hero-fade>
            <Link className="h-btn solid" href={arrival.actions[0].href}>
              <span>{arrival.actions[0].label}</span>
              <ArrowUpRight size={15} />
            </Link>
            <Link className="h-btn ghost" href={arrival.actions[1].href}>
              <span>{arrival.actions[1].label}</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        <div className="h-hero-foot">
          <ul className="h-hero-meta" data-hero-fade>
            {arrival.meta.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="h-cue" data-hero-fade>
            <span className="h-cue-line" aria-hidden="true" />
            {arrival.cue}
          </p>
        </div>
      </div>
    </section>
  );
}
