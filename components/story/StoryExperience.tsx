"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, MapPin } from "lucide-react";
import { useEffect, useRef } from "react";

const img = (name: string, size = 1600) => `/assets/irisco/optimized/${name}-${size}.webp`;

export function StoryExperience() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const motionOK = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!motionOK || !root.current) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    import("gsap").then(({ gsap }) => import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      if (cancelled || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 769px)", () => {
          gsap.timeline({ scrollTrigger: { trigger: ".coffee-scene", start: "top top", end: "+=125%", scrub: 1, pin: true } })
            .fromTo(".coffee-orbit", { yPercent: -45, rotate: -8, scale: .76 }, { yPercent: 1, rotate: 0, scale: 1, ease: "power2.inOut" })
            .fromTo(".coffee-shadow", { scaleX: 1.8, opacity: .05 }, { scaleX: .85, opacity: .45 }, 0)
            .fromTo(".steam", { opacity: 0, y: 20 }, { opacity: .65, y: -10, stagger: .08 }, .72);

          gsap.timeline({ scrollTrigger: { trigger: ".bakery-scene", start: "top top", end: "+=135%", scrub: 1, pin: true } })
            .fromTo(".bakery-photo", { clipPath: "inset(48% 47% 48% 47%)", scale: 1.16 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1 })
            .from(".bakery-note", { x: 80, opacity: 0, stagger: .12 }, .2);

          gsap.timeline({ scrollTrigger: { trigger: ".pantry-scene", start: "top top", end: "+=155%", scrub: 1, pin: true } })
            .from(".shelf-line", { scaleX: 0, transformOrigin: "left", stagger: .08 })
            .from(".shelf-object", { y: 180, rotate: (i) => i % 2 ? 5 : -4, opacity: 0, stagger: .08 }, 0)
            .to(".shelf-object", { opacity: 0, duration: .2 }, .72)
            .fromTo(".pantry-photo", { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1 }, .72);

          gsap.timeline({ scrollTrigger: { trigger: ".product-scene", start: "top top", end: "+=120%", scrub: 1, pin: true } })
            .fromTo(".product-photo", { scale: 1.32, xPercent: -8 }, { scale: 1, xPercent: 0 })
            .from(".product-copy", { x: 90, opacity: 0 }, .2)
            .from(".chilli-particle", { y: -120, opacity: 0, stagger: .04 }, .1);

          gsap.timeline({ scrollTrigger: { trigger: ".culture-scene", start: "top top", end: "+=135%", scrub: 1, pin: true } })
            .fromTo(".culture-photo", { clipPath: "circle(15% at 50% 28%)", scale: 1.12 }, { clipPath: "circle(78% at 50% 48%)", scale: 1 })
            .fromTo(".chandelier-ring", { strokeDashoffset: 900 }, { strokeDashoffset: 0 }, 0)
            .from(".bulb", { opacity: .1, filter: "brightness(.4)", stagger: .05 }, .3);

          gsap.timeline({ scrollTrigger: { trigger: ".community-scene", start: "top top", end: "+=120%", scrub: 1, pin: true } })
            .from(".chess-piece", { y: (i) => i % 2 ? -100 : 100, x: (i) => i % 2 ? 80 : -60, stagger: .06 })
            .to(".chess-overlay", { perspective: 600, rotateX: 54, y: 90, scale: .76 }, .25)
            .fromTo(".community-photo", { clipPath: "inset(48% 48% 48% 48%)", scale: 1.08 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1 }, .38);
        });

        mm.add("(max-width: 768px)", () => {
          gsap.utils.toArray<HTMLElement>(".mobile-reveal").forEach((el) => gsap.from(el, { opacity: 0, y: 35, duration: .8, scrollTrigger: { trigger: el, start: "top 88%" } }));
        });
      }, root);
    }));
    return () => { cancelled = true; ctx?.revert(); };
  }, []);

  return (
    <div ref={root}>
      <section className="story-hero" id="main">
        <div className="hero-art" aria-hidden="true">
          <Image src={img("logo_with_cups")} fill priority sizes="100vw" alt="" />
          <svg className="bean-path" viewBox="0 0 900 540"><path d="M70 420C220 350 210 120 430 145s170 300 410 210" /><ellipse cx="72" cy="419" rx="12" ry="20" /></svg>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">Coffee · Craft · Culture · Conversation</p>
          <h1>Everything finds<br />its place at IRISCO.</h1>
          <p>Coffee, culture, and carefully chosen things—inside a café, bakery, pantry, and place for conversation.</p>
          <div className="hero-actions"><a href="#coffee" className="button primary">Explore IRISCO <ArrowDown size={17} /></a><Link href="/menu" className="text-link">Menu & products <ArrowRight size={16} /></Link></div>
        </div>
        <p className="chapter-index">00 / An invitation</p>
      </section>

      <section className="editorial-intro mobile-reveal">
        <p className="eyebrow">Not one thing. One place.</p>
        <p className="editorial-statement">A morning coffee. A pastry from the counter. Honey for home. A candle, a chess move, a conversation that runs long.</p>
      </section>

      <section className="story-scene coffee-scene" id="coffee">
        <div className="scene-copy light-copy"><p className="chapter-index">01 / The ritual</p><p className="eyebrow light">Made to pause time</p><h2>The cup<br />finds its place.</h2><p>A familiar ritual, framed in IRISCO navy and soft aqua.</p></div>
        <div className="coffee-stage">
          <div className="steam steam-one" /><div className="steam steam-two" /><div className="steam steam-three" />
          <div className="coffee-orbit"><Image src={img("logo_with_cups")} fill sizes="(max-width: 768px) 92vw, 58vw" alt="IRISCO branded takeaway coffee cups" /></div>
          <div className="coffee-shadow" />
        </div>
      </section>

      <section className="quiet-grid mobile-reveal">
        <div><p className="eyebrow">At the counter</p><h2>Small rituals,<br />baked daily.</h2></div>
        <div className="menu-list"><span>Espresso-based coffee</span><span>Cakes & slices</span><span>Croissants & pastries</span><span>Sandwiches & savoury bites</span><Link href="/menu">Browse the café menu <ArrowRight size={15} /></Link></div>
      </section>

      <section className="story-scene bakery-scene">
        <div className="bakery-photo"><Image src={img("main-counter")} fill sizes="100vw" alt="IRISCO bakery counter with cakes, pastries and the sculptural wall logo" /></div>
        <div className="bakery-caption"><p className="chapter-index light">02 / From counter to display</p><h2>Made. Layered.<br />Placed to share.</h2></div>
        <div className="bakery-notes" aria-hidden="true"><span className="bakery-note">baked</span><span className="bakery-note">layered</span><span className="bakery-note">shared</span></div>
      </section>

      <section className="story-scene pantry-scene">
        <div className="pantry-head"><p className="chapter-index">03 / The curated pantry</p><p className="eyebrow">More than a menu</p><h2>Carefully chosen.<br />Precisely placed.</h2><p>Natural foods, pantry discoveries, fragrance, and everyday craft—selected for the IRISCO shelf.</p></div>
        <div className="shelf-stage">
          <i className="shelf-line line-a" /><i className="shelf-line line-b" /><i className="shelf-line line-c" />
          <div className="shelf-object object-a"><Image src={img("product_honey", 900)} fill alt="Honey jars" sizes="22vw" /></div>
          <div className="shelf-object object-b"><Image src={img("product_fragrance_candles", 900)} fill alt="Fragrance candles" sizes="22vw" /></div>
          <div className="shelf-object object-c"><Image src={img("product_flour", 900)} fill alt="Flour and pantry packages" sizes="22vw" /></div>
          <div className="pantry-photo"><Image src={img("table_rak")} fill alt="IRISCO pantry wall with jars, grains and pantry products" sizes="(max-width: 768px) 100vw, 62vw" /></div>
        </div>
      </section>

      <section className="story-scene product-scene">
        <div className="product-photo"><Image src={img("762018791_18118018009841859_137573672561098918_n")} fill sizes="100vw" alt="Curated jars of chilli oil on the IRISCO shelf" /></div>
        <div className="product-shade" />
        <div className="product-copy light-copy"><p className="chapter-index light">04 / Product spotlight</p><p className="eyebrow light">A warmer note</p><h2>Heat,<br />held in glass.</h2><p>Part of a rotating shelf of sauces, preserves, honey, grains, fragrance, and thoughtful objects.</p><Link href="/shop" className="button ivory">Explore the pantry <ArrowRight size={16} /></Link></div>
        <div className="particles" aria-hidden="true">{Array.from({ length: 13 }).map((_, i) => <i className="chilli-particle" key={i} />)}</div>
      </section>

      <section className="culture-intro mobile-reveal"><p className="eyebrow">Culture illuminated</p><h2>A space shaped by memory,<br />ideas, and modern Pakistan.</h2></section>

      <section className="story-scene culture-scene">
        <div className="culture-photo"><Image src={img("interior-gallery")} fill sizes="100vw" alt="IRISCO gallery wall with circular chandelier and Quaid-e-Azam artwork" /></div>
        <svg className="chandelier-overlay" viewBox="0 0 1000 700" aria-hidden="true"><ellipse className="chandelier-ring" cx="500" cy="190" rx="330" ry="93" /><g>{[220,310,400,500,600,690,780].map((x, i) => <g key={x}><line x1={x} y1="175" x2={x} y2={300 + (i % 2) * 35} /><circle className="bulb" cx={x} cy={312 + (i % 2) * 35} r="14" /></g>)}</g></svg>
        <div className="culture-caption light-copy"><p className="chapter-index light">05 / Culture illuminated</p><h2>Light carries<br />the story.</h2></div>
      </section>

      <section className="space-window mobile-reveal">
        <div><Image src={img("interior-gallery-1")} fill sizes="(max-width: 768px) 100vw, 62vw" alt="Guests inside the bright IRISCO café beneath the circular chandelier" /></div>
        <aside><p className="eyebrow">IRISCO Space</p><h2>Bright, open,<br />made to stay.</h2><p>Concrete, cobalt seating, art, warm light, and an open table—an everyday setting for discovery.</p><Link href="/space" className="text-link">Our space & story <ArrowRight size={15} /></Link></aside>
      </section>

      <section className="story-scene community-scene">
        <div className="community-photo"><Image src={img("community-chess")} fill sizes="100vw" alt="IRISCO guests sharing a game of chess around a café table" /></div>
        <div className="chess-overlay" aria-hidden="true">{Array.from({ length: 64 }).map((_, i) => <i key={i} />)}<b className="chess-piece piece-one">♞</b><b className="chess-piece piece-two">♜</b><b className="chess-piece piece-three">♟</b></div>
        <div className="community-copy light-copy"><p className="chapter-index light">06 / Your move</p><h2>Some visits become<br />conversations.</h2><p>Coffee, a game, a book, and enough time to stay.</p></div>
      </section>

      <section className="final-table mobile-reveal">
        <div className="final-collage">
          <div className="tile tile-cup"><Image src={img("logo_with_cups", 900)} fill alt="IRISCO coffee" sizes="40vw" /></div>
          <div className="tile tile-bake"><Image src={img("main-counter", 900)} fill alt="IRISCO bakery" sizes="30vw" /></div>
          <div className="tile tile-honey"><Image src={img("product_honey", 900)} fill alt="Honey" sizes="28vw" /></div>
          <div className="tile tile-candle"><Image src={img("product_fragrance_candles", 900)} fill alt="Fragrance candles" sizes="28vw" /></div>
        </div>
        <div className="final-copy"><p className="chapter-index">07 / The IRISCO table</p><p className="eyebrow">Coffee · Food · Craft · Culture</p><h2>Find your place<br />at IRISCO.</h2><div className="hero-actions"><Link href="/visit" className="button primary">Visit IRISCO <MapPin size={16} /></Link><Link href="/shop" className="text-link">Explore the pantry <ArrowRight size={15} /></Link></div></div>
      </section>
    </div>
  );
}
