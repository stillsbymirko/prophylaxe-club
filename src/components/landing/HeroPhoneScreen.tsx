import {
  formatGermanDate,
  getFullYearReminder,
  getHalfYearReminder,
} from "@/lib/date-logic";
import type { PracticeData } from "@/lib/practice-data";
import { CalendarDays, Download, Signal, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RefObject } from "react";

interface HeroPhoneScreenProps {
  practice: PracticeData;
  demoSelectSixMonths?: boolean;
  demoTapDownload?: boolean;
  optionRef?: RefObject<HTMLDivElement | null>;
  downloadButtonRef?: RefObject<HTMLDivElement | null>;
}

export function HeroPhoneScreen({
  practice,
  demoSelectSixMonths = false,
  demoTapDownload = false,
  optionRef,
  downloadButtonRef,
}: HeroPhoneScreenProps) {
  const halfYear = getHalfYearReminder();
  const fullYear = getFullYearReminder();

  return (
    <div className="flex h-full min-h-0 flex-col bg-white text-ink">
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

      <div className="border-b border-[var(--border)] px-4 py-3">
        <p className="truncate text-center text-[11px] font-semibold leading-tight">
          {practice.name}
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden px-3.5 pb-5 pt-3">
        <h2 className="font-display text-center text-[15px] leading-snug tracking-tight">
          Wann möchten Sie erinnert werden?
        </h2>
        <p className="mx-auto mt-1.5 max-w-[200px] text-center text-[9px] leading-relaxed text-ink-soft">
          Ein Tipp genügt — Kalendertermin sofort herunterladen.
        </p>

        <div className="mt-4 space-y-2.5">
          <PhoneReminderCard
            cardRef={optionRef}
            subtitle="6 Monate"
            title="In einem halben Jahr"
            date={halfYear.date}
            label={halfYear.label}
            highlighted
            demoSelected={demoSelectSixMonths}
            demoTapDownload={demoTapDownload}
            downloadButtonRef={downloadButtonRef}
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
  demoSelected = false,
  demoTapDownload = false,
  cardRef,
  downloadButtonRef,
}: {
  subtitle: string;
  title: string;
  date: Date;
  label: string;
  highlighted?: boolean;
  demoSelected?: boolean;
  demoTapDownload?: boolean;
  cardRef?: RefObject<HTMLDivElement | null>;
  downloadButtonRef?: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={cardRef}
      className={cn(
        highlighted
          ? "rounded-2xl border bg-white p-3 shadow-[0_4px_20px_rgba(26,111,189,0.1)]"
          : "rounded-2xl border border-[var(--border)] bg-white p-3 opacity-90",
        highlighted && "border-sage/20",
        demoSelected && "ring-2 ring-sage/45 ring-offset-1 ring-offset-white",
      )}
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
        <div
          ref={downloadButtonRef}
          className={cn(
            "mt-2 flex items-center justify-center gap-1 rounded-xl bg-sage py-2 text-[9px] font-medium text-white transition-transform duration-150",
            demoTapDownload && "scale-95 bg-sage-deep",
          )}
        >
          <Download className="h-3 w-3" />
          Kalendertermin herunterladen
        </div>
      )}
    </div>
  );
}
