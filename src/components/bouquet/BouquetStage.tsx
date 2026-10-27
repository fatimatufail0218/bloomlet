"use client";

import type { BouquetItem, Design } from "@/lib/types";
import { BouquetArt } from "./BouquetArt";

export function BouquetStage({ items, design }: { items: BouquetItem[]; design: Design }) {
  return (
    <figure className="bouquet-stage">
      <BouquetArt items={items} design={design} />
    </figure>
  );
}