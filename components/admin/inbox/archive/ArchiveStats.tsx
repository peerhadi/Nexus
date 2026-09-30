import { Archive, Check, Clock3 } from "lucide-react";

import type { ArchiveItem } from "@/lib/inbox/archive-types";

import { Stat } from "./Stat";

type ArchiveStatsProps = {
  items: ArchiveItem[];
};

export function ArchiveStats({ items }: ArchiveStatsProps) {
  const completed = items.filter((item) => item.reason === "Completed").length;

  const closedOrDeclined = items.filter(
    (item) => item.reason !== "Completed",
  ).length;

  return (
    <div className="grid h-[58px] shrink-0 grid-cols-3 border-b border-black/[0.08] bg-white">
      <Stat
        label="Archived"
        value={String(items.length)}
        icon={<Archive size={11} />}
      />

      <Stat
        label="Completed"
        value={String(completed)}
        icon={<Check size={11} />}
      />

      <Stat
        label="Closed / Declined"
        value={String(closedOrDeclined)}
        icon={<Clock3 size={11} />}
      />
    </div>
  );
}
