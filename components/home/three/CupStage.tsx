"use client";

/**
 * Hosts the WebGL cup, and guarantees the hero is never empty.
 *
 * Three things are handled here rather than in the scene itself:
 *
 *  • **Capability** — if WebGL is missing (or the context is refused), we show
 *    the layered 2.5D fallback built from the real transparent cup artwork.
 *  • **Cost** — the canvas only mounts while the hero is near the viewport, so
 *    the GPU is free for the rest of the story.
 *  • **The intro ramp** — one number, 0 → 1, that drives the whole assembly
 *    (cup rises, lid lifts, crema fills, steam starts, beans float in).
 */

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { layer } from "../content";

const CupScene = dynamic(() => import("./CupScene"), { ssr: false });

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

/** Layered 2.5D fallback — the same composition, built from real artwork. */
function CupFallback() {
  return (
    <div className="cup-fallback" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="cup-fb-stone" src={layer.stone} alt="" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="cup-fb-beans" src={layer.bean} alt="" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="cup-fb-cup" src={layer.cupNavy} alt="" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="cup-fb-steam" src={layer.steam} alt="" />
    </div>
  );
}

export function CupStage({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const intro = useRef(0);
  const [ready, setReady] = useState<"pending" | "webgl" | "flat">("pending");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const mode = supportsWebGL() ? "webgl" : "flat";
    queueMicrotask(() => setReady(mode));

    const host = hostRef.current;
    if (!host || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => setVisible(entries.some((e) => e.isIntersecting)),
      { rootMargin: "220px 0px" },
    );
    io.observe(host);
    return () => io.disconnect();
  }, []);

  // The assembly ramp. Plain rAF against a ref — no React state, no re-render.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      intro.current = 1;
      return;
    }
    let frame = 0;
    let start: number | null = null;
    const step = (now: number) => {
      if (start === null) start = now;
      const p = Math.min(1, (now - start) / 1900);
      // easeOutExpo — fast lift, long settle
      intro.current = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div ref={hostRef} className={`cup-stage${className ? ` ${className}` : ""}`} data-mode={ready}>
      {ready === "webgl" && visible ? (
        <CupScene intro={intro} className="cup-stage-canvas" />
      ) : null}
      {ready === "flat" ? <CupFallback /> : null}
    </div>
  );
}
