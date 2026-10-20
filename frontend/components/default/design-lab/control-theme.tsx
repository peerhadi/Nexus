"use client";

import { Check } from "lucide-react";
import { themes } from "@/components/default/design-lab/data";
import type { Theme, ThemeType } from "@/components/default/design-lab/types";

export default function ControlTheme({
  themeType,
  setThemeType,
}: {
  themeType: ThemeType;
  setThemeType: (type: ThemeType) => void;
}) {
  return (
    <section>
      <label className="mb-3 block text-xs font-semibold text-[var(--text-primary)]">
        03 / Colour theme
      </label>

      <div className="grid grid-cols-3 gap-2">
        {(Object.entries(themes) as [ThemeType, Theme][]).map(
          ([id, item]) => {
            const active = themeType === id;

            return (
              <button
                key={id}
                onClick={() => setThemeType(id)}
                className={`rounded-xl border p-2 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                  active
                    ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                    : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]"
                }`}
              >
                <span
                  className="mb-2 flex h-9 items-end gap-1 overflow-hidden rounded-lg border border-[var(--border)] p-1"
                  style={{ background: item.background }}
                >
                  <span
                    className="h-full w-1/2 rounded"
                    style={{ background: item.accent }}
                  />
                  <span
                    className="h-3 w-1/2 rounded"
                    style={{ background: item.text }}
                  />
                </span>
                <span className="flex items-center justify-between gap-1">
                  <span className="text-[10px] font-medium text-[var(--text-primary)]">
                    {item.name}
                  </span>
                  {active && (
                    <Check
                      size={11}
                      className="shrink-0 text-[var(--accent-active)]"
                    />
                  )}
                </span>
              </button>
            );
          },
        )}
      </div>
    </section>
  );
}
