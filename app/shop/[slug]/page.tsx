import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { products } from "@/lib/content/site";

export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  return <main className="inner-main" id="main"><section className="product-detail">
    <div className="product-detail-image"><Image src={product.image} fill priority sizes="(max-width: 900px) 100vw, 55vw" alt={product.name} /></div>
    <div><Link href="/shop" className="text-link"><ArrowLeft size={15} /> Back to pantry</Link><p className="eyebrow" style={{ marginTop: "4rem" }}>{product.category}</p><h1>{product.name}</h1><p className="lede">{product.note}</p><p>Presented as part of IRISCO’s curated shelf. Brand ownership, product details, price, and availability should be confirmed in store.</p><p className="availability" style={{ marginTop: "2rem" }}>{product.available ? "Currently presented as available" : "Availability to be confirmed"}</p></div>
  </section></main>;
}
