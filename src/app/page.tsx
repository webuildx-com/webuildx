import { Header } from "@/components/header";
import { HeroEntranceProvider } from "@/components/hero-entrance";
import { HeroShell } from "@/components/hero-shell";
import { ImpactSection } from "@/components/impact-section";
import { FinalCtaSection } from "@/components/final-cta-section";
import { Footer } from "@/components/footer";
import { CapabilitiesSection } from "@/components/capabilities-section";
import { ProcessTimelineSection } from "@/components/process-timeline-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { SelectedWorkSection } from "@/components/selected-work-section";
import { WhatWeDoSection } from "@/components/what-we-do-section";

export default function Home() {
  return (
    <HeroEntranceProvider>
      <Header />
      <HeroShell />
      <SelectedWorkSection />
      {/* <CapabilitiesSection /> */}
      <WhatWeDoSection />
      <ProcessTimelineSection />
      <ImpactSection />
      <TestimonialsSection />
      <FinalCtaSection />
      <Footer />
    </HeroEntranceProvider>
  );
}
