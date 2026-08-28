import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./inner-pages.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

/**
 * Both families are self-hosted variable woff2 (via @fontsource-variable) rather
 * than fetched from Google at build time: no external request, no fallback
 * flash, and the full Fraunces axis set — weight, optical size, SOFT and WONK.
 * `font-optical-sizing: auto` in globals.css lets the display face tighten up
 * as it gets larger.
 */
const display = localFont({
  src: [
    { path: "./fonts/fraunces-latin-full-normal.woff2", style: "normal" },
    { path: "./fonts/fraunces-latin-full-italic.woff2", style: "italic" },
  ],
  display: "swap",
  variable: "--font-fraunces",
  preload: true,
  fallback: ["Iowan Old Style", "Palatino Linotype", "Georgia", "serif"],
});

const sans = localFont({
  src: [
    { path: "./fonts/hanken-grotesk-latin-wght-normal.woff2", style: "normal" },
    { path: "./fonts/hanken-grotesk-latin-wght-italic.woff2", style: "italic" },
  ],
  display: "swap",
  variable: "--font-hanken",
  preload: true,
  fallback: ["Segoe UI", "system-ui", "sans-serif"],
});

// Configurable via NEXT_PUBLIC_SITE_URL; falls back to localhost for local builds.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "IRISCO — Coffee, culture & carefully chosen things",
    template: "%s — IRISCO",
  },
  description:
    "A contemporary Pakistani café, bakery, curated pantry, gallery, and place for conversation.",
  keywords: [
    "IRISCO",
    "café",
    "coffee",
    "bakery",
    "pantry",
    "Pakistan",
    "gallery",
    "community space",
  ],
  applicationName: "IRISCO",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "IRISCO",
    locale: "en_PK",
    title: "IRISCO — Coffee, culture & carefully chosen things",
    description:
      "A contemporary Pakistani café, bakery, curated pantry, gallery, and place for conversation.",
    images: [
      {
        url: "/assets/irisco/optimized/interior-gallery-1600.webp",
        width: 1600,
        height: 1067,
        alt: "The IRISCO room — chandelier, cobalt seating and warm light",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IRISCO — Coffee, culture & carefully chosen things",
    description:
      "A contemporary Pakistani café, bakery, curated pantry, gallery, and place for conversation.",
    images: ["/assets/irisco/optimized/interior-gallery-1600.webp"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#062b34",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <head>
        {/*
          Motion bootstrap. Runs before first paint so the cinema page can hide
          exactly the elements its timelines are about to reveal — and never
          hides anything for visitors who asked for reduced motion or who have
          no JS at all.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var d=document.documentElement;d.classList.add('js');" +
              "if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)" +
              "d.classList.add('js-motion')}catch(e){}})()",
          }}
        />
      </head>
      <body>
        {/* Everything fixed stays OUTSIDE the smooth wrapper: ScrollSmoother
            translates #smooth-content, which would otherwise become the
            containing block for position: fixed. */}
        <a className="skip-link" href="#main">Skip to content</a>
        <SmoothScroll />
        <ScrollProgress />
        <SiteHeader />

        <div id="smooth-wrapper">
          <div id="smooth-content">
            {children}
            <SiteFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
