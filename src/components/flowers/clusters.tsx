"use client";

import { darken, lighten, mix, polar, round } from "@/lib/svg-utils";
import { FivePetalFlower, GREEN, Stem } from "./primitives";
import type { BloomProps } from "./primitives";


const HYDRANGEA_FLORETS = Array.from({ length: 48 }, (_, i) => {
  const r = 4.55 * Math.sqrt(i + 0.6);
  const p = polar(60, 52, round(r), i * 137.508);
  return {
    x: p.x,
    y: p.y,
    size: round(5.4 + ((i * 5) % 4) * 0.6),
    rot: (i * 31) % 90,
    shade: i % 4,
  };
}).reverse(); // draw the outer florets first so the centre ones sit on top

export function Hydrangea({ uid, color, center }: BloomProps) {
  const shades = [color, lighten(color, 0.18), mix(color, "#c9a8d8", 0.35), darken(color, 0.08)];

  return (
    <>
      <Stem
        y0={90}
        lean={3}
        width={3.4}
        leaves={[
          { t: 0.4, side: -1, length: 42, width: 17, tilt: 55, tone: "dark" },
          { t: 0.58, side: 1, length: 40, width: 16, tilt: 58, tone: "light" },
        ]}
      />
      <g>
        <defs>
          <radialGradient id={`${uid}-hyd-shade`} cx="38%" cy="32%" r="75%">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="0.55" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="1" stopColor="#1d2a3a" stopOpacity="0.22" />
          </radialGradient>
        </defs>

        {HYDRANGEA_FLORETS.map((f, i) => {
          const o = round(f.size * 0.42);
          const pr = round(f.size * 0.5);
          return (
            <g
              key={i}
              transform={`translate(${f.x} ${f.y}) rotate(${f.rot})`}
              fill={shades[f.shade]}
              stroke={darken(color, 0.3)}
              strokeOpacity="0.2"
              strokeWidth="0.4"
            >
              <circle cx="0" cy={-o} r={pr} />
              <circle cx={o} cy="0" r={pr} />
              <circle cx="0" cy={o} r={pr} />
              <circle cx={-o} cy="0" r={pr} />
              <circle cx="0" cy="0" r="1" fill={center} stroke="none" />
            </g>
          );
        })}
        <circle cx="60" cy="52" r="37" fill={`url(#${uid}-hyd-shade)`} />
      </g>
    </>
  );
}


const FMN_FLOWERS = [
  { x: 60, y: 46, r: 10.5, rotate: 8 },
  { x: 41, y: 58, r: 9, rotate: -14 },
  { x: 79, y: 57, r: 9.5, rotate: 20 },
  { x: 48, y: 31, r: 8.5, rotate: 30 },
  { x: 73, y: 33, r: 8, rotate: -10 },
  { x: 60, y: 22, r: 6.5, rotate: 0 },
];
const FMN_BUDS = [
  { x: 31, y: 43, r: 3 },
  { x: 89, y: 44, r: 3.2 },
  { x: 61, y: 9, r: 2.8 },
];

export function ForgetMeNot({ color, center }: Omit<BloomProps, "uid">) {
  return (
    <>
      <Stem
        y0={88}
        lean={4}
        width={2.2}
        leaves={[
          { t: 0.6, side: -1, length: 22, width: 5, tilt: 55, tone: "light" },
          { t: 0.8, side: 1, length: 20, width: 4.5, tilt: 50, tone: "dark" },
        ]}
      />
      <g fill="none" stroke={GREEN.stem} strokeWidth="1.1" strokeLinecap="round">
        {[...FMN_FLOWERS, ...FMN_BUDS].map((item, i) => (
          <path
            key={i}
            d={`M60 88 Q${round((60 + item.x) / 2)} ${round((96 + item.y) / 2)} ${item.x} ${item.y}`}
          />
        ))}
      </g>
      {FMN_BUDS.map((bud, i) => (
        <g key={i}>
          <circle cx={bud.x} cy={bud.y} r={bud.r} fill={darken(color, 0.12)} />
          <circle cx={round(bud.x - 0.8)} cy={round(bud.y - 0.8)} r={round(bud.r * 0.4)} fill={lighten(color, 0.4)} opacity="0.7" />
        </g>
      ))}
      {FMN_FLOWERS.map((f, i) => (
        <FivePetalFlower key={i} x={f.x} y={f.y} r={f.r} rotate={f.rotate} color={color} center={center} />
      ))}
    </>
  );
}

function SweetPeaBlossom({
  uid,
  x,
  y,
  rotate,
  scale,
  color,
  center,
}: BloomProps & { x: number; y: number; rotate: number; scale: number }) {
  const edge = darken(color, 0.3);
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path
        d="M0 -3 C-14 -6 -24 -20 -17 -31 C-14 -35 -9 -34 -6 -37 C-3 -40 3 -40 6 -37 C9 -34 14 -35 17 -31 C24 -20 14 -6 0 -3Z"
        fill={`url(#${uid}-sp-std)`}
        stroke={edge}
        strokeOpacity="0.25"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      <g fill="none" stroke={edge} strokeOpacity="0.22" strokeWidth="0.6" strokeLinecap="round">
        <path d="M0 -5 C-2 -17 -4 -27 -6 -36" />
        <path d="M0 -5 L0 -37" />
        <path d="M0 -5 C2 -17 4 -27 6 -36" />
      </g>
      <path
        d="M0 -2 C-13 1 -21 -9 -16 -20 C-12 -25 -4 -19 0 -2Z"
        fill={`url(#${uid}-sp-wing)`}
        stroke={edge}
        strokeOpacity="0.28"
        strokeWidth="0.6"
      />
      <path
        d="M0 -2 C13 1 21 -9 16 -20 C12 -25 4 -19 0 -2Z"
        fill={`url(#${uid}-sp-wing)`}
        stroke={edge}
        strokeOpacity="0.28"
        strokeWidth="0.6"
      />
      <path
        d="M-3.5 -3 C-5 -11 5 -11 3.5 -3 C2.5 0 -2.5 0 -3.5 -3Z"
        fill={lighten(color, 0.55)}
        stroke={edge}
        strokeOpacity="0.2"
        strokeWidth="0.5"
      />
      <path
        d="M-3.5 0 C-4 -3 -2 -5 0 -5 C2 -5 4 -3 3.5 0 C2 2 -2 2 -3.5 0Z"
        fill={GREEN.leafDark}
      />
      <circle cx="0" cy="-9" r="0.01" fill={center} />
    </g>
  );
}

export function SweetPea({ uid, color, center }: BloomProps) {
  return (
    <>
      <defs>
        <radialGradient id={`${uid}-sp-std`} cx="50%" cy="88%" r="85%">
          <stop offset="0" stopColor={mix(color, center, 0.45)} />
          <stop offset="0.55" stopColor={color} />
          <stop offset="1" stopColor={lighten(color, 0.35)} />
        </radialGradient>
        <linearGradient id={`${uid}-sp-wing`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={mix(color, center, 0.55)} />
          <stop offset="1" stopColor={mix(color, center, 0.2)} />
        </linearGradient>
      </defs>
      <Stem
        y0={86}
        lean={4}
        width={2.6}
        leaves={[
          { t: 0.5, side: -1, length: 22, width: 6, tilt: 58, tone: "light" },
          { t: 0.68, side: 1, length: 20, width: 5.5, tilt: 60, tone: "dark" },
        ]}
      />
      <g fill="none" stroke={GREEN.stem} strokeWidth="1.3" strokeLinecap="round">
        <path d="M60 88 Q50 84 44 74" />
        <path d="M60 86 Q72 82 76 70" />
        <path d="M60 84 Q60 66 66 48" />
        <path d="M60 104 C70 96 88 100 86 112 C84 122 74 118 77 110" strokeWidth="1" />
      </g>
      <SweetPeaBlossom uid={uid} x={44} y={74} rotate={-12} scale={0.95} color={color} center={center} />
      <SweetPeaBlossom uid={uid} x={76} y={70} rotate={16} scale={0.8} color={color} center={center} />
      <g transform="translate(66 48) rotate(5)">
        <path
          d="M0 0 C-5 -4 -6 -13 0 -19 C6 -13 5 -4 0 0Z"
          fill={mix(color, center, 0.3)}
          stroke={darken(color, 0.3)}
          strokeOpacity="0.25"
          strokeWidth="0.5"
        />
        <path d="M-3.4 1 C-4 -2 -2 -5 0 -5 C2 -5 4 -2 3.4 1 C2 3 -2 3 -3.4 1Z" fill={GREEN.leafDark} />
      </g>
    </>
  );
}


const LANTANA_FLORETS = Array.from({ length: 34 }, (_, i) => {
  const r = 4.1 * Math.sqrt(i + 0.6);
  const p = polar(60, 52, round(r), i * 137.508);
  return { x: p.x, y: p.y, i };
}).reverse();

export function Lantana({ uid, color, center }: BloomProps) {
  const mid = mix(center, color, 0.55);

  return (
    <>
      <defs>
        <radialGradient id={`${uid}-lan`} cx="38%" cy="32%" r="75%">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="0.6" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#3a1f24" stopOpacity="0.18" />
        </radialGradient>
      </defs>
      <Stem
        y0={84}
        lean={3}
        width={3}
        leaves={[
          { t: 0.4, side: -1, length: 36, width: 13, tilt: 55, tone: "dark" },
          { t: 0.6, side: 1, length: 34, width: 12, tilt: 58, tone: "light" },
          { t: 0.82, side: -1, length: 26, width: 9, tilt: 60, tone: "dark" },
        ]}
      />
      <g transform="translate(60 52) scale(1 0.9) translate(-60 -52)">
        {LANTANA_FLORETS.map((f) => {
          const fill = f.i < 9 ? center : f.i < 22 ? mid : color;
          return (
            <g key={f.i} transform={`translate(${f.x} ${f.y})`} fill={fill} stroke={darken(fill, 0.3)} strokeOpacity="0.25" strokeWidth="0.3">
              <circle cx="0" cy="-2.3" r="2.5" />
              <circle cx="2.3" cy="0" r="2.5" />
              <circle cx="0" cy="2.3" r="2.5" />
              <circle cx="-2.3" cy="0" r="2.5" />
              <circle r="0.9" fill={darken(fill, 0.25)} stroke="none" />
            </g>
          );
        })}
        <circle cx="60" cy="52" r="27" fill={`url(#${uid}-lan)`} />
      </g>
    </>
  );
}

const IMP_PETAL = "M0 0 C-14 -4 -18 -20 -8 -25 C-3 -27 3 -27 8 -25 C18 -20 14 -4 0 0Z";

function ImpatiensFlower({
  id,
  x,
  y,
  s,
  rot,
  color,
  center,
}: {
  id: string;
  x: number;
  y: number;
  s: number;
  rot: number;
  color: string;
  center: string;
}) {
  const edge = darken(color, 0.4);
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path
        d="M0 4 C4 16 14 24 24 24 C24 28 14 28 6 22 C0 17 -2 10 0 4Z"
        fill={darken(color, 0.12)}
        stroke={edge}
        strokeOpacity="0.3"
        strokeWidth="0.5"
      />
      {Array.from({ length: 5 }, (_, i) => (
        <g key={i} transform={`rotate(${i * 72})`}>
          <path d={IMP_PETAL} fill={`url(#${id})`} stroke={edge} strokeOpacity="0.28" strokeWidth="0.6" strokeLinejoin="round" />
          <path d="M0 -4 L0 -19" stroke={edge} strokeOpacity="0.16" strokeWidth="0.5" strokeLinecap="round" />
        </g>
      ))}
      <circle r="5" fill={center} opacity="0.9" />
      <circle r="2" fill="#f6d46a" />
    </g>
  );
}

export function Impatiens({ uid, color, center }: BloomProps) {
  const id = `${uid}-imp`;

  return (
    <>
      <defs>
        <radialGradient id={id} cx="50%" cy="100%" r="110%">
          <stop offset="0" stopColor={lighten(color, 0.6)} />
          <stop offset="0.35" stopColor={color} />
          <stop offset="1" stopColor={darken(color, 0.12)} />
        </radialGradient>
      </defs>
      <Stem
        y0={88}
        lean={4}
        width={2.8}
        leaves={[
          { t: 0.45, side: -1, length: 34, width: 10, tilt: 54, tone: "dark" },
          { t: 0.62, side: 1, length: 32, width: 9, tilt: 56, tone: "light" },
          { t: 0.8, side: -1, length: 26, width: 8, tilt: 60, tone: "dark" },
        ]}
      />
      <path d="M60 90 Q74 90 84 76" fill="none" stroke={GREEN.stem} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M60 90 Q50 80 46 60" fill="none" stroke={GREEN.stem} strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="93" cy="38" rx="3.4" ry="5" fill={darken(color, 0.1)} />
      <ImpatiensFlower id={id} x={84} y={76} s={0.62} rot={14} color={color} center={center} />
      <ImpatiensFlower id={id} x={52} y={50} s={0.98} rot={-8} color={color} center={center} />
    </>
  );
}

function OrchidBloom({
  id,
  x,
  y,
  s,
  rot,
  color,
  center,
}: {
  id: string;
  x: number;
  y: number;
  s: number;
  rot: number;
  color: string;
  center: string;
}) {
  const edge = darken(color, 0.3);
  const common = { fill: `url(#${id})`, stroke: edge, strokeOpacity: 0.3, strokeWidth: 0.6 };

  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <ellipse cx="-9" cy="14" rx="8.5" ry="14" transform="rotate(24 -9 14)" {...common} />
      <ellipse cx="9" cy="14" rx="8.5" ry="14" transform="rotate(-24 9 14)" {...common} />
      <ellipse cx="0" cy="-18" rx="9" ry="14.5" {...common} />
      <ellipse cx="-16" cy="-2" rx="18" ry="13.5" transform="rotate(-12 -16 -2)" {...common} />
      <ellipse cx="16" cy="-2" rx="18" ry="13.5" transform="rotate(12 16 -2)" {...common} />
      <g fill="none" stroke={center} strokeOpacity="0.3" strokeWidth="0.5" strokeLinecap="round">
        <path d="M-6 -2 C-14 -4 -22 -4 -30 -2" />
        <path d="M6 -2 C14 -4 22 -4 30 -2" />
        <path d="M0 -8 L0 -28" />
      </g>
      <path d="M0 -3 C-8 -1 -10 9 -5 14 C-2 18 2 18 5 14 C10 9 8 -1 0 -3Z" fill={center} stroke={darken(center, 0.3)} strokeOpacity="0.3" strokeWidth="0.5" />
      <ellipse cx="0" cy="5" rx="3" ry="4.5" fill="#f2c84b" />
      <ellipse cx="0" cy="-6" rx="3.4" ry="4.2" fill="#ffffff" stroke={edge} strokeOpacity="0.25" strokeWidth="0.4" />
      <circle cx="0" cy="-6.5" r="1" fill="#f2c84b" />
    </g>
  );
}

export function Orchid({ uid, color, center }: BloomProps) {
  const id = `${uid}-orch`;

  return (
    <>
      <defs>
        <radialGradient id={id} cx="50%" cy="60%" r="70%">
          <stop offset="0" stopColor={mix(color, center, 0.22)} />
          <stop offset="0.45" stopColor={lighten(color, 0.3)} />
          <stop offset="1" stopColor={color} />
        </radialGradient>
      </defs>
      <Stem
        y0={92}
        lean={3}
        width={2.6}
        leaves={[
          { t: 0.55, side: -1, length: 48, width: 14, tilt: 62, tone: "dark" },
          { t: 0.78, side: 1, length: 44, width: 13, tilt: 64, tone: "light" },
        ]}
      />
      <g fill="none" stroke={GREEN.stem} strokeWidth="1.8" strokeLinecap="round">
        <path d="M60 94 C60 76 78 70 90 62" />
        <path d="M70 90 Q82 96 91 88" />
      </g>
      <circle cx="94" cy="58" r="3.4" fill={lighten(color, 0.1)} stroke={darken(color, 0.3)} strokeOpacity="0.3" strokeWidth="0.5" />
      <circle cx="100" cy="68" r="2.6" fill={lighten(color, 0.1)} stroke={darken(color, 0.3)} strokeOpacity="0.3" strokeWidth="0.5" />
      <OrchidBloom id={id} x={92} y={88} s={0.6} rot={14} color={color} center={center} />
      <OrchidBloom id={id} x={54} y={50} s={1} rot={-6} color={color} center={center} />
    </>
  );
}