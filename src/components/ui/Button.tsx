import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "gold";
  size?: "default" | "sm" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-sage text-cream shadow-[0_4px_16px_var(--sage-glow)] hover:bg-sage-deep hover:shadow-[0_6px_24px_var(--sage-glow)] active:scale-[0.98]":
              variant === "default",
            "border border-[var(--border)] bg-surface text-ink hover:border-sage/25 hover:bg-porcelain/50 active:scale-[0.98]":
              variant === "outline",
            "text-ink-muted hover:bg-porcelain/60 hover:text-ink": variant === "ghost",
            "bg-gold text-surface shadow-[0_4px_16px_rgba(184,146,95,0.25)] hover:brightness-105 active:scale-[0.98]":
              variant === "gold",
            "h-10 px-4 py-2 text-sm": size === "default",
            "h-9 px-3 text-sm": size === "sm",
            "h-13 min-h-[3.25rem] px-7 text-base": size === "lg",
          },
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
