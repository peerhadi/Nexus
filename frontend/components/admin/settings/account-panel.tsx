"use client";

import { Eye, EyeOff, LoaderCircle, ShieldCheck, UserRound } from "lucide-react";

import SectionHeading from "./section-heading";
import SettingRow from "./setting-row";
import StatusLabel from "./status-label";
import type { AdminUser, ConnectionState } from "./settings-types";

type AccountPanelProps = {
  user: AdminUser | null;
  accountState: ConnectionState;
  initials: string;
  showEmail: boolean;
  onToggleEmail: () => void;
};

export default function AccountPanel({
  user,
  accountState,
  initials,
  showEmail,
  onToggleEmail,
}: AccountPanelProps) {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
      <SectionHeading
        eyebrow="Identity"
        title="Administrator account"
        description="Your authenticated account details returned by the Nexus API."
      />

      <div className="mb-5 flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] p-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm font-semibold text-[var(--text-primary)]">
          {accountState === "checking" ? (
            <LoaderCircle size={17} className="animate-spin" />
          ) : (
            initials
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
            {user?.name || "Administrator"}
          </p>
          <p className="mt-1 truncate text-[11px] text-[var(--text-muted)]">
            {showEmail ? user?.email || "Account email unavailable" : "••••••••••••"}
          </p>
        </div>

        <button
          type="button"
          aria-label={showEmail ? "Hide email" : "Show email"}
          onClick={onToggleEmail}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
        >
          {showEmail ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>

      <SettingRow
        icon={UserRound}
        title="Account name"
        description="Name associated with your authenticated account."
      >
        <span className="text-xs font-medium text-[var(--text-primary)]">
          {user?.name || "Unavailable"}
        </span>
      </SettingRow>

      <SettingRow
        icon={ShieldCheck}
        title="Access role"
        description="Permissions assigned to this account."
      >
        <span
          className={`inline-flex rounded-md border px-2 py-1 text-[10px] font-semibold ${
            user?.role?.toUpperCase() === "ADMIN"
              ? "border-[var(--accent)]/20 bg-[var(--accent-soft)] text-[var(--accent)]"
              : "border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-secondary)]"
          }`}
        >
          {user?.role || "Unavailable"}
        </span>
      </SettingRow>

      <SettingRow
        icon={ShieldCheck}
        title="Session status"
        description="Whether the API accepted your current session."
      >
        <StatusLabel state={accountState} />
      </SettingRow>

      {accountState === "error" && (
        <p className="mt-3 rounded-lg border border-[var(--warning)]/20 bg-[var(--warning-soft)] px-3 py-2 text-[11px] leading-5 text-[var(--text-secondary)]">
          Account information could not be loaded. Your session may be missing
          or expired. Refresh the status to try again.
        </p>
      )}

      <div className="mt-4 border-t border-[var(--border-subtle)] pt-4">
        <p className="text-[10px] leading-5 text-[var(--text-muted)]">
          Account editing and password changes are not enabled here; this page
          does not submit profile changes to the backend.
        </p>
      </div>
    </section>
  );
}
