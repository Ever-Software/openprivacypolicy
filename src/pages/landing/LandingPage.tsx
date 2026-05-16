import { AppLayout } from '@/layouts/AppLayout'
import { HeroSection } from './sections/HeroSection'
import { StatsSection } from './sections/StatsSection'
import { FeaturesSection } from './sections/FeaturesSection'
import { HowItWorksSection } from './sections/HowItWorksSection'
import { BenefitsSection } from './sections/BenefitsSection'
import { PricingSection } from './sections/PricingSection'
import { TestimonialsSection } from './sections/TestimonialsSection'
import { PoliciesSection } from './sections/PoliciesSection'
import { FaqSection } from './sections/FaqSection'
import { ContactSection } from './sections/ContactSection'
import { CtaSection } from './sections/CtaSection'

export function LandingPage() {
  return (
    <AppLayout transparent>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <BenefitsSection />
      <PricingSection />
      <TestimonialsSection />
      <PoliciesSection />
      <FaqSection />
      <ContactSection />
      <CtaSection />
    </AppLayout>
  )
}
