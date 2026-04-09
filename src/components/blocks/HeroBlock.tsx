import Image from 'next/image';
import type { HeroBlock as HeroBlockData, TenantCta, TenantTheme } from '@/types/tenant';
import { LeadFormInline } from '@/components/forms/LeadFormInline';

interface Props {
  data: HeroBlockData;
  cta: TenantCta;
  theme: TenantTheme;
}

export function HeroBlock({ data, cta, theme }: Props) {
  return (
    <section className="min-h-[90vh] flex items-center bg-white px-4 py-16 md:py-24">
      <div className="max-w-5xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            {data.badge && (
              <span
                className="inline-block text-sm font-semibold px-3 py-1 rounded-full mb-4"
                style={{
                  backgroundColor: `${theme.primaryColor}1a`,
                  color: theme.primaryColor,
                }}
              >
                {data.badge}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 mb-4">
              {data.headline}
            </h1>
            <p className="text-lg text-gray-600 mb-8">{data.subheadline}</p>
            <LeadFormInline ctaText={data.ctaText} cta={cta} theme={theme} />
          </div>

          {data.imageSrc && (
            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-xl">
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
      </div>
    </section>
  );
}
