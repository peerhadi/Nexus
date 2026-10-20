"use client";

import { Check, Code2, Eye, Layers3, Sparkles } from "lucide-react";
import { siteTypes } from "@/components/default/design-lab/data";
import type { SiteType } from "@/components/default/design-lab/types";

export default function ControlSiteType({
  siteType,
  setSiteType,
}: {
  siteType: SiteType;
  setSiteType: (id: SiteType) => void;
}) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <label className="text-xs font-semibold text-[var(--text-primary)]">
          01 / Website type
        </label>
        <span className="text-[10px] text-[var(--text-muted)]">Required</span>
      </div>

      <div className="grid gap-2">
        {siteTypes.map((item) => {
          const active = siteType === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setSiteType(item.id)}
              className={`group flex items-center gap-3 rounded-xl border p-3 text-left transition-all duration-200 ${
                active
                  ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                  : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]"
              }`}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                  active
                    ? "bg-[var(--surface)] text-[var(--accent-active)]"
                    : "bg-[var(--surface-secondary)] text-[var(--text-secondary)]"
                }`}
              >
                {item.id === "ecommerce" ? (
                  <Layers3 size={16} />
                ) : item.id === "portfolio" ? (
                  <Eye size={16} />
                ) : item.id === "saas" ? (
                  <Code2 size={16} />
                ) : (
                  <Sparkles size={16} />
                )}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-xs font-semibold text-[var(--text-primary)]">
                  {item.label}
                </span>
                <span className="mt-1 block text-[10px] leading-relaxed text-[var(--text-secondary)]">
                  {item.description}
                </span>
              </span>

              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                  active
                    ? "border-[var(--accent-active)] bg-[var(--accent-active)] text-[var(--text-inverse)]"
                    : "border-[var(--border-strong)] bg-[var(--surface)] text-transparent"
                }`}
              >
                {active && <Check size={12} />}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
