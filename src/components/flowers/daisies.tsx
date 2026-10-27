"use client";

import { darken, lighten, mix, polar, round } from "@/lib/svg-utils";
import { Dots, GREEN, Stem } from "./primitives";
import type { BloomProps } from "./primitives";

function petalPath(length: number, width: number) {
  const l = (n: number) => round(-length * n);
  return `M0 0 C${-width} ${l(0.2)} ${-width} ${l(0.92)} ${round(-width * 0.25)} ${-length} Q0 ${l(1.03)} ${round(width * 0.25)} ${-length} C${width} ${l(0.92)} ${width} ${l(0.2)} 0 0Z`;
}

export function Daisy({
  uid,
  color,
  center,
  tip,
  count,
  length,
  width,
  disc,
}: BloomProps & { tip: string; count: number; length: number; width: number; disc: number }) {
  const front = petalPath(length, width);
  const back = petalPath(length * 0.9, width * 1.05);
  const gradient = `${uid}-petal`;
  const step = 360 / count;

  return (
    <>
      <Stem
        y0={78}
        lean={3}
        width={2.8}
        leaves={[
          { t: 0.7, side: -1, length: 26, width: 6, tilt: 52, tone: "light" },
          { t: 0.86, side: 1, length: 24, width: 5.5, tilt: 55, tone: "dark" },
        ]}
      />
      <g transform="translate(60 54) scale(1 0.94) translate(-60 -54)">
        <defs>
          <linearGradient id={gradient} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor={mix(color, center, 0.3)} />
            <stop offset="0.35" stopColor={color} />
            <stop offset="1" stopColor={tip} />
          </linearGradient>
          <radialGradient id={`${uid}-disc`} cx="42%" cy="38%" r="70%">
            <stop offset="0" stopColor={lighten(center, 0.45)} />
            <stop offset="0.55" stopColor={center} />
            <stop offset="1" stopColor={darken(center, 0.35)} />
          </radialGradient>
        </defs>

        {Array.from({ length: count }, (_, i) => (
          <path
            key={`b${i}`}
            d={back}
            transform={`translate(60 54) rotate(${round(step * (i + 0.5))}) translate(0 -4)`}
            fill={darken(color, 0.12)}
            stroke={darken(color, 0.3)}
            strokeOpacity="0.2"
            strokeWidth="0.5"
          />
        ))}
        {Array.from({ length: count }, (_, i) => (
          <g key={`f${i}`} transform={`translate(60 54) rotate(${round(step * i)}) translate(0 -4)`}>
            <path
              d={front}
              fill={`url(#${gradient})`}
              stroke={darken(color, 0.3)}
              strokeOpacity="0.22"
              strokeWidth="0.5"
            />
            <path
              d={`M0 -4 L0 ${round(-length * 0.72)}`}
              stroke={darken(color, 0.25)}
              strokeOpacity="0.14"
              strokeWidth="0.5"
              strokeLinecap="round"
            />
          </g>
        ))}

        <circle cx="60" cy="54" r={disc} fill={`url(#${uid}-disc)`} stroke={darken(center, 0.4)} strokeOpacity="0.35" strokeWidth="0.6" />
        <Dots count={10} radius={round(disc * 0.64)} r={0.9} fill={darken(center, 0.45)} opacity={0.5} />
        <Dots count={5} radius={round(disc * 0.3)} r={0.8} fill={darken(center, 0.45)} opacity={0.5} offset={20} />
        <circle cx="57.2" cy="51.2" r={round(disc * 0.25)} fill={lighten(center, 0.6)} opacity="0.4" />
      </g>
    </>
  );
}


const SUNFLOWER_PETAL = "M0 0 C-7 -7 -8 -22 0 -31 C8 -22 7 -7 0 0Z";

const SUNFLOWER_SEEDS = Array.from({ length: 70 }, (_, i) => {
  const r = 1.42 * Math.sqrt(i + 0.5);
  const p = polar(60, 54, round(r), i * 137.508);
  return { x: p.x, y: p.y, r: round(0.7 + (r / 12) * 0.5), i };
});

export function Sunflower({ uid, color, center }: BloomProps) {
  const petal = `${uid}-sun-petal`;
  const disc = `${uid}-sun-disc`;
  const count = 18;
  const step = 360 / count;

  return (
    <>
      <Stem
        y0={84}
        lean={3}
        width={4.4}
        leaves={[
          { t: 0.55, side: -1, length: 40, width: 15, tilt: 50, tone: "dark" },
          { t: 0.75, side: 1, length: 36, width: 14, tilt: 54, tone: "light" },
        ]}
      />
      <g>
        <defs>
          <linearGradient id={petal} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor={mix(color, "#c46a14", 0.45)} />
            <stop offset="0.45" stopColor={color} />
            <stop offset="1" stopColor={lighten(color, 0.2)} />
          </linearGradient>
          <radialGradient id={disc} cx="42%" cy="38%" r="70%">
            <stop offset="0" stopColor={mix(center, "#8a5a28", 0.5)} />
            <stop offset="0.6" stopColor={center} />
            <stop offset="1" stopColor={darken(center, 0.3)} />
          </radialGradient>
        </defs>

        {Array.from({ length: count }, (_, i) => (
          <path
            key={`b${i}`}
            d={SUNFLOWER_PETAL}
            transform={`translate(60 54) rotate(${round(step * (i + 0.5))}) translate(0 -9) scale(${round(1.02 + (i % 3) * 0.03)})`}
            fill={darken(color, 0.14)}
            stroke={darken(color, 0.35)}
            strokeOpacity="0.25"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
        ))}
        {Array.from({ length: count }, (_, i) => (
          <g
            key={`f${i}`}
            transform={`translate(60 54) rotate(${round(step * i + (i % 2 ? 2 : -2))}) translate(0 -9) scale(${round(0.94 + (i % 3) * 0.04)})`}
          >
            <path
              d={SUNFLOWER_PETAL}
              fill={`url(#${petal})`}
              stroke={darken(color, 0.35)}
              strokeOpacity="0.28"
              strokeWidth="0.5"
              strokeLinejoin="round"
            />
            <path d="M0 -3 L0 -23" stroke={darken(color, 0.3)} strokeOpacity="0.2" strokeWidth="0.5" strokeLinecap="round" />
          </g>
        ))}

        <circle cx="60" cy="54" r="14.6" fill="#7a5a24" opacity="0.9" />
        <circle cx="60" cy="54" r="13.8" fill={`url(#${disc})`} />
        <g>
          {SUNFLOWER_SEEDS.map((seed) => (
            <circle
              key={seed.i}
              cx={seed.x}
              cy={seed.y}
              r={seed.r}
              fill={seed.i % 2 ? lighten(center, 0.38) : darken(center, 0.45)}
              opacity="0.55"
            />
          ))}
        </g>
        <circle cx="55.5" cy="49.5" r="3.4" fill="#ffffff" opacity="0.12" />
      </g>
    </>
  );
}

const DAHLIA_RINGS = [
  { n: 16, len: 31, w: 7.5, off: 0 },
  { n: 14, len: 26, w: 7, off: 12 },
  { n: 12, len: 21, w: 6.5, off: 6 },
  { n: 10, len: 16, w: 5.8, off: 18 },
  { n: 8, len: 11, w: 5, off: 9 },
];

function dahliaPetal(len: number, w: number) {
  const l = (n: number) => round(-len * n);
  return `M0 0 C${-w} ${l(0.25)} ${round(-w * 0.95)} ${l(0.8)} 0 ${-len} C${round(w * 0.95)} ${l(0.8)} ${w} ${l(0.25)} 0 0Z`;
}

export function Dahlia({ uid, color, center }: BloomProps) {
  return (
    <>
      <Stem
        y0={80}
        lean={3}
        width={3}
        leaves={[
          { t: 0.55, side: -1, length: 30, width: 9, tilt: 48, tone: "dark" },
          { t: 0.75, side: 1, length: 28, width: 8.5, tilt: 52, tone: "light" },
        ]}
      />
      <g transform="translate(60 54) scale(1 0.96) translate(-60 -54)">
        <defs>
          {DAHLIA_RINGS.map((_, i) => {
            const tone = mix(color, center, i * 0.09);
            return (
              <linearGradient key={i} id={`${uid}-dahlia-${i}`} x1="0" y1="1" x2="0" y2="0">
                <stop offset="0" stopColor={darken(tone, 0.22)} />
                <stop offset="0.5" stopColor={tone} />
                <stop offset="1" stopColor={lighten(tone, 0.22)} />
              </linearGradient>
            );
          })}
        </defs>

        {DAHLIA_RINGS.map((ring, i) => {
          const d = dahliaPetal(ring.len, ring.w);
          const tone = mix(color, center, i * 0.09);
          return (
            <g key={i}>
              {Array.from({ length: ring.n }, (_, k) => (
                <path
                  key={k}
                  d={d}
                  transform={`translate(60 54) rotate(${round(ring.off + (360 / ring.n) * k)})`}
                  fill={`url(#${uid}-dahlia-${i})`}
                  stroke={darken(tone, 0.3)}
                  strokeOpacity="0.28"
                  strokeWidth="0.5"
                  strokeLinejoin="round"
                />
              ))}
            </g>
          );
        })}

        <circle cx="60" cy="54" r="3.2" fill={darken(center, 0.25)} />
        <Dots count={6} radius={2} r={0.7} fill={lighten(center, 0.5)} opacity={0.7} />
      </g>
    </>
  );
}



const FLORET =
  "M0 0 L-2.6 -11 L-8.6 -19.5 L-6 -23.5 L-3.4 -21 L-2.2 -27 L0 -23 L2.2 -27 L3.4 -21 L6 -23.5 L8.6 -19.5 L2.6 -11Z";

export function Cornflower({ uid, color, center }: BloomProps) {
  const outer = `${uid}-floret`;
  const inner = `${uid}-floret-inner`;

  return (
    <>
      <Stem
        y0={84}
        lean={3}
        width={2.2}
        leaves={[
          { t: 0.5, side: -1, length: 36, width: 3, tilt: 30, tone: "pale" },
          { t: 0.72, side: 1, length: 32, width: 3, tilt: 34, tone: "dark" },
          { t: 0.88, side: -1, length: 24, width: 2.6, tilt: 40, tone: "pale" },
        ]}
      />
      <g>
        <ellipse cx="60" cy="80" rx="6.5" ry="7.5" fill={GREEN.leafDark} />
        <path
          d="M55 77 Q60 84 65 77 M54.5 81 Q60 88 65.5 81"
          stroke={GREEN.leafPale}
          strokeWidth="0.7"
          strokeOpacity="0.6"
          fill="none"
        />
      </g>
      <defs>
        <linearGradient id={outer} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={darken(color, 0.28)} />
          <stop offset="0.5" stopColor={color} />
          <stop offset="1" stopColor={lighten(color, 0.2)} />
        </linearGradient>
        <linearGradient id={inner} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={darken(color, 0.4)} />
          <stop offset="1" stopColor={darken(color, 0.1)} />
        </linearGradient>
      </defs>
      <g transform="translate(60 54)" strokeLinejoin="round">
        {Array.from({ length: 9 }, (_, i) => (
          <path
            key={`o${i}`}
            d={FLORET}
            transform={`rotate(${i * 40})`}
            fill={`url(#${outer})`}
            stroke={darken(color, 0.32)}
            strokeOpacity="0.3"
            strokeWidth="0.5"
          />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <path
            key={`i${i}`}
            d={FLORET}
            transform={`rotate(${i * 40 + 20}) scale(0.62)`}
            fill={`url(#${inner})`}
            stroke={darken(color, 0.4)}
            strokeOpacity="0.3"
            strokeWidth="0.6"
          />
        ))}
        <circle r="6" fill={darken(color, 0.38)} />
        <Dots cx={0} cy={0} count={10} radius={3.4} r={0.95} fill={lighten(color, 0.55)} opacity={0.9} />
        <circle r="1.4" fill={center} />
      </g>
    </>
  );
}

const COSMOS_PETAL =
  "M0 0 C-6 -3 -13 -14 -11 -24 Q-10 -27 -7.5 -26.5 L-5.5 -24.5 L-3.5 -27.5 Q0 -29 3.5 -27.5 L5.5 -24.5 L7.5 -26.5 Q10 -27 11 -24 C13 -14 6 -3 0 0Z";

export function Cosmos({ uid, color, center }: BloomProps) {
  const gradient = `${uid}-cosmos`;
  const wobble = [-3, 4, -2, 3, -4, 2, -3, 4];

  return (
    <>
      <Stem
        y0={80}
        lean={4}
        width={2}
        leaves={[
          { t: 0.3, side: -1, length: 24, width: 0, tilt: 50, feather: true },
          { t: 0.42, side: 1, length: 22, width: 0, tilt: 52, feather: true },
          { t: 0.58, side: -1, length: 26, width: 0, tilt: 48, feather: true },
          { t: 0.72, side: 1, length: 24, width: 0, tilt: 54, feather: true },
          { t: 0.86, side: -1, length: 20, width: 0, tilt: 56, feather: true },
        ]}
      />
      <g transform="translate(60 54) scale(1 0.93) translate(-60 -54)">
        <defs>
          <linearGradient id={gradient} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor={mix(color, center, 0.55)} />
            <stop offset="0.38" stopColor={mix(color, center, 0.12)} />
            <stop offset="1" stopColor={lighten(color, 0.25)} />
          </linearGradient>
          <radialGradient id={`${uid}-cosmos-disc`} cx="42%" cy="38%" r="70%">
            <stop offset="0" stopColor="#F8E08A" />
            <stop offset="0.6" stopColor="#E3B84F" />
            <stop offset="1" stopColor="#B98A32" />
          </radialGradient>
        </defs>

        {Array.from({ length: 8 }, (_, i) => {
          const scale = round(0.96 + (i % 3) * 0.04);
          return (
            <g key={i} transform={`translate(60 54) rotate(${i * 45 + wobble[i]}) scale(${scale})`}>
              <path
                d={COSMOS_PETAL}
                fill={`url(#${gradient})`}
                stroke={darken(color, 0.3)}
                strokeOpacity="0.28"
                strokeWidth="0.6"
                strokeLinejoin="round"
              />
              <g
                fill="none"
                stroke={darken(color, 0.28)}
                strokeOpacity="0.22"
                strokeWidth="0.5"
                strokeLinecap="round"
              >
                <path d="M0 -3 L0 -22" />
                <path d="M-2 -4 C-5 -12 -7 -18 -8 -23" />
                <path d="M2 -4 C5 -12 7 -18 8 -23" />
              </g>
            </g>
          );
        })}

        <circle cx="60" cy="54" r="6.2" fill={`url(#${uid}-cosmos-disc)`} stroke="#8E6521" strokeOpacity="0.35" strokeWidth="0.5" />
        <Dots count={8} radius={3.8} r={0.7} fill="#8E6521" opacity={0.55} />
        <circle cx="58" cy="52" r="1.5" fill="#FFF3B8" opacity="0.5" />
      </g>
    </>
  );
}


const ANEMONE_PETAL = "M0 0 C-15 -4 -19 -23 -9 -33 Q0 -37 9 -33 C19 -23 15 -4 0 0Z";

export function Anemone({ uid, color, center }: BloomProps) {
  const gradient = `${uid}-anemone`;
  const count = 7;

  return (
    <>
      <Stem
        y0={82}
        lean={3}
        width={2.4}
        leaves={[
          { t: 0.45, side: -1, length: 24, width: 0, tilt: 50, feather: true },
          { t: 0.6, side: 1, length: 22, width: 0, tilt: 52, feather: true },
          { t: 0.75, side: -1, length: 22, width: 0, tilt: 54, feather: true },
          { t: 0.88, side: 1, length: 18, width: 0, tilt: 56, feather: true },
        ]}
      />
      <g transform="translate(60 54) scale(1 0.94) translate(-60 -54)">
        <defs>
          <linearGradient id={gradient} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor={mix(color, "#6b4a86", 0.55)} />
            <stop offset="0.34" stopColor={color} />
            <stop offset="1" stopColor={lighten(color, 0.2)} />
          </linearGradient>
        </defs>

        {Array.from({ length: count }, (_, i) => (
          <g key={i} transform={`translate(60 54) rotate(${round(i * (360 / count) + (i % 2 ? 4 : -3))})`}>
            <path
              d={ANEMONE_PETAL}
              fill={`url(#${gradient})`}
              stroke={darken(color, 0.35)}
              strokeOpacity="0.28"
              strokeWidth="0.6"
              strokeLinejoin="round"
            />
            <g fill="none" stroke={darken(color, 0.3)} strokeOpacity="0.16" strokeWidth="0.5" strokeLinecap="round">
              <path d="M0 -5 L0 -30" />
              <path d="M-2 -6 C-6 -14 -8 -22 -7 -30" />
              <path d="M2 -6 C6 -14 8 -22 7 -30" />
            </g>
          </g>
        ))}

        <circle cx="60" cy="54" r="9.5" fill="#6b4a86" opacity="0.35" />
        {Array.from({ length: 28 }, (_, i) => {
          const a = i * (360 / 28);
          const p1 = polar(60, 54, 6, a);
          const p2 = polar(60, 54, 12, a);
          return (
            <g key={i}>
              <path d={`M${p1.x} ${p1.y} L${p2.x} ${p2.y}`} stroke={center} strokeWidth="0.55" />
              <circle cx={p2.x} cy={p2.y} r="0.9" fill={center} />
            </g>
          );
        })}
        <circle cx="60" cy="54" r="7" fill={center} />
        <circle cx="58" cy="52" r="2" fill="#ffffff" opacity="0.18" />
      </g>
    </>
  );
}

const CARNATION_PETAL =
  "M0 0 C-7 -3 -11 -9 -10 -15 L-7.5 -13.5 L-6.5 -17.5 L-4 -14.5 L-2.5 -18.5 L0 -15 L2.5 -18.5 L4 -14.5 L6.5 -17.5 L7.5 -13.5 L10 -15 C11 -9 7 -3 0 0Z";

const CARNATION_RINGS = [
  { n: 11, len: 28, off: 0 },
  { n: 10, len: 23, off: 14 },
  { n: 9, len: 18, off: 5 },
  { n: 7, len: 12, off: 20 },
];

export function Carnation({ uid, color, center }: BloomProps) {
  return (
    <>
      <defs>
        {CARNATION_RINGS.map((_, i) => {
          const tone = mix(color, center, i * 0.18);
          return (
            <linearGradient key={i} id={`${uid}-carn-${i}`} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" stopColor={darken(tone, 0.25)} />
              <stop offset="0.6" stopColor={tone} />
              <stop offset="1" stopColor={lighten(tone, 0.28)} />
            </linearGradient>
          );
        })}
      </defs>
      <Stem
        y0={88}
        lean={3}
        width={2.6}
        leaves={[
          { t: 0.4, side: -1, length: 46, width: 4, tilt: 40, tone: "pale" },
          { t: 0.62, side: 1, length: 44, width: 4, tilt: 44, tone: "pale" },
          { t: 0.84, side: -1, length: 36, width: 3.6, tilt: 48, tone: "pale" },
        ]}
      />
      <g fill={GREEN.leaf} stroke={GREEN.leafDark} strokeOpacity="0.5" strokeWidth="0.5">
        <ellipse cx="60" cy="118" rx="4" ry="2.6" />
        <ellipse cx="60" cy="148" rx="4" ry="2.6" />
      </g>
      <path
        d="M51 70 C51 82 54 88 60 91 C66 88 69 82 69 70Z"
        fill={GREEN.leafDark}
        stroke={GREEN.leafDark}
        strokeOpacity="0.5"
        strokeWidth="0.6"
      />
      <path d="M55 74 L56 88 M60 74 L60 90 M65 74 L64 88" stroke={GREEN.leafPale} strokeOpacity="0.45" strokeWidth="0.6" fill="none" />
      <g transform="translate(60 56) scale(1 0.92)">
        {CARNATION_RINGS.map((ring, i) => {
          const sc = round(ring.len / 18.5);
          const tone = mix(color, center, i * 0.18);
          return (
            <g key={i}>
              {Array.from({ length: ring.n }, (_, k) => (
                <path
                  key={k}
                  d={CARNATION_PETAL}
                  transform={`rotate(${round(ring.off + (360 / ring.n) * k)}) scale(${sc})`}
                  fill={`url(#${uid}-carn-${i})`}
                  stroke={darken(tone, 0.35)}
                  strokeOpacity="0.3"
                  strokeWidth="0.6"
                  strokeLinejoin="round"
                />
              ))}
            </g>
          );
        })}
        <circle r="3.4" fill={darken(center, 0.2)} opacity="0.7" />
        <Dots cx={0} cy={0} count={6} radius={2.2} r={0.9} fill={lighten(color, 0.5)} opacity={0.7} />
      </g>
    </>
  );
}