import { PatientPage } from "@/components/PatientPage";
import { Footer } from "@/components/Footer";
import { getPracticeBySlug } from "@/lib/practices-store";
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
  const practice = await getPracticeBySlug(slug);

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
  const practice = await getPracticeBySlug(slug);

  if (!practice) {
    return <PracticeNotFound slug={slug} />;
  }

  return <PatientPage practice={practice} />;
}

function PracticeNotFound({ slug }: { slug: string }) {
  return (
    <div className="flex min-h-full flex-col">
      <main className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
          <AlertCircle className="h-7 w-7" />
        </div>
        <h1 className="text-xl font-semibold text-slate-900">
          Praxis nicht gefunden
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Unter <span className="font-mono">/{slug}</span> ist keine Praxis
          hinterlegt.
        </p>
        <Link
          href="/"
          className="mt-6 text-sm font-medium text-teal-600 hover:text-teal-700"
        >
          Zur Startseite
        </Link>
      </main>
      <Footer />
    </div>
  );
}
