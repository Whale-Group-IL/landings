import { headers } from 'next/headers';
import { getTenantConfig, normalizeHostname } from '@/lib/tenant';
import type { TenantConfig } from '@/types/tenant';
import { HeroBlock } from '@/components/blocks/HeroBlock';
import { PainsBlock } from '@/components/blocks/PainsBlock';
import { SolutionBlock } from '@/components/blocks/SolutionBlock';
import { SocialProofBlock } from '@/components/blocks/SocialProofBlock';
import { HowItWorksBlock } from '@/components/blocks/HowItWorksBlock';
import { PricingBlock } from '@/components/blocks/PricingBlock';
import { FaqBlock } from '@/components/blocks/FaqBlock';
import { TestimonialsBlock } from '@/components/blocks/TestimonialsBlock';
import { TeamBlock } from '@/components/blocks/TeamBlock';
import { FinalCtaBlock } from '@/components/blocks/FinalCtaBlock';
import { NotFound } from '@/components/NotFound';
import type { Metadata } from 'next';

async function getKV(): Promise<any> {
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare');
    const ctx = await getCloudflareContext({ async: true });
    return (ctx.env as any).TENANTS_KV ?? null;
  } catch {
    return null;
  }
}

async function getConfig(): Promise<TenantConfig | null> {
  const headersList = await headers();
  const hostname = normalizeHostname(headersList.get('x-tenant-host') ?? '');
  // In dev, pass null for kv so file fallback is used
  const kv = process.env.NODE_ENV === 'production' ? await getKV() : null;
  return await getTenantConfig(hostname, kv);
}

export async function generateMetadata(): Promise<Metadata> {
  const config = await getConfig();
  if (!config) return { title: 'Coming Soon' };

  return {
    title: config.meta.title,
    description: config.meta.description,
    keywords: config.meta.keywords,
    openGraph: {
      title: config.meta.title,
      description: config.meta.description,
      images: config.meta.ogImage ? [config.meta.ogImage] : [],
    },
  };
}

export default async function LandingPage() {
  const config = await getConfig();

  if (!config) {
    const headersList = await headers();
    const hostname = normalizeHostname(headersList.get('x-tenant-host') ?? '');
    return <NotFound hostname={hostname} />;
  }

  const { blocks, mode, cta, crm, theme, strings } = config;
  const isExpert = mode === 'expert';

  return (
    <main>
      {/* 1. Hook */}
      <HeroBlock data={blocks.hero} cta={cta} theme={theme} strings={strings} />

      {/* 2. Problem awareness */}
      {isExpert && blocks.pains && (
        <PainsBlock data={blocks.pains} theme={theme} />
      )}

      {/* 3. Credibility (before the pitch) */}
      {isExpert && blocks.socialProof && (
        <SocialProofBlock data={blocks.socialProof} theme={theme} />
      )}

      {/* 4. About / solution */}
      {isExpert && blocks.solution && (
        <SolutionBlock data={blocks.solution} theme={theme} />
      )}

      {/* 5. Services / formats */}
      {isExpert && blocks.pricing && (
        <PricingBlock data={blocks.pricing} cta={cta} theme={theme} />
      )}

      {/* 6. Process — how to start */}
      {isExpert && blocks.howItWorks && (
        <HowItWorksBlock data={blocks.howItWorks} theme={theme} />
      )}

      {/* 7. Social proof — testimonials */}
      {isExpert && blocks.testimonials && (
        <TestimonialsBlock data={blocks.testimonials} theme={theme} />
      )}

      {/* 8. Who is behind this */}
      {isExpert && blocks.team && (
        <TeamBlock data={blocks.team} theme={theme} />
      )}

      {/* 9. FAQ */}
      {isExpert && blocks.faq && (
        <FaqBlock data={blocks.faq} theme={theme} />
      )}

      {/* 10. Final CTA */}
      <FinalCtaBlock
        data={blocks.finalCta}
        cta={cta}
        crm={crm}
        theme={theme}
        tenantId={config.tenantId}
        strings={strings}
      />
    </main>
  );
}
