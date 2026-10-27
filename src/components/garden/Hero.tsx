"use client";

import { Arrow } from "@/components/ui/Arrow";
import { COPY } from "@/lib/copy";
import { HeroSprig } from "./decor";

export function Hero() {
  const { hero } = COPY;

  return (
    <section className="hero">
      <HeroSprig className="hero-sprig-left" />
      <HeroSprig className="hero-sprig-right" />
      <div className="hero-copy">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>
          {hero.titleTop}
          <br />
          <em>{hero.titleEm}</em>
        </h1>
        <p className="hero-description">
          {hero.descTop}
          <br className="desktop-break" />
          {hero.descBottom}
        </p>
        <a href="#meadow" className="btn btn-lg scroll-cue">
          {hero.cue}
          <Arrow dir="down" />
        </a>
      </div>
    </section>
  );
}