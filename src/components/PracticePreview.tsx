"use client";

import { PhoneDemoScreens } from "@/components/landing/PhoneDemoScreens";
import {
  PhoneDemoClickIndicator,
  usePhoneScreenDemo,
} from "@/components/landing/usePhoneScreenDemo";
import { PhoneMockup } from "@/components/PhoneMockup";
import type { PracticeData } from "@/lib/practice-data";
import { useEffect, useRef, useState } from "react";

export const PREVIEW_DEMO_PRACTICE: PracticeData = {
  name: "Praxis Müller",
  bookingUrl: "https://www.praxis-mueller.de",
  phone: "030 123 4567",
  address: "Musterstr. 12, 12345 Musterstadt",
  slug: "praxis-mueller",
};

interface PracticePreviewProps {
  data: PracticeData;
  demoPaused?: boolean;
}

export function PracticePreview({
  data,
  demoPaused = false,
}: PracticePreviewProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const phoneWrapRef = useRef<HTMLDivElement>(null);
  const optionRef = useRef<HTMLDivElement>(null);
  const downloadRef = useRef<HTMLDivElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const demoActive = isVisible && !demoPaused;

  const { phase, pointer, tapActive, isRunning, notificationTick } =
    usePhoneScreenDemo({
    enabled: demoActive,
    paused: demoPaused,
    phoneRef: phoneWrapRef,
    optionRef,
    downloadRef,
    confirmRef,
  });

  const showDemo = demoActive && isRunning;
  const practice: PracticeData = showDemo
    ? PREVIEW_DEMO_PRACTICE
    : { ...data, name: data.name.trim() || "Ihre Praxis" };

  return (
    <div ref={rootRef} className="relative flex flex-col items-center">
      <p className="mb-4 text-center text-xs font-medium tracking-widest text-gold uppercase lg:mb-5">
        {showDemo ? "So funktioniert's" : "Live-Vorschau"}
      </p>

      <div ref={phoneWrapRef} className="relative">
        <PhoneDemoClickIndicator position={pointer} tapping={tapActive} />

        <div
          className="pointer-events-none absolute inset-x-8 -bottom-4 h-12 rounded-full bg-sage/15 blur-2xl"
          aria-hidden
        />
        <PhoneMockup size="lg">
          <PhoneDemoScreens
            practice={practice}
            phase={showDemo ? phase : null}
            tapActive={tapActive}
            notificationTick={notificationTick}
            optionRef={optionRef}
            downloadButtonRef={downloadRef}
            confirmButtonRef={confirmRef}
          />
        </PhoneMockup>
      </div>
    </div>
  );
}
