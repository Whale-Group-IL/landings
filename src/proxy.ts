import { NextRequest, NextResponse } from 'next/server';
import { normalizeHostname } from '@/lib/hostname';

/**
 * Multi-tenant proxy (Next.js 16 — replaces middleware.ts).
 *
 * Reads the hostname and forwards it as x-tenant-host header so
 * server components can fetch the correct tenant config from Cloudflare KV.
 */
export function proxy(request: NextRequest) {
  const hostname = normalizeHostname(request.headers.get('host') ?? '');
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-tenant-host', hostname);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const matcher = [
  // Skip Next.js internals and static files
  '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)).*)',
];
