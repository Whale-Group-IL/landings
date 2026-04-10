import Image from 'next/image';
import type { HeroBlock as HeroBlockData, TenantCta, TenantStrings, TenantTheme } from '@/types/tenant';
import { LeadFormInline } from '@/components/forms/LeadFormInline';

interface Props {
  data: HeroBlockData;
  cta: TenantCta;
  theme: TenantTheme;
  strings?: TenantStrings;
}

export function HeroBlock({ data, cta, theme, strings }: Props) {
  return (
    <section className="relative min-h-screen flex items-center bg-white px-4 py-20 md:py-28 overflow-hidden">
      {/* Decorative glow blob behind headline */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full blur-[120px] opacity-[0.07]"
          style={{ backgroundColor: theme.primaryColor }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto w-full text-center">
        {data.badge && (
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold mb-7 border"
            style={{
              backgroundColor: `${theme.primaryColor}12`,
              color: theme.primaryColor,
              borderColor: `${theme.primaryColor}28`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: theme.primaryColor }}
            />
            {data.badge}
          </div>
        )}

        <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold leading-[1.1] tracking-tight text-gray-900 mb-6">
          {data.headline}
        </h1>

        <p className="text-xl md:text-2xl text-gray-500 leading-relaxed mb-10 max-w-2xl mx-auto">
          {data.subheadline}
        </p>

        <div className="flex justify-center">
          <LeadFormInline
            ctaText={data.ctaText}
            cta={cta}
            theme={theme}
            strings={strings}
          />
        </div>

        {data.imageSrc && (
          <div className="relative mt-16 max-w-3xl mx-auto h-64 md:h-[420px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
            <Image
              src={data.imageSrc}
              alt={data.imageAlt ?? ''}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}
