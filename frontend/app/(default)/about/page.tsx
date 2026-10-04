"use client";

import Atmosphere from "@/components/default/about/atmosphere";
import Hero from "@/components/default/about/hero";
import People from "@/components/default/about/people";
import Manifesto from "@/components/default/about/manifesto";
import Values from "@/components/default/about/values";
import InternetEnergy from "@/components/default/about/internet-energy";
import FinalCta from "@/components/default/about/final-cta";

export default function AboutPage() {
  return (
    <main className="relative overflow-hidden bg-[var(--background)] text-[var(--text-primary)]">
      <Atmosphere />
      <Hero />
      <People />
      <Manifesto />
      <Values />
      <InternetEnergy />
      <FinalCta />
    </main>
  );
}
