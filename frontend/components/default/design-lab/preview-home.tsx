"use client";

import PreviewHomeDifference from "@/components/default/design-lab/preview-home-difference";
import PreviewHomeHero from "@/components/default/design-lab/preview-home-hero";
import PreviewHomeShowcase from "@/components/default/design-lab/preview-home-showcase";
import type {
  NavigateTo,
  SiteType,
  Theme,
} from "@/components/default/design-lab/types";

export default function PreviewHome({
  theme,
  siteType,
  words,
  images,
  navigateTo,
}: {
  theme: Theme;
  siteType: SiteType;
  words: string[];
  images: string[];
  navigateTo: NavigateTo;
}) {
  return (
    <>
      <PreviewHomeHero
        theme={theme}
        siteType={siteType}
        words={words}
        navigateTo={navigateTo}
      />
      <PreviewHomeShowcase
        theme={theme}
        siteType={siteType}
        images={images}
        navigateTo={navigateTo}
      />
      <PreviewHomeDifference theme={theme} />
    </>
  );
}
