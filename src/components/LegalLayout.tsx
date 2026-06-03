import Link from "next/link";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

interface LegalLayoutProps {
  title: string;
  children: ReactNode;
}

export function LegalLayout({ title, children }: LegalLayoutProps) {
  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-5 sm:px-6">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-teal-600 hover:text-teal-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Zur Startseite
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {title}
          </h1>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <article className="legal-content space-y-6 text-slate-700">{children}</article>
      </main>

      <Footer />
    </div>
  );
}
