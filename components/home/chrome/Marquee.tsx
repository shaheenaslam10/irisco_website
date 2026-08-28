"use client";

import { marquee } from "../content";

/**
 * An endless belt of the things this place is. Runs on its own and picks up
 * scroll velocity, so the page never feels static between chapters.
 */
export function Marquee({ tone = "espresso" }: { tone?: "espresso" | "teal" }) {
  const run = [...marquee, ...marquee];

  return (
    <div className={`h-marquee is-${tone}`} aria-hidden="true">
      <div className="h-marquee-row" data-marquee>
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
