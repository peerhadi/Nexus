"use client";

import AnimationStyles from "@/components/default/services/automation/animation-styles";
import FaqSection from "@/components/default/services/automation/faq-section";
import FinalCta from "@/components/default/services/automation/final-cta";
import Hero from "@/components/default/services/automation/hero";
import HeroVisualStyles from "@/components/default/services/automation/hero-visual-styles";
import IdeaBand from "@/components/default/services/automation/idea-band";
import PageStyles from "@/components/default/services/automation/page-styles";
import ProcessSection from "@/components/default/services/automation/process-section";
import ResponsibilitySection from "@/components/default/services/automation/responsibility-section";
import ServicesNav from "@/components/default/services/automation/services-nav";
import ServicesSection from "@/components/default/services/automation/services-section";
import WorkflowLab from "@/components/default/services/automation/workflow-lab";

export default function AutomationPage() {
  return (
    <main className="automation-page overflow-hidden bg-[var(--background)] text-[var(--text-primary)]">
      <PageStyles />
      <HeroVisualStyles />
      <AnimationStyles />

      <Hero />
      <IdeaBand />
      <ServicesSection />
      <WorkflowLab />
      <ResponsibilitySection />
      <ProcessSection />
      <FaqSection />
      <FinalCta />
      <ServicesNav />
    </main>
  );
}
