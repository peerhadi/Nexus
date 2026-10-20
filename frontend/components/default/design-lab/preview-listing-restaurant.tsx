"use client";

import { restaurantImages } from "@/components/default/design-lab/data";
import { menuItems } from "@/components/default/design-lab/preview-content";
import type { Theme } from "@/components/default/design-lab/types";

export default function PreviewListingRestaurant({
  theme,
  images,
}: {
  theme: Theme;
  images: string[];
}) {
  return (
    <div className="mt-6 space-y-3">
      {[
        ...menuItems,
        {
          name: "Wild Mushroom Risotto",
          price: "$18",
          description:
            "Slow-cooked arborio rice, roasted mushrooms, herbs and aged parmesan.",
        },
        {
          name: "Vanilla Bean Panna Cotta",
          price: "$9",
          description:
            "Silky vanilla cream, seasonal berries and a bright citrus finish.",
        },
      ].map((item, index) => (
        <article
          key={`${item.name}-${index}`}
          className="flex items-start gap-3 border-b pb-3"
          style={{ borderColor: theme.border }}
        >
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg">
            <img
              src={
                images[index % Math.max(images.length, 1)] ||
                restaurantImages[index % restaurantImages.length]
              }
              alt={item.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-[11px] font-semibold">{item.name}</h3>
              <span className="shrink-0 text-[10px] font-semibold">
                {item.price}
              </span>
            </div>
            <p
              className="mt-1 text-[9px] leading-relaxed"
              style={{ color: theme.muted }}
            >
              {item.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
