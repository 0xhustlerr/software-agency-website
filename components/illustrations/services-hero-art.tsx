import { ScaledCanvas } from "@/components/motion/scaled-canvas";

/** Discovery brief → prototype → production, joined by the node connector. Concept illustration with sample data. */
export function ServicesHeroArt() {
  return (
    <figure className="m-0" aria-label="Product concept illustration: a discovery brief, a prototype and a production dashboard, connected in sequence.">
      <ScaledCanvas width={560} height={420}>
        <div aria-hidden className="absolute inset-0">
          <svg className="absolute inset-0" width="560" height="420" viewBox="0 0 560 420" fill="none">
            <path d="M120 152V196H200M330 272V312H420" className="stroke-accent-ink" strokeWidth="1.25" />
            <circle cx="120" cy="152" r="3.5" className="fill-surface stroke-accent-ink" strokeWidth="1.25" />
            <circle cx="200" cy="196" r="4.5" className="fill-accent" />
            <circle cx="330" cy="272" r="3.5" className="fill-surface stroke-accent-ink" strokeWidth="1.25" />
            <circle cx="420" cy="312" r="4.5" className="fill-accent" />
          </svg>
          <div className="absolute top-0 left-0 w-[230px] rounded-md border border-line bg-surface-raised p-3.5 shadow-frame">
            <div className="flex items-center justify-between font-mono text-[10px] text-ink-muted">
              <span>discovery / brief</span>
              <span className="rounded-xs bg-accent-soft px-1.5 py-0.5 font-sans text-[9px] font-medium text-accent-ink">Stage 1</span>
            </div>
            <ol className="relative mt-3 grid gap-2">
              <span className="absolute top-2 bottom-2 left-[5px] w-px bg-line-strong/60" />
              {[
                ["Users and their job", "who, and what they need done"],
                ["Smallest testable version", "must · next · later"],
                ["Risks and approach", "what to prove first"],
              ].map(([t, m], i) => (
                <li key={t} className="relative flex items-start gap-3">
                  <span className={i === 2 ? "mt-0.5 size-[11px] shrink-0 rounded-full border border-accent bg-accent" : "mt-0.5 size-[11px] shrink-0 rounded-full border border-accent-ink bg-surface-raised"} />
                  <div>
                    <p className="text-[11px] leading-tight font-medium text-ink">{t}</p>
                    <p className="text-[9.5px] text-ink-muted">{m}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="absolute top-[168px] left-[200px] w-[250px] overflow-hidden rounded-md border border-line bg-surface-muted shadow-frame">
            <div className="flex h-8 items-center gap-2 border-b border-line px-3">
              <span className="flex gap-1.5"><i className="size-2 rounded-full bg-line" /><i className="size-2 rounded-full bg-line" /><i className="size-2 rounded-full bg-line" /></span>
              <span className="mx-auto rounded-xs bg-surface px-4 py-0.5 font-mono text-[10px] text-ink-muted">prototype</span>
            </div>
            <div className="grid gap-2 p-3">
              <div className="h-2.5 w-[55%] rounded-xs bg-line" />
              <div className="grid grid-cols-2 gap-2">
                <div className="h-11 rounded-sm border border-dashed border-line-strong" />
                <div className="h-11 rounded-sm border border-dashed border-line-strong" />
              </div>
              <div className="h-2 w-[80%] rounded-xs bg-line" />
              <div className="h-6.5 w-[40%] rounded-sm bg-accent" />
            </div>
          </div>
          <div className="absolute top-[284px] left-[300px] w-[260px] overflow-hidden rounded-md border border-line bg-surface-muted shadow-frame">
            <div className="flex h-8 items-center gap-2 border-b border-line px-3">
              <span className="flex gap-1.5"><i className="size-2 rounded-full bg-line" /><i className="size-2 rounded-full bg-line" /><i className="size-2 rounded-full bg-line" /></span>
              <span className="mx-auto rounded-xs bg-surface px-4 py-0.5 font-mono text-[10px] text-ink-muted">production</span>
            </div>
            <div className="grid grid-cols-3 gap-2 p-2.5">
              {[
                ["Active users", "1.2k"],
                ["Uptime", "OK"],
                ["Deploys", "Daily"],
              ].map(([l, v]) => (
                <div key={l} className="rounded-sm border border-line bg-surface px-2.5 py-2">
                  <p className="truncate text-[10px] text-ink-muted">{l}</p>
                  <p className="font-display mt-1 text-[17px] leading-none font-semibold tracking-[-0.02em] text-ink">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScaledCanvas>
      <figcaption className="mt-4 flex justify-end">
        <span className="rounded-xs border border-dashed border-line-strong px-2 text-[11px] leading-5 font-semibold tracking-[0.08em] text-ink-muted uppercase">
          Product concept illustration
        </span>
      </figcaption>
    </figure>
  );
}
