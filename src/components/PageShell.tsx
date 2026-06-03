"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
  className?: string;
}

export function PageShell({ children, className }: PageShellProps) {
  return (
    <div className={cn("relative flex min-h-full flex-col", className)}>
      {children}
    </div>
  );
}

interface SiteHeaderProps {
  subtitle?: string;
  compact?: boolean;
  practiceName?: string;
}

const homeNavLinks = [
  { href: "#so-funktionierts", label: "Ablauf" },
  { href: "#datenschutz-info", label: "Datenschutz" },
  { href: "#faq", label: "FAQ" },
];

function LogoTooth({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M12 2.25c-3.15 0-5.75 2.45-5.75 5.65 0 2.05.85 3.55 1.55 5.15.55 1.25 1.05 2.45 1.05 4.05 0 1.35-.45 2.75-.95 4.05-.25.7.35 1.35 1.1 1.35h5.1c.75 0 1.35-.65 1.1-1.35-.5-1.3-.95-2.7-.95-4.05 0-1.6.5-2.8 1.05-4.05.7-1.6 1.55-3.1 1.55-5.15 0-3.2-2.6-5.65-5.75-5.65Z"
        fill="currentColor"
      />
      <path
        d="M9.75 7.5c.55-.85 1.35-1.35 2.25-1.35s1.7.5 2.25 1.35"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}

export function SiteHeader({
  subtitle = "Prophylaxe-Erinnerung",
  compact = false,
  practiceName,
}: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = !practiceName;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-[var(--border)] bg-white/90 backdrop-blur-md",
        compact ? "py-3" : "py-4 sm:py-5",
      )}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="group flex min-w-0 flex-1 items-center gap-3">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-sage shadow-[0_2px_12px_var(--sage-glow)] transition-transform duration-300 group-hover:scale-[1.03] sm:h-11 sm:w-11 sm:rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent" />
              <LogoTooth className="relative h-5 w-5 text-white sm:h-[1.35rem] sm:w-[1.35rem]" />
            </div>
            <div className="min-w-0">
              <p className="truncate font-display text-base leading-tight tracking-tight text-ink sm:text-xl">
                {practiceName ?? "Prophylaxe-Erinnerung"}
              </p>
              {!practiceName && (
                <p className="truncate text-[11px] tracking-wide text-ink-soft uppercase sm:text-xs">
                  {subtitle}
                </p>
              )}
              {practiceName && (
                <p className="truncate text-sm text-ink-soft">{subtitle}</p>
              )}
            </div>
          </Link>

          {isHome && (
            <>
              <nav
                className="ml-auto hidden items-center gap-5 md:flex"
                aria-label="Seitennavigation"
              >
                {homeNavLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-ink-soft transition-colors hover:text-sage"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#generator"
                  className="rounded-full bg-sage px-4 py-2 text-sm font-medium text-cream transition-colors hover:bg-sage-deep"
                >
                  Link erstellen
                </a>
              </nav>

              <button
                type="button"
                className="ml-auto flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-surface text-ink md:hidden"
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
                onClick={() => setMobileOpen((open) => !open)}
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </>
          )}
        </div>

        {isHome && mobileOpen && (
          <nav
            className="mt-4 flex flex-col gap-1 border-t border-[var(--border)] pt-4 md:hidden"
            aria-label="Mobile Navigation"
          >
            {homeNavLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink-muted hover:bg-porcelain hover:text-sage"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#generator"
              className="mt-1 rounded-xl bg-sage px-3 py-3 text-center text-sm font-medium text-cream"
              onClick={() => setMobileOpen(false)}
            >
              Link erstellen
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-porcelain/60 px-3.5 py-1.5 text-xs font-medium tracking-wide text-sage uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}
