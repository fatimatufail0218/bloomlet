"use client";

import type { CSSProperties } from "react";
import { FlowerArt } from "@/components/flowers/FlowerArt";
import { MOBILE_POS } from "@/lib/data/flowers";
import { round } from "@/lib/svg-utils";
import type { Field, Flower } from "@/lib/types";
import { GrassFringe, MeadowBackdrop, Motes, Specks, Tuft } from "./decor";
import { Arrow } from "@/components/ui/Arrow";

/* CSS variables shared by a garden flower and its grass tuft */
function plantStyle(flower: Flower, index: number): CSSProperties {
  const mobile = MOBILE_POS.get(flower.id) ?? { x: 50, y: 50 };
  return {
    "--x": `${flower.x}%`,
    "--y": `${flower.y}%`,
    "--mx": `${mobile.x}%`,
    "--my": `${mobile.y}%`,
    "--zd": String(Math.round(flower.y)),
    "--zm": String(Math.round(mobile.y)),
    "--size": String(flower.size),
    "--rotation": `${flower.rotation}deg`,
    "--delay": `${round(-((index * 1.7) % 8))}s`,
    "--tone": flower.color,
  } as CSSProperties;
}

export function FlowerField({
  field,
  counts,
  isFull,
  onAdd,
}: {
  field: Field;
  counts: Map<number, number>;
  isFull: boolean;
  onAdd: (id: number) => void;
}) {
  return (
    <section className="garden-section" id={field.id}>
      <div className="section-heading">
        <div>
          <p className="eyebrow">The flower field · No. {field.no}</p>
          <h2>{field.title}</h2>
        </div>
        <p className="field-instruction">
          {field.lines[0]}
          <br />
          {field.lines[1]}
        </p>
      </div>

      <div className="meadow" style={{ "--mh": String(field.mobileH) } as CSSProperties}>
        <MeadowBackdrop />
        <div className="sun-wash" aria-hidden="true" />
        <div className="sun-rays" aria-hidden="true" />
        <Specks />
        <Motes />

        <div className="meadow-note meadow-note-top" aria-hidden="true">
          <span>{field.fig}</span>
          <span>{field.name}</span>
        </div>

        {field.flowers.map((flower, index) => (
          <Tuft key={`tuft-${flower.id}`} seed={flower.id} style={plantStyle(flower, index)} />
        ))}

        {field.flowers.map((flower, index) => {
          const count = counts.get(flower.id) ?? 0;
          const isPicked = count > 0;

          return (
            <button
              key={flower.id}
              type="button"
              className={`flower${isPicked ? " flower-picked" : ""}`}
              style={plantStyle(flower, index)}
              onClick={() => onAdd(flower.id)}
              aria-disabled={isFull}
              aria-label={`Add ${flower.name} (${flower.botanicalName}) to your bouquet${
                isPicked ? `, ${count} added so far` : ""
              }`}
              title={`${flower.name} · ${flower.botanicalName}`}
            >
              <span className="flower-halo" aria-hidden="true" />
              <span className="flower-art" aria-hidden="true">
                <span className="flower-sway">
                  <FlowerArt flower={flower} />
                </span>
              </span>
              {isPicked && (
                <span key={count} className="picked-mark" aria-hidden="true">
                  {count > 1 ? count : "✓"}
                </span>
              )}
              <span className="flower-label" aria-hidden="true">
                {flower.name}
              </span>
            </button>
          );
        })}

        <GrassFringe />

        <div className="meadow-note meadow-note-bottom" aria-hidden="true">
          <span>{field.flowers.length} varieties</span>
          <span>Pick as many as you like</span>
        </div>
      </div>

      <a className="btn field-next" href={field.next.href}>
  {field.next.label}
  <Arrow dir="down" />
</a>
    </section>
  );
}