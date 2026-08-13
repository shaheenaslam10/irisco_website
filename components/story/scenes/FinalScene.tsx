import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { finalTiles, storyImage } from "../storyContent";

export function FinalScene() {
  return (
    <section className="final-table mobile-reveal">
      <div className="final-collage">
        {finalTiles.map((tile) => (
          <div className={`tile ${tile.className}`} key={tile.className}>
            <Image src={storyImage(tile.image, tile.size)} fill alt={tile.alt} sizes={tile.sizes} />
          </div>
        ))}
      </div>
      <div className="final-copy">
        <p className="chapter-index">07 / The IRISCO table</p>
        <p className="eyebrow">Coffee · Food · Craft · Culture</p>
        <h2>Find your place<br />at IRISCO.</h2>
        <div className="hero-actions">
          <Link href="/visit" className="button primary">Visit IRISCO <MapPin size={16} /></Link>
          <Link href="/shop" className="text-link">Explore the pantry <ArrowRight size={15} /></Link>
        </div>
      </div>
    </section>
  );
}
