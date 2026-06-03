import { savePractice, getPracticeBySlug } from "@/lib/practices-store";
import { slugify, type PracticeData } from "@/lib/practice-data";
import { NextResponse } from "next/server";

function validatePractice(body: unknown): PracticeData | { error: string } {
  if (!body || typeof body !== "object") {
    return { error: "Ungültige Anfrage." };
  }

  const { name, bookingUrl, phone, slug } = body as Record<string, unknown>;

  if (typeof name !== "string" || !name.trim()) {
    return { error: "Praxisname fehlt." };
  }
  if (typeof bookingUrl !== "string" || !/^https?:\/\/.+/.test(bookingUrl.trim())) {
    return { error: "Gültige Buchungs-URL erforderlich." };
  }
  if (typeof phone !== "string" || !phone.trim()) {
    return { error: "Telefonnummer fehlt." };
  }
  if (typeof slug !== "string" || !/^[a-z0-9-]+$/.test(slug.trim())) {
    return { error: "Ungültiger Slug." };
  }

  return {
    name: name.trim(),
    bookingUrl: bookingUrl.trim(),
    phone: phone.trim(),
    slug: slugify(slug.trim()),
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = validatePractice(body);

    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    await savePractice(result);

    return NextResponse.json({
      slug: result.slug,
      url: `/${result.slug}`,
    });
  } catch (error) {
    console.error("savePractice failed:", error);
    return NextResponse.json(
      { error: "Speichern fehlgeschlagen. Bitte erneut versuchen." },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "Slug fehlt." }, { status: 400 });
  }

  const practice = await getPracticeBySlug(slug);
  if (!practice) {
    return NextResponse.json({ error: "Nicht gefunden." }, { status: 404 });
  }

  return NextResponse.json(practice);
}
