"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Backdrop } from "../chrome/Backdrop";
import { CinemaVideo } from "../motion/CinemaVideo";
import { arrival } from "../content";

/**
 * 00 · Arrival.
 *
 * Two clips, each used in the shape it was made for:
 *
 *  • the studio product clip (ultra-wide 2.29:1, dark, warm) is the full-bleed
 *    cinematic ground — the "main" video, because it is the right shape for a
 *    hero band and dark enough to keep the headline legible;
 *  • the square product clip (960x960, bright, light ground) is a *lit panel*
 *    beside the copy. At full bleed its near-white ground would blow out the
 *    page, so it is framed instead, with an amber bloom so it belongs to the
 *    room rather than sitting on top of it.
 *
 * The CSS bloom stays underneath as the base layer, so if the footage is slow
 * the hero still has colour and depth.
 */
export function Arrival() {
  return (
    <section className="h-hero" data-scene="arrival" id="chapter-arrival">
      <div className="h-hero-media" data-hero-zoom>
        <Backdrop />
        <CinemaVideo slug="product" priority className="h-fill h-hero-ground" />
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
