import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { getTenantConfig, normalizeHostname } from '@/lib/tenant';
import { sanitizeColor } from '@/lib/color';
import { AnalyticsInit } from '@/components/analytics/AnalyticsInit';
import './globals.css';

export const metadata: Metadata = {
  title: 'Landing',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const hostname = normalizeHostname(headersList.get('x-tenant-host') ?? '');

  let config = null;
  try {
    const ctx = await getCloudflareContext({ async: true });
    const kv = (ctx.env as any).TENANTS_KV ?? null;
    config = await getTenantConfig(hostname, kv);
  } catch {
    // local dev — no KV available
  }

  const lang = config?.meta.lang ?? 'he';
  const dir = config?.meta.dir ?? 'rtl';
  // sanitizeColor prevents CSS injection if KV config is tampered with
  const primaryColor = sanitizeColor(config?.theme.primaryColor, '#2563eb');

  return (
    <html lang={lang} dir={dir}>
      <head>
        <style>{`:root { --primary: ${primaryColor}; }`}</style>
        {config?.meta.favicon && (
          <link rel="icon" href={config.meta.favicon} />
        )}
        {/* Google Fonts: load both, CSS above selects by dir */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {config && <AnalyticsInit analytics={config.analytics} />}
        {children}
      </body>
    </html>
  );
}
