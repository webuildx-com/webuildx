import { Header } from "@/components/header";
import { HeroEntranceProvider } from "@/components/hero-entrance";
import { HeroShell } from "@/components/hero-shell";
import { ImpactSection } from "@/components/impact-section";
import { FinalCtaSection } from "@/components/final-cta-section";
import { Footer } from "@/components/footer";
import { HowWeWorkSection } from "@/components/how-we-work-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { SelectedWorkSection } from "@/components/selected-work-section";
import { SectionBreak } from "@/components/section-reveal";
import { ServicesSection } from "@/components/services-section";

export default function Home() {
  return (
    <HeroEntranceProvider>
      <Header />
      <HeroShell />
      <SectionBreak />
      <ImpactSection />
      <SectionBreak />
      <SelectedWorkSection />
      <SectionBreak />
      <ServicesSection />
      <HowWeWorkSection />
      <TestimonialsSection />
      <FinalCtaSection />
      <Footer />
    </HeroEntranceProvider>
  );
}
