"use client";

import Link from "next/link";
import { Archive, Mail } from "lucide-react";
import { useMemo, useState } from "react";

import { requests, statusOptions } from "@/lib/inbox/request-data";
import type { Request, RequestFilter, Status } from "@/lib/inbox/request-types";
import { filterRequests } from "@/lib/inbox/request-utils";
import { RequestDetail } from "@/components/admin/inbox/requests/request-detail";
import { RequestList } from "@/components/admin/inbox/requests/request-list";
import { Stat } from "@/components/admin/inbox/requests/stat";

export default function RequestsPage() {
  const [selectedId, setSelectedId] = useState("REQ-001");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<RequestFilter>("All");
  const [status, setStatus] = useState<Status>("New");

  const filteredRequests = useMemo(
    () => filterRequests(requests, search, filter),
    [search, filter],
  );

  const selectedRequest =
    requests.find((request) => request.id === selectedId) ?? requests[0];

  function selectRequest(request: Request) {
    setSelectedId(request.id);
    setStatus(request.status);
  }

  return (
    <main className="flex h-dvh w-full min-w-0 max-w-none overflow-hidden bg-[#f7f7f5] text-[#111]">
      <div className="flex h-full w-full min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-[74px] w-full shrink-0 items-center justify-between border-b border-black/[0.08] bg-white/85 px-5 backdrop-blur-xl sm:px-8">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-[21px] font-bold tracking-[-0.045em]">
                Requests
              </h1>

              <span className="rounded-full bg-black/[0.06] px-2 py-0.5 text-[9px] font-bold text-black/45">
                {requests.length}
              </span>
            </div>

            <p className="mt-0.5 text-[10px] text-black/35">
              Incoming Nexus project requests
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/inbox"
              className="flex items-center gap-1.5 rounded-lg border border-black/[0.08] bg-white px-2.5 py-2 text-[9px] font-semibold text-black/45 transition-colors hover:bg-black/[0.03] hover:text-black"
            >
              <Mail size={12} />
              Inbox
            </Link>

            <Link
              href="/inbox/archive"
              className="hidden items-center gap-1.5 rounded-lg border border-black/[0.08] bg-white px-2.5 py-2 text-[9px] font-semibold text-black/45 transition-colors hover:bg-black/[0.03] hover:text-black sm:flex"
            >
              <Archive size={12} />
              Archive
            </Link>
          </div>
        </header>

        <div className="grid w-full shrink-0 grid-cols-3 border-b border-black/[0.08] bg-white">
          <Stat
            label="New"
            value={
              requests.filter((request) => request.status === "New").length
            }
          />

          <Stat
            label="Reviewing"
            value={
              requests.filter((request) => request.status === "Reviewing")
                .length
            }
          />

          <Stat
            label="Accepted"
            value={
              requests.filter((request) => request.status === "Accepted").length
            }
          />
        </div>

        <div className="flex min-h-0 w-full min-w-0 flex-1 overflow-hidden">
          <RequestList
            requests={filteredRequests}
            selectedRequest={selectedRequest}
            search={search}
            filter={filter}
            statusOptions={statusOptions}
            onSearchChange={setSearch}
            onFilterChange={setFilter}
            onSelect={selectRequest}
          />

          <RequestDetail
            request={selectedRequest}
            status={status}
            statusOptions={statusOptions}
            onStatusChange={setStatus}
          />
        </div>
      </div>
    </main>
  );
}
