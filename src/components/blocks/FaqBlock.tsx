'use client';

import { useState } from 'react';
import type { FaqBlock as FaqBlockData, TenantTheme } from '@/types/tenant';

interface Props {
  data: FaqBlockData;
  theme: TenantTheme;
}

export function FaqBlock({ data, theme }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-white px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
          {data.title}
        </h2>

        <div className="space-y-3">
          {data.items.map((item, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                className="w-full flex justify-between items-center px-5 py-4 text-start font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span>{item.question}</span>
                <span
                  className="ms-4 flex-shrink-0 text-xl font-light"
                  style={{ color: theme.primaryColor }}
                >
                  {openIndex === i ? '−' : '+'}
                </span>
              </button>
              {openIndex === i && (
                <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
