import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function EditorialCTA({
  eyebrow,
  title,
  copy,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="editorial-cta" data-reveal>
      <p className="eyebrow light">{eyebrow}</p>
      <div>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
      <div className="editorial-cta-actions">
        <Link href={primary.href} className="button ivory">{primary.label} <ArrowRight size={16} /></Link>
        {secondary && <Link href={secondary.href} className="text-link">{secondary.label}</Link>}
      </div>
    </section>
  );
}
