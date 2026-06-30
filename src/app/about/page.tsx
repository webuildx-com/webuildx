import { AboutHero } from "@/components/about/about-hero";
import { AboutHowWeBuildSection } from "@/components/about/about-how-we-build-section";
import { AboutTeamSection } from "@/components/about/about-team-section";
import { AboutStorySection } from "@/components/about/about-story-section";
import { AboutStudioSection } from "@/components/about/about-studio-section";
import { FinalCtaSection } from "@/components/final-cta-section";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | WebuildX",
  description:
    "WebuildX is a design-led product development studio helping ambitious teams design, build, and scale digital products",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-sea-salt">
      <Header alwaysVisible />
      <main>
        <AboutHero />
        <AboutStorySection />
        <AboutHowWeBuildSection />
        <AboutTeamSection />
        <AboutStudioSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
}
