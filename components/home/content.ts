/**
 * Main page copy.
 *
 * Motion code never owns words and words never own motion — scenes read from
 * this file so the story can be rewritten without touching a timeline.
 * Business facts come from `lib/content/site.ts`.
 */

export type ChapterId =
  | "arrival"
  | "idea"
  | "pour"
  | "craft"
  | "counter"
  | "pantry"
  | "room"
  | "table"
  | "invite";

export const chapters = [
  { id: "arrival" as const, index: "00", label: "Arrival" },
  { id: "idea" as const, index: "01", label: "The idea" },
  { id: "pour" as const, index: "02", label: "The pour" },
  { id: "room" as const, index: "03", label: "The room" },
  { id: "gallery" as const, index: "04", label: "The gallery" },
  { id: "counter" as const, index: "05", label: "The counter" },
  { id: "study" as const, index: "06", label: "The study" },
  { id: "pantry" as const, index: "07", label: "The pantry" },
  { id: "invite" as const, index: "08", label: "Your move" },
];

/* -------------------------------------------------------------- 00 arrival */

export const arrival = {
  index: "00",
  label: "Arrival",
  eyebrow: "IRISCO · Pakistan",
  lines: ["Part café.", "Part living room."],
  accent: "Entirely IRISCO.",
  lede:
    "Pulled to the gram. Baked by eight. Set on a table that has never once hurried anybody.",
  actions: [
    { label: "Plan your visit", href: "/visit" },
    { label: "See the menu", href: "/menu" },
  ],
  meta: ["Café", "Bakery", "Pantry", "Gallery", "Chess"],
  cue: "Scroll — the footage plays with you",
} as const;

/* ----------------------------------------------------------------- 01 idea */

export const idea = {
  index: "01",
  label: "The idea",
  kicker: "Not a coffee shop. A room with an opinion.",
  statement:
    "We built IRISCO on a suspicion — that a café can be the most useful room in a city. Somewhere to work, to argue gently, to read, to eat properly, to find a jar of something you did not know you needed, and to leave with a small piece of the place in your bag.",
  signature: "— The IRISCO team",
} as const;

/* ----------------------------------------------------------------- 02 pour */

export const pour = {
  index: "02",
  label: "The pour",
  heading: "Ninety seconds, no shortcuts.",
  lede:
    "This is the whole ritual, held still so you can actually look at it. Scroll and it pours. Scroll back and it pours backwards — the only honest way to show a process.",
  beats: [
    { n: "01", word: "Ground", note: "Dialled in by hand, dose by dose, before the door opens." },
    { n: "02", word: "Pulled", note: "A double shot watched to the gram. Wrong is wrong." },
    { n: "03", word: "Poured", note: "Milk folded in slow, until the surface goes quiet." },
    { n: "04", word: "Served", note: "Across the counter, or carried to the table you claimed." },
  ],
  closing: "It takes ninety seconds. In all this time, we have never once rushed it.",
} as const;

/* -------------------------------------------------------------- 05 counter */

export const counter = {
  index: "05",
  label: "The counter",
  heading: "Out of the oven by noon.",
  lede:
    "The bakery case is rewritten every morning. Whatever is standing in it was decided at five, baked by eight, and gone by whenever it is gone.",
  stats: [
    { value: "05:00", label: "Bakers in" },
    { value: "08:00", label: "First trays" },
    { value: "12:00", label: "At its best" },
    { value: "—", label: "Until it's gone" },
  ],
  action: { label: "Read the full menu", href: "/menu" },
} as const;

/* -------------------------------------------------------------- 04 gallery */

export const gallery = {
  index: "04",
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
      depth: 0.9,
    },
    {
      image: "room-hero",
      caption: "The seating",
      note: "Cobalt, low light, chairs built for sitting far longer than planned.",
      span: "wide",
      depth: 1.12,
    },
    {
      image: "boxes",
      caption: "The details",
      note: "Packaging, prints, and small objects that leave with people.",
      span: "wide",
      depth: 0.84,
    },
    {
      image: "main-counter",
      caption: "The counter",
      note: "Where the first order of the day is usually also the fastest.",
      span: "tall",
      depth: 1.2,
    },
  ],
} as const;

/* --------------------------------------------------------------- 07 pantry */

export const pantry = {
  index: "07",
  label: "The pantry",
  heading: "Coffee will lead you to the shelf.",
  lede:
    "You came in for a cortado. You are leaving with chilli oil. This happens constantly, and we stopped apologising for it years ago.",
  shelf: [
    {
      name: "Natural honey",
      category: "Honey & preserves",
      note: "Golden jars picked for breakfast tables, baking, and slow cups of tea.",
      image: "product_honey",
    },
    {
      name: "Chilli oil",
      category: "Oils & sauces",
      note: "Bold jars carrying heat, texture, and a generous savoury finish.",
      image: "762018791_18118018009841859_137573672561098918_n",
    },
    {
      name: "Flours & grains",
      category: "Flours & grains",
      note: "Everyday staples arranged for better baking and slower cooking.",
      image: "product_flour",
    },
    {
      name: "Fragrance candles",
      category: "Candles & fragrance",
      note: "Quiet fragrance and warm light, chosen as an object for another room.",
      image: "product_fragrance_candles",
    },
    {
      name: "Granola & oats",
      category: "Oats & granola",
      note: "Breakfast discoveries gathered along the natural pantry wall.",
      image: "table_rak",
    },
  ],
  action: { label: "Browse the pantry", href: "/shop" },
} as const;

/* ----------------------------------------------------------------- 03 room */

export const room = {
  index: "03",
  label: "The room",
  lines: ["Deep teal walls.", "A chandelier that does not", "know it is in a café."],
  note:
    "Cobalt seating, warm bulbs, and a portrait watching the door. The room was built to feel like somewhere you have already been welcomed.",
  frames: [
    { image: "interior-gallery", caption: "The long room", note: "Teal, brass, and a chandelier doing far more work than it needs to.", span: "tall", depth: 0.9 },
    { image: "room-hero", caption: "The seating", note: "Cobalt, low light, chairs built for sitting far longer than planned.", span: "wide", depth: 1.15 },
    { image: "boxes", caption: "The details", note: "Packaging, prints, and small objects that leave with people.", span: "wide", depth: 0.8 },
    { image: "main-counter", caption: "The counter", note: "Where the first order of the day is usually also the fastest.", span: "tall", depth: 1.25 },
  ],
} as const;

/* ---------------------------------------------------------------- 08 invite */

export const invite = {
  index: "08",
  label: "Your move",
  kicker: "The door is open.",
  heading: "Find us.",
  lede:
    "Come for the coffee. Stay for the shelf, the wall, the board, and whatever else the afternoon turns into.",
  actions: [
    { label: "Plan your visit", href: "/visit" },
    { label: "Browse the pantry", href: "/shop" },
  ],
  closing: "IRISCO · Pakistan",
} as const;

/* ---------------------------------------------------------------- 06 study */

export const study = {
  index: "06",
  label: "The study",
  heading: "Held still, so you can see it.",
  lede:
    "Shot at high speed and played back slowly, the same ninety seconds look completely different. This one is yours to run — scroll and it moves.",
  notes: [
    "The crema forms, then settles into something like glass.",
    "Heat lifts off the surface faster than the eye can follow.",
    "Nothing here is retouched. It just needed slowing down.",
  ],
  /** The high-speed macro clip from videos_v1. */
  film: "macro" as const,
};

/* ------------------------------------------------------------------- quote */

export const quote = {
  text: "A café is one of the last rooms in a city where doing nothing is still allowed.",
} as const;

/* ------------------------------------------------------------------ marquee */

export const marquee = [
  "Coffee", "Bakery", "Pantry", "Gallery", "Conversation", "Chess", "Slow afternoons",
] as const;

/* -------------------------------------------------------------------- media */

const opt = "/assets/irisco/optimized";
const cinema = "/assets/irisco/cinema";

export const photo = (name: string, size: 900 | 1600 = 1600) => `${opt}/${name}-${size}.webp`;

/**
 * The four generated clips.
 *
 * `scrub` tracks are all-intra at 12fps — every frame independently decodable,
 * so a ScrollTrigger can seek them frame-accurately with no stutter. `loop`
 * tracks are seamless ping-pong (forward + reversed) for ambient beds. One
 * streaming file instead of forty image requests: far lighter on the network
 * and on the main thread.
 */
export type FilmSlug = "pour" | "product" | "macro" | "bakery" | "feature";

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
    alt: "Studio product study of a ceramic cup",
  },
  macro: {
    loopMp4: `${cinema}/macro-loop.mp4`,
    loopWebm: `${cinema}/macro-loop.webm`,
    mob: `${cinema}/macro-mob.mp4`,
    scrub: `${cinema}/macro-scrub.mp4`,
    poster: `${cinema}/macro-poster.jpg`,
    alt: "Macro study of coffee texture",
  },
  /**
   * `videos_v1/video.mp4` — a square (960x960), bright, light-background
   * product clip. Because it reads as a lit object rather than a plate, it is
   * used as a framed panel in the hero, never as a full-bleed backdrop: at
   * full bleed its near-white ground would blow out the dark page.
   */
  feature: {
    loopMp4: `${cinema}/feature-loop.mp4`,
    loopWebm: `${cinema}/feature-loop.webm`,
    mob: `${cinema}/feature-mob.mp4`,
    scrub: `${cinema}/feature-loop.mp4`,
    poster: `${cinema}/feature-poster.jpg`,
    alt: "An IRISCO cup, lit and turning",
  },
  bakery: {
    loopMp4: `${cinema}/bakery-loop.mp4`,
    loopWebm: `${cinema}/bakery-loop.webm`,
    mob: `${cinema}/bakery-mob.mp4`,
    scrub: `${cinema}/bakery-scrub.mp4`,
    poster: `${cinema}/bakery-poster.jpg`,
    alt: "Macro study of freshly baked pastry",
  },
} as const satisfies Record<FilmSlug, Record<string, string>>;
