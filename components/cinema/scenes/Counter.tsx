"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { counter, photo } from "../content";

/**
 * The signature IRISCO ring: an amber circle draws itself, then opens as a
 * lens onto the bakery case. It echoes the chandelier, a cup rim, and the
 * shape of people gathering round a table.
 */
export function Counter() {
  return (
    <section
      className="c-counter tone-teal"
      data-cinema-scene="counter"
      id="chapter-counter"
    >
      <div className="c-counter-pin" data-counter-pin>
        <div className="c-counter-head" data-reveal-group>
          <p className="c-index" data-reveal>
            <b>{counter.index}</b> {counter.label}
          </p>
          <h2 className="c-h2" data-reveal>
            {counter.heading}
          </h2>
          <p className="c-lede" data-reveal>
            {counter.lede}
          </p>
        </div>

        <div className="c-counter-stage" data-counter-stage>
          <svg className="c-counter-ring" viewBox="0 0 100 100" aria-hidden="true">
            <circle className="track" cx="50" cy="50" r="49.5" opacity="0.18" />
            <circle className="sweep" cx="50" cy="50" r="49.5" data-counter-ring />
          </svg>
          <figure className="c-counter-figure" data-counter-figure>
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

        <div className="c-counter-stats" data-reveal-group>
          {counter.stats.map((stat) => (
            <div className="c-counter-stat" key={stat.label} data-reveal>
              <b>{stat.value}</b>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        <div data-reveal>
          <Link className="c-btn ghost" href={counter.action.href}>
            <span>{counter.action.label}</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
