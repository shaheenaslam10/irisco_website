"use client";

import { CinemaVideo } from "../motion/CinemaVideo";
import { useMediaQuery } from "../motion/useMediaQuery";
import { ritual } from "../content";

/**
 * The ritual is the film's centre: a pinned stage where the coffee clip is
 * scrubbed frame-by-frame by the scroll wheel, with each of the four steps
 * taking the caption over as its beat arrives.
 */
export function Ritual() {
  const isDesktop = useMediaQuery("(min-width: 1024px)", true);

  return (
    <section
      className="c-ritual tone-espresso"
      data-cinema-scene="ritual"
      id="chapter-ritual"
    >
      <div className="c-ritual-head" data-reveal-group>
        <p className="c-index" data-reveal>
          <b>{ritual.index}</b> {ritual.label}
        </p>
        <h2 className="c-h2" data-reveal>
          {ritual.heading}
        </h2>
        <p className="c-lede" data-reveal>
          {ritual.lede}
        </p>
      </div>

      <div className="c-ritual-pin" data-ritual-pin>
        <div className="c-ritual-stage">
          <div className="filmband" data-ritual-film>
            <CinemaVideo
              slug="pour"
              mode={isDesktop ? "scrub" : "ambient"}
              className="c-abs-fill"
              data-scrub-video
              alt={ritual.heading}
            />
          </div>
        </div>

        <div className="c-ritual-track">
          <div className="c-ritual-bar" aria-hidden="true">
            <i data-ritual-bar />
          </div>
          <div className="c-ritual-ticks" data-ritual-ticks>
            {ritual.steps.map((step) => (
              <span key={step.n} data-on={step.n === "01" ? "true" : "false"}>
                {step.n} · {step.word}
              </span>
            ))}
          </div>
        </div>

        <div className="c-ritual-steps" data-ritual-steps>
          {ritual.steps.map((step) => (
            <div
              className="c-ritual-step"
              key={step.n}
              data-ritual-step
              data-reveal
              data-reveal-if="compact"
            >
              <p className="c-ritual-word">{step.word}</p>
              <p className="c-ritual-note">{step.note}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="c-ritual-closing" data-reveal>
        {ritual.closing}
      </p>
    </section>
  );
}
