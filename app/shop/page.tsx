import type { Metadata } from "next";
import Image from "next/image";
import { Catalog } from "@/components/catalog/Catalog";
import { EditorialCTA } from "@/components/ui/EditorialCTA";
import { InnerPageMotion } from "@/components/ui/InnerPageMotion";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "Pantry & objects" };

export default function ShopPage() {
  return <main className="inner-main" id="main"><InnerPageMotion>
    <PageHero index="02 / The curated shelf" eyebrow="Pantry, fragrance & thoughtful objects" title="More than a menu." copy="Useful things, beautiful things, and discoveries that continue the IRISCO experience at home." image="/assets/irisco/optimized/table_rak-1600.webp" />

    <section className="shelf-intro content-section">
      <p className="eyebrow" data-reveal>Chosen, not crowded</p>
      <div data-reveal><h2>A shelf with a point of view.</h2><p>IRISCO brings natural pantry staples, bolder flavours, quiet fragrance, and everyday craft into one considered collection. The range can rotate; curiosity is permanent.</p></div>
      <div className="shelf-notes" data-reveal><span>Natural pantry</span><span>Everyday craft</span><span>Objects for gifting</span></div>
    </section>

    <section className="content-section catalog-section"><Catalog /></section>

    <section className="pantry-feature content-section">
      <div className="pantry-feature-copy" data-reveal><p className="eyebrow light">The pantry wall</p><h2>Discovery has a place here.</h2><p>Rows of jars, grains, sauces, and objects make the shelf part of the café—not a separate shop placed beside it.</p></div>
      <div className="pantry-feature-image" data-parallax><Image src="/assets/irisco/optimized/product_honey-1600.webp" fill sizes="(max-width: 900px) 100vw, 46vw" alt="Honey jars from the IRISCO pantry" /></div>
      <div className="pantry-feature-image secondary" data-parallax><Image src="/assets/irisco/optimized/product_fragrance_candles-1600.webp" fill sizes="(max-width: 900px) 100vw, 32vw" alt="Fragrance candles on the IRISCO shelf" /></div>
    </section>

    <EditorialCTA eyebrow="See it in context" title="The shelf belongs to the room." copy="Visit IRISCO for coffee, browse what is currently available, and ask the team about new arrivals." primary={{ label: "Visit IRISCO", href: "/visit" }} secondary={{ label: "Return to the menu", href: "/menu" }} />
  </InnerPageMotion></main>;
}
