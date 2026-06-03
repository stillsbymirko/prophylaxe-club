import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, id, ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <div className="space-y-2">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium tracking-wide text-ink-muted"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "flex h-12 w-full rounded-2xl border border-[var(--border)] bg-surface px-4 py-2 text-sm text-ink shadow-[inset_0_1px_2px_rgba(26,36,33,0.04)] transition-all placeholder:text-ink-soft/60 focus:border-sage/40 focus:outline-none focus:ring-3 focus:ring-sage/10",
            className,
          )}
          {...props}
        />
        {hint && <p className="text-xs leading-relaxed text-ink-soft">{hint}</p>}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
