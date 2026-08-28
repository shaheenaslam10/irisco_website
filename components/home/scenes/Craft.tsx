"use client";

import { craft, layer, photo } from "../content";

/**
 * 03 · The craft.
 *
 * Objects, not a background. Each step is a photograph drifting at its own
 * `data-speed` depth, and a transparent bean layer arcs across the whole
 * chapter on a real MotionPath curve — so the composition reorganises itself as
 * you travel rather than simply sliding past.
 */
export function Craft() {
  return (
    <section className="h-section h-craft" data-scene="craft" id="chapter-craft">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="h-craft-bean"
        src={layer.bean}
        alt=""
        aria-hidden="true"
        data-craft-path
        loading="lazy"
      />

      <header className="h-craft-head" data-reveal-group>
        <div className="h-index" data-reveal>
          <b>{craft.index}</b> {craft.label}
        </div>
        <h2 className="h-h2" data-split>
          {craft.heading}
        </h2>
        <p className="h-lede-sm" data-reveal>
          {craft.lede}
        </p>
      </header>

      <ol className="h-craft-list">
        {craft.steps.map((step, i) => (
          <li className="h-craft-step" key={step.n} data-craft-step>
            <div className="h-craft-figure" data-reveal="scale">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo(step.image)}
                alt={step.title}
                data-speed={0.9 + (i % 3) * 0.12}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="h-craft-copy" data-reveal-group>
              <span className="h-craft-num" data-reveal>
                {step.n}
              </span>
              <h3 data-reveal>{step.title}</h3>
              <p data-reveal>{step.copy}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
