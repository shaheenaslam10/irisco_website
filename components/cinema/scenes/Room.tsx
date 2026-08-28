"use client";

import { CinemaVideo } from "../motion/CinemaVideo";
import { room } from "../content";

/**
 * A full-bleed cinematic band. The clip drifts against the scroll while the
 * statement rises over it — the closest thing on the page to a film frame.
 */
export function Room() {
  return (
    <section className="c-room" data-cinema-scene="room" id="chapter-room">
      <div className="c-room-band">
        <div className="c-room-media" data-room-media aria-hidden="true">
          <CinemaVideo slug="bakery" className="c-abs-fill" alt="" />
        </div>

        <div className="c-room-copy" data-reveal-group>
          <p className="c-index" data-reveal>
            <b>{room.index}</b> {room.label}
          </p>

          <h2 className="c-room-lines">
            {room.lines.map((line) => (
              <span className="c-line" key={line} data-reveal="mask">
                <span>{line}</span>
              </span>
            ))}
          </h2>

          <p className="c-lede c-room-note" data-reveal>
            {room.note}
          </p>
        </div>
      </div>
    </section>
  );
}
