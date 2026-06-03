import Link from "next/link";
import { Footer } from "@/components/Footer";
import { PageShell } from "@/components/PageShell";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

interface LegalLayoutProps {
  title: string;
  children: ReactNode;
}

export function LegalLayout({ title, children }: LegalLayoutProps) {
  return (
    <PageShell>
      <header className="border-b border-[var(--border)] bg-surface/70 backdrop-blur-md">
        <div className="mx-auto max-w-3xl px-5 py-6 sm:px-8">
          <Link
            href="/"
            className="mb-5 inline-flex items-center gap-2 text-sm text-sage transition-colors hover:text-sage-deep"
          >
            <ArrowLeft className="h-4 w-4" />
            Zur Startseite
          </Link>
          <h1 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            {title}
          </h1>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-8 sm:px-8 sm:py-12">
        <article className="legal-content animate-fade-up space-y-6 rounded-3xl border border-[var(--border)] bg-surface/80 p-6 sm:p-10">
          {children}
        </article>
      </main>

      <Footer />
    </PageShell>
  );
}
