import { NextRequest, NextResponse } from 'next/server';
import { normalizeHostname } from '@/lib/hostname';

/**
 * Edge Middleware — runs on Cloudflare Workers (Edge Runtime).
 *
 * Reads the hostname and forwards it as x-tenant-host header so
 * server components can fetch the correct tenant config from Cloudflare KV.
 *
 * Note: Next.js 16 introduces proxy.ts as the future convention, but
 * @opennextjs/cloudflare requires Edge Runtime which proxy.ts doesn't
 * support yet. We keep middleware.ts until OpenNext adds proxy support.
 */
export function middleware(request: NextRequest) {
  const hostname = normalizeHostname(request.headers.get('host') ?? '');
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-tenant-host', hostname);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)).*)',
  ],
};
