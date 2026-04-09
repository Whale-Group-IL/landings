import { NextRequest, NextResponse } from 'next/server';
import { normalizeHostname } from '@/lib/hostname';

/**
 * Multi-tenant middleware.
 *
 * Reads the hostname from every incoming request and forwards it as
 * x-tenant-host header so server components can fetch the correct
 * tenant config from Cloudflare KV.
 *
 * The actual KV lookup happens in the page/layout server components because
 * Next.js middleware runs in the Edge runtime and cannot use
 * getCloudflareContext() to access KV bindings directly.
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
