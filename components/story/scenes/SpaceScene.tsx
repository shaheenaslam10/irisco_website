import Image from "next/image";
import { spacePrinciples } from "@/lib/content/site";
import { storyImage } from "../storyContent";

/**
 * 06 · The space — the "why", in daylight. A layered parallax cluster (a
 * portrait at the counter set over the wider room) drifts against the reading
 * column. The principles are verbatim from the site content — no invented
 * claims, and the chess game lives in the copy, not in a decorative board.
 */
export function SpaceScene() {
  return (
    <section className="story-scene space-scene" data-story-scene="space">
      <div className="space-copy">
        <h2>
          Made for
          <br />
          staying.
        </h2>
        <p>What the room is for, once the coffee is poured.</p>
        <ul className="space-principles">
          {spacePrinciples.map((principle) => (
            <li key={principle.title}>
              <h3>{principle.title}</h3>
              <p>{principle.copy}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-visual">
        <figure className="space-plate-a" data-space-plate="a">
          <Image
            src={storyImage("interior-gallery-1")}
            fill
            sizes="(max-width: 900px) 90vw, 45vw"
            alt="Inside the IRISCO room"
          />
        </figure>
        <figure className="space-plate-b" data-space-plate="b">
          <Image
            src={storyImage("latte-portrait")}
            fill
            sizes="(max-width: 900px) 55vw, 26vw"
            alt="A barista at the IRISCO counter"
          />
        </figure>
      </div>
    </section>
  );
}
