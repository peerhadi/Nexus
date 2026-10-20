"use client";
import Hero from "@/components/default/services/web-applications/hero";
import BiggerPicture from "@/components/default/services/web-applications/bigger-picture";
import WhatWeBuild from "@/components/default/services/web-applications/what-we-build";
import Principles from "@/components/default/services/web-applications/principles";
import BuildDirection from "@/components/default/services/web-applications/build-direction";
import SystemConnections from "@/components/default/services/web-applications/system-connections";
import Process from "@/components/default/services/web-applications/process";
import Faq from "@/components/default/services/web-applications/faq";
import FinalCta from "@/components/default/services/web-applications/final-cta";
import NextServiceNav from "@/components/default/services/web-applications/next-service-nav";
import Styles from "@/components/default/services/web-applications/styles";

export default function WebApplicationsPage() {
  return (
    <main className="overflow-hidden bg-[var(--background)] text-[var(--text-primary)]">
      <Styles />
      <Hero />
      <BiggerPicture />
      <WhatWeBuild />
      <Principles />
      <BuildDirection />
      <SystemConnections />
      <Process />
      <Faq />
      <FinalCta />
      <NextServiceNav />
    </main>
  );
}
