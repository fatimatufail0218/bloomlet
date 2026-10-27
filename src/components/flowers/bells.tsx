"use client";

import { useContext } from "react";
import { cubic, darken, lighten, mix, round } from "@/lib/svg-utils";
import type { Pt } from "@/lib/svg-utils";
import { BareStemContext, GREEN, Leaf, Stem } from "./primitives";
import type { BloomProps } from "./primitives";

const BELL_SHAPE =
  "M0 0 C-8 2 -12 14 -15 26 L-11 31 L-7 26 L-3 32 L0 27 L3 32 L7 26 L11 31 L15 26 C12 14 8 2 0 0Z";

export function Bellflower({ uid, color, center }: BloomProps) {
  const id = `${uid}-bell`;
  const edge = darken(color, 0.35);
  const bells = [
    { x: 60, y: 28, r: 0, s: 1.15, d: "M60 46 Q58 36 60 28" },
    { x: 36, y: 48, r: -24, s: 0.88, d: "M60 48 Q46 38 36 48" },
    { x: 84, y: 46, r: 24, s: 0.82, d: "M60 48 Q74 36 84 46" },
  ];

  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={darken(color, 0.12)} />
          <stop offset="0.55" stopColor={color} />
          <stop offset="1" stopColor={lighten(color, 0.35)} />
        </linearGradient>
      </defs>
      <Stem
        y0={48}
        lean={3}
        width={2.4}
        leaves={[
          { t: 0.3, side: -1, length: 34, width: 6, tilt: 50, tone: "light" },
          { t: 0.55, side: 1, length: 30, width: 6, tilt: 54, tone: "dark" },
          { t: 0.8, side: -1, length: 24, width: 5, tilt: 58, tone: "pale" },
        ]}
      />
      <g fill="none" stroke={GREEN.stem} strokeWidth="1.6" strokeLinecap="round">
        {bells.map((b) => (
          <path key={b.d} d={b.d} />
        ))}
      </g>
      {bells.map((b, i) => (
        <g key={i} transform={`translate(${b.x} ${b.y}) rotate(${b.r}) scale(${b.s})`}>
          <path d={BELL_SHAPE} fill={`url(#${id})`} stroke={edge} strokeOpacity="0.3" strokeWidth="0.7" strokeLinejoin="round" />
          <g fill="none" stroke={edge} strokeOpacity="0.22" strokeWidth="0.6" strokeLinecap="round">
            <path d="M-4 3 C-6 12 -8 20 -9 27" />
            <path d="M0 3 L0 26" />
            <path d="M4 3 C6 12 8 20 9 27" />
          </g>
          <ellipse cx="0" cy="29" rx="1.8" ry="3.2" fill={center} />
        </g>
      ))}
    </>
  );
}

const VALLEY_BELL = "M0 0 C-5 1 -7 7 -8 12 C-5 14 -2 13 0 12 C2 13 5 14 8 12 C7 7 5 1 0 0Z";

export function LilyOfTheValley({ uid, color, center }: BloomProps) {
  const bare = useContext(BareStemContext);
  const id = `${uid}-valley`;
  const p0: Pt = [60, 178];
  const p1: Pt = [60, 128];
  const p2: Pt = [52, 40];
  const p3: Pt = [90, 36];
  const edge = darken(color, 0.4);

  return (
    <>
      <defs>
        <radialGradient id={id} cx="40%" cy="30%" r="80%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor={mix(color, center, 0.35)} />
        </radialGradient>
      </defs>
      {!bare && (
        <g>
          <Leaf x={57} y={176} angle={-12} length={98} width={20} fill={GREEN.leafDark} />
          <Leaf x={63} y={176} angle={14} length={88} width={18} fill={GREEN.leaf} />
        </g>
      )}
      <path
        d={`M${p0[0]} ${p0[1]} C${p1[0]} ${p1[1]} ${p2[0]} ${p2[1]} ${p3[0]} ${p3[1]}`}
        fill="none"
        stroke={GREEN.stem}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {[0.6, 0.68, 0.76, 0.84, 0.92].map((t, i) => {
        const [x, y] = cubic(p0, p1, p2, p3, t);
        const s = round(1.05 - i * 0.1);
        return (
          <g key={t}>
            <path
              d={`M${x} ${y} Q${round(x + 2)} ${round(y + 3)} ${round(x + 5)} ${round(y + 7)}`}
              fill="none"
              stroke={GREEN.stem}
              strokeWidth="0.9"
              strokeLinecap="round"
            />
            <g transform={`translate(${round(x + 5)} ${round(y + 7)}) rotate(${6 - i * 2}) scale(${s})`}>
              <path d={VALLEY_BELL} fill={`url(#${id})`} stroke={edge} strokeOpacity="0.3" strokeWidth="0.5" strokeLinejoin="round" />
              <path d="M-2 4 C-3 7 -3 9 -3 11 M2 4 C3 7 3 9 3 11" fill="none" stroke={edge} strokeOpacity="0.2" strokeWidth="0.4" />
            </g>
          </g>
        );
      })}
      <ellipse cx="91" cy="33" rx="2.2" ry="3" fill={lighten(center, 0.2)} />
    </>
  );
}

function SnowdropFlower({
  x,
  y,
  rot,
  s,
  color,
  green,
}: {
  x: number;
  y: number;
  rot: number;
  s: number;
  color: string;
  green: string;
}) {
  const edge = darken(color, 0.4);
  const petal = "M0 0 C-7 6 -9 22 0 34 C9 22 7 6 0 0Z";
  const props = { fill: color, stroke: edge, strokeOpacity: 0.3, strokeWidth: 0.6, strokeLinejoin: "round" as const };

  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <ellipse cx="0" cy="-3" rx="3.6" ry="4.2" fill={green} />
      <path d={petal} transform="rotate(-26)" {...props} />
      <path d={petal} transform="rotate(26)" {...props} />
      <path d={petal} {...props} />
      <path d="M0 4 L0 26" stroke={edge} strokeOpacity="0.16" strokeWidth="0.5" strokeLinecap="round" />
      <path d="M-5 13 C-5 23 5 23 5 13 C2 15 -2 15 -5 13Z" fill="#ffffff" stroke={edge} strokeOpacity="0.3" strokeWidth="0.5" />
      <path d="M-3.2 19 Q0 24 3.2 19 Q0 21 -3.2 19Z" fill={green} />
    </g>
  );
}

export function Snowdrop({ color, center }: Omit<BloomProps, "uid">) {
  return (
    <>
      <Stem
        y0={72}
        lean={2}
        width={2.2}
        leaves={[
          { t: 0.55, side: -1, length: 74, width: 6, tilt: 12, tone: "pale" },
          { t: 0.7, side: 1, length: 66, width: 6, tilt: 14, tone: "light" },
        ]}
      />
      <g fill="none" stroke={GREEN.stem} strokeWidth="1.8" strokeLinecap="round">
        <path d="M60 74 C60 58 70 48 82 44" />
        <path d="M60 80 Q48 74 40 80" />
      </g>
      <SnowdropFlower x={40} y={80} rot={-8} s={0.78} color={color} green={center} />
      <SnowdropFlower x={82} y={44} rot={8} s={1.05} color={color} green={center} />
    </>
  );
}

const BLUEBELL_SHAPE =
  "M0 0 C-4 2 -6 10 -6 18 C-7 22 -10 24 -12 23 C-9 22 -8 20 -4 21 L4 21 C8 20 9 22 12 23 C10 24 7 22 6 18 C6 10 4 2 0 0Z";

export function Bluebell({ uid, color, center }: BloomProps) {
  const id = `${uid}-blue`;
  const p0: Pt = [60, 178];
  const p1: Pt = [60, 110];
  const p2: Pt = [52, 36];
  const p3: Pt = [92, 36];
  const edge = darken(color, 0.4);

  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={darken(color, 0.1)} />
          <stop offset="1" stopColor={lighten(color, 0.25)} />
        </linearGradient>
      </defs>
      <Stem
        y0={120}
        lean={2}
        width={2.2}
        leaves={[
          { t: 0.4, side: -1, length: 70, width: 7, tilt: 14, tone: "dark" },
          { t: 0.62, side: 1, length: 62, width: 7, tilt: 18, tone: "light" },
        ]}
      />
      <path
        d={`M${p0[0]} ${p0[1]} C${p1[0]} ${p1[1]} ${p2[0]} ${p2[1]} ${p3[0]} ${p3[1]}`}
        fill="none"
        stroke={GREEN.stem}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {[0.52, 0.6, 0.68, 0.76, 0.84, 0.92].map((t, i) => {
        const [x, y] = cubic(p0, p1, p2, p3, t);
        const s = round(1.0 - i * 0.07);
        return (
          <g key={t}>
            <path
              d={`M${x} ${y} Q${round(x + 3)} ${round(y + 2)} ${round(x + 5)} ${round(y + 5)}`}
              fill="none"
              stroke={GREEN.stem}
              strokeWidth="0.9"
              strokeLinecap="round"
            />
            <g transform={`translate(${round(x + 5)} ${round(y + 5)}) rotate(${-6 + i * 2}) scale(${s})`}>
              <path d={BLUEBELL_SHAPE} fill={`url(#${id})`} stroke={edge} strokeOpacity="0.3" strokeWidth="0.5" strokeLinejoin="round" />
              <path d="M-2 3 C-3 9 -3 14 -3 19 M2 3 C3 9 3 14 3 19" fill="none" stroke={edge} strokeOpacity="0.2" strokeWidth="0.4" />
            </g>
          </g>
        );
      })}
      <ellipse cx="93" cy="33" rx="2" ry="3.2" fill={lighten(center, 0.1)} stroke={edge} strokeOpacity="0.3" strokeWidth="0.4" />
    </>
  );
}