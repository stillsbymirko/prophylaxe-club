import { FlyerPreview, FLYER_HEIGHT_PX, FLYER_WIDTH_PX } from "@/components/FlyerPreview";
import {
  getDefaultFlyerSettings,
  type PracticeData,
} from "@/lib/practice-data";
import { siteConfig } from "@/lib/site-config";
import { Check, Printer } from "lucide-react";
import { LandingSection } from "./LandingSection";

const examplePractice: PracticeData = {
  name: "Zahnärzte am Park",
  bookingUrl: "https://www.denspoint.de",
  phone: "030 3917644",
  slug: "denspoint",
};

const exampleFlyer = getDefaultFlyerSettings();
const examplePatientUrl = `${siteConfig.url}/${examplePractice.slug}`;

const highlights = [
  "Individueller QR-Code für Ihre Praxis",
  "Ihr Logo und anpassbare Texte",
  "DIN A4 — druckfertig als PNG",
  "Für Wartezimmer, Theke oder Aushang",
] as const;

const PREVIEW_WIDTH = 400;
const previewScale = PREVIEW_WIDTH / FLYER_WIDTH_PX;
const previewHeight = Math.round(FLYER_HEIGHT_PX * previewScale);

export function LandingFlyerExample() {
  return (
    <LandingSection
      id="flyer-beispiel"
      label="Druckmaterial"
      title="So sieht Ihr Flyer aus"
      description="Nach dem Erstellen erhalten Sie einen druckfertigen A4-Flyer mit QR-Code — passend fürs Wartezimmer, inklusive Ihrer Praxisdaten."
    >
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
        <div className="max-w-md">
          <ul className="space-y-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-ink-muted">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage/10 text-sage">
                  <Check className="h-3 w-3" strokeWidth={2.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-porcelain/50 px-4 py-3.5">
            <Printer className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
            <p className="text-sm leading-relaxed text-ink-soft">
              Einfach als PNG herunterladen und in Ihrer Praxis ausdrucken — kein
              Grafikprogramm nötig.
            </p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[440px] lg:mx-0 lg:justify-self-end">
          <p className="mb-4 text-center text-xs font-medium tracking-widest text-gold uppercase lg:text-left">
            Beispiel · DIN A4
          </p>
          <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-porcelain/40 p-4 shadow-[0_12px_48px_rgba(26,36,33,0.06)] sm:p-6">
            <div
              className="mx-auto overflow-hidden rounded-lg"
              style={{ width: "100%", maxWidth: PREVIEW_WIDTH, height: previewHeight }}
            >
              <div
                style={{
                  transform: `scale(${previewScale})`,
                  transformOrigin: "top left",
                  width: FLYER_WIDTH_PX,
                  height: FLYER_HEIGHT_PX,
                }}
              >
                <FlyerPreview
                  practice={examplePractice}
                  flyer={exampleFlyer}
                  patientUrl={examplePatientUrl}
                  className="shadow-[0_20px_60px_rgba(26,36,33,0.12)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingSection>
  );
}
