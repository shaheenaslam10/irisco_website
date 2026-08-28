"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { pantry, photo } from "../content";

/**
 * 05 · The pantry.
 *
 * Desktop pins the section and converts vertical scroll into horizontal travel
 * along the shelf. On a phone it is an honest, snapping swipe — no pin, no
 * transform, no trap.
 */
export function Pantry() {
  return (
    <section className="h-pantry" data-scene="pantry" id="chapter-pantry">
      <div className="h-pantry-pin" data-pantry-pin>
        <header className="h-pantry-head" data-reveal-group>
          <div className="h-index" data-reveal>
            <b>{pantry.index}</b> {pantry.label}
          </div>
          <h2 className="h-h2" data-split>
            {pantry.heading}
          </h2>
          <p className="h-lede-sm" data-reveal>
            {pantry.lede}
          </p>
        </header>

        <div className="h-pantry-viewport" data-pantry-viewport>
          <div className="h-pantry-track" data-pantry-track>
            {pantry.shelf.map((item, i) => (
              <article className="h-pantry-card" key={item.name} data-pantry-card>
                <div className="h-pantry-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo(item.image)} alt={item.name} loading="lazy" decoding="async" />
                  <span className="h-pantry-no">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="h-pantry-meta">
                  <span className="h-pantry-cat">{item.category}</span>
                  <h3>{item.name}</h3>
                  <p>{item.note}</p>
                </div>
              </article>
            ))}

            <div className="h-pantry-end">
              <p>And whatever else the shelf decides to carry this month.</p>
              <Link className="h-btn amber" href={pantry.action.href}>
                <span>{pantry.action.label}</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        <div className="h-pantry-foot">
          <span>Scroll to move the shelf</span>
          <span className="h-pantry-progress" aria-hidden="true">
            <i data-pantry-progress />
          </span>
          <span>{String(pantry.shelf.length).padStart(2, "0")} things worth taking home</span>
        </div>
      </div>
    </section>
  );
}
