import Image from "next/image";
import type { ServiceSlug } from "@/content/types";
import { cn } from "@/lib/utils";
import { ConceptBadge, Item, Scene, type Vars } from "./scene";
import { serviceLooks } from "./service-visuals";

/** The four services in the order of the page, with their place on the 16s clock (one 4s beat each). */
const tiles: { slug: ServiceSlug; x: number; y: number; delay: string; lifted: boolean }[] = [
  { slug: "mvp-development", x: 0, y: 0, delay: "0s", lifted: true },
  { slug: "saas-development", x: 284, y: 0, delay: "-12s", lifted: false },
  { slug: "ai-development", x: 284, y: 196, delay: "-8s", lifted: false },
  { slug: "custom-software", x: 0, y: 196, delay: "-4s", lifted: false },
];

/**
 * /services hero: a bento of the four services, each its own photo and colour.
 * Tiles take turns rising out of the mosaic (clockwise, every 4s), so the page's
 * idea, four ways to get a product into production, reads at a glance. Reduced
 * motion keeps MVPs lifted.
 */
export function ServicesHeroArt() {
  return (
    <figure className="m-0" aria-label="The four services as a mosaic of photos: MVPs, SaaS platforms, AI products and custom software.">
      <Scene width={560} height={380} phase="-5s">
        <div className="absolute inset-[-30px] rounded-[40px] bg-[radial-gradient(closest-side,rgb(109_225_210/0.16),transparent)] blur-[20px]" style={{ transform: "translateZ(-90px)" }} />
        {tiles.map((t) => {
          const look = serviceLooks[t.slug];
          if (!look) return null;
          const Icon = look.icon;
          return (
            <Item key={t.slug} x={t.x} y={t.y} w={276} h={184} enter={150 + t.x / 2 + t.y} float="0px">
              <div
                className="nm-lift relative h-full overflow-hidden rounded-[16px] border-[1.5px] bg-[#0b1220]"
                style={
                  {
                    borderColor: `${look.accent}aa`,
                    boxShadow: `inset 0 1px 0 rgb(255 255 255 / 0.1), 0 0 50px -12px ${look.accent}aa, 0 30px 50px -22px rgb(0 0 0 / 0.85)`,
                    "--delay": t.delay,
                    "--lz": t.lifted ? "46px" : "0px",
                    "--lb": t.lifted ? "1.1" : "0.65",
                  } as Vars
                }
              >
                <Image src={look.src} alt="" fill sizes="(min-width: 1024px) 20vw, 45vw" className="object-cover" style={{ objectPosition: look.position }} />
                <div className={cn("absolute inset-0 bg-linear-to-br mix-blend-color", look.grade)} />
                <div className="absolute inset-0 bg-linear-to-t from-[#0b1220]/90 via-[#0b1220]/10 to-transparent" />
                <span className="absolute bottom-3 left-3 flex items-center gap-2.5">
                  <span className="grid size-9 place-items-center rounded-[10px]" style={{ background: `linear-gradient(135deg, ${look.accent}, ${look.accent}99)`, boxShadow: `0 0 18px ${look.accent}99` }}>
                    <Icon aria-hidden className="size-[18px] text-[#0b1220]" strokeWidth={2.5} />
                  </span>
                  <span className="font-display text-[19px] font-semibold tracking-[-0.01em] text-white">{look.label}</span>
                </span>
              </div>
            </Item>
          );
        })}
      </Scene>
      <ConceptBadge>Four ways to production</ConceptBadge>
    </figure>
  );
}
