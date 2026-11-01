/**
 * The engineering section's picture: software architecture as a holographic
 * 3D stack, in plain words so anyone can follow it. Four glowing layers, from
 * the apps people use down to the data, with information flowing between
 * them: apps → secure gateway → services → data. It draws itself when the
 * section comes into view; a scan line rises through it.
 */
import type { CSSProperties } from "react";
import { ConceptBadge } from "./scene";

type P3 = [number, number, number];

/** Isometric projection (x right-back, y left-back, z up). */
const C = Math.cos(Math.PI / 6);
const OX = 230;
const OY = 350;
const xy = ([x, y, z]: P3): [number, number] => [OX + (x - y) * C, OY + (x + y) * 0.5 - z];
const pt = (p: P3) => xy(p).map((n) => n.toFixed(1)).join(" ");
const poly = (ps: P3[], close = true) => `M ${ps.map(pt).join(" L ")}${close ? " Z" : ""}`;

const W = 300;
const D = 220;
const T = 8;
const GAP = 92;

/** A box sitting on z, x/y its near corner. */
const box = (x: number, y: number, w: number, d: number, h: number, z: number) => [
  poly([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]]),
  poly([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]]),
  poly([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]]),
];
/** A database cylinder: three rings joined at the sides. */
const ring = (cx: number, cy: number, r: number, z: number) =>
  poly(Array.from({ length: 24 }, (_, i) => [cx + r * Math.cos((i / 24) * Math.PI * 2), cy + r * Math.sin((i / 24) * Math.PI * 2), z] as P3));
const side = (cx: number, cy: number, r: number, a: number, z: number, h: number) =>
  poly([[cx + r * Math.cos(a), cy + r * Math.sin(a), z], [cx + r * Math.cos(a), cy + r * Math.sin(a), z + h]], false);
const cylinder = (cx: number, cy: number, r: number, z: number, h: number) => [
  ring(cx, cy, r, z),
  ring(cx, cy, r, z + h * 0.5),
  ring(cx, cy, r, z + h),
  side(cx, cy, r, Math.PI * 0.75, z, h),
  side(cx, cy, r, -Math.PI * 0.25, z, h),
];
/** A screen standing on z (for the app layer), with two lines of content. */
const screen = (x: number, y: number, w: number, h: number, z: number) => [
  poly([[x, y, z], [x + w, y, z], [x + w, y, z + h], [x, y, z + h]]),
  poly([[x + w * 0.1, y, z + h * 0.7], [x + w * 0.9, y, z + h * 0.7]], false),
  poly([[x + w * 0.1, y, z + h * 0.45], [x + w * 0.6, y, z + h * 0.45]], false),
];

interface Layer {
  z: number;
  name: string;
  plain: string;
  accent: string;
  parts: string[];
}

/** Top to bottom, in plain words. */
const layers: Layer[] = [
  { z: GAP * 3, name: "Apps people use", plain: "Website, mobile app, admin", accent: "#6de1d2", parts: [...screen(40, 70, 110, 70, GAP * 3 + T), ...screen(190, 70, 40, 70, GAP * 3 + T), ...screen(250, 70, 40, 70, GAP * 3 + T)] },
  { z: GAP * 2, name: "Secure gateway", plain: "Checks who gets in", accent: "#f6b26b", parts: [...box(70, 70, 160, 60, 26, GAP * 2 + T)] },
  { z: GAP, name: "Services that do the work", plain: "Payments, emails, AI, logic", accent: "#b794f6", parts: [...box(30, 40, 60, 60, 30, GAP + T), ...box(120, 40, 60, 60, 30, GAP + T), ...box(210, 40, 60, 60, 30, GAP + T), ...box(75, 130, 60, 60, 30, GAP + T)] },
  { z: 0, name: "Data, safely stored", plain: "Backed up every day", accent: "#6ea8ff", parts: [...cylinder(80, 110, 34, T, 50), ...cylinder(170, 110, 34, T, 50), ...cylinder(250, 110, 30, T, 40)] },
];

const plate = (z: number) => [
  poly([[0, 0, z + T], [W, 0, z + T], [W, D, z + T], [0, D, z + T]]),
  poly([[0, D, z], [W, D, z], [W, D, z + T], [0, D, z + T]]),
  poly([[W, 0, z], [W, D, z], [W, D, z + T], [W, 0, z + T]]),
];

/** Information flowing between the layers, at three points. */
const flows: [number, number][] = [
  [20, 200],
  [150, 210],
  [290, 200],
];

const d = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;
const HOLO = "#7ff3ff";

export function EngineeringArt() {
  return (
    <figure className="m-0" aria-label="Software architecture as four glowing layers: apps people use, a secure gateway, services that do the work, and data that is safely stored, with information flowing between them.">
      <div className="nm-float" style={{ "--float": "-6px", "--float-dur": "8s" } as CSSProperties}>
        <svg aria-hidden viewBox="20 20 720 600" className="block h-auto w-full overflow-visible" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <defs>
            <radialGradient id="arch-glow" cx="45%" cy="55%" r="55%">
              <stop offset="0" stopColor={HOLO} stopOpacity="0.16" />
              <stop offset="1" stopColor={HOLO} stopOpacity="0" />
            </radialGradient>
            <linearGradient id="arch-scan" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor={HOLO} stopOpacity="0" />
              <stop offset="0.5" stopColor={HOLO} stopOpacity="0.9" />
              <stop offset="1" stopColor={HOLO} stopOpacity="0" />
            </linearGradient>
          </defs>
          <ellipse cx="260" cy="330" rx="320" ry="290" fill="url(#arch-glow)" />

          {/* information flowing up and down between the layers */}
          {flows.map(([x, y], i) => (
            <g key={i}>
              <path d={poly([[x, y, T], [x, y, GAP * 3]], false)} stroke={HOLO} strokeOpacity="0.25" strokeWidth="1.5" />
              <path d={poly([[x, y, T], [x, y, GAP * 3]], false)} stroke={HOLO} strokeWidth="2.5" strokeDasharray="5 14" className="nm-dash" style={{ animationDelay: `${-i * 0.5}s`, filter: `drop-shadow(0 0 4px ${HOLO})` }} />
            </g>
          ))}

          {/* the layers, bottom first so upper ones sit in front */}
          {[...layers].reverse().map((l, k) => {
            const [lx, ly] = xy([W, 0, l.z + T]);
            return (
              <g key={l.name}>
                {plate(l.z).map((p, j) => (
                  <path key={j} d={p} pathLength={1} fill={l.accent} fillOpacity={j === 0 ? 0.08 : 0.16} stroke={l.accent} strokeOpacity="0.9" strokeWidth="1.6" className="nm-draw" style={{ ...d(k * 280), filter: `drop-shadow(0 0 6px ${l.accent})` }} />
                ))}
                {l.parts.map((p, j) => (
                  <g key={j}>
                    <path d={p} pathLength={1} stroke={l.accent} strokeOpacity="0.35" strokeWidth="5" className="nm-draw" style={{ ...d(k * 280 + 150 + j * 30), filter: "blur(3px)" }} />
                    <path d={p} pathLength={1} stroke="#ffffff" strokeOpacity="0.9" strokeWidth="1.5" className="nm-draw" style={d(k * 280 + 150 + j * 30)} />
                  </g>
                ))}
                {/* its name, in plain words, off the right corner */}
                <g className="nm-enter-fade" style={d(k * 280 + 500)}>
                  <path d={`M ${lx + 8} ${ly} L ${lx + 40} ${ly}`} stroke={l.accent} strokeWidth="1.5" strokeDasharray="4 4" />
                  <circle cx={lx + 4} cy={ly} r="4" fill={l.accent} />
                  <text x={lx + 50} y={ly - 2} fill="#ffffff" fontSize="19" fontWeight="600" style={{ fontFamily: "var(--font-display)" }}>
                    {l.name}
                  </text>
                  <text x={lx + 50} y={ly + 19} fill={l.accent} fontSize="14" fontWeight="500" style={{ fontFamily: "var(--font-sans)" }}>
                    {l.plain}
                  </text>
                </g>
              </g>
            );
          })}

          {/* a scan line rising through the stack */}
          <rect x="40" y="560" width="440" height="3" fill="url(#arch-scan)" className="nm-scan-up" style={{ filter: `drop-shadow(0 0 6px ${HOLO})` }} />
        </svg>
      </div>
      <ConceptBadge>How your software is built</ConceptBadge>
    </figure>
  );
}
