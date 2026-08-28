"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Backdrop } from "../chrome/Backdrop";
import { CinemaVideo } from "../motion/CinemaVideo";
import { arrival } from "../content";

/**
 * 00 · Arrival.
 *
 * No side panel, and no autoplay. The studio product clip is the full-bleed
 * ground and the scroll is its playhead: it sits on frame one until you move,
 * then plays through to the end as the hero leaves. Copy is centred.
 */
export function Arrival() {
  return (
    <section className="h-hero" data-scene="arrival" id="chapter-arrival">
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

        <p className="h-lede" data-hero-fade>
          {arrival.lede}
        </p>

        <p className="h-hero-note" data-hero-fade>
          {arrival.note}
        </p>

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
    </section>
  );
}
