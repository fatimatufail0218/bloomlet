import type {
  ButterflyColors,
  ColorOption,
  Design,
  FillerId,
  Note,
  WrapStyle,
} from "@/lib/types";

export const NAME_LIMIT = 32;
export const MESSAGE_LIMIT = 420;

export const PAPERS: ColorOption[] = [
  { id: "ivory", label: "Warm ivory", color: "#efe5cf" },
  { id: "kraft", label: "Kraft brown", color: "#bc9468" },
  { id: "sage", label: "Soft sage", color: "#b3c3a3" },
  { id: "blush", label: "Blush pink", color: "#eec3c8" },
  { id: "peach", label: "Peach", color: "#f0c4a4" },
  { id: "butter", label: "Butter yellow", color: "#f2dc9c" },
  { id: "mist", label: "Mist blue", color: "#b4c6d9" },
  { id: "lilac", label: "Lilac", color: "#cfc2e2" },
  { id: "forest", label: "Forest green", color: "#58785f" },
  { id: "plum", label: "Deep plum", color: "#7d4a63" },
];

export const RIBBONS: ColorOption[] = [
  { id: "pink", label: "Muted pink", color: "#c9808f" },
  { id: "coral", label: "Coral", color: "#d9705e" },
  { id: "gold", label: "Antique gold", color: "#c9a24b" },
  { id: "ivory", label: "Ivory", color: "#f1e9d6" },
  { id: "lavender", label: "Lavender", color: "#9a85c0" },
  { id: "blue", label: "Dusty blue", color: "#6f8fb0" },
  { id: "forest", label: "Forest green", color: "#3d5f49" },
  { id: "burgundy", label: "Burgundy", color: "#7b2d3d" },
];

export const NOTE_PAPERS: ColorOption[] = [
  { id: "cream", label: "Cream", color: "#fbf3df" },
  { id: "blush", label: "Blush", color: "#fbe1e3" },
  { id: "mint", label: "Mint", color: "#e0eedd" },
  { id: "lilac", label: "Lilac", color: "#e8e0f4" },
  { id: "peach", label: "Peach", color: "#fbe3cf" },
  { id: "sky", label: "Sky", color: "#dfeaf6" },
];

export const FILLERS: { id: FillerId; label: string; color: string }[] = [
  { id: "eucalyptus", label: "Eucalyptus", color: "#8fae9a" },
  { id: "babysBreath", label: "Baby’s breath", color: "#f7f4e6" },
  { id: "fern", label: "Fern", color: "#6f9a6c" },
  { id: "wheat", label: "Wheat", color: "#d9b865" },
  { id: "olive", label: "Olive branch", color: "#94ad94" },
  {
    id: "butterflies",
    label: "Butterflies",
    color: "linear-gradient(135deg, #b7d3f3 50%, #cfc0ec 50%)",
  },
];

export const STYLES: { id: WrapStyle; label: string; hint: string }[] = [
  { id: "cone", label: "Classic cone", hint: "Paper folded into a cone" },
  { id: "pouch", label: "Pouch", hint: "Wide, flat-bottomed paper" },
  { id: "scallop", label: "Scalloped", hint: "Cone with a frilly edge" },
  { id: "fold", label: "Folded", hint: "Two-tone overlapping sheets" },
  { id: "bow", label: "Bow only", hint: "Bare stems, tied with a bow" },
];

export const BUTTERFLY_PRESETS: { label: string; c1: string; c2: string }[] = [
  { label: "Sky & lilac", c1: "#9ec5f5", c2: "#c4aef0" },
  { label: "Blush & peach", c1: "#f2a5b8", c2: "#f6c49a" },
  { label: "Gold & cream", c1: "#e8c25a", c2: "#f6ead0" },
  { label: "Mint & aqua", c1: "#8fd3b8", c2: "#9fd6ea" },
  { label: "Plum & rose", c1: "#a470b8", c2: "#e58fb0" },
  { label: "White & silver", c1: "#f4f4f4", c2: "#b9c2cc" },
];

export const DEFAULT_BUTTERFLY_COLORS: ButterflyColors = { c1: "#9ec5f5", c2: "#c4aef0" };

export const DEFAULT_DESIGN: Design = {
  style: "cone",
  paper: PAPERS[0].color,
  ribbon: RIBBONS[0].color,
  fillers: ["eucalyptus"],
  butterflyColors: DEFAULT_BUTTERFLY_COLORS,
};

export const DEFAULT_NOTE: Note = { to: "", from: "", message: "", color: NOTE_PAPERS[0].color };

/* Name of a preset colour, or null when the colour is a custom one. */
export function colorLabel(options: readonly ColorOption[], color: string) {
  return options.find((o) => o.color.toLowerCase() === color.toLowerCase())?.label ?? null;
}