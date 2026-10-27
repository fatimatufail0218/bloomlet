"use client";

import { darken, lighten, mix, polar, round } from "@/lib/svg-utils";
import { Calyx, Dots, Stem } from "./primitives";
import type { BloomProps } from "./primitives";

type Layer = { n: number; dist: number; rx: number; ry: number; offset: number };

const ROSE_LAYERS: Layer[] = [
  { n: 5, dist: 14, rx: 14, ry: 15, offset: 0 },
  { n: 5, dist: 10, rx: 12, ry: 13, offset: 36 },
  { n: 4, dist: 6, rx: 10, ry: 11, offset: 15 },
  { n: 3, dist: 2.8, rx: 7, ry: 8.5, offset: 50 },
];

const GARDEN_ROSE_LAYERS: Layer[] = [
  { n: 7, dist: 17, rx: 12, ry: 14, offset: 0 },
  { n: 7, dist: 13, rx: 11.5, ry: 13, offset: 26 },
  { n: 6, dist: 9.5, rx: 10.5, ry: 12, offset: 12 },
  { n: 5, dist: 6, rx: 9, ry: 10.5, offset: 40 },
  { n: 3, dist: 2.8, rx: 6.5, ry: 8, offset: 20 },
];

const RANUNCULUS_LAYERS: Layer[] = [
  { n: 10, dist: 17, rx: 9.5, ry: 11, offset: 0 },
  { n: 9, dist: 13, rx: 9, ry: 10.5, offset: 18 },
  { n: 8, dist: 9.5, rx: 8, ry: 9.5, offset: 9 },
  { n: 6, dist: 6, rx: 7, ry: 8, offset: 30 },
  { n: 5, dist: 3, rx: 5.5, ry: 6.5, offset: 15 },
];

const PEONY_LAYERS: Layer[] = [
  { n: 8, dist: 17, rx: 15, ry: 15, offset: 0 },
  { n: 8, dist: 13, rx: 14, ry: 14.5, offset: 22 },
  { n: 7, dist: 9.5, rx: 12.5, ry: 13, offset: 10 },
  { n: 6, dist: 6, rx: 10.5, ry: 11, offset: 34 },
  { n: 5, dist: 3, rx: 8, ry: 9, offset: 18 },
];

const CHINA_LAYERS: Layer[] = [
  { n: 5, dist: 13, rx: 15, ry: 16, offset: 0 },
  { n: 5, dist: 8.5, rx: 12.5, ry: 13.5, offset: 36 },
  { n: 4, dist: 4, rx: 9, ry: 10, offset: 12 },
];

function LayeredBloom({
  uid,
  color,
  center,
  layers,
  core,
  depth = 0.5,
}: BloomProps & { layers: Layer[]; core: "spiral" | "eye" | "ruffle"; depth?: number }) {
  const total = layers.length;
  const tone = (i: number) => mix(lighten(color, 0.1), center, (i / total) * depth);

  return (
    <g transform="translate(60 54) scale(1 0.93) translate(-60 -54)">
      <defs>
        {layers.map((_, i) => (
          <radialGradient key={i} id={`${uid}-layer-${i}`} cx="50%" cy="62%" r="75%">
            <stop offset="0%" stopColor={lighten(tone(i), 0.3)} />
            <stop offset="60%" stopColor={tone(i)} />
            <stop offset="100%" stopColor={darken(tone(i), 0.16)} />
          </radialGradient>
        ))}
      </defs>

      {layers.map((layer, i) => (
        <g key={i}>
          {Array.from({ length: layer.n }, (_, k) => {
            const angle = layer.offset + (360 / layer.n) * k - 90;
            const p = polar(60, 54, layer.dist, angle);
            return (
              <ellipse
                key={k}
                cx={p.x}
                cy={p.y}
                rx={layer.rx}
                ry={layer.ry}
                fill={`url(#${uid}-layer-${i})`}
                stroke={darken(tone(i), 0.3)}
                strokeOpacity="0.3"
                strokeWidth="0.6"
                transform={`rotate(${round(angle - 90)} ${p.x} ${p.y})`}
              />
            );
          })}
        </g>
      ))}

      {core === "spiral" ? (
        <g fill="none" stroke={darken(center, 0.15)} strokeLinecap="round">
          <ellipse cx="60" cy="54" rx="6.5" ry="6" fill={darken(center, 0.1)} stroke="none" opacity="0.3" />
          <path
            d="M60 54 C58 52 62 50 63.5 53 C65 57 60 60 56.5 57 C52.5 53 56.5 47 62 47.5 C68 48 70 55 66 59"
            strokeWidth="0.9"
            opacity="0.55"
          />
          <path d="M60.5 53.5 C61.5 54 61.5 55.5 60 55.5" strokeWidth="0.8" opacity="0.6" />
        </g>
      ) : core === "ruffle" ? (
        <g>
          <g fill="none" stroke={darken(center, 0.1)} strokeLinecap="round" opacity="0.5">
            <path d="M54 54 C55 50 59 52 60 49 C61 52 65 50 66 54" strokeWidth="1" />
            <path d="M55 58 C58 55 60 59 62 56 C64 54 66 57 66 58" strokeWidth="0.9" />
            <path d="M57 51 C58 48 62 48 63 51" strokeWidth="0.8" />
          </g>
          <Dots count={8} radius={3} r={0.8} fill="#f3d98a" opacity={0.75} />
        </g>
      ) : (
        <g>
          <circle cx="60" cy="54" r="5" fill={darken(center, 0.1)} opacity="0.55" />
          <circle cx="60" cy="54" r="3.4" fill={center} />
          <Dots count={7} radius={5} r={0.7} fill={lighten(center, 0.55)} opacity={0.8} />
          <circle cx="58.8" cy="52.8" r="1.1" fill="#ffffff" opacity="0.4" />
        </g>
      )}
    </g>
  );
}

export function Rose({ uid, color, center, full }: BloomProps & { full?: boolean }) {
  return (
    <>
      <Stem
        y0={80}
        lean={4}
        width={3.2}
        leaves={[
          { t: 0.5, side: -1, length: full ? 34 : 30, width: 10, tilt: 52, tone: "dark" },
          { t: 0.68, side: 1, length: full ? 32 : 28, width: 9, tilt: 55, tone: "light" },
          { t: 0.84, side: -1, length: 22, width: 7, tilt: 58, tone: "pale" },
        ]}
      />
      <Calyx />
      <LayeredBloom
        uid={uid}
        color={color}
        center={center}
        layers={full ? GARDEN_ROSE_LAYERS : ROSE_LAYERS}
        core="spiral"
      />
    </>
  );
}

export function Peony({ uid, color, center }: BloomProps) {
  return (
    <>
      <Stem
        y0={80}
        lean={3}
        width={3.4}
        leaves={[
          { t: 0.5, side: -1, length: 36, width: 12, tilt: 50, tone: "dark" },
          { t: 0.7, side: 1, length: 34, width: 11, tilt: 54, tone: "light" },
          { t: 0.86, side: -1, length: 24, width: 8, tilt: 58, tone: "pale" },
        ]}
      />
      <Calyx cy={78} />
      <LayeredBloom
        uid={uid}
        color={color}
        center={center}
        layers={PEONY_LAYERS}
        core="ruffle"
        depth={0.42}
      />
    </>
  );
}

export function Ranunculus({ uid, color, center }: BloomProps) {
  return (
    <>
      <Stem
        y0={80}
        lean={3}
        width={3}
        leaves={[
          { t: 0.55, side: -1, length: 32, width: 9, tilt: 50, tone: "light" },
          { t: 0.75, side: 1, length: 28, width: 8, tilt: 54, tone: "dark" },
        ]}
      />
      <Calyx cy={77} />
      <LayeredBloom
        uid={uid}
        color={color}
        center={center}
        layers={RANUNCULUS_LAYERS}
        core="eye"
        depth={0.35}
      />
    </>
  );
}

export function ChinaRose({ uid, color, center }: BloomProps) {
  return (
    <>
      <Stem
        y0={80}
        lean={4}
        width={3}
        leaves={[
          { t: 0.45, side: -1, length: 32, width: 9, tilt: 50, tone: "dark" },
          { t: 0.62, side: 1, length: 30, width: 8.5, tilt: 54, tone: "light" },
          { t: 0.8, side: -1, length: 24, width: 7, tilt: 58, tone: "dark" },
        ]}
      />
      <Calyx cy={77} />
      <LayeredBloom uid={uid} color={color} center={center} layers={CHINA_LAYERS} core="eye" depth={0.32} />
      <Dots cx={60} cy={52} count={9} radius={3.6} r={0.9} fill="#f6d46a" opacity={0.95} />
    </>
  );
}
