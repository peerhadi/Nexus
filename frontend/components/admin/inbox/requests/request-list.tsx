"use client";

import { Mail, Search } from "lucide-react";

import type {
  Request,
  RequestFilter,
  RequestStatus,
} from "@/lib/inbox/request-types";

type RequestListProps = {
  requests: Request[];
  selectedRequest: Request;
  search: string;
  filter: RequestFilter;
  statusOptions: RequestFilter[];
  onSearchChange: (value: string) => void;
  onFilterChange: (value: RequestFilter) => void;
  onSelect: (request: Request) => void;
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

function getStatusLabel(status: RequestStatus) {
  switch (status) {
    case "NEW":
      return "New";

    case "IN_PROGRESS":
      return "In progress";

    case "REPLIED":
      return "Replied";

    case "CLOSED":
      return "Closed";
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
}

function getStatusClasses(status: RequestStatus) {
  switch (status) {
    case "NEW":
      return "bg-[#111] text-white";

    case "IN_PROGRESS":
      return "bg-black/[0.08] text-black/65";

    case "REPLIED":
      return "bg-black/[0.06] text-black/50";

    case "CLOSED":
      return "bg-black/[0.04] text-black/30";
  }
}

export function RequestList({
  requests,
  selectedRequest,
  search,
  filter,
  statusOptions,
  onSearchChange,
  onFilterChange,
  onSelect,
}: RequestListProps) {
  return (
    <section className="flex h-full w-[360px] shrink-0 min-h-0 flex-col border-r border-black/[0.08] bg-white">
      <div className="shrink-0 border-b border-black/[0.07] p-3">
        <div className="relative">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-black/25"
          />

          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search requests..."
            className="h-9 w-full rounded-xl border border-black/[0.08] bg-[#f7f7f5] pl-9 pr-3 text-[10px] outline-none placeholder:text-black/25 focus:border-black/20 focus:bg-white"
          />
        </div>

        <div className="mt-2 flex gap-1 overflow-x-auto">
          {statusOptions.map((item) => {
            const active = filter === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => onFilterChange(item)}
                className={`shrink-0 rounded-lg px-2.5 py-1.5 text-[8px] font-bold transition-colors ${
                  active
                    ? "bg-[#111] text-white"
                    : "bg-black/[0.04] text-black/40 hover:bg-black/[0.07] hover:text-black"
                }`}
              >
                {item === "All" ? "All" : getStatusLabel(item as RequestStatus)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {requests.length === 0 ? (
          <div className="flex h-full items-center justify-center px-8 text-center">
            <div>
              <Mail size={20} className="mx-auto text-black/20" />

              <div className="mt-3 text-[11px] font-bold">No requests</div>

              <div className="mt-1 text-[10px] text-black/35">
                Try another search or filter.
              </div>
            </div>
          </div>
        ) : (
          requests.map((request) => {
            const active = request.id === selectedRequest.id;

            return (
              <button
                key={request.id}
                type="button"
                onClick={() => onSelect(request)}
                className={`w-full border-b border-black/[0.06] px-4 py-4 text-left transition-colors ${
                  active ? "bg-black/[0.045]" : "hover:bg-black/[0.025]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[10px] font-bold ${
                      active
                        ? "bg-[#111] text-white"
                        : "bg-black/[0.06] text-black/55"
                    }`}
                  >
                    {getInitials(request.name)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-[11px] font-bold">
                        {request.name}
                      </span>

                      <span className="shrink-0 text-[8px] text-black/30">
                        {formatDate(request.createdAt)}
                      </span>
                    </div>

                    <div className="mt-1 truncate text-[10px] font-semibold text-black/55">
                      {request.subject || "Untitled request"}
                    </div>

                    <div className="mt-1 flex items-center gap-1.5">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[8px] font-bold ${getStatusClasses(
                          request.status,
                        )}`}
                      >
                        {getStatusLabel(request.status)}
                      </span>

                      {request.company && (
                        <span className="max-w-[130px] truncate rounded-full bg-black/[0.04] px-2 py-0.5 text-[8px] font-semibold text-black/35">
                          {request.company}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </section>
  );
}
