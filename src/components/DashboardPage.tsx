"use client";

import { useState } from "react";
import { Footer } from "@/components/Footer";
import { PracticePreview } from "@/components/PracticePreview";
import { QRCodeDisplay } from "@/components/QRCodeDisplay";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  buildPatientUrl,
  slugify,
  type PracticeData,
} from "@/lib/practice-data";
import { Link2, Sparkles } from "lucide-react";

const defaultData: PracticeData = {
  name: "",
  bookingUrl: "",
  phone: "",
  slug: "",
};

export function DashboardPage() {
  const [formData, setFormData] = useState<PracticeData>(defaultData);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof PracticeData, string>>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const updateField = (field: keyof PracticeData, value: string) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "name" && !prev.slug) {
        next.slug = slugify(value);
      }
      return next;
    });
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof PracticeData, string>> = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Bitte geben Sie den Praxisnamen ein.";
    }
    if (!formData.bookingUrl.trim()) {
      nextErrors.bookingUrl = "Bitte geben Sie die Buchungs-URL ein.";
    } else if (!/^https?:\/\/.+/.test(formData.bookingUrl.trim())) {
      nextErrors.bookingUrl = "Bitte geben Sie eine gültige URL ein (https://…).";
    }
    if (!formData.phone.trim()) {
      nextErrors.phone = "Bitte geben Sie die Telefonnummer ein.";
    }
    if (!formData.slug.trim()) {
      nextErrors.slug = "Bitte geben Sie einen Slug ein.";
    } else if (!/^[a-z0-9-]+$/.test(formData.slug.trim())) {
      nextErrors.slug = "Nur Kleinbuchstaben, Zahlen und Bindestriche erlaubt.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleGenerate = async () => {
    if (!validate()) return;

    const data: PracticeData = {
      name: formData.name.trim(),
      bookingUrl: formData.bookingUrl.trim(),
      phone: formData.phone.trim(),
      slug: formData.slug.trim(),
    };

    setIsSaving(true);
    setSaveError(null);

    try {
      const response = await fetch("/api/practices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const body = (await response.json()) as { error?: string };
        setSaveError(body.error ?? "Speichern fehlgeschlagen.");
        return;
      }

      setGeneratedUrl(buildPatientUrl(window.location.origin, data));
    } catch {
      setSaveError("Verbindungsfehler. Bitte erneut versuchen.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-5 sm:px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm">
            <span className="text-lg" aria-hidden>
              🦷
            </span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-900 sm:text-xl">
              Prophylaxe-Erinnerung
            </h1>
            <p className="text-sm text-slate-500">
              Link-Generator für Zahnarztpraxen
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8 max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
            <Sparkles className="h-3.5 w-3.5" />
            100&nbsp;% anonym · Keine Patientendaten
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Erstellen Sie Ihren Patienten-Link
          </h2>
          <p className="mt-2 text-slate-600">
            Generieren Sie einen individuellen QR-Code für Ihre Praxis. Patienten
            können direkt einen Kalendertermin für ihre Prophylaxe-Erinnerung
            herunterladen — ohne persönliche Daten.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="space-y-6">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <h3 className="mb-5 flex items-center gap-2 text-base font-semibold text-slate-900">
                <Link2 className="h-5 w-5 text-teal-600" />
                Praxisdaten
              </h3>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleGenerate();
                }}
              >
                <div>
                  <Input
                    label="Praxisname"
                    name="name"
                    placeholder='z. B. "Zahnärzte Ladeweg & Kollegen"'
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <Input
                    label="Buchungs-URL"
                    name="bookingUrl"
                    type="url"
                    placeholder="https://www.denspoint.de"
                    value={formData.bookingUrl}
                    onChange={(e) => updateField("bookingUrl", e.target.value)}
                  />
                  {errors.bookingUrl && (
                    <p className="mt-1 text-xs text-red-600">{errors.bookingUrl}</p>
                  )}
                </div>

                <div>
                  <Input
                    label="Telefonnummer"
                    name="phone"
                    type="tel"
                    placeholder="030.3917644"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <Input
                    label="Individueller Slug"
                    name="slug"
                    placeholder="denspoint"
                    hint="Wird Teil der URL: prophylaxeerinnerung.de/denspoint"
                    value={formData.slug}
                    onChange={(e) =>
                      updateField("slug", slugify(e.target.value))
                    }
                  />
                  {errors.slug && (
                    <p className="mt-1 text-xs text-red-600">{errors.slug}</p>
                  )}
                </div>

                {saveError && (
                  <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
                    {saveError}
                  </p>
                )}

                <Button type="submit" size="lg" className="w-full" disabled={isSaving}>
                  {isSaving ? "Wird gespeichert…" : "Link generieren"}
                </Button>
              </form>
            </div>

            {generatedUrl && <QRCodeDisplay url={generatedUrl} />}
          </section>

          <section>
            <PracticePreview data={formData} />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
