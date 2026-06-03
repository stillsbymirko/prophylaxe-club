import { MaterialPage } from "@/components/MaterialPage";
import { Footer } from "@/components/Footer";
import { PageShell } from "@/components/PageShell";
import { verifyEditToken, toPublicPractice } from "@/lib/practice-auth";
import { getStoredPracticeBySlug } from "@/lib/practices-store";
import { AlertCircle, Lock } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ token?: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const practice = await getStoredPracticeBySlug(slug);

  if (practice) {
    return {
      title: `Druckmaterial · ${practice.name}`,
    };
  }

  return { title: "Nicht gefunden" };
}

export default async function MaterialRoutePage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const { token } = await searchParams;
  const stored = await getStoredPracticeBySlug(slug);

  if (!stored) {
    return (
      <PageShell>
        <main className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center px-5 py-20 text-center">
          <AlertCircle className="mb-4 h-10 w-10 text-red-600/70" />
          <h1 className="font-display text-2xl text-ink">Praxis nicht gefunden</h1>
          <Link href="/" className="mt-6 text-sm text-sage hover:underline">
            Zur Startseite
          </Link>
        </main>
        <Footer />
      </PageShell>
    );
  }

  if (!verifyEditToken(stored, token)) {
    return (
      <PageShell>
        <main className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center px-5 py-20 text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl border border-[var(--border)] bg-porcelain">
            <Lock className="h-8 w-8 text-sage" />
          </div>
          <h1 className="font-display text-2xl text-ink">Bearbeitung geschützt</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Nur mit Ihrem persönlichen Bearbeitungs-Link können Sie diese Praxis
            verwalten. Der Link wurde bei der Erstellung angezeigt — bitte
            speichern Sie ihn an einem sicheren Ort.
          </p>
          <p className="mt-4 font-mono text-xs text-ink-soft">/{slug}/material</p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center rounded-2xl bg-sage px-5 py-2.5 text-sm font-medium text-cream hover:bg-sage-deep"
          >
            Neuen Link erstellen
          </Link>
        </main>
        <Footer />
      </PageShell>
    );
  }

  return (
    <MaterialPage
      practice={toPublicPractice(stored)}
      editToken={token!}
      ownerEmail={stored.ownerEmail}
    />
  );
}
