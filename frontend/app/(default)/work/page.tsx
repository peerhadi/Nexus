"use client";

import GalleryHero from "@/components/default/work/gallery-hero";
import SelectedWork from "@/components/default/work/selected-work";
import ClosingSection from "@/components/default/work/closing-section";
import FAQ from "@/components/default/work/faq";

export default function WorkPage() {
  return (
    <main className="nexus-page relative overflow-hidden">
      <GalleryHero />
      <SelectedWork />
      <ClosingSection />
      <FAQ />
    </main>
  );
}
