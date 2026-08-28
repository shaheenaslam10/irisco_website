"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { invite, photo } from "../content";

/**
 * 07 · Your move.
 *
 * The ring that opened the counter closes the page, the long room sits
 * behind it, and the only thing left is a door.
 */
export function Invite() {
  return (
    <section className="h-invite" data-scene="invite" id="chapter-invite">
      {/*
        Was a video plate, which went soft at full width behind the ring. A
        sharp interior photograph holds its detail at any size, and reads as a
        room rather than as smeared footage.
      */}
      <div className="h-invite-bg" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo("interior-gallery")} alt="" loading="lazy" decoding="async" />
      </div>

      <svg className="h-invite-ring" viewBox="0 0 100 100" aria-hidden="true" data-draw-scope>
        <circle cx="50" cy="50" r="49.4" data-draw />
      </svg>

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
