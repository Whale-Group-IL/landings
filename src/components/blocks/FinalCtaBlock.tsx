import type {
  FinalCtaBlock as FinalCtaBlockData,
  TenantCta,
  TenantCrm,
  TenantStrings,
  TenantTheme,
} from '@/types/tenant';
import { LeadFormInline } from '@/components/forms/LeadFormInline';

interface Props {
  data: FinalCtaBlockData;
  cta: TenantCta;
  crm: TenantCrm;
  theme: TenantTheme;
  tenantId: string;
  strings?: TenantStrings;
}

export function FinalCtaBlock({ data, cta, crm, theme, tenantId, strings }: Props) {
  return (
    <section
      className="relative py-24 md:py-32 px-4 text-white overflow-hidden"
      style={{ backgroundColor: theme.primaryColor }}
    >
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-black/15 to-transparent" />
        {/* Decorative light blob */}
        <div className="absolute -bottom-24 -end-24 w-96 h-96 rounded-full blur-[100px] opacity-20 bg-white" />
        <div className="absolute -top-24 -start-24 w-64 h-64 rounded-full blur-[80px] opacity-10 bg-white" />
      </div>

      <div className="relative max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-5">
          {data.headline}
        </h2>
        {data.subheadline && (
          <p className="text-lg text-white/75 leading-relaxed mb-10">{data.subheadline}</p>
        )}

        <div className="flex justify-center">
          <LeadFormInline
            ctaText={data.ctaText}
            cta={cta}
            crm={crm}
            tenantId={tenantId}
            theme={theme}
            strings={strings}
            variant="inverted"
          />
        </div>

        {data.note && (
          <p className="text-sm text-white/50 mt-6">{data.note}</p>
        )}
      </div>
    </section>
  );
}
