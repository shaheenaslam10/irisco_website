"use client";

/**
 * A lightweight backdrop for chapters that used to carry a looping video.
 *
 * Footage is now reserved for the moments the scroll actually *plays*; these
 * backgrounds are pure CSS — soft radial blooms over the espresso ground,
 * drifting on long transform-only animations.
 *
 * Why this rather than video:
 *   • no bytes, no decode, no autoplay policy, nothing to preload
 *   • transform-only animation stays on the compositor — no layout, no paint
 *   • the hero's largest contentful paint becomes text, so the page is fast
 */

export function Backdrop({ variant = "warm" }: { variant?: "warm" | "cool" }) {
  return (
    <div className={`h-backdrop is-${variant}`} aria-hidden="true">
      <span className="h-blob h-blob-a" />
      <span className="h-blob h-blob-b" />
      <span className="h-blob h-blob-c" />
      <span className="h-backdrop-grain" />
    </div>
  );
}
