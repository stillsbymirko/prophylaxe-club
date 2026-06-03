import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface PhoneMockupProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

/** iPhone 15 Pro — 393 × 852 pt */
const sizes = {
  sm: 216,
  md: 252,
  lg: 288,
} as const;

export function PhoneMockup({
  children,
  className,
  size = "lg",
}: PhoneMockupProps) {
  const width = sizes[size];
  const height = Math.round(width * (852 / 393));
  const bezel = 12;
  const islandW = Math.round(width * 0.295);
  const islandH = Math.round(width * 0.078);
  const homeW = Math.round(width * 0.36);

  return (
    <div
      className={cn("relative mx-auto select-none", className)}
      style={{ width: width + bezel * 2, height: height + bezel * 2 }}
      aria-hidden
    >
      {/* Side buttons */}
      <div
        className="absolute left-0 rounded-l-sm bg-gradient-to-r from-zinc-400 to-zinc-600"
        style={{ top: "18%", width: 3, height: width * 0.055 }}
      />
      <div
        className="absolute left-0 rounded-l-sm bg-gradient-to-r from-zinc-400 to-zinc-600"
        style={{ top: "26%", width: 3, height: width * 0.11 }}
      />
      <div
        className="absolute left-0 rounded-l-sm bg-gradient-to-r from-zinc-400 to-zinc-600"
        style={{ top: "34%", width: 3, height: width * 0.11 }}
      />
      <div
        className="absolute right-0 rounded-r-sm bg-gradient-to-l from-zinc-400 to-zinc-600"
        style={{ top: "28%", width: 3, height: width * 0.155 }}
      />

      {/* Titanium frame */}
      <div
        className="absolute rounded-[2.85rem] p-[2px] shadow-[0_28px_70px_rgba(0,0,0,0.22),0_10px_28px_rgba(26,111,189,0.12)]"
        style={{
          inset: bezel - 2,
          background:
            "linear-gradient(160deg, #e4e4e7 0%, #a1a1aa 35%, #71717a 65%, #52525b 100%)",
        }}
      >
        <div
          className="h-full w-full rounded-[2.75rem] bg-zinc-900 p-[9px]"
          style={{ width, height }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-[2.15rem] bg-black">
            <div className="absolute inset-0 overflow-hidden bg-white">
              {children}
            </div>

            {/* Dynamic Island */}
            <div
              className="absolute left-1/2 z-30 -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
              style={{
                top: Math.round(height * 0.014),
                width: islandW,
                height: islandH,
              }}
            >
              <div className="absolute inset-y-[35%] left-[18%] w-[22%] rounded-full bg-zinc-800" />
            </div>

            {/* Home indicator */}
            <div
              className="absolute bottom-[6px] left-1/2 z-30 -translate-x-1/2 rounded-full bg-black/80"
              style={{ width: homeW, height: Math.max(4, width * 0.014) }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
