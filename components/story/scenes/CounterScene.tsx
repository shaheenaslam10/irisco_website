import Image from "next/image";
import { storyImage } from "../storyContent";

/**
 * 04 · The counter — the bakery case. One image that opens from a small window
 * to full bleed as the section is scrubbed (desktop), the copy arriving as it
 * fills. On compact / reduced motion the image is already full and the copy is
 * simply present.
 */
export function CounterScene() {
  return (
    <section className="story-scene counter-scene" data-story-scene="counter">
      <div className="counter-media" aria-hidden="true">
        <Image src={storyImage("counter-case")} fill sizes="100vw" alt="" />
      </div>
      <div className="counter-copy mobile-reveal">
        <h2>
          The counter
          <br />
          keeps changing.
        </h2>
        <p>
          Cakes and slices, croissants, brownies, warm savoury bakes. Ask the
          counter what came out of the oven today.
        </p>
      </div>
    </section>
  );
}
