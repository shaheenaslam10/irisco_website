"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { categories, products } from "@/lib/content/site";

export function Catalog() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => products.filter((product) =>
      (category === "All" || product.category === category) &&
      `${product.name} ${product.category} ${product.note}`.toLowerCase().includes(query.toLowerCase()),
    ),
    [category, query],
  );

  return <>
    <div className="catalog-tools" data-reveal>
      <div>
        <p className="eyebrow">Browse the pantry</p>
        <h2>Things worth taking home.</h2>
      </div>
      <label className="catalog-search-wrap" htmlFor="catalog-search">
        <Search size={16} />
        <input id="catalog-search" className="catalog-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Honey, flour, candles…" />
      </label>
    </div>
    <div className="filter-bar" aria-label="Product categories" data-reveal>
      {categories.map((item) => <button type="button" className={category === item ? "active" : ""} aria-pressed={category === item} onClick={() => setCategory(item)} key={item}>{item}</button>)}
    </div>
    <p className="catalog-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? "discovery" : "discoveries"} on the shelf</p>
    <div className="product-grid">
      {filtered.map((product, index) => <Link href={`/shop/${product.slug}`} className="product-card" key={product.slug} data-reveal>
        <div className="product-card-image">
          <Image src={product.image} fill sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 34vw" alt={product.name} />
          <span className="product-card-number">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <div className="product-card-meta">
          <div><h3>{product.name}</h3><p>{product.note}</p></div>
          <span className="availability">{product.available ? "On the shelf" : "Ask in store"} <ArrowUpRight size={12} /></span>
        </div>
      </Link>)}
    </div>
    {filtered.length === 0 && <div className="empty-shelf"><p className="eyebrow">Nothing in this corner yet</p><p className="lede">Try another search or return to the full pantry.</p><button type="button" className="text-link" onClick={() => { setQuery(""); setCategory("All"); }}>Reset the shelf</button></div>}
  </>;
}
