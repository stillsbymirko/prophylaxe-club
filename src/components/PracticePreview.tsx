"use client";

import { HeroPhoneScreen } from "@/components/landing/HeroPhoneScreen";
import { PhoneMockup } from "@/components/PhoneMockup";
import type { PracticeData } from "@/lib/practice-data";

interface PracticePreviewProps {
  data: PracticeData;
}

export function PracticePreview({ data }: PracticePreviewProps) {
  const practice: PracticeData = {
    ...data,
    name: data.name.trim() || "Ihre Praxis",
  };

  return (
    <div className="relative flex flex-col items-center">
      <p className="mb-4 text-center text-xs font-medium tracking-widest text-gold uppercase lg:mb-5">
        Live-Vorschau
      </p>

      <div className="relative">
        <div
          className="pointer-events-none absolute inset-x-8 -bottom-4 h-12 rounded-full bg-sage/15 blur-2xl"
          aria-hidden
        />
        <PhoneMockup size="md" className="sm:hidden">
          <HeroPhoneScreen practice={practice} />
        </PhoneMockup>
        <PhoneMockup size="lg" className="hidden sm:block">
          <HeroPhoneScreen practice={practice} />
        </PhoneMockup>
      </div>
    </div>
  );
}
