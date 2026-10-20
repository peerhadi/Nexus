"use client";

import { stockImages } from "@/components/default/design-lab/data";
import { portfolio } from "@/components/default/design-lab/preview-content";
import type { Theme } from "@/components/default/design-lab/types";

export default function PreviewListingPortfolio({
  theme,
  images,
}: {
  theme: Theme;
  images: string[];
}) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-3">
      {[
        ...portfolio,
        {
          title: "Northstar Journal",
          category: "Editorial",
          image: stockImages[2],
        },
        {
          title: "Fieldwork Identity",
          category: "Brand identity",
          image: stockImages[3],
        },
      ].map((project, index) => (
        <article
          key={`${project.title}-${index}`}
          className="overflow-hidden rounded-xl border"
          style={{ borderColor: theme.border }}
        >
          <div className="aspect-[1.25/1] overflow-hidden">
            <img
              src={images[index] || project.image}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-3">
            <p className="text-[9px]" style={{ color: theme.muted }}>
              {project.category}
            </p>
            <h3 className="mt-1 text-[11px] font-semibold">
              {project.title}
            </h3>
          </div>
        </article>
      ))}
    </div>
  );
}
