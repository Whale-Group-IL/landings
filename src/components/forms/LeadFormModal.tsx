'use client';

import { useState } from 'react';
import type { TenantCta, TenantTheme } from '@/types/tenant';
import { LeadFormInline } from './LeadFormInline';

interface Props {
  ctaText: string;
  cta: TenantCta;
  theme: TenantTheme;
  variant?: 'primary' | 'inverted';
}

export function LeadFormModal({ ctaText, cta, theme, variant = 'primary' }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full px-6 py-3 rounded-xl font-bold text-sm transition-opacity hover:opacity-90"
        style={
          variant === 'inverted'
            ? { backgroundColor: 'white', color: theme.primaryColor }
            : { backgroundColor: theme.primaryColor, color: 'white' }
        }
      >
        {ctaText}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">{ctaText}</h3>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>
            <LeadFormInline ctaText={ctaText} cta={cta} theme={theme} />
          </div>
        </div>
      )}
    </>
  );
}
