"use client";

import { useId } from "react";
import { BareStemContext, GREEN, Leaf, leafFill } from "@/components/flowers/primitives";
import { FlowerShape } from "@/components/flowers/FlowerShape";
import { TIE, layoutBouquet } from "@/lib/bouquet-layout";
import { FILLERS } from "@/lib/data/options";
import { darken, lighten, round } from "@/lib/svg-utils";
import type { BouquetItem, Design } from "@/lib/types";
import { Bow, StemBundle } from "./Bow";
import { ButterflyContext, FILLER_SPRIGS, FillerSprig, butterflyPair } from "./fillers";
import { WrapBack, WrapFront } from "./wraps";

const FILLER_LEAVES = [
  { angle: -64, length: 190, width: 26, tone: "dark" },
  { angle: -46, length: 238, width: 30, tone: "light" },
  { angle: -26, length: 262, width: 28, tone: "pale" },
  { angle: 22, length: 258, width: 28, tone: "dark" },
  { angle: 42, length: 236, width: 30, tone: "pale" },
  { angle: 62, length: 192, width: 26, tone: "light" },
] as const;

export function BouquetArt({ items, design }: { items: BouquetItem[]; design: Design }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const placements = layoutBouquet(items);
  const { style, paper, ribbon, fillers, butterflyColors } = design;

  const paperEdge = darken(paper, 0.3);
  const ribbonDark = darken(ribbon, 0.28);
  const ribbonLight = lighten(ribbon, 0.34);
  const activeFillers = FILLERS.filter((filler) => fillers.includes(filler.id));

  const label =
    items.length === 0
      ? "An empty bouquet"
      : `Bouquet of ${items.length} ${items.length === 1 ? "flower" : "flowers"}: ${items
          .map((item) => item.flower.name)
          .join(", ")}${
          activeFillers.length ? `, with ${activeFillers.map((filler) => filler.label).join(", ")}` : ""
        }, ${style === "bow" ? "bare stems tied with a bow" : "wrapped in paper and tied with a bow"}`;

  return (
    <svg className="bouquet-svg" viewBox="0 0 640 800" role="img" aria-label={label} focusable="false">
      <defs>
        <linearGradient id={`${uid}-back`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={lighten(paper, 0.5)} />
          <stop offset="1" stopColor={darken(paper, 0.06)} />
        </linearGradient>
        <linearGradient id={`${uid}-front`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={darken(paper, 0.1)} />
          <stop offset="0.42" stopColor={lighten(paper, 0.14)} />
          <stop offset="1" stopColor={darken(paper, 0.16)} />
        </linearGradient>
        <linearGradient id={`${uid}-cuff`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={lighten(paper, 0.3)} />
          <stop offset="0.5" stopColor={lighten(paper, 0.55)} />
          <stop offset="1" stopColor={lighten(paper, 0.28)} />
        </linearGradient>
        <linearGradient id={`${uid}-ribbon`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={ribbonLight} />
          <stop offset="1" stopColor={ribbonDark} />
        </linearGradient>
        <linearGradient id={`${uid}-satin`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={ribbonLight} />
          <stop offset="0.45" stopColor={ribbon} />
          <stop offset="1" stopColor={ribbonDark} />
        </linearGradient>
        <radialGradient id={`${uid}-shade`} gradientUnits="userSpaceOnUse" cx="320" cy="540" r="230">
          <stop offset="0" stopColor="#1f2e24" stopOpacity="0.36" />
          <stop offset="1" stopColor="#1f2e24" stopOpacity="0" />
        </radialGradient>
        <pattern id={`${uid}-dots`} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="1.3" fill={paperEdge} fillOpacity="0.28" />
          <circle cx="12" cy="12" r="1.3" fill={paperEdge} fillOpacity="0.28" />
        </pattern>
      </defs>

      <ellipse
        cx="320"
        cy={style === "bow" ? 752 : 786}
        rx={style === "bow" ? 64 : 74}
        ry="8"
        fill="#223829"
        opacity="0.14"
      />

      {/* tissue paper and the inside of the wrap */}
      {style !== "bow" && <WrapBack style={style} uid={uid} paper={paper} ribbon={ribbon} />}

      {/* base greenery */}
      <g>
        {FILLER_LEAVES.map((leaf, i) => (
          <Leaf
            key={i}
            x={TIE.x}
            y={TIE.y - 4}
            angle={leaf.angle}
            length={leaf.length}
            width={leaf.width}
            fill={leafFill(leaf.tone)}
          />
        ))}
      </g>

      {/* chosen filler plants */}
      <ButterflyContext.Provider value={butterflyPair(butterflyColors)}>
        {activeFillers.map((filler) => (
          <g key={filler.id} className="filler-in">
            {FILLER_SPRIGS[filler.id].map((spec, i) => (
              <FillerSprig key={i} kind={filler.id} spec={spec} />
            ))}
          </g>
        ))}
      </ButterflyContext.Provider>

      {/* flowers */}
      <BareStemContext.Provider value={true}>
        {placements.map((p) => (
          <g key={p.key}>
            {p.by < TIE.y && (
              <line
                x1={p.bx}
                y1={p.by}
                x2={TIE.x}
                y2={TIE.y + 7}
                stroke={GREEN.stem}
                strokeWidth={round(2.7 * p.scale)}
                strokeLinecap="round"
              />
            )}
            <g
              transform={`translate(${p.bx} ${p.by}) rotate(${p.angle}) scale(${round(p.flip * p.scale)} ${p.scale}) translate(-60 -178)`}
            >
              <g className="bloom-in">
                <FlowerShape flower={p.flower} />
              </g>
            </g>
          </g>
        ))}
      </BareStemContext.Provider>

      {style === "bow" ? (
        <>
          <StemBundle />
          <g transform="translate(320 512) scale(0.92) translate(-320 -529)">
            <Bow uid={uid} ribbon={ribbon} />
          </g>
        </>
      ) : (
        <>
          {/* gathered stems */}
          <g fill="none" strokeLinecap="round">
            <path d="M311 496 L308 548" stroke={GREEN.leafDark} strokeWidth="5" />
            <path d="M316 494 L314 550" stroke={GREEN.stem} strokeWidth="5" />
            <path d="M324 494 L326 550" stroke={GREEN.stem} strokeWidth="5" />
            <path d="M329 496 L332 548" stroke={GREEN.leafDark} strokeWidth="5" />
            <path d="M320 494 L320 552" stroke={GREEN.stemLight} strokeWidth="2" opacity="0.6" />
          </g>

          {/* outer sheet and cuff */}
          <WrapFront style={style} uid={uid} paper={paper} />

          {/* ribbon band around the stems, then the bow */}
          <path
            d="M296 500 Q320 507 344 500 L346 517 Q320 524 294 517Z"
            fill={`url(#${uid}-ribbon)`}
            stroke={ribbonDark}
            strokeOpacity="0.4"
            strokeWidth="0.8"
          />
          <path
            d="M300 503 Q320 509 340 503"
            fill="none"
            stroke={ribbonLight}
            strokeOpacity="0.55"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <Bow uid={uid} ribbon={ribbon} />
        </>
      )}
    </svg>
  );
}