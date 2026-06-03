"use client";

import type { PracticeData } from "@/lib/practice-data";
import {
  formatGermanDate,
  getFullYearReminder,
  getHalfYearReminder,
} from "@/lib/date-logic";
import { Calendar, Eye, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

interface PracticePreviewProps {
  data: PracticeData;
}

export function PracticePreview({ data }: PracticePreviewProps) {
  const hasName = data.name.trim().length > 0;
  const halfYear = getHalfYearReminder();
  const fullYear = getFullYearReminder();

  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -top-2 -right-2 h-full w-full rounded-3xl border border-[var(--border)] bg-porcelain/30 sm:-top-3 sm:-right-3"
        aria-hidden
      />

      <Card className="relative">
        <div className="border-b border-[var(--border)] bg-porcelain/40 px-6 py-4">
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest text-sage uppercase">
            <Eye className="h-3.5 w-3.5 text-gold" />
            Live-Vorschau
          </div>
        </div>

        <CardHeader className="border-b border-[var(--border)]">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage/10 ring-1 ring-sage/15">
              <span className="font-display text-xl text-sage" aria-hidden>
                P
              </span>
            </div>
            <div>
              <CardTitle className="text-lg sm:text-xl">
                {hasName ? data.name : "Ihre Praxis"}
              </CardTitle>
              <p className="text-sm text-ink-soft">Patienten-Ansicht</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-5 pt-6">
          <p className="font-display text-base leading-snug text-ink">
            Wann möchten Sie erinnert werden?
          </p>

          <div className="space-y-3">
            <PreviewOption
              label="6 Monate"
              title="In einem halben Jahr"
              subtitle={`${formatGermanDate(halfYear.date)} · ${halfYear.label}`}
            />
            <PreviewOption
              label="12 Monate"
              title="Im nächsten Jahr"
              subtitle={`${formatGermanDate(fullYear.date)} · ${fullYear.label}`}
            />
          </div>

          {(data.bookingUrl || data.phone) && (
            <div className="mt-2 space-y-2.5 rounded-2xl border border-[var(--border)] bg-porcelain/50 p-4 text-xs text-ink-soft">
              {data.bookingUrl && (
                <div className="flex items-center gap-2.5">
                  <Calendar className="h-3.5 w-3.5 shrink-0 text-gold" />
                  <span className="truncate">{data.bookingUrl}</span>
                </div>
              )}
              {data.phone && (
                <div className="flex items-center gap-2.5">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-gold" />
                  <span>{data.phone}</span>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function PreviewOption({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex gap-3 rounded-2xl border border-[var(--border)] bg-porcelain/30 p-4 opacity-80">
      <span className="shrink-0 rounded-lg bg-sage/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-sage uppercase">
        {label}
      </span>
      <div>
        <p className="font-medium text-ink">{title}</p>
        <p className="mt-0.5 text-xs text-ink-soft">{subtitle}</p>
      </div>
    </div>
  );
}
