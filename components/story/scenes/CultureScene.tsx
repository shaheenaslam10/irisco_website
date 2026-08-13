import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { chandelierBulbs, storyImage } from "../storyContent";

export function CultureScene() {
  return (
    <>
      <section className="culture-intro mobile-reveal">
        <p className="eyebrow">Culture illuminated</p>
        <h2>A space shaped by memory,<br />ideas, and modern Pakistan.</h2>
      </section>

      <section className="story-scene culture-scene" data-story-scene="culture">
        <div className="culture-photo">
          <Image src={storyImage("interior-gallery")} fill sizes="100vw" alt="IRISCO gallery wall with circular chandelier and Quaid-e-Azam artwork" />
        </div>
        <svg className="chandelier-overlay" viewBox="0 0 1000 700" aria-hidden="true">
          <ellipse className="chandelier-ring" cx="500" cy="190" rx="330" ry="93" />
          <g>
            {chandelierBulbs.map((x, index) => (
              <g key={x}>
                <line x1={x} y1="175" x2={x} y2={300 + (index % 2) * 35} />
                <circle className="bulb" cx={x} cy={312 + (index % 2) * 35} r="14" />
              </g>
            ))}
          </g>
        </svg>
        <div className="culture-caption light-copy">
          <p className="chapter-index light">05 / Culture illuminated</p>
          <h2>Light carries<br />the story.</h2>
        </div>
      </section>

      <section className="space-window mobile-reveal">
        <div>
          <Image src={storyImage("interior-gallery-1")} fill sizes="(max-width: 768px) 100vw, 62vw" alt="Guests inside the bright IRISCO café beneath the circular chandelier" />
        </div>
        <aside>
          <p className="eyebrow">IRISCO Space</p>
          <h2>Bright, open,<br />made to stay.</h2>
          <p>Concrete, cobalt seating, art, warm light, and an open table—an everyday setting for discovery.</p>
          <Link href="/space" className="text-link">Our space & story <ArrowRight size={15} /></Link>
        </aside>
      </section>
    </>
  );
}
