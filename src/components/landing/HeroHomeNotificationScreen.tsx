import { formatGermanDate, getHalfYearReminder } from "@/lib/date-logic";
import type { PracticeData } from "@/lib/practice-data";
import { Calendar, Signal, Wifi } from "lucide-react";

interface HeroHomeNotificationScreenProps {
  practice: PracticeData;
}

const homeIcons = [
  "bg-green-500",
  "bg-blue-500",
  "bg-orange-400",
  "bg-sky-400",
  "bg-pink-500",
  "bg-purple-500",
  "bg-amber-400",
  "bg-teal-500",
  "bg-red-500",
  "bg-indigo-500",
  "bg-lime-500",
  "bg-rose-400",
] as const;

export function HeroHomeNotificationScreen({
  practice,
}: HeroHomeNotificationScreenProps) {
  const reminder = getHalfYearReminder();
  const reminderTime = `${String(reminder.date.getHours()).padStart(2, "0")}:00`;

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#5b8def] via-[#7eb8e8] to-[#b8d4f0]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(26,111,189,0.25),transparent_50%)]"
        aria-hidden
      />

      <div className="relative flex shrink-0 items-center justify-between px-5 pb-1 pt-[13px] text-[10px] font-semibold tracking-tight text-white">
        <span className="w-[54px]">{reminderTime}</span>
        <span className="flex-1" aria-hidden />
        <div className="flex w-[54px] items-center justify-end gap-[3px]">
          <Signal className="h-[11px] w-[11px]" strokeWidth={2.5} />
          <Wifi className="h-[11px] w-[11px]" strokeWidth={2.5} />
          <div className="ml-0.5 h-[9px] w-[18px] rounded-[2.5px] border border-white/90 p-px">
            <div className="h-full w-[72%] rounded-[1px] bg-white/90" />
          </div>
        </div>
      </div>

      <div className="relative z-10 px-3 pt-2">
        <div className="demo-notification-drop rounded-2xl border border-white/25 bg-white/75 p-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-xl">
          <div className="flex items-start gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-white shadow-sm">
              <Calendar className="h-4 w-4 text-red-500" strokeWidth={2.25} />
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[9px] font-semibold uppercase tracking-wide text-ink-soft">
                  Kalender
                </p>
                <p className="shrink-0 text-[9px] text-ink-soft">jetzt</p>
              </div>
              <p className="mt-0.5 text-[11px] font-semibold leading-snug text-ink">
                Erinnerung: Prophylaxe-Termin buchen!
              </p>
              <p className="mt-0.5 truncate text-[10px] text-ink-muted">
                {formatGermanDate(reminder.date)} · {reminderTime} ·{" "}
                {practice.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col justify-end px-5 pb-14 pt-6">
        <div className="grid grid-cols-4 gap-x-3.5 gap-y-4">
          {homeIcons.map((color, index) => (
            <div key={color} className="flex flex-col items-center gap-1">
              <div
                className={`h-[42px] w-[42px] rounded-[11px] ${color} shadow-[0_4px_12px_rgba(0,0,0,0.15)]`}
                style={{ opacity: 0.92 - (index % 3) * 0.08 }}
              />
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-center gap-2">
          <div className="h-[3px] w-[3px] rounded-full bg-white/70" />
          <div className="h-[3px] w-3 rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
}
