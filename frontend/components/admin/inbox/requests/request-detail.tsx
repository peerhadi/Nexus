"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  FolderPlus,
  UserRound,
  X,
} from "lucide-react";

import type { Request, RequestStatus } from "@/lib/inbox/request-types";
import { useAlert } from "@/lib/alert";
import { MetaPill } from "./meta-pill";

type RequestDetailProps = {
  request: Request;
  status: RequestStatus;
  statusOptions: string[];
  onStatusChange: (status: RequestStatus) => void | Promise<void>;
  onCreateProject: () => void | Promise<void>;
  creatingProject?: boolean;
  projectCreated?: boolean;
};

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
  return new Date(date).toLocaleString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function RequestDetail({
  request,
  status,
  statusOptions,
  onStatusChange,
  onCreateProject,
  creatingProject = false,
  projectCreated = true,
}: RequestDetailProps) {
  const { showAlert } = useAlert();

  const hasProject = !!request.project || projectCreated;
  const client = request.client;

  const handleStatusChange = async (nextStatus: RequestStatus) => {
    if (nextStatus === status) return;
    console.log(hasProject, request, projectCreated);
    try {
      await onStatusChange(nextStatus);

      showAlert(
        "success",
        "Status updated",
        `Request marked as ${getStatusLabel(nextStatus)}.`,
      );
    } catch (error) {
      showAlert(
        "error",
        "Update failed",
        error instanceof Error
          ? error.message
          : "Unable to update the request status.",
      );
    }
  };

  const handleCreateProject = async () => {
    try {
      await onCreateProject();

      showAlert(
        "success",
        "Project created",
        "The project has been successfully created.",
      );
    } catch (error) {
      showAlert(
        "error",
        "Project creation failed",
        error instanceof Error
          ? error.message
          : "Unable to create the project.",
      );
    }
  };

  return (
    <section className="flex h-full min-h-0 min-w-0 flex-1 flex-col">
      <header className="flex h-[74px] shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-5 sm:px-7">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-hover)] text-[10px] font-bold">
            {request.name
              .trim()
              .split(/\s+/)
              .map((part) => part[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>

          <div className="min-w-0">
            <div className="truncate text-[12px] font-bold">{request.name}</div>

            <div className="truncate text-[9px] text-[var(--text-muted)]">
              {request.email}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden rounded-full bg-[var(--surface-hover)] px-2.5 py-1.5 text-[8px] font-bold text-[var(--text-tertiary)] sm:block">
            {request.id}
          </span>

          <Link
            href="/inbox"
            className="flex h-8 items-center gap-1.5 rounded-lg bg-[var(--accent)] px-3 text-[9px] font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
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
              <div className="mb-2 text-[8px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                Project request
              </div>

              <h2 className="text-[22px] font-bold tracking-[-0.045em]">
                {request.subject || "Untitled request"}
              </h2>

              <div className="mt-1 text-[9px] text-[var(--text-muted)]">
                Received {formatDate(request.createdAt)}
              </div>
            </div>

            <div className="relative shrink-0">
              <select
                value={status}
                onChange={(event) =>
                  handleStatusChange(event.target.value as RequestStatus)
                }
                className="h-8 appearance-none rounded-lg border border-[var(--border)] bg-[var(--surface)] pl-3 pr-7 text-[9px] font-bold outline-none"
              >
                {statusOptions
                  .filter((option): option is RequestStatus => option !== "All")
                  .map((option) => (
                    <option key={option} value={option}>
                      {getStatusLabel(option)}
                    </option>
                  ))}
              </select>

              <ChevronDown
                size={11}
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <MetaPill label="Status" value={getStatusLabel(status)} />

            <MetaPill label="Client" value={client?.name ?? request.name} />

            <MetaPill
              label="Company"
              value={request.company || "Not provided"}
            />

            <MetaPill label="Request" value={request.id} />
          </div>

          <div className="mt-7 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            <div className="flex min-h-[72px] items-center justify-between border-b border-[var(--border)] px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--surface-hover)]">
                  <UserRound size={13} />
                </div>

                <div>
                  <div className="text-[11px] font-bold">{request.name}</div>

                  <div className="mt-0.5 text-[8px] text-[var(--text-muted)]">
                    {request.email}
                  </div>
                </div>
              </div>

              <span className="text-[8px] text-[var(--text-muted)]">
                {formatDate(request.createdAt)}
              </span>
            </div>

            <div className="px-6 py-8">
              <div className="mb-4 text-[8px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                Message
              </div>

              <p className="max-w-4xl whitespace-pre-line text-[13px] leading-7 text-[var(--text-secondary)]">
                {request.message}
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-4">
            <button
              type="button"
              onClick={() => handleStatusChange("IN_PROGRESS")}
              disabled={status === "IN_PROGRESS"}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[9px] font-bold text-[var(--text-secondary)] transition-all hover:-translate-y-0.5 hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0"
            >
              <Clock3 size={12} />
              Mark in progress
            </button>

            <button
              type="button"
              onClick={() => handleStatusChange("REPLIED")}
              disabled={status === "REPLIED"}
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[var(--accent)] text-[9px] font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0"
            >
              <Check size={12} />
              Mark replied
            </button>

            <button
              type="button"
              onClick={() => handleStatusChange("CLOSED")}
              disabled={status === "CLOSED"}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[9px] font-bold text-[var(--text-tertiary)] transition-all hover:-translate-y-0.5 hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0"
            >
              <X size={12} />
              Close request
            </button>

            <button
              type="button"
              onClick={handleCreateProject}
              disabled={creatingProject || hasProject}
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[var(--accent)] text-[9px] font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
            >
              {hasProject ? (
                <>
                  <Check size={12} />
                  Project created
                </>
              ) : creatingProject ? (
                <>
                  <Clock3 size={12} />
                  Creating project...
                </>
              ) : (
                <>
                  <FolderPlus size={12} />
                  Create project
                </>
              )}
            </button>
          </div>

          <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <div className="flex items-center justify-between gap-5">
              <div className="min-w-0">
                <div className="text-[10px] font-bold">Request status</div>

                <div className="mt-1.5 max-w-xl text-[9px] leading-4 text-[var(--text-muted)]">
                  This request is currently marked as{" "}
                  <span className="font-bold text-[var(--text-secondary)]">
                    {getStatusLabel(status)}
                  </span>
                  .
                </div>
              </div>

              {status !== "CLOSED" && (
                <button
                  type="button"
                  onClick={() => handleStatusChange("CLOSED")}
                  className="shrink-0 rounded-xl bg-[var(--surface-hover)] px-4 py-2.5 text-[9px] font-bold text-[var(--text-secondary)] transition-all hover:-translate-y-0.5 hover:bg-[var(--accent)]/[0.1] hover:text-[var(--text-primary)]"
                >
                  Close request
                </button>
              )}
            </div>
          </div>

          <div className="h-8" />
        </div>
      </div>
    </section>
  );
}
