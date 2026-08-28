"use client";

import { layer, photo, room } from "../content";

/**
 * 06 · The room.
 *
 * Layered 2.5D: the real transparent cup and steam artwork float at their own
 * depths over a photographic wall, each frame drifting at a different speed.
 * This is the chapter where the asset kit earns its keep.
 */
export function Room() {
  return (
    <section className="h-section h-room" data-scene="room" id="chapter-room">
      <div className="h-room-layers" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="h-room-steam" src={layer.steam} alt="" data-speed="1.35" loading="lazy" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="h-room-cup" src={layer.cupIvoryOpen} alt="" data-speed="0.78" loading="lazy" />
      </div>

      <header className="h-room-head" data-reveal-group>
        <div className="h-index" data-reveal>
          <b>{room.index}</b> {room.label}
        </div>
        <h2 className="h-room-lines" data-split>
          {room.lines.join(" ")}
        </h2>
        <p className="h-lede-sm" data-reveal>
          {room.note}
        </p>
      </header>

      <div className="h-room-grid">
        {room.frames.map((frame) => (
          <figure
            className={`h-room-cell is-${frame.span}`}
            key={frame.image}
            data-reveal="flip"
          >
            <div className="h-room-frame">
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
