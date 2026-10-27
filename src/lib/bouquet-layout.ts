import { round } from "@/lib/svg-utils";
import type { BouquetItem, Flower, Species } from "@/lib/types";

type Slot = { dx: number; dy: number; s: number };

export const TIE = { x: 320, y: 505 };

// distance between a flower head and its stem base at scale 1
const STEM_REACH = 124;

const SLOTS: Slot[] = [
  { dx: 0, dy: -250, s: 1.5 },
  { dx: -92, dy: -258, s: 1.3 },
  { dx: 95, dy: -255, s: 1.3 },
  { dx: -62, dy: -165, s: 1.4 },
  { dx: 66, dy: -168, s: 1.4 },
  { dx: -170, dy: -215, s: 1.2 },
  { dx: 172, dy: -218, s: 1.2 },
  { dx: -150, dy: -140, s: 1.15 },
  { dx: 152, dy: -142, s: 1.15 },
  { dx: 0, dy: -128, s: 1.2 },
  { dx: -215, dy: -165, s: 1.05 },
  { dx: 218, dy: -168, s: 1.05 },
  { dx: -40, dy: -318, s: 1.0 },
  { dx: 46, dy: -322, s: 1.0 },
  { dx: -138, dy: -308, s: 1.0 },
  { dx: 142, dy: -310, s: 1.0 },
  { dx: -78, dy: -105, s: 1.0 },
  { dx: 80, dy: -108, s: 1.0 },
  { dx: -262, dy: -205, s: 0.95 },
  { dx: 264, dy: -208, s: 0.95 },
];

// the most stems a bouquet can hold (one per slot)
export const MAX_STEMS = SLOTS.length;

const SLOT_SETS: Record<number, number[]> = {
  1: [0],
  2: [3, 4],
  3: [0, 3, 4],
  4: [0, 3, 4, 9],
  5: [0, 1, 2, 3, 4],
  6: [0, 1, 2, 3, 4, 9],
  7: [0, 1, 2, 3, 4, 5, 6],
  8: [0, 1, 2, 3, 4, 5, 6, 9],
  9: [0, 1, 2, 3, 4, 5, 6, 9, 12],
  10: [0, 1, 2, 3, 4, 5, 6, 9, 12, 13],
  11: [0, 1, 2, 3, 4, 5, 6, 9, 12, 13, 7],
  12: [0, 1, 2, 3, 4, 5, 6, 9, 12, 13, 7, 8],
  13: [0, 1, 2, 3, 4, 5, 6, 9, 12, 13, 7, 8, 10],
  14: [0, 1, 2, 3, 4, 5, 6, 9, 12, 13, 7, 8, 10, 11],
};

const EXTRA_SLOTS = [14, 15, 16, 17, 18, 19];

function slotSetFor(n: number) {
  if (n <= 14) return SLOT_SETS[n];
  return [...SLOT_SETS[14], ...EXTRA_SLOTS.slice(0, n - 14)];
}

// few flowers get bigger heads, many flowers get slightly smaller heads
function sizeFactor(n: number) {
  if (n <= 1) return 1.3;
  if (n === 2) return 1.18;
  if (n <= 4) return 1.1;
  if (n <= 6) return 1.04;
  if (n <= 9) return 1;
  if (n <= 12) return 0.95;
  if (n <= 14) return 0.9;
  if (n <= 17) return 0.84;
  return 0.8;
}

// small optical corrections so delicate species do not vanish next to roses
const SPECIES_SCALE: Partial<Record<Species, number>> = {
  lavender: 1.08,
  forgetMeNot: 1.12,
  cornflower: 1.04,
  gardenRose: 0.96,
  iris: 0.96,
  poppy: 0.98,
  sunflower: 0.9,
  hydrangea: 0.9,
  peony: 0.96,
  lily: 0.96,
  dahlia: 1.0,
  anemone: 1.04,
  bellflower: 1.05,
  hyacinth: 1.05,
  loosestrife: 1.05,
  salvia: 1.05,
  rosemary: 1.1,
  valley: 1.1,
  snowdrop: 1.15,
  bluebell: 1.05,
  hibiscus: 0.92,
  lotus: 0.95,
  moonflower: 0.95,
};

export type Placement = {
  key: number;
  flower: Flower;
  hy: number;
  bx: number;
  by: number;
  angle: number;
  scale: number;
  flip: 1 | -1;
};

export function layoutBouquet(items: BouquetItem[]): Placement[] {
  const chosen = items.slice(0, MAX_STEMS);
  const n = chosen.length;
  if (n === 0) return [];

  const slotIndexes = slotSetFor(n);
  const factor = sizeFactor(n);

  return chosen
    .map((item, i) => {
      const slotIndex = slotIndexes[i];
      const slot = SLOTS[slotIndex];
      const jitter = 1 + (((slotIndex * 5) % 7) - 3) * 0.012;
      const scale = round(slot.s * factor * jitter * (SPECIES_SCALE[item.flower.species] ?? 1));
      const dist = Math.hypot(slot.dx, slot.dy);
      const ux = slot.dx / dist;
      const uy = slot.dy / dist;
      const hx = TIE.x + slot.dx;
      const hy = TIE.y + slot.dy;
      const reach = STEM_REACH * scale;

      return {
        key: item.key,
        flower: item.flower,
        hy,
        bx: round(hx - ux * reach),
        by: round(hy - uy * reach),
        angle: round((Math.atan2(slot.dx, -slot.dy) * 180) / Math.PI),
        scale,
        flip: (slotIndex % 2 === 1 ? -1 : 1) as 1 | -1,
      };
    })
    .sort((a, b) => a.hy - b.hy);
}