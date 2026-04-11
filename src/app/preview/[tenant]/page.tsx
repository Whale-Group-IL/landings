/**
 * /preview/[tenant] — public demo route.
 *
 * Looks up the tenant by slug directly in KV (not by hostname).
 * Works in production — safe to share with prospects:
 *   https://landings.whaledigital.co.il/preview/_template-expert-ru
 *   https://landings.whaledigital.co.il/preview/_template-expert-he
 *   https://landings.whaledigital.co.il/preview/_template-expert-en
 *   https://landings.whaledigital.co.il/preview/noplanculture
 *
 * In local dev, falls back to tenants/{slug}.json if KV isn't available.
 */
import { notFound } from 'next/navigation';
import { LandingRenderer } from '@/components/LandingRenderer';
import type { TenantConfig } from '@/types/tenant';
import type { Metadata } from 'next';

async function loadBySlug(slug: string): Promise<TenantConfig | null> {
  // ── Production: read from Cloudflare KV by slug ──────────────────────────
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare');
    const ctx = await getCloudflareContext({ async: true });
    const kv = (ctx.env as any).TENANTS_KV;
    if (kv) {
      const raw = await kv.get(slug);
      if (raw) return JSON.parse(raw) as TenantConfig;
    }
  } catch {
    // Not in Cloudflare runtime — fall through to local dev
  }

  // ── Local dev: read from tenants/ directory ───────────────────────────────
  if (process.env.NODE_ENV === 'production') return null;

  try {
    const { readFileSync } = await import('fs');
    const { join } = await import('path');
    const raw = readFileSync(join(process.cwd(), 'tenants', `${slug}.json`), 'utf-8');
    return JSON.parse(raw) as TenantConfig;
  } catch {
    return null;
  }
}

interface Props {
  params: Promise<{ tenant: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tenant } = await params;
  const config = await loadBySlug(tenant);
  if (!config) return { title: `Demo: ${tenant}` };
  return {
    title: config.meta.title,
    description: config.meta.description,
    // No indexing for preview pages
    robots: { index: false, follow: false },
  };
}

export default async function PreviewPage({ params }: Props) {
  const { tenant } = await params;
  const config = await loadBySlug(tenant);

  if (!config) notFound();

  return <LandingRenderer config={config} />;
}
