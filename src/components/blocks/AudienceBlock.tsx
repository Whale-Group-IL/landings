import type { AudienceBlock as AudienceBlockData, TenantTheme } from '@/types/tenant';

interface Props {
  data: AudienceBlockData;
  theme: TenantTheme;
}

export function AudienceBlock({ data, theme }: Props) {
  return (
    <section className="py-24 md:py-32 bg-white px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="text-lg text-gray-500 leading-relaxed">{data.subtitle}</p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10">
          {data.segments.map((segment, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex gap-4 items-start hover:shadow-sm transition-shadow"
            >
              {segment.icon ? (
                <span
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ backgroundColor: `${theme.primaryColor}12` }}
                >
                  {segment.icon}
                </span>
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
                <p className="text-gray-500 text-sm leading-relaxed">{segment.description}</p>
              </div>
            </div>
          ))}
        </div>

        {data.notFor && data.notFor.length > 0 && (
          <div className="max-w-2xl mx-auto rounded-2xl border border-gray-100 bg-gray-50 p-7">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
              {data.notForTitle ?? 'Not for'}
            </p>
            <ul className="space-y-2.5">
              {data.notFor.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-gray-500 text-sm">
                  <span className="mt-0.5 flex-shrink-0 text-gray-300 font-bold">✗</span>
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
