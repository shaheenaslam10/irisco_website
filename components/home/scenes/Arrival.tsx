"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CinemaVideo } from "../motion/CinemaVideo";
import { arrival } from "../content";

/**
 * 00 · Arrival.
 *
 * Full-bleed footage, a headline that splits out of its mask, and the actions.
 * Nothing else competing for attention — the previous build floated half a
 * dozen layers over this and it read as noise.
 */
export function Arrival() {
  return (
    <section className="h-hero" data-scene="arrival" id="chapter-arrival">
      <div className="h-hero-media" data-hero-zoom>
        <CinemaVideo slug="pour" priority className="h-fill" />
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
