import { ArrowUpRight, CheckCircle2, Clock3, Users } from "lucide-react";

import type { Client } from "@/lib/inbox/client-types";

import { ClientStatCard } from "./ClientStatCard";

type ClientStatsProps = {
  clients: Client[];
};

export function ClientStats({ clients }: ClientStatsProps) {
  const leads = clients.filter((client) => client.status === "Lead").length;

  const active = clients.filter((client) => client.status === "Active").length;

  const projects = clients.reduce(
    (total, client) => total + client.projects,
    0,
  );

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <ClientStatCard
        label="Total clients"
        value={clients.length}
        icon={Users}
      />

      <ClientStatCard label="Leads" value={leads} icon={Clock3} />

      <ClientStatCard label="Active" value={active} icon={CheckCircle2} />

      <ClientStatCard label="Projects" value={projects} icon={ArrowUpRight} />
    </div>
  );
}
