/**
 * A tiny mutable store shared between ScrollTrigger (which writes) and the
 * WebGL render loop (which reads).
 *
 * Deliberately not React state: the hero cup re-renders 60 times a second, and
 * pushing that through the reconciler would be absurd. Plain numbers, mutated
 * in place, read inside `useFrame`.
 */
export const scrollState = {
  /** 0 → 1 across the whole document. */
  page: 0,
  /** 0 → 1 across the hero chapter. */
  hero: 0,
  /** 0 → 1 across the pinned pour chapter. */
  pour: 0,
  /** Signed scroll velocity, normalised roughly to -1…1. */
  velocity: 0,
};

export type ScrollStateKey = keyof typeof scrollState;

export function setScroll<K extends ScrollStateKey>(key: K, value: number) {
  scrollState[key] = value;
}
