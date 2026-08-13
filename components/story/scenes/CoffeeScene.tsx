import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { menuHighlights, storyImage } from "../storyContent";

export function CoffeeScene() {
  return (
    <>
      <section className="story-scene coffee-scene" id="coffee" data-story-scene="coffee">
        <div className="scene-copy light-copy">
          <p className="chapter-index">01 / The ritual</p>
          <p className="eyebrow light">Made to pause time</p>
          <h2>The cup<br />finds its place.</h2>
          <p>A familiar ritual, framed in IRISCO navy and soft aqua.</p>
        </div>
        <div className="coffee-stage">
          <div className="steam steam-one" />
          <div className="steam steam-two" />
          <div className="steam steam-three" />
          <div className="coffee-orbit">
            <Image src={storyImage("logo_with_cups")} fill sizes="(max-width: 768px) 92vw, 58vw" alt="IRISCO branded takeaway coffee cups" />
          </div>
          <div className="coffee-shadow" />
        </div>
      </section>

      <section className="quiet-grid mobile-reveal">
        <div>
          <p className="eyebrow">At the counter</p>
          <h2>Small rituals,<br />baked daily.</h2>
        </div>
        <div className="menu-list">
          {menuHighlights.map((item) => <span key={item}>{item}</span>)}
          <Link href="/menu">Browse the café menu <ArrowRight size={15} /></Link>
        </div>
      </section>
    </>
  );
}
