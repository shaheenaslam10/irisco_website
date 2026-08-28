"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Renders children into `document.body`.
 *
 * Needed because ScrollSmoother translates `#smooth-content`, and a translated
 * ancestor becomes the containing block for `position: fixed` — so any fixed
 * chrome rendered inside the page would scroll away with the content.
 *
 * Returns null on the server; the portal appears after mount.
 */
export function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  if (!mounted) return null;
  return createPortal(children, document.body);
}
