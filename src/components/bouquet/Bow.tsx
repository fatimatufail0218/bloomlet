"use client";

import { TIE } from "@/lib/bouquet-layout";
import { darken, lighten, round } from "@/lib/svg-utils";
import { GREEN } from "@/components/flowers/primitives";


export function Bow({ uid, ribbon }: { uid: string; ribbon: string }) {
  const dark = darken(ribbon, 0.28);
  const deep = darken(ribbon, 0.42);
  const light = lighten(ribbon, 0.38);
  const edge = { stroke: dark, strokeOpacity: 0.45, strokeWidth: 0.8, strokeLinejoin: "round" as const };

  // one half of the bow (right side); the left half is the same shape mirrored
  const half = (
    <g>
      {/* upper loop */}
      <path
        d="M324 519 C336 470 382 438 414 450 C438 460 428 494 398 506 C374 516 346 524 324 525Z"
        fill={`url(#${uid}-satin)`}
        {...edge}
      />
      <path
        d="M338 514 C350 480 386 458 408 466 C418 472 412 486 396 494 C376 504 356 512 338 516Z"
        fill={deep}
        opacity="0.42"
      />
      <path
        d="M333 502 C346 474 378 452 406 454"
        fill="none"
        stroke={light}
        strokeOpacity="0.6"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* lower loop */}
      <path
        d="M324 523 C346 486 416 478 440 502 C458 521 438 556 404 556 C372 556 342 540 324 531Z"
        fill={`url(#${uid}-satin)`}
        {...edge}
      />
      <path
        d="M336 526 C354 502 402 498 420 512 C428 520 420 532 400 533 C376 534 352 530 336 528Z"
        fill={deep}
        opacity="0.42"
      />
      <path
        d="M340 516 C362 493 408 491 428 507"
        fill="none"
        stroke={light}
        strokeOpacity="0.6"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M352 548 C376 552 404 550 424 538"
        fill="none"
        stroke={dark}
        strokeOpacity="0.28"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </g>
  );

  return (
    <g>
      {/* tails */}
      <path
        d="M322 536 L338 534 C366 570 400 620 402 694 L388 676 L370 692 C372 640 346 590 322 536Z"
        fill={`url(#${uid}-ribbon)`}
        {...edge}
      />
      <path
        d="M318 536 L302 534 C274 570 244 620 240 688 L256 672 L272 692 C278 640 298 590 318 536Z"
        fill={deep}
        fillOpacity="0.88"
        {...edge}
      />
      <path
        d="M318 536 L302 534 C274 570 244 620 240 688 L256 672 L272 692 C278 640 298 590 318 536Z"
        fill={`url(#${uid}-ribbon)`}
        fillOpacity="0.55"
      />
      <g fill="none" stroke={light} strokeOpacity="0.45" strokeWidth="1.4" strokeLinecap="round">
        <path d="M334 542 C360 580 390 630 391 684" />
        <path d="M309 542 C284 580 258 630 256 680" />
      </g>

      {/* loops */}
      {half}
      <g transform="translate(640 0) scale(-1 1)">{half}</g>

      {/* knot */}
      <ellipse cx="320" cy="529" rx="15" ry="13" fill={`url(#${uid}-satin)`} {...edge} />
      <g fill="none" stroke={dark} strokeOpacity="0.5" strokeWidth="1" strokeLinecap="round">
        <path d="M311 522 C316 528 316 534 311 540" />
        <path d="M329 522 C324 528 324 534 329 540" />
      </g>
      <ellipse cx="316" cy="523" rx="6" ry="2.6" fill={light} opacity="0.5" />
    </g>
  );
}

const BUNDLE_STEMS = [
  { top: -9, end: -38, bottom: 722, tone: "dark" },
  { top: 9, end: 42, bottom: 726, tone: "dark" },
  { top: -5, end: -20, bottom: 738, tone: "mid" },
  { top: 5, end: 22, bottom: 742, tone: "mid" },
  { top: -2, end: -4, bottom: 748, tone: "mid" },
  { top: 2, end: 8, bottom: 716, tone: "light" },
] as const;

export function StemBundle() {
  return (
    <g>
      {BUNDLE_STEMS.map((stem, i) => {
        const x0 = TIE.x + stem.top;
        const x1 = TIE.x + stem.end;
        const stroke =
          stem.tone === "dark" ? GREEN.leafDark : stem.tone === "light" ? GREEN.stemLight : GREEN.stem;
        return (
          <g key={i}>
            <path
              d={`M${x0} 494 C${x0} 566 ${round(TIE.x + stem.end * 0.5)} 650 ${x1} ${stem.bottom}`}
              fill="none"
              stroke={stroke}
              strokeWidth="5.2"
              strokeLinecap="round"
            />
            <ellipse
              cx={x1}
              cy={stem.bottom}
              rx="3.4"
              ry="1.9"
              fill="#d9e4b9"
              stroke={GREEN.leafDark}
              strokeOpacity="0.5"
              strokeWidth="0.8"
            />
          </g>
        );
      })}
      <path
        d={`M${TIE.x - 1} 500 C${TIE.x - 1} 566 ${TIE.x - 3} 650 ${TIE.x - 4} 730`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.22"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </g>
  );
}