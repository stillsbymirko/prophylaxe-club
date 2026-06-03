"use client";

import { Badge } from "@/components/PageShell";
import { HeroVisual } from "@/components/landing/HeroVisual";
import { LandingTrustPills } from "@/components/landing/LandingTrustPills";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Shield } from "lucide-react";

interface LandingHeroProps {
  onStart: () => void;
}

export function LandingHero({ onStart }: LandingHeroProps) {
  return (
    <section className="relative overflow-x-clip border-b border-[var(--border)]">
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

        <div className="animate-fade-up delay-2 relative flex justify-center lg:justify-end">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
