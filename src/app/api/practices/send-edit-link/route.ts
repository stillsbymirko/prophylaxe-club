import { verifyEditToken } from "@/lib/practice-auth";
import { getStoredPracticeBySlug, savePractice } from "@/lib/practices-store";
import {
  buildMaterialUrl,
  buildPatientUrl,
} from "@/lib/practice-data";
import {
  getRequestOrigin,
  isValidEmail,
  sendEditLinkEmail,
} from "@/lib/email";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const slug = typeof body.slug === "string" ? body.slug.trim() : "";
    const editToken =
      typeof body.editToken === "string" ? body.editToken.trim() : "";
    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!slug) {
      return NextResponse.json({ error: "Slug fehlt." }, { status: 400 });
    }

    const stored = await getStoredPracticeBySlug(slug);

    if (!verifyEditToken(stored, editToken)) {
      return NextResponse.json({ error: "Zugriff verweigert." }, { status: 403 });
    }

    const targetEmail = email || stored?.ownerEmail;

    if (!targetEmail || !isValidEmail(targetEmail)) {
      return NextResponse.json(
        { error: "Bitte geben Sie eine gültige E-Mail-Adresse ein." },
        { status: 400 },
      );
    }

    const origin = getRequestOrigin(request);
    const patientUrl = buildPatientUrl(origin, stored!);
    const editUrl = buildMaterialUrl(origin, slug, stored!.editToken);

    const result = await sendEditLinkEmail({
      to: targetEmail,
      practiceName: stored!.name,
      patientUrl,
      editUrl,
    });

    if (!result.ok && result.reason === "not_configured") {
      return NextResponse.json(
        {
          error:
            "E-Mail-Versand ist noch nicht eingerichtet. Bitte kopieren Sie den Link manuell.",
        },
        { status: 503 },
      );
    }

    if (!result.ok) {
      return NextResponse.json(
        { error: result.message ?? "E-Mail konnte nicht gesendet werden." },
        { status: 500 },
      );
    }

    if (email && email !== stored!.ownerEmail) {
      await savePractice({ ...stored!, ownerEmail: email });
    }

    return NextResponse.json({ sent: true, email: targetEmail });
  } catch (error) {
    console.error("send-edit-link failed:", error);
    return NextResponse.json(
      { error: "E-Mail konnte nicht gesendet werden." },
      { status: 500 },
    );
  }
}
