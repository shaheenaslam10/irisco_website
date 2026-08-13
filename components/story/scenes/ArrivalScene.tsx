import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { storyImage } from "../storyContent";

export function ArrivalScene() {
  return (
    <>
      <section className="story-hero" id="main">
        <div className="hero-art" aria-hidden="true">
          <Image src={storyImage("logo_with_cups")} fill priority sizes="100vw" alt="" />
          <svg className="bean-path" viewBox="0 0 900 540">
            <path d="M70 420C220 350 210 120 430 145s170 300 410 210" />
            <ellipse cx="72" cy="419" rx="12" ry="20" />
          </svg>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">Coffee · Craft · Culture · Conversation</p>
          <h1>Everything finds<br />its place at IRISCO.</h1>
          <p>Coffee, culture, and carefully chosen things—inside a café, bakery, pantry, and place for conversation.</p>
          <div className="hero-actions">
            <a href="#coffee" className="button primary">Explore IRISCO <ArrowDown size={17} /></a>
            <Link href="/menu" className="text-link">Menu & products <ArrowRight size={16} /></Link>
          </div>
        </div>
        <p className="chapter-index">00 / An invitation</p>
      </section>

      <section className="editorial-intro mobile-reveal">
        <p className="eyebrow">Not one thing. One place.</p>
        <p className="editorial-statement">A morning coffee. A pastry from the counter. Honey for home. A candle, a chess move, a conversation that runs long.</p>
      </section>
    </>
  );
}
