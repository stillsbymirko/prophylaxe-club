"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Footer } from "@/components/Footer";
import { LandingFAQ } from "@/components/landing/LandingFAQ";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingHowItWorks } from "@/components/landing/LandingHowItWorks";
import { LandingPrivacy } from "@/components/landing/LandingPrivacy";
import { PracticePreview } from "@/components/PracticePreview";
import { PageShell, SiteHeader } from "@/components/PageShell";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { slugify, type PracticeData } from "@/lib/practice-data";
import { ArrowRight, ChevronDown } from "lucide-react";

const defaultData: PracticeData = {
  name: "",
  bookingUrl: "",
  phone: "",
  slug: "",
};

function scrollToGenerator() {
  document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" });
}

export function DashboardPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<PracticeData>(defaultData);
  const [ownerEmail, setOwnerEmail] = useState("");
  const [errors, setErrors] = useState<
    Partial<Record<keyof PracticeData | "ownerEmail", string>>
  >({});
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
    const nextErrors: Partial<
      Record<keyof PracticeData | "ownerEmail", string>
    > = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Bitte geben Sie den Praxisnamen ein.";
    }
    if (!formData.bookingUrl.trim()) {
      nextErrors.bookingUrl = "Bitte geben Sie die Buchungs-URL ein.";
    } else if (!/^https?:\/\/.+/.test(formData.bookingUrl.trim())) {
      nextErrors.bookingUrl =
        "Bitte geben Sie eine gültige URL ein (https://…).";
    }
    if (!formData.phone.trim()) {
      nextErrors.phone = "Bitte geben Sie die Telefonnummer ein.";
    }
    if (!formData.slug.trim()) {
      nextErrors.slug = "Bitte wählen Sie eine Kurz-Adresse.";
    } else if (!/^[a-z0-9-]+$/.test(formData.slug.trim())) {
      nextErrors.slug = "Nur Kleinbuchstaben, Zahlen und Bindestriche erlaubt.";
    }
    if (
      ownerEmail.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ownerEmail.trim())
    ) {
      nextErrors.ownerEmail = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
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
        body: JSON.stringify({
          ...data,
          ownerEmail: ownerEmail.trim() || undefined,
          sendEditLinkEmail: Boolean(ownerEmail.trim()),
        }),
      });

      if (!response.ok) {
        const body = (await response.json()) as { error?: string };
        setSaveError(body.error ?? "Speichern fehlgeschlagen.");
        return;
      }

      const body = (await response.json()) as {
        materialUrl?: string;
        editToken?: string;
      };

      const materialPath =
        body.materialUrl ??
        (body.editToken
          ? `/${data.slug}/material?token=${encodeURIComponent(body.editToken)}`
          : `/${data.slug}/material`);

      router.push(materialPath);
    } catch {
      setSaveError("Verbindungsfehler. Bitte erneut versuchen.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <PageShell>
      <SiteHeader />

      <LandingHero onStart={scrollToGenerator} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 pb-28 pt-10 sm:px-8 sm:pb-14 sm:pt-12">
        <div className="animate-fade-up mb-8 lg:hidden">
          <PracticePreview data={formData} />
          <p className="mt-3 flex items-center justify-center gap-1 text-xs text-ink-soft">
            <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
            Aktualisiert sich beim Tippen
          </p>
        </div>

        {/* Form + Preview */}
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
          <section
            id="generator"
            className="animate-fade-up delay-1 scroll-mt-28 lg:delay-2"
          >
            <div className="relative rounded-3xl border border-[var(--border)] bg-surface p-5 shadow-[0_12px_48px_rgba(26,36,33,0.08)] sm:p-7 lg:shadow-[0_16px_56px_rgba(26,36,33,0.1)]">
              <div className="absolute top-0 left-6 h-px w-16 bg-gradient-to-r from-gold to-transparent sm:left-7" />

              <div className="mb-5 sm:mb-6">
                <p className="text-xs font-medium tracking-widest text-gold uppercase">
                  Los geht&apos;s
                </p>
                <h2 className="font-display mt-1 text-xl text-ink sm:text-2xl">
                  Ihre Praxisdaten
                </h2>
                <p className="mt-1 text-sm text-ink-soft">
                  Danach erhalten Sie Link, QR-Code und Flyer.
                </p>
              </div>

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
                    placeholder="Zahnärzte Ladeweg & Kollegen"
                    autoComplete="organization"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-700/80">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Input
                      label="Buchungs-URL"
                      name="bookingUrl"
                      type="url"
                      inputMode="url"
                      placeholder="https://www.denspoint.de"
                      autoComplete="url"
                      value={formData.bookingUrl}
                      onChange={(e) =>
                        updateField("bookingUrl", e.target.value)
                      }
                    />
                    {errors.bookingUrl && (
                      <p className="mt-1.5 text-xs text-red-700/80">
                        {errors.bookingUrl}
                      </p>
                    )}
                  </div>
                  <div>
                    <Input
                      label="Telefonnummer"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      placeholder="030 3917644"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-red-700/80">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Input
                    label="Kurz-Adresse Ihrer Praxis"
                    name="slug"
                    placeholder="denspoint"
                    hint="prophylaxeerinnerung.de/denspoint"
                    value={formData.slug}
                    onChange={(e) =>
                      updateField("slug", slugify(e.target.value))
                    }
                  />
                  {errors.slug && (
                    <p className="mt-1.5 text-xs text-red-700/80">
                      {errors.slug}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    label="E-Mail (für Ihren Bearbeitungs-Link)"
                    name="ownerEmail"
                    type="email"
                    inputMode="email"
                    placeholder="praxis@beispiel.de"
                    hint="Optional — Link zum späteren Bearbeiten."
                    autoComplete="email"
                    value={ownerEmail}
                    onChange={(e) => {
                      setOwnerEmail(e.target.value);
                      setErrors((prev) => ({
                        ...prev,
                        ownerEmail: undefined,
                      }));
                    }}
                  />
                  {errors.ownerEmail && (
                    <p className="mt-1.5 text-xs text-red-700/80">
                      {errors.ownerEmail}
                    </p>
                  )}
                </div>

                {saveError && (
                  <p className="rounded-2xl border border-red-200/60 bg-red-50/80 px-4 py-3 text-sm text-red-800">
                    {saveError}
                  </p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="group w-full"
                  disabled={isSaving}
                >
                  {isSaving ? "Wird erstellt…" : "Link & QR-Code erstellen"}
                  {!isSaving && (
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  )}
                </Button>

                <p className="text-center text-xs leading-relaxed text-ink-soft">
                  Kostenlos · Keine Patientendaten · DSGVO-konform
                </p>
              </form>
            </div>
          </section>

          <aside className="animate-fade-up delay-2 hidden lg:block lg:delay-3">
            <div className="sticky top-24">
              <PracticePreview data={formData} />
              <p className="mt-3 flex items-center justify-center gap-1 text-xs text-ink-soft">
                <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
                Aktualisiert sich beim Tippen
              </p>
            </div>
          </aside>
        </div>

        {/* Marketing */}
        <div className="mt-16 space-y-16 border-t border-[var(--border)] pt-16 sm:mt-24 sm:space-y-24 sm:pt-24">
          <LandingHowItWorks />
          <LandingPrivacy />
          <LandingFAQ />
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--border)] bg-white/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-md sm:hidden">
        <Button size="lg" className="w-full" onClick={scrollToGenerator}>
          Kostenlos Link erstellen
        </Button>
      </div>

      <Footer />
    </PageShell>
  );
}
