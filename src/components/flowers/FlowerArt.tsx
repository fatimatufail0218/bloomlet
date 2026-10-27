"use client";

import type { Flower } from "@/lib/types";
import { FlowerShape } from "./FlowerShape";

export function FlowerArt({ flower, thumb = false }: { flower: Flower; thumb?: boolean }) {
  return (
    <svg
      viewBox={thumb ? "6 2 108 108" : "0 0 120 180"}
      width="100%"
      height="100%"
      aria-hidden="true"
      focusable="false"
    >
      <FlowerShape flower={flower} />
    </svg>
  );
}