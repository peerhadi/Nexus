import type { ClientStatus } from "@/lib/inbox/client-types";

type ClientStatusBadgeProps = {
  status: ClientStatus;
};

export function ClientStatusBadge({ status }: ClientStatusBadgeProps) {
  return (
    <span
      className={`shrink-0 rounded-full px-1.5 py-0.5 text-[8px] font-bold ${
        status === "Lead"
          ? "bg-amber-50 text-amber-700"
          : status === "Active"
            ? "bg-emerald-50 text-emerald-700"
            : "bg-black/[0.06] text-black/45"
      }`}
    >
      {status}
    </span>
  );
}
