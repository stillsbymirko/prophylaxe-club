import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-surface/50 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2.5 text-sm text-ink-soft">
            <ShieldCheck className="h-4 w-4 shrink-0 text-sage" aria-hidden />
            <p>100&nbsp;% anonym — keine Patientendaten gespeichert</p>
          </div>
          <nav
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm"
            aria-label="Rechtliches"
          >
            <Link
              href="/impressum"
              className="text-ink-soft transition-colors hover:text-sage"
            >
              Impressum
            </Link>
            <span className="text-mist" aria-hidden>
              ·
            </span>
            <Link
              href="/datenschutz"
              className="text-ink-soft transition-colors hover:text-sage"
            >
              Datenschutz
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
