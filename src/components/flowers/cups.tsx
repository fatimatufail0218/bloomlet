"use client";

import { darken, lighten, mix, polar, round } from "@/lib/svg-utils";
import { Calyx, Dots, GREEN, Stem } from "./primitives";
import type { BloomProps } from "./primitives";


export function Tulip({ uid, color, center }: BloomProps) {
  const front = `${uid}-tulip`;
  const back = `${uid}-tulip-back`;
  const edge = darken(color, 0.3);

  return (
    <>
      <defs>
        <linearGradient id={front} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={lighten(color, 0.4)} />
          <stop offset="0.5" stopColor={color} />
          <stop offset="1" stopColor={mix(color, center, 0.5)} />
        </linearGradient>
        <linearGradient id={back} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={mix(color, center, 0.25)} />
          <stop offset="1" stopColor={mix(color, center, 0.7)} />
        </linearGradient>
      </defs>
      <Stem
        y0={80}
        lean={2.5}
        width={4}
        leaves={[
          { t: 0.6, side: -1, length: 74, width: 12, tilt: 14, tone: "pale" },
          { t: 0.78, side: 1, length: 66, width: 11, tilt: 16, tone: "light" },
        ]}
      />
      <path
        d="M60 80 C50 74 47 50 53 30 C55 23 58 19 60 16 C62 19 65 23 67 30 C73 50 70 74 60 80Z"
        fill={`url(#${back})`}
        stroke={edge}
        strokeOpacity="0.25"
        strokeWidth="0.6"
      />
      <path
        d="M60 82 C40 82 33 58 38 32 C39 27 42 25 44 28 C49 40 58 54 60 82Z"
        fill={`url(#${front})`}
        stroke={edge}
        strokeOpacity="0.25"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      <path
        d="M60 82 C80 82 87 58 82 32 C81 27 78 25 76 28 C71 40 62 54 60 82Z"
        fill={`url(#${front})`}
        stroke={edge}
        strokeOpacity="0.25"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      <g fill="none" strokeLinecap="round">
        <path d="M43 33 C46 52 50 64 56 76" stroke={edge} strokeOpacity="0.25" strokeWidth="0.6" />
        <path d="M77 33 C74 52 70 64 64 76" stroke={edge} strokeOpacity="0.25" strokeWidth="0.6" />
        <path d="M41 40 C42 50 46 60 51 68" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="2.2" />
      </g>
    </>
  );
}

const LILY_OUTER = "M0 0 C-10 -9 -13 -27 -4 -41 Q0 -46 4 -41 C13 -27 10 -9 0 0Z";
const LILY_INNER = "M0 0 C-12 -8 -15 -26 -5 -40 Q0 -45 5 -40 C15 -26 12 -8 0 0Z";

export function Lily({ uid, color, center }: BloomProps) {
  const gradient = `${uid}-lily`;
  const edge = darken(color, 0.3);

  return (
    <>
      <Stem
        y0={84}
        lean={3}
        width={3.2}
        leaves={[
          { t: 0.5, side: -1, length: 62, width: 7, tilt: 16, tone: "dark" },
          { t: 0.66, side: 1, length: 58, width: 7, tilt: 18, tone: "light" },
          { t: 0.82, side: -1, length: 40, width: 6, tilt: 28, tone: "pale" },
        ]}
      />
      <g transform="translate(60 54) scale(1 0.94) translate(-60 -54)">
        <defs>
          <linearGradient id={gradient} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#d9e3a2" />
            <stop offset="0.28" stopColor={lighten(color, 0.25)} />
            <stop offset="1" stopColor={color} />
          </linearGradient>
        </defs>

        {[0, 120, 240].map((a) => (
          <g key={`o${a}`} transform={`translate(60 54) rotate(${a})`}>
            <path d={LILY_OUTER} fill={`url(#${gradient})`} stroke={edge} strokeOpacity="0.25" strokeWidth="0.6" strokeLinejoin="round" />
            <path d="M0 -3 L0 -37" stroke={edge} strokeOpacity="0.2" strokeWidth="0.7" strokeLinecap="round" />
          </g>
        ))}
        {[60, 180, 300].map((a) => (
          <g key={`i${a}`} transform={`translate(60 54) rotate(${a})`}>
            <path d={LILY_INNER} fill={`url(#${gradient})`} stroke={edge} strokeOpacity="0.28" strokeWidth="0.6" strokeLinejoin="round" />
            <g fill="none" stroke={edge} strokeOpacity="0.2" strokeWidth="0.6" strokeLinecap="round">
              <path d="M0 -3 L0 -36" />
              <path d="M-1.5 -5 C-5 -16 -6 -27 -4 -36" />
              <path d="M1.5 -5 C5 -16 6 -27 4 -36" />
            </g>
          </g>
        ))}

        {Array.from({ length: 6 }, (_, k) => (
          <g key={k} transform={`translate(60 54) rotate(${k * 60 + 15})`}>
            <path d="M0 0 L0 -17" stroke="#e8e2b8" strokeWidth="0.9" strokeLinecap="round" />
            <ellipse cx="0" cy="-19" rx="1.8" ry="4.2" fill="#b8651f" />
          </g>
        ))}
        <path d="M60 54 L60 31" stroke="#c9d79a" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="60" cy="30" r="2" fill={center} />
      </g>
    </>
  );
}

export function Iris({ uid, color, center }: BloomProps) {
  const std = `${uid}-iris-std`;
  const fall = `${uid}-iris-fall`;
  const edge = darken(color, 0.35);

  const leftFall = (
    <g>
      <path
        d="M-1 2 C-10 -2 -26 2 -33 14 C-37 22 -32 31 -24 29 C-16 26 -6 18 -1 4Z"
        fill={`url(#${fall})`}
        stroke={edge}
        strokeOpacity="0.3"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      <g fill="none" stroke="#ffffff" strokeOpacity="0.32" strokeWidth="0.5" strokeLinecap="round">
        <path d="M-3 4 C-12 6 -22 11 -29 17" />
        <path d="M-3 5 C-10 10 -17 17 -22 24" />
        <path d="M-2 6 C-6 12 -10 17 -14 22" />
      </g>
      <ellipse cx="-12" cy="9" rx="1.9" ry="8" transform="rotate(66 -12 9)" fill={center} opacity="0.95" />
    </g>
  );

  return (
    <>
      <defs>
        <linearGradient id={std} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={lighten(color, 0.5)} />
          <stop offset="0.5" stopColor={lighten(color, 0.12)} />
          <stop offset="1" stopColor={color} />
        </linearGradient>
        <radialGradient id={fall} cx="50%" cy="8%" r="95%">
          <stop offset="0" stopColor={lighten(color, 0.55)} />
          <stop offset="0.35" stopColor={color} />
          <stop offset="1" stopColor={darken(color, 0.28)} />
        </radialGradient>
      </defs>
      <Stem
        y0={84}
        lean={2}
        width={3.4}
        leaves={[
          { t: 0.7, side: -1, length: 100, width: 7, tilt: 7, tone: "pale" },
          { t: 0.85, side: 1, length: 86, width: 7, tilt: 9, tone: "light" },
        ]}
      />
      <g transform="translate(60 54)">
        <g fill={`url(#${std})`} stroke={edge} strokeOpacity="0.28" strokeWidth="0.6" strokeLinejoin="round">
          <path d="M0 2 C-20 2 -30 -12 -25 -29 C-21 -33 -12 -26 -5 -12 C-2 -6 0 -1 0 2Z" />
          <path d="M0 2 C20 2 30 -12 25 -29 C21 -33 12 -26 5 -12 C2 -6 0 -1 0 2Z" />
          <path d="M0 2 C-9 -6 -10 -24 -3 -35 C-1 -38 1 -38 3 -35 C10 -24 9 -6 0 2Z" />
        </g>
        {leftFall}
        <g transform="scale(-1 1)">{leftFall}</g>
        <g>
          <path
            d="M0 2 C-9 6 -13 20 -10 31 C-8 37 8 37 10 31 C13 20 9 6 0 2Z"
            fill={`url(#${fall})`}
            stroke={edge}
            strokeOpacity="0.3"
            strokeWidth="0.6"
            strokeLinejoin="round"
          />
          <g fill="none" stroke="#ffffff" strokeOpacity="0.32" strokeWidth="0.5" strokeLinecap="round">
            <path d="M-2 6 C-5 14 -7 22 -7 31" />
            <path d="M0 6 L0 33" />
            <path d="M2 6 C5 14 7 22 7 31" />
          </g>
          <ellipse cx="0" cy="13" rx="2.4" ry="9" fill={center} opacity="0.95" />
        </g>
      </g>
    </>
  );
}


const POPPY_PETAL =
  "M0 0 C-17 -3 -30 -15 -28 -31 C-27 -41 -17 -45 -9 -42 C-5 -46 5 -46 9 -42 C17 -45 27 -41 28 -31 C30 -15 17 -3 0 0Z";

export function Poppy({ uid, color, center }: BloomProps) {
  const gradient = `${uid}-poppy`;
  const petals = [
    { angle: 8, scale: 0.78 },
    { angle: 188, scale: 0.78 },
    { angle: 98, scale: 0.7 },
    { angle: 278, scale: 0.7 },
  ];

  return (
    <>
      <Stem
        y0={80}
        lean={5}
        width={2.8}
        leaves={[
          { t: 0.55, side: -1, length: 40, width: 8, tilt: 48, tone: "dark" },
          { t: 0.75, side: 1, length: 36, width: 7.5, tilt: 52, tone: "light" },
        ]}
      />
      <g transform="translate(60 54) scale(1 0.9) translate(-60 -54)">
        <defs>
          <radialGradient id={gradient} cx="50%" cy="95%" r="90%">
            <stop offset="0" stopColor={mix(color, center, 0.7)} />
            <stop offset="0.18" stopColor={mix(color, center, 0.35)} />
            <stop offset="0.5" stopColor={color} />
            <stop offset="1" stopColor={lighten(color, 0.3)} />
          </radialGradient>
          <radialGradient id={`${uid}-pod`} cx="40%" cy="35%" r="70%">
            <stop offset="0" stopColor="#c3d3a8" />
            <stop offset="1" stopColor="#7f9a6c" />
          </radialGradient>
        </defs>

        {petals.map((p) => (
          <g key={p.angle} transform={`translate(60 54) rotate(${p.angle}) scale(${p.scale})`}>
            <path
              d={POPPY_PETAL}
              fill={`url(#${gradient})`}
              stroke={darken(color, 0.32)}
              strokeOpacity="0.25"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
            <g fill="none" strokeLinecap="round">
              <path d="M0 -4 C-6 -16 -10 -28 -14 -38" stroke={darken(color, 0.3)} strokeOpacity="0.2" strokeWidth="0.7" />
              <path d="M0 -4 C6 -16 10 -28 14 -38" stroke={darken(color, 0.3)} strokeOpacity="0.2" strokeWidth="0.7" />
              <path d="M0 -4 L0 -40" stroke={darken(color, 0.3)} strokeOpacity="0.16" strokeWidth="0.7" />
              <path d="M-9 -22 C-6 -30 -3 -35 -2 -40" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="1.2" />
            </g>
          </g>
        ))}

        <circle cx="60" cy="54" r="9.5" fill={center} opacity="0.92" />
        {Array.from({ length: 22 }, (_, i) => {
          const a = i * (360 / 22);
          const p1 = polar(60, 54, 7, a);
          const p2 = polar(60, 54, 13, a);
          return (
            <g key={i}>
              <path d={`M${p1.x} ${p1.y} L${p2.x} ${p2.y}`} stroke={center} strokeWidth="0.6" />
              <circle cx={p2.x} cy={p2.y} r="1" fill={darken(center, 0.2)} />
            </g>
          );
        })}
        <circle cx="60" cy="54" r="5" fill={`url(#${uid}-pod)`} stroke="#5c7550" strokeOpacity="0.5" strokeWidth="0.5" />
        <g stroke="#5c7550" strokeOpacity="0.55" strokeWidth="0.5" strokeLinecap="round">
          {Array.from({ length: 8 }, (_, i) => {
            const p = polar(60, 54, 4.2, i * 45);
            return <path key={i} d={`M60 54 L${p.x} ${p.y}`} />;
          })}
        </g>
        <circle cx="58.4" cy="52.4" r="1.2" fill="#ffffff" opacity="0.4" />
      </g>
    </>
  );
}

const PRIM_PETAL =
  "M0 0 C-12 -4 -18 -16 -11 -23 C-8 -25 -3 -23 0 -18 C3 -23 8 -25 11 -23 C18 -16 12 -4 0 0Z";

export function Primrose({ uid, color, center }: BloomProps) {
  const id = `${uid}-prim`;
  const edge = darken(color, 0.35);

  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={mix(color, center, 0.55)} />
          <stop offset="0.4" stopColor={color} />
          <stop offset="1" stopColor={lighten(color, 0.3)} />
        </linearGradient>
      </defs>
      <Stem
        y0={76}
        lean={3}
        width={2.4}
        leaves={[
          { t: 0.55, side: -1, length: 46, width: 15, tilt: 64, tone: "dark" },
          { t: 0.72, side: 1, length: 42, width: 14, tilt: 66, tone: "light" },
          { t: 0.9, side: -1, length: 30, width: 11, tilt: 70, tone: "pale" },
        ]}
      />
      <g transform="translate(60 52) scale(1 0.94)">
        {Array.from({ length: 5 }, (_, i) => (
          <g key={i} transform={`rotate(${i * 72})`}>
            <path d={PRIM_PETAL} fill={`url(#${id})`} stroke={edge} strokeOpacity="0.28" strokeWidth="0.6" strokeLinejoin="round" />
            <g fill="none" stroke={edge} strokeOpacity="0.18" strokeWidth="0.5" strokeLinecap="round">
              <path d="M0 -4 L0 -16" />
              <path d="M-2 -4 C-5 -9 -7 -14 -7 -19" />
              <path d="M2 -4 C5 -9 7 -14 7 -19" />
            </g>
          </g>
        ))}
        <path
          d="M0 -7 L1.8 -2.4 L6.6 -2 L2.9 1.1 L4.1 6 L0 3.4 L-4.1 6 L-2.9 1.1 L-6.6 -2 L-1.8 -2.4Z"
          fill={center}
          opacity="0.85"
        />
        <circle r="2.6" fill="#b4c85a" />
        <circle cx="-0.8" cy="-0.8" r="0.9" fill="#ffffff" opacity="0.5" />
      </g>
    </>
  );
}

const HEART_LEAF =
  "M0 0 C-14 -2 -18 -16 -6 -26 C-3 -29 -1 -31 0 -34 C1 -31 3 -29 6 -26 C18 -16 14 -2 0 0Z";

function HeartLeaf({ x, y, angle, s, fill }: { x: number; y: number; angle: number; s: number; fill: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${s})`}>
      <path d={HEART_LEAF} fill={fill} />
      <path d={HEART_LEAF} fill="#1f3a2a" opacity="0.1" />
      <g fill="none" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="0.6" strokeLinecap="round">
        <path d="M0 -1 L0 -29" />
        <path d="M0 -8 C-6 -10 -10 -14 -11 -18" />
        <path d="M0 -8 C6 -10 10 -14 11 -18" />
      </g>
    </g>
  );
}

export function Funnel({
  uid,
  color,
  center,
  band,
  star,
  r,
  pointed,
}: BloomProps & { band: string; star: string; r: number; pointed: boolean }) {
  const id = `${uid}-funnel`;
  const ang = (k: number) => -90 + 72 * k;
  const edge = darken(color, 0.35);
  const starPath =
    Array.from({ length: 10 }, (_, k) => {
      const p = polar(0, 0, k % 2 ? r * 0.2 : r * 0.62, -90 + 36 * k);
      return `${k ? "L" : "M"}${p.x} ${p.y}`;
    }).join(" ") + "Z";

  return (
    <>
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="55%">
          <stop offset="0" stopColor={center} />
          <stop offset="0.3" stopColor={lighten(color, 0.45)} />
          <stop offset="1" stopColor={mix(color, "#8a8fa8", 0.12)} />
        </radialGradient>
      </defs>
      <Stem y0={86} lean={3} width={2.2} />
      <HeartLeaf x={59} y={112} angle={-62} s={0.9} fill={GREEN.leafDark} />
      <HeartLeaf x={61} y={138} angle={60} s={0.85} fill={GREEN.leaf} />
      <path d="M61 104 C70 98 74 90 68 86 C64 84 62 88 66 90" fill="none" stroke={GREEN.stem} strokeWidth="1" strokeLinecap="round" />
      <g transform="translate(60 54) scale(1 0.92)">
        {pointed &&
          Array.from({ length: 5 }, (_, k) => {
            const t = polar(0, 0, r * 1.12, ang(k));
            const b1 = polar(0, 0, r * 0.98, ang(k) - 16);
            const b2 = polar(0, 0, r * 0.98, ang(k) + 16);
            return (
              <path
                key={k}
                d={`M${b1.x} ${b1.y} L${t.x} ${t.y} L${b2.x} ${b2.y}Z`}
                fill={color}
                stroke={edge}
                strokeOpacity="0.3"
                strokeWidth="0.6"
                strokeLinejoin="round"
              />
            );
          })}
        <circle r={r} fill={`url(#${id})`} stroke={edge} strokeOpacity="0.3" strokeWidth="0.7" />
        {Array.from({ length: 5 }, (_, k) => {
          const p1 = polar(0, 0, r * 0.98, ang(k) - 9);
          const p2 = polar(0, 0, r * 0.98, ang(k) + 9);
          return <path key={k} d={`M0 0 L${p1.x} ${p1.y} L${p2.x} ${p2.y}Z`} fill={band} opacity="0.5" />;
        })}
        <g stroke="#ffffff" strokeOpacity="0.35" strokeWidth="0.6" strokeLinecap="round">
          {Array.from({ length: 5 }, (_, k) => {
            const p = polar(0, 0, r * 0.96, ang(k) + 36);
            return <path key={k} d={`M0 0 L${p.x} ${p.y}`} />;
          })}
        </g>
        <path d={starPath} fill={star} opacity="0.85" />
        <circle r={round(r * 0.16)} fill={center} stroke={edge} strokeOpacity="0.25" strokeWidth="0.5" />
      </g>
    </>
  );
}

const NASTURTIUM_PETAL =
  "M0 0 C-10 -6 -16 -18 -10 -26 C-6 -30 -2 -28 0 -26 C2 -28 6 -30 10 -26 C16 -18 10 -6 0 0Z";

function NasturtiumLeaf({ x, y, r, fill, stalk }: { x: number; y: number; r: number; fill: string; stalk: string }) {
  return (
    <g>
      <path d={stalk} fill="none" stroke={GREEN.stem} strokeWidth="1.3" strokeLinecap="round" />
      <circle cx={x} cy={y} r={r} fill={fill} />
      <circle cx={x} cy={y} r={r} fill="#1f3a2a" opacity="0.08" />
      <g stroke="#ffffff" strokeOpacity="0.35" strokeWidth="0.6" strokeLinecap="round">
        {Array.from({ length: 9 }, (_, i) => {
          const p = polar(x, y, r * 0.92, i * 40);
          return <path key={i} d={`M${x} ${y} L${p.x} ${p.y}`} />;
        })}
      </g>
      <circle cx={x} cy={y} r={r} fill="none" stroke={darken(fill, 0.3)} strokeOpacity="0.3" strokeWidth="0.6" />
    </g>
  );
}

export function Nasturtium({ uid, color, center }: BloomProps) {
  const id = `${uid}-nas`;
  const edge = darken(color, 0.4);

  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={mix(color, center, 0.45)} />
          <stop offset="0.5" stopColor={color} />
          <stop offset="1" stopColor={lighten(color, 0.2)} />
        </linearGradient>
      </defs>
      <Stem y0={84} lean={3} width={2.4} />
      <NasturtiumLeaf x={30} y={112} r={18} fill={GREEN.leafDark} stalk="M30 112 C40 124 52 130 60 134" />
      <NasturtiumLeaf x={90} y={140} r={14} fill={GREEN.leaf} stalk="M90 140 C80 146 70 150 61 152" />
      <path
        d="M60 54 C74 50 88 56 94 72 C92 75 88 73 85 69 C79 60 70 59 60 58Z"
        fill={darken(color, 0.15)}
        stroke={edge}
        strokeOpacity="0.3"
        strokeWidth="0.6"
      />
      <g transform="translate(60 54) scale(1 0.94)">
        {Array.from({ length: 5 }, (_, i) => (
          <g key={i} transform={`rotate(${i * 72 + 12})`}>
            <path d={NASTURTIUM_PETAL} fill={`url(#${id})`} stroke={edge} strokeOpacity="0.3" strokeWidth="0.6" strokeLinejoin="round" />
            <g fill="none" stroke={center} strokeOpacity="0.55" strokeWidth="0.8" strokeLinecap="round">
              <path d="M0 -3 L0 -14" />
              <path d="M-2 -3 L-5 -12" />
              <path d="M2 -3 L5 -12" />
            </g>
          </g>
        ))}
        <circle r="4" fill={mix(center, "#f6d46a", 0.4)} />
        <circle r="1.6" fill="#8a9a2a" />
      </g>
    </>
  );
}



const HIBISCUS_PETAL =
  "M0 0 C-22 -6 -30 -24 -18 -34 C-10 -40 -2 -34 0 -30 C2 -34 10 -40 18 -34 C30 -24 22 -6 0 0Z";

export function Hibiscus({ uid, color, center }: BloomProps) {
  const id = `${uid}-hib`;
  const edge = darken(color, 0.4);
  const tip = { x: 90, y: 26 };

  return (
    <>
      <defs>
        <radialGradient id={id} cx="50%" cy="100%" r="105%">
          <stop offset="0" stopColor={center} />
          <stop offset="0.3" stopColor={mix(color, center, 0.4)} />
          <stop offset="0.6" stopColor={color} />
          <stop offset="1" stopColor={lighten(color, 0.18)} />
        </radialGradient>
      </defs>
      <Stem
        y0={82}
        lean={4}
        width={3.2}
        leaves={[
          { t: 0.42, side: -1, length: 38, width: 13, tilt: 52, tone: "dark" },
          { t: 0.62, side: 1, length: 36, width: 12, tilt: 56, tone: "light" },
          { t: 0.82, side: -1, length: 28, width: 9, tilt: 60, tone: "dark" },
        ]}
      />
      <Calyx cy={78} />
      <g transform="translate(60 54) scale(1 0.9)">
        {Array.from({ length: 5 }, (_, i) => (
          <g key={i} transform={`rotate(${i * 72 + 6})`}>
            <path d={HIBISCUS_PETAL} fill={`url(#${id})`} stroke={edge} strokeOpacity="0.28" strokeWidth="0.7" strokeLinejoin="round" />
            <g fill="none" stroke={edge} strokeOpacity="0.2" strokeWidth="0.6" strokeLinecap="round">
              <path d="M0 -4 L0 -28" />
              <path d="M-2 -4 C-8 -12 -12 -20 -13 -28" />
              <path d="M2 -4 C8 -12 12 -20 13 -28" />
            </g>
          </g>
        ))}
        <circle r="5" fill={center} opacity="0.85" />
      </g>
      <path
        d={`M60 54 Q74 44 ${tip.x} ${tip.y}`}
        fill="none"
        stroke="#f4b9a6"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <g fill="#f4c94a" stroke="#c9972b" strokeOpacity="0.5" strokeWidth="0.4">
        {Array.from({ length: 8 }, (_, i) => {
          const t = 0.45 + i * 0.07;
          const px = round(60 + (tip.x - 60) * t + (i % 2 ? 2.4 : -2.4));
          const py = round(54 + (tip.y - 54) * t + (i % 2 ? -2 : 2));
          return <circle key={i} cx={px} cy={py} r="1.5" />;
        })}
      </g>
      <g fill="#c2263f">
        {Array.from({ length: 5 }, (_, i) => {
          const p = polar(tip.x, tip.y, 3, i * 72);
          return <circle key={i} cx={p.x} cy={p.y} r="1.5" />;
        })}
      </g>
    </>
  );
}

const LOTUS_PETAL = "M0 0 C-12 -6 -17 -24 0 -42 C17 -24 12 -6 0 0Z";

export function Lotus({ uid, color, center }: BloomProps) {
  const id = `${uid}-lotus`;
  const edge = darken(color, 0.4);
  const tier = (angles: number[], oy: number, s: number, key: string) =>
    angles.map((a) => (
      <path
        key={`${key}${a}`}
        d={LOTUS_PETAL}
        transform={`translate(60 ${oy}) rotate(${a}) scale(${s})`}
        fill={`url(#${id})`}
        stroke={edge}
        strokeOpacity="0.28"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
    ));

  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#fffdf6" />
          <stop offset="0.35" stopColor={lighten(color, 0.55)} />
          <stop offset="1" stopColor={color} />
        </linearGradient>
      </defs>
      <Stem
        y0={76}
        lean={3}
        width={3.4}
        leaves={[
          { t: 0.55, side: -1, length: 52, width: 24, tilt: 42, tone: "dark" },
          { t: 0.74, side: 1, length: 46, width: 22, tilt: 46, tone: "light" },
        ]}
      />
      {tier([-64, -32, 0, 32, 64], 72, 0.96, "b")}
      {tier([-48, -16, 16, 48], 74, 0.9, "m")}
      <ellipse cx="60" cy="62" rx="8" ry="4" fill={center} stroke="#c9972b" strokeOpacity="0.5" strokeWidth="0.5" />
      <Dots cx={60} cy={60} count={7} radius={5} r={1.1} fill="#e0a92e" opacity={0.9} />
      {tier([-24, 0, 24], 78, 0.84, "f")}
    </>
  );
}

const DAFFODIL_RIM =
  Array.from({ length: 24 }, (_, k) => {
    const p = polar(0, 0, 12.5 + (k % 2 ? 1.8 : -0.6), k * 15);
    return `${k ? "L" : "M"}${p.x} ${p.y}`;
  }).join(" ") + "Z";

export function Daffodil({ uid, color, center }: BloomProps) {
  const id = `${uid}-daff`;
  const edge = darken(color, 0.4);

  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={mix(color, center, 0.4)} />
          <stop offset="0.4" stopColor={color} />
          <stop offset="1" stopColor={lighten(color, 0.25)} />
        </linearGradient>
        <radialGradient id={`${id}-cup`} cx="50%" cy="50%" r="55%">
          <stop offset="0" stopColor={darken(center, 0.2)} />
          <stop offset="0.55" stopColor={center} />
          <stop offset="1" stopColor={lighten(center, 0.2)} />
        </radialGradient>
      </defs>
      <Stem
        y0={86}
        lean={2}
        width={3.2}
        leaves={[
          { t: 0.5, side: -1, length: 84, width: 6, tilt: 9, tone: "pale" },
          { t: 0.7, side: 1, length: 76, width: 6, tilt: 12, tone: "light" },
        ]}
      />
      <ellipse cx="60" cy="82" rx="4.6" ry="7" fill="#c9b27a" stroke="#9c8650" strokeOpacity="0.4" strokeWidth="0.5" />
      <g transform="translate(60 54) scale(1 0.94)">
        {Array.from({ length: 6 }, (_, i) => (
          <g key={i} transform={`rotate(${i * 60 + 30}) scale(${i % 2 ? 0.94 : 1})`}>
            <path
              d="M0 0 C-9 -6 -12 -20 0 -34 C12 -20 9 -6 0 0Z"
              fill={`url(#${id})`}
              stroke={edge}
              strokeOpacity="0.28"
              strokeWidth="0.6"
              strokeLinejoin="round"
            />
            <path d="M0 -4 L0 -28" stroke={edge} strokeOpacity="0.16" strokeWidth="0.5" strokeLinecap="round" />
          </g>
        ))}
        <path d={DAFFODIL_RIM} fill={`url(#${id}-cup)`} stroke={edge} strokeOpacity="0.3" strokeWidth="0.6" strokeLinejoin="round" />
        <circle r="8" fill={darken(center, 0.3)} opacity="0.55" />
        <Dots cx={0} cy={0} count={6} radius={4} r={1.1} fill="#f6d46a" opacity={0.9} />
      </g>
    </>
  );
}