"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CinemaVideo } from "../motion/CinemaVideo";
import { counter, photo } from "../content";

/**
 * 05 · The counter.
 *
 * The ring draws, then opens as a lens onto the bakery case. Beside it, the
 * square product clip sits as a lit panel — "video.mp4" is a bright, 1:1 clip of
 * the to-go cup, and a square frame is the shape it was made for. Shown at 480px
 * from a 720px source, so it downsamples rather than upscaling.
 */
export function Counter() {
  return (
    <section className="h-counter" data-scene="counter" id="chapter-counter">
      <div className="h-counter-inner" data-draw-scope>
        <header className="h-counter-head" data-reveal-group>
          <div className="h-index" data-reveal>
            <b>{counter.index}</b> {counter.label}
          </div>
          <h2 className="h-h2" data-split>
            {counter.heading}
          </h2>
          <p className="h-lede-sm" data-reveal>
            {counter.lede}
          </p>
        </header>

        <div className="h-counter-split">
          <div className="h-counter-stage">
            <svg className="h-counter-ring" viewBox="0 0 100 100" aria-hidden="true">
              <circle className="is-track" cx="50" cy="50" r="49.4" />
              <circle className="is-sweep" cx="50" cy="50" r="49.4" data-draw />
            </svg>
            <figure className="h-counter-figure" data-counter-figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo("counter-case")}
                alt="The IRISCO bakery counter case"
                data-counter-img
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>

          <figure className="h-counter-panel" data-reveal="scale">
            <span className="h-counter-panel-glow" aria-hidden="true" />
            <div className="h-counter-frame">
              <CinemaVideo slug="feature" className="h-fill" alt="An IRISCO to-go cup" />
            </div>
            <figcaption>IRISCO · to-go cup</figcaption>
          </figure>
        </div>

        <dl className="h-counter-stats" data-reveal-group>
          {counter.stats.map((stat) => (
            <div className="h-counter-stat" key={stat.label} data-reveal="flip">
              <dt>{stat.value}</dt>
              <dd>{stat.label}</dd>
            </div>
          ))}
        </dl>

        <div data-reveal>
          <Link className="h-btn ghost" href={counter.action.href}>
            <span>{counter.action.label}</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
