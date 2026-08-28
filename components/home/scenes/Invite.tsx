"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { invite, layer, photo } from "../content";

/**
 * 08 · Your move.
 *
 * Everything converges back on the cup. The ring that opened the counter closes
 * the page, the navy cup rises one last time, and the only thing left is a door.
 */
export function Invite() {
  return (
    <section className="h-invite" data-scene="invite" id="chapter-invite">
      <div className="h-invite-bg" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo("interior-gallery")} alt="" data-speed="0.85" loading="lazy" />
      </div>

      <svg className="h-invite-ring" viewBox="0 0 100 100" aria-hidden="true" data-draw-scope>
        <circle cx="50" cy="50" r="49.4" data-draw />
      </svg>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="h-invite-cup"
        src={layer.cupNavy}
        alt=""
        aria-hidden="true"
        data-speed="1.18"
        loading="lazy"
      />

      <div className="h-invite-inner" data-reveal-group>
        <div className="h-index" data-reveal>
          <b>{invite.index}</b> {invite.label}
        </div>
        <p className="h-kicker" data-reveal>
          {invite.kicker}
        </p>

        <h2 className="h-display h-invite-title" data-split>
          {invite.heading}
        </h2>

        <p className="h-lede" data-reveal>
          {invite.lede}
        </p>

        <div className="h-invite-actions" data-reveal>
          {invite.actions.map((action, i) => (
            <Link
              key={action.href}
              className={`h-btn ${i === 0 ? "solid" : "ghost"}`}
              href={action.href}
            >
              <span>{action.label}</span>
              <ArrowUpRight size={15} />
            </Link>
          ))}
        </div>

        <p className="h-invite-closing" data-reveal>
          {invite.closing}
        </p>
      </div>
    </section>
  );
}
