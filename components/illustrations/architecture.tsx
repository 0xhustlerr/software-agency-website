/**
 * The engineering section's picture, for everyone (not only developers): a
 * holographic 3D projection of a laptop and phone running an app, floating
 * above a glowing glass board, with four promises called out in plain words
 * (safe, fast, always on, ready to grow). It draws itself when the section
 * comes into view; a scan line rises through it.
 */
import type { CSSProperties } from "react";
import { ShieldCheck, TrendingUp, Wifi, Zap, type LucideIcon } from "lucide-react";
import { ConceptBadge } from "./scene";

type P3 = [number, number, number];

/** Isometric projection of a 3D point onto the drawing (x right-back, y left-back, z up). */
const C = Math.cos(Math.PI / 6);
const OX = 250;
const OY = 270;
const pt = ([x, y, z]: P3) => `${(OX + (x - y) * C).toFixed(1)} ${(OY + (x + y) * 0.5 - z).toFixed(1)}`;
const poly = (ps: P3[], close = true) => `M ${ps.map(pt).join(" L ")}${close ? " Z" : ""}`;

/* The laptop: a base 320 × 220 × 14, and a screen leaning back from its rear edge. */
const W = 320;
const D = 220;
const BASE = 14;
const SCREEN_H = 220;
const LEAN = 34;
/** A point on the screen: u across (0–1), v up (0–1). */
const scr = (u: number, v: number): P3 => [u * W, -LEAN * v, BASE + SCREEN_H * v];
const rectOnScreen = (u0: number, v0: number, u1: number, v1: number) => poly([scr(u0, v0), scr(u1, v0), scr(u1, v1), scr(u0, v1)]);

/* The phone, standing at the laptop's front right corner: 64 wide, 12 deep, 130 tall. */
const PX = 286;
const PY = 200;
const PW = 64;
const PH = 130;
const ph = (u: number, v: number): P3 => [PX + u * PW, PY, v * PH];
const rectOnPhone = (u0: number, v0: number, u1: number, v1: number) => poly([ph(u0, v0), ph(u1, v0), ph(u1, v1), ph(u0, v1)]);

/** Every stroke of the sketch, in drawing order. Indices 8–11 are the app on screen (drawn in mint). */
const strokes: string[] = [
  // laptop base: top, front and side faces
  poly([[0, 0, BASE], [W, 0, BASE], [W, D, BASE], [0, D, BASE]]),
  poly([[0, D, 0], [W, D, 0], [W, D, BASE], [0, D, BASE]]),
  poly([[W, 0, 0], [W, D, 0], [W, D, BASE], [W, 0, BASE]]),
  // keyboard and trackpad
  ...[0, 1, 2].map((r) => poly([[24, 24 + r * 26, BASE], [W - 24, 24 + r * 26, BASE]], false)),
  // screen: back panel and inner display
  poly([scr(0, 0), scr(1, 0), scr(1, 1), scr(0, 1)]),
  rectOnScreen(0.04, 0.06, 0.96, 0.94),
  // the app on screen: header, chart, two cards
  rectOnScreen(0.08, 0.8, 0.92, 0.88),
  poly([scr(0.1, 0.42), scr(0.24, 0.5), scr(0.36, 0.46), scr(0.5, 0.6), scr(0.64, 0.55), scr(0.78, 0.7), scr(0.9, 0.74)], false),
  rectOnScreen(0.08, 0.12, 0.3, 0.34),
  rectOnScreen(0.7, 0.12, 0.92, 0.34),
  // trackpad
  poly([[110, 132, BASE], [210, 132, BASE], [210, 196, BASE], [110, 196, BASE]]),
  // phone: front, side, top and its screen
  poly([ph(0, 0), ph(1, 0), ph(1, 1), ph(0, 1)]),
  poly([ph(1, 0), [PX + PW, PY - 12, 0], [PX + PW, PY - 12, PH], ph(1, 1)]),
  poly([ph(0, 1), ph(1, 1), [PX + PW, PY - 12, PH], [PX, PY - 12, PH]]),
  rectOnPhone(0.1, 0.06, 0.9, 0.94),
  rectOnPhone(0.18, 0.7, 0.82, 0.86),
  poly([ph(0.18, 0.4), ph(0.38, 0.5), ph(0.56, 0.44), ph(0.82, 0.6)], false),
];


/* The projection board: a glass plate under the devices, with a light grid. */
const DROP = 46;
const BX0 = -50;
const BX1 = W + 110;
const BY0 = -70;
const BY1 = D + 60;
const boardTop = poly([[BX0, BY0, -DROP], [BX1, BY0, -DROP], [BX1, BY1, -DROP], [BX0, BY1, -DROP]]);
const boardFront = poly([[BX0, BY1, -DROP], [BX1, BY1, -DROP], [BX1, BY1, -DROP - 10], [BX0, BY1, -DROP - 10]]);
const boardSide = poly([[BX1, BY0, -DROP], [BX1, BY1, -DROP], [BX1, BY1, -DROP - 10], [BX1, BY0, -DROP - 10]]);
const boardGrid = [
  ...Array.from({ length: 9 }, (_, i) => poly([[BX0 + ((BX1 - BX0) * (i + 1)) / 10, BY0, -DROP], [BX0 + ((BX1 - BX0) * (i + 1)) / 10, BY1, -DROP]], false)),
  ...Array.from({ length: 7 }, (_, i) => poly([[BX0, BY0 + ((BY1 - BY0) * (i + 1)) / 8, -DROP], [BX1, BY0 + ((BY1 - BY0) * (i + 1)) / 8, -DROP]], false)),
];
/** Light rays from the board up to the devices' corners. */
const rays: [P3, P3][] = [
  [[0, 0, -DROP], [0, 0, 0]],
  [[W, 0, -DROP], [W, 0, 0]],
  [[W, D, -DROP], [W, D, 0]],
  [[0, D, -DROP], [0, D, 0]],
  [[PX, PY, -DROP], [PX, PY, 0]],
  [[PX + PW, PY, -DROP], [PX + PW, PY, 0]],
];
const HOLO = "#7ff3ff";

/** Fine lines on the laptop base's front face. */
const hatch = Array.from({ length: 18 }, (_, i) => poly([[12 + i * 17, D, 1], [i * 17 + 4, D, BASE - 1]], false));

const promises: { icon: LucideIcon; label: string; line: string; accent: string; box: [number, number]; to: string }[] = [
  { icon: ShieldCheck, label: "Safe & secure", line: "Your data is protected", accent: "#6de1d2", box: [-20, 0], to: "M 200 50 C 240 60, 280 72, 305 92" },
  { icon: Zap, label: "Fast", line: "Quick for every user", accent: "#f6b26b", box: [424, 20], to: "M 560 98 C 556 150, 540 200, 520 236" },
  { icon: Wifi, label: "Always on", line: "Works when people need it", accent: "#6ea8ff", box: [-20, 480], to: "M 130 480 C 150 462, 170 452, 190 444" },
  { icon: TrendingUp, label: "Ready to grow", line: "Grows with your users", accent: "#b794f6", box: [424, 480], to: "M 460 480 C 440 470, 410 462, 380 454" },
];

const d = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

export function EngineeringArt() {
  return (
    <figure className="m-0" aria-label="A holographic 3D projection of a laptop and phone running an app above a glowing board, with four promises: safe and secure, fast, always on, and ready to grow.">
      <div className="nm-float" style={{ "--float": "-6px", "--float-dur": "8s" } as CSSProperties}>
        <svg aria-hidden viewBox="-30 -20 690 600" className="block h-auto w-full overflow-visible" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <defs>
            <radialGradient id="eng-glow" cx="50%" cy="55%" r="50%">
              <stop offset="0" stopColor="#6de1d2" stopOpacity="0.18" />
              <stop offset="1" stopColor="#6de1d2" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="300" cy="280" rx="330" ry="260" fill="url(#eng-glow)" />
          <defs>
            <linearGradient id="eng-ray" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" stopColor={HOLO} stopOpacity="0.9" />
              <stop offset="1" stopColor={HOLO} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="eng-scan" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor={HOLO} stopOpacity="0" />
              <stop offset="0.5" stopColor={HOLO} stopOpacity="0.9" />
              <stop offset="1" stopColor={HOLO} stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* the glass board the product is projected from */}
          <path d={boardTop} fill={HOLO} fillOpacity="0.07" stroke={HOLO} strokeOpacity="0.8" strokeWidth="1.6" style={{ filter: `drop-shadow(0 0 8px ${HOLO})` }} />
          <path d={boardFront} fill={HOLO} fillOpacity="0.18" stroke={HOLO} strokeOpacity="0.6" strokeWidth="1" />
          <path d={boardSide} fill={HOLO} fillOpacity="0.12" stroke={HOLO} strokeOpacity="0.6" strokeWidth="1" />
          {boardGrid.map((g, i) => (
            <path key={i} d={g} stroke={HOLO} strokeOpacity="0.18" strokeWidth="1" />
          ))}
          {/* light pooling on the board under the projection */}
          <path d={poly([[-10, -10, -DROP], [W + 70, -10, -DROP], [W + 70, D + 20, -DROP], [-10, D + 20, -DROP]])} fill={HOLO} fillOpacity="0.16" style={{ filter: "blur(16px)" }} />
          {/* rays of light up to the projection */}
          {rays.map(([a, b], i) => (
            <path key={i} d={`M ${pt(a)} L ${pt(b)}`} stroke="url(#eng-ray)" strokeWidth="2" className="nm-enter-fade" style={d(600 + i * 60)} />
          ))}
          {/* the screens glow: they're on */}
          <path d={rectOnScreen(0.04, 0.06, 0.96, 0.94)} fill={HOLO} fillOpacity="0.1" />
          <path d={rectOnPhone(0.1, 0.06, 0.9, 0.94)} fill={HOLO} fillOpacity="0.1" />
          {/* a filled button on the screen and on the phone */}
          <path d={rectOnScreen(0.38, 0.14, 0.62, 0.24)} fill="#6de1d2" fillOpacity="0.6" className="nm-enter-fade" style={d(1800)} />
          <path d={rectOnPhone(0.3, 0.12, 0.7, 0.2)} fill="#6de1d2" fillOpacity="0.6" className="nm-enter-fade" style={d(1900)} />
          {/* fine glowing lines on the laptop's front */}
          {hatch.map((h, i) => (
            <path key={i} d={h} pathLength={1} stroke={HOLO} strokeOpacity="0.4" strokeWidth="1" className="nm-draw" style={d(1200 + i * 25)} />
          ))}
          {/* the hologram: a soft glow line under a crisp one */}
          {strokes.map((s, i) => {
            const app = i >= 8 && i <= 11;
            return (
              <g key={i}>
                <path d={s} pathLength={1} stroke={HOLO} strokeOpacity="0.35" strokeWidth="5" className="nm-draw" style={{ ...d(i * 90), filter: "blur(3px)" }} />
                <path d={s} pathLength={1} stroke={app ? "#ffffff" : HOLO} strokeWidth={app ? 2.2 : 1.8} className="nm-draw" style={d(i * 90)} />
              </g>
            );
          })}
          {/* a scan line rising through the projection */}
          <rect x="40" y="430" width="520" height="3" fill="url(#eng-scan)" className="nm-scan-up" style={{ filter: `drop-shadow(0 0 6px ${HOLO})` }} />
          {/* call-outs: dashed arrows from each promise to the product */}
          {promises.map((p, i) => (
            <path key={p.label} d={p.to} pathLength={1} stroke={p.accent} strokeWidth="1.8" strokeDasharray="0.04 0.03" className="nm-enter-fade" style={d(2000 + i * 150)} />
          ))}
          {promises.map((p, i) => {
            const Icon = p.icon;
            const [x, y] = p.box;
            return (
              <g key={p.label} className="nm-enter-fade" style={d(2100 + i * 150)}>
                <rect x={x} y={y} width="236" height="76" rx="16" fill="#141d2e" fillOpacity="0.92" stroke={p.accent} strokeWidth="1.6" strokeDasharray="6 4" />
                <circle cx={x + 36} cy={y + 38} r="20" fill={p.accent} />
                <Icon x={x + 24} y={y + 26} width={24} height={24} color="#0b1220" strokeWidth={2.25} />
                <text x={x + 66} y={y + 34} fill="#ffffff" fontSize="17" fontWeight="600" style={{ fontFamily: "var(--font-display)" }}>
                  {p.label}
                </text>
                <text x={x + 66} y={y + 55} fill={p.accent} fontSize="12.5" fontWeight="500" style={{ fontFamily: "var(--font-sans)" }}>
                  {p.line}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <ConceptBadge>Software that just works</ConceptBadge>
    </figure>
  );
}
