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
    <section className="py-24 md:py-32 bg-gray-50 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {data.title}
          </h2>
        </div>

        <div className="space-y-2">
          {data.items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <button
                  className="w-full flex justify-between items-center px-6 py-5 text-start hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-gray-900 text-[15px] me-4">
                    {item.question}
                  </span>
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-200 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                    style={{
                      backgroundColor: `${theme.primaryColor}15`,
                      color: theme.primaryColor,
                    }}
                    aria-hidden
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3">
                      <line
                        x1="8" y1="2" x2="8" y2="14"
                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                      />
                      <line
                        x1="2" y1="8" x2="14" y2="8"
                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
