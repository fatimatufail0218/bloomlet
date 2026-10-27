"use client";

import { createContext, useContext } from "react";
import { cubic, darken, lighten, mix, polar, round } from "@/lib/svg-utils";
import type { Pt } from "@/lib/svg-utils";

/* In the bouquet the grass tufts at the stem base are switched off. */
export const BareStemContext = createContext(false);

export const GREEN = {
  stem: "#5f7f62",
  stemLight: "#8aa686",
  leaf: "#7a9f7a",
  leafDark: "#58795c",
  leafPale: "#9bb894",
};

export type BloomProps = { uid: string; color: string; center: string };

export type LeafSpec = {
  t: number;
  side: 1 | -1;
  length: number;
  width: number;
  tilt: number;
  tone?: "light" | "dark" | "pale";
  feather?: boolean;
};

export function leafFill(tone: LeafSpec["tone"]) {
  if (tone === "dark") return GREEN.leafDark;
  if (tone === "pale") return GREEN.leafPale;
  return GREEN.leaf;
}

export function Leaf({
  x,
  y,
  angle,
  length,
  width,
  fill,
}: {
  x: number;
  y: number;
  angle: number;
  length: number;
  width: number;
  fill: string;
}) {
  const outline = `M0 0 C${width} ${round(-length * 0.25)} ${round(width * 0.85)} ${round(-length * 0.72)} 0 ${-length} C${round(-width * 0.85)} ${round(-length * 0.72)} ${-width} ${round(-length * 0.25)} 0 0Z`;
  const half = `M0 0 C${width} ${round(-length * 0.25)} ${round(width * 0.85)} ${round(-length * 0.72)} 0 ${-length}Z`;
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <path d={outline} fill={fill} />
      <path d={half} fill="#1f3a2a" opacity="0.12" />
      <path
        d={`M0 -1 L0 ${round(-length * 0.88)}`}
        stroke="#ffffff"
        strokeOpacity="0.28"
        strokeWidth="0.7"
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );
}

export function FeatherLeaf({ x, y, angle, length }: { x: number; y: number; angle: number; length: number }) {
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${angle})`}
      fill="none"
      stroke={GREEN.leafDark}
      strokeWidth="0.9"
      strokeLinecap="round"
    >
      {[-24, 0, 24].map((a) => {
        const rad = (a * Math.PI) / 180;
        const ex = round(length * Math.sin(rad));
        const ey = round(-length * Math.cos(rad));
        return <path key={a} d={`M0 0 Q${round(ex * 0.2)} ${round(ey * 0.6)} ${ex} ${ey}`} />;
      })}
    </g>
  );
}

export function Stem({
  y0,
  lean = 3,
  width = 3,
  leaves = [],
}: {
  y0: number;
  lean?: number;
  width?: number;
  leaves?: LeafSpec[];
}) {
  const bare = useContext(BareStemContext);
  const span = 178 - y0;
  const p0: Pt = [60, y0];
  const p1: Pt = [round(60 + lean), round(y0 + span * 0.33)];
  const p2: Pt = [round(60 - lean), round(y0 + span * 0.66)];
  const p3: Pt = [60, 178];
  const d = `M${p0[0]} ${p0[1]} C${p1[0]} ${p1[1]} ${p2[0]} ${p2[1]} ${p3[0]} ${p3[1]}`;

  return (
    <g>
      {!bare && (
        <g fill={GREEN.leafDark} opacity="0.85">
          <path d="M51 178 C52 166 49 158 43 150 C51 155 56 164 58 178Z" />
          <path d="M63 178 C64 164 68 156 76 149 C72 160 70 168 69 178Z" />
          <path d="M57 178 C57 170 57 163 59 156 C61 164 62 171 64 178Z" fill={GREEN.leaf} />
        </g>
      )}
      <path d={d} fill="none" stroke={GREEN.stem} strokeWidth={width} strokeLinecap="round" />
      <path
        d={d}
        fill="none"
        stroke={GREEN.stemLight}
        strokeWidth={round(width * 0.3)}
        strokeLinecap="round"
        opacity="0.55"
        transform="translate(-0.6 0)"
      />
      {leaves.map((leaf, i) => {
        const [x, y] = cubic(p0, p1, p2, p3, leaf.t);
        const angle = leaf.side * leaf.tilt;
        if (leaf.feather) {
          return <FeatherLeaf key={i} x={x} y={y} angle={angle} length={leaf.length} />;
        }
        return (
          <Leaf
            key={i}
            x={x}
            y={y}
            angle={angle}
            length={leaf.length}
            width={leaf.width}
            fill={leafFill(leaf.tone)}
          />
        );
      })}
    </g>
  );
}

export function Calyx({ cy = 76 }: { cy?: number }) {
  return (
    <g>
      <Leaf x={60} y={cy} angle={142} length={15} width={4} fill={GREEN.leafDark} />
      <Leaf x={60} y={cy} angle={218} length={15} width={4} fill={GREEN.leafDark} />
      <Leaf x={60} y={cy} angle={180} length={13} width={3.5} fill={GREEN.leaf} />
      <ellipse cx="60" cy={cy + 2} rx="6.5" ry="5" fill={GREEN.leafDark} />
    </g>
  );
}

export function Dots({
  cx = 60,
  cy = 54,
  count,
  radius,
  r,
  fill,
  opacity = 1,
  offset = 0,
}: {
  cx?: number;
  cy?: number;
  count: number;
  radius: number;
  r: number;
  fill: string;
  opacity?: number;
  offset?: number;
}) {
  return (
    <g fill={fill} opacity={opacity}>
      {Array.from({ length: count }, (_, i) => {
        const p = polar(cx, cy, radius, offset + (360 / count) * i);
        return <circle key={i} cx={p.x} cy={p.y} r={r} />;
      })}
    </g>
  );
}

export function FivePetalFlower({
  x,
  y,
  r,
  color,
  center,
  rotate = 0,
}: {
  x: number;
  y: number;
  r: number;
  color: string;
  center: string;
  rotate?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      {Array.from({ length: 5 }, (_, i) => {
        const p = polar(0, 0, round(r * 0.56), i * 72 - 90);
        return (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={round(r * 0.47)}
            fill={i % 2 ? color : lighten(color, 0.08)}
            stroke={darken(color, 0.3)}
            strokeOpacity="0.22"
            strokeWidth="0.5"
          />
        );
      })}
      <circle r={round(r * 0.3)} fill="#fffdf2" />
      <circle r={round(r * 0.17)} fill={center} />
    </g>
  );
}


// ⬇ purani file se paste karein (sab ke aage `export` lagayein):
//   type LeafSpec, leafFill, Leaf, FeatherLeaf, Stem, Calyx, Dots
//   (banner "Shared SVG building blocks" ke neeche se Dots tak)
//   aur FivePetalFlower (banner "Forget-me-not" ke andar, ForgetMeNot se pehle)
// Purane GREEN / BareStemContext / BloomProps wali lines paste mat karein, upar already hain.