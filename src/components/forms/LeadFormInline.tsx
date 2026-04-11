'use client';

import { useState, useTransition } from 'react';
import type { TenantCta, TenantCrm, TenantStrings, TenantTheme } from '@/types/tenant';
import { trackLead } from '@/components/analytics/AnalyticsInit';

interface Props {
  ctaText: string;
  cta: TenantCta;
  crm?: TenantCrm;
  tenantId?: string;
  theme: TenantTheme;
  strings?: TenantStrings;
  variant?: 'primary' | 'inverted';
}

export function LeadFormInline({
  ctaText,
  cta,
  crm,
  tenantId,
  theme,
  strings,
  variant = 'primary',
}: Props) {
  if (cta.type === 'booking' && cta.calendlyUrl) {
    return (
      <a
        href={cta.calendlyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-8 py-4 rounded-xl font-bold text-base shadow-sm hover:shadow-md hover:opacity-90"
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
        className="inline-block px-8 py-4 rounded-xl font-bold text-base shadow-sm hover:shadow-md hover:opacity-90"
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
      strings={strings}
      variant={variant}
    />
  );
}

interface LeadFormProps {
  ctaText: string;
  crm?: TenantCrm;
  tenantId?: string;
  theme: TenantTheme;
  strings?: TenantStrings;
  variant: 'primary' | 'inverted';
}

function LeadForm({ ctaText, crm, tenantId, theme, strings, variant }: LeadFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const namePlaceholder = strings?.namePlaceholder ?? 'Full name';
  const phonePlaceholder = strings?.phonePlaceholder ?? 'Phone';
  const successMsg = strings?.submitSuccess ?? "✓ Thank you! We'll be in touch soon.";
  const errorMsg = strings?.submitError ?? 'Error submitting. Please try again.';

  const isInverted = variant === 'inverted';

  const inputClass = [
    'w-full px-4 py-3.5 rounded-xl text-sm',
    'placeholder:text-gray-400 focus:outline-none focus:ring-2',
    isInverted
      ? 'bg-white/10 border border-white/25 text-white placeholder:text-white/50 focus:ring-white/40'
      : 'bg-white border border-gray-200 text-gray-900 focus:ring-2 focus:border-transparent shadow-sm',
  ].join(' ');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    startTransition(async () => {
      try {
        const res = await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim(),
            phone: phone.trim(),
            tenantId: tenantId ?? 'unknown',
            source: crm?.source ?? 'landing',
            // webhookUrl is intentionally omitted — resolved server-side only
          }),
        });

        if (!res.ok) throw new Error('submission failed');

        trackLead({ tenantId: tenantId ?? '', source: crm?.source ?? '' });
        setSubmitted(true);
      } catch {
        setError(errorMsg);
      }
    });
  }

  if (submitted) {
    return (
      <div
        className={`text-center py-4 px-8 rounded-xl font-semibold ${
          isInverted ? 'bg-white/20 text-white' : 'text-white'
        }`}
        style={!isInverted ? { backgroundColor: theme.primaryColor } : {}}
        role="status"
      >
        {successMsg}
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3"
      >
        <input
          type="text"
          placeholder={namePlaceholder}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={inputClass}
          style={
            !isInverted
              ? { '--tw-ring-color': theme.primaryColor } as React.CSSProperties
              : {}
          }
        />
        <input
          type="tel"
          placeholder={phonePlaceholder}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className={inputClass}
          style={
            !isInverted
              ? { '--tw-ring-color': theme.primaryColor } as React.CSSProperties
              : {}
          }
        />
        <button
          type="submit"
          disabled={isPending}
          className="flex-shrink-0 px-7 py-3.5 rounded-xl font-bold text-sm whitespace-nowrap shadow-sm hover:shadow-md hover:opacity-90 disabled:opacity-60"
          style={
            isInverted
              ? { backgroundColor: 'white', color: theme.primaryColor }
              : { backgroundColor: theme.primaryColor, color: 'white' }
          }
        >
          {isPending ? '…' : ctaText}
        </button>
      </form>
      {error && (
        <p
          className={`text-xs mt-2 ${isInverted ? 'text-white/70' : 'text-red-500'}`}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
