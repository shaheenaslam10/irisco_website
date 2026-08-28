export const storyImage = (name: string, size = 1600) =>
  `/assets/irisco/optimized/${name}-${size}.webp`;

/**
 * The coffee ritual — the film's peak. Four frames drawn straight from the
 * counter: tamp, extraction, milk, cup. Each is a real step in one process, so
 * the motion between them is a sequence, not decoration.
 */
export const ritualFrames = [
  { image: "tamp", word: "Ground", note: "Dialled in by hand, dose by dose." },
  { image: "extraction", word: "Pulled", note: "A double shot, watched to the gram." },
  { image: "milk-pour", word: "Poured", note: "Steamed milk, folded in slow." },
  { image: "cortado-top", word: "Served", note: "At the counter, or carried to your table." },
] as const;

/**
 * Horizontal pantry shelf. Notes mirror the product copy in lib/content/site.ts;
 * the chilli-oil entry keeps its original Instagram filename as its image stem.
 */
export const pantryShelf = [
  { image: "product_honey", name: "Natural honey", note: "Golden jars for breakfast tables and slow cups of tea." },
  { image: "762018791_18118018009841859_137573672561098918_n", name: "Chilli oil", note: "Bold jars carrying heat, texture and a savoury finish." },
  { image: "product_flour", name: "Flours & grains", note: "Everyday staples arranged for better baking." },
  { image: "product_fragrance_candles", name: "Fragrance candles", note: "Quiet fragrance and warm light for another room." },
  { image: "table_rak", name: "Granola & oats", note: "Breakfast discoveries for slower mornings." },
] as const;
