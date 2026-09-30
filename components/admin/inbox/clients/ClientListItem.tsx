import type { Client } from "@/lib/inbox/client-types";

import { ClientStatusBadge } from "./ClientStatusBadge";

type ClientListItemProps = {
  client: Client;
  selected: boolean;
  onSelect: () => void;
};

export function ClientListItem({
  client,
  selected,
  onSelect,
}: ClientListItemProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full px-4 py-4 text-left transition-all ${
        selected ? "bg-black/[0.035]" : "hover:bg-black/[0.025]"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[10px] font-bold ${
            selected ? "bg-[#111] text-white" : "bg-black/[0.06] text-black/55"
          }`}
        >
          {client.initials}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <span className="truncate text-[11px] font-bold">
              {client.name}
            </span>

            <ClientStatusBadge status={client.status} />
          </div>

          <div className="mt-0.5 truncate text-[9px] text-black/35">
            {client.email}
          </div>

          <div className="mt-2 flex items-center justify-between gap-3">
            <span className="truncate text-[9px] font-semibold text-black/50">
              {client.type}
            </span>

            <span className="shrink-0 text-[8px] text-black/25">
              {client.lastActivity}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
