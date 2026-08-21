import type { Metadata } from "next";
import Image from "next/image";
import { EditorialCTA } from "@/components/ui/EditorialCTA";
import { InnerPageMotion } from "@/components/ui/InnerPageMotion";
import { PageHero } from "@/components/ui/PageHero";
import { spacePrinciples } from "@/lib/content/site";

export const metadata: Metadata = { title: "IRISCO Space" };

export default function SpacePage() {
  return <main className="inner-main" id="main"><InnerPageMotion>
    <PageHero index="03 / Culture illuminated" eyebrow="Our space" title="Room for ideas—and another cup." copy="A bright contemporary place where coffee, food, pantry discoveries, art, books, games, and people share the same frame." image="/assets/irisco/optimized/interior-gallery-1-1600.webp" />

    <section className="space-statement" data-reveal>
      <p className="eyebrow light">Not a backdrop</p>
      <p>The room is part of what IRISCO serves: light, colour, cultural memory, and enough space for people to bring their own story.</p>
    </section>

    <section className="content-section story-grid space-story">
      <div data-reveal><p className="eyebrow">Culture, present tense</p><h2>Memory meets modern Pakistan.</h2><p>The circular chandelier and surrounding artwork are part of the space’s identity—not decoration placed behind it. Concrete surfaces, cobalt chairs, warm light, and cultural references hold the room together.</p></div>
      <div className="image" data-parallax><Image src="/assets/irisco/optimized/interior-gallery-1600.webp" fill sizes="(max-width: 900px) 100vw, 50vw" alt="Circular chandelier and Quaid-e-Azam artwork at IRISCO" /></div>
    </section>

    <section className="space-principles content-section">
      <header data-reveal><p className="eyebrow">The thinking behind the room</p><h2>Designed for more than passing through.</h2></header>
      <div>{spacePrinciples.map((principle) => <article key={principle.number} data-reveal><span>{principle.number}</span><h3>{principle.title}</h3><p>{principle.copy}</p></article>)}</div>
    </section>

    <section className="space-gallery content-section" aria-label="IRISCO space gallery">
      <div className="space-gallery-a" data-parallax><Image src="/assets/irisco/optimized/community-chess-1600.webp" fill sizes="(max-width: 900px) 100vw, 58vw" alt="Guests playing chess at IRISCO" /></div>
      <div className="space-gallery-b" data-parallax><Image src="/assets/irisco/optimized/interior-gallery-1-1600.webp" fill sizes="(max-width: 900px) 100vw, 35vw" alt="The bright IRISCO interior" /></div>
      <blockquote data-reveal>Stay for the cup.<br />Leave with a conversation.</blockquote>
    </section>

    <section className="content-section story-grid community-story">
      <div className="image" data-parallax><Image src="/assets/irisco/optimized/community-chess-1600.webp" fill sizes="(max-width: 900px) 100vw, 50vw" alt="Guests sharing a game of chess at IRISCO" /></div>
      <div data-reveal><p className="eyebrow">The human part</p><h2>A place to stay.</h2><p>A coffee can become a game, a conversation, or a longer afternoon. IRISCO makes room for that unplanned part of a visit—the part that cannot be packed into a takeaway cup.</p></div>
    </section>

    <EditorialCTA eyebrow="The room is waiting" title="Bring your own reason to stay." copy="Come for coffee, a meeting, a pantry discovery, a chess move, or simply a slower hour." primary={{ label: "Plan your visit", href: "/visit" }} secondary={{ label: "See the menu", href: "/menu" }} />
  </InnerPageMotion></main>;
}
