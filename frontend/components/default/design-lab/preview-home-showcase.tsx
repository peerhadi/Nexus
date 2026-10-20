"use client";

import { ArrowRight } from "lucide-react";
import {
  restaurantImages,
  stockImages,
} from "@/components/default/design-lab/data";
import {
  menuItems,
  portfolio,
  products,
} from "@/components/default/design-lab/preview-content";
import type {
  NavigateTo,
  SiteType,
  Theme,
} from "@/components/default/design-lab/types";

export default function PreviewHomeShowcase({
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
    <section className="px-5 py-6 sm:px-7">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <p
            className="text-[9px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: theme.muted }}
          >
            {siteType === "ecommerce"
              ? "Customer favourites"
              : siteType === "portfolio"
                ? "Selected projects"
                : siteType === "restaurant"
                  ? "From the kitchen"
                  : "Everything in sync"}
          </p>
          <h2 className="mt-1 text-lg font-semibold tracking-tight">
            {siteType === "ecommerce"
              ? "The pieces people love."
              : siteType === "portfolio"
                ? "A few things we've made."
                : siteType === "restaurant"
                  ? "Made fresh, served with care."
                  : "Good work, without the chaos."}
          </h2>
        </div>
        <button
          onClick={() =>
            navigateTo(
              siteType === "ecommerce"
                ? "#shop"
                : siteType === "portfolio"
                  ? "#projects"
                  : siteType === "restaurant"
                    ? "#menu"
                    : "#features",
            )
          }
          className="shrink-0 text-[10px] font-semibold"
          style={{ color: theme.muted }}
        >
          View all{" "}
          <ArrowRight className="ml-1 inline" size={12} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {(siteType === "ecommerce"
          ? products.slice(0, 2)
          : siteType === "portfolio"
            ? portfolio.slice(0, 2)
            : siteType === "restaurant"
              ? menuItems.slice(0, 2)
              : [
                  {
                    name: "Project planning",
                    category: "Organised workflows",
                    price: "01",
                    description: "A clearer view of what's next.",
                    title: "Project planning",
                  },
                  {
                    name: "Team workspace",
                    category: "Better collaboration",
                    price: "02",
                    description: "Keep the important things together.",
                    title: "Team workspace",
                  },
                ]
        ).map((item, index) => (
          <article
            key={"name" in item ? item.name : item.title}
            className="min-w-0 overflow-hidden rounded-xl border"
            style={{
              borderColor: theme.border,
              background: theme.surface,
            }}
          >
            {siteType !== "saas" && (
              <div className="aspect-[1.5/1] overflow-hidden">
                <img
                  src={
                    images[index] ||
                    (siteType === "ecommerce"
                      ? stockImages[index]
                      : siteType === "portfolio"
                        ? portfolio[index]?.image
                        : restaurantImages[index + 1])
                  }
                  alt={"name" in item ? item.name : item.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="p-3">
              <p className="text-[9px]" style={{ color: theme.muted }}>
                {"category" in item ? item.category : "Workspace"}
              </p>
              <h3 className="mt-1 truncate text-[11px] font-semibold">
                {"name" in item ? item.name : item.title}
              </h3>
              <p className="mt-1 text-[9px]" style={{ color: theme.muted }}>
                {"price" in item ? item.price : "Designed with intention"}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
