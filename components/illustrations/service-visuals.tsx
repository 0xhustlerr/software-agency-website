/**
 * Service pictures, one per core service: a large real photo of the service's
 * purpose in its own colour (the hero's palette), with one floating caption
 * that names the skill and its promise. Tilted 3D stages, decorative
 * (aria-hidden by the caller), always dark so they read on navy stages and
 * light panels.
 *
 * Photos (free licences, no attribution required, stored in public/img/services/;
 * not public/services, which proxy.ts answers with 404):
 * MVP wireframes and app: Unsplash h3kEAHMl1k4 · custom software in a warehouse:
 * Pexels 4483942 · SaaS dashboard: Unsplash photo-1460925895917-afdab827c52f ·
 * AI: Unsplash FHgWFzDDAOs.
 */
import Image from "next/image";
import { Code2, LayoutDashboard, Rocket, Sparkles, type LucideIcon } from "lucide-react";
import type { ServiceSlug } from "@/content/types";
import { cn } from "@/lib/utils";
import { Badge3D, ConceptBadge, Item, Scene } from "./scene";

export interface ServiceLook {
  src: string;
  /** Focal point of the photo inside the frame. */
  position: string;
  accent: string;
  /** Colour grade blended over the photo. */
  grade: string;
  icon: LucideIcon;
  label: string;
  promise: string;
  /** What the photo shows, for the badge beneath it. */
  caption: string;
}

/** The same four skills, colours and promises as the homepage hero's product cards. */
export const serviceLooks: Partial<Record<ServiceSlug, ServiceLook>> = {
  "mvp-development": {
    src: "/img/services/mvp-v2.webp",
    position: "center 55%",
    accent: "#f6b26b",
    grade: "from-[#f6b26b]/30 to-[#e8734a]/15",
    icon: Rocket,
    label: "MVPs",
    promise: "From sketch to first users",
    caption: "Wireframes to working app",
  },
  "saas-development": {
    src: "/img/services/saas.webp",
    position: "center 40%",
    accent: "#6de1d2",
    grade: "from-[#6de1d2]/25 to-[#3fa7c9]/15",
    icon: LayoutDashboard,
    label: "SaaS Platforms",
    promise: "Built to scale and grow",
    caption: "Live product analytics",
  },
  "ai-development": {
    src: "/img/services/ai.webp",
    position: "center",
    accent: "#b794f6",
    grade: "from-[#b794f6]/25 to-[#7c6cf0]/15",
    icon: Sparkles,
    label: "AI Products",
    promise: "Intelligence users can trust",
    caption: "People and AI, together",
  },
  "custom-software": {
    src: "/img/services/custom-v2.webp",
    position: "center 35%",
    accent: "#6ea8ff",
    grade: "from-[#6ea8ff]/30 to-[#3d5afe]/15",
    icon: Code2,
    label: "Custom Software",
    promise: "Shaped around how you work",
    caption: "Built for daily operations",
  },
};

/** Sway phases, so neighbouring pictures don't move in step. */
const phases: Partial<Record<ServiceSlug, string>> = {
  "mvp-development": "-3s",
  "custom-software": "-6s",
  "saas-development": "-9s",
  "ai-development": "-12s",
};

function ServicePicture({ look, phase }: { look: ServiceLook; phase: string }) {
  const { accent: a, icon: Icon } = look;
  return (
    <Scene width={440} height={330} phase={phase}>
      <div className="absolute top-[30px] left-[70px] size-[300px] rounded-full blur-[70px]" style={{ background: `${a}2a`, transform: "translateZ(-80px)" }} />
      {/* the photo */}
      <Item x={0} y={0} w={440} h={286} enter={150} float="-3px" floatDur="8s">
        <div
          className="relative h-full overflow-hidden rounded-[16px] border-[1.5px] bg-[#0b1220]"
          style={{ borderColor: `${a}99`, boxShadow: `inset 0 1px 0 rgb(255 255 255 / 0.1), 0 0 60px -12px ${a}99, 0 40px 70px -24px rgb(0 0 0 / 0.85)` }}
        >
          <Image src={look.src} alt="" fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" style={{ objectPosition: look.position }} />
          <div className={cn("absolute inset-0 bg-linear-to-br mix-blend-color", look.grade)} />
          <div className="absolute inset-0 bg-linear-to-t from-[#0b1220]/75 via-transparent to-transparent" />
        </div>
      </Item>
      {/* the skill, floating forward over the photo's lower edge */}
      <Item x={24} y={236} w={300} h={78} z={60} enter={700} float="-8px" floatDur="6.5s" floatDelay="-2s">
        <div
          className="relative flex h-full items-center gap-3.5 overflow-hidden rounded-[14px] border-[1.5px] bg-linear-to-b from-[#22314a] to-[#141d2e] px-3.5 text-left"
          style={{ borderColor: `${a}99`, boxShadow: `inset 0 1px 0 rgb(255 255 255 / 0.08), 0 3px 0 #0d1626, 0 0 36px -8px ${a}aa, 0 30px 50px -18px rgb(0 0 0 / 0.85)` }}
        >
          <span aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${a}, transparent)` }} />
          <span className="grid size-12 shrink-0 place-items-center rounded-[12px]" style={{ background: `linear-gradient(135deg, ${a}, ${a}99)`, boxShadow: `0 0 22px ${a}88` }}>
            <Icon aria-hidden className="size-6 text-[#0b1220]" strokeWidth={2.25} />
          </span>
          <span className="min-w-0">
            <span className="font-display block text-[23px] leading-tight font-semibold tracking-[-0.02em] text-white">{look.label}</span>
            <span className="mt-0.5 block truncate text-[14px] font-medium" style={{ color: a }}>
              {look.promise}
            </span>
          </span>
        </div>
      </Item>
    </Scene>
  );
}

export function ServiceVisual({ slug, className }: { slug: ServiceSlug; className?: string }) {
  const look = serviceLooks[slug];
  return look ? (
    <div data-theme="dark" className={cn("bg-transparent", className)}>
      <ServicePicture look={look} phase={phases[slug] ?? "0s"} />
    </div>
  ) : null;
}

/** The 3D badge beneath a service picture: what its photo shows, in the service's colour. */
export function ServiceBadge({ slug, standalone }: { slug: ServiceSlug; standalone?: boolean }) {
  const look = serviceLooks[slug];
  if (!look) return null;
  return standalone ? <Badge3D accent={look.accent}>{look.caption}</Badge3D> : <ConceptBadge accent={look.accent}>{look.caption}</ConceptBadge>;
}

/**
 * Full-bleed hero backdrop for a service page: the service photo on the right,
 * graded in the service colour and fading into the navy behind the copy, with
 * the photo's 3D label floating at its corner.
 */
export function ServiceHeroBackdrop({ slug }: { slug: ServiceSlug }) {
  const look = serviceLooks[slug];
  if (!look) return null;
  const a = look.accent;
  const Icon = look.icon;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute inset-y-0 right-0 w-full lg:w-[62%]">
        <Image src={look.src} alt="" fill priority sizes="(min-width: 1024px) 62vw, 100vw" className="object-cover" style={{ objectPosition: look.position }} />
        <div className={cn("absolute inset-0 bg-linear-to-br mix-blend-color", look.grade)} />
        {/* fade into the copy: full on phones, from the left on desktop */}
        <div className="absolute inset-0 bg-surface/85 lg:bg-transparent lg:bg-linear-to-r lg:from-surface lg:via-surface/70 lg:to-surface/10" />
        <div className="absolute inset-0 bg-linear-to-t from-surface via-transparent to-surface/40" />
      </div>
      <div className="absolute top-1/4 right-[8%] size-[420px] rounded-full blur-[110px]" style={{ background: `${a}33` }} />
      {/* the service, floating at the photo's corner */}
      <div className="absolute right-[5%] bottom-[14%] hidden items-center gap-3 rounded-[14px] border-[1.5px] bg-[#0b1220]/80 py-2.5 pr-5 pl-2.5 backdrop-blur-md lg:flex" style={{ borderColor: `${a}99`, boxShadow: `0 0 40px -8px ${a}aa, 0 30px 50px -18px rgb(0 0 0 / 0.85)` }}>
        <span className="grid size-11 place-items-center rounded-[11px]" style={{ background: `linear-gradient(135deg, ${a}, ${a}99)`, boxShadow: `0 0 20px ${a}88` }}>
          <Icon className="size-[22px] text-[#0b1220]" strokeWidth={2.25} />
        </span>
        <span>
          <span className="font-display block text-[20px] leading-tight font-semibold text-white">{look.label}</span>
          <span className="block text-[13.5px] font-medium" style={{ color: a }}>
            {look.caption}
          </span>
        </span>
      </div>
    </div>
  );
}
