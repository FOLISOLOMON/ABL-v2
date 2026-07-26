import { HeroSection } from '@/components/sections/hero-section';
import { BrandStatement } from '@/components/sections/brand-statement';
import { FeaturedServices } from '@/components/sections/featured-services';
import { FeaturedLookbook } from '@/components/sections/featured-lookbook';
import { TrainingPreview } from '@/components/sections/training-preview';
import { TestimonialPreview } from '@/components/sections/testimonial-preview';
import { FinalCTA } from '@/components/sections/final-cta';

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandStatement />
      <FeaturedServices />
      <FeaturedLookbook />
      <TrainingPreview />
      <TestimonialPreview />
      <FinalCTA />
    </>
  );
}
