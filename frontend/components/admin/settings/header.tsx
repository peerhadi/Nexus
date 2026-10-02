import { Check, ChevronRight, Save } from "lucide-react";

import { sections } from "@/lib/admin-settings/settings-data";
import type { Section } from "@/lib/admin-settings/settings-types";
import { getSectionTitle } from "@/lib/admin-settings/settings-utils";

export default function SettingsHeader({
  active,
  saved,
  onSave,
}: {
  active: Section;
  saved: boolean;
  onSave: () => void;
}) {
  const section = sections.find((item) => item.id === active);

  return (
    <header className="flex h-[74px] shrink-0 items-center justify-between border-b border-black/[0.07] bg-white/90 px-7 backdrop-blur-xl">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium text-black/30">
            Administration
          </span>

          <ChevronRight size={11} className="text-black/20" />

          <span className="text-[10px] font-semibold">{section?.label}</span>
        </div>

        <h1 className="mt-1 text-[19px] font-semibold tracking-[-0.04em]">
          {getSectionTitle(active)}
        </h1>
      </div>

      <button
        type="button"
        onClick={onSave}
        className={[
          "group flex h-9 items-center gap-2 rounded-xl px-4 text-[11px] font-semibold transition-all duration-300",
          saved
            ? "bg-black text-white"
            : "bg-black text-white hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.14)]",
        ].join(" ")}
      >
        {saved ? <Check size={14} /> : <Save size={14} />}
        {saved ? "Saved" : "Save changes"}
      </button>
    </header>
  );
}
