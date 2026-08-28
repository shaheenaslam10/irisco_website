"use client";

import { quote } from "../content";

/**
 * A breath before the door.
 *
 * One line, centred, with rules above and below. Everything around it moves;
 * this is the only place on the page that asks you to stop.
 */
export function Quote() {
  return (
    <section className="h-quote-band" data-scene="quote">
      <blockquote className="h-quote-line" data-reveal>
        {quote.text}
      </blockquote>
    </section>
  );
}
