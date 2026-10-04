"use client";

import {
  Bell,
  ChevronRight,
  CircleHelp,
  Globe,
  Mail,
  Sparkles,
  SlidersHorizontal,
  UserRound,
  Users,
} from "lucide-react";

import Card from "./card";
import SelectBox from "./select-box";
import SettingRow from "./setting-row";
import Toggle from "./toggle";

import {
  quickAccessItems,
  timezoneOptions,
} from "@/lib/admin-settings/settings-data";

export default function GeneralSettings({
  adminName,
  setAdminName,
  adminEmail,
  setAdminEmail,
  timezone,
  setTimezone,
  animations,
  setAnimations,
}: {
  adminName: string;
  setAdminName: (value: string) => void;
  adminEmail: string;
  setAdminEmail: (value: string) => void;
  timezone: string;
  setTimezone: (value: string) => void;
  animations: boolean;
  setAnimations: (value: boolean) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <Card
          title="Administrator profile"
          description="The identity used throughout the Nexus administration system."
        >
          <div className="py-6">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--accent-contrast)] shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
                <UserRound size={22} />
              </div>

              <div>
                <p className="text-[13px] font-semibold">{adminName}</p>

                <p className="mt-1 text-[10px] text-[var(--text-tertiary)]">
                  Primary administrator
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="mb-2 block text-[10px] font-semibold text-[var(--text-secondary)]">
                  Display name
                </span>

                <input
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] px-3 text-[11px] outline-none transition focus:border-[var(--border-focus)] focus:bg-[var(--surface)]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-[10px] font-semibold text-[var(--text-secondary)]">
                  Admin email
                </span>

                <input
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] px-3 text-[11px] outline-none transition focus:border-[var(--border-focus)] focus:bg-[var(--surface)]"
                />
              </label>
            </div>
          </div>
        </Card>

        <Card
          title="Quick access"
          description="Frequently used administrative areas."
        >
          <div className="py-2">
            {quickAccessItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.title}
                  type="button"
                  className="flex w-full items-center gap-3 border-b border-[var(--border-subtle)] py-4 text-left last:border-0 hover:bg-[var(--surface-muted)]"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--surface-tertiary)]">
                    <Icon size={14} />
                  </div>

                  <div className="flex-1">
                    <p className="text-[11px] font-semibold">{item.title}</p>

                    <p className="mt-0.5 text-[9px] text-[var(--text-muted)]">
                      {item.description}
                    </p>
                  </div>

                  <ChevronRight size={13} className="text-[var(--text-disabled)]" />
                </button>
              );
            })}
          </div>
        </Card>
      </div>

      <Card
        title="Administrative preferences"
        description="Basic behavior for your administration workspace."
      >
        <SettingRow
          icon={Globe}
          title="Timezone"
          description="Used for project activity and administrative timestamps."
        >
          <SelectBox value={timezone} onChange={setTimezone}>
            {timezoneOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectBox>
        </SettingRow>

        <SettingRow
          icon={Sparkles}
          title="Animations"
          description="Use subtle motion throughout the admin interface."
        >
          <Toggle
            enabled={animations}
            onClick={() => setAnimations(!animations)}
          />
        </SettingRow>
      </Card>
    </div>
  );
}
