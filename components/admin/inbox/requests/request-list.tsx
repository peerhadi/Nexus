"use client";

import { Mail, Search } from "lucide-react";

import type { Request, RequestFilter, Status } from "@/lib/inbox/request-types";
import { getInitials } from "@/lib/inbox/request-utils";

type RequestListProps = {
  requests: Request[];
  selectedRequest: Request;
  search: string;
  filter: RequestFilter;
  statusOptions: Status[];
  onSearchChange: (value: string) => void;
  onFilterChange: (value: RequestFilter) => void;
  onSelect: (request: Request) => void;
};

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
          {(["All", ...statusOptions] as const).map((item) => {
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
                {item}
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
                        {request.received}
                      </span>
                    </div>

                    <div className="mt-1 truncate text-[10px] font-semibold text-black/55">
                      {request.subject}
                    </div>

                    <div className="mt-1 flex items-center gap-1.5">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[8px] font-bold ${
                          request.status === "New"
                            ? "bg-[#111] text-white"
                            : request.status === "Accepted"
                              ? "bg-black/[0.09] text-black/60"
                              : request.status === "Declined"
                                ? "bg-black/[0.04] text-black/30"
                                : "bg-black/[0.06] text-black/45"
                        }`}
                      >
                        {request.status}
                      </span>

                      <span className="rounded-full bg-black/[0.04] px-2 py-0.5 text-[8px] font-semibold text-black/35">
                        {request.type}
                      </span>
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
