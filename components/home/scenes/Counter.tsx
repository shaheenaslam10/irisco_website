"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { counter, photo } from "../content";

/**
 * 05 · The counter.
 *
 * The IRISCO ring: an amber circle draws itself, then opens as a circular lens
 * onto the bakery case. It echoes the chandelier, a cup rim, and people
 * gathering round a table.
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
