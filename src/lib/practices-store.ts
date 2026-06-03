import { Redis } from "@upstash/redis";
import { promises as fs } from "fs";
import path from "path";
import type { PracticeData } from "./practice-data";

const DATA_PATH = path.join(process.cwd(), "data/practices.json");

type PracticeStore = Record<string, PracticeData>;

function practiceKey(slug: string): string {
  return `practice:${slug}`;
}

function isRedisConfigured(): boolean {
  return Boolean(
    (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) ||
      (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN),
  );
}

function getRedis(): Redis {
  return Redis.fromEnv();
}

async function readFileStore(): Promise<PracticeStore> {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    return JSON.parse(raw) as PracticeStore;
  } catch {
    return {};
  }
}

async function writeFileStore(store: PracticeStore): Promise<void> {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, `${JSON.stringify(store, null, 2)}\n`, "utf-8");
}

async function getFromRedis(slug: string): Promise<PracticeData | null> {
  const redis = getRedis();
  return (await redis.get<PracticeData>(practiceKey(slug))) ?? null;
}

async function saveToRedis(data: PracticeData): Promise<void> {
  const redis = getRedis();
  await redis.set(practiceKey(data.slug), data);
}

export async function getPracticeBySlug(
  slug: string,
): Promise<PracticeData | null> {
  if (isRedisConfigured()) {
    const fromRedis = await getFromRedis(slug);
    if (fromRedis) return { ...fromRedis, slug };
  }

  const store = await readFileStore();
  const practice = store[slug];
  if (!practice) return null;

  return { ...practice, slug };
}

export async function savePractice(data: PracticeData): Promise<void> {
  if (isRedisConfigured()) {
    await saveToRedis(data);
    return;
  }

  const store = await readFileStore();
  store[data.slug] = data;
  await writeFileStore(store);
}

export function getStorageBackend(): "redis" | "file" {
  return isRedisConfigured() ? "redis" : "file";
}
