import type { Metadata } from "next";
import { Catalog } from "@/components/catalog/Catalog";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "Pantry & objects" };
export default function ShopPage() { return <main className="inner-main" id="main"><PageHero eyebrow="The curated shelf" title="More than a menu." copy="Natural foods, pantry discoveries, fragrance, and everyday craft—selected for the IRISCO shelf." image="/assets/irisco/optimized/table_rak-1600.webp" /><section className="content-section"><Catalog /></section></main>; }
