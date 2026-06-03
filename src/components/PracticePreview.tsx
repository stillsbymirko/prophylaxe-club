"use client";

import type { PracticeData } from "@/lib/practice-data";
import {
  formatGermanDate,
  getFullYearReminder,
  getHalfYearReminder,
} from "@/lib/date-logic";
import { Calendar, Phone, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

interface PracticePreviewProps {
  data: PracticeData;
}

export function PracticePreview({ data }: PracticePreviewProps) {
  const hasName = data.name.trim().length > 0;
  const halfYear = getHalfYearReminder();
  const fullYear = getFullYearReminder();

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-slate-100 bg-gradient-to-br from-teal-50 to-slate-50 px-6 py-4">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-teal-700">
          <Sparkles className="h-3.5 w-3.5" />
          Live-Vorschau
        </div>
      </div>

      <CardHeader className="border-b border-slate-100 bg-white">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
            <span className="text-xl" aria-hidden>
              🦷
            </span>
          </div>
          <div>
            <CardTitle className="text-base sm:text-lg">
              {hasName ? data.name : "Ihre Praxis"}
            </CardTitle>
            <p className="text-sm text-slate-500">Prophylaxe-Erinnerung</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-5">
        <p className="text-sm font-medium text-slate-700">
          Wann möchten Sie an Ihre nächste Prophylaxe erinnert werden?
        </p>

        <div className="space-y-3">
          <PreviewOption
            title="In einem halben Jahr erinnern"
            subtitle={`Erinnerung am ${formatGermanDate(halfYear.date)} · ${halfYear.label}`}
          />
          <PreviewOption
            title="Im nächsten Jahr erinnern"
            subtitle={`Erinnerung am ${formatGermanDate(fullYear.date)} · ${fullYear.label}`}
          />
        </div>

        {(data.bookingUrl || data.phone) && (
          <div className="mt-4 space-y-2 rounded-xl bg-slate-50 p-4 text-xs text-slate-500">
            {data.bookingUrl && (
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{data.bookingUrl}</span>
              </div>
            )}
            {data.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 shrink-0" />
                <span>{data.phone}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function PreviewOption({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 opacity-75">
      <p className="font-medium text-slate-800">{title}</p>
      <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
    </div>
  );
}
