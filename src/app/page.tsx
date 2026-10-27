"use client";

import { useEffect, useRef, useState } from "react";
import { BouquetBuilder } from "@/components/builder/BouquetBuilder";
import { Collection } from "@/components/garden/Collection";
import { FlowerField } from "@/components/garden/FlowerField";
import { Hero } from "@/components/garden/Hero";
import { GiftView } from "@/components/gift/GiftView";
import { Footer } from "@/components/layout/Footer";
import { Topbar } from "@/components/layout/Topbar";
import { NoteStudio } from "@/components/note/NoteStudio";
import { useGiftFromUrl } from "@/hooks/useGiftFromUrl";
import { MAX_STEMS } from "@/lib/bouquet-layout";
import { COPY } from "@/lib/copy";
import { FIELDS } from "@/lib/data/fields";
import { flowerById } from "@/lib/data/flowers";
import { DEFAULT_DESIGN, DEFAULT_NOTE } from "@/lib/data/options";
import { hand } from "@/lib/fonts";
import { encodeGift } from "@/lib/gift";
import type { BouquetItem, Design, Flower, GiftData, Note, StemEntry, View } from "@/lib/types";

export default function Home() {
  // every entry is one stem, so the same flower can be added many times
  const [stems, setStems] = useState<StemEntry[]>([]);
  const [view, setView] = useState<View>("garden");
  const [design, setDesign] = useState<Design>(DEFAULT_DESIGN);
  const [note, setNote] = useState<Note>(DEFAULT_NOTE);

  // the created link (remembered together with the gift it was made for)
  const [share, setShare] = useState<{ code: string; url: string } | null>(null);
  const [creating, setCreating] = useState(false);

  const { gift, status, origin, clear } = useGiftFromUrl();

  const nextKey = useRef(1);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasSwitchedView = useRef(false);

  const updateDesign = (patch: Partial<Design>) => setDesign((current) => ({ ...current, ...patch }));
  const updateNote = (patch: Partial<Note>) => setNote((current) => ({ ...current, ...patch }));

  function addFlower(id: number) {
    const key = nextKey.current++;
    setStems((current) => (current.length >= MAX_STEMS ? current : [...current, { key, flowerId: id }]));
  }

  function removeOne(id: number) {
    setStems((current) => {
      const index = current.map((stem) => stem.flowerId).lastIndexOf(id);
      return index < 0 ? current : current.filter((_, i) => i !== index);
    });
  }

  function changeView(next: View) {
    hasSwitchedView.current = true;
    setView(next);
  }

  function leaveGift() {
    hasSwitchedView.current = true;
    clear();
    setView("garden");
  }

  const showing = gift ? "gift" : view;

  // Move the reader to the right place after switching screens.
  useEffect(() => {
    if (!hasSwitchedView.current) return;
    if (showing === "garden") {
      document.getElementById("meadow")?.scrollIntoView({ block: "start" });
    } else {
      window.scrollTo({ top: 0 });
      headingRef.current?.focus({ preventScroll: true });
    }
  }, [showing]);

  const counts = new Map<number, number>();
  for (const stem of stems) counts.set(stem.flowerId, (counts.get(stem.flowerId) ?? 0) + 1);

  // distinct flowers, in the order they were first picked
  const distinctFlowers = Array.from(new Set(stems.map((stem) => stem.flowerId)))
    .map((id) => flowerById.get(id))
    .filter((flower): flower is Flower => Boolean(flower));

  const bouquetItems: BouquetItem[] = stems.flatMap((stem) => {
    const flower = flowerById.get(stem.flowerId);
    return flower ? [{ key: stem.key, flower }] : [];
  });

  const total = stems.length;
  const isFull = total >= MAX_STEMS;
  const countLabel = total.toString().padStart(2, "0");

  // what is still missing before a link can be made
  const missing: string[] = [];
  if (!note.to.trim()) missing.push("their name");
  if (!note.from.trim()) missing.push("your name");
  if (!note.message.trim()) missing.push("a message");
  const canShare = total > 0 && missing.length === 0;

  const giftData: GiftData = {
    stems: stems.map((stem) => stem.flowerId),
    design,
    note: { ...note, to: note.to.trim(), from: note.from.trim(), message: note.message.trim() },
  };
  const currentCode = canShare ? encodeGift(giftData) : "";
  const shareUrl = share && share.code === currentCode ? share.url : "";

  async function createLink() {
    if (!currentCode || creating) return;
    setCreating(true);

    // fallback: the whole gift packed into the address (still short)
    let url = `${origin}#g=${currentCode}`;

    // preferred: a tiny id saved on the server (needs the Upstash env variables)
    try {
      const res = await fetch("/api/gift", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: currentCode }),
      });
      if (res.ok) {
        const { id } = await res.json();
        if (typeof id === "string") url = `${origin}#s=${id}`;
      }
    } catch {
      /* keep the fallback link */
    }

    setShare({ code: currentCode, url });
    setCreating(false);
  }

  // until the address bar has been read, show only an empty page
  if (status === "loading") {
    return <main className={`garden-page ${hand.variable}`} />;
  }

  return (
    <main className={`garden-page ${hand.variable}`}>
      <Topbar
        mode={gift ? "gift" : view === "garden" ? "garden" : "builder"}
        countLabel={countLabel}
        onAction={gift ? leaveGift : () => changeView("garden")}
      />

      {status === "bad" && (
        <p className="link-alert" role="alert">
          {COPY.linkError}
        </p>
      )}

      {gift ? (
        <GiftView gift={gift} onMakeOwn={leaveGift} headingRef={headingRef} />
      ) : view === "garden" ? (
        <>
          <Hero />

          {FIELDS.map((field) => (
            <FlowerField key={field.id} field={field} counts={counts} isFull={isFull} onAdd={addFlower} />
          ))}

          <Collection
            distinct={distinctFlowers}
            counts={counts}
            total={total}
            isFull={isFull}
            onAdd={addFlower}
            onRemoveOne={removeOne}
            onClear={() => setStems([])}
            onCreate={() => changeView("bouquet")}
          />

          {total > 0 && (
            <div className="cta-dock">
              <button type="button" className="btn btn-primary" onClick={() => changeView("bouquet")}>
                {COPY.collection.cta} <span className="btn-count">{countLabel}</span>
              </button>
            </div>
          )}
        </>
      ) : view === "bouquet" ? (
        <BouquetBuilder
          items={bouquetItems}
          distinct={distinctFlowers}
          counts={counts}
          isFull={isFull}
          design={design}
          onDesignChange={updateDesign}
          onAdd={addFlower}
          onRemoveOne={removeOne}
          onClear={() => setStems([])}
          onBack={() => changeView("garden")}
          onNext={() => changeView("note")}
          headingRef={headingRef}
        />
      ) : (
        <NoteStudio
          items={bouquetItems}
          design={design}
          note={note}
          onNoteChange={updateNote}
          shareUrl={shareUrl}
          creating={creating}
          hasCreated={share !== null}
          canShare={canShare}
          missing={missing}
          onCreate={createLink}
          onBack={() => changeView("bouquet")}
          headingRef={headingRef}
        />
      )}

      <Footer />
    </main>
  );
}