"use client";

import { Footer } from "@/components/Footer";
import { PageShell, SiteHeader } from "@/components/PageShell";
import { Button } from "@/components/ui/Button";
import {
  formatGermanDate,
  getFullYearReminder,
  getHalfYearReminder,
  type ReminderInfo,
} from "@/lib/date-logic";
import { downloadIcsFile } from "@/lib/ics-generator";
import type { PracticeData } from "@/lib/practice-data";
import { CalendarCheck, Download, Smartphone } from "lucide-react";
import Link from "next/link";

interface CalendarSetupPageProps {
  practice: PracticeData;
  months: 6 | 12;
}

const iphoneSteps = [
  "Öffnen Sie die heruntergeladene Datei — meist in „Downloads“ oder über die Benachrichtigung.",
  "Tippen Sie auf „Hinzufügen“ oder „In Kalender speichern“.",
  "Prüfen Sie Datum und Uhrzeit und bestätigen Sie mit „Sicher“ oder „Hinzufügen“.",
  "Fertig — die Erinnerung erscheint in Ihrer Kalender-App.",
] as const;

const androidSteps = [
  "Öffnen Sie die Datei aus „Downloads“ oder der Download-Benachrichtigung.",
  "Wählen Sie Ihre Kalender-App (Google Kalender oder Samsung Kalender).",
  "Bestätigen Sie den Import — ggf. auf „Speichern“ oder „Hinzufügen“ tippen.",
  "Fertig — der Termin ist in Ihrem Kalender hinterlegt.",
] as const;

function getReminder(months: 6 | 12): ReminderInfo {
  return months === 6 ? getHalfYearReminder() : getFullYearReminder();
}

export function CalendarSetupPage({ practice, months }: CalendarSetupPageProps) {
  const reminder = getReminder(months);

  return (
    <PageShell>
      <SiteHeader practiceName={practice.name} compact />

      <main className="mx-auto w-full max-w-lg flex-1 px-5 py-8 sm:px-8 sm:py-12">
        <div className="animate-fade-up mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sage/10 text-sage">
            <CalendarCheck className="h-7 w-7" />
          </div>
          <h1 className="font-display text-2xl leading-tight tracking-tight text-ink sm:text-3xl">
            Termin in den Kalender legen
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
            Die Kalenderdatei wurde heruntergeladen. So fügen Sie die Erinnerung
            auf Ihrem Smartphone hinzu — dauert nur wenige Sekunden.
          </p>
        </div>

        <div className="animate-fade-up delay-1 mb-8 rounded-3xl border border-[var(--border)] bg-porcelain/50 p-5">
          <p className="text-xs font-medium tracking-widest text-gold uppercase">
            Ihr Termin
          </p>
          <p className="font-display mt-2 text-xl text-ink">
            Prophylaxe-Termin buchen
          </p>
          <p className="mt-1 text-sm text-ink-soft">{practice.name}</p>
          <p className="mt-3 text-sm font-medium text-ink">
            {formatGermanDate(reminder.date)} · 09:00 Uhr
          </p>
          <p className="mt-1 text-xs text-ink-soft">{reminder.label}</p>
        </div>

        <div className="animate-fade-up delay-2 space-y-5">
          <InstructionBlock
            icon={<Smartphone className="h-5 w-5" />}
            title="iPhone (Apple Kalender)"
            steps={iphoneSteps}
          />
          <InstructionBlock
            icon={<Smartphone className="h-5 w-5" />}
            title="Android (Google Kalender & andere)"
            steps={androidSteps}
          />
        </div>

        <div className="animate-fade-up delay-3 mt-8 space-y-3">
          <Button
            size="lg"
            className="w-full"
            onClick={() => downloadIcsFile(practice, reminder.date)}
          >
            <Download className="h-4 w-4" />
            Kalenderdatei erneut herunterladen
          </Button>
          <Link
            href={`/${practice.slug}`}
            className="flex h-12 w-full items-center justify-center rounded-2xl border border-[var(--border)] bg-surface text-sm font-medium text-ink-muted transition-colors hover:border-sage/25 hover:text-sage"
          >
            Andere Erinnerung wählen
          </Link>
        </div>

        <p className="animate-fade-in delay-4 mt-8 text-center text-xs leading-relaxed text-ink-soft">
          Keine App nötig · Keine Anmeldung · Mit Erinnerungsalarm
        </p>
      </main>

      <Footer />
    </PageShell>
  );
}

function InstructionBlock({
  icon,
  title,
  steps,
}: {
  icon: React.ReactNode;
  title: string;
  steps: readonly string[];
}) {
  return (
    <section className="rounded-3xl border border-[var(--border)] bg-surface p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sage/10 text-sage">
          {icon}
        </div>
        <h2 className="font-display text-lg text-ink">{title}</h2>
      </div>
      <ol className="space-y-3">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage/10 text-xs font-semibold text-sage">
              {index + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
