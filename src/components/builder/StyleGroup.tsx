"use client";

import { STYLES } from "@/lib/data/options";
import type { WrapStyle } from "@/lib/types";

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinejoin: "round" as const };

function StyleIcon({ kind }: { kind: WrapStyle }) {
  return (
    <svg className="segment-icon" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      {kind === "cone" && (
        <>
          <path d="M5 8 C10 12 22 12 27 8 C24 18 19 25 16 29 C13 25 8 18 5 8Z" {...stroke} />
          <path d="M11 7 C12 3 14 2 16 4 C18 2 20 3 21 7" {...stroke} strokeLinecap="round" />
        </>
      )}
      {kind === "pouch" && (
        <>
          <path d="M5 8 C10 12 22 12 27 8 L24 28 Q16 30 8 28Z" {...stroke} />
          <path d="M11 7 C12 3 14 2 16 4 C18 2 20 3 21 7" {...stroke} strokeLinecap="round" />
        </>
      )}
      {kind === "scallop" && (
        <>
          <path d="M5 8 C10 12 22 12 27 8 C24 18 19 25 16 29 C13 25 8 18 5 8Z" {...stroke} />
          <path d="M8.5 13 q1.5 2.5 3 0 q1.5 2.5 3 0 q1.5 2.5 3 0 q1.5 2.5 3 0 q1.5 2.5 3 0" {...stroke} strokeLinecap="round" />
          <path d="M11 7 C12 3 14 2 16 4 C18 2 20 3 21 7" {...stroke} strokeLinecap="round" />
        </>
      )}
      {kind === "fold" && (
        <>
          <path d="M5 8 C10 12 22 12 27 8 C24 18 19 25 16 29 C13 25 8 18 5 8Z" {...stroke} />
          <path d="M16 11 C18 17 17 23 16 29" {...stroke} strokeLinecap="round" />
          <path d="M11 7 C12 3 14 2 16 4 C18 2 20 3 21 7" {...stroke} strokeLinecap="round" />
        </>
      )}
      {kind === "bow" && (
        <>
          <path d="M16 15 C10 7 3 8 5 14 C7 19 13 17 16 15Z" {...stroke} />
          <path d="M16 15 C22 7 29 8 27 14 C25 19 19 17 16 15Z" {...stroke} />
          <path d="M16 16 L11 29 M16 16 L21 29" {...stroke} strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

export function StyleGroup({ value, onChange }: { value: WrapStyle; onChange: (id: WrapStyle) => void }) {
  return (
    <fieldset className="option-group">
      <legend className="panel-title">Bouquet style</legend>
      <div className="segment-row">
        {STYLES.map((option) => (
          <label key={option.id} className="segment">
            <input
              type="radio"
              name="wrapstyle"
              value={option.id}
              checked={value === option.id}
              onChange={() => onChange(option.id)}
              className="visually-hidden"
            />
            <span className="segment-face">
              <StyleIcon kind={option.id} />
              <span className="segment-label">{option.label}</span>
              <small>{option.hint}</small>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}