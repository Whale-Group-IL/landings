import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { getTenantConfig, normalizeHostname } from '@/lib/tenant';

interface LeadPayload {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  tenantId: string;
  source: string;
  // webhookUrl intentionally NOT accepted from client — SSRF prevention.
  // The CRM URL is resolved server-side from KV config or env var only.
}

export async function POST(request: NextRequest) {
  let body: LeadPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { name, phone, tenantId, source } = body;

  if (!name?.trim() || !phone?.trim() || !tenantId || !source) {
    return NextResponse.json(
      { error: 'name, phone, tenantId, source are required' },
      { status: 400 }
    );
  }

  // Resolve CRM webhook URL: per-tenant KV config > env var.
  // Never trust a URL from the client request body.
  let crmUrl: string | null = process.env.CRM_WEBHOOK_URL ?? null;

  try {
    const hostname = normalizeHostname(request.headers.get('host') ?? '');
    const ctx = await getCloudflareContext({ async: true });
    const kv = (ctx.env as any).TENANTS_KV ?? null;
    const config = await getTenantConfig(hostname, kv);
    if (config?.crm.webhookUrl) {
      crmUrl = config.crm.webhookUrl;
    }
  } catch {
    // local dev or KV unavailable — fall through to env var
  }

  if (!crmUrl) {
    console.error('[lead] No CRM_WEBHOOK_URL configured for', tenantId);
    // Still return 200 to the user — don't expose config errors externally
    return NextResponse.json({ success: true });
  }

  try {
    const crmResponse = await fetch(crmUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.trim(),
        phone: phone.trim(),
        email: body.email?.trim(),
        message: body.message?.trim(),
        source,
        tenantId,
        createdAt: new Date().toISOString(),
        metadata: {
          userAgent: request.headers.get('user-agent'),
          referer: request.headers.get('referer'),
          ip: request.headers.get('cf-connecting-ip'),
          country: request.headers.get('cf-ipcountry'),
        },
      }),
    });

    if (!crmResponse.ok) {
      console.error('[lead] CRM error:', crmResponse.status, await crmResponse.text());
      // Return 200 to user — CRM failure is an internal concern
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[lead] Submission error:', err);
    return NextResponse.json({ success: true });
  }
}
