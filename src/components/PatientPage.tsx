"use client";

import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/Card";
import {
  formatGermanDate,
  getFullYearReminder,
  getHalfYearReminder,
} from "@/lib/date-logic";
import { downloadIcsFile } from "@/lib/ics-generator";
import type { PracticeData } from "@/lib/practice-data";
import { CalendarDays, Clock, Download } from "lucide-react";

interface PatientPageProps {
  practice: PracticeData;
}

export function PatientPage({ practice }: PatientPageProps) {
  const halfYear = getHalfYearReminder();
  const fullYear = getFullYearReminder();

  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-6 sm:px-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-100 text-teal-700">
            <span className="text-2xl" aria-hidden>
              🦷
            </span>
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight text-slate-900 sm:text-xl">
              {practice.name}
            </h1>
            <p className="text-sm text-slate-500">Prophylaxe-Erinnerung</p>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-8 text-center">
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            Wann möchten Sie an Ihre nächste Prophylaxe erinnert werden?
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Tippen Sie auf eine Option — Ihr Kalendertermin wird sofort
            heruntergeladen. Keine Anmeldung, keine persönlichen Daten.
          </p>
        </div>

        <div className="space-y-4">
          <ReminderCard
            title="In einem halben Jahr erinnern"
            reminder={halfYear}
            onSelect={() => downloadIcsFile(practice, halfYear.date)}
          />
          <ReminderCard
            title="Im nächsten Jahr erinnern"
            reminder={fullYear}
            onSelect={() => downloadIcsFile(practice, fullYear.date)}
          />
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-slate-400">
          <Download className="h-3.5 w-3.5" />
          Die .ics-Datei öffnet sich in Ihrem Kalender mit Erinnerungsalarm
        </p>
      </main>

      <Footer />
    </div>
  );
}

function ReminderCard({
  title,
  reminder,
  onSelect,
}: {
  title: string;
  reminder: ReturnType<typeof getHalfYearReminder>;
  onSelect: () => void;
}) {
  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-md">
      <CardContent className="p-0">
        <button
          type="button"
          onClick={onSelect}
          className="flex w-full flex-col items-start gap-4 p-5 text-left transition-colors hover:bg-teal-50/50 active:bg-teal-50 sm:p-6"
        >
          <div className="flex w-full items-start justify-between gap-3">
            <div>
              <p className="text-base font-semibold text-slate-900 sm:text-lg">
                {title}
              </p>
              <p className="mt-1 text-sm text-slate-500">{reminder.label}</p>
            </div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700 transition-colors group-hover:bg-teal-600 group-hover:text-white">
              <CalendarDays className="h-5 w-5" />
            </div>
          </div>

          <div className="flex w-full items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5 text-sm text-slate-600">
            <Clock className="h-4 w-4 shrink-0 text-teal-600" />
            <span>
              Erinnerung am{" "}
              <strong className="font-medium text-slate-800">
                {formatGermanDate(reminder.date)}
              </strong>{" "}
              um 09:00 Uhr
            </span>
          </div>

          <span className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-3 text-sm font-medium text-white transition-colors group-hover:bg-teal-700 sm:hidden">
            <Download className="h-4 w-4" />
            Kalendertermin herunterladen
          </span>
        </button>
      </CardContent>
    </Card>
  );
}
