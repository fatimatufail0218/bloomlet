"use client";

import type { Ref } from "react";
import { BouquetStage } from "@/components/bouquet/BouquetStage";
import { ColorChoice } from "@/components/ui/ColorChoice";
import { MESSAGE_LIMIT, NAME_LIMIT, NOTE_PAPERS } from "@/lib/data/options";
import type { BouquetItem, Design, Note } from "@/lib/types";
import { NoteCard } from "./NoteCard";
import { ShareBox } from "./ShareBox";
import { Arrow } from "@/components/ui/Arrow";

export function NoteStudio({
  items,
  design,
  note,
  onNoteChange,
  shareUrl,
  creating,
  hasCreated,
  canShare,
  missing,
  onCreate,
  onBack,
  headingRef,
}: {
  items: BouquetItem[];
  design: Design;
  note: Note;
  onNoteChange: (patch: Partial<Note>) => void;
  shareUrl: string;
  creating: boolean;
  hasCreated: boolean;
  canShare: boolean;
  missing: string[];
  onCreate: () => void;
  onBack: () => void;
  headingRef: Ref<HTMLHeadingElement>;
}) {
  const buttonLabel = creating
    ? "Creating…"
    : shareUrl
      ? "Link ready ✓"
      : hasCreated
        ? "Update my link"
        : "Create my link";

  return (
    <section className="bouquet-section" aria-labelledby="note-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Your note · No. 04</p>
          <h2 id="note-title" className="bouquet-heading" ref={headingRef} tabIndex={-1}>
            Add a little note.
          </h2>
        </div>
        <button type="button" className="btn btn-sm" onClick={onBack}>
  <Arrow dir="left" />
  Back to the bouquet
</button>
      </div>

      <div className="note-layout">
        <div className="note-form">
          <div className="field">
            <label className="panel-title" htmlFor="note-to">
              Who is it for?
            </label>
            <input
              id="note-to"
              className="field-input"
              type="text"
              value={note.to}
              maxLength={NAME_LIMIT}
              autoComplete="off"
              placeholder="their name"
              onChange={(event) => onNoteChange({ to: event.target.value })}
            />
          </div>

          <div className="field">
            <label className="panel-title" htmlFor="note-from">
              And who is it from?
            </label>
            <input
              id="note-from"
              className="field-input"
              type="text"
              value={note.from}
              maxLength={NAME_LIMIT}
              autoComplete="off"
              placeholder="your name"
              onChange={(event) => onNoteChange({ from: event.target.value })}
            />
          </div>

          <div className="field">
            <label className="panel-title" htmlFor="note-message">
              Your message
            </label>
            <textarea
              id="note-message"
              className="field-input field-area"
              value={note.message}
              maxLength={MESSAGE_LIMIT}
              rows={5}
              placeholder="write something kind…"
              onChange={(event) => onNoteChange({ message: event.target.value })}
            />
            <p className="field-count" aria-hidden="true">
              {note.message.length} / {MESSAGE_LIMIT}
            </p>
          </div>

          <ColorChoice
            legend="Note paper"
            name="notepaper"
            options={NOTE_PAPERS}
            value={note.color}
            onChange={(color) => onNoteChange({ color })}
          />

          <div className="share-area">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onCreate}
              disabled={!canShare || creating || Boolean(shareUrl)}
            >
              {buttonLabel}
            </button>
            {!canShare && <p className="panel-note panel-note-tight">Still needed: {missing.join(", ")}.</p>}
            {shareUrl && <ShareBox url={shareUrl} />}
          </div>
        </div>

        <div className="note-preview">
          <div className="gift-scene gift-stack">
            <BouquetStage items={items} design={design} />
            <NoteCard to={note.to} from={note.from} message={note.message} color={note.color} preview />
          </div>
        </div>
      </div>
    </section>
  );
}