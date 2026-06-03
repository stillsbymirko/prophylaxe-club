import Link from "next/link";
import { LandingSection } from "./LandingSection";
import { ShieldCheck, ShieldOff, ShieldQuestion } from "lucide-react";

const notStored = [
  "Name des Patienten",
  "E-Mail-Adresse",
  "Telefonnummer des Patienten",
  "Geburtsdatum oder Patienten-ID",
  "Gesundheitsdaten jeder Art",
];

const stored = [
  "Praxisname",
  "Buchungs-URL Ihrer Praxis",
  "Telefonnummer der Praxis",
  "Individueller Slug (z. B. „praxis-mueller“)",
];

export function LandingPrivacy() {
  return (
    <LandingSection
      id="datenschutz-info"
      label="Datenschutz"
      title="DSGVO-konform & datensparsam"
      description="Wir verarbeiten bewusst so wenig wie möglich. Patienten bleiben anonym — der Kalendertermin entsteht direkt im Browser."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-[var(--border)] bg-surface p-6 sm:p-7">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage/10">
              <ShieldOff className="h-5 w-5 text-sage" />
            </div>
            <h3 className="font-display text-xl text-ink">
              Keine Patientendaten
            </h3>
          </div>
          <ul className="space-y-2.5">
            {notStored.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm text-ink-muted"
              >
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 rounded-2xl bg-porcelain/60 px-4 py-3 text-sm leading-relaxed text-ink-soft">
            Die .ics-Datei wird{" "}
            <strong className="font-medium text-ink">im Browser des Patienten</strong>{" "}
            erzeugt — nichts wird an uns übermittelt.
          </p>
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-surface p-6 sm:p-7">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10">
              <ShieldQuestion className="h-5 w-5 text-gold" />
            </div>
            <h3 className="font-display text-xl text-ink">
              Praxis-Stammdaten
            </h3>
          </div>
          <ul className="space-y-2.5">
            {stored.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm text-ink-muted"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-ink-soft">
            Diese Angaben sind in der Regel ohnehin öffentlich (Website,
            Impressum) und dienen ausschließlich der Patienten-Ansicht Ihres
            Links.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4 rounded-2xl border border-sage/15 bg-sage/5 px-5 py-4">
        <ShieldCheck className="h-5 w-5 shrink-0 text-sage" />
        <p className="flex-1 text-sm text-ink-muted">
          Hosting in der EU · Keine Tracking-Cookies · Auftragsverarbeitung mit
          Vercel &amp; Upstash
        </p>
        <Link
          href="/datenschutz"
          className="text-sm font-medium text-sage underline underline-offset-2 decoration-gold-soft hover:text-sage-deep"
        >
          Vollständige Datenschutzerklärung
        </Link>
      </div>
    </LandingSection>
  );
}
