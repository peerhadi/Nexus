"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import PreviewListingEcommerce from "@/components/default/design-lab/preview-listing-ecommerce";
import PreviewListingPortfolio from "@/components/default/design-lab/preview-listing-portfolio";
import PreviewListingRestaurant from "@/components/default/design-lab/preview-listing-restaurant";
import PreviewListingSaas from "@/components/default/design-lab/preview-listing-saas";
import type {
  NavigateTo,
  SiteType,
  Theme,
} from "@/components/default/design-lab/types";

export default function PreviewListing({
  theme,
  siteType,
  images,
  navigateTo,
}: {
  theme: Theme;
  siteType: SiteType;
  images: string[];
  navigateTo: NavigateTo;
}) {
  return (
    <section className="flex-1 px-5 py-7 sm:px-7">
      <button
        onClick={() => navigateTo("#top")}
        className="mb-5 inline-flex items-center gap-1.5 text-[10px]"
        style={{ color: theme.muted }}
      >
        <ArrowLeft size={12} /> Back home
      </button>

      <p
        className="text-[9px] font-semibold uppercase tracking-[0.16em]"
        style={{ color: theme.muted }}
      >
        {siteType === "ecommerce"
          ? "The collection"
          : siteType === "portfolio"
            ? "Our work"
            : siteType === "restaurant"
              ? "Food and drink"
              : "The platform"}
      </p>

      <h1 className="mt-2 text-2xl font-semibold tracking-tight">
        {siteType === "ecommerce"
          ? "Everyday, considered."
          : siteType === "portfolio"
            ? "Work with a point of view."
            : siteType === "restaurant"
              ? "A menu worth lingering over."
              : "Everything your team needs."}
      </h1>

      <p
        className="mt-2 max-w-md text-[10px] leading-relaxed"
        style={{ color: theme.muted }}
      >
        {siteType === "ecommerce"
          ? "Discover considered essentials, made with quality materials and designed to be used often."
          : siteType === "portfolio"
            ? "A selection of projects made in close collaboration with ambitious, thoughtful teams."
            : siteType === "restaurant"
              ? "A seasonal selection from our kitchen, made fresh with ingredients from trusted local suppliers."
              : "A focused set of tools to plan projects, keep conversations connected, and understand progress."}
      </p>

      {siteType === "ecommerce" && (
        <PreviewListingEcommerce
          theme={theme}
          images={images}
          navigateTo={navigateTo}
        />
      )}

      {siteType === "portfolio" && (
        <PreviewListingPortfolio theme={theme} images={images} />
      )}

      {siteType === "restaurant" && (
        <PreviewListingRestaurant theme={theme} images={images} />
      )}

      {siteType === "saas" && <PreviewListingSaas theme={theme} />}

      <div
        className="mt-6 flex items-center justify-between gap-3 rounded-xl p-4"
        style={{ background: theme.hero }}
      >
        <div>
          <h3 className="text-[11px] font-semibold">Have a question?</h3>
          <p className="mt-1 text-[9px]" style={{ color: theme.muted }}>
            We&apos;re happy to help you find the right fit.
          </p>
        </div>
        <button
          onClick={() => navigateTo("#contact")}
          className="shrink-0 rounded-full px-3 py-2 text-[9px] font-semibold"
          style={{
            background: theme.accent,
            color: theme.accentText,
          }}
        >
          Get in touch{" "}
          <ArrowRight className="ml-1 inline" size={11} />
        </button>
      </div>
    </section>
  );
}
