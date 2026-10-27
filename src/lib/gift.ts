import { MAX_STEMS } from "@/lib/bouquet-layout";
import { flowerById } from "@/lib/data/flowers";
import {
  DEFAULT_BUTTERFLY_COLORS,
  FILLERS,
  MESSAGE_LIMIT,
  NAME_LIMIT,
  NOTE_PAPERS,
  PAPERS,
  RIBBONS,
  STYLES,
} from "@/lib/data/options";
import { hexToRgb, toHex } from "@/lib/svg-utils";
import type { ButterflyColors, GiftData } from "@/lib/types";

type Presets = readonly { color: string }[];

/* A preset colour costs 1 byte (its index + 1). A custom colour costs 4 (0, r, g, b). */
function writeColor(out: number[], presets: Presets, color: string) {
  const index = presets.findIndex((p) => p.color.toLowerCase() === color.toLowerCase());
  if (index >= 0) {
    out.push(index + 1);
    return;
  }
  out.push(0, ...hexToRgb(color));
}

function readColor(bytes: Uint8Array, cursor: { i: number }, presets: Presets) {
  const tag = bytes[cursor.i++];
  if (tag === undefined) throw new Error("short");
  if (tag > 0) {
    const preset = presets[tag - 1];
    if (!preset) throw new Error("bad preset");
    return preset.color;
  }
  return readRgb(bytes, cursor);
}

function readRgb(bytes: Uint8Array, cursor: { i: number }) {
  const r = bytes[cursor.i++];
  const g = bytes[cursor.i++];
  const b = bytes[cursor.i++];
  if (b === undefined) throw new Error("short");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function toBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(code: string) {
  const base64 = code.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64 + "=".repeat((4 - (base64.length % 4)) % 4));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export function encodeGift(gift: GiftData): string {
  const { stems, design, note } = gift;
  const out: number[] = [];

  const styleIndex = Math.max(0, STYLES.findIndex((s) => s.id === design.style));
  const mask = FILLERS.reduce((m, f, i) => (design.fillers.includes(f.id) ? m | (1 << i) : m), 0);

  out.push(styleIndex, mask, stems.length, ...stems);
  if (design.style !== "bow") writeColor(out, PAPERS, design.paper);
  writeColor(out, RIBBONS, design.ribbon);
  writeColor(out, NOTE_PAPERS, note.color);
  if (design.fillers.includes("butterflies")) {
    out.push(...hexToRgb(design.butterflyColors.c1), ...hexToRgb(design.butterflyColors.c2));
  }

  const text = [note.to, note.from, note.message].map((t) => t.replace(/\0/g, "")).join("\0");
  return toBase64Url(new Uint8Array([...out, ...new TextEncoder().encode(text)]));
}

/* Anything that comes from a link is untrusted, so every field is validated. */
export function decodeGift(code: string): GiftData | null {
  try {
    const bytes = fromBase64Url(code);
    if (bytes.length < 5) return null;
    const cursor = { i: 0 };

    const style = STYLES[bytes[cursor.i++]]?.id ?? "cone";
    const mask = bytes[cursor.i++];
    const count = bytes[cursor.i++];

    const stems = Array.from(bytes.slice(cursor.i, cursor.i + count))
      .filter((id) => flowerById.has(id))
      .slice(0, MAX_STEMS);
    cursor.i += count;
    if (stems.length === 0) return null;

    const paper = style === "bow" ? PAPERS[0].color : readColor(bytes, cursor, PAPERS);
    const ribbon = readColor(bytes, cursor, RIBBONS);
    const noteColor = readColor(bytes, cursor, NOTE_PAPERS);

    const fillers = FILLERS.filter((_, i) => (mask & (1 << i)) !== 0).map((f) => f.id);
    let butterflyColors: ButterflyColors = DEFAULT_BUTTERFLY_COLORS;
    if (fillers.includes("butterflies")) {
      butterflyColors = { c1: readRgb(bytes, cursor), c2: readRgb(bytes, cursor) };
    }

    const [to = "", from = "", ...rest] = new TextDecoder().decode(bytes.slice(cursor.i)).split("\0");

    return {
      stems,
      design: { style, paper, ribbon, fillers, butterflyColors },
      note: {
        to: to.slice(0, NAME_LIMIT),
        from: from.slice(0, NAME_LIMIT),
        message: rest.join("\0").slice(0, MESSAGE_LIMIT),
        color: noteColor,
      },
    };
  } catch {
    return null;
  }
}