"use client";

import SettingsHeader from "@/components/user/settings/settings-header";
import SettingsSection from "@/components/user/settings/settings-section";
import AppearanceSettings from "@/components/user/settings/appearance-settings";
import NotificationSettings from "@/components/user/settings/notification-settings";
import SecuritySettings from "@/components/user/settings/security-settings";

export default function SettingsContent() {
  return (
    <main className="min-h-screen px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl space-y-8 mt-20">
        <SettingsHeader />

        <SettingsSection
          title="Appearance"
          description="Customize how Nexus looks and feels."
        >
          <AppearanceSettings />
        </SettingsSection>

        <SettingsSection
          title="Notifications"
          description="Choose what Nexus can notify you about."
        >
          <NotificationSettings />
        </SettingsSection>

        <SettingsSection
          title="Security"
          description="Manage your account security and access."
        >
          <SecuritySettings />
        </SettingsSection>
      </div>
    </main>
  );
}
