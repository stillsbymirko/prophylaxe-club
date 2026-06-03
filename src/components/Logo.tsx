import { cn } from "@/lib/utils";

interface LogoMarkProps {
  className?: string;
}

/** Backenzahn: breite Krone oben, zwei getrennte Wurzeln unten */
export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 2C8.2 2 5.5 4.6 5.5 8.2c0 2 .7 3.6 1.15 5.1.4 1.3.65 2.6.55 4-.08.85-.3 1.65-.65 2.35-.4.8-.05 1.75.85 1.75.75 0 1.35-.55 1.55-1.35.45-1.25.7-2.55.85-3.85.15-1.35.45-2.45.95-3.15.45-.65.75-1.35.75-2.15 0-.35-.05-.7-.05-1.05V2H12z" />
      <path d="M12 2c3.8 0 6.5 2.6 6.5 6.2 0 2-.7 3.6-1.15 5.1-.4 1.3-.65 2.6-.55 4 .08.85.3 1.65.65 2.35.4.8.05 1.75-.85 1.75-.75 0-1.35.55-1.55 1.35-.45 1.25-.7 2.55-.85 3.85-.15 1.35-.45 2.45-.95 3.15-.45.65-.75 1.35-.75 2.15 0 .35.05.7.05 1.05V2H12z" />
      <path
        d="M8.75 7.25c1-.85 2.15-1.25 3.25-1.25s2.25.4 3.25 1.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}

interface LogoBadgeProps {
  className?: string;
  size?: "sm" | "md";
}

export function LogoBadge({ className, size = "md" }: LogoBadgeProps) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-sage shadow-[0_2px_12px_var(--sage-glow)]",
        size === "sm"
          ? "h-9 w-9 rounded-lg"
          : "h-10 w-10 sm:h-11 sm:w-11 sm:rounded-2xl",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
      <LogoMark
        className={cn(
          "relative text-white",
          size === "sm"
            ? "h-[19px] w-[19px]"
            : "h-[22px] w-[22px] sm:h-6 sm:w-6",
        )}
      />
    </div>
  );
}
