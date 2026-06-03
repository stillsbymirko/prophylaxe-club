import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200/80 bg-white/60 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6">
        <div className="flex flex-col items-center gap-3 text-center text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 shrink-0 text-teal-600" aria-hidden />
            <p>
              100&nbsp;% anonym. Es werden keine Patientendaten gespeichert.
            </p>
          </div>
          <nav
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1"
            aria-label="Rechtliches"
          >
            <Link
              href="/impressum"
              className="text-slate-500 hover:text-teal-600"
            >
              Impressum
            </Link>
            <span className="text-slate-300" aria-hidden>
              ·
            </span>
            <Link
              href="/datenschutz"
              className="text-slate-500 hover:text-teal-600"
            >
              Datenschutz
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
