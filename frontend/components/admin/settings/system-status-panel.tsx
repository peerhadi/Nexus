"use client";

import { Clock3, ShieldCheck, Wifi, WifiOff } from "lucide-react";

import SectionHeading from "./section-heading";
import SettingRow from "./setting-row";
import StatusLabel from "./status-label";
import { API_URL } from "./settings-data";
import type { ConnectionState } from "./settings-types";

type SystemStatusPanelProps = {
  apiState: ConnectionState;
  accountState: ConnectionState;
  lastChecked: Date | null;
};

export default function SystemStatusPanel({
  apiState,
  accountState,
  lastChecked,
}: SystemStatusPanelProps) {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
      <SectionHeading
        eyebrow="Infrastructure"
        title="System status"
        description="Live connectivity checks for the services this dashboard depends on."
      />

      <SettingRow
        icon={Wifi}
        title="Nexus API"
        description="Backend health endpoint."
      >
        <StatusLabel state={apiState} />
      </SettingRow>

      <SettingRow
        icon={ShieldCheck}
        title="Authenticated API"
        description="Account endpoint using your current session token."
      >
        <StatusLabel state={accountState} />
      </SettingRow>

      <SettingRow
        icon={Clock3}
        title="Last status check"
        description="Most recent completed connectivity check."
      >
        <span className="text-[11px] text-[var(--text-secondary)]">
          {lastChecked
            ? lastChecked.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })
            : "Checking..."}
        </span>
      </SettingRow>

      <div className="mt-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-secondary)] p-3">
        <div className="flex items-start gap-2.5">
          {apiState === "connected" ? (
            <Wifi size={14} className="mt-0.5 text-[var(--success)]" />
          ) : (
            <WifiOff size={14} className="mt-0.5 text-[var(--text-muted)]" />
          )}

          <div>
            <p className="text-[11px] font-semibold text-[var(--text-primary)]">
              {apiState === "connected"
                ? "Backend is responding"
                : apiState === "checking"
                  ? "Checking backend connection"
                  : "Backend connection unavailable"}
            </p>
            <p className="mt-1 break-all text-[10px] leading-5 text-[var(--text-muted)]">
              {API_URL}/health
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
