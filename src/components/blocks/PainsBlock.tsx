import type { PainsBlock as PainsBlockData, TenantTheme } from '@/types/tenant';

interface Props {
  data: PainsBlockData;
  theme: TenantTheme;
}

export function PainsBlock({ data, theme }: Props) {
  return (
    <section className="py-24 md:py-32 bg-gray-50 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="text-lg text-gray-500 leading-relaxed">{data.subtitle}</p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {data.items.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              {item.icon && (
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5"
                  style={{ backgroundColor: `${theme.primaryColor}12` }}
                >
                  {item.icon}
                </div>
              )}
              <h3 className="font-bold text-gray-900 text-base mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
