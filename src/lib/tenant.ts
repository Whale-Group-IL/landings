import { cache } from 'react';
import type { TenantConfig } from '@/types/tenant';

/**
 * Normalize hostname: strip port and "www." prefix.
 */
export function normalizeHostname(host: string): string {
  return host.replace(/:\d+$/, '').replace(/^www\./, '');
}

/**
 * Fetch tenant config from Cloudflare KV using the hostname as the key.
 *
 * Wrapped in React cache() so multiple server components in the same
 * request tree (layout + page) share a single KV read — no double fetch.
 *
 * KV key format: normalized hostname  e.g. "dentist-haifa.whaledigital.co.il"
 * KV value: JSON-serialized TenantConfig
 */
export const getTenantConfig = cache(async (
  hostname: string,
  kv: KVNamespace | null
): Promise<TenantConfig | null> => {
  if (!kv || !hostname) return null;

  try {
    const raw = await kv.get(hostname);
    if (!raw) return null;
    return JSON.parse(raw) as TenantConfig;
  } catch {
    return null;
  }
});

// Minimal KVNamespace type — avoids importing the full wrangler package
interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
}
