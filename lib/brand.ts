/**
 * IRISCO — brand tokens.
 *
 * Everything visual that belongs to the brand (rather than to a layout) lives
 * here, so it can be re-skinned in one file. Business facts stay in
 * `lib/content/site.ts`.
 */

export const brand = {
  name: "IRISCO",
  tagline: "Part café. Part living room.",

  /**
   * SWAP POINT — replace these two paths with the real logo files when they
   * arrive (SVG preferred). Nothing else references the logo directly.
   */
  logo: {
    /** Horizontal lockup, for the header and footer. */
    wordmark: "/assets/irisco/optimized/logo-wordmark.webp",
    /** Square mark. */
    mark: "/assets/irisco/optimized/logo-1600.webp",
    /** Photographic lockup, for editorial use. */
    withCups: "/assets/irisco/optimized/logo_with_cups-1600.webp",
  },

  color: {
    /* Canvas — warm, near-black espresso. Lets the café photography sit at its
       true warmth instead of being graded onto a colder surface. */
    espresso: "#0b0806",
    espressoSoft: "#150e09",
    espressoRaise: "#1e1510",
    line: "rgba(245, 241, 232, 0.12)",
    lineSoft: "rgba(245, 241, 232, 0.07)",

    /* Product — the IRISCO cups really are navy/teal, so teal is the accent
       that marks anything the brand *makes*. */
    navy: "#183c55",
    teal: "#07536a",
    tealSoft: "#2d4b67",
    aqua: "#8fd3ce",

    /* Light — the chandelier. Used sparingly, for signature moments only. */
    amber: "#e7a64d",
    amberSoft: "#f0c98a",

    /* Type */
    ivory: "#f5f1e8",
    cream: "#efe6d6",
    muted: "rgba(245, 241, 232, 0.62)",
    faint: "rgba(245, 241, 232, 0.42)",

    /* One warm product accent. */
    chilli: "#b8432a",
  },

  /** The 3D hero cup, in the two finishes IRISCO actually ships. */
  cup: {
    navy: "#183c55",
    ivory: "#dcd8d0",
    crema: "#3a1e0c",
  },
} as const;

export type BrandColor = keyof typeof brand.color;
