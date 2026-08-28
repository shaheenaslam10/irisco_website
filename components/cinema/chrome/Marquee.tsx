"use client";

import { marquee } from "../content";

/**
 * An endless belt of the things this place is. It runs on its own and gets a
 * pull from the scroll, so the page never feels static even between chapters.
 */
export function Marquee({ tone = "espresso" }: { tone?: "espresso" | "teal" }) {
  const run = [...marquee, ...marquee];

  return (
    <div className={`c-marquee tone-${tone}`} aria-hidden="true">
      <div className="c-marquee-row" data-marquee>
        {[0, 1].map((copy) => (
          <span key={copy}>
            {run.map((word, i) => (
              <span key={`${word}-${i}`}>
                {word}
                <em>·</em>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
