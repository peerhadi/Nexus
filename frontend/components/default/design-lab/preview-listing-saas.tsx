"use client";

import type { Theme } from "@/components/default/design-lab/types";

export default function PreviewListingSaas({ theme }: { theme: Theme }) {
  return (
    <div className="mt-6 space-y-3">
      {[
        [
          "01",
          "Projects that stay organised",
          "Track owners, deadlines, milestones, and decisions in one shared space.",
        ],
        [
          "02",
          "Conversations with context",
          "Keep updates connected to the work instead of scattered across tools.",
        ],
        [
          "03",
          "A clearer daily plan",
          "Give everyone a practical overview of priorities and what needs attention.",
        ],
        [
          "04",
          "Progress you can understand",
          "See activity, completed work, and upcoming milestones without the noise.",
        ],
      ].map(([number, title, description]) => (
        <article
          key={number}
          className="flex gap-3 rounded-xl border p-4"
          style={{
            borderColor: theme.border,
            background: theme.surface,
          }}
        >
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[9px] font-bold"
            style={{
              background: theme.accent,
              color: theme.accentText,
            }}
          >
            {number}
          </span>
          <div>
            <h3 className="text-[11px] font-semibold">{title}</h3>
            <p
              className="mt-1 text-[10px] leading-relaxed"
              style={{ color: theme.muted }}
            >
              {description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
