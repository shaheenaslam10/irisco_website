/**
 * The IRISCO wordmark as live text — "iris" + "co." in the two brand colours,
 * recoloured per context (dark hero, light header, dark footer) via CSS. Kept
 * as text rather than a raster so it stays crisp and adapts to its surface.
 * Decorative: callers provide the accessible name (e.g. an aria-label on the
 * wrapping link), so this is marked aria-hidden to avoid double announcements.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={`brand-mark${className ? ` ${className}` : ""}`} aria-hidden="true">
      <span className="brand-iris">iris</span>
      <span className="brand-co">co.</span>
    </span>
  );
}
