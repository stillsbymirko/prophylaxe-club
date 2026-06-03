import { PatientPage } from "@/components/PatientPage";
import { Footer } from "@/components/Footer";
import { PageShell } from "@/components/PageShell";
import { getPublicPracticeBySlug } from "@/lib/practices-store";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const practice = await getPublicPracticeBySlug(slug);

  if (practice) {
    return {
      title: practice.name,
      description: `Prophylaxe-Erinnerung für ${practice.name}. Kalendertermin herunterladen — 100% anonym.`,
    };
  }

  return { title: "Praxis nicht gefunden" };
}

export default async function SlugPage({ params }: PageProps) {
  const { slug } = await params;
  const practice = await getPublicPracticeBySlug(slug);

  if (!practice) {
    return <PracticeNotFound slug={slug} />;
  }

  return <PatientPage practice={practice} />;
}

function PracticeNotFound({ slug }: { slug: string }) {
  return (
    <PageShell>
      <main className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center px-5 py-20 text-center sm:px-8">
        <div className="animate-scale-in mb-5 flex h-16 w-16 items-center justify-center rounded-3xl border border-red-200/60 bg-red-50/80">
          <AlertCircle className="h-8 w-8 text-red-700/70" />
        </div>
        <h1 className="font-display text-2xl text-ink">Praxis nicht gefunden</h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          Unter{" "}
          <span className="rounded-lg bg-porcelain px-2 py-0.5 font-mono text-ink-muted">
            /{slug}
          </span>{" "}
          ist keine Praxis hinterlegt.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-sage px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-sage-deep"
        >
          Zur Startseite
        </Link>
      </main>
      <Footer />
    </PageShell>
  );
}
