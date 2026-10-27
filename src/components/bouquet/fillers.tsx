"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { TIE } from "@/lib/bouquet-layout";
import { DEFAULT_BUTTERFLY_COLORS } from "@/lib/data/options";
import { darken, lighten, round } from "@/lib/svg-utils";
import type { ButterflyColors, FillerId } from "@/lib/types";


type SprigSpec = { angle: number; length: number; c: number };

// point and tangent angle on the gentle curve  M0 0 Q c,-L/2  0,-L
function sprigPoint(t: number, c: number, length: number) {
  return {
    x: round(2 * c * t * (1 - t)),
    y: round(-length * t),
    tilt: round((Math.atan2(2 * c * (1 - 2 * t), length) * 180) / Math.PI),
  };
}

function sprigStem(length: number, c: number) {
  return `M0 0 Q${c} ${round(-length / 2)} 0 ${-length}`;
}

export const FILLER_SPRIGS: Record<FillerId, SprigSpec[]> = {
  eucalyptus: [
    { angle: -62, length: 290, c: 16 },
    { angle: -40, length: 340, c: -14 },
    { angle: -16, length: 365, c: 14 },
    { angle: 10, length: 372, c: -16 },
    { angle: 34, length: 345, c: 14 },
    { angle: 58, length: 298, c: -14 },
  ],
  babysBreath: [
    { angle: -72, length: 270, c: -12 },
    { angle: -50, length: 320, c: 12 },
    { angle: -27, length: 350, c: -12 },
    { angle: -4, length: 362, c: 12 },
    { angle: 20, length: 355, c: -12 },
    { angle: 46, length: 330, c: 12 },
    { angle: 68, length: 275, c: -12 },
  ],
  fern: [
    { angle: -76, length: 250, c: 14 },
    { angle: -52, length: 300, c: -12 },
    { angle: -24, length: 300, c: 12 },
    { angle: 24, length: 300, c: -12 },
    { angle: 52, length: 300, c: 12 },
    { angle: 76, length: 250, c: -14 },
  ],
  wheat: [
    { angle: -48, length: 330, c: 8 },
    { angle: -22, length: 382, c: -8 },
    { angle: 6, length: 392, c: 8 },
    { angle: 30, length: 372, c: -8 },
    { angle: 54, length: 326, c: 8 },
  ],
  olive: [
    { angle: -68, length: 260, c: -14 },
    { angle: -44, length: 330, c: 14 },
    { angle: -8, length: 340, c: -14 },
    { angle: 18, length: 345, c: 14 },
    { angle: 40, length: 335, c: -14 },
    { angle: 66, length: 265, c: 14 },
  ],
  // the sign of c decides the colour: positive = light blue, negative = light purple
  butterflies: [
    { angle: -70, length: 310, c: 14 },
    { angle: -48, length: 372, c: -14 },
    { angle: -25, length: 410, c: 14 },
    { angle: -3, length: 425, c: -14 },
    { angle: 20, length: 412, c: 14 },
    { angle: 43, length: 368, c: -14 },
    { angle: 66, length: 312, c: 14 },
  ],
};

function EucalyptusSprig({ length, c }: { length: number; c: number }) {
  const count = Math.max(5, Math.round(length / 46));
  const tones = ["#8fae9a", "#a6c0ac", "#7d9f8b"];
  const tip = sprigPoint(1, c, length);

  return (
    <g>
      <path d={sprigStem(length, c)} fill="none" stroke="#6f8f78" strokeWidth="1.8" strokeLinecap="round" />
      {Array.from({ length: count }, (_, i) => {
        const t = round(0.2 + (i / (count - 1)) * 0.74);
        const { x, y, tilt } = sprigPoint(t, c, length);
        const s = round(1 - t * 0.42);
        return ([-1, 1] as const).map((side) => (
          <g
            key={`${i}${side}`}
            transform={`translate(${x} ${y}) rotate(${round(side * 48 + tilt)}) scale(${s})`}
          >
            <ellipse
              cx="0"
              cy="-10"
              rx="8.5"
              ry="10.5"
              fill={tones[(i + (side === 1 ? 1 : 0)) % 3]}
              stroke="#5d7d69"
              strokeOpacity="0.25"
              strokeWidth="0.5"
            />
            <path d="M0 -1 L0 -17" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="0.6" strokeLinecap="round" />
          </g>
        ));
      })}
      <g transform={`translate(${tip.x} ${tip.y})`}>
        <ellipse cx="0" cy="-8" rx="6" ry="9" fill={tones[0]} stroke="#5d7d69" strokeOpacity="0.25" strokeWidth="0.5" />
      </g>
    </g>
  );
}

const BREATH_CLUSTER: [number, number, number][] = [
  [0, 0, 3.2],
  [-4.2, 3, 2.5],
  [4.2, 2.4, 2.6],
  [0.6, -4.2, 2.4],
  [-3, -2.8, 2],
];

function BabysBreathSprig({ length, c }: { length: number; c: number }) {
  const branches = [0.32, 0.44, 0.56, 0.68, 0.8, 0.92];
  const tip = sprigPoint(1, c, length);

  const cluster = (key: string) => (
    <g key={key}>
      {BREATH_CLUSTER.map(([cx, cy, r], k) => (
        <circle
          key={k}
          cx={cx}
          cy={cy}
          r={r}
          fill="#fffdf3"
          stroke="#cfd2b8"
          strokeOpacity="0.7"
          strokeWidth="0.4"
        />
      ))}
      <circle cx="0" cy="0.4" r="0.7" fill="#e6d58c" />
    </g>
  );

  return (
    <g>
      <path d={sprigStem(length, c)} fill="none" stroke="#7f9a72" strokeWidth="1.3" strokeLinecap="round" />
      {branches.map((t, i) => {
        const { x, y, tilt } = sprigPoint(t, c, length);
        const side = i % 2 ? 1 : -1;
        const len = round(36 - t * 16);
        return (
          <g key={i} transform={`translate(${x} ${y}) rotate(${round(side * 36 + tilt)})`}>
            <path d={`M0 0 L0 ${-len}`} stroke="#7f9a72" strokeWidth="0.9" strokeLinecap="round" />
            <g transform={`translate(0 ${-len})`}>{cluster(`c${i}`)}</g>
            <g transform={`translate(${side * 3} ${round(-len * 0.55)}) rotate(${side * 40})`}>
              <path d="M0 0 L0 -12" stroke="#7f9a72" strokeWidth="0.7" strokeLinecap="round" />
              <g transform="translate(0 -12) scale(0.7)">{cluster(`d${i}`)}</g>
            </g>
          </g>
        );
      })}
      <g transform={`translate(${tip.x} ${tip.y})`}>{cluster("tip")}</g>
    </g>
  );
}

function FernSprig({ length, c }: { length: number; c: number }) {
  const pairs = Math.round(length / 15);
  const tones = ["#6f9a6c", "#7fa77a", "#5f8a62"];
  const tip = sprigPoint(1, c, length);

  return (
    <g>
      <path d={sprigStem(length, c)} fill="none" stroke="#5b8660" strokeWidth="1.6" strokeLinecap="round" />
      {Array.from({ length: pairs }, (_, i) => {
        const t = round(0.1 + (i / (pairs - 1)) * 0.86);
        const { x, y, tilt } = sprigPoint(t, c, length);
        const len = round(26 * (1 - t * 0.72) + 3);
        return ([-1, 1] as const).map((side) => (
          <g key={`${i}${side}`} transform={`translate(${x} ${y}) rotate(${round(side * 58 + tilt)})`}>
            <ellipse
              cx="0"
              cy={round(-len / 2)}
              rx={round(len * 0.17)}
              ry={round(len / 2)}
              fill={tones[(i + (side === 1 ? 1 : 0)) % 3]}
              stroke="#4f7853"
              strokeOpacity="0.25"
              strokeWidth="0.4"
            />
          </g>
        ));
      })}
      <g transform={`translate(${tip.x} ${tip.y})`}>
        <ellipse cx="0" cy="-5" rx="2.2" ry="6" fill={tones[0]} />
      </g>
    </g>
  );
}

function WheatSprig({ length, c }: { length: number; c: number }) {
  const tip = sprigPoint(1, c, length);

  return (
    <g>
      <path d={sprigStem(length, c)} fill="none" stroke="#b9a468" strokeWidth="1.7" strokeLinecap="round" />
      {Array.from({ length: 9 }, (_, i) => {
        const t = round(0.7 + i * 0.032);
        const { x, y, tilt } = sprigPoint(t, c, length);
        return ([-1, 1] as const).map((side) => (
          <g key={`${i}${side}`} transform={`translate(${x} ${y}) rotate(${round(side * 24 + tilt)})`}>
            <ellipse
              cx="0"
              cy="-5"
              rx="2.7"
              ry="5.8"
              fill={i % 2 ? "#dcbd6c" : "#cfae58"}
              stroke="#a98a3c"
              strokeOpacity="0.4"
              strokeWidth="0.3"
            />
            <path d="M0 -9 L0 -23" stroke="#cdb06a" strokeOpacity="0.8" strokeWidth="0.5" strokeLinecap="round" />
          </g>
        ));
      })}
      <g transform={`translate(${tip.x} ${tip.y})`}>
        <ellipse cx="0" cy="-6" rx="2.6" ry="6" fill="#dcbd6c" stroke="#a98a3c" strokeOpacity="0.4" strokeWidth="0.3" />
        <path d="M0 -11 L0 -28" stroke="#cdb06a" strokeOpacity="0.85" strokeWidth="0.5" strokeLinecap="round" />
      </g>
    </g>
  );
}

function OliveSprig({ length, c }: { length: number; c: number }) {
  const count = Math.round(length / 26);
  const tones = ["#94ad94", "#aebfa9"];
  const tip = sprigPoint(1, c, length);

  return (
    <g>
      <path d={sprigStem(length, c)} fill="none" stroke="#7d8a62" strokeWidth="1.6" strokeLinecap="round" />
      {Array.from({ length: count }, (_, i) => {
        const t = round(0.16 + (i / (count - 1)) * 0.8);
        const { x, y, tilt } = sprigPoint(t, c, length);
        const side = i % 2 ? 1 : -1;
        return (
          <g key={i}>
            <g transform={`translate(${x} ${y}) rotate(${round(side * 58 + tilt)})`}>
              <ellipse
                cx="0"
                cy="-9"
                rx="3.2"
                ry="10"
                fill={tones[i % 2]}
                stroke="#6f8a70"
                strokeOpacity="0.3"
                strokeWidth="0.4"
              />
              <path d="M0 -1 L0 -16" stroke="#ffffff" strokeOpacity="0.28" strokeWidth="0.5" strokeLinecap="round" />
            </g>
            {i % 4 === 1 && (
              <g transform={`translate(${x} ${y}) rotate(${round(-side * 28 + tilt)})`}>
                <path d="M0 0 L0 -8" stroke="#7d8a62" strokeWidth="0.8" strokeLinecap="round" />
                <circle cx="0" cy="-11" r="3.4" fill="#66683f" />
                <circle cx="-1" cy="-12" r="1" fill="#ffffff" opacity="0.3" />
              </g>
            )}
          </g>
        );
      })}
      <g transform={`translate(${tip.x} ${tip.y})`}>
        <ellipse cx="0" cy="-8" rx="3" ry="9" fill={tones[0]} stroke="#6f8a70" strokeOpacity="0.3" strokeWidth="0.4" />
      </g>
    </g>
  );
}

/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*  Butterflies: the two colours are chosen by the person (colour wheel).     */
/* -------------------------------------------------------------------------- */

type ButterflyPalette = { wing: string; wingDeep: string; spot: string; edge: string };
type ButterflyPair = [ButterflyPalette, ButterflyPalette];

function paletteFromColor(color: string): ButterflyPalette {
  return {
    wing: lighten(color, 0.25),
    wingDeep: color,
    spot: lighten(color, 0.8),
    edge: darken(color, 0.35),
  };
}

export function butterflyPair(colors: ButterflyColors): ButterflyPair {
  return [paletteFromColor(colors.c1), paletteFromColor(colors.c2)];
}

export const ButterflyContext = createContext<ButterflyPair>(butterflyPair(DEFAULT_BUTTERFLY_COLORS));

function Butterfly({
  x,
  y,
  scale,
  rotate,
  tone,
}: {
  x: number;
  y: number;
  scale: number;
  rotate: number;
  tone: 0 | 1;
}) {
  const c = useContext(ButterflyContext)[tone];

  // the right-hand wings; the left-hand ones are the same shapes mirrored
  const wings = (
    <g strokeLinejoin="round">
      <path
        d="M1 -2 C5 -16 24 -32 37 -24 C46 -17 34 -2 1 2Z"
        fill={c.wing}
        stroke={c.edge}
        strokeOpacity="0.45"
        strokeWidth="0.8"
      />
      <path
        d="M1 1 C14 1 32 6 28 20 C24 31 8 26 1 9Z"
        fill={c.wingDeep}
        stroke={c.edge}
        strokeOpacity="0.45"
        strokeWidth="0.8"
      />
      <path d="M4 -4 C9 -14 22 -24 31 -20 C36 -15 28 -6 4 -1Z" fill={c.spot} opacity="0.5" />
      <circle cx="26" cy="-17" r="3" fill="#ffffff" opacity="0.55" />
      <circle cx="18" cy="14" r="2.4" fill={c.spot} opacity="0.75" />
      <path
        d="M5 -3 C14 -10 22 -16 30 -20"
        fill="none"
        stroke={c.edge}
        strokeOpacity="0.25"
        strokeWidth="0.6"
        strokeLinecap="round"
      />
    </g>
  );

  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      {wings}
      <g transform="scale(-1 1)">{wings}</g>
      <ellipse cx="0" cy="2" rx="1.8" ry="10" fill={c.edge} />
      <path
        d="M0 -8 C-1 -15 -4 -19 -8 -21 M0 -8 C1 -15 4 -19 8 -21"
        fill="none"
        stroke={c.edge}
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <circle cx="-8" cy="-21" r="1" fill={c.edge} />
      <circle cx="8" cy="-21" r="1" fill={c.edge} />
    </g>
  );
}

function ButterflySprig({ length, c }: { length: number; c: number }) {
  const tip = sprigPoint(1, c, length);
  const mid = sprigPoint(0.58, c, length);
  const side = c > 0 ? 1 : -1;
  const main: 0 | 1 = c > 0 ? 0 : 1;
  const small: 0 | 1 = c > 0 ? 1 : 0;

  return (
    <g>
      <path
        d={sprigStem(length, c)}
        fill="none"
        stroke="#8fa98f"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {length > 330 && (
        <Butterfly
          x={round(mid.x + side * 8)}
          y={mid.y}
          scale={0.5}
          rotate={round(side * 32 + mid.tilt)}
          tone={small}
        />
      )}
      <Butterfly x={tip.x} y={tip.y} scale={0.95} rotate={round(side * 10 + tip.tilt)} tone={main} />
    </g>
  );
}

export function FillerSprig({ kind, spec }: { kind: FillerId; spec: SprigSpec }) {
  let art: ReactNode = null;

  switch (kind) {
    case "eucalyptus":
      art = <EucalyptusSprig length={spec.length} c={spec.c} />;
      break;
    case "babysBreath":
      art = <BabysBreathSprig length={spec.length} c={spec.c} />;
      break;
    case "fern":
      art = <FernSprig length={spec.length} c={spec.c} />;
      break;
    case "wheat":
      art = <WheatSprig length={spec.length} c={spec.c} />;
      break;
    case "olive":
      art = <OliveSprig length={spec.length} c={spec.c} />;
      break;
    case "butterflies":
      art = <ButterflySprig length={spec.length} c={spec.c} />;
      break;
  }

  return <g transform={`translate(${TIE.x} ${TIE.y - 8}) rotate(${spec.angle})`}>{art}</g>;
}