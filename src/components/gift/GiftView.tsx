"use client";

import type { Ref } from "react";
import { BouquetStage } from "@/components/bouquet/BouquetStage";
import { NoteCard } from "@/components/note/NoteCard";
import { flowerById } from "@/lib/data/flowers";
import type { BouquetItem, GiftData } from "@/lib/types";

export function GiftView({
  gift,
  onMakeOwn,
  headingRef,
}: {
  gift: GiftData;
  onMakeOwn: () => void;
  headingRef: Ref<HTMLHeadingElement>;
}) {
  const items: BouquetItem[] = gift.stems.flatMap((id, index) => {
    const flower = flowerById.get(id);
    return flower ? [{ key: index + 1, flower }] : [];
  });
  const { to, from, message, color } = gift.note;

  return (
    <section className="bouquet-section gift-section" aria-labelledby="gift-title">
      <header className="gift-head">
        <p className="eyebrow">{from ? `${from} sent you a bouquet` : "Someone sent you a bouquet"}</p>
        <h2 id="gift-title" className="gift-title" ref={headingRef} tabIndex={-1}>
          {to ? (
            <>
              A bouquet for <em>{to}.</em>
            </>
          ) : (
            <>
              A bouquet <em>for you.</em>
            </>
          )}
        </h2>
      </header>

      <div className="gift-scene gift-side">
        <BouquetStage items={items} design={gift.design} />
        <NoteCard to={to} from={from} message={message} color={color} />
      </div>

      <div className="gift-actions">
        <p className="collection-hint">Want to send someone flowers too?</p>
        <button type="button" className="btn btn-primary" onClick={onMakeOwn}>
          Make a bouquet of your own
        </button>
      </div>
    </section>
  );
}