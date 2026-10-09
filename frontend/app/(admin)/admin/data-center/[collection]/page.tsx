"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Database,
  Download,
  ExternalLink,
  FolderKanban,
  LoaderCircle,
  MessageSquare,
  RefreshCw,
  Search,
  Users,
  Clock3,
  X,
  CircleAlert,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

type CollectionKey = "clients" | "projects" | "requests" | "conversations";

type RecordItem = Record<string, unknown> & {
  id?: string | number;
};

type Column = {
  key: string;
  label: string;
  type?: "text" | "date" | "status" | "email" | "progress" | "id";
};

type CollectionConfig = {
  title: string;
  description: string;
  endpoint: string;
  icon: typeof Database;
  columns: Column[];
  searchKeys: string[];
  statusOptions: string[];
};

const collections: Record<CollectionKey, CollectionConfig> = {
  clients: {
    title: "Clients",
    description: "User accounts registered in the Nexus workspace.",
    endpoint: "/users",
    icon: Users,
    columns: [
      { key: "id", label: "Record ID", type: "id" },
      { key: "name", label: "Name" },
      { key: "email", label: "Email", type: "email" },
      { key: "role", label: "Role", type: "status" },
      { key: "createdAt", label: "Created", type: "date" },
    ],
    searchKeys: ["id", "name", "email", "role"],
    statusOptions: ["CLIENT", "ADMIN"],
  },

  projects: {
    title: "Projects",
    description: "Projects, their delivery status, and recorded progress.",
    endpoint: "/projects",
    icon: FolderKanban,
    columns: [
      { key: "id", label: "Record ID", type: "id" },
      { key: "name", label: "Project" },
      { key: "status", label: "Status", type: "status" },
      { key: "progress", label: "Progress", type: "progress" },
      { key: "createdAt", label: "Created", type: "date" },
    ],
    searchKeys: ["id", "name", "status", "clientId"],
    statusOptions: ["PLANNING", "IN_PROGRESS", "REVIEW", "COMPLETED", "PAUSED"],
  },

  requests: {
    title: "Requests",
    description: "Incoming client requests and their current status.",
    endpoint: "/requests",
    icon: Clock3,
    columns: [
      { key: "id", label: "Record ID", type: "id" },
      { key: "subject", label: "Subject" },
      { key: "status", label: "Status", type: "status" },
      { key: "clientId", label: "Client ID", type: "id" },
      { key: "createdAt", label: "Created", type: "date" },
    ],
    searchKeys: ["id", "subject", "title", "status", "clientId"],
    statusOptions: ["NEW", "IN_PROGRESS", "REPLIED", "CLOSED"],
  },

  conversations: {
    title: "Conversations",
    description: "Communication records associated with client accounts.",
    endpoint: "/conversations",
    icon: MessageSquare,
    columns: [
      { key: "id", label: "Record ID", type: "id" },
      { key: "subject", label: "Conversation" },
      { key: "status", label: "Status", type: "status" },
      { key: "clientId", label: "Client ID", type: "id" },
      { key: "createdAt", label: "Created", type: "date" },
    ],
    searchKeys: ["id", "subject", "title", "status", "clientId"],
    statusOptions: ["OPEN", "CLOSED"],
  },
};

function getToken() {
  if (typeof window === "undefined") return null;

  return (
    localStorage.getItem("nexus_token") ?? sessionStorage.getItem("nexus_token")
  );
}

async function fetchRecords(endpoint: string): Promise<RecordItem[]> {
  const token = getToken();

  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      response.status === 401 || response.status === 403
        ? "Your session may have expired or you don't have permission to view these records."
        : `The API returned status ${response.status}.`,
    );
  }

  const payload: unknown = await response.json();

  if (Array.isArray(payload)) return payload as RecordItem[];

  if (payload && typeof payload === "object") {
    const object = payload as Record<string, unknown>;

    for (const key of [
      "data",
      "items",
      "results",
      "users",
      "projects",
      "requests",
      "conversations",
    ]) {
      if (Array.isArray(object[key])) {
        return object[key] as RecordItem[];
      }

      if (object[key] && typeof object[key] === "object") {
        const nested = object[key] as Record<string, unknown>;

        for (const nestedKey of [
          "data",
          "items",
          "results",
          "users",
          "projects",
          "requests",
          "conversations",
        ]) {
          if (Array.isArray(nested[nestedKey])) {
            return nested[nestedKey] as RecordItem[];
          }
        }
      }
    }
  }

  throw new Error(
    "The API responded, but the returned records were not in a recognized array format.",
  );
}

function readValue(record: RecordItem, key: string): unknown {
  const direct = record[key];

  if (direct !== undefined && direct !== null) return direct;

  // Support common relation shapes without assuming every endpoint
  // returns the same Prisma include structure.
  if (key === "name") {
    const client = record.client;

    if (client && typeof client === "object") {
      return (client as Record<string, unknown>).name;
    }
  }

  if (key === "email") {
    const client = record.client;

    if (client && typeof client === "object") {
      return (client as Record<string, unknown>).email;
    }
  }

  if (key === "clientId") {
    const client = record.client;

    if (client && typeof client === "object") {
      return (client as Record<string, unknown>).id;
    }
  }

  return null;
}

function displayText(value: unknown): string {
  if (value === null || value === undefined || value === "") return "—";

  if (typeof value === "object") {
    const object = value as Record<string, unknown>;

    if (typeof object.name === "string") return object.name;
    if (typeof object.email === "string") return object.email;

    return "—";
  }

  return String(value);
}

function formatDate(value: unknown): string {
  if (typeof value !== "string" && typeof value !== "number") return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatStatus(value: unknown): string {
  return displayText(value)
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function statusClasses(value: unknown) {
  const status = String(value ?? "").toUpperCase();

  if (["COMPLETED", "CLOSED", "REPLIED", "CLIENT"].includes(status)) {
    return "border-[var(--success)]/20 bg-[var(--success-soft)] text-[var(--success)]";
  }

  if (["IN_PROGRESS", "REVIEW", "NEW", "OPEN"].includes(status)) {
    return "border-[var(--info)]/20 bg-[var(--info-soft)] text-[var(--info)]";
  }

  if (["PAUSED"].includes(status)) {
    return "border-[var(--warning)]/20 bg-[var(--warning-soft)] text-[var(--warning)]";
  }

  if (["ADMIN"].includes(status)) {
    return "border-[var(--accent)]/20 bg-[var(--accent-soft)] text-[var(--accent)]";
  }

  return "border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-secondary)]";
}

function exportCsv(records: RecordItem[], columns: Column[]) {
  const escapeCell = (value: unknown) => {
    const text = displayText(value);
    return `"${text.replace(/"/g, '""')}"`;
  };

  const rows = [
    columns.map((column) => escapeCell(column.label)).join(","),
    ...records.map((record) =>
      columns
        .map((column) => escapeCell(readValue(record, column.key)))
        .join(","),
    ),
  ];

  const blob = new Blob([rows.join("\r\n")], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = "nexus-data-export.csv";
  anchor.click();

  URL.revokeObjectURL(url);
}

export default function DataCollectionPage() {
  const params = useParams<{ collection: string }>();
  const collectionKey = params.collection as CollectionKey;
  const config = collections[collectionKey];

  const [records, setRecords] = useState<RecordItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<RecordItem | null>(null);

  const pageSize = 10;

  const loadRecords = useCallback(
    async (refresh = false) => {
      if (!config) {
        setError("This data collection does not exist.");
        setLoading(false);
        return;
      }

      if (refresh) setRefreshing(true);
      else setLoading(true);

      setError("");

      try {
        const result = await fetchRecords(config.endpoint);
        setRecords(result);
      } catch (cause) {
        setError(
          cause instanceof Error ? cause.message : "Could not load records.",
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [config],
  );

  useEffect(() => {
    void loadRecords();
  }, [loadRecords]);

  useEffect(() => {
    setPage(1);
  }, [query, statusFilter, collectionKey]);

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = records.filter((record) => {
      const matchesQuery =
        !normalizedQuery ||
        config.searchKeys.some((key) =>
          displayText(readValue(record, key))
            .toLowerCase()
            .includes(normalizedQuery),
        );

      const matchesStatus =
        statusFilter === "ALL" ||
        String(
          readValue(record, "status") ?? record.role ?? "",
        ).toUpperCase() === statusFilter;

      return matchesQuery && matchesStatus;
    });

    const valueForSort = (record: RecordItem) => readValue(record, sortKey);

    return [...filtered].sort((a, b) => {
      const aValue = valueForSort(a);
      const bValue = valueForSort(b);

      let comparison = 0;

      if (sortKey.toLowerCase().includes("date") || sortKey === "createdAt") {
        comparison =
          new Date(String(aValue ?? 0)).getTime() -
          new Date(String(bValue ?? 0)).getTime();
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        comparison = aValue - bValue;
      } else {
        comparison = displayText(aValue).localeCompare(displayText(bValue));
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [records, query, statusFilter, config, sortKey, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / pageSize));

  const visibleRecords = filteredRecords.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  if (!config) {
    return (
      <main className="nexus-page min-h-dvh px-5 pb-12 pt-24 lg:ml-[100px] lg:px-9 lg:pt-10">
        <div className="mx-auto max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <Database size={22} className="text-[var(--text-muted)]" />
          <h1 className="mt-4 text-xl font-semibold text-[var(--text-primary)]">
            Collection not found
          </h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            This Data Center collection is not configured.
          </p>
          <Link
            href="/admin/data-center"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]"
          >
            <ArrowLeft size={15} />
            Back to Data Center
          </Link>
        </div>
      </main>
    );
  }

  const Icon = config.icon;

  return (
    <main className="nexus-page min-h-dvh px-4 pb-12 pt-20 sm:px-6 lg:ml-[100px] lg:px-9 lg:pt-9">
      <div className="mx-auto max-w-[1440px] space-y-6">
        {/* Page heading */}
        <motion.header
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col justify-between gap-4 border-b border-[var(--border)] pb-6 sm:flex-row sm:items-end"
        >
          <div>
            <Link
              href="/admin/data-center"
              className="mb-4 inline-flex items-center gap-2 text-xs font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
            >
              <ArrowLeft size={14} />
              Data Center
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                <Icon size={19} className="text-[var(--text-secondary)]" />
              </div>

              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                  {config.title}
                </h1>
                <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                  {config.description}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => void loadRecords(true)}
              disabled={loading || refreshing}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-hover)] disabled:opacity-60"
            >
              <RefreshCw
                size={13}
                className={refreshing ? "animate-spin" : ""}
              />
              Refresh
            </button>

            <button
              type="button"
              onClick={() => exportCsv(filteredRecords, config.columns)}
              disabled={filteredRecords.length === 0}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-hover)] disabled:opacity-50"
            >
              <Download size={13} />
              Export CSV
            </button>
          </div>
        </motion.header>

        {/* Summary strip */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
            <p className="text-[11px] text-[var(--text-muted)]">
              Total records
            </p>
            <p className="mt-2 text-2xl font-semibold tabular-nums text-[var(--text-primary)]">
              {loading ? "—" : records.length.toLocaleString()}
            </p>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
            <p className="text-[11px] text-[var(--text-muted)]">
              Matching records
            </p>
            <p className="mt-2 text-2xl font-semibold tabular-nums text-[var(--text-primary)]">
              {loading ? "—" : filteredRecords.length.toLocaleString()}
            </p>
          </div>

          <div className="col-span-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:col-span-1">
            <p className="text-[11px] text-[var(--text-muted)]">Data source</p>
            <p className="mt-2 truncate text-sm font-semibold text-[var(--text-primary)]">
              {config.endpoint}
            </p>
          </div>
        </div>

        {/* Table container */}
        <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          {/* Search and filters */}
          <div className="flex flex-col gap-3 border-b border-[var(--border)] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-[340px]">
              <Search
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={`Search ${config.title.toLowerCase()}...`}
                className="h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] pl-9 pr-9 text-xs text-[var(--text-primary)] outline-none transition focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--focus-ring)]"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-[var(--text-muted)] hover:bg-[var(--surface-hover)]"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[var(--text-muted)]">
                Status
              </span>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="h-9 min-w-32 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 text-xs text-[var(--text-primary)] outline-none focus:border-[var(--border-focus)]"
              >
                <option value="ALL">All statuses</option>
                {config.statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {formatStatus(status)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-start gap-3 border-b border-[var(--danger)]/20 bg-[var(--danger-soft)] px-4 py-3"
              >
                <CircleAlert
                  size={15}
                  className="mt-0.5 shrink-0 text-[var(--danger)]"
                />
                <p className="flex-1 text-xs leading-5 text-[var(--text-primary)]">
                  {error}
                </p>
                <button
                  type="button"
                  onClick={() => void loadRecords(true)}
                  className="text-xs font-semibold text-[var(--text-primary)] underline underline-offset-4"
                >
                  Retry
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actual table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--surface-secondary)]">
                  {config.columns.map((column) => (
                    <th
                      key={column.key}
                      className="whitespace-nowrap px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          if (sortKey === column.key) {
                            setSortDirection((direction) =>
                              direction === "asc" ? "desc" : "asc",
                            );
                          } else {
                            setSortKey(column.key);
                            setSortDirection("asc");
                          }
                        }}
                        className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--text-primary)]"
                      >
                        {column.label}
                        <ArrowUpDown
                          size={11}
                          className={
                            sortKey === column.key
                              ? "text-[var(--accent)]"
                              : "opacity-40"
                          }
                        />
                      </button>
                    </th>
                  ))}
                  <th className="w-12 px-4 py-3" />
                </tr>
              </thead>

              <tbody className="divide-y divide-[var(--border-subtle)]">
                {loading ? (
                  Array.from({ length: 6 }).map((_, rowIndex) => (
                    <tr key={rowIndex}>
                      {config.columns.map((column) => (
                        <td key={column.key} className="px-5 py-4">
                          <div className="h-3 w-24 animate-pulse rounded bg-[var(--surface-tertiary)]" />
                        </td>
                      ))}
                      <td className="px-4 py-4" />
                    </tr>
                  ))
                ) : visibleRecords.length === 0 ? (
                  <tr>
                    <td
                      colSpan={config.columns.length + 1}
                      className="px-5 py-16 text-center"
                    >
                      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]">
                        <Search
                          size={17}
                          className="text-[var(--text-muted)]"
                        />
                      </div>
                      <p className="mt-3 text-sm font-medium text-[var(--text-primary)]">
                        {error ? "Records unavailable" : "No records found"}
                      </p>
                      <p className="mt-1 text-xs text-[var(--text-muted)]">
                        {error
                          ? "Resolve the connection issue and retry."
                          : "Try changing your search or status filter."}
                      </p>
                    </td>
                  </tr>
                ) : (
                  visibleRecords.map((record, index) => (
                    <motion.tr
                      key={String(record.id ?? index)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.15 }}
                      onClick={() => setSelected(record)}
                      className="cursor-pointer transition-colors hover:bg-[var(--surface-hover)]"
                    >
                      {config.columns.map((column) => {
                        const value = readValue(record, column.key);

                        return (
                          <td
                            key={column.key}
                            className="max-w-[280px] px-5 py-4"
                          >
                            {column.type === "status" ? (
                              <span
                                className={`inline-flex whitespace-nowrap rounded-md border px-2 py-1 text-[10px] font-medium ${statusClasses(value)}`}
                              >
                                {formatStatus(value)}
                              </span>
                            ) : column.type === "progress" ? (
                              <div className="flex min-w-[110px] items-center gap-2">
                                <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[var(--surface-tertiary)]">
                                  <div
                                    className="h-full rounded-full bg-[var(--accent)]"
                                    style={{
                                      width: `${Math.min(100, Math.max(0, Number(value) || 0))}%`,
                                    }}
                                  />
                                </div>
                                <span className="text-[11px] tabular-nums text-[var(--text-secondary)]">
                                  {value === null || value === undefined
                                    ? "—"
                                    : `${value}%`}
                                </span>
                              </div>
                            ) : column.type === "date" ? (
                              <span className="whitespace-nowrap text-[11px] text-[var(--text-secondary)]">
                                {formatDate(value)}
                              </span>
                            ) : column.type === "email" ? (
                              <span className="block truncate text-xs text-[var(--text-secondary)]">
                                {displayText(value)}
                              </span>
                            ) : column.type === "id" ? (
                              <span
                                title={displayText(value)}
                                className="block max-w-[150px] truncate font-mono text-[10px] text-[var(--text-muted)]"
                              >
                                {displayText(value)}
                              </span>
                            ) : (
                              <span className="block truncate text-xs font-medium text-[var(--text-primary)]">
                                {displayText(value)}
                              </span>
                            )}
                          </td>
                        );
                      })}

                      <td className="px-4 py-4 text-right">
                        <ExternalLink
                          size={13}
                          className="inline-block text-[var(--text-muted)]"
                        />
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-3 border-t border-[var(--border)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-[11px] text-[var(--text-muted)]">
              {loading
                ? "Loading records..."
                : filteredRecords.length === 0
                  ? "No matching records"
                  : `Showing ${(page - 1) * pageSize + 1}–${Math.min(
                      page * pageSize,
                      filteredRecords.length,
                    )} of ${filteredRecords.length} records`}
            </p>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                aria-label="Previous page"
                disabled={page <= 1 || loading}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-hover)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={15} />
              </button>

              <span className="min-w-16 text-center text-[11px] tabular-nums text-[var(--text-secondary)]">
                Page {page} of {totalPages}
              </span>

              <button
                type="button"
                aria-label="Next page"
                disabled={page >= totalPages || loading}
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-hover)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </section>

        <p className="text-[10px] leading-5 text-[var(--text-muted)]">
          Records are read from the configured Nexus API. This page does not
          modify or delete database records.
        </p>
      </div>

      {/* Record details drawer */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.button
              type="button"
              aria-label="Close record details"
              onClick={() => setSelected(null)}
              className="fixed inset-0 z-40 bg-[var(--overlay)] backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[460px] flex-col border-l border-[var(--border)] bg-[var(--surface)] shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                    Record details
                  </p>
                  <h2 className="mt-1 text-base font-semibold text-[var(--text-primary)]">
                    {config.title.slice(0, -1) || "Record"}
                  </h2>
                </div>

                <button
                  type="button"
                  aria-label="Close details"
                  onClick={() => setSelected(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto p-5">
                <div className="mb-5 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] p-4">
                  <p className="text-[10px] text-[var(--text-muted)]">
                    Record identifier
                  </p>
                  <p className="mt-2 break-all font-mono text-xs text-[var(--text-primary)]">
                    {displayText(selected.id)}
                  </p>
                </div>

                <div className="divide-y divide-[var(--border-subtle)]">
                  {Object.entries(selected).map(([key, value]) => (
                    <div
                      key={key}
                      className="grid grid-cols-[120px_1fr] gap-3 py-3"
                    >
                      <span className="break-words text-[11px] text-[var(--text-muted)]">
                        {key.replace(/([A-Z])/g, " $1")}
                      </span>
                      <span className="break-words text-xs leading-5 text-[var(--text-primary)]">
                        {value && typeof value === "object"
                          ? JSON.stringify(value, null, 2)
                          : displayText(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[var(--border)] p-4">
                <button
                  type="button"
                  onClick={() => {
                    void navigator.clipboard.writeText(
                      JSON.stringify(selected, null, 2),
                    );
                  }}
                  className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                >
                  <Download size={14} />
                  Copy record JSON
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
