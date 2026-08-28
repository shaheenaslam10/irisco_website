"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CinemaVideo } from "../motion/CinemaVideo";
import { hero } from "../content";

export function Hero() {
  return (
    <section className="c-hero" data-cinema-scene="hero" id="chapter-hero">
      <div className="c-hero-media">
        <CinemaVideo slug="pour" priority className="c-hero-fill" data-hero-zoom />
      </div>
      <div className="c-hero-scrim" aria-hidden="true" />

      <div className="c-hero-inner">
        <p className="c-eyebrow" data-hero-fade>
          {hero.eyebrow}
        </p>

        <h1 className="c-hero-title">
          {hero.lines.map((line, i) => (
            <span className="c-line" key={line} data-hero-line>
              <span>{i === hero.lines.length - 1 ? <em>{line}</em> : line}</span>
            </span>
          ))}
        </h1>

        <p className="c-lede" data-hero-fade>
          {hero.lede}
        </p>

        <div className="c-hero-foot">
          <div className="c-hero-actions" data-hero-fade>
            <Link className="c-btn solid" href={hero.actions[0].href}>
              <span>{hero.actions[0].label}</span>
              <ArrowUpRight size={15} />
            </Link>
            <Link className="c-btn ghost" href={hero.actions[1].href}>
              <span>{hero.actions[1].label}</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <ul className="c-hero-meta" data-hero-fade>
            {hero.meta.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="c-scrollcue" data-hero-fade>
          <span className="c-scrollcue-line" aria-hidden="true" />
          <span>{hero.scrollCue}</span>
        </div>
      </div>
    </section>
  );
}
