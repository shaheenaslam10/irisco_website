"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Backdrop } from "../chrome/Backdrop";
import { CinemaVideo } from "../motion/CinemaVideo";
import { arrival } from "../content";

/**
 * 00 · Arrival.
 *
 * Copy on the left, and the square product clip on the right as a *lit panel*
 * rather than a backdrop — it is a bright, light-ground clip, so at full bleed
 * it would blow out the dark page. Framed, it becomes the thing your eye lands
 * on, with an amber bloom behind it so it sits in the room instead of on top
 * of it.
 */
export function Arrival() {
  return (
    <section className="h-hero" data-scene="arrival" id="chapter-arrival">
      <div className="h-hero-media" data-hero-zoom>
        <Backdrop />
      </div>
      <div className="h-hero-scrim" aria-hidden="true" />

      <div className="h-hero-grid">
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

        <div className="h-hero-panel" data-hero-panel>
          <span className="h-hero-panel-glow" aria-hidden="true" />
          <div className="h-hero-frame">
            <CinemaVideo slug="feature" priority className="h-fill" />
          </div>
          <span className="h-hero-panel-caption" aria-hidden="true">
            IRISCO · to-go cup
          </span>
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
