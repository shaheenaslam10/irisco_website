"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/lib/content/site";
import { BrandMark } from "./BrandMark";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Close the overlay whenever the route changes. Adjusting state during render
  // (rather than in an effect) is React's recommended pattern here, and it also
  // covers back/forward navigation, not just link clicks.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Solidify the bar once the hero starts leaving the viewport.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Freeze the page behind the full-screen menu: pause ScrollSmoother when it
  // owns the scroll, fall back to overflow for native/reduced-motion visitors.
  useEffect(() => {
    const smoother = window.__smoother;
    if (open) {
      smoother?.paused(true);
      document.body.style.overflow = "hidden";
    } else {
      smoother?.paused(false);
      document.body.style.overflow = "";
    }
    return () => {
      smoother?.paused(false);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`site-header${scrolled ? " is-scrolled" : ""}`}
      data-hero="dark"
    >
      <Link href="/" className="brand" aria-label="IRISCO — home">
        <BrandMark />
      </Link>

      <nav className="site-nav" aria-label="Primary">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive(item.href) ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <button
        className="menu-toggle"
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav"
      >
        <span>{open ? "Close" : "Menu"}</span>
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      <div id="mobile-nav" className={`nav-overlay${open ? " open" : ""}`}>
        <nav className="nav-overlay-links" aria-label="Mobile">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="nav-overlay-foot">
          <span>Coffee · Bakery · Pantry · Gallery</span>
          <span>IRISCO · Pakistan</span>
        </div>
      </div>
    </header>
  );
}
