"use client";

import { photo, study } from "../content";

/**
 * 06 · The study.
 *
 * Now built on photography, and that is a deliberate reversal.
 *
 * Measured sharpness (variance of Laplacian) across the assets:
 *   macro clip 106 · reel-wide 139 · product 161   — every clip
 *   interior-gallery-1 608 · room-hero 617         — every photograph
 * The footage is 4-6x softer than the photography. At full bleed it is also
 * upscaled, so it reads as blur no matter how the scrim is tuned. Full-bleed
 * backgrounds on this page are therefore photographs; video is used only where
 * it is shown at or below its native size.
 *
 * The chapter is still scroll-driven: the wheel steps the three notes and
 * drives the progress rule.
 */
export function Study() {
  return (
    <section className="h-study" data-scene="study" id="chapter-study">
      <div className="h-study-bg" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo("interior-gallery-1")} alt="" loading="lazy" decoding="async" />
      </div>
      <div className="h-study-wash" aria-hidden="true" />

      <div className="h-study-pin" data-study-pin>
        <div className="h-study-copy" data-reveal-group>
          <div className="h-index" data-reveal>
            <b>{study.index}</b> {study.label}
          </div>
          <h2 className="h-h2" data-split>
            {study.heading}
          </h2>
          <p className="h-lede-sm" data-reveal>
            {study.lede}
          </p>

          <ol className="h-study-notes">
            {study.notes.map((note, i) => (
              <li key={note} data-study-note data-on={i === 0 ? "true" : "false"}>
                <b>{String(i + 1).padStart(2, "0")}</b>
                <span>{note}</span>
              </li>
            ))}
          </ol>

          <span className="h-study-progress" aria-hidden="true">
            <i data-study-progress />
          </span>
        </div>
      </div>
    </section>
  );
}
