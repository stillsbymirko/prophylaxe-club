import { Footer } from "@/components/Footer";
import { PzrSubsidyInfo } from "@/components/PzrSubsidyInfo";
import { PageShell, SiteHeader } from "@/components/PageShell";
import {
  pzrInsuranceDisclaimer,
  pzrInsuranceLastUpdated,
} from "@/lib/pzr-insurance-subsidies";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PZR-Zuschuss Krankenkassen",
  description:
    "Überblick: Welche Krankenkassen die professionelle Zahnreinigung (PZR) bezuschussen können — mit Links zu offiziellen Kassen-Informationen.",
};

export default function PzrZuschussPage() {
  return (
    <PageShell>
      <SiteHeader compact />

      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-8 sm:px-8 sm:py-12">
        <div className="animate-fade-up mb-8">
          <p className="text-xs font-medium tracking-widest text-gold uppercase">
            Patienten-Info
          </p>
          <h1 className="font-display mt-2 text-3xl tracking-tight text-ink sm:text-4xl">
            PZR-Zuschuss bei der Krankenkasse
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Die professionelle Zahnreinigung (PZR) ist in der Regel eine
            Privatleistung. Viele gesetzliche Krankenkassen bieten jedoch einen
            freiwilligen Zuschuss an — Betrag und Bedingungen unterscheiden sich.
          </p>
        </div>

        <PzrSubsidyInfo variant="full" className="animate-fade-up delay-1" />

        <div className="animate-fade-up delay-2 mt-8 space-y-4 rounded-3xl border border-[var(--border)] bg-white p-6 text-sm leading-relaxed text-ink-muted">
          <h2 className="font-display text-lg text-ink">Was Sie wissen sollten</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Die Rechnung kommt meist direkt von der Zahnarztpraxis — nicht über
              die Gesundheitskarte.
            </li>
            <li>
              Auf der Rechnung sollte „professionelle Zahnreinigung“ oder die
              GOZ-Nummer 1040 stehen (Beispiel{" "}
              <a
                href="https://www.tk.de/techniker/versicherung/tk-leistungen/zaehne/zahnvorsorge-und-bonusheft/zahlt-tk-professionelle-zahnreinigung-2002368"
                className="text-sage underline underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                TK
              </a>
              ).
            </li>
            <li>
              Erstattung beantragen Sie in der Regel über die App oder das
              Online-Portal Ihrer Krankenkasse.
            </li>
          </ul>
          <p className="text-xs text-ink-soft">
            {pzrInsuranceDisclaimer} Stand: {pzrInsuranceLastUpdated}.
          </p>
        </div>

        <p className="animate-fade-in delay-3 mt-8 text-center text-sm text-ink-soft">
          <Link href="/" className="text-sage hover:underline">
            Zur Startseite
          </Link>
        </p>
      </main>

      <Footer />
    </PageShell>
  );
}
