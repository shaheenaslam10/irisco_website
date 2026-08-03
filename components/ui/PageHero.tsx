import Image from "next/image";

export function PageHero({ eyebrow, title, copy, image }: { eyebrow: string; title: string; copy: string; image?: string }) {
  return (
    <section className={`page-hero ${image ? "has-image" : ""}`}>
      <div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lede">{copy}</p></div>
      {image && <div className="page-hero-image"><Image src={image} fill sizes="(max-width: 800px) 100vw, 52vw" alt="IRISCO space" priority /></div>}
    </section>
  );
}
