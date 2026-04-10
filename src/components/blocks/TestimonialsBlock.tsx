import Image from 'next/image';
import type { TestimonialsBlock as TestimonialsBlockData, TenantTheme } from '@/types/tenant';

interface Props {
  data: TestimonialsBlockData;
  theme: TenantTheme;
}

export function TestimonialsBlock({ data, theme }: Props) {
  return (
    <section className="py-24 md:py-32 bg-gray-50 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {data.title}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {data.items.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 flex flex-col"
            >
              {/* Decorative quote mark */}
              <div
                className="text-6xl font-serif leading-none mb-2 -mt-1 select-none opacity-15"
                style={{ color: theme.primaryColor }}
                aria-hidden
              >
                "
              </div>

              {item.rating !== undefined && item.rating > 0 && (
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span
                      key={j}
                      className={j < item.rating! ? '' : 'opacity-20'}
                      style={{ color: '#f59e0b' }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              )}

              <p className="text-gray-700 leading-relaxed mb-6 flex-1 text-[15px]">
                {item.text}
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                {item.avatar ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-100">
                    <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                  </div>
                ) : (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    {item.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-sm text-gray-900">{item.name}</p>
                  {(item.role || item.company) && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {[item.role, item.company].filter(Boolean).join(' · ')}
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
