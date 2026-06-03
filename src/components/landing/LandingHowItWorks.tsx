import { LandingSection } from "./LandingSection";
import { Link2, Printer, Smartphone } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    icon: Link2,
    step: "01",
    title: "Link erstellen",
    description:
      "Praxisname, Buchungs-URL und Telefonnummer eingeben — Ihr individueller Patienten-Link und QR-Code werden sofort erzeugt.",
  },
  {
    icon: Printer,
    step: "02",
    title: "QR-Code ausdrucken",
    description:
      "QR-Code speichern und im Wartezimmer aufstellen — als Aushang, Aufsteller oder auf der Theke. Kein IT-Aufwand nötig.",
  },
  {
    icon: Smartphone,
    step: "03",
    title: "Patient tippt — fertig",
    description:
      "Patient scannt, wählt „in 6 Monaten“ oder „in 12 Monaten“ und lädt den Kalendertermin mit Erinnerungsalarm herunter.",
  },
];

export function LandingHowItWorks() {
  return (
    <LandingSection
      id="so-funktionierts"
      label="Ablauf"
      title="So funktioniert's"
      description="In drei Schritten von der Einrichtung bis zur Kalender-Erinnerung — für Ihre Praxis und Ihre Patienten."
    >
      <div className="grid gap-5 sm:grid-cols-3">
        {steps.map(({ icon: Icon, step, title, description }) => (
          <div
            key={step}
            className="group relative rounded-3xl border border-[var(--border)] bg-surface p-6 shadow-[0_4px_24px_rgba(26,36,33,0.04)] transition-shadow hover:shadow-[0_8px_32px_rgba(26,111,189,0.08)]"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage/10 text-sage transition-colors group-hover:bg-sage group-hover:text-cream">
                <Icon className="h-5 w-5" />
              </div>
              <span className="font-display text-2xl text-gold-soft/80">
                {step}
              </span>
            </div>
            <h3 className="font-display text-xl text-ink">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-start gap-4 rounded-3xl border border-dashed border-[var(--border)] bg-porcelain/40 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-ink">Als Patient ausprobieren</p>
          <p className="mt-1 text-sm text-ink-soft">
            Sehen Sie die Patienten-Ansicht live — ohne etwas einzurichten.
          </p>
        </div>
        <Link
          href="/praxis-mueller"
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-2xl border border-sage/20 bg-surface px-5 py-3 text-sm font-medium text-sage transition-colors hover:border-sage/40 hover:bg-sage hover:text-cream sm:w-auto sm:py-2.5"
        >
          Demo ansehen
        </Link>
      </div>
    </LandingSection>
  );
}
