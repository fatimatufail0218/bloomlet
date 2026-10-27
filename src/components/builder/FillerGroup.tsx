"use client";

import type { CSSProperties } from "react";
import { BUTTERFLY_PRESETS, FILLERS } from "@/lib/data/options";
import type { ButterflyColors, FillerId } from "@/lib/types";

function ButterflyColorGroup({
  value,
  onChange,
}: {
  value: ButterflyColors;
  onChange: (next: ButterflyColors) => void;
}) {
  return (
    <fieldset className="option-group">
      <legend className="panel-title">Butterfly colours</legend>

      <div className="bf-pickers">
        {(["c1", "c2"] as const).map((key, i) => (
          <label key={key} className="bf-picker">
            <input
              type="color"
              value={value[key]}
              onChange={(event) => onChange({ ...value, [key]: event.target.value })}
              aria-label={`Butterfly colour ${i + 1}`}
            />
            <span className="bf-picker-text">
              <span className="bf-picker-name">Colour {i + 1}</span>
              <span className="bf-picker-hex">{value[key].toUpperCase()}</span>
            </span>
          </label>
        ))}
      </div>

      <div className="bf-presets" role="group" aria-label="Butterfly colour presets">
        {BUTTERFLY_PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            className="bf-preset"
            title={preset.label}
            aria-label={`Use ${preset.label}`}
            onClick={() => onChange({ c1: preset.c1, c2: preset.c2 })}
          >
            <span style={{ background: preset.c1 }} />
            <span style={{ background: preset.c2 }} />
          </button>
        ))}
      </div>

      <p className="panel-note panel-note-tight">Pick a pair above, or choose any two colours of your own.</p>
    </fieldset>
  );
}

export function FillerGroup({
  selected,
  butterflyColors,
  onToggle,
  onButterflyColors,
}: {
  selected: FillerId[];
  butterflyColors: ButterflyColors;
  onToggle: (id: FillerId) => void;
  onButterflyColors: (next: ButterflyColors) => void;
}) {
  return (
    <>
      <fieldset className="option-group">
        <legend className="panel-title">Filler plants</legend>
        <div className="option-row">
          {FILLERS.map((filler) => (
            <label key={filler.id} className="option">
              <input
                type="checkbox"
                value={filler.id}
                checked={selected.includes(filler.id)}
                onChange={() => onToggle(filler.id)}
                className="visually-hidden"
              />
              <span
                className="swatch"
                style={{ "--swatch": filler.color } as CSSProperties}
                aria-hidden="true"
              />
              <span className="option-label">{filler.label}</span>
            </label>
          ))}
        </div>
        <p className="panel-note panel-note-tight">Choose as many as you like, or none at all.</p>
      </fieldset>

      {selected.includes("butterflies") && (
        <div className="bf-block">
          <ButterflyColorGroup value={butterflyColors} onChange={onButterflyColors} />
        </div>
      )}
    </>
  );
}