import { Header } from "@/components/header";
import { HeroEntranceProvider } from "@/components/hero-entrance";
import { HeroShell } from "@/components/hero-shell";
import { ImpactSection } from "@/components/impact-section";
import { FinalCtaSection } from "@/components/final-cta-section";
import { Footer } from "@/components/footer";
import { TestimonialsSection } from "@/components/testimonials-section";
import { SelectedWorkSection } from "@/components/selected-work-section";
import { WhatWeDoSection } from "@/components/what-we-do-section";
import { OurProcessSection } from "@/components/our-process-section";
import { StudioIntroSection } from "@/components/studio-intro-section";

export default function Home() {
  return (
    <HeroEntranceProvider>
      <Header />
      <HeroShell />
      <StudioIntroSection />
      <WhatWeDoSection />
      <SelectedWorkSection />
      <OurProcessSection />
      <ImpactSection />
      <TestimonialsSection />
      <FinalCtaSection />
      <Footer />
    </HeroEntranceProvider>
  );
}
