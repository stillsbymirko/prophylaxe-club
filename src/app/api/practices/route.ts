import {
  generateEditToken,
  verifyEditToken,
} from "@/lib/practice-auth";
import type { StoredPractice } from "@/lib/practice-auth";
import {
  getStoredPracticeBySlug,
  PracticeStorageError,
  savePractice,
} from "@/lib/practices-store";
import {
  buildMaterialUrl,
  buildPatientUrl,
  getDefaultFlyerSettings,
  slugify,
  type FlyerSettings,
  type PracticeData,
} from "@/lib/practice-data";
import { isValidEmail, sendEditLinkEmail } from "@/lib/email";
import { getRequestOrigin } from "@/lib/request-origin";
import { NextResponse } from "next/server";

function parseFlyer(raw: unknown): FlyerSettings | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const f = raw as Record<string, unknown>;
  const defaults = getDefaultFlyerSettings();
  return {
    headline:
      typeof f.headline === "string" ? f.headline.trim() : defaults.headline,
    subline:
      typeof f.subline === "string" ? f.subline.trim() : defaults.subline,
    instruction:
      typeof f.instruction === "string"
        ? f.instruction.trim()
        : defaults.instruction,
    privacyNote:
      typeof f.privacyNote === "string"
        ? f.privacyNote.trim()
        : defaults.privacyNote,
  };
}

function validatePracticeFields(
  body: Record<string, unknown>,
): PracticeData | { error: string } {
  const { name, bookingUrl, phone, slug, logoBase64, flyer } = body;

  if (typeof name !== "string" || !name.trim()) {
    return { error: "Praxisname fehlt." };
  }
  if (
    typeof bookingUrl !== "string" ||
    !/^https?:\/\/.+/.test(bookingUrl.trim())
  ) {
    return { error: "Gültige Buchungs-URL erforderlich." };
  }
  if (typeof phone !== "string" || !phone.trim()) {
    return { error: "Telefonnummer fehlt." };
  }
  if (typeof slug !== "string" || !/^[a-z0-9-]+$/.test(slug.trim())) {
    return { error: "Ungültiger Slug." };
  }

  const data: PracticeData = {
    name: name.trim(),
    bookingUrl: bookingUrl.trim(),
    phone: phone.trim(),
    slug: slugify(slug.trim()),
  };

  if (typeof logoBase64 === "string" && logoBase64.startsWith("data:image/")) {
    if (logoBase64.length > 700_000) {
      return { error: "Logo ist zu groß (max. 500 KB)." };
    }
    data.logoBase64 = logoBase64;
  }

  const parsedFlyer = parseFlyer(flyer);
  if (parsedFlyer) {
    data.flyer = parsedFlyer;
  }

  return data;
}

function parseOwnerEmail(body: Record<string, unknown>): string | undefined {
  if (typeof body.ownerEmail !== "string") return undefined;
  const email = body.ownerEmail.trim().toLowerCase();
  if (!email) return undefined;
  if (!isValidEmail(email)) return undefined;
  return email;
}

function buildMaterialPath(slug: string, token: string): string {
  return `/${slug}/material?token=${encodeURIComponent(token)}`;
}

async function maybeSendEditLinkEmail(
  request: Request,
  stored: StoredPractice,
  ownerEmail: string | undefined,
  sendEmail: boolean,
): Promise<{ emailSent: boolean; emailError?: string }> {
  if (!sendEmail || !ownerEmail) {
    return { emailSent: false };
  }

  const origin = getRequestOrigin(request);
  const result = await sendEditLinkEmail({
    to: ownerEmail,
    practiceName: stored.name,
    patientUrl: buildPatientUrl(origin, stored),
    editUrl: buildMaterialUrl(origin, stored.slug, stored.editToken),
  });

  if (result.ok) {
    return { emailSent: true };
  }

  if (result.reason === "not_configured") {
    return {
      emailSent: false,
      emailError:
        "E-Mail-Versand ist noch nicht eingerichtet. Bitte Link manuell speichern.",
    };
  }

  return {
    emailSent: false,
    emailError: result.message ?? "E-Mail konnte nicht gesendet werden.",
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const result = validatePracticeFields(body);

    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const editToken =
      typeof body.editToken === "string" ? body.editToken.trim() : undefined;
    const ownerEmail = parseOwnerEmail(body);
    const sendEmail = body.sendEditLinkEmail !== false;
    const existing = await getStoredPracticeBySlug(result.slug);

    if (existing) {
      if (!verifyEditToken(existing, editToken)) {
        return NextResponse.json(
          {
            error:
              "Dieser Link ist bereits vergeben. Nutzen Sie Ihren persönlichen Bearbeitungs-Link.",
          },
          { status: 403 },
        );
      }

      const stored: StoredPractice = {
        ...result,
        editToken: existing.editToken,
        logoBase64: result.logoBase64 ?? existing.logoBase64,
        flyer: result.flyer ?? existing.flyer,
        ownerEmail: ownerEmail ?? existing.ownerEmail,
      };

      await savePractice(stored);

      const emailResult = await maybeSendEditLinkEmail(
        request,
        stored,
        stored.ownerEmail,
        sendEmail && Boolean(ownerEmail),
      );

      return NextResponse.json({
        slug: stored.slug,
        url: `/${stored.slug}`,
        materialUrl: buildMaterialPath(stored.slug, stored.editToken),
        editToken: stored.editToken,
        ...emailResult,
      });
    }

    const stored: StoredPractice = {
      ...result,
      editToken: generateEditToken(),
      ownerEmail,
    };

    await savePractice(stored);

    const emailResult = await maybeSendEditLinkEmail(
      request,
      stored,
      ownerEmail,
      sendEmail && Boolean(ownerEmail),
    );

    return NextResponse.json({
      slug: stored.slug,
      url: `/${stored.slug}`,
      materialUrl: buildMaterialPath(stored.slug, stored.editToken),
      editToken: stored.editToken,
      ...emailResult,
    });
  } catch (error) {
    console.error("savePractice failed:", error);

    if (error instanceof PracticeStorageError) {
      const status =
        error.code === "redis_not_configured" ? 503 : 500;
      return NextResponse.json({ error: error.message }, { status });
    }

    return NextResponse.json(
      { error: "Speichern fehlgeschlagen. Bitte erneut versuchen." },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Nicht öffentlich zugänglich." },
    { status: 404 },
  );
}
