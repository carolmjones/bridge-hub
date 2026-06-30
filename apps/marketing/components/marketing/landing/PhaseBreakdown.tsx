const PHASES = [
  {
    label: "Phase 1 — Weeks 1 and 2",
    title: "Understanding your nervous system profile",
    items: [
      "Make sense of what your Bridge Map revealed",
      "Understand why your body has been responding this way",
      "See clearly why this was never a discipline problem",
    ],
  },
  {
    label: "Phase 2 — Weeks 3 and 4",
    title: "Building the foundation",
    items: [
      "Start working with your nervous system, not against it",
      "Small, consistent shifts your body can actually hold",
      "Build safety before pressure",
    ],
  },
  {
    label: "Phase 3 — Weeks 5 and 6",
    title: "Deepening capacity",
    items: [
      "Apply what is working, adjust what is not",
      "Go deeper into the patterns that need most attention",
      "Build momentum that does not collapse",
    ],
  },
  {
    label: "Phase 4 — Weeks 7 and 8",
    title: "Integration",
    items: [
      "Take everything into your real life and your goals",
      "Feel progress where before you only felt stuck",
      "This is where the wall comes down",
    ],
  },
] as const;

export function PhaseBreakdown() {
  return (
    <section className="border-t border-line-stone bg-warm-paper py-[72px]">
      <div className="mx-auto max-w-[680px] px-6">
        <p className="mb-3 font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-sage">
          How the 8 weeks unfolds
        </p>
        <h2 className="mb-9 font-serif text-[clamp(28px,6vw,34px)] font-normal text-ink">
          Your transformation, phase by phase
        </h2>

        <div>
          {PHASES.map((phase) => (
            <div
              key={phase.label}
              className="border-b border-line-stone py-6"
            >
              <p className="mb-2 font-sans text-[10px] font-medium uppercase tracking-[0.12em] text-glow-sage">
                {phase.label}
              </p>
              <h3 className="mb-3 font-serif text-xl font-normal text-ink">
                {phase.title}
              </h3>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-stone"
                      aria-hidden
                    />
                    <span className="font-sans text-[13px] leading-[1.55] text-soft-ink">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-6 font-sans text-xs italic leading-[1.6] text-sage">
          This is a guide, not a fixed path. Every client moves through this
          work differently, and that is by design. You are not a programme to be
          completed. You are a person to be met.
        </p>
      </div>
    </section>
  );
}
