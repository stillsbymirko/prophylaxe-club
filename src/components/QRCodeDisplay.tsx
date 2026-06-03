"use client";

import { useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Download, Copy, Check, QrCode } from "lucide-react";

interface QRCodeDisplayProps {
  url: string;
}

export function QRCodeDisplay({ url }: QRCodeDisplayProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    canvas.width = 512;
    canvas.height = 512;

    img.onload = () => {
      if (!ctx) return;
      ctx.fillStyle = "#faf6ef";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, 512, 512);

      const link = document.createElement("a");
      link.download = "prophylaxe-qr-code.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };

    img.src =
      "data:image/svg+xml;base64," +
      btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <Card>
      <CardHeader className="border-b border-[var(--border)] bg-gradient-to-br from-porcelain/80 to-surface">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage/10">
            <QrCode className="h-4 w-4 text-sage" />
          </div>
          <div>
            <p className="text-xs font-medium tracking-widest text-gold uppercase">
              Schritt 2
            </p>
            <CardTitle className="text-lg">Ihr Patienten-Link</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="rounded-2xl border border-[var(--border)] bg-porcelain/40 px-4 py-3">
          <p className="break-all font-mono text-sm text-sage">{url}</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div
            ref={qrRef}
            className="rounded-3xl border border-[var(--border)] bg-surface p-5 shadow-[inset_0_2px_8px_rgba(26,36,33,0.04)]"
          >
            <QRCodeSVG
              value={url}
              size={200}
              level="M"
              includeMargin={false}
              bgColor="#fffcf7"
              fgColor="#1a2421"
            />
          </div>
          <p className="max-w-xs text-center text-sm leading-relaxed text-ink-soft">
            Zum Ausdrucken im Wartezimmer oder Teilen in der Praxis
          </p>
        </div>

        <div className="flex flex-col gap-2.5 sm:flex-row">
          <Button variant="outline" className="flex-1" onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="h-4 w-4 text-sage" />
                Kopiert!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Link kopieren
              </>
            )}
          </Button>
          <Button variant="gold" className="flex-1" onClick={handleDownload}>
            <Download className="h-4 w-4" />
            QR-Code speichern
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
