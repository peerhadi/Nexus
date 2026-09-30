"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  UserRound,
  X,
} from "lucide-react";

import type { Request, Status } from "@/lib/inbox/request-types";
import { getInitials } from "@/lib/inbox/request-utils";
import { MetaPill } from "./meta-pill";

type RequestDetailProps = {
  request: Request;
  status: Status;
  statusOptions: Status[];
  onStatusChange: (status: Status) => void;
};

export function RequestDetail({
  request,
  status,
  statusOptions,
  onStatusChange,
}: RequestDetailProps) {
  return (
    <section className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      <header className="flex h-[74px] shrink-0 items-center justify-between border-b border-black/[0.08] bg-white px-5 sm:px-7">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black/[0.06] text-[10px] font-bold">
            {getInitials(request.name)}
          </div>

          <div className="min-w-0">
            <div className="truncate text-[12px] font-bold">{request.name}</div>

            <div className="truncate text-[9px] text-black/35">
              {request.email}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden rounded-full bg-black/[0.05] px-2.5 py-1.5 text-[8px] font-bold text-black/40 sm:block">
            {request.id}
          </span>

          <Link
            href="/inbox"
            className="flex h-8 items-center gap-1.5 rounded-lg bg-[#111] px-3 text-[9px] font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
          >
            Open conversation
            <ArrowUpRight size={11} />
          </Link>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="w-full px-5 py-6 sm:px-8">
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <div className="mb-2 text-[8px] font-bold uppercase tracking-[0.14em] text-black/25">
                Project request
              </div>

              <h2 className="text-[22px] font-bold tracking-[-0.045em]">
                {request.subject}
              </h2>

              <div className="mt-1 text-[9px] text-black/35">
                Received {request.received}
              </div>
            </div>

            <div className="relative shrink-0">
              <select
                value={status}
                onChange={(event) =>
                  onStatusChange(event.target.value as Status)
                }
                className="h-8 appearance-none rounded-lg border border-black/[0.08] bg-white pl-3 pr-7 text-[9px] font-bold outline-none"
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={11}
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-black/30"
              />
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <MetaPill label="Type" value={request.type} />
            <MetaPill label="Budget" value={request.budget} />
            <MetaPill label="Timeline" value={request.timeline} />
            <MetaPill label="Request" value={request.id} />
          </div>

          <div className="mt-7 rounded-2xl border border-black/[0.08] bg-white">
            <div className="flex min-h-[72px] items-center justify-between border-b border-black/[0.07] px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black/[0.06]">
                  <UserRound size={13} />
                </div>

                <div>
                  <div className="text-[11px] font-bold">{request.name}</div>

                  <div className="mt-0.5 text-[8px] text-black/30">
                    {request.email}
                  </div>
                </div>
              </div>

              <span className="text-[8px] text-black/25">
                {request.received}
              </span>
            </div>

            <div className="h-full px-6 py-8">
              <div className="mb-4 text-[8px] font-bold uppercase tracking-[0.16em] text-black/25">
                Message
              </div>

              <p className="max-w-4xl whitespace-pre-line text-[13px] leading-7 text-black/65">
                {request.message}
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => onStatusChange("Reviewing")}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-black/[0.08] bg-white text-[9px] font-bold text-black/55 transition-all hover:-translate-y-0.5 hover:bg-black/[0.025] hover:text-black"
            >
              <Clock3 size={12} />
              Mark reviewing
            </button>

            <button
              type="button"
              onClick={() => onStatusChange("Accepted")}
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#111] text-[9px] font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
            >
              <Check size={12} />
              Accept request
            </button>

            <button
              type="button"
              onClick={() => onStatusChange("Declined")}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-black/[0.08] bg-white text-[9px] font-bold text-black/40 transition-all hover:-translate-y-0.5 hover:bg-black/[0.025] hover:text-black"
            >
              <X size={12} />
              Decline
            </button>
          </div>

          <div className="mt-5 rounded-2xl border border-black/[0.08] bg-white p-6">
            <div className="flex items-center justify-between gap-5">
              <div className="min-w-0">
                <div className="text-[10px] font-bold">
                  Ready to become a project?
                </div>

                <div className="mt-1.5 max-w-xl text-[9px] leading-4 text-black/35">
                  Accept this request and move it into your active client
                  workflow.
                </div>
              </div>

              <button
                type="button"
                onClick={() => onStatusChange("Accepted")}
                className="shrink-0 rounded-xl bg-black/[0.06] px-4 py-2.5 text-[9px] font-bold text-black/55 transition-all hover:-translate-y-0.5 hover:bg-black/[0.1] hover:text-black"
              >
                Convert to project
              </button>
            </div>
          </div>

          <div className="h-8" />
        </div>
      </div>
    </section>
  );
}
