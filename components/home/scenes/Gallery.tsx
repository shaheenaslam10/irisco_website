"use client";

import { gallery, photo } from "../content";

/** 04 · The gallery. A quiet wall; each frame drifts at its own depth. */
export function Gallery() {
  return (
    <section className="h-section h-gallery" data-scene="gallery" id="chapter-gallery">
      <header className="h-gallery-head" data-reveal-group>
        <div className="h-index" data-reveal>
          <b>{gallery.index}</b> {gallery.label}
        </div>
        <h2 className="h-h2" data-split>
          {gallery.heading}
        </h2>
        <p className="h-lede-sm" data-reveal>
          {gallery.lede}
        </p>
      </header>

      <div className="h-gallery-grid">
        {gallery.frames.map((frame) => (
          <figure className={`h-gallery-cell is-${frame.span}`} key={frame.image}>
            <div className="h-gallery-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo(frame.image)}
                alt={frame.caption}
                data-speed={frame.depth}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption>
              <b>{frame.caption}</b>
              <span>{frame.note}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
