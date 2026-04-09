import type { PricingBlock as PricingBlockData, TenantCta, TenantTheme } from '@/types/tenant';
import { LeadFormModal } from '@/components/forms/LeadFormModal';

interface Props {
  data: PricingBlockData;
  cta: TenantCta;
  theme: TenantTheme;
}

export function PricingBlock({ data, cta, theme }: Props) {
  return (
    <section className="py-16 md:py-24 bg-gray-50 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">
          {data.title}
        </h2>
        {data.subtitle && (
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
            {data.subtitle}
          </p>
        )}

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.plans.map((plan, i) => (
            <div
              key={i}
              className={`rounded-2xl p-6 flex flex-col ${
                plan.highlighted
                  ? 'shadow-xl text-white'
                  : 'bg-white shadow-sm border border-gray-100'
              }`}
              style={
                plan.highlighted ? { backgroundColor: theme.primaryColor } : {}
              }
            >
              <div className="mb-4">
                <p
                  className={`text-sm font-semibold uppercase tracking-wide mb-1 ${
                    plan.highlighted ? 'text-white/70' : 'text-gray-500'
                  }`}
                >
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  {plan.period && (
                    <span className={`text-sm ${plan.highlighted ? 'text-white/70' : 'text-gray-500'}`}>
                      /{plan.period}
                    </span>
                  )}
                </div>
                {plan.description && (
                  <p className={`text-sm mt-2 ${plan.highlighted ? 'text-white/80' : 'text-gray-500'}`}>
                    {plan.description}
                  </p>
                )}
              </div>

              <ul className="space-y-2 flex-1 mb-6">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <span className={plan.highlighted ? 'text-white' : ''} style={!plan.highlighted ? { color: theme.primaryColor } : {}}>✓</span>
                    <span className={plan.highlighted ? 'text-white/90' : 'text-gray-700'}>{f}</span>
                  </li>
                ))}
              </ul>

              <LeadFormModal
                ctaText={plan.ctaText ?? cta.buttonText ?? 'בחר תכנית'}
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
