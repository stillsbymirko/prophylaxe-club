import { LandingSection } from "./LandingSection";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Kostet Prophylaxe-Erinnerung etwas?",
    answer:
      "Der Link-Generator ist derzeit kostenlos nutzbar. Es entstehen keine versteckten Kosten für Ihre Praxis oder Ihre Patienten.",
  },
  {
    question: "Müssen sich Patienten registrieren?",
    answer:
      "Nein. Patienten scannen den QR-Code, tippen auf eine Option und laden die .ics-Datei herunter — ohne Anmeldung, ohne Formular, ohne App.",
  },
  {
    question: "Funktioniert das auf iPhone und Android?",
    answer:
      "Ja. Die generierte Kalenderdatei (.ics) wird von Apple Kalender, Google Kalender und den meisten anderen Kalender-Apps erkannt — inklusive Erinnerungsalarm (VALARM).",
  },
  {
    question: "Wie wird der Erinnerungstermin berechnet?",
    answer:
      "Das System kennt die Quartalslogik der Prophylaxe-Buchungen: Q1 (Jan–Mär) ab 1. Dez., Q2 (Apr–Jun) ab 1. Mär., Q3 (Jul–Sep) ab 1. Jun., Q4 (Okt–Dez) ab 1. Sep. Je nach Wahl (6 oder 12 Monate) wird der passende Buchungsstart automatisch ermittelt.",
  },
  {
    question: "Kann ich meinen Link später ändern?",
    answer:
      "Ja — mit Ihrem persönlichen Bearbeitungs-Link oder per E-Mail, die wir Ihnen bei der Erstellung zusenden. Ohne diesen Link kann niemand Ihre Praxisdaten überschreiben.",
  },
  {
    question: "Kann jemand meinen Slug übernehmen?",
    answer:
      'Nein. Ist ein Slug wie „denspoint" vergeben, kann nur der Inhaber des Bearbeitungs-Links die Daten ändern. Andere erhalten eine Fehlermeldung.',
  },
  {
    question: "Brauche ich technisches Wissen?",
    answer:
      "Nein. Formular ausfüllen, QR-Code speichern, ausdrucken — fertig. Keine Software-Installation, kein Login, kein IT-Support nötig.",
  },
  {
    question: "Werden Patientendaten gespeichert?",
    answer:
      "Nein. Es werden ausschließlich Praxis-Stammdaten (Name, Buchungs-URL, Telefon) gespeichert, damit Ihr Patienten-Link funktioniert. Kein Name, keine E-Mail, kein Telefon des Patienten.",
  },
];

export function LandingFAQ() {
  return (
    <LandingSection
      id="faq"
      label="FAQ"
      title="Häufige Fragen"
      description="Alles, was Zahnarztpraxen vor dem Start wissen möchten."
    >
      <div className="divide-y divide-[var(--border)] overflow-hidden rounded-3xl border border-[var(--border)] bg-surface">
        {faqs.map((faq, index) => (
          <details
            key={faq.question}
            className="group"
            open={index === 0}
          >
            <summary
              className={cn(
                "flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-medium text-ink transition-colors hover:bg-porcelain/40 sm:px-6 sm:py-5",
                "[&::-webkit-details-marker]:hidden",
              )}
            >
              <span>{faq.question}</span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-white text-sm text-sage transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="px-5 pb-4 text-sm leading-relaxed text-ink-soft sm:px-6 sm:pb-5">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </LandingSection>
  );
}
