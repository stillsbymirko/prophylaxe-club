"use client";

import { useRouter } from "next/navigation";
import { Footer } from "@/components/Footer";
import { PageShell, SiteHeader } from "@/components/PageShell";
import {
  formatGermanDate,
  getFullYearReminder,
  getHalfYearReminder,
  getThreeMonthReminder,
  type ReminderInfo,
  type ReminderMonths,
} from "@/lib/date-logic";
import { downloadIcsFile } from "@/lib/ics-generator";
import type { PracticeData } from "@/lib/practice-data";
import { PzrSubsidyInfo } from "@/components/PzrSubsidyInfo";
import { CalendarDays, Clock, Download, Sparkles } from "lucide-react";

interface PatientPageProps {
  practice: PracticeData;
}

export function PatientPage({ practice }: PatientPageProps) {
  const router = useRouter();
  const threeMonths = getThreeMonthReminder();
  const halfYear = getHalfYearReminder();
  const fullYear = getFullYearReminder();

  const handleDownload = (months: ReminderMonths, date: Date) => {
    downloadIcsFile(practice, date);
    router.push(`/${practice.slug}/kalender?monate=${months}`);
  };

  return (
    <PageShell>
      <SiteHeader practiceName={practice.name} compact />

      <main className="mx-auto w-full max-w-lg flex-1 px-5 py-8 sm:px-8 sm:py-12">
        <div className="animate-fade-up mb-10 text-center">
          <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-gold-soft/50 bg-porcelain">
            <Sparkles className="h-4 w-4 text-gold" />
          </div>
          <h2 className="font-display text-2xl leading-tight tracking-tight text-ink sm:text-3xl">
            Wann möchten Sie für die Terminbuchung erinnert werden?
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
            Ein Tipp genügt — Ihr Kalendertermin wird sofort heruntergeladen.
            Keine Anmeldung, keine persönlichen Daten.
          </p>
        </div>

        <div className="animate-fade-up delay-2 space-y-4">
          <ReminderCard
            index={0}
            title="In 3 Monaten"
            subtitle="Erinnerung in 3 Monaten"
            reminder={threeMonths}
            onSelect={() => handleDownload(3, threeMonths.date)}
          />
          <ReminderCard
            index={1}
            title="In einem halben Jahr"
            subtitle="Erinnerung in 6 Monaten"
            reminder={halfYear}
            onSelect={() => handleDownload(6, halfYear.date)}
          />
          <ReminderCard
            index={2}
            title="Im nächsten Jahr"
            subtitle="Erinnerung in 12 Monaten"
            reminder={fullYear}
            onSelect={() => handleDownload(12, fullYear.date)}
          />
        </div>

        <div className="animate-fade-up delay-3 mt-10">
          <PzrSubsidyInfo />
        </div>

        <p className="animate-fade-in delay-4 mt-8 flex items-center justify-center gap-2 text-center text-xs text-ink-soft">
          <Download className="h-3.5 w-3.5 text-gold" />
          Mit Erinnerungsalarm für iPhone &amp; Android
        </p>
      </main>

      <Footer />
    </PageShell>
  );
}

function ReminderCard({
  index,
  title,
  subtitle,
  reminder,
  onSelect,
}: {
  index: number;
  title: string;
  subtitle: string;
  reminder: ReminderInfo;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group relative w-full overflow-hidden rounded-3xl border border-[var(--border)] bg-surface p-5 text-left shadow-[0_8px_32px_rgba(26,36,33,0.06)] transition-all duration-300 hover:border-sage/20 hover:shadow-[0_16px_48px_rgba(26,111,189,0.12)] active:scale-[0.99] sm:p-6"
      style={{ animationDelay: `${0.1 + index * 0.08}s` }}
    >
      <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-gold via-gold-soft to-transparent opacity-80 transition-opacity group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-4 pl-3">
        <div className="flex-1">
          <p className="text-xs font-medium tracking-widest text-gold uppercase">
            {subtitle}
          </p>
          <p className="font-display mt-1 text-xl text-ink sm:text-2xl">
            {title}
          </p>
          <p className="mt-1 text-sm text-ink-soft">{reminder.label}</p>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-porcelain text-sage transition-all duration-300 group-hover:bg-sage group-hover:text-cream group-hover:shadow-[0_4px_16px_var(--sage-glow)]">
          <CalendarDays className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2.5 rounded-2xl bg-porcelain/70 px-4 py-3 pl-3 text-sm text-ink-muted">
        <Clock className="h-4 w-4 shrink-0 text-sage" />
        <span>
          {formatGermanDate(reminder.date)} · 09:00 Uhr
        </span>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-sage py-3.5 text-sm font-medium text-cream transition-all duration-300 group-hover:bg-sage-deep">
        <Download className="h-4 w-4" />
        Kalendertermin herunterladen
      </div>
    </button>
  );
}
