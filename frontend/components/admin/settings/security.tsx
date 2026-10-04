import { ChevronRight, KeyRound, Lock, Monitor, Shield } from "lucide-react";

import Card from "./card";
import SettingRow from "./setting-row";

export default function SecuritySettings() {
  return (
    <div className="space-y-5">
      <Card
        title="Administrator access"
        description="Manage access to the Nexus administrative environment."
      >
        <SettingRow
          icon={Lock}
          title="Two-factor authentication"
          description="Add an additional verification step to administrator access."
        >
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[var(--surface-hover)] px-2.5 py-1 text-[9px] font-semibold text-[var(--text-secondary)]">
              Not configured
            </span>

            <button
              type="button"
              className="h-8 rounded-lg border border-[var(--border)] px-3 text-[10px] font-semibold transition hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)]"
            >
              Configure
            </button>
          </div>
        </SettingRow>

        <SettingRow
          icon={KeyRound}
          title="Password"
          description="Update the password used for administrator access."
        >
          <button
            type="button"
            className="h-8 rounded-lg border border-[var(--border)] px-3 text-[10px] font-semibold transition hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)]"
          >
            Change password
          </button>
        </SettingRow>

        <SettingRow
          icon={Monitor}
          title="Active sessions"
          description="Review devices currently signed into the admin environment."
        >
          <button
            type="button"
            className="flex h-8 items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 text-[10px] font-semibold transition hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)]"
          >
            View sessions
            <ChevronRight size={12} />
          </button>
        </SettingRow>
      </Card>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-tertiary)]">
            <Shield size={17} />
          </div>

          <div className="flex-1">
            <p className="text-[12px] font-semibold">Security overview</p>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-[var(--surface-secondary)] p-3">
                <p className="text-[9px] text-[var(--text-muted)]">Access</p>

                <p className="mt-1 text-[11px] font-semibold">Protected</p>
              </div>

              <div className="rounded-xl bg-[var(--surface-secondary)] p-3">
                <p className="text-[9px] text-[var(--text-muted)]">Sessions</p>

                <p className="mt-1 text-[11px] font-semibold">1 active</p>
              </div>

              <div className="rounded-xl bg-[var(--surface-secondary)] p-3">
                <p className="text-[9px] text-[var(--text-muted)]">Alerts</p>

                <p className="mt-1 text-[11px] font-semibold">Enabled</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--accent-contrast)]">
            <Shield size={15} />
          </div>

          <div>
            <p className="text-[11px] font-semibold">
              Administrative environment
            </p>

            <p className="mt-0.5 text-[9px] text-[var(--text-muted)]">
              Nexus admin controls are currently available.
            </p>
          </div>
        </div>

        <span className="flex items-center gap-1.5 text-[9px] font-semibold text-[var(--text-tertiary)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          Operational
        </span>
      </div>
    </div>
  );
}
