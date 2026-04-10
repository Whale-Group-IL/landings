import type { FeaturesBlock as FeaturesBlockData, TenantTheme } from '@/types/tenant';

interface Props {
  data: FeaturesBlockData;
  theme: TenantTheme;
}

export function FeaturesBlock({ data, theme }: Props) {
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
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex gap-4 items-start"
            >
              {item.icon && (
                <span
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ backgroundColor: `${theme.primaryColor}12` }}
                >
                  {item.icon}
                </span>
              )}
              <div>
                <h3 className="font-bold text-gray-900 mb-1.5">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
