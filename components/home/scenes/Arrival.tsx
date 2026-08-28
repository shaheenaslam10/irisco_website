"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CupStage } from "../three/CupStage";
import { arrival } from "../content";

/**
 * 00 · Arrival.
 *
 * The cup is real geometry, turning in three dimensions, assembled in front of
 * you: plinth, cup, crema, steam, then beans floating in. Scroll turns it.
 * No video plane, no static product shot.
 */
export function Arrival() {
  return (
    <section className="h-hero" data-scene="arrival" id="chapter-arrival">
      <div className="h-hero-glow" aria-hidden="true" />

      <div className="h-hero-copy">
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
      </div>

      <CupStage className="h-hero-cup" />

      <div className="h-hero-foot">
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
