import type { TenantConfig } from '@/types/tenant';

/**
 * Fetch tenant config from Cloudflare KV using the hostname as the key.
 * Falls back to the default tenant config for localhost / unknown hosts.
 *
 * KV key format: hostname (e.g. "dentist-haifa.whaledigital.co.il")
 * KV value: JSON-serialized TenantConfig
 *
 * Usage (server component / route handler):
 *   import { getCloudflareContext } from '@opennextjs/cloudflare';
 *   const ctx = await getCloudflareContext({ async: true });
 *   const config = await getTenantConfig(hostname, ctx.env.TENANTS_KV);
 */
export async function getTenantConfig(
  hostname: string,
  kv: KVNamespace | null
): Promise<TenantConfig | null> {
  if (!kv) return null;

  try {
    const raw = await kv.get(hostname);
    if (!raw) return null;
    return JSON.parse(raw) as TenantConfig;
  } catch {
    return null;
  }
}

/**
 * Normalize hostname: strip port and "www." prefix.
 */
export function normalizeHostname(host: string): string {
  return host.replace(/:\d+$/, '').replace(/^www\./, '');
}

// Minimal KVNamespace type for environments that don't import wrangler types
interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
}
