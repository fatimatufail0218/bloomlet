"use client";

import { FlowerArt } from "@/components/flowers/FlowerArt";
import { QtyControl } from "@/components/ui/QtyControl";
import { MAX_STEMS } from "@/lib/bouquet-layout";
import { COPY } from "@/lib/copy";
import type { Flower } from "@/lib/types";

export function Collection({
  distinct,
  counts,
  total,
  isFull,
  onAdd,
  onRemoveOne,
  onClear,
  onCreate,
}: {
  distinct: Flower[];
  counts: Map<number, number>;
  total: number;
  isFull: boolean;
  onAdd: (id: number) => void;
  onRemoveOne: (id: number) => void;
  onClear: () => void;
  onCreate: () => void;
}) {
  const { collection } = COPY;
  const countLabel = total.toString().padStart(2, "0");

  return (
    <section className="collection" id="your-picks">
      <div className="collection-heading">
        <div>
          <p className="eyebrow">{collection.eyebrow}</p>
          <h2>{collection.title}</h2>
        </div>
        <span className="collection-count">
          {countLabel} / {MAX_STEMS}
        </span>
      </div>

      <p className="visually-hidden" role="status">
        {total} {total === 1 ? "flower" : "flowers"} in your bouquet
        {isFull ? ". The bouquet is full." : ""}
      </p>

      {distinct.length === 0 ? (
        <p className="empty-collection">
          {collection.emptyTop}
          <br />
          {collection.emptyBottom}
        </p>
      ) : (
        <div className="picked-list">
          {distinct.map((flower) => (
            <div key={flower.id} className="picked-item">
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
          ))}
        </div>
      )}

      <div className="collection-actions">
        <button type="button" className="btn btn-primary" disabled={total === 0} onClick={onCreate}>
          {collection.cta}
        </button>
        {total === 0 && <span className="collection-hint">{collection.needOne}</span>}
        {isFull && (
          <span className="collection-hint">
            Your bouquet is full ({MAX_STEMS} stems). Remove one to add another.
          </span>
        )}
        {total > 0 && (
          <button type="button" className="link-button link-small" onClick={onClear}>
            Clear all
          </button>
        )}
      </div>

      <p className="collection-footnote">{collection.footnote}</p>
    </section>
  );
}