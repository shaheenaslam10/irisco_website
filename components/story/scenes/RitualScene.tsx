import Image from "next/image";
import { ritualFrames, storyImage } from "../storyContent";

/**
 * 03 · The coffee ritual — the film's peak. Four frames from the counter
 * (tamp → extraction → milk → cup), each with its own word. On desktop the
 * scene pins and scrubs, cross-fading one frame into the next across the
 * longest scroll span on the page. On compact / reduced motion the frames
 * stack into a vertical gallery, each already showing its word.
 */
export function RitualScene() {
  return (
    <section className="story-scene ritual-scene" data-story-scene="ritual" aria-label="The coffee ritual">
      <div className="ritual-stage">
        {ritualFrames.map((frame) => (
          <figure className="ritual-frame mobile-reveal" data-pos={frame.image} key={frame.image}>
            <Image src={storyImage(frame.image)} fill sizes="100vw" alt={`${frame.word} — ${frame.note}`} />
            <figcaption className="ritual-cap">
              <h2 className="ritual-word">{frame.word}.</h2>
              <p className="ritual-note">{frame.note}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="ritual-eyebrow">The coffee ritual</p>
    </section>
  );
}
