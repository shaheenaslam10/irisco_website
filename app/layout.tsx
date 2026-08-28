import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import "./inner-pages.css";
import "@/components/story/story.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
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
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <SmoothScroll />
        <ScrollProgress />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
