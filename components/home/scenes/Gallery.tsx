"use client";

import { CinemaVideo } from "../motion/CinemaVideo";
import { gallery, photo } from "../content";

/**
 * 04 · The gallery.
 *
 * Four photographs at their own depths, plus the portrait 3D-parallax clip as a
 * moving frame in the wall — shown at its native 9:16, because dropping a
 * portrait source into a landscape slot throws away most of the frame. It is
 * scrubbed by the scroll like the rest of the footage, not looping.
 */
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
        <figure className="h-gallery-cell is-reel" key="reel">
          <div className="h-gallery-frame">
            <CinemaVideo slug="reel" mode="scrub" className="h-fill" data-scrub-video alt={gallery.reelAlt} />
          </div>
          <figcaption>
            <b>{gallery.reelCaption}</b>
            <span>{gallery.reelNote}</span>
          </figcaption>
        </figure>

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
