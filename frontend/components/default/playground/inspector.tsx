"use client";

import { useState } from "react";
import CreativeControls from "@/components/default/playground/creative-controls";
import TabAtmosphere from "@/components/default/playground/tab-atmosphere";
import TabForm from "@/components/default/playground/tab-form";
import TabSurface from "@/components/default/playground/tab-surface";
import type { Settings, UpdateSetting } from "@/components/default/playground/types";

export default function Inspector({
  settings,
  update,
  randomize,
  reset,
  onExport,
}: {
  settings: Settings;
  update: UpdateSetting;
  randomize: () => void;
  reset: () => void;
  onExport: () => void;
}) {
  const [tab, setTab] = useState<"Form" | "Surface" | "Atmosphere">("Form");

  return (
    <aside className="playground-enter-delay h-fit min-w-0 border border-[var(--pg-line)] bg-[var(--background)]">
      <div className="flex items-center justify-between border-b border-[var(--pg-line)] px-5 py-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em]">
            Inspector
          </p>
          <p className="mt-1 text-[11px] text-[var(--text-secondary)]">
            Tune every detail
          </p>
        </div>
        <span className="font-mono text-[10px] text-[var(--text-secondary)]">
          01—03
        </span>
      </div>

      <div className="grid grid-cols-3 border-b border-[var(--pg-line)]">
        {(
          [
            { name: "Form", number: "01" },
            { name: "Surface", number: "02" },
            { name: "Atmosphere", number: "03" },
          ] as const
        ).map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => setTab(item.name)}
            className={`border-b-2 px-1 py-3 text-[10px] font-semibold transition ${
              tab === item.name
                ? "border-[var(--accent)] text-[var(--text-primary)]"
                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <span className="mb-1 block font-mono opacity-60">
              {item.number}
            </span>
            {item.name}
          </button>
        ))}
      </div>

      <div className="space-y-6 p-5">
        {tab === "Form" && <TabForm settings={settings} update={update} />}

        {tab === "Surface" && (
          <TabSurface settings={settings} update={update} />
        )}

        {tab === "Atmosphere" && (
          <TabAtmosphere settings={settings} update={update} />
        )}

        <CreativeControls
          randomize={randomize}
          reset={reset}
          onExport={onExport}
        />
      </div>
    </aside>
  );
}
