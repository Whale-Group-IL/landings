import type { TenantConfig } from '@/types/tenant';
import { HeroBlock } from '@/components/blocks/HeroBlock';
import { PainsBlock } from '@/components/blocks/PainsBlock';
import { SolutionBlock } from '@/components/blocks/SolutionBlock';
import { FeaturesBlock } from '@/components/blocks/FeaturesBlock';
import { AudienceBlock } from '@/components/blocks/AudienceBlock';
import { SocialProofBlock } from '@/components/blocks/SocialProofBlock';
import { HowItWorksBlock } from '@/components/blocks/HowItWorksBlock';
import { PricingBlock } from '@/components/blocks/PricingBlock';
import { FaqBlock } from '@/components/blocks/FaqBlock';
import { TestimonialsBlock } from '@/components/blocks/TestimonialsBlock';
import { TeamBlock } from '@/components/blocks/TeamBlock';
import { FinalCtaBlock } from '@/components/blocks/FinalCtaBlock';

interface Props {
  config: TenantConfig;
}

/**
 * Renders a full landing page from a TenantConfig.
 * bullet mode: Hero → HowItWorks → FinalCTA
 * expert mode: all available blocks in trust-building order
 */
export function LandingRenderer({ config }: Props) {
  const { blocks, mode, cta, crm, theme, strings } = config;
  const isExpert = mode === 'expert';

  return (
    <main>
      {/* 1. Hook */}
      <HeroBlock data={blocks.hero} cta={cta} theme={theme} strings={strings} />

      {/* bullet mode: show process steps for fast orientation */}
      {!isExpert && blocks.howItWorks && (
        <HowItWorksBlock data={blocks.howItWorks} theme={theme} />
      )}

      {/* expert mode: full trust-building sequence */}
      {isExpert && blocks.pains && (
        <PainsBlock data={blocks.pains} theme={theme} />
      )}

      {isExpert && blocks.socialProof && (
        <SocialProofBlock data={blocks.socialProof} theme={theme} />
      )}

      {isExpert && blocks.solution && (
        <SolutionBlock data={blocks.solution} theme={theme} />
      )}

      {isExpert && blocks.features && (
        <FeaturesBlock data={blocks.features} theme={theme} />
      )}

      {isExpert && blocks.audience && (
        <AudienceBlock data={blocks.audience} theme={theme} />
      )}

      {isExpert && blocks.pricing && (
        <PricingBlock data={blocks.pricing} cta={cta} theme={theme} />
      )}

      {isExpert && blocks.howItWorks && (
        <HowItWorksBlock data={blocks.howItWorks} theme={theme} />
      )}

      {isExpert && blocks.testimonials && (
        <TestimonialsBlock data={blocks.testimonials} theme={theme} />
      )}

      {isExpert && blocks.team && (
        <TeamBlock data={blocks.team} theme={theme} />
      )}

      {isExpert && blocks.faq && (
        <FaqBlock data={blocks.faq} theme={theme} />
      )}

      {/* Final CTA always shown */}
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
