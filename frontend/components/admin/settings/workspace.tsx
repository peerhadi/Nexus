"use client";

import { Globe, SlidersHorizontal } from "lucide-react";

import Card from "./card";
import SelectBox from "./select-box";
import SettingRow from "./setting-row";
import Toggle from "./toggle";

import {
  timezoneOptions,
  workspaceStats,
} from "@/lib/admin-settings/settings-data";

export default function WorkspaceSettings({
  workspaceName,
  setWorkspaceName,
  timezone,
  setTimezone,
  compactMode,
  setCompactMode,
}: {
  workspaceName: string;
  setWorkspaceName: (value: string) => void;
  timezone: string;
  setTimezone: (value: string) => void;
  compactMode: boolean;
  setCompactMode: (value: boolean) => void;
}) {
  return (
    <div className="space-y-5">
      <Card
        title="Workspace identity"
        description="Configure how Nexus is represented internally."
      >
        <div className="grid grid-cols-2 gap-5 py-6">
          <label>
            <span className="mb-2 block text-[10px] font-semibold text-black/55">
              Workspace name
            </span>

            <input
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              className="h-10 w-full rounded-xl border border-black/[0.08] bg-[#fafaf9] px-3 text-[11px] outline-none transition focus:border-black/25 focus:bg-white"
            />
          </label>

          <label>
            <span className="mb-2 block text-[10px] font-semibold text-black/55">
              Workspace URL
            </span>

            <div className="flex h-10 items-center rounded-xl border border-black/[0.08] bg-[#fafaf9] px-3 text-[11px] text-black/40">
              nexus.local
            </div>
          </label>
        </div>
      </Card>

      <Card
        title="Workspace behavior"
        description="Default behavior for administrative workflows."
      >
        <SettingRow
          icon={SlidersHorizontal}
          title="Compact mode"
          description="Reduce spacing across dense administrative interfaces."
        >
          <Toggle
            enabled={compactMode}
            onClick={() => setCompactMode(!compactMode)}
          />
        </SettingRow>

        <SettingRow
          icon={Globe}
          title="Default timezone"
          description="Timezone applied to new administrative records."
        >
          <SelectBox value={timezone} onChange={setTimezone}>
            {timezoneOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.value}
              </option>
            ))}
          </SelectBox>
        </SettingRow>
      </Card>

      <Card
        title="Workspace status"
        description="Current state of the Nexus administration environment."
      >
        <div className="grid grid-cols-3 gap-4 py-6">
          {workspaceStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-black/[0.06] bg-[#fafaf9] p-5"
            >
              <p className="text-[10px] font-medium text-black/40">
                {stat.label}
              </p>

              <p className="mt-2 text-[25px] font-semibold tracking-[-0.05em]">
                {stat.value}
              </p>

              <p className="mt-1 text-[9px] text-black/35">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
