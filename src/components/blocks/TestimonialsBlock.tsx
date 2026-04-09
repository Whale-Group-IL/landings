import Image from 'next/image';
import type { TestimonialsBlock as TestimonialsBlockData, TenantTheme } from '@/types/tenant';

interface Props {
  data: TestimonialsBlockData;
  theme: TenantTheme;
}

export function TestimonialsBlock({ data, theme }: Props) {
  return (
    <section className="py-16 md:py-24 bg-gray-50 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
          {data.title}
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.items.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              {item.rating && (
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: item.rating }).map((_, j) => (
                    <span key={j} style={{ color: '#fbbf24' }}>★</span>
                  ))}
                </div>
              )}
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                "{item.text}"
              </p>
              <div className="flex items-center gap-3">
                {item.avatar && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-sm text-gray-900">{item.name}</p>
                  {(item.role || item.company) && (
                    <p className="text-xs text-gray-500">
                      {[item.role, item.company].filter(Boolean).join(', ')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
