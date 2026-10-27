"use client";

import { WordmarkIcon } from "@/components/garden/decor";
import { Arrow } from "@/components/ui/Arrow";
import { COPY } from "@/lib/copy";

export function Topbar({
  mode,
  countLabel,
  onAction,
}: {
  mode: "gift" | "garden" | "builder";
  countLabel: string;
  onAction: () => void;
}) {
  return (
    <nav className="topbar" aria-label="Main">
      <a href="#" className="wordmark">
        <WordmarkIcon />
        {COPY.brand}
        <span className="wordmark-period">.</span>
      </a>

      {mode === "gift" ? (
        <button type="button" className="picked-link" onClick={onAction}>
          Make your own
          <Arrow />
        </button>
      ) : mode === "garden" ? (
        <a className="picked-link" href="#your-picks">
          Your picks <span className="picked-count">{countLabel}</span>
        </a>
      ) : (
        <button type="button" className="picked-link" onClick={onAction}>
          <Arrow dir="left" />
          Garden <span className="picked-count">{countLabel}</span>
        </button>
      )}
    </nav>
  );
}