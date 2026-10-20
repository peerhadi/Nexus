"use client";

import type { Theme } from "@/components/default/design-lab/types";

export default function PreviewHomeDifference({ theme }: { theme: Theme }) {
  return (
    <section
      className="mx-5 mb-5 rounded-xl border p-4 sm:mx-7"
      style={{
        borderColor: theme.border,
        background: theme.hero,
      }}
    >
      <p
        className="text-[9px] font-semibold uppercase tracking-[0.14em]"
        style={{ color: theme.muted }}
      >
        The difference
      </p>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {[
          ["01", "Thoughtful", "Every detail has a purpose."],
          ["02", "Practical", "Made for everyday use."],
          ["03", "Personal", "Built around real people."],
        ].map(([number, title, description]) => (
          <div key={number}>
            <span className="text-[9px]" style={{ color: theme.muted }}>
              {number}
            </span>
            <h3 className="mt-1 text-[10px] font-semibold">{title}</h3>
            <p
              className="mt-1 text-[9px] leading-relaxed"
              style={{ color: theme.muted }}
            >
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
