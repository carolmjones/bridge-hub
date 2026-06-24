import { SECTIONS } from "@/lib/data/sections";

type ProgressIndicatorProps = {
  currentSection: number;
  sectionProgress: number;
};

export function ProgressIndicator({
  currentSection,
  sectionProgress,
}: ProgressIndicatorProps) {
  const fillPercent =
    ((currentSection - 1 + sectionProgress) / SECTIONS.length) * 100;

  return (
    <div className="relative mt-3 h-2 w-full">
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line-stone/50" />
      <div
        className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-ink transition-all duration-300 ease-out"
        style={{ width: `${fillPercent}%` }}
      />
      <div className="relative flex justify-between">
        {SECTIONS.map((section) => {
          const isComplete = section.index < currentSection;
          const isActive = section.index === currentSection;
          return (
            <span
              key={section.index}
              className={`block h-[7px] w-[7px] rotate-45 transition-colors ${
                isComplete
                  ? "bg-ink"
                  : isActive
                    ? "border border-ink bg-warm-paper"
                    : "border border-line-stone/60 bg-transparent"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
