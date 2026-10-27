"use client";

import { cubic, darken, lighten, round } from "@/lib/svg-utils";
import type { Pt } from "@/lib/svg-utils";
import type { WrapStyle } from "@/lib/types";

export type PaperStyle = Exclude<WrapStyle, "bow">;

type Geometry = {
  tissue: string;
  back: string;
  backLines: string[];
  front: string;
  creases: string[];
  highlight: string;
  rim: string;
  cuff: string;
  cuffEdge: string;
  cuffLines: string[];
  flap?: string;
  flapEdge?: string;
};

const TISSUE =
  "M320 598 C226 562 94 432 46 302 Q76 262 122 298 Q170 252 232 294 Q276 260 320 288 Q364 260 408 294 Q470 252 518 298 Q564 262 594 302 C546 432 414 562 320 598Z";

const TISSUE_LINES = [
  "M122 300 C150 380 220 470 300 560",
  "M232 296 C250 380 286 470 316 570",
  "M518 300 C490 380 420 470 340 560",
  "M408 296 C390 380 354 470 324 570",
];

const RIM = "M80 322 C120 440 240 512 320 526 C400 512 520 440 560 322";
const CUFF_LINES = ["M150 396 C178 440 214 478 256 502", "M490 396 C462 440 426 478 384 502"];

/* 1. Classic cone */
const CLASSIC: Geometry = {
  tissue: TISSUE,
  back: "M320 600 C236 560 118 430 66 318 Q96 292 142 320 Q196 280 258 322 Q320 286 382 322 Q444 280 498 320 Q544 292 574 318 C522 430 404 560 320 600Z",
  backLines: [
    "M150 336 C190 430 260 520 320 590",
    "M490 336 C450 430 380 520 320 590",
    "M258 326 C268 400 292 470 320 560",
    "M382 326 C372 400 348 470 320 560",
  ],
  front: "M80 322 C120 440 240 512 320 526 C400 512 520 440 560 322 C548 470 420 690 332 788 L308 788 C220 690 92 470 80 322Z",
  creases: [
    "M320 562 C326 640 330 720 332 788",
    "M134 417 C180 540 250 650 303 770",
    "M506 417 C460 540 390 650 337 770",
    "M176 470 C214 560 262 650 296 735",
    "M464 470 C426 560 378 650 344 735",
  ],
  highlight: "M150 440 C192 540 246 640 292 744",
  rim: RIM,
  cuff: `${RIM} C520 440 400 548 320 562 C240 548 120 440 80 322Z`,
  cuffEdge: "M560 322 C520 440 400 548 320 562 C240 548 120 440 80 322",
  cuffLines: CUFF_LINES,
};

/* 2. Pouch: straight sides and a wide, flat bottom */
const POUCH: Geometry = {
  ...CLASSIC,
  back: "M66 318 Q96 292 142 320 Q196 280 258 322 Q320 286 382 322 Q444 280 498 320 Q544 292 574 318 C566 460 520 640 480 772 L160 772 C120 640 74 460 66 318Z",
  backLines: ["M150 340 C140 480 150 640 176 760", "M490 340 C500 480 490 640 464 760"],
  front: "M80 322 C120 440 240 512 320 526 C400 512 520 440 560 322 C556 480 512 660 474 772 Q320 792 166 772 C128 660 84 480 80 322Z",
  creases: [
    "M320 562 L320 788",
    "M150 440 C142 560 150 670 176 768",
    "M490 440 C498 560 490 670 464 768",
    "M172 742 Q320 768 468 742",
  ],
  highlight: "M120 460 C116 560 124 650 146 742",
};

/* 3. Scalloped: the cuff edge is a row of small frills (generated, not hand-drawn) */
const EDGE_A: [Pt, Pt, Pt, Pt] = [[560, 322], [520, 440], [400, 548], [320, 562]];
const EDGE_B: [Pt, Pt, Pt, Pt] = [[320, 562], [240, 548], [120, 440], [80, 322]];

function scallopedEdge(perSide: number, bump: number) {
  const pts: Pt[] = [];
  for (let i = 0; i <= perSide; i++) pts.push(cubic(EDGE_A[0], EDGE_A[1], EDGE_A[2], EDGE_A[3], i / perSide));
  for (let i = 1; i <= perSide; i++) pts.push(cubic(EDGE_B[0], EDGE_B[1], EDGE_B[2], EDGE_B[3], i / perSide));

  let d = "";
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const len = Math.hypot(x1 - x0, y1 - y0) || 1;
    const nx = (y1 - y0) / len;
    const ny = -(x1 - x0) / len;
    const cx = round((x0 + x1) / 2 + nx * bump * 2);
    const cy = round((y0 + y1) / 2 + ny * bump * 2);
    d += ` Q${cx} ${cy} ${x1} ${y1}`;
  }
  return d;
}

const SCALLOP_EDGE = scallopedEdge(10, 9);

const SCALLOP: Geometry = {
  ...CLASSIC,
  cuff: `${RIM}${SCALLOP_EDGE}Z`,
  cuffEdge: `M560 322${SCALLOP_EDGE}`,
};

/* 4. Folded: a lighter sheet overlaps the left half */
const FOLD: Geometry = {
  ...CLASSIC,
  flap: "M80 322 C120 440 240 512 320 526 C336 600 328 700 308 788 C220 690 92 470 80 322Z",
  flapEdge: "M320 526 C336 600 328 700 308 788",
};

const GEOMETRY: Record<PaperStyle, Geometry> = {
  cone: CLASSIC,
  pouch: POUCH,
  scallop: SCALLOP,
  fold: FOLD,
};

/* Everything behind the flowers: tissue paper and the inside of the wrap. */
export function WrapBack({
  style,
  uid,
  paper,
  ribbon,
}: {
  style: PaperStyle;
  uid: string;
  paper: string;
  ribbon: string;
}) {
  const g = GEOMETRY[style];
  const paperEdge = darken(paper, 0.3);
  const tissue = lighten(ribbon, 0.8);

  return (
    <>
      <path
        d={g.tissue}
        fill={tissue}
        fillOpacity="0.85"
        stroke={darken(tissue, 0.2)}
        strokeOpacity="0.3"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <g fill="none" stroke={darken(tissue, 0.25)} strokeOpacity="0.2" strokeWidth="1" strokeLinecap="round">
        {TISSUE_LINES.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>

      <path
        d={g.back}
        fill={`url(#${uid}-back)`}
        stroke={paperEdge}
        strokeOpacity="0.28"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path d={g.back} fill={`url(#${uid}-dots)`} />
      <path d={g.back} fill={`url(#${uid}-shade)`} />
      <g fill="none" stroke={paperEdge} strokeOpacity="0.16" strokeWidth="1.1" strokeLinecap="round">
        {g.backLines.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </>
  );
}

/* Everything in front of the flowers: the outer sheet and the turned-over cuff. */
export function WrapFront({ style, uid, paper }: { style: PaperStyle; uid: string; paper: string }) {
  const g = GEOMETRY[style];
  const edge = darken(paper, 0.3);

  return (
    <>
      <path
        d={g.front}
        fill={`url(#${uid}-front)`}
        stroke={edge}
        strokeOpacity="0.3"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <g fill="none" strokeLinecap="round">
        {g.creases.map((d) => (
          <path key={d} d={d} stroke={edge} strokeOpacity="0.2" strokeWidth="1.2" />
        ))}
        <path d={g.highlight} stroke={lighten(paper, 0.6)} strokeOpacity="0.32" strokeWidth="7" />
      </g>

      {g.flap && g.flapEdge && (
        <>
          <path
            d={g.flapEdge}
            fill="none"
            stroke={darken(paper, 0.4)}
            strokeOpacity="0.12"
            strokeWidth="8"
            strokeLinecap="round"
            transform="translate(5 0)"
          />
          <path
            d={g.flap}
            fill={lighten(paper, 0.24)}
            stroke={edge}
            strokeOpacity="0.3"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <path d={g.flapEdge} fill="none" stroke={edge} strokeOpacity="0.4" strokeWidth="1.4" strokeLinecap="round" />
        </>
      )}

      <path d={g.cuff} fill={`url(#${uid}-cuff)`} />
      <path d={g.cuff} fill={`url(#${uid}-dots)`} />
      <path d={g.cuffEdge} fill="none" stroke={edge} strokeOpacity="0.3" strokeWidth="1.1" strokeLinecap="round" />
      <path d={g.rim} fill="none" stroke={lighten(paper, 0.7)} strokeOpacity="0.9" strokeWidth="2.4" strokeLinecap="round" />
      <g fill="none" stroke={edge} strokeOpacity="0.14" strokeWidth="1" strokeLinecap="round">
        {g.cuffLines.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </>
  );
}