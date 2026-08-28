"use client";

import { gallery, photo } from "../content";

/**
 * 04 · The gallery.
 *
 * Rebuilt as a horizontal shelf, deliberately matching The pantry: pinned,
 * scroll-driven, edge to edge. Two shelves on one page is a rhythm rather than
 * a repetition, and they are separated by The counter and The study.
 *
 * The videos are gone. At card size the AI clips read as a wall of baked-in
 * brand text rather than footage — the recording shows `irisco.` nine times
 * stacked inside one card. Photography carries this section instead, which is
 * also the sharpest material on the site.
 *
 * Differentiated from the pantry by ground and by crop: espresso rather than
 * teal, and landscape frames with the caption underneath rather than product
 * tiles with a note beside them.
 */
export function Gallery() {
  return (
    <section className="h-gallery" data-scene="gallery" id="chapter-gallery">
      <div className="h-gallery-pin" data-gallery-pin>
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

        <div className="h-gallery-viewport" data-gallery-viewport>
          <div className="h-gallery-track" data-gallery-track>
            {gallery.frames.map((frame, i) => (
              <figure className="h-gallery-card" key={frame.image}>
                <div className="h-gallery-frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo(frame.image)}
                    alt={frame.caption}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="h-gallery-no">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <figcaption>
                  <b>{frame.caption}</b>
                  <span>{frame.note}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="h-gallery-foot">
          <span>Scroll to move the wall</span>
          <span className="h-gallery-progress" aria-hidden="true">
            <i data-gallery-progress />
          </span>
          <span>{String(gallery.frames.length).padStart(2, "0")} frames from the room</span>
        </div>
      </div>
    </section>
  );
}
