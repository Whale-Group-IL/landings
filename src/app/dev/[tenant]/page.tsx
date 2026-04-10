/**
 * /dev/[tenant] — local preview route.
 *
 * Load any tenant by filename without restarting the server:
 *   http://localhost:3000/dev/noplanculture
 *   http://localhost:3000/dev/_template-expert-ru
 *
 * Only available in development (returns 404 in production).
 */
import { notFound } from 'next/navigation';
import { LandingRenderer } from '@/components/LandingRenderer';
import type { TenantConfig } from '@/types/tenant';
import type { Metadata } from 'next';

async function loadTenant(slug: string): Promise<TenantConfig | null> {
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
  const config = await loadTenant(tenant);
  if (!config) return { title: `Preview: ${tenant}` };
  return { title: `[DEV] ${config.meta.title}` };
}

export default async function DevPreviewPage({ params }: Props) {
  if (process.env.NODE_ENV === 'production') notFound();

  const { tenant } = await params;
  const config = await loadTenant(tenant);

  if (!config) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
        <p className="text-2xl font-bold text-gray-800">Tenant not found</p>
        <p className="text-gray-500">
          Create <code className="bg-gray-100 px-2 py-1 rounded">tenants/{tenant}.json</code> to preview it here.
        </p>
      </div>
    );
  }

  return <LandingRenderer config={config} />;
}
