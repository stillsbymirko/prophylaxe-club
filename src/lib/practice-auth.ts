import { randomUUID } from "crypto";
import type { PracticeData } from "./practice-data";

/** Full record as stored server-side — includes secret edit token. */
export interface StoredPractice extends PracticeData {
  editToken: string;
  /** Praxis-interne E-Mail zum Versand des Bearbeitungs-Links */
  ownerEmail?: string;
}

export function generateEditToken(): string {
  return randomUUID();
}

export function toPublicPractice(stored: StoredPractice): PracticeData {
  const { editToken: _token, ownerEmail: _email, ...publicData } = stored;
  return publicData;
}

export function verifyEditToken(
  stored: StoredPractice | null,
  token: string | null | undefined,
): boolean {
  if (!stored?.editToken || !token) return false;
  return stored.editToken === token;
}
