import type { PainsBlock as PainsBlockData, TenantTheme } from '@/types/tenant';

interface Props {
  data: PainsBlockData;
  theme: TenantTheme;
}

export function PainsBlock({ data, theme }: Props) {
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
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.items.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              {item.icon && (
                <span className="text-3xl mb-3 block">{item.icon}</span>
              )}
              <h3
                className="font-semibold text-lg mb-2"
                style={{ color: theme.primaryColor }}
              >
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
