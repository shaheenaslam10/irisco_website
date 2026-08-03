import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { menuGroups } from "@/lib/content/site";

export const metadata: Metadata = { title: "Menu" };

export default function MenuPage() {
  return <main className="inner-main" id="main">
    <PageHero eyebrow="The café counter" title="Coffee, baked things & a little time." copy="A calm introduction to what you may find at the IRISCO counter. Exact items, prices, and daily availability can be added when confirmed." />
    <section className="content-section">
      <div className="menu-groups">{menuGroups.map((group) => <article className="menu-group" key={group.name}><p className="eyebrow">IRISCO selection</p><h2>{group.name}</h2><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
      <div className="note-panel"><p className="eyebrow light">A living counter</p><h2>What is fresh may change.</h2><p>Ask the IRISCO team about today’s bakery case, savoury selection, and available coffee.</p></div>
    </section>
  </main>;
}
