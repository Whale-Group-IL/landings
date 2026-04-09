import { NextRequest, NextResponse } from 'next/server';

interface LeadPayload {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  tenantId: string;
  source: string;
  webhookUrl?: string;
}

export async function POST(request: NextRequest) {
  let body: LeadPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { name, phone, tenantId, source, webhookUrl } = body;

  if (!name || !phone || !tenantId || !source) {
    return NextResponse.json(
      { error: 'name, phone, tenantId, source are required' },
      { status: 400 }
    );
  }

  // Determine CRM webhook URL: per-tenant override > env var > fallback
  const crmUrl =
    webhookUrl ||
    process.env.CRM_WEBHOOK_URL ||
    (process.env as any).CRM_WEBHOOK_URL;

  if (!crmUrl) {
    console.error('No CRM_WEBHOOK_URL configured');
    return NextResponse.json({ error: 'CRM not configured' }, { status: 500 });
  }

  try {
    const crmResponse = await fetch(crmUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: body.name,
        phone: body.phone,
        email: body.email,
        message: body.message,
        source: source,
        tenantId: tenantId,
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
      const text = await crmResponse.text();
      console.error('CRM error:', crmResponse.status, text);
      return NextResponse.json(
        { error: 'CRM request failed' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Lead submission error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
