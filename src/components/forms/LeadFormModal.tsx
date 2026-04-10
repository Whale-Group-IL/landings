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
        className="w-full px-6 py-3.5 rounded-xl font-bold text-sm shadow-sm hover:shadow-md hover:opacity-90"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">{ctaText}</h3>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 text-xl leading-none"
                aria-label="Close"
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
