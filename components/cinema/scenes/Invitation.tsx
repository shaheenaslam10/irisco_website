"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { invitation, photo } from "../content";

/**
 * The last frame. The ring that opened the counter closes the page, the room
 * photograph settles behind it, and the only thing left is a door.
 */
export function Invitation() {
  return (
    <section
      className="c-finale tone-espresso"
      data-cinema-scene="invitation"
      id="chapter-invitation"
    >
      <div className="c-finale-bg" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo("interior-gallery")}
          alt=""
          data-finale-img
          loading="lazy"
          decoding="async"
        />
      </div>

      <svg className="c-finale-ring" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="49.5" data-finale-ring />
      </svg>

      <div className="c-finale-pin" data-finale-pin>
        <div className="c-finale-inner" data-reveal-group>
          <p className="c-index" data-reveal>
            <b>{invitation.index}</b> {invitation.label}
          </p>
          <p className="c-eyebrow bare" data-reveal>
            {invitation.kicker}
          </p>

          <h2 className="c-finale-title">
            <span className="c-line" data-reveal="mask">
              <span>{invitation.heading}</span>
            </span>
          </h2>

          <p className="c-lede" data-reveal>
            {invitation.lede}
          </p>

          <div className="c-finale-actions" data-reveal>
            {invitation.actions.map((action, i) => (
              <Link
                key={action.href}
                className={`c-btn ${i === 0 ? "solid" : "ghost"}`}
                href={action.href}
              >
                <span>{action.label}</span>
                <ArrowUpRight size={15} />
              </Link>
            ))}
          </div>

          <p className="c-finale-closing" data-reveal>
            {invitation.closing}
          </p>
        </div>
      </div>
    </section>
  );
}
