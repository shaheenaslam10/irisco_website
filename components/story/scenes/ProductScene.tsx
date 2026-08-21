import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { chilliParticleCount, storyImage } from "../storyContent";

export function ProductScene() {
  return (
    <section className="story-scene product-scene" data-story-scene="product">
      <div className="product-photo">
        <Image src={storyImage("762018791_18118018009841859_137573672561098918_n")} fill sizes="100vw" alt="Curated jars of chilli oil on the IRISCO shelf" />
      </div>
      <div className="product-shade" />
      <div className="product-copy light-copy">
        <p className="chapter-index light">04 / Product spotlight</p>
        <p className="eyebrow light">A warmer note</p>
        <h2>Heat,<br />held in glass.</h2>
        <p>Part of a rotating shelf of sauces, preserves, honey, grains, fragrance, and thoughtful objects.</p>
        <Link href="/shop" className="button ivory">Explore the pantry <ArrowRight size={16} /></Link>
      </div>
      <div className="particles" aria-hidden="true">
        {Array.from({ length: chilliParticleCount }).map((_, index) => <i className="chilli-particle" key={index} />)}
      </div>
    </section>
  );
}
