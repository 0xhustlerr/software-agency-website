import { ImageResponse } from "next/og";
import { hero } from "@/content/home";
import { site } from "@/content/site";

/*
 * Site-wide social card, generated at build time. It uses next/og's built-in
 * font because the self-hosted families are woff2, which ImageResponse can't read.
 */
export const alt = `${site.name} — product engineering for startup founders`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const navy = "#101827";
const mint = "#6de1d2";
const ink = "#f5f7fa";
const muted = "#cbd5e1";
const line = "#2e3e57";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: navy,
          backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
          color: ink,
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: "-0.03em" }}>{site.name}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: "0.14em", textTransform: "uppercase", color: mint }}>{hero.eyebrow}</div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 84, fontWeight: 700, lineHeight: 1.02, letterSpacing: "-0.04em", maxWidth: 900 }}>
            {hero.headline}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 28, color: muted }}>Product engineering for startup founders</div>
          {/* The motif: a line arriving at a filled mint node. */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: 14, height: 14, borderRadius: 14, border: `2px solid ${mint}` }} />
            <div style={{ width: 120, height: 2, background: mint }} />
            <div style={{ width: 20, height: 20, borderRadius: 20, background: mint }} />
          </div>
        </div>
      </div>
    ),
    size,
  );
}
