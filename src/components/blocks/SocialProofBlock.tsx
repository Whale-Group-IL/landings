import Image from 'next/image';
import type { SocialProofBlock as SocialProofBlockData, TenantTheme } from '@/types/tenant';

interface Props {
  data: SocialProofBlockData;
  theme: TenantTheme;
}

export function SocialProofBlock({ data, theme }: Props) {
  return (
    <section className="py-12 bg-gray-50 px-4">
      <div className="max-w-5xl mx-auto">
        {data.title && (
          <p className="text-center text-gray-500 text-sm uppercase tracking-widest mb-8">
            {data.title}
          </p>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {data.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div
                className="text-4xl font-extrabold"
                style={{ color: theme.primaryColor }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Partner logos */}
        {data.logos && data.logos.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {data.logos.map((logo, i) => (
              <div key={i} className="relative h-8 w-24">
                <Image src={logo.src} alt={logo.alt} fill className="object-contain" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
