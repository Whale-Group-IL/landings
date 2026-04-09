'use client';

import { useState, useTransition } from 'react';
import type { TenantCta, TenantCrm, TenantTheme } from '@/types/tenant';
import { trackLead } from '@/components/analytics/AnalyticsInit';

interface Props {
  ctaText: string;
  cta: TenantCta;
  crm?: TenantCrm;
  tenantId?: string;
  theme: TenantTheme;
  variant?: 'primary' | 'inverted';
}

export function LeadFormInline({
  ctaText,
  cta,
  crm,
  tenantId,
  theme,
  variant = 'primary',
}: Props) {
  // For booking/payment types, just show a button
  if (cta.type === 'booking' && cta.calendlyUrl) {
    return (
      <a
        href={cta.calendlyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-8 py-4 rounded-xl font-bold text-lg transition-opacity hover:opacity-90"
        style={
          variant === 'inverted'
            ? { backgroundColor: 'white', color: theme.primaryColor }
            : { backgroundColor: theme.primaryColor, color: 'white' }
        }
      >
        {ctaText}
      </a>
    );
  }

  if (cta.type === 'payment' && cta.paymentUrl) {
    return (
      <a
        href={cta.paymentUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-8 py-4 rounded-xl font-bold text-lg transition-opacity hover:opacity-90"
        style={
          variant === 'inverted'
            ? { backgroundColor: 'white', color: theme.primaryColor }
            : { backgroundColor: theme.primaryColor, color: 'white' }
        }
      >
        {ctaText}
      </a>
    );
  }

  return (
    <LeadForm
      ctaText={ctaText}
      crm={crm}
      tenantId={tenantId}
      theme={theme}
      variant={variant}
    />
  );
}

interface LeadFormProps {
  ctaText: string;
  crm?: TenantCrm;
  tenantId?: string;
  theme: TenantTheme;
  variant: 'primary' | 'inverted';
}

function LeadForm({ ctaText, crm, tenantId, theme, variant }: LeadFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const inputClass =
    'w-full px-4 py-3 rounded-xl border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 text-sm';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    startTransition(async () => {
      try {
        const res = await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            phone,
            tenantId: tenantId ?? 'unknown',
            source: crm?.source ?? 'landing',
            webhookUrl: crm?.webhookUrl,
          }),
        });

        if (!res.ok) throw new Error('submission failed');

        trackLead({ tenantId: tenantId ?? '', source: crm?.source ?? '' });
        setSubmitted(true);
      } catch {
        setError('שגיאה בשליחה. נסה שוב.');
      }
    });
  }

  if (submitted) {
    return (
      <div
        className={`text-center py-4 px-6 rounded-xl font-semibold ${
          variant === 'inverted'
            ? 'bg-white/20 text-white'
            : 'text-white'
        }`}
        style={variant !== 'inverted' ? { backgroundColor: theme.primaryColor } : {}}
      >
        ✓ תודה! נחזור אליך בקרוב.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
      <input
        type="text"
        placeholder="שם מלא"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className={inputClass}
        style={{ borderColor: variant === 'inverted' ? 'rgba(255,255,255,0.3)' : '#e5e7eb' }}
      />
      <input
        type="tel"
        placeholder="טלפון"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        className={inputClass}
        style={{ borderColor: variant === 'inverted' ? 'rgba(255,255,255,0.3)' : '#e5e7eb' }}
      />
      <button
        type="submit"
        disabled={isPending}
        className="flex-shrink-0 px-6 py-3 rounded-xl font-bold text-sm transition-opacity hover:opacity-90 disabled:opacity-60 whitespace-nowrap"
        style={
          variant === 'inverted'
            ? { backgroundColor: 'white', color: theme.primaryColor }
            : { backgroundColor: theme.primaryColor, color: 'white' }
        }
      >
        {isPending ? '...' : ctaText}
      </button>
      {error && (
        <p className="text-red-400 text-xs mt-1 sm:col-span-3">{error}</p>
      )}
    </form>
  );
}
