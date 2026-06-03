export interface PracticeData {
  name: string;
  bookingUrl: string;
  phone: string;
  slug: string;
}

export function buildPatientUrl(origin: string, data: PracticeData): string {
  return `${origin}/${data.slug}`;
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
