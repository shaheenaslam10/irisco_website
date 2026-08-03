import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "IRISCO Space" };
export default function SpacePage() { return <main className="inner-main" id="main">
  <PageHero eyebrow="Our space" title="Room for ideas—and another cup." copy="A bright contemporary place where coffee, food, pantry discoveries, art, books, games, and people share the same frame." image="/assets/irisco/optimized/interior-gallery-1-1600.webp" />
  <section className="content-section story-grid"><div><p className="eyebrow">Culture illuminated</p><h2>Memory meets modern Pakistan.</h2><p>The circular chandelier and surrounding artwork are part of the space’s identity—not decoration placed behind it. IRISCO’s architectural lines, concrete surfaces, cobalt chairs, and warm light hold culture and contemporary café life together.</p></div><div className="image"><Image src="/assets/irisco/optimized/interior-gallery-1600.webp" fill sizes="(max-width: 900px) 100vw, 50vw" alt="Circular chandelier and Quaid-e-Azam artwork at IRISCO" /></div></section>
  <section className="content-section story-grid"><div className="image"><Image src="/assets/irisco/optimized/community-chess-1600.webp" fill sizes="(max-width: 900px) 100vw, 50vw" alt="Guests playing chess at IRISCO" /></div><div><p className="eyebrow">A place to stay</p><h2>The human part of the room.</h2><p>A coffee can become a game, a conversation, or a longer afternoon. IRISCO is designed to make space for that unplanned part of a visit.</p></div></section>
  </main>; }
