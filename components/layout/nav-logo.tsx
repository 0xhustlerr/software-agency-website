import Link from "next/link";
import { cn } from "@/lib/utils";

/*
 * The navigation-bar logo: a raised white NM (N and M sharing the middle
 * stroke, like the site icon) in front of a white world grid, which stands for
 * connecting clients everywhere, with "Nexus / Morrow" in two lines to its
 * right. Drawn in code so it stays sharp; it does not move.
 */

/** The merged NM, 114 × 80. The N's right stroke is the M's left stroke. */
const NM_SHAPE = (
  <>
    <rect x="0" y="0" width="19" height="80" />
    <polygon points="0,0 22,0 64,80 42,80" />
    <rect x="45" y="0" width="19" height="80" />
    <polygon points="45,0 66,0 89,52 79,70" />
    <polygon points="114,0 93,0 70,52 80,70" />
    <rect x="95" y="0" width="19" height="80" />
  </>
);

/** Grey layers beneath the white face give the letters their thickness. */
const DEPTH = [
  { y: 4.5, fill: "#4d5869" },
  { y: 3, fill: "#6f7a8b" },
  { y: 1.5, fill: "#97a2b2" },
];

export function NavLogo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="Nexus Morrow, home" className={cn("-my-1 inline-flex items-center gap-2.5 rounded-xs py-1", className)}>
      <svg aria-hidden viewBox="-76 -76 152 152" className="block size-11.5 lg:size-13">
        <defs>
          <g id="nm-logo-shape">{NM_SHAPE}</g>
          {/* soft light from the top left, so the edges look bevelled */}
          <filter id="nm-logo-bevel" x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
            <feDiffuseLighting in="blur" surfaceScale="4" diffuseConstant="1.3" lightingColor="#fff" result="light">
              <feDistantLight azimuth="240" elevation="52" />
            </feDiffuseLighting>
            <feComposite in="light" in2="SourceAlpha" operator="in" result="lit" />
            <feBlend in="SourceGraphic" in2="lit" mode="multiply" />
          </filter>
          <filter id="nm-logo-shadow" x="-20%" y="-20%" width="140%" height="160%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
            <feOffset dy="5" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.7" />
            </feComponentTransfer>
          </filter>
        </defs>

        {/* the globe */}
        <g fill="none" stroke="#fff" strokeWidth="2.4" strokeOpacity="0.45">
          <circle r="64" />
          <ellipse rx="30" ry="64" />
          <ellipse rx="54" ry="64" />
          <line x1="0" y1="-64" x2="0" y2="64" />
          <path d="M-56 -30 H56 M-64 0 H64 M-56 30 H56" />
        </g>
        <circle r="64" fill="none" stroke="#fff" strokeWidth="4" strokeOpacity="0.8" />

        {/* the raised NM */}
        <g transform="translate(-37 -26) scale(0.65)">
          <use href="#nm-logo-shape" filter="url(#nm-logo-shadow)" transform="translate(0 3)" />
          {DEPTH.map((d) => (
            <use key={d.y} href="#nm-logo-shape" fill={d.fill} transform={`translate(0 ${d.y})`} />
          ))}
          <use href="#nm-logo-shape" fill="#fbfcfe" filter="url(#nm-logo-bevel)" />
        </g>
      </svg>
      {/* the name in two lines, raised slightly like the NM */}
      <span
        aria-hidden
        className="font-display text-[17px] leading-[0.98] font-bold tracking-[-0.02em] text-white [text-shadow:0_1px_0_#97a2b2,0_2px_0_#6f7a8b,0_3px_4px_rgb(0_0_0/0.5)] lg:text-[20px]"
      >
        Nexus
        <br />
        Morrow
      </span>
    </Link>
  );
}
