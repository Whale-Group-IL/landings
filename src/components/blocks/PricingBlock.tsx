import type { PricingBlock as PricingBlockData, TenantCta, TenantTheme } from '@/types/tenant';
import { LeadFormModal } from '@/components/forms/LeadFormModal';

interface Props {
  data: PricingBlockData;
  cta: TenantCta;
  theme: TenantTheme;
}

export function PricingBlock({ data, cta, theme }: Props) {
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

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch">
          {data.plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.highlighted ? 'text-white' : 'bg-white border border-gray-100 shadow-sm'
              }`}
              style={
                plan.highlighted
                  ? {
                      backgroundColor: theme.primaryColor,
                      boxShadow: `0 0 0 2px ${theme.primaryColor}, 0 20px 60px ${theme.primaryColor}38`,
                    }
                  : {}
              }
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 start-1/2 -translate-x-1/2">
                  <span
                    className="bg-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm whitespace-nowrap"
                    style={{ color: theme.primaryColor }}
                  >
                    {data.popularLabel ?? '★ Популярный выбор'}
                  </span>
                </div>
              )}

              <div className="mb-7">
                <p
                  className={`text-xs font-bold uppercase tracking-wider mb-3 ${
                    plan.highlighted ? 'text-white/60' : 'text-gray-400'
                  }`}
                >
                  {plan.name}
                </p>
                <div className="mb-2">
                  <span className="text-2xl font-extrabold leading-tight">{plan.price}</span>
                  {plan.period && (
                    <span
                      className={`text-sm ms-1 ${plan.highlighted ? 'text-white/60' : 'text-gray-400'}`}
                    >
                      /{plan.period}
                    </span>
                  )}
                </div>
                {plan.description && (
                  <p
                    className={`text-sm leading-relaxed ${
                      plan.highlighted ? 'text-white/70' : 'text-gray-500'
                    }`}
                  >
                    {plan.description}
                  </p>
                )}
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm">
                    <span
                      className={`mt-0.5 flex-shrink-0 font-bold ${
                        plan.highlighted ? 'text-white/80' : ''
                      }`}
                      style={!plan.highlighted ? { color: theme.primaryColor } : {}}
                    >
                      ✓
                    </span>
                    <span className={plan.highlighted ? 'text-white/90' : 'text-gray-600'}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <LeadFormModal
                ctaText={plan.ctaText ?? cta.buttonText ?? 'Choose plan'}
                cta={cta}
                theme={theme}
                variant={plan.highlighted ? 'inverted' : 'primary'}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
