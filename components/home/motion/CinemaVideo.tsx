"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { film, type FilmSlug } from "../content";
import { REDUCED_QUERY } from "./gsapSetup";

type Props = Omit<React.HTMLAttributes<HTMLDivElement>, "children"> & {
  slug: FilmSlug;
  /** `ambient` autoplays and loops; `scrub` is frame-stepped by ScrollTrigger. */
  mode?: "ambient" | "scrub";
  className?: string;
  posterClassName?: string;
  /** Load immediately instead of waiting for the viewport (hero only). */
  priority?: boolean;
  alt?: string;
  /** Extra margin (px) used to arm the source before the element scrolls in. */
  margin?: number;
};

const SMALL_SCREEN = "(max-width: 767px)";

/**
 * A generated clip, delivered responsibly — and, above all, *visibly*.
 *
 * Three failure modes this component is built to survive:
 *
 * 1. **Media events firing before hydration.** The <video> is server-rendered,
 *    so `canplay` can land before React attaches its listeners. We therefore
 *    read `readyState` on mount instead of waiting for an event, and we never
 *    gate visibility on a ready flag — the element carries its own `poster`,
 *    so it paints an image from the first frame of its existence.
 * 2. **Autoplay being refused.** Cross-origin preview iframes and strict
 *    browser settings block autoplay even when muted. We mute imperatively,
 *    attempt playback, then retry on the first real sign of user activity and
 *    whenever the tab becomes visible again.
 * 3. **Scrubbed clips never painting.** A clip that is only ever seeked shows
 *    nothing until it is seeked once, so we nudge `currentTime` off zero.
 *
 * On top of that: sources arm near the viewport, small screens get the
 * half-width encode, and `prefers-reduced-motion` never arms a source at all —
 * for those visitors the poster *is* the art direction.
 */
export const CinemaVideo = forwardRef<HTMLVideoElement, Props>(function CinemaVideo(
  { slug, mode = "ambient", className, posterClassName, priority = false, alt, margin = 400, ...rest },
  ref,
) {
  const clip = film[slug];
  const hostRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLVideoElement>(null);
  const loadedSrc = useRef<string>("");
  const [armed, setArmed] = useState(priority);
  const [isSmall, setIsSmall] = useState(false);
  const [ready, setReady] = useState(false);

  // Publish the element to whichever scene asked for it.
  useEffect(() => {
    const video = innerRef.current;
    if (!video) return;
    if (typeof ref === "function") ref(video);
    else if (ref) (ref as React.MutableRefObject<HTMLVideoElement | null>).current = video;
  }, [ref]);

  // Small-screen encode switch.
  useEffect(() => {
    const mq = window.matchMedia(SMALL_SCREEN);
    const sync = () => setIsSmall(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Arm the source when the section approaches.
  useEffect(() => {
    if (priority) return;
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia(REDUCED_QUERY).matches) return;
    if (typeof IntersectionObserver === "undefined") {
      queueMicrotask(() => setArmed(true));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setArmed(true);
          io.disconnect();
        }
      },
      { rootMargin: `${margin}px 0px` },
    );
    io.observe(host);
    return () => io.disconnect();
  }, [margin, priority]);

  // Attach sources, then start (or prime) playback.
  useEffect(() => {
    const video = innerRef.current;
    if (!video || !armed) return;

    // Set imperatively too: a handful of engines evaluate the autoplay policy
    // before React's own property assignment lands.
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const desired =
      mode === "ambient"
        ? isSmall
          ? clip.mob
          : clip.loopMp4
        : clip.scrub;

    // Swapping <source> children does not re-run source selection — only
    // `load()` does — so reload only when the target actually changed.
    if (loadedSrc.current !== desired) {
      loadedSrc.current = desired;
      video.load();
    }

    // Failure mode 1: the element may already be playable.
    if (video.readyState >= 2) setReady(true);
    const onReady = () => setReady(true);
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);
    video.addEventListener("playing", onReady);

    if (mode !== "ambient") {
      // Failure mode 3: nothing paints until the clip is seeked once.
      const prime = () => {
        if (video.duration && video.currentTime < 0.02) video.currentTime = 0.001;
      };
      video.addEventListener("loadedmetadata", prime);
      prime();
      return () => {
        video.removeEventListener("loadeddata", onReady);
        video.removeEventListener("canplay", onReady);
        video.removeEventListener("playing", onReady);
        video.removeEventListener("loadedmetadata", prime);
      };
    }

    // Failure mode 2: autoplay refused.
    const kick = () => {
      video.muted = true;
      const attempt = video.play();
      if (attempt && typeof attempt.catch === "function") attempt.catch(() => undefined);
    };
    kick();

    const triggers = ["pointerdown", "touchstart", "keydown", "wheel", "scroll"] as const;
    triggers.forEach((type) => window.addEventListener(type, kick, { passive: true, once: true }));
    const onVisible = () => {
      if (!document.hidden) kick();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("playing", onReady);
      triggers.forEach((type) => window.removeEventListener(type, kick));
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [armed, isSmall, mode, clip]);

  const sources =
    mode === "ambient"
      ? isSmall
        ? [{ src: clip.mob, type: "video/mp4" }]
        : [
            { src: clip.loopWebm, type: "video/webm" },
            { src: clip.loopMp4, type: "video/mp4" },
          ]
      : [{ src: clip.scrub, type: "video/mp4" }];

  return (
    <div
      ref={hostRef}
      className={`cv${className ? ` ${className}` : ""}`}
      data-mode={mode}
      data-armed={armed ? "true" : "false"}
      {...rest}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`cv-poster${posterClassName ? ` ${posterClassName}` : ""}`}
        src={clip.poster}
        alt={alt ?? clip.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
      <video
        ref={innerRef}
        className="cv-video"
        data-ready={ready ? "true" : "false"}
        poster={clip.poster}
        muted
        loop={mode === "ambient"}
        autoPlay={mode === "ambient"}
        playsInline
        preload={armed ? (mode === "scrub" ? "auto" : "auto") : "none"}
        tabIndex={-1}
        aria-hidden="true"
      >
        {armed
          ? sources.map((s) => <source key={s.src} src={s.src} type={s.type} />)
          : null}
      </video>
    </div>
  );
});
