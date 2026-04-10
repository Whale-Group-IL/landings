import type { HowItWorksBlock as HowItWorksBlockData, TenantTheme } from '@/types/tenant';

interface Props {
  data: HowItWorksBlockData;
  theme: TenantTheme;
}

export function HowItWorksBlock({ data, theme }: Props) {
  return (
    <section className="py-24 md:py-32 bg-white px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="text-lg text-gray-500 leading-relaxed">{data.subtitle}</p>
          )}
        </div>

        <div>
          {data.steps.map((step, i) => (
            <div key={i} className="flex gap-6 items-start">
              {/* Circle + vertical connector */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-base shadow-sm"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  {step.step}
                </div>
                {i < data.steps.length - 1 && (
                  <div
                    className="w-0.5 flex-1 min-h-[2.5rem] my-1.5"
                    style={{ backgroundColor: `${theme.primaryColor}28` }}
                  />
                )}
              </div>

              <div className={`flex-1 pt-2.5 ${i < data.steps.length - 1 ? 'pb-10' : ''}`}>
                <h3 className="font-bold text-gray-900 text-lg mb-1.5">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
