"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CinemaVideo } from "../motion/CinemaVideo";
import { pantry, photo } from "../content";

/**
 * A horizontal shelf. On desktop the section pins and the track is driven by
 * the scroll wheel; on a phone it becomes an honest, snapping swipe.
 */
export function Pantry() {
  return (
    <section className="c-pantry tone-teal" data-cinema-scene="pantry" id="chapter-pantry">
      <div className="c-pantry-bed" aria-hidden="true">
        <CinemaVideo slug="product" className="c-abs-fill" alt="" />
      </div>

      <div className="c-pantry-pin" data-pantry-pin>
        <div className="c-pantry-head" data-reveal-group>
          <p className="c-index" data-reveal>
            <b>{pantry.index}</b> {pantry.label}
          </p>
          <h2 className="c-h2" data-reveal>
            {pantry.heading}
          </h2>
          <p className="c-lede" data-reveal>
            {pantry.lede}
          </p>
        </div>

        <div className="c-pantry-viewport" data-pantry-viewport>
          <div className="c-pantry-track" data-pantry-track>
            {pantry.shelf.map((item, i) => (
              <article className="c-pantry-item" key={item.name} data-pantry-item>
                <div className="c-pantry-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo(item.image)}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="c-pantry-no">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="c-pantry-meta">
                  <span className="c-pantry-cat">{item.category}</span>
                  <h3 className="c-pantry-name">{item.name}</h3>
                  <p className="c-pantry-note">{item.note}</p>
                </div>
              </article>
            ))}

            <div className="c-pantry-end">
              <p>And whatever else the shelf decides to carry this month.</p>
              <Link className="c-btn amber" href={pantry.action.href}>
                <span>{pantry.action.label}</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        <div className="c-pantry-foot">
          <span>Scroll to move the shelf</span>
          <div className="c-pantry-progress" aria-hidden="true">
            <i data-pantry-progress />
          </div>
          <span>
            {String(pantry.shelf.length).padStart(2, "0")} things worth taking home
          </span>
        </div>
      </div>
    </section>
  );
}
