import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { notFound } from "next/navigation";
import { EditorialCTA } from "@/components/ui/EditorialCTA";
import { InnerPageMotion } from "@/components/ui/InnerPageMotion";
import { products } from "@/lib/content/site";

export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  return { title: product?.name ?? "Pantry discovery", description: product?.note };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  const related = products.filter((item) => item.slug !== product.slug).slice(0, 3);

  return <main className="inner-main" id="main"><InnerPageMotion>
    <section className="product-detail-rich">
      <div className="product-detail-image" data-parallax><Image src={product.image} fill priority sizes="(max-width: 900px) 100vw, 56vw" alt={product.name} /></div>
      <div className="product-detail-copy" data-reveal>
        <Link href="/shop" className="text-link"><ArrowLeft size={15} /> Back to pantry</Link>
        <p className="chapter-index">Pantry discovery / {product.category}</p>
        <h1>{product.name}</h1>
        <p className="lede">{product.note}</p>
        <p>{product.story}</p>
        <ul className="product-details">{product.details.map((detail) => <li key={detail}><Check size={15} /> {detail}</li>)}</ul>
        <p className="availability product-status">{product.available ? "Presented as currently on the shelf" : "Current availability to be confirmed"}</p>
        <Link href="/visit" className="button primary">Ask IRISCO in store <ArrowRight size={15} /></Link>
      </div>
    </section>

    <section className="product-philosophy content-section">
      <p className="eyebrow" data-reveal>Why it belongs</p>
      <h2 data-reveal>Chosen for everyday life—not just display.</h2>
      <p className="lede" data-reveal>IRISCO’s pantry is an extension of the café: grounded products, useful ingredients, and small objects that are easy to discover over a cup.</p>
    </section>

    <section className="related-products content-section">
      <header data-reveal><p className="eyebrow">Continue along the shelf</p><h2>You may also notice.</h2></header>
      <div>{related.map((item) => <Link href={`/shop/${item.slug}`} key={item.slug} className="related-card" data-reveal>
        <div><Image src={item.image} fill sizes="(max-width: 600px) 100vw, 33vw" alt={item.name} /></div>
        <p>{item.category}</p><h3>{item.name}</h3><span className="text-link">View discovery <ArrowRight size={14} /></span>
      </Link>)}</div>
    </section>

    <EditorialCTA eyebrow="Availability changes" title="Ask what is on the shelf today." copy="The IRISCO range can rotate. Visit the café or contact the team for current sizes, variants, prices, and availability." primary={{ label: "Visit & contact", href: "/visit" }} secondary={{ label: "Browse all products", href: "/shop" }} />
  </InnerPageMotion></main>;
}
