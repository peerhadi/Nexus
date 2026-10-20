"use client";

import BiggerPicture from "@/components/default/services/integrations/bigger-picture";
import Capabilities from "@/components/default/services/integrations/capabilities";
import ComponentStyles from "@/components/default/services/integrations/component-styles";
import Faq from "@/components/default/services/integrations/faq";
import FinalCta from "@/components/default/services/integrations/final-cta";
import Hero from "@/components/default/services/integrations/hero";
import Marquee from "@/components/default/services/integrations/marquee";
import PageStyles from "@/components/default/services/integrations/page-styles";
import Playground from "@/components/default/services/integrations/playground";
import Process from "@/components/default/services/integrations/process";
import ServicesNav from "@/components/default/services/integrations/services-nav";

export default function IntegrationsPage() {
  return (
    <main className="integration-page overflow-hidden">
      <PageStyles />
      <ComponentStyles />

      <Hero />
      <Marquee />
      <BiggerPicture />
      <Playground />
      <Capabilities />
      <Process />
      <FinalCta />
      <Faq />
      <ServicesNav />
    </main>
  );
}
