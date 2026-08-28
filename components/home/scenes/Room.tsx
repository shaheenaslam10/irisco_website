"use client";

import { CinemaVideo } from "../motion/CinemaVideo";
import { room } from "../content";

/**
 * 03 · The room.
 *
 * A full-bleed plate that drifts against the scroll, with the statement rising
 * over it. Footage doing the work, not decoration layered on top of footage.
 */
export function Room() {
  return (
    <section className="h-room" data-scene="room" id="chapter-room">
      <div className="h-room-band">
        <div className="h-room-media" data-room-media aria-hidden="true">
          <CinemaVideo slug="bakery" className="h-fill" alt="" />
        </div>

        <div className="h-room-copy" data-reveal-group>
          <div className="h-index" data-reveal>
            <b>{room.index}</b> {room.label}
          </div>

          <h2 className="h-room-lines" data-split>
            {room.lines.join(" ")}
          </h2>

          <p className="h-lede-sm" data-reveal>
            {room.note}
          </p>
        </div>
      </div>
    </section>
  );
}
