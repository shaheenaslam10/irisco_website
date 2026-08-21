import type { Metadata } from "next";
import "./globals.css";
import "./inner-pages.css";
import "@/components/story/story.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export const metadata: Metadata = {
  title: { default: "IRISCO — Coffee, culture & carefully chosen things", template: "%s — IRISCO" },
  description: "A contemporary café, bakery, pantry, gallery, and place for conversation.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <ScrollProgress />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
