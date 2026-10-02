import { ArrowUpRight, Clock3, UserPlus, Users } from "lucide-react";

import type { Client } from "@/lib/inbox/client-types";

import { ClientStatCard } from "./ClientStatCard";

type ClientStatsProps = {
  clients: Client[];
};

function isWithinDays(date: string, days: number) {
  const created = new Date(date).getTime();
  const now = Date.now();

  return now - created <= days * 24 * 60 * 60 * 1000;
}

export function ClientStats({ clients }: ClientStatsProps) {
  const recentlyCreated = clients.filter((client) =>
    isWithinDays(client.createdAt, 7),
  ).length;

  const recentlyUpdated = clients.filter((client) =>
    isWithinDays(client.updatedAt, 7),
  ).length;

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <ClientStatCard
        label="Total clients"
        value={clients.length}
        icon={Users}
      />

      <ClientStatCard
        label="New this week"
        value={recentlyCreated}
        icon={UserPlus}
      />

      <ClientStatCard
        label="Updated this week"
        value={recentlyUpdated}
        icon={Clock3}
      />

      <ClientStatCard
        label="Client accounts"
        value={clients.filter((client) => client.role === "CLIENT").length}
        icon={ArrowUpRight}
      />
    </div>
  );
}
