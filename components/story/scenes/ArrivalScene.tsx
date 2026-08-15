import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";

const coffeeV2 = "/assets/irisco/generated/coffee-v2";
const asset = (name: string) => `${coffeeV2}/${name}`;

export function ArrivalScene() {
  return (
    <section className="opening-scene" id="main" data-story-scene="opening">
      <div className="opening-stage" aria-label="IRISCO coffee ritual">
        <div className="opening-stone" aria-hidden="true">
          <Image src={asset("coffee-stone-surface-1600.webp")} fill sizes="100vw" alt="" priority />
        </div>
        <div className="opening-grain" aria-hidden="true" />

        <div className="opening-state opening-state-hero">
          <p className="eyebrow">Coffee · Craft · Culture · Conversation</p>
          <h1>Everything finds<br />its place at IRISCO.</h1>
          <p className="opening-state-copy">Coffee, culture, and carefully chosen things—inside a café, bakery, pantry, and place for conversation.</p>
          <div className="hero-actions">
            <a href="#main" className="button primary">Explore IRISCO <ArrowDown size={17} /></a>
            <Link href="/menu" className="text-link">Menu & products <ArrowRight size={16} /></Link>
          </div>
        </div>

        <div className="opening-state opening-state-ritual" aria-hidden="true">
          <p className="chapter-index">01 / The ritual</p>
          <p className="eyebrow">Made to pause time</p>
          <h2>Begin<br />with a pause.</h2>
        </div>
        <div className="opening-state opening-state-lid" aria-hidden="true">
          <p className="eyebrow">A familiar ritual</p>
          <h2>The moment<br />opens.</h2>
        </div>
        <div className="opening-state opening-state-liquid" aria-hidden="true">
          <p className="eyebrow">In the making</p>
          <h2>Coffee,<br />in motion.</h2>
        </div>
        <div className="opening-state opening-state-final" aria-hidden="true">
          <p className="chapter-index">01 / The ritual</p>
          <p className="eyebrow">Made to pause time</p>
          <h2>The cup<br />finds its place.</h2>
          <p className="opening-state-copy">A familiar ritual, framed in IRISCO navy and soft aqua.</p>
        </div>

        <div className="opening-cup-wrap" aria-hidden="true">
          <div className="opening-cup opening-cup-closed">
            <Image src={asset("irisco-cup-ivory-closed.png")} fill sizes="(max-width: 900px) 78vw, 48vw" alt="" priority />
          </div>
          <div className="opening-cup opening-cup-open">
            <Image src={asset("irisco-cup-ivory-open.png")} fill sizes="(max-width: 900px) 78vw, 48vw" alt="" />
            <div className="opening-coffee-surface">
              <Image src={asset("coffee-surface.png")} fill sizes="28vw" alt="" />
            </div>
          </div>
          <div className="opening-lid">
            <Image src={asset("irisco-lid-navy.png")} fill sizes="25vw" alt="" />
          </div>
          <div className="opening-cup-shadow"><i /></div>
        </div>

        <div className="opening-liquid" aria-hidden="true">
          <Image src={asset("coffee-liquid-assets.png")} fill sizes="28vw" alt="" />
        </div>
        <div className="opening-bean opening-bean-one" aria-hidden="true"><Image src={asset("coffee-bean-assets.png")} fill sizes="8vw" alt="" /></div>
        <div className="opening-bean opening-bean-two" aria-hidden="true"><Image src={asset("coffee-bean-assets.png")} fill sizes="6vw" alt="" /></div>
        <div className="opening-bean opening-bean-three" aria-hidden="true"><Image src={asset("coffee-bean-assets.png")} fill sizes="9vw" alt="" /></div>
        <div className="opening-steam" aria-hidden="true"><Image src={asset("coffee-steam-assets.png")} fill sizes="24vw" alt="" /></div>
        <div className="opening-hook" aria-hidden="true"><span>IRISCO</span><i /><span>02</span></div>
      </div>
    </section>
  );
}
