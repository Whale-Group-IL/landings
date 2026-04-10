import { headers } from 'next/headers';
import { getTenantConfig, normalizeHostname } from '@/lib/tenant';
import { LandingRenderer } from '@/components/LandingRenderer';
import { NotFound } from '@/components/NotFound';
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

async function getConfig() {
  const headersList = await headers();
  const hostname = normalizeHostname(headersList.get('x-tenant-host') ?? '');
  const kv = process.env.NODE_ENV === 'production' ? await getKV() : null;
  return { config: await getTenantConfig(hostname, kv), hostname };
}

export async function generateMetadata(): Promise<Metadata> {
  const { config } = await getConfig();
  if (!config) return { title: 'Coming Soon' };

  return {
    title: config.meta.title,
    description: config.meta.description,
    keywords: config.meta.keywords,
    openGraph: {
      title: config.meta.title,
      description: config.meta.description,
      images: config.meta.ogImage ? [config.meta.ogImage] : [],
    },
  };
}

export default async function LandingPage() {
  const { config, hostname } = await getConfig();

  if (!config) {
    return <NotFound hostname={hostname} />;
  }

  return <LandingRenderer config={config} />;
}
