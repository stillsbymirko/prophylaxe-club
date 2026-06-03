import type { ReactNode } from "react";

interface LandingSectionProps {
  id?: string;
  label: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function LandingSection({
  id,
  label,
  title,
  description,
  children,
}: LandingSectionProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-8 max-w-2xl">
        <p className="text-xs font-medium tracking-widest text-gold uppercase">
          {label}
        </p>
        <h2 className="font-display mt-2 text-3xl tracking-tight text-ink sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-base leading-relaxed text-ink-muted">
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}
