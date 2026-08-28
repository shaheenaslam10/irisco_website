"use client";

/**
 * TEMPORARY diagnostic. Renders only when the URL carries `?debug=1`.
 *
 * Reports the live state of the motion layer, the page geometry and every
 * clip on the page. Used to diagnose a headless-unfriendly environment; delete
 * once the main page is signed off.
 */
import { useEffect, useState } from "react";
import { chapters } from "../content";

type Row = { label: string; value: string };

const READY_STATE = ["NOTHING", "METADATA", "CURRENT", "FUTURE", "ENOUGH"];

export function DebugHud() {
  const [on, setOn] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    queueMicrotask(() =>
      setOn(new URLSearchParams(window.location.search).has("debug")),
    );
  }, []);

  useEffect(() => {
    if (!on) return;
    const tick = () => {
      const list: Row[] = [];
      const html = document.documentElement;

      list.push({ label: "cinema", value: html.dataset.cinema ?? "pending" });
      list.push({
        label: "js-motion",
        value: html.classList.contains("js-motion") ? "ON" : "off",
      });
      list.push({ label: "lenis", value: window.__lenis ? "active" : "none" });
      list.push({
        label: "scroll",
        value: `${Math.round(window.scrollY)} / ${Math.round(
          document.documentElement.scrollHeight - window.innerHeight,
        )}`,
      });
      list.push({
        label: "viewport",
        value: `${window.innerWidth}×${window.innerHeight}`,
      });

      chapters.forEach((chapter) => {
        const el = document.getElementById(`chapter-${chapter.id}`);
        if (!el) {
          list.push({ label: chapter.id, value: "MISSING" });
          return;
        }
        const r = el.getBoundingClientRect();
        const pinned = getComputedStyle(el.querySelector("[data-ritual-pin], [data-pantry-pin], [data-finale-pin]") ?? el).position;
        list.push({
          label: chapter.id,
          value: `top ${Math.round(r.top)} h ${Math.round(r.height)} ${
            r.bottom > 0 && r.top < window.innerHeight ? "INVIEW" : "—"
          } ${pinned === "fixed" ? "[PINNED]" : ""}`,
        });
      });

      document.querySelectorAll<HTMLVideoElement>("video.cv-video").forEach((video) => {
        const scene =
          video.closest("[data-cinema-scene]")?.getAttribute("data-cinema-scene") ?? "?";
        const src = video.currentSrc ? video.currentSrc.split("/").pop() : "none";
        list.push({
          label: `vid ${scene}`,
          value: `${video.dataset.mode ?? "?"} ${READY_STATE[video.readyState] ?? "?"} ${
            video.paused ? "paused" : "playing"
          } t=${video.currentTime.toFixed(2)} ${src}`,
        });
      });

      setRows(list);
    };

    tick();
    const id = window.setInterval(tick, 400);
    return () => window.clearInterval(id);
  }, [on]);

  if (!on) return null;

  return (
    <pre
      style={{
        position: "fixed",
        zIndex: 9999,
        left: 0,
        bottom: 0,
        maxHeight: "52vh",
        overflow: "auto",
        margin: 0,
        padding: "10px 12px",
        background: "rgba(0,0,0,.88)",
        color: "#8fd3ce",
        font: "11px/1.5 ui-monospace, Menlo, monospace",
        whiteSpace: "pre",
        pointerEvents: "auto",
      }}
    >
      {rows.map((r) => `${r.label.padEnd(12)} ${r.value}`).join("\n")}
    </pre>
  );
}
