"use client";

import { CinemaVideo } from "../motion/CinemaVideo";
import { room } from "../content";

/**
 * 03 · The room.
 *
 * A full-bleed plate that is *played* by the scroll — the footage advances as
 * you travel down the band and rewinds if you go back up — while the plate
 * itself drifts for depth and the statement rises over it.
 */
export function Room() {
  return (
    <section className="h-room" data-scene="room" id="chapter-room">
      <div className="h-room-band">
        <div className="h-room-media" data-room-media aria-hidden="true">
          <CinemaVideo slug="bakery" mode="scrub" className="h-fill" data-scrub-video alt="" />
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
