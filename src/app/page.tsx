import { AboutTeaser } from '@/components/sections/AboutTeaser';
import { CtaSection } from '@/components/sections/CtaSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutTeaser />
      <PortfolioSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}