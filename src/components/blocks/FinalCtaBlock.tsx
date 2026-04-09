import type { FinalCtaBlock as FinalCtaBlockData, TenantCta, TenantCrm, TenantTheme } from '@/types/tenant';
import { LeadFormInline } from '@/components/forms/LeadFormInline';

interface Props {
  data: FinalCtaBlockData;
  cta: TenantCta;
  crm: TenantCrm;
  theme: TenantTheme;
  tenantId: string;
}

export function FinalCtaBlock({ data, cta, crm, theme, tenantId }: Props) {
  return (
    <section
      className="py-16 md:py-24 px-4 text-white"
      style={{ backgroundColor: theme.primaryColor }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          {data.headline}
        </h2>
        {data.subheadline && (
          <p className="text-lg text-white/80 mb-8">{data.subheadline}</p>
        )}

        <LeadFormInline
          ctaText={data.ctaText}
          cta={cta}
          crm={crm}
          tenantId={tenantId}
          theme={theme}
          variant="inverted"
        />

        {data.note && (
          <p className="text-sm text-white/60 mt-4">{data.note}</p>
        )}
      </div>
    </section>
  );
}
