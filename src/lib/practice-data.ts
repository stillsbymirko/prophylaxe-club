export interface FlyerSettings {
  headline: string;
  subline: string;
  instruction: string;
  privacyNote: string;
}

export interface PracticeData {
  name: string;
  bookingUrl: string;
  phone: string;
  slug: string;
  logoBase64?: string;
  flyer?: FlyerSettings;
}

export function getDefaultFlyerSettings(): FlyerSettings {
  return {
    headline: "Nächste Prophylaxe nicht vergessen",
    subline:
      "Ihre Erinnerung für die nächste Prophylaxe — in Sekunden im Kalender.",
    instruction:
      "Ohne App · Ohne Anmeldung · In wenigen Sekunden erledigt",
    privacyNote: "100 % anonym · Keine persönlichen Daten",
  };
}

export function resolveFlyerSettings(
  practice: PracticeData,
): FlyerSettings {
  const defaults = getDefaultFlyerSettings();
  return { ...defaults, ...practice.flyer };
}

export function buildPatientUrl(origin: string, data: PracticeData): string {
  return `${origin}/${data.slug}`;
}

export function buildMaterialUrl(
  origin: string,
  slug: string,
  token: string,
): string {
  return `${origin}/${slug}/material?token=${encodeURIComponent(token)}`;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[äÄ]/g, "ae")
    .replace(/[öÖ]/g, "oe")
    .replace(/[üÜ]/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const MAX_LOGO_BYTES = 500_000;

export function validateLogoFile(file: File): string | null {
  if (!file.type.startsWith("image/")) {
    return "Bitte laden Sie eine Bilddatei hoch (PNG, JPG, SVG).";
  }
  if (file.size > MAX_LOGO_BYTES) {
    return "Das Logo darf maximal 500 KB groß sein.";
  }
  return null;
}

export async function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
