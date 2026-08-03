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
  { slug: "natural-honey", name: "Natural honey", category: "Honey & preserves", image: "/assets/irisco/optimized/product_honey-1600.webp", note: "A warm shelf of curated honey jars.", available: true },
  { slug: "chilli-oil", name: "Chilli oil selection", category: "Oils & sauces", image: "/assets/irisco/optimized/762018791_18118018009841859_137573672561098918_n-1600.webp", note: "Bold jars from the IRISCO pantry wall.", available: true },
  { slug: "pantry-flours", name: "Flours & grains", category: "Flours & grains", image: "/assets/irisco/optimized/product_flour-1600.webp", note: "Everyday pantry staples, carefully arranged.", available: true },
  { slug: "fragrance-candles", name: "Fragrance candles", category: "Candles & fragrance", image: "/assets/irisco/optimized/product_fragrance_candles-1600.webp", note: "Quiet fragrance and warm light for home.", available: true },
  { slug: "granola-and-oats", name: "Granola & oats", category: "Oats & granola", image: "/assets/irisco/optimized/table_rak-1600.webp", note: "Discoveries gathered on the pantry shelf.", available: false },
];

export const menuGroups = [
  { name: "Coffee ritual", items: ["Espresso-based coffee", "Handcrafted café drinks", "Cold coffee selection"] },
  { name: "From the bakery", items: ["Cakes & slices", "Croissants & pastries", "Brownies & baked treats"] },
  { name: "Café food", items: ["Sandwiches", "Light savoury bites", "Daily counter selection"] },
];
