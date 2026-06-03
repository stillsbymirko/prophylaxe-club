"use client";

import {
  pzrInsuranceDisclaimer,
  pzrInsuranceLastUpdated,
  pzrInsurancePreviewCount,
  pzrInsuranceSubsidies,
} from "@/lib/pzr-insurance-subsidies";
import { cn } from "@/lib/utils";
import { ChevronDown, ExternalLink, Lightbulb } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface PzrSubsidyInfoProps {
  variant?: "compact" | "full";
  className?: string;
}

export function PzrSubsidyInfo({
  variant = "compact",
  className,
}: PzrSubsidyInfoProps) {
  const [expanded, setExpanded] = useState(variant === "full");
  const preview = pzrInsuranceSubsidies.slice(0, pzrInsurancePreviewCount);
  const rest = pzrInsuranceSubsidies.slice(pzrInsurancePreviewCount);
  const visible =
    variant === "full" || expanded
      ? pzrInsuranceSubsidies
      : preview;

  return (
    <section
      className={cn(
        "rounded-3xl border border-[var(--border)] bg-porcelain/30",
        variant === "compact" ? "p-5 sm:p-6" : "p-6 sm:p-8",
        className,
      )}
      aria-labelledby="pzr-subsidy-heading"
    >
      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sage/10 text-sage">
          <Lightbulb className="h-5 w-5" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <h2
            id="pzr-subsidy-heading"
            className="font-display text-lg leading-snug text-ink sm:text-xl"
          >
            Tipp: PZR-Zuschuss bei Ihrer Krankenkasse?
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
            Viele gesetzliche Krankenkassen bezuschussen die professionelle
            Zahnreinigung (PZR) — oft einmal pro Jahr. Prüfen Sie, ob Ihre Kasse
            mitmacht.
          </p>
        </div>
      </div>

      <ul className="mt-5 space-y-2.5">
        {visible.map((insurer) => (
          <li key={insurer.id}>
            <a
              href={insurer.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between gap-3 rounded-2xl border border-[var(--border)] bg-white px-4 py-3 transition-colors hover:border-sage/25 hover:bg-sage/[0.03]"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-ink">{insurer.name}</p>
                <p className="mt-0.5 text-xs text-sage">{insurer.shortLabel}</p>
                {(variant === "full" || expanded) && (
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
                    {insurer.note}
                  </p>
                )}
              </div>
              <ExternalLink
                className="mt-0.5 h-4 w-4 shrink-0 text-ink-soft transition-colors group-hover:text-sage"
                aria-hidden
              />
            </a>
          </li>
        ))}
      </ul>

      {variant === "compact" && rest.length > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-2xl py-2 text-sm font-medium text-sage transition-colors hover:bg-sage/5"
          aria-expanded={expanded}
        >
          {expanded
            ? "Weniger anzeigen"
            : `${rest.length} weitere Krankenkasse${rest.length === 1 ? "" : "n"} anzeigen`}
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              expanded && "rotate-180",
            )}
          />
        </button>
      )}

      <p className="mt-4 text-xs leading-relaxed text-ink-soft">
        {pzrInsuranceDisclaimer}{" "}
        <span className="text-ink-soft/80">
          Stand: {pzrInsuranceLastUpdated}.
        </span>
      </p>

      {variant === "compact" && (
        <Link
          href="/pzr-zuschuss"
          className="mt-3 inline-flex text-sm font-medium text-sage underline underline-offset-2 decoration-sage/30 hover:text-sage-deep"
        >
          Alle Infos &amp; Hinweise
        </Link>
      )}
    </section>
  );
}
