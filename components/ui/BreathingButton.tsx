"use client";

type BreathingButtonProps = {
  onClick: () => void;
  className?: string;
};

export function BreathingButton({ onClick, className = "" }: BreathingButtonProps) {
  return (
    <button
      type="button"
      aria-label="Take a breath"
      onClick={onClick}
      className={`flex h-8 w-8 items-center justify-center rounded-full border border-line-stone/60 bg-cream text-soft-ink transition-colors hover:bg-mist ${className}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 4c-2 4-6 5-6 10a6 6 0 1 0 12 0c0-5-4-6-6-10Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
