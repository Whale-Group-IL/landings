import { cache } from 'react';
import type { TenantConfig } from '@/types/tenant';

// Re-export so existing imports from '@/lib/tenant' still work
export { normalizeHostname } from '@/lib/hostname';

/**
 * Fetch tenant config.
 *
 * Priority:
 *   1. Cloudflare KV (production) — key = normalized hostname
 *   2. Local file fallback (dev) — reads tenants/{hostname}.json,
 *      then tenants/{TENANT_DEV_HOST}.json if hostname file not found
 *
 * Wrapped in React cache() so layout + page share one read per request.
 * NOTE: this file must NOT be imported by middleware (Edge Runtime).
 *       Middleware imports normalizeHostname from @/lib/hostname instead.
 */
export const getTenantConfig = cache(async (
  hostname: string,
  kv: KVNamespace | null
): Promise<TenantConfig | null> => {
  // ── Production: Cloudflare KV ────────────────────────────────────────────
  if (kv && hostname) {
    try {
      const raw = await kv.get(hostname);
      if (!raw) return null;
      return JSON.parse(raw) as TenantConfig;
    } catch {
      return null;
    }
  }

  // ── Local dev: read from tenants/ directory ──────────────────────────────
  // Only runs in Node.js runtime (pages/layouts), never in Edge middleware.
  if (process.env.NODE_ENV === 'production') return null;

  try {
    const { readFileSync } = await import('fs');
    const { join } = await import('path');

    const candidates = [
      // Exact hostname match: "noplanculture.co.il" → tenants/noplanculture.co.il.json
      join(process.cwd(), 'tenants', `${hostname}.json`),
      // TENANT_DEV_HOST override: "noplanculture" → tenants/noplanculture.json
      ...(process.env.TENANT_DEV_HOST
        ? [join(process.cwd(), 'tenants', `${process.env.TENANT_DEV_HOST}.json`)]
        : []),
    ];

    for (const filePath of candidates) {
      try {
        const raw = readFileSync(filePath, 'utf-8');
        return JSON.parse(raw) as TenantConfig;
      } catch {
        // try next candidate
      }
    }
  } catch {
    // fs unavailable
  }

  return null;
});

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
}
