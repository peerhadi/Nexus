"use client";
import Hero from "@/components/default/services/websites/hero";
import BiggerPicture from "@/components/default/services/websites/bigger-picture";
import ThoughtfulDesign from "@/components/default/services/websites/thoughtful-design";
import WhatWeBuild from "@/components/default/services/websites/what-we-build";
import UseCases from "@/components/default/services/websites/use-cases";
import WebsiteFits from "@/components/default/services/websites/website-fits";
import Details from "@/components/default/services/websites/details";
import Process from "@/components/default/services/websites/process";
import SuccessMetrics from "@/components/default/services/websites/success-metrics";
import PrioritySelector from "@/components/default/services/websites/priority-selector";
import Faq from "@/components/default/services/websites/faq";
import FinalCta from "@/components/default/services/websites/final-cta";
import ReducedMotion from "@/components/default/services/websites/reduced-motion";

export default function WebsitesPage() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <BiggerPicture />
      <ThoughtfulDesign />
      <WhatWeBuild />
      <UseCases />
      <WebsiteFits />
      <Details />
      <Process />
      <SuccessMetrics />
      <PrioritySelector />
      <Faq />
      <FinalCta />
      <ReducedMotion />
    </main>
  );
}
