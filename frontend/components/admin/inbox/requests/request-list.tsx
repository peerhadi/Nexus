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
      return "bg-[var(--accent)] text-white";

    case "IN_PROGRESS":
      return "bg-[var(--border)] text-[var(--text-secondary)]";

    case "REPLIED":
      return "bg-[var(--surface-hover)] text-[var(--text-secondary)]";

    case "CLOSED":
      return "bg-[var(--surface-hover)] text-[var(--text-muted)]";
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
    <section className="flex h-full w-[360px] shrink-0 min-h-0 flex-col border-r border-[var(--border)] bg-[var(--surface)]">
      <div className="shrink-0 border-b border-[var(--border)] p-3">
        <div className="relative">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />

          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search requests..."
            className="h-9 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] pl-9 pr-3 text-[10px] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--border-strong)] focus:bg-[var(--surface)]"
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
                    ? "bg-[var(--accent)] text-white"
                    : "bg-[var(--surface-hover)] text-[var(--text-tertiary)] hover:bg-[var(--accent)]/[0.07] hover:text-[var(--text-primary)]"
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
              <Mail size={20} className="mx-auto text-[var(--text-disabled)]" />

              <div className="mt-3 text-[11px] font-bold">No requests</div>

              <div className="mt-1 text-[10px] text-[var(--text-muted)]">
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
                className={`w-full border-b border-[var(--border-subtle)] px-4 py-4 text-left transition-colors ${
                  active ? "bg-[var(--surface-hover)]" : "hover:bg-[var(--surface-hover)]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[10px] font-bold ${
                      active
                        ? "bg-[var(--accent)] text-white"
                        : "bg-[var(--surface-hover)] text-[var(--text-secondary)]"
                    }`}
                  >
                    {getInitials(request.name)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-[11px] font-bold">
                        {request.name}
                      </span>

                      <span className="shrink-0 text-[8px] text-[var(--text-muted)]">
                        {formatDate(request.createdAt)}
                      </span>
                    </div>

                    <div className="mt-1 truncate text-[10px] font-semibold text-[var(--text-secondary)]">
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
                        <span className="max-w-[130px] truncate rounded-full bg-[var(--surface-hover)] px-2 py-0.5 text-[8px] font-semibold text-[var(--text-muted)]">
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
