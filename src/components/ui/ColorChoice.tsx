"use client";

import type { CSSProperties } from "react";
import { colorLabel } from "@/lib/data/options";
import type { ColorOption } from "@/lib/types";

export function ColorChoice({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: readonly ColorOption[];
  value: string;
  onChange: (color: string) => void;
}) {
  const label = colorLabel(options, value);
  const isCustom = label === null;

  return (
    <fieldset className="option-group">
      <legend className="panel-title">
        {legend}
        <span className="panel-value">{label ?? `Custom ${value.toUpperCase()}`}</span>
      </legend>

      <div className="swatch-row">
        {options.map((option) => (
          <label key={option.id} className="swatch-option" title={option.label}>
            <input
              type="radio"
              name={name}
              value={option.color}
              checked={option.color.toLowerCase() === value.toLowerCase()}
              onChange={() => onChange(option.color)}
              className="visually-hidden"
            />
            <span
              className="swatch"
              style={{ "--swatch": option.color } as CSSProperties}
              aria-hidden="true"
            />
            <span className="visually-hidden">{option.label}</span>
          </label>
        ))}

        <label className="swatch-option swatch-custom" title="Pick any colour">
          <input
            type="color"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="visually-hidden"
            aria-label={`${legend}: pick a custom colour`}
          />
          <span
            className={`swatch${isCustom ? " is-custom" : ""}`}
            style={isCustom ? ({ "--swatch": value } as CSSProperties) : undefined}
            aria-hidden="true"
          />
        </label>
      </div>
    </fieldset>
  );
}