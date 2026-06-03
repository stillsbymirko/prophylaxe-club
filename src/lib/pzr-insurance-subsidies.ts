import { siteConfig } from "./site-config";

export interface PzrInsuranceSubsidy {
  id: string;
  name: string;
  shortLabel: string;
  note: string;
  sourceUrl: string;
  lastVerified: string;
}

/** Stand März 2026 — Leistungen variieren; immer offizielle Kassen-Seite prüfen. */
export const pzrInsuranceDisclaimer =
  "Keine Rechts- oder Versicherungsberatung. Zuschüsse sind freiwillige Satzungsleistungen und können sich ändern. Bitte erkundigen Sie sich vor dem Termin bei Ihrer Krankenkasse.";

export const pzrInsuranceLastUpdated = "2026-03";

export const pzrInsuranceSubsidies: PzrInsuranceSubsidy[] = [
  {
    id: "tk",
    name: "Techniker Krankenkasse (TK)",
    shortLabel: "bis 40 € pro Jahr",
    note: "Ab 18 Jahren, einmal pro Kalenderjahr, in der Zahnarztpraxis (GOZ 1040).",
    sourceUrl:
      "https://www.tk.de/techniker/versicherung/tk-leistungen/zaehne/zahnvorsorge-und-bonusheft/zahlt-tk-professionelle-zahnreinigung-2002368",
    lastVerified: "2026-01",
  },
  {
    id: "dak",
    name: "DAK-Gesundheit",
    shortLabel: "Zuschuss möglich",
    note: "Erstattung über Satzungsleistung — Betrag und Bedingungen bei der DAK prüfen.",
    sourceUrl:
      "https://www.dak.de/dak/leistungen/zahnersatz-zahngesundheit/zahngesundheit-1004168.html",
    lastVerified: "2026-03",
  },
  {
    id: "barmer",
    name: "Barmer",
    shortLabel: "Zuschuss möglich",
    note: "Oft über Bonusprogramm oder Zusatzleistungen — Voraussetzungen bei Barmer prüfen.",
    sourceUrl:
      "https://www.barmer.de/unsere-leistungen/leistungen-a-z/zahngesundheit/servicewelt-zahn",
    lastVerified: "2026-03",
  },
  {
    id: "aok",
    name: "AOK (regional)",
    shortLabel: "Zuschuss möglich",
    note: "Leistungen unterscheiden sich je nach AOK-Bundesland — bei Ihrer AOK nachfragen.",
    sourceUrl:
      "https://www.aok.de/pk/leistungen/zahngesundheit/professionelle-zahnreinigung-client-nds/",
    lastVerified: "2026-01",
  },
  {
    id: "hkk",
    name: "hkk Krankenkasse",
    shortLabel: "Zuschuss möglich",
    note: "Teils über Vertragszahnärzte oder Satzungsleistung — Details bei hkk prüfen.",
    sourceUrl:
      "https://www.hkk.de/leistungen-a-z/zahngesundheit/professionelle-zahnreinigung",
    lastVerified: "2026-03",
  },
  {
    id: "ikk",
    name: "IKK classic",
    shortLabel: "Zuschuss möglich",
    note: "Freiwillige Zusatzleistung — Bedingungen und Höhe bei IKK classic erfragen.",
    sourceUrl:
      "https://www.ikk-classic.de/leistungen-a-z/zahngesundheit",
    lastVerified: "2026-03",
  },
];

export const pzrInsurancePreviewCount = 3;

export function getPzrSubsidyInfoUrl(origin?: string): string {
  const base = origin ?? siteConfig.url;
  return `${base.replace(/\/$/, "")}/pzr-zuschuss`;
}
