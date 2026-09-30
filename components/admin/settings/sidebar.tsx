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
    <aside className="flex h-full w-[255px] shrink-0 flex-col border-r border-black/[0.07] bg-white">
      <div className="flex h-[74px] items-center border-b border-black/[0.06] px-4">
        <a
          href="/"
          className="group flex w-full items-center gap-3 rounded-xl px-2.5 py-2 transition-all duration-200 hover:bg-black/[0.04]"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white transition-transform duration-300 group-hover:-translate-x-0.5">
            <ChevronLeft size={15} strokeWidth={2} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold tracking-[-0.01em]">
              Back to Nexus
            </p>

            <p className="mt-0.5 text-[9px] text-black/35">Return to home</p>
          </div>
        </a>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <p className="px-3 pb-2 pt-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-black/30">
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
                    ? "bg-black text-white shadow-[0_5px_18px_rgba(0,0,0,0.12)]"
                    : "text-black/60 hover:bg-black/[0.035] hover:text-black",
                ].join(" ")}
              >
                <div
                  className={[
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition",
                    selected
                      ? "bg-white/10 text-white"
                      : "bg-black/[0.035] text-black/55",
                  ].join(" ")}
                >
                  <Icon size={15} strokeWidth={1.8} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold">{section.label}</p>

                  <p
                    className={[
                      "mt-0.5 truncate text-[9px]",
                      selected ? "text-white" : "text-black/35",
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
                      : "-translate-x-1 text-black/20 group-hover:translate-x-0",
                  ].join(" ")}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-black/[0.06] p-4">
        <div className="rounded-xl bg-[#f7f7f5] p-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-black" />

            <span className="text-[10px] font-semibold">
              System operational
            </span>
          </div>

          <p className="mt-1.5 text-[9px] leading-4 text-black/40">
            All Nexus administrative services are running normally.
          </p>
        </div>
      </div>
    </aside>
  );
}
