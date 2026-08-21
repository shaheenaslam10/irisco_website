import Image from "next/image";
import { bakeryNotes, storyImage } from "../storyContent";

export function BakeryScene() {
  return (
    <section className="story-scene bakery-scene" data-story-scene="bakery">
      <div className="bakery-photo">
        <Image src={storyImage("main-counter")} fill sizes="100vw" alt="IRISCO bakery counter with cakes, pastries and the sculptural wall logo" />
      </div>
      <div className="bakery-caption">
        <p className="chapter-index light">02 / From counter to display</p>
        <h2>Made. Layered.<br />Placed to share.</h2>
      </div>
      <div className="bakery-notes" aria-hidden="true">
        {bakeryNotes.map((note) => <span className="bakery-note" key={note}>{note}</span>)}
      </div>
    </section>
  );
}
