import Image from "next/image";
import { storyImage } from "../storyContent";

export function PantryScene() {
  return (
    <section className="story-scene pantry-scene" data-story-scene="pantry">
      <div className="pantry-head">
        <p className="chapter-index">03 / The curated pantry</p>
        <p className="eyebrow">More than a menu</p>
        <h2>Carefully chosen.<br />Precisely placed.</h2>
        <p>Natural foods, pantry discoveries, fragrance, and everyday craft—selected for the IRISCO shelf.</p>
      </div>
      <div className="shelf-stage">
        <i className="shelf-line line-a" />
        <i className="shelf-line line-b" />
        <i className="shelf-line line-c" />
        <div className="shelf-object object-a">
          <Image src={storyImage("product_honey", 900)} fill alt="Honey jars" sizes="22vw" />
        </div>
        <div className="shelf-object object-b">
          <Image src={storyImage("product_fragrance_candles", 900)} fill alt="Fragrance candles" sizes="22vw" />
        </div>
        <div className="shelf-object object-c">
          <Image src={storyImage("product_flour", 900)} fill alt="Flour and pantry packages" sizes="22vw" />
        </div>
        <div className="pantry-photo">
          <Image src={storyImage("table_rak")} fill alt="IRISCO pantry wall with jars, grains and pantry products" sizes="(max-width: 768px) 100vw, 62vw" />
        </div>
      </div>
    </section>
  );
}
