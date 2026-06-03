import type { PracticeData } from "./practice-data";
import { siteConfig } from "./site-config";
import { getPzrSubsidyInfoUrl } from "./pzr-insurance-subsidies";
import { formatGermanDate } from "./date-logic";

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

function formatIcsDate(date: Date): string {
  return (
    `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}` +
    `T${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`
  );
}

function escapeIcsText(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

function generateUid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}@${siteConfig.domain}`;
}

export function generateIcsFile(
  practice: PracticeData,
  reminderDate: Date,
): string {
  const dtStart = formatIcsDate(reminderDate);
  const dtEnd = formatIcsDate(
    new Date(reminderDate.getTime() + 60 * 60 * 1000),
  );
  const dtStamp = formatIcsDate(new Date());
  const uid = generateUid();

  const summary = `🦷 Prophylaxe-Termin buchen (${practice.name})`;
  const pzrInfoUrl = getPzrSubsidyInfoUrl();
  const description = escapeIcsText(
    `Erinnerung: Die Termine für Ihr Prophylaxe-Quartal wurden freigeschaltet. ` +
      `Jetzt direkt online buchen unter: ${practice.bookingUrl} ` +
      `oder telefonisch unter ${practice.phone}.\n\n` +
      `Tipp: Viele Krankenkassen bezuschussen die professionelle Zahnreinigung (PZR). ` +
      `Infos zu möglichen Zuschüssen: ${pzrInfoUrl}`,
  );

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${siteConfig.name}//DE`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VTIMEZONE",
    "TZID:Europe/Berlin",
    "BEGIN:STANDARD",
    "DTSTART:19701025T030000",
    "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU",
    "TZOFFSETFROM:+0200",
    "TZOFFSETTO:+0100",
    "END:STANDARD",
    "BEGIN:DAYLIGHT",
    "DTSTART:19700329T020000",
    "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU",
    "TZOFFSETFROM:+0100",
    "TZOFFSETTO:+0200",
    "END:DAYLIGHT",
    "END:VTIMEZONE",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART;TZID=Europe/Berlin:${dtStart}`,
    `DTEND;TZID=Europe/Berlin:${dtEnd}`,
    `SUMMARY:${escapeIcsText(summary)}`,
    `DESCRIPTION:${description}`,
    "BEGIN:VALARM",
    "TRIGGER:PT0M",
    "ACTION:DISPLAY",
    "DESCRIPTION:Erinnerung: Prophylaxe-Termin buchen!",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadIcsFile(
  practice: PracticeData,
  reminderDate: Date,
): void {
  const content = generateIcsFile(practice, reminderDate);
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `prophylaxe-erinnerung-${formatGermanDate(reminderDate).replace(/\s/g, "-")}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
