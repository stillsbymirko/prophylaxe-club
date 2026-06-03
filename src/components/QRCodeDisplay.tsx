"use client";

import { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Download, Copy, Check, Link2 } from "lucide-react";
import { useState } from "react";

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
      ctx.fillStyle = "#ffffff";
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
    <Card className="overflow-hidden">
      <CardHeader className="border-b border-slate-100 bg-gradient-to-br from-teal-50 to-white">
        <div className="flex items-center gap-2">
          <Link2 className="h-5 w-5 text-teal-600" />
          <CardTitle>Ihr Patienten-Link</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="break-all font-mono text-sm text-teal-800">{url}</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div
            ref={qrRef}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <QRCodeSVG
              value={url}
              size={200}
              level="M"
              includeMargin={false}
              bgColor="#ffffff"
              fgColor="#0f172a"
            />
          </div>
          <p className="text-center text-sm text-slate-500">
            QR-Code zum Ausdrucken oder Teilen in der Praxis
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleCopy}
          >
            {copied ? (
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
          <Button className="flex-1" onClick={handleDownload}>
            <Download className="h-4 w-4" />
            QR-Code speichern
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
