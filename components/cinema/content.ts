/**
 * IRISCO — main-page cinema script.
 *
 * Every word the homepage speaks lives here. Motion code never owns copy, and
 * copy never owns motion: scenes read from this file, so the story can be
 * re-written without touching a single timeline.
 *
 * Facts follow `lib/content/site.ts` — anything the business has not confirmed
 * stays a deliberate placeholder rather than an invented detail.
 */

export type ChapterId =
  | "hero"
  | "idea"
  | "ritual"
  | "room"
  | "counter"
  | "pantry"
  | "gallery"
  | "table"
  | "invitation";

export type Chapter = {
  id: ChapterId;
  index: string;
  label: string;
  tone: "espresso" | "teal";
};

/** Right-hand chapter rail. Order must match DOM order. */
export const chapters: Chapter[] = [
  { id: "hero", index: "00", label: "Arrival", tone: "espresso" },
  { id: "idea", index: "01", label: "The idea", tone: "espresso" },
  { id: "ritual", index: "02", label: "The ritual", tone: "espresso" },
  { id: "room", index: "03", label: "The room", tone: "teal" },
  { id: "counter", index: "04", label: "The counter", tone: "teal" },
  { id: "pantry", index: "05", label: "The pantry", tone: "teal" },
  { id: "gallery", index: "06", label: "The gallery", tone: "teal" },
  { id: "table", index: "07", label: "The table", tone: "espresso" },
  { id: "invitation", index: "08", label: "Your move", tone: "espresso" },
];

/* ------------------------------------------------------------------ 00 hero */

export const hero = {
  eyebrow: "IRISCO · Pakistan",
  lines: ["Part café.", "Part living room.", "Entirely IRISCO."],
  lede:
    "Coffee pulled to the gram. Bread out of the oven by noon. A pantry wall worth reading twice — and a chessboard that has ruined more than one plan for the evening.",
  actions: [
    { label: "Plan your visit", href: "/visit", variant: "solid" },
    { label: "See the menu", href: "/menu", variant: "ghost" },
  ],
  meta: ["Café", "Bakery", "Pantry", "Gallery", "Conversation"],
  scrollCue: "Scroll to enter the room",
} as const;

/* ------------------------------------------------------------------ 01 idea */

export const idea = {
  index: "01",
  label: "The idea",
  kicker: "Not a coffee shop. A room with a point of view.",
  /** Word-by-word scroll highlight. Keep to one breath. */
  statement:
    "We built IRISCO on a simple suspicion — that a café can be the most useful room in a city. Somewhere you can work, argue gently, read, eat properly, find a jar of something you did not know you needed, and leave with a small piece of the place in your bag.",
  signature: "— The IRISCO team",
} as const;

/* ---------------------------------------------------------------- 02 ritual */

export const ritual = {
  index: "02",
  label: "The ritual",
  heading: "Four hands, one cup.",
  lede:
    "Nothing here is automated for speed. It is automated for consistency, and then finished by a person who is paying attention.",
  steps: [
    { n: "01", word: "Ground", note: "Dialled in by hand, dose by dose, every morning before the door opens." },
    { n: "02", word: "Pulled", note: "A double shot watched to the gram. If it is not right, it goes in the bin." },
    { n: "03", word: "Poured", note: "Milk steamed and folded in slow, until the surface goes quiet and glossy." },
    { n: "04", word: "Served", note: "Across the counter, or carried to whichever table you have claimed." },
  ],
  closing: "It takes ninety seconds. In all this time, we have never once rushed it.",
} as const;

/* ------------------------------------------------------------------ 03 room */

export const room = {
  index: "03",
  label: "The room",
  lines: [
    "Deep teal walls.",
    "A chandelier that does not",
    "know it is in a café.",
  ],
  note:
    "Cobalt seating, warm bulbs, and a portrait watching the door. The room was designed to feel like somewhere you have already been welcomed.",
} as const;

/* --------------------------------------------------------------- 04 counter */

export const counter = {
  index: "04",
  label: "The counter",
  heading: "Out of the oven by noon.",
  lede:
    "The bakery case is rewritten every morning. Whatever is standing in it was decided at five, baked by eight, and gone by whenever it is gone.",
  stats: [
    { value: "05:00", label: "Bakers in" },
    { value: "08:00", label: "First trays out" },
    { value: "12:00", label: "The case at its best" },
    { value: "—", label: "Until it's gone" },
  ],
  action: { label: "Read the full menu", href: "/menu" },
} as const;

/* ---------------------------------------------------------------- 05 pantry */

export const pantry = {
  index: "05",
  label: "The pantry",
  heading: "Coffee will lead you to the shelf.",
  lede:
    "You came in for a cortado. You are leaving with chilli oil. This happens constantly, and we have stopped apologising for it.",
  shelf: [
    {
      name: "Natural honey",
      category: "Honey & preserves",
      note: "Golden jars picked for breakfast tables, baking, and slow cups of tea.",
      image: "product_honey",
      tone: "amber",
    },
    {
      name: "Chilli oil",
      category: "Oils & sauces",
      note: "Bold jars carrying heat, texture, and a generous savoury finish.",
      image: "762018791_18118018009841859_137573672561098918_n",
      tone: "chilli",
    },
    {
      name: "Flours & grains",
      category: "Flours & grains",
      note: "Everyday staples arranged for better baking and slower cooking.",
      image: "product_flour",
      tone: "ivory",
    },
    {
      name: "Fragrance candles",
      category: "Candles & fragrance",
      note: "Quiet fragrance and warm light, chosen as an object for another room.",
      image: "product_fragrance_candles",
      tone: "teal",
    },
    {
      name: "Granola & oats",
      category: "Oats & granola",
      note: "Breakfast discoveries gathered along the natural pantry wall.",
      image: "table_rak",
      tone: "amber",
    },
  ],
  action: { label: "Browse the pantry", href: "/shop" },
} as const;

/* --------------------------------------------------------------- 06 gallery */

export const gallery = {
  index: "06",
  label: "The gallery",
  heading: "Culture, present tense.",
  lede:
    "Pakistani memory and contemporary café life share the same wall, in the same light, at the same time. Nothing here is behind glass.",
  frames: [
    {
      image: "interior-gallery",
      caption: "The long room",
      note: "Teal, brass, and a chandelier doing far more work than it needs to.",
      span: "tall",
      depth: 0.16,
    },
    {
      image: "room-hero",
      caption: "The seating",
      note: "Cobalt, low light, and chairs built for sitting far longer than planned.",
      span: "wide",
      depth: 0.08,
    },
    {
      image: "boxes",
      caption: "The details",
      note: "Packaging, prints, and small objects that leave with people.",
      span: "wide",
      depth: 0.18,
    },
    {
      image: "main-counter",
      caption: "The counter",
      note: "Where the first order of the day is usually also the fastest.",
      span: "tall",
      depth: 0.12,
    },
    {
      image: "__still__pour",
      caption: "Ninety seconds",
      note: "The pour, held still long enough to notice what it is actually doing.",
      span: "ultra",
      depth: 0.14,
    },
  ],
} as const;

/* ----------------------------------------------------------------- 07 table */

export const table = {
  index: "07",
  label: "The table",
  heading: "Time is welcome here.",
  lede:
    "Most places are designed to move you along. This one is designed to lose track of you for a while — in the best way.",
  principles: [
    {
      n: "01",
      title: "A quick cup is welcome.",
      copy: "Ten minutes at the counter, one hand on the door. That is a real way to use this room.",
    },
    {
      n: "02",
      title: "So is a chess game.",
      copy: "The board is out, the pieces are not precious, and nobody is keeping score but you.",
    },
    {
      n: "03",
      title: "So is a long conversation.",
      copy: "The kind that starts about coffee and ends somewhere else entirely.",
    },
  ],
  pullQuote:
    "A café is one of the last rooms in a city where doing nothing is still allowed.",
} as const;

/* ------------------------------------------------------------ 08 invitation */

export const invitation = {
  index: "08",
  label: "Your move",
  kicker: "The door is open.",
  heading: "Find us.",
  lede:
    "Come for the coffee. Stay for the shelf, the wall, the board, and whatever else the afternoon turns into.",
  actions: [
    { label: "Plan your visit", href: "/visit", variant: "solid" },
    { label: "Browse the pantry", href: "/shop", variant: "ghost" },
  ],
  closing: "IRISCO · Pakistan",
} as const;

/* ----------------------------------------------------------------- marquee */

export const marquee = [
  "Coffee",
  "Bakery",
  "Pantry",
  "Gallery",
  "Conversation",
  "Chess",
  "Chai",
  "Slow afternoons",
] as const;

/* -------------------------------------------------------------- film assets */

const cinema = "/assets/irisco/cinema";
const opt = "/assets/irisco/optimized";

/** Semantic names for the four generated clips in public/assets/irisco/videos_v1. */
export type FilmSlug = "pour" | "product" | "macro" | "bakery";

export const film = {
  pour: {
    loopMp4: `${cinema}/pour-loop.mp4`,
    loopWebm: `${cinema}/pour-loop.webm`,
    mob: `${cinema}/pour-mob.mp4`,
    scrub: `${cinema}/pour-scrub.mp4`,
    poster: `${cinema}/pour-poster.jpg`,
    alt: "Slow-motion shot of espresso pouring into a ceramic cup",
  },
  product: {
    loopMp4: `${cinema}/product-loop.mp4`,
    loopWebm: `${cinema}/product-loop.webm`,
    mob: `${cinema}/product-mob.mp4`,
    scrub: `${cinema}/product-scrub.mp4`,
    poster: `${cinema}/product-poster.jpg`,
    alt: "Studio product motion study of a ceramic cup",
  },
  macro: {
    loopMp4: `${cinema}/macro-loop.mp4`,
    loopWebm: `${cinema}/macro-loop.webm`,
    mob: `${cinema}/macro-mob.mp4`,
    scrub: `${cinema}/macro-scrub.mp4`,
    poster: `${cinema}/macro-poster.jpg`,
    alt: "High-speed macro study of coffee texture",
  },
  bakery: {
    loopMp4: `${cinema}/bakery-loop.mp4`,
    loopWebm: `${cinema}/bakery-loop.webm`,
    mob: `${cinema}/bakery-mob.mp4`,
    scrub: `${cinema}/bakery-scrub.mp4`,
    poster: `${cinema}/bakery-poster.jpg`,
    alt: "Macro slow-motion study of freshly baked pastry",
  },
} as const satisfies Record<FilmSlug, Record<string, string>>;

export const photo = (name: string, size: 900 | 1600 = 1600) => `${opt}/${name}-${size}.webp`;

export const still = {
  pour: `${cinema}/still-pour-wide.jpg`,
  table: `${cinema}/still-table-wide.jpg`,
} as const;
