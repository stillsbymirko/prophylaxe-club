"use client";

import { Badge } from "@/components/PageShell";
import { PhoneMockup } from "@/components/PhoneMockup";
import { HeroPhoneScreen } from "@/components/landing/HeroPhoneScreen";
import { LandingTrustPills } from "@/components/landing/LandingTrustPills";
import { Button } from "@/components/ui/Button";
import type { PracticeData } from "@/lib/practice-data";
import { ArrowRight, CalendarCheck, QrCode, Shield } from "lucide-react";

const heroPreviewData: PracticeData = {
  name: "Zahnärzte am Park",
  bookingUrl: "https://ihre-praxis.de",
  phone: "030 123 4567",
  slug: "ihre-praxis",
};

interface LandingHeroProps {
  onStart: () => void;
}

export function LandingHero({ onStart }: LandingHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)]">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sage/[0.07] via-white to-white"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-40 right-0 h-[32rem] w-[32rem] rounded-full bg-sage/[0.08] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-gold/[0.05] blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 sm:py-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-14 lg:py-16 xl:py-[4.5rem]">
        {/* Copy */}
        <div className="animate-fade-up max-w-xl lg:max-w-none">
          <Badge>
            <Shield className="h-3.5 w-3.5 text-gold" />
            Für Zahnarztpraxen
          </Badge>

          <h1 className="font-display mt-5 text-[2rem] leading-[1.1] tracking-tight text-ink sm:text-[2.65rem] lg:text-[2.85rem] xl:text-[3.15rem]">
            Nie wieder Prophylaxe vergessen, weil{" "}
            <span className="text-sage">deine Zähne wichtig sind!</span>
          </h1>

          <p className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">
            Helfen Sie Ihren Patienten, rechtzeitig an die nächste Prophylaxe
            zu denken — mit einem QR-Code fürs Wartezimmer. Kalendertermin in
            Sekunden, ohne App und ohne persönliche Daten.
          </p>

          <LandingTrustPills />

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" className="group" onClick={onStart}>
              Kostenlos Link erstellen
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() =>
                document
                  .getElementById("so-funktionierts")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              So funktioniert&apos;s
            </Button>
          </div>
        </div>

        {/* Phone mockup */}
        <div className="animate-fade-up delay-2 relative flex justify-center lg:justify-end">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative">
      {/* Floating badges — hidden on very small screens to avoid overlap */}
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

      <div className="relative rotate-[2deg] transition-transform duration-500 hover:rotate-0">
        <div
          className="pointer-events-none absolute inset-x-8 -bottom-4 h-12 rounded-full bg-sage/15 blur-2xl"
          aria-hidden
        />
        <PhoneMockup size="md" className="sm:hidden">
          <HeroPhoneScreen practice={heroPreviewData} />
        </PhoneMockup>
        <PhoneMockup size="lg" className="hidden sm:block">
          <HeroPhoneScreen practice={heroPreviewData} />
        </PhoneMockup>
      </div>
    </div>
  );
}
