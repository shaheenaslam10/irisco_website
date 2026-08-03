import type { Metadata } from "next";
import { MapPin, MessageCircle, Clock, Camera } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { siteConfig } from "@/lib/content/site";

export const metadata: Metadata = { title: "Visit" };
export default function VisitPage() { return <main className="inner-main" id="main"><PageHero eyebrow="Come by" title="Find your place at IRISCO." copy="Coffee, baked things, pantry discoveries, art, and enough time to stay. Confirmed visit details can be updated from one configuration file." image="/assets/irisco/optimized/main-counter-1600.webp" /><section className="content-section"><div className="visit-grid">
  <article className="visit-panel"><MapPin /><p className="eyebrow" style={{marginTop:"2rem"}}>Location</p><h2>Visit IRISCO</h2><p>{siteConfig.contact.address}</p><a className="text-link" href={siteConfig.contact.directions}>Get directions</a></article>
  <article className="visit-panel"><Clock /><p className="eyebrow" style={{marginTop:"2rem"}}>Hours</p><h2>When to come</h2><p>{siteConfig.contact.hours}</p></article>
  <article className="visit-panel"><MessageCircle /><p className="eyebrow" style={{marginTop:"2rem"}}>Contact</p><h2>Ask IRISCO</h2><p>{siteConfig.contact.phone}</p><a className="text-link" href={siteConfig.contact.whatsapp}>WhatsApp</a></article>
  <article className="visit-panel"><Camera /><p className="eyebrow" style={{marginTop:"2rem"}}>Follow</p><h2>What’s on the shelf</h2><p>See current counter, pantry, and community updates on IRISCO social channels.</p><a className="text-link" href={siteConfig.socials.instagram}>Instagram</a></article>
  </div></section></main>; }
