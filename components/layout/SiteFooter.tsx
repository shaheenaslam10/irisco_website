import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navigation, siteConfig } from "@/lib/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <p className="eyebrow light">IRISCO · Pakistan</p>
        <h2>Come for coffee.<br />Stay for everything else.</h2>
      </div>
      <div className="footer-links">
        {navigation.slice(1).map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
      </div>
      <div className="footer-meta">
        <p>{siteConfig.contact.address}</p>
        <p>{siteConfig.contact.hours}</p>
        <a href={siteConfig.socials.instagram}>Instagram <ArrowUpRight size={14} /></a>
        <a href={siteConfig.socials.facebook}>Facebook <ArrowUpRight size={14} /></a>
      </div>
      <p className="copyright">© {new Date().getFullYear()} IRISCO. Details marked “to be confirmed” are editable in site configuration.</p>
    </footer>
  );
}
