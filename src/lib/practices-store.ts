import { Redis } from "@upstash/redis";
import { promises as fs } from "fs";
import path from "path";
import type { PracticeData } from "./practice-data";
import {
  toPublicPractice,
  type StoredPractice,
} from "./practice-auth";

const DATA_PATH = path.join(process.cwd(), "data/practices.json");

type PracticeStore = Record<string, StoredPractice>;

function practiceKey(slug: string): string {
  return `practice:${slug}`;
}

export type PracticeStorageErrorCode =
  | "redis_not_configured"
  | "redis_error"
  | "file_write_error";

export class PracticeStorageError extends Error {
  readonly code: PracticeStorageErrorCode;

  constructor(message: string, code: PracticeStorageErrorCode) {
    super(message);
    this.name = "PracticeStorageError";
    this.code = code;
  }
}

function isRedisConfigured(): boolean {
  return Boolean(
    (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) ||
      (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN),
  );
}

function assertStorageAvailable(): void {
  if (isRedisConfigured()) return;

  if (process.env.VERCEL === "1") {
    throw new PracticeStorageError(
      "Speicher nicht eingerichtet: Bitte Upstash Redis im Vercel-Dashboard verbinden (Marketplace → Upstash → Redis) und neu deployen.",
      "redis_not_configured",
    );
  }
}

function getRedis(): Redis {
  return Redis.fromEnv();
}

async function readFileStore(): Promise<PracticeStore> {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    const parsed = JSON.parse(raw) as Record<string, StoredPractice | PracticeData>;
    const store: PracticeStore = {};

    for (const [key, value] of Object.entries(parsed)) {
      store[key] = normalizeStored(value, key);
    }

    return store;
  } catch {
    return {};
  }
}

function normalizeStored(
  value: StoredPractice | PracticeData,
  slug: string,
): StoredPractice {
  return {
    ...value,
    slug,
    editToken:
      "editToken" in value && typeof value.editToken === "string"
        ? value.editToken
        : "",
  };
}

async function writeFileStore(store: PracticeStore): Promise<void> {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, `${JSON.stringify(store, null, 2)}\n`, "utf-8");
}

async function getFromRedis(slug: string): Promise<StoredPractice | null> {
  const redis = getRedis();
  const data = await redis.get<StoredPractice>(practiceKey(slug));
  if (!data) return null;
  return normalizeStored(data, slug);
}

async function saveToRedis(data: StoredPractice): Promise<void> {
  try {
    const redis = getRedis();
    await redis.set(practiceKey(data.slug), data);
  } catch (error) {
    console.error("Redis save failed:", error);
    throw new PracticeStorageError(
      "Speichern in Redis fehlgeschlagen. Bitte UPSTASH_REDIS_REST_URL und UPSTASH_REDIS_REST_TOKEN in Vercel prüfen.",
      "redis_error",
    );
  }
}

async function deleteFromRedis(slug: string): Promise<void> {
  const redis = getRedis();
  await redis.del(practiceKey(slug));
}

export async function getStoredPracticeBySlug(
  slug: string,
): Promise<StoredPractice | null> {
  if (isRedisConfigured()) {
    const fromRedis = await getFromRedis(slug);
    if (fromRedis) return fromRedis;
  }

  const store = await readFileStore();
  const practice = store[slug];
  if (!practice) return null;

  return { ...practice, slug };
}

export async function getPublicPracticeBySlug(
  slug: string,
): Promise<PracticeData | null> {
  const stored = await getStoredPracticeBySlug(slug);
  if (!stored) return null;
  return toPublicPractice(stored);
}

export async function savePractice(data: StoredPractice): Promise<void> {
  assertStorageAvailable();

  if (isRedisConfigured()) {
    await saveToRedis(data);
    return;
  }

  try {
    const store = await readFileStore();
    store[data.slug] = data;
    await writeFileStore(store);
  } catch (error) {
    console.error("File store save failed:", error);
    throw new PracticeStorageError(
      "Speichern fehlgeschlagen. Bitte erneut versuchen.",
      "file_write_error",
    );
  }
}

export async function deletePracticeBySlug(slug: string): Promise<void> {
  if (isRedisConfigured()) {
    await deleteFromRedis(slug);
    return;
  }

  const store = await readFileStore();
  delete store[slug];
  await writeFileStore(store);
}

export function getStorageBackend(): "redis" | "file" {
  return isRedisConfigured() ? "redis" : "file";
}
