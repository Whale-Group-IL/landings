import Image from 'next/image';
import type { SolutionBlock as SolutionBlockData, TenantTheme } from '@/types/tenant';

interface Props {
  data: SolutionBlockData;
  theme: TenantTheme;
}

export function SolutionBlock({ data, theme }: Props) {
  return (
    <section className="py-24 md:py-32 bg-white px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            {data.subtitle && (
              <p
                className="text-sm font-bold uppercase tracking-wider mb-4"
                style={{ color: theme.primaryColor }}
              >
                {data.subtitle}
              </p>
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight">
              {data.title}
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">{data.description}</p>

            {data.points && data.points.length > 0 && (
              <ul className="space-y-4">
                {data.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      ✓
                    </span>
                    <span className="text-gray-700 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {data.imageSrc ? (
            <div className="relative h-80 md:h-[460px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
              <Image
                src={data.imageSrc}
                alt={data.imageAlt ?? ''}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div
              className="hidden md:block h-80 rounded-3xl"
              style={{
                background: `linear-gradient(135deg, ${theme.primaryColor}18, ${theme.primaryColor}06)`,
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
