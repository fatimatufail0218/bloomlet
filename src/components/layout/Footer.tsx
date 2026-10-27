"use client";

import { WordmarkIcon } from "@/components/garden/decor";
import { COPY } from "@/lib/copy";

export function Footer() {
  return (
    <footer className="garden-footer">
      <a href="#" className="wordmark">
        <WordmarkIcon />
        {COPY.brand}
        <span className="wordmark-period">.</span>
      </a>
      <span>{COPY.footer}</span>
    </footer>
  );
}