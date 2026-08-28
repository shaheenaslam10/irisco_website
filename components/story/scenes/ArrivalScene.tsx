import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { storyImage } from "../storyContent";

export function ArrivalScene() {
  return (
    <section className="opening-scene" data-story-scene="opening">
      <div className="opening-stage" aria-label="Inside IRISCO">
        <div className="opening-lens" aria-hidden="true">
          <Image
            src={storyImage("room-hero")}
            fill
            priority
            sizes="100vw"
            alt=""
          />
        </div>
        <div className="opening-grade" aria-hidden="true" />
        <div className="opening-scrim" aria-hidden="true" />

        {/* The IRISCO ring — the room's chandelier, abstracted into a signature. */}
        <svg className="opening-ring" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="46" pathLength={1} />
        </svg>

        <div className="opening-copy">
          <div className="opening-text-state opening-text-arrival">
            <p className="eyebrow light bare opening-kicker">Coffee · Bakery · Pantry · Gallery</p>
            <h1 className="opening-title">
              <span className="line"><span className="line-inner">Everything finds</span></span>
              <span className="line"><span className="line-inner">its place.</span></span>
            </h1>
            <p className="opening-lede">
              A contemporary Pakistani café, bakery, curated pantry and gallery.
              One warm room built around a shared center.
            </p>
            <div className="hero-actions">
              <Link href="/visit" className="button ivory">
                Plan your visit <MapPin size={16} />
              </Link>
              <Link href="/menu" className="text-link light">
                See the menu <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <h2 className="opening-text-state opening-text-ritual" aria-hidden="true">
            <span className="line"><span className="line-inner">Gather around</span></span>
            <span className="line"><span className="line-inner">the light.</span></span>
          </h2>

          <h2 className="opening-text-state opening-text-resolution" aria-hidden="true">
            <span className="line"><span className="line-inner">Welcome</span></span>
            <span className="line"><span className="line-inner">to IRISCO.</span></span>
          </h2>
        </div>
      </div>
    </section>
  );
}
