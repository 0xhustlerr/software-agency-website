import Link from "next/link";
import { cn } from "@/lib/utils";

/*
 * The navigation-bar logo: a gold sun with the NM in front and the name
 * beneath, drawn in code so it stays sharp and sits straight on the navy
 * header with no box. The sun turns slowly and breathes, and a band of light
 * runs over the gold; all of it rests for reduced motion (see globals.css → nm-logo).
 */

/** 20 wide beams, long and short in turn, like the supplied logo. Rounded, so server and browser agree. */
const beams = Array.from({ length: 20 }, (_, i) => {
  const long = i % 2 === 0;
  const r0 = 15;
  const r1 = long ? 48 : 42;
  const w = long ? 6.5 : 5;
  const n = (v: number) => v.toFixed(2);
  return { points: `${n(-w * 0.8)},${-r0} ${n(w * 0.8)},${-r0} ${n(w)},${-r1} ${n(-w)},${-r1}`, angle: i * 18, opacity: long ? 0.55 : 0.4 };
});

export function NavLogo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="Nexus Morrow, home" className={cn("nm-logo -my-1 inline-flex flex-col items-center gap-px rounded-xs py-1", className)}>
      <span aria-hidden className="nm-logo-mark">
        <span className="nm-logo-glow" />
        <svg className="nm-logo-sun" viewBox="-50 -50 100 100">
          <defs>
            <linearGradient id="nm-logo-beam" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f6d77a" />
              <stop offset="1" stopColor="#d6952a" />
            </linearGradient>
          </defs>
          {beams.map((b) => (
            <polygon key={b.angle} points={b.points} transform={`rotate(${b.angle})`} fill="url(#nm-logo-beam)" opacity={b.opacity} />
          ))}
        </svg>
        <span className="nm-logo-nm">
          <span className="nm-logo-gold">NM</span>
          <span className="nm-logo-shine">NM</span>
        </span>
      </span>
      <span aria-hidden className="nm-logo-name">
        <span className="nm-logo-gold">NEXUS MORROW</span>
        <span className="nm-logo-shine">NEXUS MORROW</span>
      </span>
    </Link>
  );
}
