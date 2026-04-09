import type { HowItWorksBlock as HowItWorksBlockData, TenantTheme } from '@/types/tenant';

interface Props {
  data: HowItWorksBlockData;
  theme: TenantTheme;
}

export function HowItWorksBlock({ data, theme }: Props) {
  return (
    <section className="py-16 md:py-24 bg-white px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">
          {data.title}
        </h2>
        {data.subtitle && (
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
            {data.subtitle}
          </p>
        )}

        <div className="space-y-8">
          {data.steps.map((step, i) => (
            <div key={i} className="flex gap-6 items-start">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: theme.primaryColor }}
              >
                {step.step}
              </div>
              <div className="flex-1 pt-2">
                <h3 className="font-semibold text-lg text-gray-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {i < data.steps.length - 1 && (
                <div
                  className="absolute ms-6 mt-12 w-px h-8 bg-gray-200"
                  aria-hidden
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
