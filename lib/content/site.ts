export const siteConfig = {
  name: "IRISCO",
  description: "A café, bakery, pantry, gallery, and place for conversation.",
  contact: {
    address: "Address to be confirmed",
    hours: "Opening hours to be confirmed",
    phone: "Contact number to be confirmed",
    whatsapp: "#",
    directions: "#",
  },
  socials: { instagram: "#", facebook: "#" },
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Pantry", href: "/shop" },
  { label: "IRISCO Space", href: "/space" },
  { label: "Visit", href: "/visit" },
];

export const categories = [
  "All",
  "Honey & preserves",
  "Oils & sauces",
  "Flours & grains",
  "Oats & granola",
  "Candles & fragrance",
  "Thoughtful objects",
];

export const products = [
  {
    slug: "natural-honey",
    name: "Natural honey",
    category: "Honey & preserves",
    image: "/assets/irisco/optimized/product_honey-1600.webp",
    note: "Golden jars selected for breakfast tables, baking, and slow cups of tea.",
    story: "A pantry staple presented with the same care as everything on the IRISCO counter: useful, beautiful, and ready to take home.",
    details: ["Curated pantry selection", "Ask about current jar sizes", "Availability may rotate"],
    available: true,
  },
  {
    slug: "chilli-oil",
    name: "Chilli oil selection",
    category: "Oils & sauces",
    image: "/assets/irisco/optimized/762018791_18118018009841859_137573672561098918_n-1600.webp",
    note: "Bold jars carrying heat, texture, and a generous savoury finish.",
    story: "Part of a rotating shelf of condiments and sauces chosen to make everyday meals more interesting.",
    details: ["Rotating flavour selection", "Made for gifting or the table", "Ask about current stock"],
    available: true,
  },
  {
    slug: "pantry-flours",
    name: "Flours & grains",
    category: "Flours & grains",
    image: "/assets/irisco/optimized/product_flour-1600.webp",
    note: "Everyday pantry staples arranged for better baking and thoughtful cooking.",
    story: "The shelf brings useful natural ingredients into the café experience—things to discover over coffee and continue using at home.",
    details: ["Multiple pantry varieties", "Pack sizes vary", "Ask the team for current selection"],
    available: true,
  },
  {
    slug: "fragrance-candles",
    name: "Fragrance candles",
    category: "Candles & fragrance",
    image: "/assets/irisco/optimized/product_fragrance_candles-1600.webp",
    note: "Quiet fragrance and warm light, selected as an object for home or a gift.",
    story: "IRISCO extends beyond food through small objects that carry atmosphere into another room.",
    details: ["Curated fragrance range", "Gift-ready choices", "Scents rotate in store"],
    available: true,
  },
  {
    slug: "granola-and-oats",
    name: "Granola & oats",
    category: "Oats & granola",
    image: "/assets/irisco/optimized/table_rak-1600.webp",
    note: "Breakfast discoveries gathered across IRISCO’s natural pantry wall.",
    story: "A practical shelf of grains and breakfast ingredients, brought together for slower mornings and everyday routines.",
    details: ["Selection changes regularly", "Ask about ingredients", "Availability to be confirmed"],
    available: false,
  },
] as const;

export const menuGroups = [
  {
    name: "Coffee ritual",
    number: "01",
    introduction: "From the first espresso of the day to a cold afternoon cup.",
    items: [
      { name: "Espresso", note: "Short, focused, and made to order" },
      { name: "Americano", note: "Espresso opened with hot water" },
      { name: "Cappuccino", note: "Coffee, warm milk, generous foam" },
      { name: "Latte", note: "Smooth espresso and steamed milk" },
      { name: "Cold coffee", note: "A chilled counter favourite" },
    ],
  },
  {
    name: "From the bakery",
    number: "02",
    introduction: "Layers, slices, and baked things chosen from the daily counter.",
    items: [
      { name: "Cakes & slices", note: "Ask what is fresh today" },
      { name: "Croissants", note: "Flaky layers from the pastry case" },
      { name: "Brownies", note: "Rich, compact, and coffee-ready" },
      { name: "Cookies", note: "A small companion for the table" },
    ],
  },
  {
    name: "Savoury counter",
    number: "03",
    introduction: "Light food for quick stops, longer meetings, and everything between.",
    items: [
      { name: "Sandwiches", note: "Prepared in rotating combinations" },
      { name: "Savoury bakes", note: "The warm side of the bakery case" },
      { name: "Daily bites", note: "Ask the counter for today’s selection" },
    ],
  },
  {
    name: "Something cool",
    number: "04",
    introduction: "Bright, refreshing drinks for the warmer part of the day.",
    items: [
      { name: "Iced coffee", note: "Coffee served cold and clean" },
      { name: "Seasonal coolers", note: "Rotating flavours and fresh notes" },
      { name: "Cold counter selection", note: "Ask what is pouring today" },
    ],
  },
];

export const spacePrinciples = [
  { number: "01", title: "Culture, present tense", copy: "Pakistani memory and contemporary café life share the same room." },
  { number: "02", title: "Discovery on every shelf", copy: "Coffee can lead to a pantry jar, a fragrance, a book, or a new idea." },
  { number: "03", title: "Time is welcome", copy: "A quick cup is welcome. So is a chess game or a conversation that runs long." },
];
