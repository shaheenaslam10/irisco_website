import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pantryShelf, storyImage } from "../storyContent";

/**
 * 05 · The pantry — a horizontal shelf that travels left as the section pins
 * (desktop). Lateral motion reads as range. It opens on the branded take-home
 * boxes, runs the shelf, and closes on the shop CTA. On compact the track is a
 * normal vertical stack (see story.css) and the pin never runs.
 */
export function PantryScene() {
  return (
    <section className="story-scene pantry-scene" data-story-scene="pantry">
      <div className="pantry-track">
        <div className="pantry-panel pantry-lead mobile-reveal">
          <div className="pantry-lead-media" aria-hidden="true">
            <Image src={storyImage("boxes")} fill sizes="(max-width: 900px) 90vw, 46vw" alt="" />
          </div>
          <div className="pantry-lead-copy">
            <p className="eyebrow light">Take it home</p>
            <h2>
              A little of the
              <br />
              room to keep.
            </h2>
            <p>
              Honey, chilli oil, flours and grains, fragrance and quiet objects.
              Chosen for the shelf, boxed for the door.
            </p>
          </div>
        </div>

        {pantryShelf.map((item) => (
          <article className="pantry-panel pantry-item mobile-reveal" key={item.name}>
            <div className="pantry-item-image">
              <Image
                src={storyImage(item.image, 900)}
                fill
                sizes="(max-width: 900px) 90vw, 40vw"
                alt={item.name}
              />
            </div>
            <div className="pantry-item-meta">
              <h3>{item.name}</h3>
              <p>{item.note}</p>
            </div>
          </article>
        ))}

        <div className="pantry-panel pantry-outro mobile-reveal">
          <h2>
            The whole shelf,
            <br />
            up close.
          </h2>
          <Link href="/shop" className="button ivory">
            Explore the pantry <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
