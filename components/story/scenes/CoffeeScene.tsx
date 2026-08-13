import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { menuHighlights } from "../storyContent";

const coffeeCupAsset = "/assets/irisco/generated/coffee/irisco-navy-cup-1024.webp";

export function CoffeeScene() {
  return (
    <>
      <section className="story-scene coffee-scene" id="coffee" data-story-scene="coffee">
        <div className="scene-copy coffee-copy">
          <p className="chapter-index">01 / The ritual</p>
          <p className="eyebrow">Made to pause time</p>
          <h2>The cup<br />finds its place.</h2>
          <p>A familiar ritual, framed in IRISCO navy and soft aqua.</p>
        </div>
        <div className="coffee-stage">
          <div className="coffee-surface" aria-hidden="true">
            <i />
          </div>
          <div className="coffee-shadow" aria-hidden="true"><i /></div>
          <div className="coffee-object">
            <svg className="coffee-steam" viewBox="0 0 180 150" aria-hidden="true">
              <path className="coffee-steam-line" d="M47 137C24 106 70 91 48 57C36 38 43 22 60 10" />
              <path className="coffee-steam-line" d="M90 137C68 111 106 91 88 65C73 44 80 26 95 14" />
              <path className="coffee-steam-line" d="M132 137C111 111 151 94 132 66C121 49 126 33 142 22" />
            </svg>
            <Image
              className="coffee-cup-image"
              src={coffeeCupAsset}
              width={1024}
              height={1536}
              sizes="(max-width: 560px) 58vw, (max-width: 900px) 38vw, 30vw"
              alt="Dark navy IRISCO branded takeaway coffee cup"
            />
          </div>
          <div className="coffee-stage-note" aria-hidden="true"><span>IRISCO</span><i /><span>01</span></div>
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
