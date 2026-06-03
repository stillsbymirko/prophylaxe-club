import {
  formatGermanDate,
  getFullYearReminder,
  getHalfYearReminder,
} from "@/lib/date-logic";
import type { PracticeData } from "@/lib/practice-data";
import { CalendarDays, Download, Signal, Wifi } from "lucide-react";

interface HeroPhoneScreenProps {
  practice: PracticeData;
}

function LogoToothMini({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 2.25c-3.15 0-5.75 2.45-5.75 5.65 0 2.05.85 3.55 1.55 5.15.55 1.25 1.05 2.45 1.05 4.05 0 1.35-.45 2.75-.95 4.05-.25.7.35 1.35 1.1 1.35h5.1c.75 0 1.35-.65 1.1-1.35-.5-1.3-.95-2.7-.95-4.05 0-1.6.5-2.8 1.05-4.05.7-1.6 1.55-3.1 1.55-5.15 0-3.2-2.6-5.65-5.75-5.65Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function HeroPhoneScreen({ practice }: HeroPhoneScreenProps) {
  const halfYear = getHalfYearReminder();
  const fullYear = getFullYearReminder();

  return (
    <div className="flex h-full min-h-0 flex-col bg-white text-ink">
      {/* iOS status bar — island overlays center */}
      <div className="relative flex shrink-0 items-center justify-between px-5 pb-1 pt-[13px] text-[10px] font-semibold tracking-tight">
        <span className="w-[54px]">9:41</span>
        <span className="flex-1" aria-hidden />
        <div className="flex w-[54px] items-center justify-end gap-[3px] text-ink">
          <Signal className="h-[11px] w-[11px]" strokeWidth={2.5} />
          <Wifi className="h-[11px] w-[11px]" strokeWidth={2.5} />
          <div className="ml-0.5 h-[9px] w-[18px] rounded-[2.5px] border border-ink/85 p-px">
            <div className="h-full w-[72%] rounded-[1px] bg-ink/85" />
          </div>
        </div>
      </div>

      {/* App header */}
      <div className="flex items-center gap-2.5 border-b border-[var(--border)] px-4 py-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sage">
          <LogoToothMini className="h-3.5 w-3.5 text-white" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-[11px] font-semibold leading-tight">
            {practice.name}
          </p>
          <p className="text-[9px] text-ink-soft">Prophylaxe-Erinnerung</p>
        </div>
      </div>

      {/* Content */}
      <div className="min-h-0 flex-1 overflow-hidden px-3.5 pb-5 pt-3">
        <h2 className="font-display text-center text-[15px] leading-snug tracking-tight">
          Wann möchten Sie erinnert werden?
        </h2>
        <p className="mx-auto mt-1.5 max-w-[200px] text-center text-[9px] leading-relaxed text-ink-soft">
          Ein Tipp genügt — Kalendertermin sofort herunterladen.
        </p>

        <div className="mt-4 space-y-2.5">
          <PhoneReminderCard
            subtitle="6 Monate"
            title="In einem halben Jahr"
            date={halfYear.date}
            label={halfYear.label}
            highlighted
          />
          <PhoneReminderCard
            subtitle="12 Monate"
            title="Im nächsten Jahr"
            date={fullYear.date}
            label={fullYear.label}
          />
        </div>
      </div>
    </div>
  );
}

function PhoneReminderCard({
  subtitle,
  title,
  date,
  label,
  highlighted = false,
}: {
  subtitle: string;
  title: string;
  date: Date;
  label: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={
        highlighted
          ? "rounded-2xl border border-sage/20 bg-white p-3 shadow-[0_4px_20px_rgba(26,111,189,0.1)]"
          : "rounded-2xl border border-[var(--border)] bg-white p-3 opacity-90"
      }
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-[8px] font-semibold tracking-widest text-gold uppercase">
            {subtitle}
          </p>
          <p className="font-display mt-0.5 text-[13px] leading-tight text-ink">
            {title}
          </p>
          <p className="mt-0.5 truncate text-[9px] text-ink-soft">{label}</p>
        </div>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sage/10 text-sage">
          <CalendarDays className="h-3.5 w-3.5" />
        </div>
      </div>

      <div className="mt-2 rounded-xl bg-porcelain/60 px-2.5 py-1.5 text-[9px] text-ink-muted">
        {formatGermanDate(date)} · 09:00 Uhr
      </div>

      {highlighted && (
        <div className="mt-2 flex items-center justify-center gap-1 rounded-xl bg-sage py-2 text-[9px] font-medium text-white">
          <Download className="h-3 w-3" />
          Kalendertermin herunterladen
        </div>
      )}
    </div>
  );
}
