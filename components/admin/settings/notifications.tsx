"use client";

import { Bell, Mail, Shield, SlidersHorizontal } from "lucide-react";

import Card from "./card";
import SettingRow from "./setting-row";
import Toggle from "./toggle";

export default function NotificationsSettings({
  newMessages,
  setNewMessages,
  projectUpdates,
  setProjectUpdates,
  weeklySummary,
  setWeeklySummary,
  securityAlerts,
  setSecurityAlerts,
}: {
  newMessages: boolean;
  setNewMessages: (value: boolean) => void;
  projectUpdates: boolean;
  setProjectUpdates: (value: boolean) => void;
  weeklySummary: boolean;
  setWeeklySummary: (value: boolean) => void;
  securityAlerts: boolean;
  setSecurityAlerts: (value: boolean) => void;
}) {
  return (
    <div className="space-y-5">
      <Card
        title="Admin notifications"
        description="Choose which events should notify the administrator."
      >
        <SettingRow
          icon={Mail}
          title="New client messages"
          description="Notify when a new message arrives in the inbox."
        >
          <Toggle
            enabled={newMessages}
            onClick={() => setNewMessages(!newMessages)}
          />
        </SettingRow>

        <SettingRow
          icon={SlidersHorizontal}
          title="Project updates"
          description="Notify when a project receives a significant update."
        >
          <Toggle
            enabled={projectUpdates}
            onClick={() => setProjectUpdates(!projectUpdates)}
          />
        </SettingRow>

        <SettingRow
          icon={Bell}
          title="Weekly summary"
          description="Receive a weekly overview of Nexus activity."
        >
          <Toggle
            enabled={weeklySummary}
            onClick={() => setWeeklySummary(!weeklySummary)}
          />
        </SettingRow>

        <SettingRow
          icon={Shield}
          title="Security alerts"
          description="Always notify about important security events."
        >
          <Toggle
            enabled={securityAlerts}
            onClick={() => setSecurityAlerts(!securityAlerts)}
          />
        </SettingRow>
      </Card>

      <div className="rounded-2xl border border-black/[0.07] bg-white p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-white">
            <Bell size={17} />
          </div>

          <div>
            <p className="text-[12px] font-semibold">Notification delivery</p>

            <p className="mt-1 max-w-[600px] text-[10px] leading-5 text-black/40">
              Nexus currently uses the administrator email configured under
              General settings for system notifications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
