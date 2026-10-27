"use client";

import { useContext } from "react";
import { darken, lighten, round } from "@/lib/svg-utils";
import { BareStemContext, FivePetalFlower, GREEN, Leaf, Stem } from "./primitives";
import type { BloomProps } from "./primitives";

function LavenderSpike({
  x,
  y,
  rotate,
  length,
  color,
}: {
  x: number;
  y: number;
  rotate: number;
  length: number;
  color: string;
}) {
  const whorls = Math.round(length / 4.4);
  const step = (length - 10) / (whorls - 1);
  const shades = [color, lighten(color, 0.22), darken(color, 0.1), lighten(color, 0.1)];

  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <path d={`M0 0 L0 ${-length}`} stroke={GREEN.leafDark} strokeWidth="1.3" strokeLinecap="round" />
      {Array.from({ length: whorls }, (_, i) => {
        const s = round(1 - (i / (whorls - 1)) * 0.5);
        const yy = round(-10 - i * step);
        const dx = round(4.2 * s);
        return (
          <g key={i} stroke={darken(color, 0.3)} strokeOpacity="0.28" strokeWidth="0.3">
            <ellipse
              cx={-dx}
              cy={yy}
              rx={round(3 * s)}
              ry={round(4.6 * s)}
              transform={`rotate(-24 ${-dx} ${yy})`}
              fill={shades[i % 4]}
            />
            <ellipse
              cx={dx}
              cy={yy}
              rx={round(3 * s)}
              ry={round(4.6 * s)}
              transform={`rotate(24 ${dx} ${yy})`}
              fill={shades[(i + 2) % 4]}
            />
            <ellipse
              cx="0"
              cy={round(yy - 2)}
              rx={round(2.6 * s)}
              ry={round(4.2 * s)}
              fill={shades[(i + 1) % 4]}
            />
          </g>
        );
      })}
      <ellipse cx="0" cy={-length - 1} rx="2" ry="3.4" fill={shades[1]} />
    </g>
  );
}

export function Lavender({ color }: { color: string }) {
  const bare = useContext(BareStemContext);
  return (
    <>
      {!bare && (
        <g>
          <Leaf x={58} y={176} angle={-22} length={54} width={3.2} fill={GREEN.leafPale} />
          <Leaf x={58} y={176} angle={-42} length={46} width={3} fill={GREEN.leaf} />
          <Leaf x={62} y={176} angle={20} length={52} width={3.2} fill={GREEN.leaf} />
          <Leaf x={62} y={176} angle={40} length={44} width={3} fill={GREEN.leafPale} />
        </g>
      )}
      <g fill="none" stroke="#728f71" strokeWidth="1.7" strokeLinecap="round">
        <path d="M60 178 C60 150 60 120 60 92" />
        <path d="M59 178 C58 152 47 134 41 104" />
        <path d="M61 178 C62 156 74 138 80 110" />
      </g>
      <LavenderSpike x={41} y={104} rotate={-9} length={56} color={color} />
      <LavenderSpike x={80} y={110} rotate={10} length={52} color={color} />
      <LavenderSpike x={60} y={92} rotate={0} length={68} color={color} />
    </>
  );
}

function SalviaSpike({
  x,
  y,
  rotate,
  length,
  color,
  calyx,
}: {
  x: number;
  y: number;
  rotate: number;
  length: number;
  color: string;
  calyx: string;
}) {
  const n = Math.max(4, Math.round(length / 8));
  const step = (length - 10) / (n - 1);
  const lip = lighten(color, 0.22);

  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <path d={`M0 0 L0 ${-length}`} stroke={GREEN.leafDark} strokeWidth="1.5" strokeLinecap="round" />
      {Array.from({ length: n }, (_, i) => {
        const t = i / (n - 1);
        const s = round(1 - t * 0.45);
        const yy = round(-8 - i * step);
        const dx = round(6 * s);
        return (
          <g key={i} stroke={darken(color, 0.35)} strokeOpacity="0.3" strokeWidth="0.35">
            <ellipse cx="0" cy={round(yy + 2.5 * s)} rx={round(3.6 * s)} ry={round(3 * s)} fill={calyx} />
            {([-1, 1] as const).map((side) => (
              <g key={side}>
                <ellipse
                  cx={round(side * dx)}
                  cy={yy}
                  rx={round(7 * s)}
                  ry={round(2.9 * s)}
                  transform={`rotate(${side * -34} ${round(side * dx)} ${yy})`}
                  fill={i % 2 ? color : lip}
                />
                <ellipse
                  cx={round(side * dx * 0.7)}
                  cy={round(yy + 3 * s)}
                  rx={round(3.8 * s)}
                  ry={round(2.2 * s)}
                  fill={darken(color, 0.12)}
                />
              </g>
            ))}
          </g>
        );
      })}
      <ellipse cx="0" cy={-length - 2} rx="2" ry="4" fill={calyx} />
    </g>
  );
}

export function Salvia({ color, center }: Omit<BloomProps, "uid">) {
  return (
    <>
      <Stem
        y0={96}
        lean={2}
        width={2.8}
        leaves={[
          { t: 0.5, side: -1, length: 34, width: 11, tilt: 58, tone: "dark" },
          { t: 0.68, side: 1, length: 32, width: 10, tilt: 60, tone: "light" },
          { t: 0.86, side: -1, length: 26, width: 8, tilt: 62, tone: "pale" },
        ]}
      />
      <SalviaSpike x={60} y={126} rotate={-18} length={50} color={color} calyx={center} />
      <SalviaSpike x={60} y={132} rotate={20} length={44} color={color} calyx={center} />
      <SalviaSpike x={60} y={96} rotate={0} length={86} color={color} calyx={center} />
    </>
  );
}

function Star6({ x, y, r, fill, edge }: { x: number; y: number; r: number; fill: string; edge: string }) {
  return (
    <g transform={`translate(${x} ${y})`} fill={fill} stroke={edge} strokeOpacity="0.3" strokeWidth="0.3">
      {[0, 60, 120].map((a) => (
        <ellipse key={a} cx="0" cy="0" rx={round(r * 0.4)} ry={r} transform={`rotate(${a})`} />
      ))}
    </g>
  );
}

export function Hyacinth({ color, center }: Omit<BloomProps, "uid">) {
  const rows = 10;
  const shades = [color, lighten(color, 0.2), darken(color, 0.1)];
  const edge = darken(color, 0.4);

  return (
    <>
      <Stem
        y0={104}
        lean={2}
        width={4.2}
        leaves={[
          { t: 0.55, side: -1, length: 92, width: 8, tilt: 10, tone: "dark" },
          { t: 0.7, side: 1, length: 84, width: 8, tilt: 12, tone: "light" },
        ]}
      />
      <path d="M60 106 L60 32" stroke={GREEN.stem} strokeWidth="3.4" strokeLinecap="round" />
      <ellipse cx="60" cy="27" rx="2.8" ry="5" fill={shades[2]} />
      {Array.from({ length: rows }, (_, i) => {
        const w = 0.42 + (0.58 * i) / (rows - 1);
        const yy = round(34 + i * 7.4);
        const r = round(5.8 * (0.65 + 0.35 * w));
        const xs = i === 0 ? [0] : i < 3 ? [-4.5 * w, 4.5 * w] : [-9 * w, 0, 9 * w];
        return xs.map((dx, k) => (
          <Star6
            key={`${i}-${k}`}
            x={round(60 + dx)}
            y={yy}
            r={r}
            fill={shades[(i + k) % 3]}
            edge={edge}
          />
        ));
      })}
      <circle cx="60" cy="66" r="0.01" fill={center} />
    </>
  );
}

export function Loosestrife({ color, center }: Omit<BloomProps, "uid">) {
  const spike = (x: number, y: number, rot: number, count: number, step: number, key: string) => (
    <g key={key} transform={`translate(${x} ${y}) rotate(${rot})`}>
      <path d={`M0 0 L0 ${-(count * step + 8)}`} stroke={GREEN.leafDark} strokeWidth="1.3" strokeLinecap="round" />
      {Array.from({ length: count }, (_, i) => {
        const t = i / (count - 1);
        return (
          <FivePetalFlower
            key={i}
            x={round((i % 2 ? 6 : -6) * (1 - t * 0.4))}
            y={round(-6 - i * step)}
            r={round(6.4 * (1 - t * 0.35))}
            color={color}
            center={center}
            rotate={(i * 37) % 72}
          />
        );
      })}
      <ellipse cx="0" cy={-(count * step + 8)} rx="1.8" ry="3.4" fill={darken(color, 0.1)} />
    </g>
  );

  return (
    <>
      <Stem
        y0={102}
        lean={2}
        width={2.8}
        leaves={[
          { t: 0.35, side: -1, length: 40, width: 5, tilt: 40, tone: "dark" },
          { t: 0.5, side: 1, length: 40, width: 5, tilt: 42, tone: "light" },
          { t: 0.68, side: -1, length: 34, width: 4.5, tilt: 46, tone: "pale" },
          { t: 0.84, side: 1, length: 30, width: 4, tilt: 48, tone: "dark" },
        ]}
      />
      {spike(60, 128, -18, 5, 7.4, "l")}
      {spike(60, 134, 20, 5, 7, "r")}
      {spike(60, 102, 0, 12, 7.2, "m")}
    </>
  );
}

export function Rosemary({ color, center }: Omit<BloomProps, "uid">) {
  const nodes = 22;
  const needle = "#6f8f6a";

  return (
    <>
      <path
        d="M60 178 C58 130 63 80 60 22"
        fill="none"
        stroke="#7a8a62"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {Array.from({ length: nodes }, (_, i) => {
        const t = i / (nodes - 1);
        const y = round(168 - i * 7);
        const x = round(60 + 2 * Math.sin(t * 3));
        const len = round(17 * (1 - t * 0.4));
        return ([-1, 1] as const).map((side) => (
          <g key={`${i}${side}`} transform={`translate(${x} ${y}) rotate(${side * 52})`}>
            <ellipse cx="0" cy={round(-len / 2)} rx="1.5" ry={round(len / 2)} fill={i % 2 ? needle : "#80a07a"} />
            <path d={`M0 -1 L0 ${-len + 2}`} stroke="#ffffff" strokeOpacity="0.25" strokeWidth="0.4" />
          </g>
        ));
      })}
      {[12, 14, 15, 17, 18, 19, 20].map((i, k) => {
        const t = i / (nodes - 1);
        const y = round(168 - i * 7);
        const side = k % 2 ? 1 : -1;
        const x = round(60 + 2 * Math.sin(t * 3) + side * 5);
        return (
          <g key={i} transform={`translate(${x} ${y}) rotate(${side * 40})`}>
            <ellipse cx="0" cy="-1" rx="3.3" ry="2" fill={color} stroke={darken(color, 0.35)} strokeOpacity="0.3" strokeWidth="0.3" />
            <ellipse cx="0" cy="1.6" rx="2.2" ry="1.4" fill={lighten(color, 0.3)} />
            <circle cx="0" cy="-1.6" r="0.7" fill={center} />
          </g>
        );
      })}
    </>
  );
}