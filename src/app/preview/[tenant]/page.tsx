/**
 * /preview/[tenant] — public demo route.
 *
 * Looks up the tenant by slug directly in KV (not by hostname).
 * Works in production — safe to share with prospects:
 *   https://landings.whaledigital.co.il/preview/template-expert-ru
 *   https://landings.whaledigital.co.il/preview/template-expert-he
 *   https://landings.whaledigital.co.il/preview/template-expert-en
 *   https://landings.whaledigital.co.il/preview/noplanculture
 */
import { notFound } from 'next/navigation';
import { getTenantConfig } from '@/lib/tenant';
import { LandingRenderer } from '@/components/LandingRenderer';
import type { Metadata } from 'next';

async function getKV(): Promise<any> {
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare');
    const ctx = await getCloudflareContext({ async: true });
    return (ctx.env as any).TENANTS_KV ?? null;
  } catch {
    return null;
  }
}

interface Props {
  params: Promise<{ tenant: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tenant } = await params;
  const kv = process.env.NODE_ENV === 'production' ? await getKV() : null;
  const config = await getTenantConfig(tenant, kv);
  if (!config) return { title: `Demo: ${tenant}` };
  return {
    title: config.meta.title,
    description: config.meta.description,
    robots: { index: false, follow: false },
  };
}

export default async function PreviewPage({ params }: Props) {
  const { tenant } = await params;
  const kv = process.env.NODE_ENV === 'production' ? await getKV() : null;
  const config = await getTenantConfig(tenant, kv);

  if (!config) notFound();

  return <LandingRenderer config={config!} />;
}
