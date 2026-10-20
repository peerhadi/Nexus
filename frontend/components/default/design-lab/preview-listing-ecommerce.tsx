"use client";

import { ArrowUpRight } from "lucide-react";
import { stockImages } from "@/components/default/design-lab/data";
import { products } from "@/components/default/design-lab/preview-content";
import type {
  NavigateTo,
  Theme,
} from "@/components/default/design-lab/types";

export default function PreviewListingEcommerce({
  theme,
  images,
  navigateTo,
}: {
  theme: Theme;
  images: string[];
  navigateTo: NavigateTo;
}) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-3">
      {[
        ...products,
        {
          name: "Studio Everyday Tote",
          category: "Accessories",
          price: "$28",
          tag: "BESTSELLER",
        },
        {
          name: "Weekend Travel Kit",
          category: "Travel",
          price: "$46",
          tag: "NEW ARRIVAL",
        },
      ].map((product, index) => (
        <article
          key={`${product.name}-${index}`}
          className="overflow-hidden rounded-xl border"
          style={{ borderColor: theme.border }}
        >
          <div className="relative aspect-[4/4.4] overflow-hidden">
            <img
              src={
                images[index % Math.max(images.length, 1)] ||
                stockImages[index % stockImages.length]
              }
              alt={product.name}
              className="h-full w-full object-cover"
            />
            <span
              className="absolute left-2 top-2 rounded-full px-2 py-1 text-[7px] font-semibold"
              style={{
                background: theme.surface,
                color: theme.text,
              }}
            >
              {product.tag || "STUDIO PICK"}
            </span>
          </div>
          <div className="p-3">
            <p className="text-[9px]" style={{ color: theme.muted }}>
              {product.category}
            </p>
            <h3 className="mt-1 text-[11px] font-semibold">
              {product.name}
            </h3>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[11px] font-semibold">
                {product.price}
              </span>
              <button
                onClick={() => navigateTo("#contact")}
                className="rounded-full border px-2.5 py-1.5 text-[9px]"
                style={{ borderColor: theme.border }}
              >
                Details{" "}
                <ArrowUpRight className="ml-1 inline" size={10} />
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
