"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { categories, products } from "@/lib/content/site";

export function Catalog() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => products.filter((p) => (category === "All" || p.category === category) && `${p.name} ${p.category}`.toLowerCase().includes(query.toLowerCase())), [category, query]);
  return <>
    <label className="eyebrow" htmlFor="catalog-search"><Search size={13} /> Search the shelf</label>
    <input id="catalog-search" className="catalog-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Honey, flour, candles…" />
    <div className="filter-bar" aria-label="Product categories">{categories.map((item) => <button type="button" className={category === item ? "active" : ""} aria-pressed={category === item} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div>
    <div className="product-grid">{filtered.map((product) => <Link href={`/shop/${product.slug}`} className="product-card" key={product.slug}>
      <div className="product-card-image"><Image src={product.image} fill sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 34vw" alt={product.name} /></div>
      <div className="product-card-meta"><div><h2>{product.name}</h2><p>{product.category}</p></div><span className="availability">{product.available ? "On the shelf" : "Ask in store"} <ArrowUpRight size={12} /></span></div>
    </Link>)}</div>
    {filtered.length === 0 && <p className="lede">No shelf items match that search yet.</p>}
  </>;
}
