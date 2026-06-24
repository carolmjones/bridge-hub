import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Mobile-first app shell. Desktop shows a centred phone-width column.
 */
export function AppShell({ children, className = "" }: AppShellProps) {
  return (
    <div className="min-h-dvh bg-warm-paper">
      <div
        className={`mx-auto min-h-dvh w-full max-w-phone bg-cream md:my-6 md:min-h-[calc(100dvh-3rem)] md:rounded-shell md:border md:border-card-border md:shadow-shell ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
