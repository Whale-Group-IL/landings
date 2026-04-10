import type { AudienceBlock as AudienceBlockData, TenantTheme } from '@/types/tenant';

interface Props {
  data: AudienceBlockData;
  theme: TenantTheme;
}

export function AudienceBlock({ data, theme }: Props) {
  return (
    <section className="py-16 md:py-24 bg-gray-50 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">
          {data.title}
        </h2>
        {data.subtitle && (
          <p className="text-center text-gray-500 mb-10 max-w-xl mx-auto">
            {data.subtitle}
          </p>
        )}

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {data.segments.map((segment, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex gap-4 items-start"
            >
              {segment.icon ? (
                <span className="text-2xl flex-shrink-0">{segment.icon}</span>
              ) : (
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  ✓
                </span>
              )}
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{segment.title}</h3>
                <p className="text-gray-600 text-sm">{segment.description}</p>
              </div>
            </div>
          ))}
        </div>

        {data.notFor && data.notFor.length > 0 && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-3">
              {data.notForTitle ?? 'Not for'}
            </h3>
            <ul className="space-y-2">
              {data.notFor.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-500 text-sm">
                  <span className="mt-0.5 flex-shrink-0">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
