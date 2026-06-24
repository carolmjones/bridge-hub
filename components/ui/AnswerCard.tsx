"use client";

type AnswerCardProps = {
  label: string;
  selected: boolean;
  dimmed: boolean;
  hoverTone?: string;
  onSelect: () => void;
};

export function AnswerCard({
  label,
  selected,
  dimmed,
  hoverTone,
  onSelect,
}: AnswerCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      style={
        !selected && hoverTone
          ? ({ ["--hover-tone" as string]: hoverTone } as React.CSSProperties)
          : undefined
      }
      className={`w-full rounded-card border px-4 py-[15px] text-left font-sans text-body transition-all duration-100 ${
        selected
          ? "scale-100 border-ink bg-ink text-warm-paper"
          : dimmed
            ? "border-line-stone/30 bg-white/35 text-soft-ink/50"
            : "border-line-stone/30 bg-white text-ink hover:bg-[var(--hover-tone,theme(colors.mist))] md:hover:bg-[var(--hover-tone,theme(colors.mist))]"
      }`}
    >
      {label}
    </button>
  );
}
