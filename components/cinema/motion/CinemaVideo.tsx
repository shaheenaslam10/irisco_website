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
 * A generated clip, delivered responsibly.
 *
 * - The poster JPEG is the real first paint; the video fades over it once it
 *   can actually play, so there is never a black hole in the layout.
 * - The <video> element always exists (so ScrollTrigger can bind to it), but
 *   its sources are only attached when it nears the viewport — four clips never
 *   compete for bandwidth at once.
 * - Small screens get the half-width `-mob` encode.
 * - `prefers-reduced-motion` never arms a source at all: the poster *is* the
 *   art direction.
 */
export const CinemaVideo = forwardRef<HTMLVideoElement, Props>(function CinemaVideo(
  { slug, mode = "ambient", className, posterClassName, priority = false, alt, margin = 400, ...rest },
  ref,
) {
  const clip = film[slug];
  const hostRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(priority);
  const [isSmall, setIsSmall] = useState(false);
  const [ready, setReady] = useState(false);

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
      setArmed(true);
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

  // Publish the element, load the sources, start ambient playback.
  useEffect(() => {
    const video = innerRef.current;
    if (!video) return;
    if (typeof ref === "function") ref(video);
    else if (ref) (ref as React.MutableRefObject<HTMLVideoElement | null>).current = video;
    if (!armed) return;

    video.load();
    if (mode !== "ambient") return;

    const play = () => void video.play().catch(() => undefined);
    play();
    // A few browsers refuse autoplay until the first real interaction.
    if (video.paused) window.addEventListener("pointerdown", play, { once: true });
    return () => window.removeEventListener("pointerdown", play);
  }, [armed, isSmall, mode, ref]);

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
        preload={armed ? (mode === "scrub" ? "auto" : "metadata") : "none"}
        tabIndex={-1}
        aria-hidden="true"
        onCanPlay={() => setReady(true)}
        onLoadedData={() => setReady(true)}
      >
        {armed
          ? sources.map((s) => <source key={s.src} src={s.src} type={s.type} />)
          : null}
      </video>
    </div>
  );
});
