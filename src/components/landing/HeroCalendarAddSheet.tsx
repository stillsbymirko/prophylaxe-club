import { formatGermanDate, getHalfYearReminder } from "@/lib/date-logic";
import type { PracticeData } from "@/lib/practice-data";
import { Calendar, Signal, Wifi } from "lucide-react";
import type { RefObject } from "react";
import { cn } from "@/lib/utils";

interface HeroCalendarAddSheetProps {
  practice: PracticeData;
  confirmButtonRef?: RefObject<HTMLButtonElement | null>;
  tapActive?: boolean;
}

export function HeroCalendarAddSheet({
  practice,
  confirmButtonRef,
  tapActive = false,
}: HeroCalendarAddSheetProps) {
  const reminder = getHalfYearReminder();

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="relative flex shrink-0 items-center justify-between px-5 pb-1 pt-[13px] text-[10px] font-semibold tracking-tight text-white/90">
        <span className="w-[54px]">9:41</span>
        <span className="flex-1" aria-hidden />
        <div className="flex w-[54px] items-center justify-end gap-[3px]">
          <Signal className="h-[11px] w-[11px]" strokeWidth={2.5} />
          <Wifi className="h-[11px] w-[11px]" strokeWidth={2.5} />
        </div>
      </div>

      <div className="flex-1 bg-black/40" aria-hidden />

      <div className="shrink-0 rounded-t-[1.35rem] bg-[#f2f2f7] px-4 pb-5 pt-3 shadow-[0_-8px_32px_rgba(0,0,0,0.18)]">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-black/10" />

        <p className="text-center text-[11px] font-semibold text-ink">
          Termin zum Kalender hinzufügen?
        </p>

        <div className="mt-3 rounded-2xl bg-white p-3.5 shadow-sm">
          <div className="flex items-start gap-2.5">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sage/10 text-sage">
              <Calendar className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-semibold leading-snug text-ink">
                Prophylaxe-Termin buchen
              </p>
              <p className="mt-0.5 text-[10px] text-ink-soft">{practice.name}</p>
              <p className="mt-1.5 text-[10px] text-ink-muted">
                {formatGermanDate(reminder.date)} · 09:00 Uhr
              </p>
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-white py-2.5 text-center text-[11px] font-medium text-ink-soft">
            Abbrechen
          </div>
          <button
            ref={confirmButtonRef}
            type="button"
            className={cn(
              "rounded-xl bg-sage py-2.5 text-center text-[11px] font-semibold text-white transition-transform duration-150",
              tapActive && "scale-95 bg-sage-deep",
            )}
          >
            Hinzufügen
          </button>
        </div>
      </div>
    </div>
  );
}
