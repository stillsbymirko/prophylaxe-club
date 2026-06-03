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

export const FLYER_BACKGROUND_IMAGE = "/background_flyer.jpg";

const STEPS = [
  { number: "1", title: "QR-Code scannen" },
  { number: "2", title: "6 oder 12 Monate wählen" },
  { number: "3", title: "Kalendertermin speichern" },
] as const;

const COLORS = {
  blue: "#1a6fbd",
  blueSoft: "#f4f9fd",
  ink: "#1a2421",
  muted: "#4f5c58",
  soft: "#72807b",
  border: "#e2e8e6",
};

export const FlyerPreview = forwardRef<HTMLDivElement, FlyerPreviewProps>(
  function FlyerPreview({ practice, flyer, patientUrl, className }, ref) {
    const displayUrl = patientUrl.replace(/^https?:\/\//, "");

    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden text-[#1a2421]", className)}
        style={{
          width: FLYER_WIDTH_PX,
          height: FLYER_HEIGHT_PX,
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        {/* Full-bleed background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={FLYER_BACKGROUND_IMAGE}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          draggable={false}
          crossOrigin="anonymous"
        />

        {/* Light scrim — keeps photo visible, improves contrast */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.45) 42%, rgba(255,255,255,0.18) 100%)",
          }}
          aria-hidden
        />

        {/* Practice logo — top right */}
        {(practice.logoBase64 || practice.name) && (
          <div
            className="absolute right-8 top-8 z-20 flex max-w-[200px] flex-col items-end"
          >
            {practice.logoBase64 ? (
              <div
                className="rounded-2xl bg-white/95 p-3"
                style={{ boxShadow: "0 8px 32px rgba(26, 36, 33, 0.12)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={practice.logoBase64}
                  alt={practice.name}
                  className="max-h-[72px] max-w-[180px] object-contain object-right"
                />
              </div>
            ) : (
              <div
                className="rounded-2xl px-4 py-3 text-right"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.93)",
                  boxShadow: "0 8px 32px rgba(26, 36, 33, 0.12)",
                }}
              >
                <p
                  className="text-[13px] font-semibold leading-snug"
                  style={{
                    color: COLORS.ink,
                    fontFamily: "system-ui, sans-serif",
                  }}
                >
                  {practice.name}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Content card */}
        <div className="relative z-10 flex h-full items-center px-10 py-12">
          <div
            className="w-full max-w-[500px] rounded-[28px] px-9 py-10"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.93)",
              boxShadow: "0 20px 60px rgba(26, 36, 33, 0.14)",
            }}
          >
            {/* Headline */}
            <div>
              <h1
                className="text-[2.05rem] leading-[1.14] font-normal tracking-tight"
                style={{ color: COLORS.ink }}
              >
                {flyer.headline}
              </h1>
              <p
                className="mt-3.5 text-[1.02rem] leading-[1.55]"
                style={{ color: COLORS.muted }}
              >
                {flyer.subline}
              </p>
            </div>

            {/* Steps */}
            <ol className="mt-6 space-y-2">
              {STEPS.map((step) => (
                <li
                  key={step.number}
                  className="flex items-center gap-3 rounded-xl border px-3 py-2"
                  style={{
                    borderColor: COLORS.border,
                    backgroundColor: COLORS.blueSoft,
                  }}
                >
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold text-white"
                    style={{
                      backgroundColor: COLORS.blue,
                      fontFamily: "system-ui, sans-serif",
                    }}
                  >
                    {step.number}
                  </span>
                  <span
                    className="text-[12px] font-semibold leading-snug"
                    style={{
                      color: COLORS.ink,
                      fontFamily: "system-ui, sans-serif",
                    }}
                  >
                    {step.title}
                  </span>
                </li>
              ))}
            </ol>

            {/* QR */}
            <div className="mt-6 flex flex-col items-start">
              <p
                className="mb-2.5 text-[11px] font-semibold tracking-[0.16em] uppercase"
                style={{
                  color: COLORS.blue,
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                Jetzt scannen
              </p>
              <div
                className="rounded-[22px] p-[3px]"
                style={{
                  background: `linear-gradient(145deg, ${COLORS.blue}, #3d8fd4)`,
                  boxShadow: "0 12px 36px rgba(26, 111, 189, 0.2)",
                }}
              >
                <div className="rounded-[19px] bg-white p-4">
                  <QRCodeSVG
                    value={patientUrl}
                    size={160}
                    level="M"
                    includeMargin={false}
                    bgColor="#ffffff"
                    fgColor={COLORS.ink}
                  />
                </div>
              </div>
              <p
                className="mt-2.5 text-[11px] font-medium leading-snug"
                style={{
                  color: COLORS.soft,
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                {flyer.instruction}
              </p>
              <p
                className="mt-1 max-w-full truncate font-mono text-[11px]"
                style={{ color: COLORS.blue }}
              >
                {displayUrl}
              </p>
            </div>

            {/* Footer */}
            <div
              className="mt-6 border-t pt-5"
              style={{ borderColor: COLORS.border }}
            >
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-medium"
                style={{
                  backgroundColor: COLORS.blueSoft,
                  color: COLORS.blue,
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path
                    d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {flyer.privacyNote}
              </div>

              {(practice.name || practice.phone) && (
                <div className="mt-3.5">
                  <p
                    className="text-[12px] font-semibold leading-snug"
                    style={{
                      color: COLORS.ink,
                      fontFamily: "system-ui, sans-serif",
                    }}
                  >
                    {practice.name}
                  </p>
                  {practice.phone && (
                    <p
                      className="mt-0.5 text-[11px]"
                      style={{
                        color: COLORS.soft,
                        fontFamily: "system-ui, sans-serif",
                      }}
                    >
                      {practice.phone}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
);
