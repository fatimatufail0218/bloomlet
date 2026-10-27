"use client";

import type { Ref } from "react";
import { BouquetStage } from "@/components/bouquet/BouquetStage";
import { FlowerArt } from "@/components/flowers/FlowerArt";
import { ColorChoice } from "@/components/ui/ColorChoice";
import { QtyControl } from "@/components/ui/QtyControl";
import { MAX_STEMS } from "@/lib/bouquet-layout";
import { PAPERS, RIBBONS } from "@/lib/data/options";
import type { BouquetItem, Design, Flower, FillerId } from "@/lib/types";
import { FillerGroup } from "./FillerGroup";
import { StyleGroup } from "./StyleGroup";
import { Arrow } from "@/components/ui/Arrow";

export function BouquetBuilder({
  items,
  distinct,
  counts,
  isFull,
  design,
  onDesignChange,
  onAdd,
  onRemoveOne,
  onClear,
  onBack,
  onNext,
  headingRef,
}: {
  items: BouquetItem[];
  distinct: Flower[];
  counts: Map<number, number>;
  isFull: boolean;
  design: Design;
  onDesignChange: (patch: Partial<Design>) => void;
  onAdd: (id: number) => void;
  onRemoveOne: (id: number) => void;
  onClear: () => void;
  onBack: () => void;
  onNext: () => void;
  headingRef: Ref<HTMLHeadingElement>;
}) {
  const count = items.length;
  const noun = count === 1 ? "flower" : "flowers";

  function toggleFiller(id: FillerId) {
    const next = design.fillers.includes(id)
      ? design.fillers.filter((item) => item !== id)
      : [...design.fillers, id];
    onDesignChange({ fillers: next });
  }

  return (
    <section className="bouquet-section" aria-labelledby="bouquet-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Your bouquet · No. 03</p>
          <h2 id="bouquet-title" className="bouquet-heading" ref={headingRef} tabIndex={-1}>
            Make it yours.
          </h2>
        </div>
        <button type="button" className="btn btn-sm" onClick={onBack}>
  <Arrow dir="left" />
  Back to the flowers
</button>
      </div>

      <div className="bouquet-layout">
        <BouquetStage items={items} design={design} />

        <div className="bouquet-panel">
          <p className="visually-hidden" role="status">
            {count} {noun} in your bouquet{isFull ? ". The bouquet is full." : ""}
          </p>

          <div className="panel-block">
            <StyleGroup value={design.style} onChange={(style) => onDesignChange({ style })} />
          </div>

          {design.style !== "bow" && (
            <div className="panel-block">
              <ColorChoice
                legend="Wrapping paper"
                name="paper"
                options={PAPERS}
                value={design.paper}
                onChange={(paper) => onDesignChange({ paper })}
              />
            </div>
          )}

          <div className="panel-block">
            <ColorChoice
              legend="Ribbon & bow"
              name="ribbon"
              options={RIBBONS}
              value={design.ribbon}
              onChange={(ribbon) => onDesignChange({ ribbon })}
            />
          </div>

          <div className="panel-block">
            <FillerGroup
              selected={design.fillers}
              butterflyColors={design.butterflyColors}
              onToggle={toggleFiller}
              onButterflyColors={(butterflyColors) => onDesignChange({ butterflyColors })}
            />
          </div>

          <div className="panel-block">
            <h3 className="panel-title">
              In this bouquet{" "}
              <span className="panel-count">
                {count.toString().padStart(2, "0")} / {MAX_STEMS}
              </span>
            </h3>

            {count === 0 ? (
              <p className="panel-empty">
                There is nothing in your bouquet yet. Go back to the flowers and pick a few.
              </p>
            ) : (
              <>
                <ul className="bouquet-list">
                  {distinct.map((flower) => (
                    <li key={flower.id}>
                      <div className="picked-item">
                        <span className="picked-thumb" aria-hidden="true">
                          <FlowerArt flower={flower} thumb />
                        </span>
                        <span className="picked-text">
                          <strong>{flower.name}</strong>
                          <small>{flower.botanicalName}</small>
                        </span>
                        <QtyControl
                          name={flower.name}
                          count={counts.get(flower.id) ?? 0}
                          canAdd={!isFull}
                          onAdd={() => onAdd(flower.id)}
                          onRemove={() => onRemoveOne(flower.id)}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="panel-note">
                  {isFull
                    ? `Your bouquet is full (${MAX_STEMS} stems). Remove one to make room.`
                    : "The first flower you picked sits at the heart of the bouquet."}
                </p>
                <button type="button" className="link-button link-small" onClick={onClear}>
                  Clear the bouquet
                </button>
              </>
            )}
          </div>

          <div className="panel-actions">
            <button type="button" className="btn btn-primary" onClick={onNext} disabled={count === 0}>
              Write a note →
            </button>
            <button type="button" className="btn" onClick={onBack}>
              Pick more flowers
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}