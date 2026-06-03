import { CalendarSetupPage } from "@/components/CalendarSetupPage";
import { Footer } from "@/components/Footer";
import { PageShell } from "@/components/PageShell";
import { getPublicPracticeBySlug } from "@/lib/practices-store";
import { parseReminderMonths } from "@/lib/date-logic";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ monate?: string }>;
}

function parseMonths(value: string | undefined) {
  return parseReminderMonths(value);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const practice = await getPublicPracticeBySlug(slug);

  if (practice) {
    return {
      title: `Kalender einrichten · ${practice.name}`,
      description: `Anleitung: Prophylaxe-Erinnerung von ${practice.name} in den Kalender eintragen.`,
    };
  }

  return { title: "Praxis nicht gefunden" };
}

export default async function CalendarSetupRoute({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const { monate } = await searchParams;
  const practice = await getPublicPracticeBySlug(slug);
  const months = parseMonths(monate);

  if (!practice) {
    return <PracticeNotFound slug={slug} />;
  }

  if (!months) {
    redirect(`/${slug}`);
  }

  return <CalendarSetupPage practice={practice} months={months} />;
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
