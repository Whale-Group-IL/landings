import Image from 'next/image';
import type { SolutionBlock as SolutionBlockData, TenantTheme } from '@/types/tenant';

interface Props {
  data: SolutionBlockData;
  theme: TenantTheme;
}

export function SolutionBlock({ data, theme }: Props) {
  return (
    <section className="py-16 md:py-24 bg-white px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="text-lg font-medium mb-4" style={{ color: theme.primaryColor }}>
              {data.subtitle}
            </p>
          )}
          <p className="text-gray-600 mb-6">{data.description}</p>
          {data.points && data.points.length > 0 && (
            <ul className="space-y-3">
              {data.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    ✓
                  </span>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {data.imageSrc && (
          <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={data.imageSrc}
              alt={data.imageAlt ?? ''}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
