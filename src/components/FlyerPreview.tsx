"use client";

import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { FlyerSettings, PracticeData } from "@/lib/practice-data";
import { cn } from "@/lib/utils";

interface FlyerPreviewProps {
  practice: PracticeData;
  flyer: FlyerSettings;
  patientUrl: string;
  className?: string;
}

/** A4 at 96 DPI — exact print dimensions */
export const FLYER_WIDTH_PX = 794;
export const FLYER_HEIGHT_PX = 1123;

export const FlyerPreview = forwardRef<HTMLDivElement, FlyerPreviewProps>(
  function FlyerPreview({ practice, flyer, patientUrl, className }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex flex-col overflow-hidden bg-[#faf6ef] text-[#1a2421]",
          className,
        )}
        style={{
          width: FLYER_WIDTH_PX,
          height: FLYER_HEIGHT_PX,
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        {/* Decorative top band */}
        <div className="relative h-[10px] bg-[#1a6fbd]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #1a6fbd 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden
        />

        <div className="relative flex flex-1 flex-col px-14 py-12">
          {/* Logo + practice */}
          <div className="flex items-center gap-6">
            {practice.logoBase64 ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={practice.logoBase64}
                alt={`Logo ${practice.name}`}
                className="h-20 max-w-[180px] object-contain object-left"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#1a6fbd]/10 ring-1 ring-[#1a6fbd]/15">
                <span
                  className="text-3xl font-semibold text-[#1a6fbd]"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {practice.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium tracking-widest text-[#b8925f] uppercase">
                {practice.name}
              </p>
              <p className="mt-0.5 text-xs text-[#72807b]">{practice.phone}</p>
            </div>
          </div>

          {/* Headline block */}
          <div className="mt-10 text-center">
            <h1
              className="text-[2.35rem] leading-[1.15] font-normal tracking-tight text-[#1a2421]"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              {flyer.headline}
            </h1>
            <p className="mx-auto mt-5 max-w-[520px] text-lg leading-relaxed text-[#4f5c58]">
              {flyer.subline}
            </p>
          </div>

          {/* QR */}
          <div className="mx-auto mt-10 flex flex-col items-center">
            <div className="rounded-3xl border-2 border-[#ddd4c8] bg-white p-6 shadow-[0_8px_40px_rgba(26,36,33,0.08)]">
              <QRCodeSVG
                value={patientUrl}
                size={240}
                level="M"
                includeMargin={false}
                bgColor="#ffffff"
                fgColor="#1a2421"
              />
            </div>
            <p className="mt-4 font-mono text-sm text-[#1a6fbd]">
              {patientUrl.replace(/^https?:\/\//, "")}
            </p>
          </div>

          {/* Instruction */}
          <p className="mx-auto mt-10 max-w-[520px] text-center text-base leading-relaxed text-[#4f5c58]">
            {flyer.instruction}
          </p>

          {/* Footer */}
          <div className="mt-auto border-t border-[#ddd4c8] pt-8 text-center">
            <p className="text-sm font-medium text-[#1a6fbd]">
              {flyer.privacyNote}
            </p>
            <p className="mt-2 text-xs text-[#72807b]">
              Prophylaxe-Erinnerung · Kalendertermin mit einem Tipp
            </p>
          </div>
        </div>

        {/* Gold accent bottom */}
        <div className="h-1.5 bg-gradient-to-r from-[#b8925f] via-[#d9c4a0] to-[#b8925f]" />
      </div>
    );
  },
);
