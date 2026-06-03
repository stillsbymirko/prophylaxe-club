import { formatGermanDate, getHalfYearReminder } from "@/lib/date-logic";
import type { PracticeData } from "@/lib/practice-data";
import { Check, Signal, Wifi } from "lucide-react";

interface HeroCalendarSuccessScreenProps {
  practice: PracticeData;
}

export function HeroCalendarSuccessScreen({
  practice,
}: HeroCalendarSuccessScreenProps) {
  const reminder = getHalfYearReminder();

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

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-6 pb-10 text-center">
        <div className="animate-scale-in flex h-16 w-16 items-center justify-center rounded-full bg-sage/10">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sage text-white shadow-[0_8px_24px_rgba(26,111,189,0.28)]">
            <Check className="h-6 w-6" strokeWidth={2.5} />
          </div>
        </div>

        <h3 className="font-display animate-fade-up delay-1 mt-5 text-[17px] leading-snug text-ink">
          Termin gespeichert
        </h3>
        <p className="animate-fade-up delay-2 mt-2 max-w-[220px] text-[10px] leading-relaxed text-ink-soft">
          Ihre Prophylaxe-Erinnerung für{" "}
          <span className="font-medium text-ink">
            {formatGermanDate(reminder.date)}
          </span>{" "}
          wurde im Kalender eingetragen.
        </p>
        <p className="animate-fade-up delay-3 mt-3 text-[9px] text-ink-soft">
          {practice.name}
        </p>
      </div>
    </div>
  );
}
