"use client";

import { gallery, photo, still } from "../content";

/** A staggered wall. Every frame drifts at its own depth as the page passes. */
export function Gallery() {
  return (
    <section
      className="c-section c-gallery tone-teal"
      data-cinema-scene="gallery"
      id="chapter-gallery"
    >
      <div className="c-gallery-head" data-reveal-group>
        <p className="c-index" data-reveal>
          <b>{gallery.index}</b> {gallery.label}
        </p>
        <h2 className="c-h2" data-reveal>
          {gallery.heading}
        </h2>
        <p className="c-lede" data-reveal>
          {gallery.lede}
        </p>
      </div>

      <div className="c-gallery-grid">
        {gallery.frames.map((frame) => (
          <figure className={`c-gallery-cell ${frame.span}`} key={frame.image}>
            <div className="c-gallery-frame" data-parallax-frame>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  frame.image === "__still__pour"
                    ? still.pour
                    : photo(frame.image)
                }
                alt={frame.caption}
                data-parallax={frame.depth}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="c-gallery-cap">
              <b>{frame.caption}</b>
              <span>{frame.note}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
