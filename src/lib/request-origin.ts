import { headers } from "next/headers";
import { siteConfig } from "./site-config";

export function originFromHeaders(
  host: string | null,
  proto: string | null,
): string {
  if (host) {
    return `${proto ?? "https"}://${host}`;
  }
  return siteConfig.url;
}

export async function getServerOrigin(): Promise<string> {
  const h = await headers();
  return originFromHeaders(
    h.get("x-forwarded-host") ?? h.get("host"),
    h.get("x-forwarded-proto"),
  );
}

export function getRequestOrigin(request: Request): string {
  return originFromHeaders(
    request.headers.get("x-forwarded-host") ?? request.headers.get("host"),
    request.headers.get("x-forwarded-proto"),
  );
}
