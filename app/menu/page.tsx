import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EditorialCTA } from "@/components/ui/EditorialCTA";
import { InnerPageMotion } from "@/components/ui/InnerPageMotion";
import { PageHero } from "@/components/ui/PageHero";
import { menuGroups } from "@/lib/content/site";

export const metadata: Metadata = { title: "Menu" };

export default function MenuPage() {
  return <main className="inner-main" id="main"><InnerPageMotion>
    <PageHero index="01 / The café counter" eyebrow="Coffee, bakery & savoury things" title="Made for the moment." copy="Start with a cup, add something from the bakery case, and let the visit take the time it needs. The selection moves with the day." image="/assets/irisco/optimized/main-counter-1600.webp" />

    <section className="menu-manifesto" data-reveal>
      <p className="eyebrow">The IRISCO rhythm</p>
      <p>Espresso in the morning. A croissant between meetings. A sandwich when the conversation runs long. The counter is designed around everyday pauses.</p>
    </section>

    <section className="menu-editorial content-section">
      <div className="menu-editorial-image" data-parallax><Image src="/assets/irisco/optimized/logo_with_cups-1600.webp" fill sizes="(max-width: 900px) 100vw, 50vw" alt="IRISCO branded coffee cups" /></div>
      <div data-reveal><p className="eyebrow">Coffee at the centre</p><h2>A cup that begins the visit.</h2><p>The coffee counter is the starting point, not the whole story. Pair it with a bake, browse the pantry wall, or settle into the room.</p><Link href="/visit" className="text-link">Plan a visit <ArrowRight size={15} /></Link></div>
    </section>

    <section className="menu-catalog content-section">
      <header className="section-heading" data-reveal><p className="eyebrow">What you may find</p><h2>The counter, in chapters.</h2><p className="lede">Exact items, prices, and daily availability can be confirmed at IRISCO. This menu presents the character of the selection without pretending every bake is always in the case.</p></header>
      <div className="menu-groups-rich">{menuGroups.map((group) => <article className="menu-group-rich" key={group.name} data-reveal>
        <div className="menu-group-title"><span>{group.number}</span><div><h3>{group.name}</h3><p>{group.introduction}</p></div></div>
        <ul>{group.items.map((item) => <li key={item.name}><strong>{item.name}</strong><span>{item.note}</span></li>)}</ul>
      </article>)}</div>
    </section>

    <section className="counter-collage content-section">
      <div className="counter-image counter-image-main" data-parallax><Image src="/assets/irisco/optimized/main-counter-1600.webp" fill sizes="70vw" alt="IRISCO bakery counter" /></div>
      <div className="counter-image counter-image-detail" data-parallax><Image src="/assets/irisco/optimized/logo_with_cups-900.webp" fill sizes="35vw" alt="IRISCO coffee cups" /></div>
      <blockquote data-reveal>“Fresh may change. The invitation stays the same.”</blockquote>
    </section>

    <EditorialCTA eyebrow="Beyond the counter" title="Coffee leads to the pantry." copy="Explore honey, grains, sauces, fragrance, and thoughtful objects selected for the IRISCO shelf." primary={{ label: "Explore the pantry", href: "/shop" }} secondary={{ label: "Discover IRISCO Space", href: "/space" }} />
  </InnerPageMotion></main>;
}
