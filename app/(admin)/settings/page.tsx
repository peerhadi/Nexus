"use client";

import { useState } from "react";

import SettingsSidebar from "@/components/admin/settings/sidebar";
import SettingsHeader from "@/components/admin/settings/header";
import GeneralSettings from "@/components/admin/settings/general";
import WorkspaceSettings from "@/components/admin/settings/workspace";
import NotificationsSettings from "@/components/admin/settings/notifications";
import AppearanceSettings from "@/components/admin/settings/appearance";
import SecuritySettings from "@/components/admin/settings/security";

import type { Section } from "@/lib/admin-settings/settings-types";

export default function SettingsPage() {
  const [active, setActive] = useState<Section>("general");
  const [saved, setSaved] = useState(false);

  const [adminName, setAdminName] = useState("Nexus Admin");
  const [adminEmail, setAdminEmail] = useState("admin@nexus.local");
  const [workspaceName, setWorkspaceName] = useState("Nexus");
  const [timezone, setTimezone] = useState("Asia/Kolkata");

  const [newMessages, setNewMessages] = useState(true);
  const [projectUpdates, setProjectUpdates] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(false);
  const [securityAlerts, setSecurityAlerts] = useState(true);

  const [animations, setAnimations] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  const handleSave = () => {
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 1800);
  };

  return (
    <main className="flex h-dvh w-full min-w-0 overflow-hidden bg-[#f7f7f5] text-[#111]">
      <SettingsSidebar active={active} onChange={setActive} />

      <section className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <SettingsHeader active={active} saved={saved} onSave={handleSave} />

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1180px] px-8 py-8">
            {active === "general" && (
              <GeneralSettings
                adminName={adminName}
                setAdminName={setAdminName}
                adminEmail={adminEmail}
                setAdminEmail={setAdminEmail}
                timezone={timezone}
                setTimezone={setTimezone}
                animations={animations}
                setAnimations={setAnimations}
              />
            )}

            {active === "workspace" && (
              <WorkspaceSettings
                workspaceName={workspaceName}
                setWorkspaceName={setWorkspaceName}
                timezone={timezone}
                setTimezone={setTimezone}
                compactMode={compactMode}
                setCompactMode={setCompactMode}
              />
            )}

            {active === "notifications" && (
              <NotificationsSettings
                newMessages={newMessages}
                setNewMessages={setNewMessages}
                projectUpdates={projectUpdates}
                setProjectUpdates={setProjectUpdates}
                weeklySummary={weeklySummary}
                setWeeklySummary={setWeeklySummary}
                securityAlerts={securityAlerts}
                setSecurityAlerts={setSecurityAlerts}
              />
            )}

            {active === "appearance" && (
              <AppearanceSettings
                animations={animations}
                setAnimations={setAnimations}
                compactMode={compactMode}
                setCompactMode={setCompactMode}
              />
            )}

            {active === "security" && <SecuritySettings />}
          </div>
        </div>
      </section>
    </main>
  );
}
