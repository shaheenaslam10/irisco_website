import type { Metadata } from "next";
import Image from "next/image";
import { Camera, Clock, MapPin, MessageCircle } from "lucide-react";
import { InnerPageMotion } from "@/components/ui/InnerPageMotion";
import { PageHero } from "@/components/ui/PageHero";
import { siteConfig } from "@/lib/content/site";

export const metadata: Metadata = { title: "Visit" };

const available = (value: string) => value !== "#" && !value.toLowerCase().includes("to be confirmed");

export default function VisitPage() {
  return <main className="inner-main" id="main"><InnerPageMotion>
    <PageHero index="04 / Come by" eyebrow="Visit IRISCO" title="Find your place here." copy="Coffee, baked things, pantry discoveries, art, and enough time to stay. Everything useful for your visit will live on this page." image="/assets/irisco/optimized/main-counter-1600.webp" />

    <section className="visit-intro content-section">
      <p className="eyebrow" data-reveal>Before you arrive</p>
      <div data-reveal><h2>Come for one thing.<br />Discover the rest.</h2><p>Stop by for a quick coffee or make time for the counter, the pantry wall, the art, and the room around you.</p></div>
    </section>

    <section className="content-section visit-section"><div className="visit-grid">
      <article className="visit-panel" data-reveal><MapPin /><p className="eyebrow">Location</p><h3>Visit IRISCO</h3><p>{siteConfig.contact.address}</p>{available(siteConfig.contact.directions) ? <a className="text-link" href={siteConfig.contact.directions}>Get directions</a> : <span className="detail-pending">Directions will be published here</span>}</article>
      <article className="visit-panel" data-reveal><Clock /><p className="eyebrow">Hours</p><h3>When to come</h3><p>{siteConfig.contact.hours}</p><span className="detail-pending">Check current hours before travelling</span></article>
      <article className="visit-panel" data-reveal><MessageCircle /><p className="eyebrow">Contact</p><h3>Ask IRISCO</h3><p>{siteConfig.contact.phone}</p>{available(siteConfig.contact.whatsapp) ? <a className="text-link" href={siteConfig.contact.whatsapp}>WhatsApp</a> : <span className="detail-pending">WhatsApp details coming soon</span>}</article>
      <article className="visit-panel" data-reveal><Camera /><p className="eyebrow">Follow</p><h3>See what is current</h3><p>Counter, pantry, and community updates belong on IRISCO’s social channels.</p>{available(siteConfig.socials.instagram) ? <a className="text-link" href={siteConfig.socials.instagram}>Instagram</a> : <span className="detail-pending">Social links coming soon</span>}</article>
    </div></section>

    <section className="arrival-scene content-section">
      <div className="arrival-image" data-parallax><Image src="/assets/irisco/optimized/interior-gallery-1-1600.webp" fill sizes="(max-width: 900px) 100vw, 58vw" alt="Inside IRISCO" /></div>
      <div data-reveal><p className="eyebrow">Once you are here</p><h2>Start at the counter.</h2><ol><li><span>01</span>Choose your coffee and something fresh.</li><li><span>02</span>Browse the pantry and objects along the shelf.</li><li><span>03</span>Find a table, notice the art, and stay awhile.</li></ol></div>
    </section>

    <section className="visit-faq content-section">
      <header data-reveal><p className="eyebrow">Good to know</p><h2>A simple visit.</h2></header>
      <div>
        <article data-reveal><h3>What is available?</h3><p>Coffee, bakery items, savoury bites, and pantry products can change with the day. Ask the team about the current counter and shelf.</p></article>
        <article data-reveal><h3>Can I stay awhile?</h3><p>That is part of the idea. IRISCO is presented as a place for conversation, reading, meetings, games, and slower visits.</p></article>
        <article data-reveal><h3>Can I confirm before coming?</h3><p>Yes. Once the official phone and WhatsApp details are supplied, this page will provide a direct contact route.</p></article>
      </div>
    </section>
  </InnerPageMotion></main>;
}
