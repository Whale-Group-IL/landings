import { headers } from 'next/headers';
import { getCloudflareContext } from '@opennextjs/cloudflare';
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

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const hostname = normalizeHostname(headersList.get('x-tenant-host') ?? '');

  let config: TenantConfig | null = null;
  try {
    const ctx = await getCloudflareContext({ async: true });
    const kv = (ctx.env as any).TENANTS_KV ?? null;
    config = await getTenantConfig(hostname, kv);
  } catch {
    // local dev
  }

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
  const headersList = await headers();
  const hostname = normalizeHostname(headersList.get('x-tenant-host') ?? '');

  let config: TenantConfig | null = null;
  try {
    const ctx = await getCloudflareContext({ async: true });
    const kv = (ctx.env as any).TENANTS_KV ?? null;
    config = await getTenantConfig(hostname, kv);
  } catch {
    // local dev — no KV
  }

  if (!config) return <NotFound hostname={hostname} />;

  const { blocks, mode, cta, crm, theme, strings } = config;
  const isExpert = mode === 'expert';

  return (
    <main>
      <HeroBlock data={blocks.hero} cta={cta} theme={theme} strings={strings} />

      {isExpert && blocks.pains && (
        <PainsBlock data={blocks.pains} theme={theme} />
      )}

      {isExpert && blocks.solution && (
        <SolutionBlock data={blocks.solution} theme={theme} />
      )}

      {isExpert && blocks.socialProof && (
        <SocialProofBlock data={blocks.socialProof} theme={theme} />
      )}

      {isExpert && blocks.howItWorks && (
        <HowItWorksBlock data={blocks.howItWorks} theme={theme} />
      )}

      {isExpert && blocks.pricing && (
        <PricingBlock data={blocks.pricing} cta={cta} theme={theme} />
      )}

      {isExpert && blocks.testimonials && (
        <TestimonialsBlock data={blocks.testimonials} theme={theme} />
      )}

      {isExpert && blocks.faq && (
        <FaqBlock data={blocks.faq} theme={theme} />
      )}

      {isExpert && blocks.team && (
        <TeamBlock data={blocks.team} theme={theme} />
      )}

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
