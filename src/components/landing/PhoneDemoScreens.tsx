"use client";

import { HeroCalendarAddSheet } from "@/components/landing/HeroCalendarAddSheet";
import { HeroCalendarScreen } from "@/components/landing/HeroCalendarScreen";
import { HeroCalendarSuccessScreen } from "@/components/landing/HeroCalendarSuccessScreen";
import { HeroPhoneScreen } from "@/components/landing/HeroPhoneScreen";
import type { PhoneDemoPhase } from "@/components/landing/usePhoneScreenDemo";
import type { PracticeData } from "@/lib/practice-data";
import { cn } from "@/lib/utils";
import type { RefObject } from "react";

interface PhoneDemoScreensProps {
  practice: PracticeData;
  phase: PhoneDemoPhase;
  tapActive: boolean;
  optionRef: RefObject<HTMLDivElement | null>;
  downloadButtonRef: RefObject<HTMLDivElement | null>;
  confirmButtonRef: RefObject<HTMLButtonElement | null>;
}

export function PhoneDemoScreens({
  practice,
  phase,
  tapActive,
  optionRef,
  downloadButtonRef,
  confirmButtonRef,
}: PhoneDemoScreensProps) {
  const showPatient =
    phase === null ||
    phase === "select" ||
    phase === "download" ||
    phase === "add-sheet";
  const showAddSheet = phase === "add-sheet";
  const showSuccess = phase === "success";
  const showCalendar = phase === "calendar";

  return (
    <div className="relative h-full min-h-0">
      <div
        className={cn(
          "absolute inset-0 transition-all duration-500 ease-out",
          showPatient && !showCalendar
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-[0.98] opacity-0",
        )}
      >
        <HeroPhoneScreen
          practice={practice}
          demoSelectSixMonths={phase === "select"}
          demoTapDownload={phase === "download" && tapActive}
          optionRef={optionRef}
          downloadButtonRef={downloadButtonRef}
        />
      </div>

      <div
        className={cn(
          "absolute inset-0 z-10 transition-all duration-500 ease-out",
          showAddSheet
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        <HeroCalendarAddSheet
          practice={practice}
          confirmButtonRef={confirmButtonRef}
          tapActive={tapActive}
        />
      </div>

      <div
        className={cn(
          "absolute inset-0 z-20 transition-all duration-500 ease-out",
          showSuccess
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-[1.02] opacity-0",
        )}
      >
        <HeroCalendarSuccessScreen practice={practice} />
      </div>

      <div
        className={cn(
          "absolute inset-0 z-30 transition-all duration-500 ease-out",
          showCalendar
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-[1.02] opacity-0",
        )}
      >
        <HeroCalendarScreen practice={practice} />
      </div>
    </div>
  );
}
