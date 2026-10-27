"use client";

import type { CSSProperties } from "react";

export function NoteCard({
  to,
  from,
  message,
  color,
  preview = false,
}: {
  to: string;
  from: string;
  message: string;
  color: string;
  preview?: boolean;
}) {
  const hasMessage = message.trim().length > 0;

  return (
    <article className="note" style={{ "--note-bg": color } as CSSProperties} aria-label="A handwritten note">
      <span className="tape tape-left" aria-hidden="true" />
      <span className="tape tape-right" aria-hidden="true" />

      <p className={`note-to${to.trim() || !preview ? "" : " note-empty"}`}>
        Dear {to.trim() || (preview ? "someone lovely" : "you")},
      </p>

      <p className={`note-body${hasMessage || !preview ? "" : " note-empty"}`}>
        {hasMessage ? message : preview ? "Your words will appear here, in little handwriting…" : ""}
      </p>

      <p className="note-from">
        <span className="note-with">with love,</span>
        <span className={`note-name${from.trim() || !preview ? "" : " note-empty"}`}>
          {from.trim() || (preview ? "you" : "someone")}
        </span>
        <svg className="squiggle" viewBox="0 0 64 10" aria-hidden="true" focusable="false">
          <path d="M2 6 C10 1 18 10 28 5 S46 2 62 6" fill="none" stroke="#c9707f" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </p>
    </article>
  );
}