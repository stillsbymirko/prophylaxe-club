import { siteConfig } from "./site-config";

export interface EditLinkEmailParams {
  to: string;
  practiceName: string;
  patientUrl: string;
  editUrl: string;
}

function buildEditLinkHtml(params: EditLinkEmailParams): string {
  const { practiceName, patientUrl, editUrl } = params;

  return `<!DOCTYPE html>
<html lang="de">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#faf6ef;font-family:Georgia,'Times New Roman',serif;color:#1a2421;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf6ef;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:520px;background:#fffcf7;border:1px solid #ddd4c8;border-radius:16px;overflow:hidden;">
        <tr><td style="height:6px;background:#1a6fbd;"></td></tr>
        <tr><td style="padding:32px 28px;">
          <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#b8925f;">Prophylaxe-Erinnerung</p>
          <h1 style="margin:0 0 16px;font-size:24px;font-weight:normal;line-height:1.3;">Ihr Bearbeitungs-Link</h1>
          <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#4f5c58;font-family:system-ui,sans-serif;">
            Hallo,<br><br>
            für <strong>${escapeHtml(practiceName)}</strong> wurde ein Patienten-Link erstellt.
            Speichern Sie den folgenden Bearbeitungs-Link — nur damit können Sie QR-Code, Flyer und Praxisdaten ändern.
          </p>
          <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#1a6fbd;font-family:system-ui,sans-serif;">Patienten-Link (für QR-Code &amp; Flyer)</p>
          <p style="margin:0 0 20px;padding:12px 14px;background:#f0e9df;border-radius:10px;font-size:14px;word-break:break-all;font-family:monospace;">
            <a href="${escapeHtml(patientUrl)}" style="color:#1a6fbd;">${escapeHtml(patientUrl)}</a>
          </p>
          <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#1a6fbd;font-family:system-ui,sans-serif;">Bearbeitungs-Link (geheim — bitte speichern)</p>
          <p style="margin:0 0 24px;padding:12px 14px;background:#f0e9df;border-radius:10px;font-size:13px;word-break:break-all;font-family:monospace;">
            <a href="${escapeHtml(editUrl)}" style="color:#1a6fbd;">${escapeHtml(editUrl)}</a>
          </p>
          <a href="${escapeHtml(editUrl)}" style="display:inline-block;padding:14px 24px;background:#1a6fbd;color:#faf6ef;text-decoration:none;border-radius:12px;font-size:15px;font-family:system-ui,sans-serif;">Druckmaterial öffnen</a>
          <p style="margin:24px 0 0;font-size:12px;line-height:1.5;color:#72807b;font-family:system-ui,sans-serif;">
            Behandeln Sie diesen Link wie ein Passwort. Teilen Sie ihn nicht mit Dritten.
            Bei Fragen: ${escapeHtml(siteConfig.operator.email)}
          </p>
        </td></tr>
        <tr><td style="height:4px;background:linear-gradient(to right,#b8925f,#d9c4a0,#b8925f);"></td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildEditLinkText(params: EditLinkEmailParams): string {
  return `Prophylaxe-Erinnerung — Ihr Bearbeitungs-Link

Hallo,

für "${params.practiceName}" wurde ein Patienten-Link erstellt.

Patienten-Link (für QR-Code & Flyer):
${params.patientUrl}

Bearbeitungs-Link (geheim — bitte speichern):
${params.editUrl}

Behandeln Sie diesen Link wie ein Passwort.

Bei Fragen: ${siteConfig.operator.email}
`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type SendEmailResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "send_failed"; message?: string };

export async function sendEditLinkEmail(
  params: EditLinkEmailParams,
): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.EMAIL_FROM ??
    "Prophylaxe-Erinnerung <onboarding@resend.dev>";

  if (!apiKey) {
    console.info("[email] RESEND_API_KEY fehlt — E-Mail nicht gesendet:");
    console.info(buildEditLinkText(params));
    return { ok: false, reason: "not_configured" };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from,
      to: params.to,
      subject: `Ihr Bearbeitungs-Link — ${params.practiceName}`,
      html: buildEditLinkHtml(params),
      text: buildEditLinkText(params),
    });

    if (error) {
      console.error("[email] Resend error:", error);
      return { ok: false, reason: "send_failed", message: error.message };
    }

    return { ok: true };
  } catch (err) {
    console.error("[email] send failed:", err);
    return {
      ok: false,
      reason: "send_failed",
      message: err instanceof Error ? err.message : "Unbekannter Fehler",
    };
  }
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
