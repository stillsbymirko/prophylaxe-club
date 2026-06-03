"use client";

import { HeroPhoneScreen } from "@/components/landing/HeroPhoneScreen";
import { PhoneMockup } from "@/components/PhoneMockup";
import type { PracticeData } from "@/lib/practice-data";
import { CalendarCheck, QrCode } from "lucide-react";

const heroPractice: PracticeData = {
  name: "Praxis Müller",
  bookingUrl: "https://www.praxis-mueller.de",
  phone: "030 123 4567",
  address: "Musterstr. 12, 12345 Musterstadt",
  slug: "praxis-mueller",
};

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[540px] lg:max-w-none">
      <div className="absolute -left-2 top-12 z-10 hidden items-center gap-2 rounded-2xl border border-[var(--border)] bg-white px-3.5 py-2.5 shadow-[0_8px_32px_rgba(26,111,189,0.1)] sm:flex lg:-left-8 lg:top-16">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sage/10">
          <QrCode className="h-4 w-4 text-sage" aria-hidden />
        </div>
        <div>
          <p className="text-[11px] font-medium tracking-wide text-ink-soft uppercase">
            QR-Code
          </p>
          <p className="text-xs font-medium text-ink">Scan &amp; fertig</p>
        </div>
      </div>

      <div className="absolute -right-2 bottom-20 z-10 hidden items-center gap-2 rounded-2xl border border-[var(--border)] bg-white px-3.5 py-2.5 shadow-[0_8px_32px_rgba(26,111,189,0.1)] sm:flex lg:-right-6 lg:bottom-24">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sage/10">
          <CalendarCheck className="h-4 w-4 text-sage" aria-hidden />
        </div>
        <div>
          <p className="text-[11px] font-medium tracking-wide text-ink-soft uppercase">
            Kalender
          </p>
          <p className="text-xs font-medium text-ink">Mit Erinnerung</p>
        </div>
      </div>

      <p className="mb-4 text-center text-xs font-medium tracking-widest text-gold uppercase lg:mb-5">
        So sehen es Ihre Patienten
      </p>

      <div className="relative flex justify-center">
        <div className="relative rotate-[2deg] transition-transform duration-500 hover:rotate-0">
          <div
            className="pointer-events-none absolute inset-x-8 -bottom-4 h-12 rounded-full bg-sage/15 blur-2xl"
            aria-hidden
          />
          <PhoneMockup size="md" className="sm:hidden">
            <HeroPhoneScreen practice={heroPractice} />
          </PhoneMockup>
          <PhoneMockup size="lg" className="hidden sm:block">
            <HeroPhoneScreen practice={heroPractice} />
          </PhoneMockup>
        </div>
      </div>
    </div>
  );
}
