import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navigation, siteConfig } from "@/lib/content/site";
import { BrandMark } from "./BrandMark";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <p className="eyebrow light">IRISCO · Pakistan</p>
          <h2>
            Come for coffee.
            <br />
            Stay for everything else.
          </h2>
        </div>
        <div className="footer-cta">
          <Link href="/visit" className="button ivory">
            Plan your visit <ArrowUpRight size={16} />
          </Link>
          <Link href="/menu" className="text-link">
            See the menu <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      <div className="footer-cols">
        <div className="footer-brand">
          <div className="footer-brand-mark">
            <BrandMark />
          </div>
          <p>{siteConfig.description}</p>
        </div>

        <div className="footer-col">
          <h3>Explore</h3>
          <ul>
            {navigation.slice(1).map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h3>Visit</h3>
          <ul>
            <li>
              <p>{siteConfig.contact.address}</p>
            </li>
            <li>
              <p>{siteConfig.contact.hours}</p>
            </li>
            <li>
              <p>{siteConfig.contact.phone}</p>
            </li>
            <li>
              <a className="inline-link" href={siteConfig.socials.instagram}>
                Instagram <ArrowUpRight size={13} />
              </a>
            </li>
            <li>
              <a className="inline-link" href={siteConfig.socials.facebook}>
                Facebook <ArrowUpRight size={13} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {year} IRISCO. All rights reserved.</span>
        <span>Details marked “to be confirmed” are editable in site configuration.</span>
      </div>
    </footer>
  );
}
