import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

import { sections } from "@/lib/admin-settings/settings-data";
import type { Section } from "@/lib/admin-settings/settings-types";

export default function SettingsSidebar({
  active,
  onChange,
}: {
  active: Section;
  onChange: (section: Section) => void;
}) {
  return (
    <aside className="flex h-full w-[255px] shrink-0 flex-col border-r border-[var(--border)] bg-[var(--surface)]">
      <div className="flex h-[74px] items-center border-b border-[var(--border-subtle)] px-4">
        <a
          href="/home"
          className="group flex w-full items-center gap-3 rounded-xl px-2.5 py-2 transition-all duration-200 hover:bg-[var(--surface-hover)]"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)] text-[var(--accent-contrast)] transition-transform duration-300 group-hover:-translate-x-0.5">
            <ChevronLeft size={15} strokeWidth={2} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold tracking-[-0.01em]">
              Back to Nexus
            </p>

            <p className="mt-0.5 text-[9px] text-[var(--text-muted)]">Return to home</p>
          </div>
        </a>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <p className="px-3 pb-2 pt-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
          Configuration
        </p>

        <div className="space-y-1">
          {sections.map((section) => {
            const Icon = section.icon;
            const selected = active === section.id;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => onChange(section.id)}
                className={[
                  "group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200",
                  selected
                    ? "bg-[var(--accent)] text-[var(--accent-contrast)] shadow-[0_5px_18px_rgba(0,0,0,0.12)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]",
                ].join(" ")}
              >
                <div
                  className={[
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition",
                    selected
                      ? "bg-[var(--surface-hover)] text-white"
                      : "bg-[var(--surface-hover)] text-[var(--text-secondary)]",
                  ].join(" ")}
                >
                  <Icon size={15} strokeWidth={1.8} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold">{section.label}</p>

                  <p
                    className={[
                      "mt-0.5 truncate text-[9px]",
                      selected ? "text-white" : "text-[var(--text-muted)]",
                    ].join(" ")}
                  >
                    {section.description}
                  </p>
                </div>

                <ChevronRight
                  size={13}
                  className={[
                    "shrink-0 transition-transform duration-200",
                    selected
                      ? "translate-x-0 text-white/50"
                      : "-translate-x-1 text-[var(--text-disabled)] group-hover:translate-x-0",
                  ].join(" ")}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-[var(--border-subtle)] p-4">
        <div className="rounded-xl bg-[var(--surface-secondary)] p-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[var(--accent)]" />

            <span className="text-[10px] font-semibold">
              System operational
            </span>
          </div>

          <p className="mt-1.5 text-[9px] leading-4 text-[var(--text-tertiary)]">
            All Nexus administrative services are running normally.
          </p>
        </div>
      </div>
    </aside>
  );
}
