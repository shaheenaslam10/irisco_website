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
  { id: "craft" as const, index: "03", label: "The craft" },
  { id: "counter" as const, index: "04", label: "The counter" },
  { id: "pantry" as const, index: "05", label: "The pantry" },
  { id: "room" as const, index: "06", label: "The room" },
  { id: "table" as const, index: "07", label: "The table" },
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
  cue: "Scroll — the cup turns with you",
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

/* ---------------------------------------------------------------- 03 craft */

export const craft = {
  index: "03",
  label: "The craft",
  heading: "Four hands, one cup.",
  lede:
    "Nothing here is automated for speed. It is automated for consistency — and then finished by somebody paying attention.",
  steps: [
    {
      n: "01",
      title: "The bean",
      copy: "Selected, roasted, and rested. Ground only when there is a cup waiting for it.",
      image: "coffee-bean-assets-1600",
      layer: true,
    },
    {
      n: "02",
      title: "The dose",
      copy: "Weighed, distributed, tamped level. The single most boring step, and the one that matters.",
      image: "tamp",
    },
    {
      n: "03",
      title: "The shot",
      copy: "Pressed water, twenty-eight seconds, watched the whole way down.",
      image: "extraction",
    },
    {
      n: "04",
      title: "The finish",
      copy: "Steamed, poured, and carried across before the crema has time to think about it.",
      image: "milk-pour",
    },
  ],
} as const;

/* -------------------------------------------------------------- 04 counter */

export const counter = {
  index: "04",
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

/* --------------------------------------------------------------- 05 pantry */

export const pantry = {
  index: "05",
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

/* ----------------------------------------------------------------- 06 room */

export const room = {
  index: "06",
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

/* ---------------------------------------------------------------- 07 table */

export const table = {
  index: "07",
  label: "The table",
  heading: "Time is welcome here.",
  lede:
    "Most places are designed to move you along. This one is designed to lose track of you for a while — in the best way.",
  principles: [
    { n: "01", title: "A quick cup is welcome.", copy: "Ten minutes at the counter, one hand on the door. A real way to use this room." },
    { n: "02", title: "So is a chess game.", copy: "The board is out, the pieces are not precious, and nobody is keeping score but you." },
    { n: "03", title: "So is a long conversation.", copy: "The kind that starts about coffee and ends somewhere else entirely." },
  ],
  quote: "A café is one of the last rooms in a city where doing nothing is still allowed.",
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

/* ------------------------------------------------------------------ marquee */

export const marquee = [
  "Coffee", "Bakery", "Pantry", "Gallery", "Conversation", "Chess", "Slow afternoons",
] as const;

/* -------------------------------------------------------------------- media */

const opt = "/assets/irisco/optimized";
const gen = "/assets/irisco/generated";
const seq = "/assets/irisco/seq";

export const photo = (name: string, size: 900 | 1600 = 1600) => `${opt}/${name}-${size}.webp`;

/** Transparent product layers — the "objects that move on scroll" kit. */
export const layer = {
  bean: `${gen}/coffee-v2/coffee-bean-assets-1600.webp`,
  liquid: `${gen}/coffee-v2/coffee-liquid-assets-1600.webp`,
  steam: `${gen}/coffee-v2/coffee-steam-assets-1600.webp`,
  cupIvoryOpen: `${gen}/coffee-v2/irisco-cup-ivory-open-1600.webp`,
  lidNavy: `${gen}/coffee-v2/irisco-lid-navy-1600.webp`,
  cupNavy: `${gen}/coffee/irisco-navy-cup-1024.webp`,
  surface: `${gen}/coffee-v2/coffee-surface.png`,
  stone: `${gen}/coffee-v2/coffee-stone-surface-1600.webp`,
} as const;

/**
 * SWAP POINT — the real cup.
 *
 * Drop the exported model at `public/models/cup.glb` and set this to
 * `"/models/cup.glb"`. The scene normalises it automatically: centred on X/Z,
 * base sitting on the plinth, scaled to the composition's height, Draco and
 * Meshopt handled. Leave it `null` and the procedural lathe stands in.
 */
export const cupModel: string | null = null;

/** Scroll-scrubbed frame sequences, straight from the generated clips. */
export const sequence = {
  pour: { dir: `${seq}/pour`, frames: 40, poster: `${seq}/pour-poster.webp` },
  product: { dir: `${seq}/product`, frames: 44, poster: `${seq}/product-poster.webp` },
  macro: { dir: `${seq}/macro`, frames: 44, poster: `${seq}/macro-poster.webp` },
  bakery: { dir: `${seq}/bakery`, frames: 40, poster: `${seq}/bakery-poster.webp` },
} as const;

export type SequenceSlug = keyof typeof sequence;

export const frameSrc = (slug: SequenceSlug, index: number) =>
  `${sequence[slug].dir}/${String(index + 1).padStart(4, "0")}.webp`;
