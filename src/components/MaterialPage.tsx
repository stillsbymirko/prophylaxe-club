"use client";

import { useRef, useState, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Footer } from "@/components/Footer";
import { FlyerPreview } from "@/components/FlyerPreview";
import { Badge, PageShell, SiteHeader } from "@/components/PageShell";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { exportElementAsPng, exportQrSvgAsPng } from "@/lib/export-image";
import {
  buildMaterialUrl,
  buildPatientUrl,
  readFileAsBase64,
  resolveFlyerSettings,
  validateLogoFile,
  type FlyerSettings,
  type PracticeData,
} from "@/lib/practice-data";
import {
  ArrowLeft,
  Check,
  Download,
  ImagePlus,
  Loader2,
  Printer,
  QrCode,
  Save,
  Trash2,
  ExternalLink,
  Copy,
  KeyRound,
  Mail,
} from "lucide-react";
import Link from "next/link";

interface MaterialPageProps {
  practice: PracticeData;
  editToken: string;
  ownerEmail?: string;
  siteOrigin: string;
}

export function MaterialPage({
  practice: initialPractice,
  editToken,
  ownerEmail: initialOwnerEmail,
  siteOrigin,
}: MaterialPageProps) {
  const [practice, setPractice] = useState<PracticeData>(initialPractice);
  const [flyer, setFlyer] = useState<FlyerSettings>(
    resolveFlyerSettings(initialPractice),
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null);
  const [isExportingFlyer, setIsExportingFlyer] = useState(false);
  const [editLinkCopied, setEditLinkCopied] = useState(false);
  const [emailInput, setEmailInput] = useState(initialOwnerEmail ?? "");
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailMessage, setEmailMessage] = useState<string | null>(null);

  const qrRef = useRef<HTMLDivElement>(null);
  const flyerRef = useRef<HTMLDivElement>(null);

  const patientUrl = buildPatientUrl(siteOrigin, practice);
  const editUrl = buildMaterialUrl(siteOrigin, practice.slug, editToken);

  const copyEditLink = async () => {
    if (!editUrl) return;
    await navigator.clipboard.writeText(editUrl);
    setEditLinkCopied(true);
    setTimeout(() => setEditLinkCopied(false), 2500);
  };

  const sendEditLinkByEmail = async () => {
    if (!emailInput.trim()) {
      setEmailMessage("Bitte E-Mail-Adresse eingeben.");
      return;
    }

    setIsSendingEmail(true);
    setEmailMessage(null);

    try {
      const res = await fetch("/api/practices/send-edit-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: practice.slug,
          editToken,
          email: emailInput.trim(),
        }),
      });

      const body = (await res.json()) as { error?: string; email?: string };

      if (!res.ok) {
        setEmailMessage(body.error ?? "E-Mail konnte nicht gesendet werden.");
        return;
      }

      setEmailMessage(`E-Mail gesendet an ${body.email ?? emailInput}.`);
    } catch {
      setEmailMessage("Verbindungsfehler.");
    } finally {
      setIsSendingEmail(false);
    }
  };

  const updateFlyer = (field: keyof FlyerSettings, value: string) => {
    setFlyer((prev) => ({ ...prev, [field]: value }));
    setSaveMessage(null);
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateLogoFile(file);
    if (error) {
      setLogoError(error);
      return;
    }

    setLogoError(null);
    const base64 = await readFileAsBase64(file);
    setPractice((prev) => ({ ...prev, logoBase64: base64 }));
    setSaveMessage(null);
  };

  const removeLogo = () => {
    setPractice((prev) => {
      const next = { ...prev };
      delete next.logoBase64;
      return next;
    });
  };

  const saveAll = useCallback(async () => {
    setIsSaving(true);
    setSaveMessage(null);

    try {
      const payload = {
        ...practice,
        flyer,
        editToken,
      };

      const res = await fetch("/api/practices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = (await res.json()) as { error?: string };
        setSaveMessage(body.error ?? "Speichern fehlgeschlagen.");
        return;
      }

      setPractice(payload);
      setSaveMessage("Gespeichert!");
      setTimeout(() => setSaveMessage(null), 3000);
    } catch {
      setSaveMessage("Verbindungsfehler.");
    } finally {
      setIsSaving(false);
    }
  }, [practice, flyer, editToken]);

  const downloadQrPng = async () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;
    await exportQrSvgAsPng(svg, `qr-${practice.slug}.png`, 1024);
  };

  const downloadFlyerPng = async () => {
    if (!flyerRef.current) return;
    setIsExportingFlyer(true);
    try {
      await exportElementAsPng(
        flyerRef.current,
        `flyer-${practice.slug}-a4.png`,
        2,
      );
    } finally {
      setIsExportingFlyer(false);
    }
  };

  const printFlyer = () => {
    window.print();
  };

  return (
    <PageShell className="material-page">
      <div className="no-print">
        <SiteHeader subtitle="Druckmaterial" practiceName={practice.name} />

        <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8 sm:px-8 sm:py-10">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-sage hover:text-sage-deep"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zum Generator
          </Link>

          <div className="animate-fade-up mb-10 max-w-2xl">
            <Badge>
              <Check className="h-3.5 w-3.5 text-gold" />
              Link erstellt
            </Badge>
            <h1 className="font-display mt-4 text-3xl tracking-tight text-ink sm:text-4xl">
              Ihr Druckmaterial
            </h1>
            <p className="mt-3 text-ink-muted">
              Laden Sie QR-Code und Flyer herunter — oder passen Sie den
              A4-Flyer mit Ihrem Logo und Text an.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={patientUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-surface px-4 py-2 text-sm font-medium text-sage hover:bg-porcelain"
              >
                <ExternalLink className="h-4 w-4" />
                Patienten-Link öffnen
              </a>
              <span className="self-center font-mono text-xs text-ink-soft">
                {patientUrl.replace(/^https?:\/\//, "")}
              </span>
            </div>
          </div>

          {/* Bearbeitungs-Link — geheim halten */}
          <div className="animate-fade-up delay-1 mb-10 rounded-3xl border border-gold-soft/40 bg-gradient-to-br from-porcelain to-surface p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15">
                  <KeyRound className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="font-medium text-ink">Ihr Bearbeitungs-Link</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    Nur mit diesem Link können Sie Ihre Praxisdaten, Flyer und
                    QR-Codes ändern.{" "}
                    <strong className="font-medium text-ink">
                      Bitte sicher speichern
                    </strong>{" "}
                    — wir können ihn nicht wiederherstellen.
                  </p>
                  {editUrl && (
                    <p className="mt-2 break-all font-mono text-xs text-sage">
                      {editUrl.replace(/^https?:\/\//, "")}
                    </p>
                  )}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="shrink-0"
                onClick={copyEditLink}
              >
                {editLinkCopied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Kopiert!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Link kopieren
                  </>
                )}
              </Button>
            </div>

            <div className="mt-5 border-t border-gold-soft/30 pt-5">
              <p className="mb-3 flex items-center gap-2 text-sm font-medium text-ink">
                <Mail className="h-4 w-4 text-sage" />
                Bearbeitungs-Link per E-Mail
              </p>
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="praxis@beispiel.de"
                  className="flex h-11 flex-1 rounded-2xl border border-[var(--border)] bg-surface px-4 text-sm text-ink placeholder:text-ink-soft/60 focus:border-sage/40 focus:outline-none focus:ring-3 focus:ring-sage/10"
                />
                <Button
                  variant="default"
                  size="default"
                  className="shrink-0"
                  onClick={sendEditLinkByEmail}
                  disabled={isSendingEmail}
                >
                  {isSendingEmail ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Mail className="h-4 w-4" />
                  )}
                  {isSendingEmail ? "Wird gesendet…" : "E-Mail senden"}
                </Button>
              </div>
              {emailMessage && (
                <p
                  className={`mt-2 text-xs ${emailMessage.startsWith("E-Mail gesendet") ? "text-sage" : "text-ink-soft"}`}
                >
                  {emailMessage}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            {/* Left: QR + Editor */}
            <div className="animate-fade-up delay-2 space-y-8">
              {/* QR Section */}
              <section className="rounded-3xl border border-[var(--border)] bg-surface p-6 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage/10">
                    <QrCode className="h-5 w-5 text-sage" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl text-ink">QR-Code</h2>
                    <p className="text-sm text-ink-soft">Als PNG exportieren</p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-5">
                  <div
                    ref={qrRef}
                    className="rounded-3xl border border-[var(--border)] bg-cream p-5"
                  >
                    <QRCodeSVG
                      value={patientUrl}
                      size={200}
                      level="M"
                      includeMargin={false}
                      bgColor="#fffcf7"
                      fgColor="#1a2421"
                    />
                  </div>
                  <Button
                    variant="gold"
                    className="w-full sm:w-auto"
                    onClick={downloadQrPng}
                  >
                    <Download className="h-4 w-4" />
                    QR-Code als PNG speichern
                  </Button>
                </div>
              </section>

              {/* Flyer Editor */}
              <section className="rounded-3xl border border-[var(--border)] bg-surface p-6 sm:p-8">
                <div className="mb-6">
                  <p className="text-xs font-medium tracking-widest text-gold uppercase">
                    Flyer anpassen
                  </p>
                  <h2 className="font-display mt-1 text-xl text-ink">
                    Text &amp; Logo
                  </h2>
                </div>

                <div className="space-y-5">
                  {/* Logo upload */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-ink-muted">
                      Praxis-Logo
                    </label>
                    <div className="flex flex-wrap items-center gap-3">
                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-dashed border-gold-soft/60 bg-porcelain/50 px-4 py-3 text-sm font-medium text-sage transition-colors hover:bg-porcelain">
                        <ImagePlus className="h-4 w-4" />
                        Logo hochladen
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp,image/svg+xml"
                          className="sr-only"
                          onChange={handleLogoUpload}
                        />
                      </label>
                      {practice.logoBase64 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={removeLogo}
                        >
                          <Trash2 className="h-4 w-4" />
                          Entfernen
                        </Button>
                      )}
                    </div>
                    {logoError && (
                      <p className="text-xs text-red-700/80">{logoError}</p>
                    )}
                    <p className="text-xs text-ink-soft">
                      PNG, JPG oder SVG · max. 500 KB
                    </p>
                  </div>

                  <Input
                    label="Überschrift"
                    name="headline"
                    value={flyer.headline}
                    onChange={(e) => updateFlyer("headline", e.target.value)}
                  />
                  <Input
                    label="Untertitel"
                    name="subline"
                    value={flyer.subline}
                    onChange={(e) => updateFlyer("subline", e.target.value)}
                  />
                  <Input
                    label="Anleitung"
                    name="instruction"
                    value={flyer.instruction}
                    onChange={(e) =>
                      updateFlyer("instruction", e.target.value)
                    }
                  />
                  <Input
                    label="Datenschutz-Hinweis"
                    name="privacyNote"
                    value={flyer.privacyNote}
                    onChange={(e) =>
                      updateFlyer("privacyNote", e.target.value)
                    }
                  />

                  <div className="flex flex-col gap-2.5 pt-2 sm:flex-row">
                    <Button
                      className="flex-1"
                      onClick={saveAll}
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      {isSaving ? "Speichert…" : "Flyer speichern"}
                    </Button>
                    {saveMessage && (
                      <span
                        className={`flex items-center justify-center text-sm ${saveMessage === "Gespeichert!" ? "text-sage" : "text-red-700"}`}
                      >
                        {saveMessage}
                      </span>
                    )}
                  </div>
                </div>
              </section>

              {/* Export actions */}
              <section className="rounded-3xl border border-sage/15 bg-sage/5 p-6">
                <h2 className="font-display text-lg text-ink">
                  Flyer exportieren
                </h2>
                <p className="mt-1 text-sm text-ink-soft">
                  DIN A4 (210 × 297 mm) — druckfertig für Ihr Wartezimmer
                </p>
                <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                  <Button
                    variant="default"
                    className="flex-1"
                    onClick={printFlyer}
                  >
                    <Printer className="h-4 w-4" />
                    Flyer drucken
                  </Button>
                  <Button
                    variant="gold"
                    className="flex-1"
                    onClick={downloadFlyerPng}
                    disabled={isExportingFlyer}
                  >
                    {isExportingFlyer ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                    Flyer als PNG
                  </Button>
                </div>
              </section>
            </div>

            {/* Right: Flyer preview (scaled) */}
            <div className="animate-fade-up delay-3 lg:sticky lg:top-8">
              <p className="mb-4 text-xs font-medium tracking-widest text-gold uppercase">
                Vorschau · DIN A4
              </p>
              <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-porcelain/40 p-4 sm:p-6">
                <div
                  className="mx-auto overflow-hidden"
                  style={{ width: "100%", maxWidth: 420, height: 593 }}
                >
                  <div
                    style={{
                      transform: "scale(0.528)",
                      transformOrigin: "top left",
                      width: 794,
                      height: 1123,
                    }}
                  >
                    <FlyerPreview
                      practice={practice}
                      flyer={flyer}
                      patientUrl={patientUrl}
                      className="shadow-[0_20px_60px_rgba(26,36,33,0.12)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>

      {/* Full-size flyer for PNG export (off-screen) */}
      <div className="pointer-events-none fixed -left-[9999px] top-0" aria-hidden>
        <FlyerPreview
          ref={flyerRef}
          practice={practice}
          flyer={flyer}
          patientUrl={patientUrl}
        />
      </div>

      {/* Print-only flyer */}
      <div className="print-only">
        <FlyerPreview
          practice={practice}
          flyer={flyer}
          patientUrl={patientUrl}
        />
      </div>
    </PageShell>
  );
}
