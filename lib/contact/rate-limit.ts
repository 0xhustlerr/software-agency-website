import "server-only";

/**
 * Fixed-window rate limit per client IP, in memory. Good enough for a single
 * server or a low-traffic serverless deployment; for many instances, swap in
 * a shared store (e.g. Upstash Redis) behind the same function.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

export function allowRequest(key: string, now: number) {
  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    if (hits.size > 5000) for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
    return true;
  }
  entry.count += 1;
  return entry.count <= MAX;
}
