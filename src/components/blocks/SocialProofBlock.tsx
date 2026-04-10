import Image from 'next/image';
import type { SocialProofBlock as SocialProofBlockData, TenantTheme } from '@/types/tenant';

interface Props {
  data: SocialProofBlockData;
  theme: TenantTheme;
}

export function SocialProofBlock({ data, theme }: Props) {
  return (
    <section className="py-16 bg-white border-y border-gray-100 px-4">
      <div className="max-w-4xl mx-auto">
        {data.title && (
          <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-gray-400 mb-10">
            {data.title}
          </p>
        )}

        <div
          className={`grid gap-8 ${
            data.stats.length === 2
              ? 'grid-cols-2'
              : data.stats.length === 3
              ? 'grid-cols-3'
              : 'grid-cols-2 md:grid-cols-4'
          }`}
        >
          {data.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div
                className="text-4xl md:text-5xl font-extrabold tabular-nums"
                style={{ color: theme.primaryColor }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 mt-2 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {data.logos && data.logos.length > 0 && (
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-40 grayscale">
            {data.logos.map((logo, i) => (
              <div key={i} className="relative h-8 w-28">
                <Image src={logo.src} alt={logo.alt} fill className="object-contain" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
