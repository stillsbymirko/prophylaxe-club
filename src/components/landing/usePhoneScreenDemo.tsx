"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export type PhoneDemoPhase =
  | "select"
  | "download"
  | "add-sheet"
  | "success"
  | "calendar"
  | null;

type PointerTarget = "option" | "download" | "confirm";

function centerWithinContainer(
  element: HTMLElement | null,
  container: HTMLElement | null,
): { x: number; y: number } | null {
  if (!element || !container) return null;
  const elementRect = element.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  return {
    x: elementRect.left + elementRect.width / 2 - containerRect.left,
    y: elementRect.top + elementRect.height / 2 - containerRect.top,
  };
}

interface UsePhoneScreenDemoOptions {
  enabled: boolean;
  paused: boolean;
  phoneRef: RefObject<HTMLElement | null>;
  optionRef: RefObject<HTMLElement | null>;
  downloadRef: RefObject<HTMLElement | null>;
  confirmRef: RefObject<HTMLElement | null>;
}

export function usePhoneScreenDemo({
  enabled,
  paused,
  phoneRef,
  optionRef,
  downloadRef,
  confirmRef,
}: UsePhoneScreenDemoOptions) {
  const [phase, setPhase] = useState<PhoneDemoPhase>(null);
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);
  const [tapActive, setTapActive] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  const updatePointer = (target: PointerTarget | null) => {
    if (!target) {
      setPointer(null);
      return;
    }
    const element =
      target === "option"
        ? optionRef.current
        : target === "download"
          ? downloadRef.current
          : confirmRef.current;
    setPointer(centerWithinContainer(element, phoneRef.current));
  };

  useEffect(() => {
    if (!enabled || paused) {
      setPhase(null);
      setPointer(null);
      setTapActive(false);
      setIsRunning(false);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timers: number[] = [];
    let cancelled = false;

    const schedule = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms));
    };

    const runCycle = (startAt: number) => {
      if (cancelled || pausedRef.current) return;

      setIsRunning(true);
      setPhase(null);
      setPointer(null);
      setTapActive(false);

      schedule(() => {
        if (cancelled || pausedRef.current) return;
        setPhase("select");
        requestAnimationFrame(() => updatePointer("option"));
      }, startAt + 400);

      schedule(() => {
        if (cancelled || pausedRef.current) return;
        setTapActive(true);
      }, startAt + 2200);

      schedule(() => {
        if (cancelled || pausedRef.current) return;
        setTapActive(false);
      }, startAt + 2700);

      schedule(() => {
        if (cancelled || pausedRef.current) return;
        setPhase("download");
        requestAnimationFrame(() => updatePointer("download"));
      }, startAt + 3100);

      schedule(() => {
        if (cancelled || pausedRef.current) return;
        setTapActive(true);
      }, startAt + 3900);

      schedule(() => {
        if (cancelled || pausedRef.current) return;
        setTapActive(false);
        setPointer(null);
        setPhase("add-sheet");
      }, startAt + 4500);

      schedule(() => {
        if (cancelled || pausedRef.current) return;
        requestAnimationFrame(() => updatePointer("confirm"));
      }, startAt + 5200);

      schedule(() => {
        if (cancelled || pausedRef.current) return;
        setTapActive(true);
      }, startAt + 5800);

      schedule(() => {
        if (cancelled || pausedRef.current) return;
        setTapActive(false);
        setPointer(null);
        setPhase("success");
      }, startAt + 6300);

      schedule(() => {
        if (cancelled || pausedRef.current) return;
        setPhase("calendar");
      }, startAt + 7600);

      schedule(() => {
        if (cancelled || pausedRef.current) return;
        setPhase(null);
      }, startAt + 9800);

      schedule(() => {
        if (cancelled || pausedRef.current) return;
        runCycle(700);
      }, startAt + 10600);
    };

    schedule(() => runCycle(0), 400);

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
      setIsRunning(false);
    };
  }, [enabled, paused, confirmRef, downloadRef, optionRef, phoneRef]);

  return { phase, pointer, tapActive, isRunning };
}

interface PhoneDemoClickIndicatorProps {
  position: { x: number; y: number } | null;
  tapping?: boolean;
}

export function PhoneDemoClickIndicator({
  position,
  tapping = false,
}: PhoneDemoClickIndicatorProps) {
  if (!position) return null;

  return (
    <div
      className="pointer-events-none absolute z-50 transition-all duration-500 ease-out"
      style={{ left: position.x, top: position.y }}
      aria-hidden
    >
      <div
        className={
          tapping
            ? "demo-tap-ring absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-sage/30"
            : "absolute h-9 w-9 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-sage/25"
        }
      />
      <div className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-sage shadow-md" />
    </div>
  );
}
