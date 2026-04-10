export type LandingMode = 'bullet' | 'expert';
export type CtaType = 'lead' | 'payment' | 'booking';
export type Direction = 'ltr' | 'rtl';

export interface TenantTheme {
  primaryColor: string;
  primaryColorHover?: string;
  textColor?: string;
  backgroundColor?: string;
  fontFamily?: string;
}

export interface TenantMeta {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  favicon?: string;
  lang: string;
  dir: Direction;
}

export interface TenantAnalytics {
  gaId?: string;
  fbPixelId?: string;
  posthogKey?: string;
  posthogHost?: string;
}

export interface TenantCta {
  type: CtaType;
  calendlyUrl?: string;   // type: 'booking'
  paymentUrl?: string;    // type: 'payment'
  buttonText?: string;
}

export interface TenantCrm {
  webhookUrl?: string;    // overrides env CRM_WEBHOOK_URL
  source: string;         // e.g. "dentist-haifa-landing"
  assignedTo?: string;    // agent/user ID in whalebizcrm
}

// ─── Block configs ────────────────────────────────────────────────────────────

export interface HeroBlock {
  headline: string;
  subheadline: string;
  ctaText: string;
  imageSrc?: string;
  imageAlt?: string;
  badge?: string;
}

export interface PainItem {
  title: string;
  description: string;
  icon?: string;
}

export interface PainsBlock {
  title: string;
  subtitle?: string;
  items: PainItem[];
}

export interface SolutionBlock {
  title: string;
  subtitle?: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  points?: string[];
}

export interface SocialProofBlock {
  title?: string;
  stats: Array<{ value: string; label: string }>;
  logos?: Array<{ src: string; alt: string }>;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
}

export interface HowItWorksBlock {
  title: string;
  subtitle?: string;
  steps: HowItWorksStep[];
}

export interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  highlighted?: boolean;
  ctaText?: string;
}

export interface PricingBlock {
  title: string;
  subtitle?: string;
  plans: PricingPlan[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqBlock {
  title: string;
  items: FaqItem[];
}

export interface Testimonial {
  name: string;
  role?: string;
  company?: string;
  text: string;
  avatar?: string;
  rating?: number;
}

export interface TestimonialsBlock {
  title: string;
  items: Testimonial[];
}

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  avatar?: string;
  linkedinUrl?: string;
}

export interface TeamBlock {
  title?: string;
  members: TeamMember[];
}

export interface FinalCtaBlock {
  headline: string;
  subheadline?: string;
  ctaText: string;
  note?: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon?: string;
}

export interface FeaturesBlock {
  title: string;
  subtitle?: string;
  items: FeatureItem[];
}

export interface AudienceSegment {
  title: string;
  description: string;
  icon?: string;
}

export interface AudienceBlock {
  title: string;
  subtitle?: string;
  segments: AudienceSegment[];
  notForTitle?: string;
  notFor?: string[];
}

export interface TenantBlocks {
  hero: HeroBlock;
  pains?: PainsBlock;
  solution?: SolutionBlock;
  features?: FeaturesBlock;
  audience?: AudienceBlock;
  socialProof?: SocialProofBlock;
  howItWorks?: HowItWorksBlock;
  pricing?: PricingBlock;
  faq?: FaqBlock;
  testimonials?: TestimonialsBlock;
  team?: TeamBlock;
  finalCta: FinalCtaBlock;
}

// ─── UI strings (i18n) ───────────────────────────────────────────────────────

export interface TenantStrings {
  namePlaceholder?: string;    // default: "Full name"
  phonePlaceholder?: string;   // default: "Phone"
  submitSuccess?: string;      // default: "✓ Thank you! We'll be in touch soon."
  submitError?: string;        // default: "Error submitting. Please try again."
}

// ─── Root config ──────────────────────────────────────────────────────────────

export interface TenantConfig {
  tenantId: string;
  mode: LandingMode;
  meta: TenantMeta;
  theme: TenantTheme;
  analytics: TenantAnalytics;
  cta: TenantCta;
  crm: TenantCrm;
  strings?: TenantStrings;
  blocks: TenantBlocks;
}
