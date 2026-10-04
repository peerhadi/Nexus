import { ArrowUpRight, Mail, UserRound } from "lucide-react";
import Link from "next/link";

import type { Client } from "@/lib/inbox/client-types";

import { InfoCard } from "./InfoCard";
import { SectionLabel } from "./SectionLabel";

type ClientDetailProps = {
  client: Client;
};

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ClientDetail({ client }: ClientDetailProps) {
  return (
    <section className="flex min-h-0 flex-col">
      <div className="shrink-0 border-b border-[var(--border)] px-5 py-4 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent)] text-xs font-bold text-white">
              {getInitials(client.name)}
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-[15px] font-bold tracking-[-0.025em]">
                {client.name}
              </h2>

              <div className="mt-0.5 flex items-center gap-2">
                <Mail size={10} className="text-[var(--text-muted)]" />

                <span className="truncate text-[9px] text-[var(--text-tertiary)]">
                  {client.email}
                </span>
              </div>
            </div>
          </div>

          <div className="shrink-0 rounded-full bg-violet-50 px-2.5 py-1 text-[8px] font-bold text-violet-600">
            {client.role}
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">
        <div className="grid grid-cols-2 gap-2">
          <InfoCard
            label="Account"
            value={client.role === "CLIENT" ? "Client" : "Admin"}
          />

          <InfoCard label="Joined" value={formatDate(client.createdAt)} small />
        </div>

        <div className="mt-5">
          <SectionLabel>Account information</SectionLabel>

          <div className="mt-2 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
            <div className="grid gap-2">
              <div className="rounded-lg bg-[var(--surface)] px-3 py-2.5">
                <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  Name
                </div>

                <div className="mt-1 text-[10px] font-semibold">
                  {client.name}
                </div>
              </div>

              <div className="rounded-lg bg-[var(--surface)] px-3 py-2.5">
                <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  Email
                </div>

                <div className="mt-1 break-all text-[10px] font-semibold">
                  {client.email}
                </div>
              </div>

              <div className="rounded-lg bg-[var(--surface)] px-3 py-2.5">
                <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  User ID
                </div>

                <div className="mt-1 break-all font-mono text-[9px] text-[var(--text-secondary)]">
                  {client.id}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <SectionLabel>Account activity</SectionLabel>

          <div className="mt-2 space-y-2">
            <div className="flex items-start gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] p-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-500">
                <UserRound size={14} />
              </div>

              <div className="min-w-0">
                <div className="text-[10px] font-bold">Account created</div>

                <div className="mt-0.5 text-[9px] text-[var(--text-muted)]">
                  Client account created on {formatDate(client.createdAt)}.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] p-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-500">
                <UserRound size={14} />
              </div>

              <div className="min-w-0">
                <div className="text-[10px] font-bold">Profile updated</div>

                <div className="mt-0.5 text-[9px] text-[var(--text-muted)]">
                  Last account update: {formatDate(client.updatedAt)}.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/inbox"
            className="group flex items-center gap-2 rounded-xl bg-[var(--accent)] px-3.5 py-2.5 text-[10px] font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
          >
            <Mail size={13} />
            Open inbox
            <ArrowUpRight
              size={12}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
