import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ProjectFaqSection } from "@/components/start-project/project-faq-section";
import { ProjectInquirySection } from "@/components/start-project/project-inquiry-section";
import { StartProjectHero } from "@/components/start-project/start-project-hero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start a Project — WebuildX",
  description:
    "Tell us what you're building and what kind of help you need. We'll help you figure out the smartest path to design, build, or scale it.",
};

export default function StartProjectPage() {
  return (
    <div className="min-h-screen bg-sea-salt">
      <Header alwaysVisible />
      <main>
        <StartProjectHero />
        <ProjectInquirySection />
        <ProjectFaqSection />
      </main>
      <Footer />
    </div>
  );
}
