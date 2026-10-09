"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Archive, Mail, Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import type {
  Request,
  RequestFilter,
  RequestStatus,
} from "@/lib/inbox/request-types";

import { RequestDetail } from "@/components/admin/inbox/requests/request-detail";
import { RequestList } from "@/components/admin/inbox/requests/request-list";
import { Stat } from "@/components/admin/inbox/requests/stat";
import { API_URL } from "@/lib/api";

const statusOptions: RequestFilter[] = [
  "All",
  "NEW",
  "IN_PROGRESS",
  "REPLIED",
  "CLOSED",
];

export default function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<RequestFilter>("All");
  const [status, setStatus] = useState<RequestStatus>("NEW");

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [creatingProject, setCreatingProject] = useState(false);
  const [createdProjectRequestId, setCreatedProjectRequestId] = useState<
    string | null
  >(null);
  const [error, setError] = useState("");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        setLoading(true);
        setError("");

        const token =
          localStorage.getItem("nexus_token") ??
          sessionStorage.getItem("nexus_token");

        if (!token) {
          setError("Authentication required.");
          return;
        }

        const response = await fetch(`${API_URL}/requests`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(
            data?.message ?? data?.error ?? "Failed to load requests.",
          );
        }

        const loadedRequests: Request[] = Array.isArray(data)
          ? data
          : (data?.requests ?? []);

        setRequests(loadedRequests);

        if (loadedRequests.length > 0) {
          setSelectedId(loadedRequests[0].id);
          setStatus(loadedRequests[0].status);
        }
      } catch (error) {
        console.error("Failed to load requests:", error);

        setError(
          error instanceof Error ? error.message : "Failed to load requests.",
        );
      } finally {
        setLoading(false);
      }
    };

    void loadRequests();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileDrawerOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileDrawerOpen]);

  const filteredRequests = useMemo(() => {
    const query = search.trim().toLowerCase();

    return requests.filter((request) => {
      const matchesFilter = filter === "All" || request.status === filter;

      if (!matchesFilter) {
        return false;
      }

      if (!query) {
        return true;
      }

      return (
        request.name.toLowerCase().includes(query) ||
        request.email.toLowerCase().includes(query) ||
        request.subject?.toLowerCase().includes(query) ||
        request.company?.toLowerCase().includes(query) ||
        request.message.toLowerCase().includes(query) ||
        request.id.toLowerCase().includes(query)
      );
    });
  }, [requests, search, filter]);

  const selectedRequest =
    requests.find((request) => request.id === selectedId) ??
    filteredRequests[0] ??
    requests[0] ??
    null;

  function selectRequest(request: Request) {
    setSelectedId(request.id);
    setStatus(request.status);
    setError("");
    setMobileDrawerOpen(false);
  }

  async function updateRequestStatus(nextStatus: RequestStatus) {
    if (!selectedRequest || updating || creatingProject) {
      return;
    }

    const token =
      localStorage.getItem("nexus_token") ??
      sessionStorage.getItem("nexus_token");

    if (!token) {
      setError("Authentication required.");
      return;
    }

    try {
      setUpdating(true);
      setError("");

      const response = await fetch(
        `${API_URL}/requests/${selectedRequest.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: nextStatus,
          }),
        },
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.message ?? data?.error ?? "Failed to update request.",
        );
      }

      const updatedRequest: Request = data?.request ?? data;

      setRequests((current) =>
        current.map((request) =>
          request.id === updatedRequest.id ? updatedRequest : request,
        ),
      );

      setSelectedId(updatedRequest.id);
      setStatus(updatedRequest.status);
    } catch (error) {
      console.error("Failed to update request:", error);

      setError(
        error instanceof Error ? error.message : "Failed to update request.",
      );
    } finally {
      setUpdating(false);
    }
  }

  async function createProjectFromRequest() {
    if (
      !selectedRequest ||
      creatingProject ||
      createdProjectRequestId === selectedRequest.id
    ) {
      return;
    }

    const token =
      localStorage.getItem("nexus_token") ??
      sessionStorage.getItem("nexus_token");

    if (!token) {
      setError("Authentication required.");
      return;
    }

    try {
      setCreatingProject(true);
      setError("");

      const response = await fetch(
        `${API_URL}/requests/${selectedRequest.id}/project`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.message ??
            data?.error ??
            "Failed to create project from request.",
        );
      }

      const createdRequest: Request | undefined = data?.request;
      const createdProject = data?.project;

      if (createdRequest) {
        setRequests((current) =>
          current.map((request) =>
            request.id === createdRequest.id ? createdRequest : request,
          ),
        );

        setStatus(createdRequest.status);
      }

      setCreatedProjectRequestId(selectedRequest.id);

      console.log("Project created:", createdProject);
    } catch (error) {
      console.error("Failed to create project:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to create project from request.",
      );
    } finally {
      setCreatingProject(false);
    }
  }

  if (error && !selectedRequest) {
    return (
      <main className="flex h-dvh w-full items-center justify-center bg-[var(--surface-secondary)] px-5 text-[var(--text-primary)]">
        <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-6 py-7 text-center shadow-sm sm:px-8">
          <div className="text-sm font-bold">Failed to load requests</div>

          <div className="mt-2 break-words text-[10px] text-[var(--text-tertiary)]">
            {error}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex h-dvh w-full min-w-0 flex-col overflow-hidden bg-[var(--surface-secondary)] text-[var(--text-primary)]">
      <div className="flex h-full min-h-0 flex-col">
        {/* HEADER */}
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="flex h-[74px] shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-4 backdrop-blur-xl sm:px-8"
        >
          <div className="min-w-0">
            <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Communication
            </div>

            <h1 className="mt-1 text-[21px] font-bold tracking-[-0.045em]">
              Requests
            </h1>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              className="hidden items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 sm:flex"
            >
              <Mail size={14} className="text-[var(--text-muted)]" />

              <span className="text-[11px] font-semibold text-[var(--text-secondary)]">
                {requests.length} requests
              </span>
            </motion.div>

            <Link
              href="/inbox"
              className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-3 py-2 text-[10px] font-bold text-white transition-colors hover:bg-[var(--accent)]/80"
            >
              <Archive size={13} />
              <span className="hidden xs:inline">Inbox</span>
            </Link>
          </div>
        </motion.header>

        <div className="min-h-0 min-w-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1500px] p-3 sm:p-5">
            {/* STATS */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.25,
                delay: 0.04,
                ease: "easeOut",
              }}
              className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4"
            >
              <Stat
                label="New"
                value={
                  requests.filter((request) => request.status === "NEW").length
                }
              />

              <Stat
                label="In progress"
                value={
                  requests.filter((request) => request.status === "IN_PROGRESS")
                    .length
                }
              />

              <Stat
                label="Replied"
                value={
                  requests.filter((request) => request.status === "REPLIED")
                    .length
                }
              />

              <Stat
                label="Closed"
                value={
                  requests.filter((request) => request.status === "CLOSED")
                    .length
                }
              />
            </motion.div>

            {/* ERROR / SUCCESS */}
            <AnimatePresence initial={false}>
              {error && selectedRequest && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -4 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  className="mt-3 overflow-hidden rounded-xl border border-red-500/10 bg-red-500/[0.04] px-4 py-3 text-[10px] font-semibold text-red-600 sm:mt-4"
                >
                  {error}
                </motion.div>
              )}

              {createdProjectRequestId === selectedRequest?.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -4 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  className="mt-3 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[10px] font-semibold text-[var(--text-secondary)] sm:mt-4"
                >
                  Project created successfully.
                </motion.div>
              )}
            </AnimatePresence>

            {/* MAIN WORKSPACE */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.28,
                delay: 0.08,
                ease: "easeOut",
              }}
              className="relative mt-3 flex min-h-[600px] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] sm:mt-5"
            >
              {selectedRequest ? (
                <>
                  {/* =========================
                      DESKTOP REQUEST LIST
                  ========================== */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.22,
                      delay: 0.1,
                      ease: "easeOut",
                    }}
                    className="hidden min-h-0 shrink-0 lg:block"
                  >
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
                  </motion.div>

                  {/* =========================
                      MOBILE REQUEST DRAWER
                  ========================== */}
                  <AnimatePresence>
                    {mobileDrawerOpen && (
                      <>
                        {/* Backdrop */}
                        <motion.button
                          type="button"
                          aria-label="Close request menu"
                          className="fixed inset-0 z-40 bg-[var(--overlay)] backdrop-blur-[2px] lg:hidden"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.18 }}
                          onClick={() => setMobileDrawerOpen(false)}
                        />

                        {/* Sliding drawer */}
                        <motion.aside
                          initial={{ x: "-100%" }}
                          animate={{ x: 0 }}
                          exit={{ x: "-100%" }}
                          transition={{
                            type: "spring",
                            stiffness: 340,
                            damping: 32,
                            mass: 0.8,
                          }}
                          className="fixed inset-y-0 left-0 z-50 flex w-[min(90vw,400px)] flex-col border-r border-[var(--border)] bg-[var(--surface)] shadow-2xl lg:hidden"
                        >
                          {/* Drawer header */}
                          <div className="flex h-[64px] shrink-0 items-center justify-between border-b border-[var(--border)] px-4">
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                                Requests
                              </p>

                              <p className="text-sm font-semibold text-[var(--text-secondary)]">
                                {filteredRequests.length} request
                                {filteredRequests.length === 1 ? "" : "s"}
                              </p>
                            </div>

                            <button
                              type="button"
                              aria-label="Close request menu"
                              onClick={() => setMobileDrawerOpen(false)}
                              className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>

                          {/* Request list */}
                          <div className="min-h-0 flex-1 overflow-hidden">
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
                          </div>
                        </motion.aside>
                      </>
                    )}
                  </AnimatePresence>

                  {/* =========================
                      REQUEST DETAIL
                  ========================== */}
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={selectedRequest.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{
                        duration: 0.18,
                        ease: "easeOut",
                      }}
                      className="flex min-w-0 flex-1 flex-col"
                    >
                      {/* Mobile toolbar */}
                      <div className="flex h-[58px] shrink-0 items-center gap-3 border-b border-[var(--border)] bg-[var(--surface)] px-4 lg:hidden">
                        <button
                          type="button"
                          aria-label="Open request menu"
                          onClick={() => setMobileDrawerOpen(true)}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                        >
                          <Menu className="h-4 w-4" />
                        </button>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
                            {selectedRequest.subject || "Client request"}
                          </p>

                          <p className="truncate text-[11px] text-[var(--text-muted)]">
                            {selectedRequest.name} · {selectedRequest.email}
                          </p>
                        </div>

                        <span className="hidden shrink-0 rounded-full bg-[var(--surface-hover)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--text-tertiary)] xs:inline">
                          {selectedRequest.status.replace("_", " ")}
                        </span>
                      </div>

                      <div className="min-h-0 flex-1 overflow-y-auto">
                        <RequestDetail
                          request={selectedRequest}
                          status={status}
                          statusOptions={statusOptions}
                          onStatusChange={updateRequestStatus}
                          onCreateProject={createProjectFromRequest}
                          creatingProject={creatingProject}
                          projectCreated={
                            createdProjectRequestId === selectedRequest.id
                          }
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* STATUS TOASTS */}
                  <AnimatePresence>
                    {updating && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.16 }}
                        className="pointer-events-none fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[10px] font-bold text-[var(--text-secondary)] shadow-lg sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0"
                      >
                        Updating request...
                      </motion.div>
                    )}

                    {creatingProject && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.16 }}
                        className="pointer-events-none fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[10px] font-bold text-[var(--text-secondary)] shadow-lg sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0"
                      >
                        Creating project...
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="flex min-h-[600px] flex-1 items-center justify-center px-6 text-center"
                >
                  <div>
                    <Mail
                      size={22}
                      className="mx-auto text-[var(--text-disabled)]"
                    />

                    <div className="mt-3 text-[12px] font-bold">
                      No requests yet
                    </div>

                    <div className="mt-1 text-[10px] text-[var(--text-muted)]">
                      Requests submitted by clients will appear here.
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
