import { ArrowUpRight, Clock3, Mail } from "lucide-react";
import Link from "next/link";

import type { Client } from "@/lib/inbox/client-types";

import { Activity } from "./Activity";
import { ClientStatusBadge } from "./ClientStatusBadge";
import { InfoCard } from "./InfoCard";
import { SectionLabel } from "./SectionLabel";

type ClientDetailProps = {
  client: Client;
};

export function ClientDetail({ client }: ClientDetailProps) {
  return (
    <section className="flex min-h-0 flex-col">
      <div className="shrink-0 border-b border-black/[0.07] px-5 py-4 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#111] text-xs font-bold text-white">
              {client.initials}
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-[15px] font-bold tracking-[-0.025em]">
                {client.name}
              </h2>

              <div className="mt-0.5 flex items-center gap-2">
                <Mail size={10} className="text-black/25" />

                <span className="truncate text-[9px] text-black/40">
                  {client.email}
                </span>
              </div>
            </div>
          </div>

          <ClientStatusBadge status={client.status} />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">
        <div className="grid grid-cols-3 gap-2">
          <InfoCard label="Requests" value={client.requests} />

          <InfoCard label="Projects" value={client.projects} />

          <InfoCard label="Type" value={client.type} small />
        </div>

        <div className="mt-5">
          <SectionLabel>Latest request</SectionLabel>

          <div className="mt-2 rounded-xl border border-black/[0.08] bg-[#fafaf8] p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-[11px] font-bold">
                  {client.lastSubject}
                </div>

                <div className="mt-1 text-[9px] text-black/35">
                  {client.lastActivity}
                </div>
              </div>

              <span className="shrink-0 rounded-lg bg-black/[0.05] px-2 py-1 text-[8px] font-bold text-black/40">
                {client.type}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-white px-3 py-2.5">
                <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-black/25">
                  Client
                </div>

                <div className="mt-1 text-[10px] font-semibold">
                  {client.name}
                </div>
              </div>

              <div className="rounded-lg bg-white px-3 py-2.5">
                <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-black/25">
                  Status
                </div>

                <div className="mt-1 text-[10px] font-semibold">
                  {client.status}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <SectionLabel>Activity</SectionLabel>

          <div className="mt-2 space-y-2">
            <Activity
              title="Latest request received"
              description={client.lastSubject}
              time={client.lastActivity}
            />

            <Activity
              title="Client profile created"
              description="Added from Nexus contact intake"
              time="Previously"
            />

            {client.projects > 0 && (
              <Activity
                title="Project associated"
                description="Client has an associated Nexus project"
                time="Previously"
              />
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/inbox"
            className="group flex items-center gap-2 rounded-xl bg-[#111] px-3.5 py-2.5 text-[10px] font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
          >
            <Mail size={13} />
            Open conversation
            <ArrowUpRight
              size={12}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>

          <Link
            href="/inbox/requests"
            className="flex items-center gap-2 rounded-xl border border-black/[0.08] bg-white px-3.5 py-2.5 text-[10px] font-bold text-black/60 transition-all hover:-translate-y-0.5 hover:bg-black/[0.025] hover:text-black"
          >
            <Clock3 size={13} />
            View requests
          </Link>
        </div>
      </div>
    </section>
  );
}
