"use client";

import { KeyRound, LogOut, ShieldCheck } from "lucide-react";

const items = [
  {
    title: "Password",
    description: "Change the password used to access your account.",
    icon: KeyRound,
    action: "Change",
  },
  {
    title: "Account sessions",
    description: "Manage where your Nexus account is signed in.",
    icon: LogOut,
    action: "Manage",
  },
];

export default function SecuritySettings() {
  return (
    <div className="divide-y divide-[var(--border-subtle)]">
      <div className="flex items-center gap-4 bg-[surface] p-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-500">
          <ShieldCheck size={17} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-black text-[var(--text-secondary)]">
            Account security
          </div>

          <div className="mt-1 text-[9px] font-medium text-[var(--text-muted)]">
            Your account is protected and active.
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-[8px] font-black text-emerald-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Protected
        </div>
      </div>

      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="flex items-center gap-4 p-5 transition-colors hover:bg-[var(--surface-hover)]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-hover)] text-[var(--text-muted)]">
              <Icon size={16} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-black text-[var(--text-secondary)]">
                {item.title}
              </div>

              <div className="mt-1 text-[9px] font-medium text-[var(--text-muted)]">
                {item.description}
              </div>
            </div>

            <button
              type="button"
              className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-3.5 py-2 text-[9px] font-black uppercase tracking-[0.12em] text-[var(--text-tertiary)] transition-all duration-300 hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-500"
            >
              {item.action}
            </button>
          </div>
        );
      })}
    </div>
  );
}
