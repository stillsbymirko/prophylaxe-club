"use client";

import { formatGermanDate } from "@/lib/date-logic";
import type { PracticeData } from "@/lib/practice-data";
import { Button } from "@/components/ui/Button";
import { CalendarCheck, X } from "lucide-react";

interface CalendarDownloadSuccessProps {
  practice: PracticeData;
  date: Date;
  onClose: () => void;
}

export function CalendarDownloadSuccess({
  practice,
  date,
  onClose,
}: CalendarDownloadSuccessProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="calendar-success-title"
      onClick={onClose}
    >
      <div
        className="animate-scale-in w-full max-w-md rounded-3xl bg-white p-6 shadow-[0_24px_64px_rgba(26,36,33,0.18)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sage/10 text-sage">
            <CalendarCheck className="h-6 w-6" />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] text-ink-soft"
            aria-label="Schließen"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <h2
          id="calendar-success-title"
          className="font-display mt-5 text-2xl leading-tight text-ink"
        >
          Termin gespeichert
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          Ihre Prophylaxe-Erinnerung für{" "}
          <span className="font-medium text-ink">
            {formatGermanDate(date)} · 09:00 Uhr
          </span>{" "}
          wurde heruntergeladen. Öffnen Sie die Datei, um sie in Ihren Kalender
          zu übernehmen.
        </p>
        <p className="mt-3 text-xs text-ink-soft">{practice.name}</p>

        <Button size="lg" className="mt-6 w-full" onClick={onClose}>
          Verstanden
        </Button>
      </div>
    </div>
  );
}
