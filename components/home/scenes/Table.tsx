"use client";

import { layer, photo, table } from "../content";

/**
 * 07 · The table.
 *
 * Sticky copy beside slow-moving imagery, with a transparent liquid layer
 * drifting behind the whole chapter. Closes on a pull-quote.
 */
export function Table() {
  return (
    <section className="h-section h-table" data-scene="table" id="chapter-table">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="h-table-liquid"
        src={layer.liquid}
        alt=""
        aria-hidden="true"
        data-speed="1.3"
        loading="lazy"
      />

      <div className="h-table-grid">
        <div className="h-table-sticky" data-reveal-group>
          <div className="h-index" data-reveal>
            <b>{table.index}</b> {table.label}
          </div>
          <h2 className="h-h2" data-split>
            {table.heading}
          </h2>
          <p className="h-lede-sm" data-reveal>
            {table.lede}
          </p>

          <div className="h-table-list">
            {table.principles.map((item) => (
              <div className="h-table-item" key={item.n} data-reveal>
                <i>{item.n}</i>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-table-media">
          <figure className="h-table-figure is-tall" data-reveal="scale">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo("community-chess")}
              alt="A chess game under way at IRISCO"
              data-speed="0.92"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <figure className="h-table-figure is-wide" data-reveal="scale">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo("cortado-top")}
              alt="A cortado, seen from above"
              data-speed="1.08"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </div>

      <blockquote className="h-quote" data-reveal>
        <span>{table.quote}</span>
      </blockquote>
    </section>
  );
}
