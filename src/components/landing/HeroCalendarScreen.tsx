import { formatGermanDate, getHalfYearReminder } from "@/lib/date-logic";
import type { PracticeData } from "@/lib/practice-data";
import { Bell, Calendar, ChevronLeft, MapPin, Signal, Wifi } from "lucide-react";
import type { ReactNode } from "react";

interface HeroCalendarScreenProps {
  practice: PracticeData;
}

export function HeroCalendarScreen({ practice }: HeroCalendarScreenProps) {
  const reminder = getHalfYearReminder();
  const endHour = reminder.date.getHours() + 1;
  const timeRange = `${String(reminder.date.getHours()).padStart(2, "0")}:00 – ${String(endHour).padStart(2, "0")}:00`;

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#f2f2f7] text-ink">
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

      <div className="flex items-center gap-1 border-b border-black/5 bg-[#f2f2f7] px-3 py-2">
        <ChevronLeft className="h-4 w-4 text-sage" aria-hidden />
        <span className="text-[11px] font-medium text-sage">Kalender</span>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden px-3.5 pb-5 pt-3">
        <div className="animate-fade-in rounded-2xl bg-white p-3.5 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
          <div className="flex items-start gap-2.5">
            <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-sage" />
            <div className="min-w-0 flex-1">
              <p className="font-display text-[14px] leading-snug text-ink">
                Prophylaxe-Termin buchen
              </p>
              <p className="mt-0.5 text-[10px] text-ink-soft">{practice.name}</p>
            </div>
          </div>

          <div className="mt-3 space-y-2 border-t border-[var(--border)] pt-3">
            <CalendarRow
              icon={<Calendar className="h-3.5 w-3.5 text-sage" />}
              label={formatGermanDate(reminder.date)}
              detail={timeRange}
            />
            {practice.address && (
              <CalendarRow
                icon={<MapPin className="h-3.5 w-3.5 text-sage" />}
                label="Ort"
                detail={practice.address}
              />
            )}
            <CalendarRow
              icon={<Bell className="h-3.5 w-3.5 text-sage" />}
              label="Erinnerung"
              detail="Zum Zeitpunkt des Termins"
            />
          </div>

          <div className="mt-3 rounded-xl bg-porcelain/70 px-2.5 py-2">
            <p className="text-[8px] font-semibold tracking-wide text-ink-soft uppercase">
              Notiz
            </p>
            <p className="mt-1 text-[9px] leading-relaxed text-ink-muted">
              Termine freigeschaltet — jetzt online buchen unter{" "}
              <span className="text-sage">{practice.bookingUrl.replace(/^https?:\/\//, "")}</span>
            </p>
          </div>
        </div>

        <div className="animate-fade-up delay-1 mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-sage/10 px-3 py-2">
          <Calendar className="h-3.5 w-3.5 text-sage" />
          <p className="text-[10px] font-medium text-sage">
            Im Kalender gespeichert
          </p>
        </div>
      </div>
    </div>
  );
}

function CalendarRow({
  icon,
  label,
  detail,
}: {
  icon: ReactNode;
  label: string;
  detail: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-sage/10">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-medium text-ink">{label}</p>
        <p className="text-[9px] text-ink-soft">{detail}</p>
      </div>
    </div>
  );
}
