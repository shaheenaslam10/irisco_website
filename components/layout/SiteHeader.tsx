"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation } from "@/lib/content/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="IRISCO home">
        <Image src="/assets/irisco/optimized/logo-wordmark.webp" width={176} height={70} alt="IRISCO" priority />
      </Link>
      <button className="menu-toggle" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="primary-navigation">
        <span>{open ? "Close" : "Menu"}</span>{open ? <X size={19} /> : <Menu size={19} />}
      </button>
      <nav id="primary-navigation" className={open ? "nav-open" : ""} aria-label="Primary navigation">
        {navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}
      </nav>
    </header>
  );
}
