export type Pt = [number, number];

// Rounding keeps server and client SVG output identical (no hydration warnings).
export function round(n: number) {
  return Math.round(n * 100) / 100;
}

export function hexToRgb(hex: string): [number, number, number] {
  const value = parseInt(hex.replace("#", ""), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

export function toHex(n: number) {
  return n.toString(16).padStart(2, "0");
}

export function mix(from: string, to: string, amount: number) {
  const [r1, g1, b1] = hexToRgb(from);
  const [r2, g2, b2] = hexToRgb(to);
  const channel = (a: number, b: number) => Math.round(a + (b - a) * amount);
  return `#${toHex(channel(r1, r2))}${toHex(channel(g1, g2))}${toHex(channel(b1, b2))}`;
}

export const lighten = (color: string, amount: number) => mix(color, "#ffffff", amount);
export const darken = (color: string, amount: number) => mix(color, "#2b1f1c", amount);

export function polar(cx: number, cy: number, radius: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: round(cx + radius * Math.cos(rad)), y: round(cy + radius * Math.sin(rad)) };
}

export function cubic(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;
  return [
    round(a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0]),
    round(a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]),
  ];
}

export function seeded(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}