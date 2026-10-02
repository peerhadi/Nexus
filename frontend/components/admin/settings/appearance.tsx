"use client";

import { Check, SlidersHorizontal, Sparkles } from "lucide-react";

import Card from "./card";
import SettingRow from "./setting-row";
import Toggle from "./toggle";

export default function AppearanceSettings({
  animations,
  setAnimations,
  compactMode,
  setCompactMode,
}: {
  animations: boolean;
  setAnimations: (value: boolean) => void;
  compactMode: boolean;
  setCompactMode: (value: boolean) => void;
}) {
  return (
    <div className="space-y-5">
      <Card
        title="Interface theme"
        description="Choose how the Nexus administration interface should look."
      >
        <div className="grid grid-cols-2 gap-4 py-6">
          <button
            type="button"
            className="rounded-2xl border border-[#06b6d44d] bg-[#06b6d414] p-4 text-left shadow-[0_5px_15px_rgba(0,0,0,0.04)]"
          >
            <div className="h-[105px] overflow-hidden rounded-xl border border-black/[0.06] bg-white p-3">
              <div className="flex gap-2">
                <div className="h-[75px] w-10 rounded-md bg-black/[0.04]" />

                <div className="flex-1 space-y-2">
                  <div className="h-2 w-20 rounded bg-black/[0.08]" />
                  <div className="h-8 rounded-md bg-black/[0.04]" />
                  <div className="h-2 w-28 rounded bg-black/[0.06]" />
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold">Light</p>

                <p className="mt-0.5 text-[9px] text-black/35">
                  Clean and bright
                </p>
              </div>

              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white">
                <Check size={12} />
              </div>
            </div>
          </button>

          <button
            type="button"
            className="rounded-2xl border border-black/[0.07] bg-[#fafaf9] p-4 text-left opacity-55 transition hover:opacity-80"
          >
            <div className="h-[105px] overflow-hidden rounded-xl bg-[#151515] p-3">
              <div className="flex gap-2">
                <div className="h-[75px] w-10 rounded-md bg-white/10" />

                <div className="flex-1 space-y-2">
                  <div className="h-2 w-20 rounded bg-white/20" />
                  <div className="h-8 rounded-md bg-white/10" />
                  <div className="h-2 w-28 rounded bg-white/15" />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-[11px] font-semibold">Dark</p>

              <p className="mt-0.5 text-[9px] text-black/35">Coming soon</p>
            </div>
          </button>
        </div>
      </Card>

      <Card
        title="Motion"
        description="Control animation behavior across the admin interface."
      >
        <SettingRow
          icon={Sparkles}
          title="Interface animations"
          description="Keep transitions and micro-interactions enabled."
        >
          <Toggle
            enabled={animations}
            onClick={() => setAnimations(!animations)}
          />
        </SettingRow>

        <SettingRow
          icon={SlidersHorizontal}
          title="Compact interface"
          description="Use tighter spacing for information-dense screens."
        >
          <Toggle
            enabled={compactMode}
            onClick={() => setCompactMode(!compactMode)}
          />
        </SettingRow>
      </Card>
    </div>
  );
}
