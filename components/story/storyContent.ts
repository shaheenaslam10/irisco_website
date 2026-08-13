export const storyImage = (name: string, size = 1600) =>
  `/assets/irisco/optimized/${name}-${size}.webp`;

export const menuHighlights = [
  "Espresso-based coffee",
  "Cakes & slices",
  "Croissants & pastries",
  "Sandwiches & savoury bites",
] as const;

export const bakeryNotes = ["baked", "layered", "shared"] as const;

export const chandelierBulbs = [220, 310, 400, 500, 600, 690, 780] as const;

export const chilliParticleCount = 13;
export const chessCellCount = 64;

export const finalTiles = [
  { className: "tile-cup", image: "logo_with_cups", size: 900, alt: "IRISCO coffee", sizes: "40vw" },
  { className: "tile-bake", image: "main-counter", size: 900, alt: "IRISCO bakery", sizes: "30vw" },
  { className: "tile-honey", image: "product_honey", size: 900, alt: "Honey", sizes: "28vw" },
  { className: "tile-candle", image: "product_fragrance_candles", size: 900, alt: "Fragrance candles", sizes: "28vw" },
] as const;
