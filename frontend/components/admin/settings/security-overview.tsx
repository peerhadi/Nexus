"use client";

import { ShieldCheck } from "lucide-react";

import StatusLabel from "./status-label";
import type { AdminUser, ConnectionState } from "./settings-types";

type SecurityOverviewProps = {
  user: AdminUser | null;
  accountState: ConnectionState;
};

export default function SecurityOverview({
  user,
  accountState,
}: SecurityOverviewProps) {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)]">
          <ShieldCheck size={15} className="text-[var(--text-secondary)]" />
        </div>
        <h2 className="text-xs font-semibold text-[var(--text-primary)]">
          Security overview
        </h2>
      </div>

      <div className="mt-4 divide-y divide-[var(--border-subtle)]">
        <div className="flex items-center justify-between gap-3 py-3">
          <span className="text-[11px] text-[var(--text-muted)]">
            Authentication
          </span>
          <span className="text-[10px] font-medium text-[var(--text-primary)]">
            Bearer token
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 py-3">
          <span className="text-[11px] text-[var(--text-muted)]">
            Account role
          </span>
          <span className="text-[10px] font-medium text-[var(--text-primary)]">
            {user?.role || "Unknown"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 py-3">
          <span className="text-[11px] text-[var(--text-muted)]">
            API access
          </span>
          <StatusLabel state={accountState} />
        </div>
      </div>

      <p className="mt-2 text-[10px] leading-5 text-[var(--text-muted)]">
        Keep your session token private. This page never displays the token
        itself.
      </p>
    </section>
  );
}
