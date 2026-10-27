"use client";

import { useId } from "react";
import type { CSSProperties } from "react";
import { FivePetalFlower, GREEN, Leaf } from "@/components/flowers/primitives";
import { cubic, round, seeded } from "@/lib/svg-utils";
import type { Pt } from "@/lib/svg-utils";

export function WordmarkIcon() {
  return (
    <svg className="wordmark-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 22 C12 15 12 10 12 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <path d="M12 14 C7 14 4.5 11 4.5 7.5 C9 7.5 12 10 12 14Z" fill="currentColor" opacity="0.85" />
      <path d="M12 11 C16.5 11 19.5 8.5 19.5 5 C15 5 12 7.5 12 11Z" fill="currentColor" />
    </svg>
  );
}

/* a tall stem with a proper, generous bloom on top and two smaller ones below */
export function HeroSprig({ className }: { className: string }) {
  const p0: Pt = [80, 380];
  const p1: Pt = [62, 290];
  const p2: Pt = [106, 190];
  const p3: Pt = [90, 36];
  const d = `M${p0[0]} ${p0[1]} C${p1[0]} ${p1[1]} ${p2[0]} ${p2[1]} ${p3[0]} ${p3[1]}`;
  const [bx1, by1] = cubic(p0, p1, p2, p3, 0.84);
  const [bx2, by2] = cubic(p0, p1, p2, p3, 0.93);

  return (
    <svg className={`hero-sprig ${className}`} viewBox="0 0 160 380" aria-hidden="true" focusable="false">
      <path d={d} fill="none" stroke={GREEN.stem} strokeWidth="2.6" strokeLinecap="round" />
      {Array.from({ length: 8 }, (_, i) => {
        const [x, y] = cubic(p0, p1, p2, p3, round(0.1 + i * 0.09));
        const side = i % 2 === 0 ? 1 : -1;
        return (
          <Leaf
            key={i}
            x={x}
            y={y}
            angle={side * round(52 - i * 1.5)}
            length={round(54 - i * 3.4)}
            width={round(13 - i * 0.7)}
            fill={i % 3 === 0 ? GREEN.leafDark : i % 3 === 1 ? GREEN.leaf : GREEN.leafPale}
          />
        );
      })}
      <g fill="none" stroke={GREEN.stem} strokeWidth="1.6" strokeLinecap="round">
        <path d={`M${bx1} ${by1} Q${round(bx1 - 20)} ${round(by1 - 14)} 52 96`} />
        <path d={`M${bx2} ${by2} Q${round(bx2 + 18)} ${round(by2 - 2)} 128 60`} />
      </g>
      <FivePetalFlower x={52} y={96} r={15} color="#f1d58a" center="#d99a3a" rotate={-10} />
      <FivePetalFlower x={128} y={60} r={13} color="#c9b8e8" center="#e6c66c" rotate={20} />
      <ellipse cx="74" cy="82" rx="3" ry="5" fill="#d99aa4" transform="rotate(-30 74 82)" />
      <FivePetalFlower x={90} y={34} r={24} color="#eaa6b4" center="#e6c66c" rotate={12} />
    </svg>
  );
}

/* tiny wild flowers scattered on the hills (round dots, so they never stretch) */

const SPECK_COLORS = ["#f6e9b8", "#f1c9cf", "#cfdcea", "#ffffff", "#e0d2ee", "#f4c9a8"];

const SPECKS = (() => {
  const rand = seeded(21);
  return Array.from({ length: 46 }, () => ({
    x: round(2 + rand() * 96),
    y: round(40 + rand() * 54),
    size: round(3 + rand() * 3.5),
    color: SPECK_COLORS[Math.floor(rand() * SPECK_COLORS.length)],
    opacity: round(0.55 + rand() * 0.4),
  }));
})();

export function Specks() {
  return (
    <>
      {SPECKS.map((s, i) => (
        <span
          key={i}
          className="speck"
          aria-hidden="true"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: s.color,
            opacity: s.opacity,
          }}
        />
      ))}
    </>
  );
}

/* slowly drifting pollen */

const MOTES = (() => {
  const rand = seeded(99);
  return Array.from({ length: 16 }, () => ({
    x: round(3 + rand() * 94),
    y: round(8 + rand() * 78),
    size: round(3 + rand() * 4),
    delay: round(-rand() * 14),
    duration: round(11 + rand() * 9),
  }));
})();

export function Motes() {
  return (
    <>
      {MOTES.map((m, i) => (
        <span
          key={i}
          className="mote"
          aria-hidden="true"
          style={{
            left: `${m.x}%`,
            top: `${m.y}%`,
            width: m.size,
            height: m.size,
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.duration}s`,
          }}
        />
      ))}
    </>
  );
}

/* layered hills, a far hedge and soft leaf shadows */

export function MeadowBackdrop() {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const hills = [
    { id: "far", top: "#bfd2bd", opacity: 0.6, d: "M0 236 C150 205 300 250 480 224 C660 198 840 246 1000 214 L1000 780 L0 780Z" },
    { id: "mid", top: "#aac49b", opacity: 0.55, d: "M0 372 C180 336 350 398 530 362 C710 328 870 386 1000 350 L1000 780 L0 780Z" },
    { id: "near", top: "#93b186", opacity: 0.52, d: "M0 520 C200 486 400 544 600 510 C790 478 910 528 1000 498 L1000 780 L0 780Z" },
    { id: "front", top: "#7da174", opacity: 0.5, d: "M0 668 C240 636 460 690 660 658 C820 632 930 672 1000 650 L1000 780 L0 780Z" },
  ];

  return (
    <svg
      className="meadow-backdrop"
      viewBox="0 0 1000 780"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {hills.map((hill) => (
          <linearGradient key={hill.id} id={`${uid}-${hill.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={hill.top} stopOpacity={hill.opacity} />
            <stop offset="1" stopColor="#d9e3c9" stopOpacity="0.12" />
          </linearGradient>
        ))}
      </defs>

      <path d={hills[0].d} fill={`url(#${uid}-${hills[0].id})`} />
      <g fill="#86a583" opacity="0.26">
        {Array.from({ length: 13 }, (_, i) => (
          <ellipse key={i} cx={30 + i * 78} cy={220 + (i % 3) * 7} rx={48} ry={20 + (i % 2) * 5} />
        ))}
      </g>
      {hills.slice(1).map((hill) => (
        <path key={hill.id} d={hill.d} fill={`url(#${uid}-${hill.id})`} />
      ))}

      <g fill="#7f9f78" opacity="0.12">
        <ellipse cx="34" cy="600" rx="24" ry="96" transform="rotate(-24 34 600)" />
        <ellipse cx="70" cy="660" rx="20" ry="80" transform="rotate(14 70 660)" />
        <ellipse cx="966" cy="590" rx="24" ry="96" transform="rotate(24 966 590)" />
        <ellipse cx="930" cy="650" rx="20" ry="80" transform="rotate(-14 930 650)" />
        <ellipse cx="22" cy="400" rx="18" ry="70" transform="rotate(-18 22 400)" />
        <ellipse cx="980" cy="380" rx="18" ry="70" transform="rotate(18 980 380)" />
      </g>
    </svg>
  );
}

const BLADE_TONES = ["#6f9170", "#86a583", "#587a5d"];

const BLADES = (() => {
  const rand = seeded(7);
  return Array.from({ length: 110 }, (_, i) => {
    const x = round((i / 110) * 1000 + rand() * 12);
    const h = round(34 + rand() * 62);
    const bend = round((rand() - 0.5) * 34);
    const w = round(2 + rand() * 3);
    return {
      d: `M${round(x - w)} 120 Q${round(x + bend * 0.3)} ${round(120 - h * 0.55)} ${round(x + bend)} ${round(120 - h)} Q${round(x + bend * 0.6 + w * 0.3)} ${round(120 - h * 0.5)} ${round(x + w)} 120Z`,
      tone: i % 3,
      opacity: round(0.45 + rand() * 0.4),
    };
  });
})();

export function GrassFringe() {
  return (
    <svg
      className="meadow-fringe"
      viewBox="0 0 1000 120"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      {BLADES.map((blade, i) => (
        <path key={i} d={blade.d} fill={BLADE_TONES[blade.tone]} opacity={blade.opacity} />
      ))}
    </svg>
  );
}

/* a little clump of grass that hides the bottom of each stem */

const TUFT_TONES = ["#6f9170", "#86a583", "#587a5d", "#9bb894"];

export function Tuft({ seed, style }: { seed: number; style: CSSProperties }) {
  const rand = seeded(seed * 17 + 3);
  const blades = Array.from({ length: 11 }, (_, i) => {
    const x = round(5 + i * 9.5 + rand() * 3);
    const h = round(16 + rand() * 24 + (i > 3 && i < 8 ? 6 : 0));
    const bend = round((rand() - 0.5) * 18);
    const w = round(2 + rand() * 1.6);
    return {
      d: `M${round(x - w)} 44 Q${round(x + bend * 0.3)} ${round(44 - h * 0.55)} ${round(x + bend)} ${round(44 - h)} Q${round(x + bend * 0.5 + w * 0.3)} ${round(44 - h * 0.5)} ${round(x + w)} 44Z`,
      fill: TUFT_TONES[Math.floor(rand() * TUFT_TONES.length)],
      opacity: round(0.75 + rand() * 0.25),
    };
  });

  return (
    <svg
      className="tuft"
      style={style}
      viewBox="0 0 110 44"
      aria-hidden="true"
      focusable="false"
    >
      {blades.map((blade, i) => (
        <path key={i} d={blade.d} fill={blade.fill} opacity={blade.opacity} />
      ))}
    </svg>
  );
}