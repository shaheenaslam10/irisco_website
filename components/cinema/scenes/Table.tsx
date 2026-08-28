"use client";

import { still, table, photo } from "../content";

/**
 * Sticky copy on the left, slow-moving images on the right — the chapter where
 * the page finally stops performing and just talks about time.
 */
export function Table() {
  return (
    <section
      className="c-section c-table tone-espresso"
      data-cinema-scene="table"
      id="chapter-table"
    >
      <div className="c-table-grid">
        <div className="c-table-sticky" data-reveal-group>
          <p className="c-index" data-reveal>
            <b>{table.index}</b> {table.label}
          </p>
          <h2 className="c-h2" data-reveal>
            {table.heading}
          </h2>
          <p className="c-lede" data-reveal>
            {table.lede}
          </p>

          <div className="c-table-list">
            {table.principles.map((item) => (
              <div className="c-table-item" key={item.n} data-reveal>
                <i>{item.n}</i>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="c-table-media">
          <figure className="c-table-figure a" data-reveal="scale">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo("community-chess")}
              alt="A chess game under way at IRISCO"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <figure className="c-table-figure b" data-reveal="scale">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={still.table}
              alt="A chessboard, a cortado and a slice of cake on a dark teal table"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </div>

      <blockquote className="c-quote">
        <span data-reveal>{table.pullQuote}</span>
      </blockquote>
    </section>
  );
}
