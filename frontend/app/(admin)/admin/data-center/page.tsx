"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Boxes,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Database,
  FolderKanban,
  HardDrive,
  LoaderCircle,
  MessageSquare,
  RefreshCw,
  Server,
  ShieldCheck,
  Users,
  X,
  XCircle,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

type ConnectionState = "checking" | "online" | "error";

type DataSection = {
  key: string;
  title: string;
  description: string;
  href: string;
  icon: typeof Database;
  endpoint: string;
  count: number | null;
  status: ConnectionState;
  label: string;
};

type Stats = {
  totalProjects: number;
  completedProjects: number;
  activeProjects: number;
  requests: number;
  averageProgress: number;
};

type ActivityItem = {
  id: string;
  title: string;
  description: string;
  date: string | null;
  type: "project" | "request" | "conversation";
};

function getToken() {
  if (typeof window === "undefined") return null;

  return (
    localStorage.getItem("nexus_token") ?? sessionStorage.getItem("nexus_token")
  );
}

async function apiGet(path: string) {
  const token = getToken();

  const response = await fetch(`${API_URL}${path}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`${path} returned ${response.status}`);
  }

  return response.json();
}

function unwrapArray(value: unknown): Record<string, unknown>[] | null {
  if (Array.isArray(value)) {
    return value as Record<string, unknown>[];
  }

  if (!value || typeof value !== "object") return null;

  const object = value as Record<string, unknown>;

  for (const key of [
    "data",
    "items",
    "results",
    "users",
    "projects",
    "requests",
    "conversations",
  ]) {
    const nested = object[key];

    if (Array.isArray(nested)) {
      return nested as Record<string, unknown>[];
    }

    if (nested && typeof nested === "object") {
      const result = unwrapArray(nested);
      if (result) return result;
    }
  }

  return null;
}

function unwrapStats(value: unknown): Stats | null {
  if (!value || typeof value !== "object") return null;

  const object = value as Record<string, unknown>;
  const nested = object.stats ?? object.data ?? value;

  if (!nested || typeof nested !== "object") return null;

  const candidate = nested as Record<string, unknown>;
  const keys: (keyof Stats)[] = [
    "totalProjects",
    "completedProjects",
    "activeProjects",
    "requests",
    "averageProgress",
  ];

  if (!keys.every((key) => typeof candidate[key] === "number")) {
    return null;
  }

  return {
    totalProjects: candidate.totalProjects as number,
    completedProjects: candidate.completedProjects as number,
    activeProjects: candidate.activeProjects as number,
    requests: candidate.requests as number,
    averageProgress: candidate.averageProgress as number,
  };
}

function getDate(item: Record<string, unknown>) {
  const value =
    item.updatedAt ?? item.createdAt ?? item.lastMessageAt ?? item.date;

  if (typeof value !== "string" && typeof value !== "number") return null;

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function formatDate(value: string | null) {
  if (!value) return "Date unavailable";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function relativeDate(value: string | null) {
  if (!value) return "Date unavailable";

  const timestamp = new Date(value).getTime();
  const difference = Date.now() - timestamp;

  if (difference < 0) return formatDate(value);

  const minutes = Math.floor(difference / 60_000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return formatDate(value);
}

function getString(
  item: Record<string, unknown>,
  keys: string[],
  fallback: string,
) {
  for (const key of keys) {
    const value = item[key];

    if (typeof value === "string" && value.trim()) {
      return value;
    }
  }

  return fallback;
}

function getActivity(
  records: Record<string, unknown>[],
  type: ActivityItem["type"],
): ActivityItem[] {
  return records.map((item, index) => {
    const title =
      type === "project"
        ? getString(item, ["name", "title"], "Untitled project")
        : type === "request"
          ? getString(item, ["subject", "title", "name"], "Untitled request")
          : getString(item, ["subject", "title", "name"], "Conversation");

    const status = getString(item, ["status"], "");

    const description =
      type === "project"
        ? `Project${status ? ` · ${status.replaceAll("_", " ").toLowerCase()}` : ""}`
        : type === "request"
          ? `Request${status ? ` · ${status.replaceAll("_", " ").toLowerCase()}` : ""}`
          : `Conversation${status ? ` · ${status.toLowerCase()}` : ""}`;

    return {
      id: String(item.id ?? `${type}-${index}`),
      title,
      description,
      date: getDate(item),
      type,
    };
  });
}

const initialSections: DataSection[] = [
  {
    key: "clients",
    title: "Clients",
    description: "User records and client accounts",
    href: "/admin/data-center/clients",
    icon: Users,
    endpoint: "/users",
    count: null,
    status: "checking",
    label: "User records",
  },
  {
    key: "projects",
    title: "Projects",
    description: "Project records and delivery status",
    href: "/admin/data-center/projects",
    icon: FolderKanban,
    endpoint: "/projects",
    count: null,
    status: "checking",
    label: "Project records",
  },
  {
    key: "requests",
    title: "Requests",
    description: "Incoming work and service requests",
    href: "/admin/data-center/requests",
    icon: Boxes,
    endpoint: "/requests",
    count: null,
    status: "checking",
    label: "Request records",
  },
  {
    key: "conversations",
    title: "Conversations",
    description: "Client communication records",
    href: "/admin/data-center/conversations",
    icon: MessageSquare,
    endpoint: "/conversations",
    count: null,
    status: "checking",
    label: "Conversation records",
  },
];

export default function DataCenterPage() {
  const [sections, setSections] = useState(initialSections);
  const [stats, setStats] = useState<Stats | null>(null);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [apiStatus, setApiStatus] = useState<ConnectionState>("checking");
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [error, setError] = useState("");

  const loadData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    setError("");

    const paths = [
      { key: "clients", path: "/users" },
      { key: "projects", path: "/projects" },
      { key: "requests", path: "/requests" },
      { key: "conversations", path: "/conversations" },
    ];

    const results = await Promise.allSettled([
      apiGet("/stats"),
      ...paths.map((item) => apiGet(item.path)),
    ]);

    const statsResult = results[0];

    if (statsResult.status === "fulfilled") {
      setApiStatus("online");
      setStats(unwrapStats(statsResult.value));
    } else {
      setApiStatus("error");
      setStats(null);
      setError(
        "Could not load dashboard statistics. Check your API connection and administrator session.",
      );
    }

    const loaded: Record<string, Record<string, unknown>[] | null> = {};

    const nextSections = initialSections.map((section, index) => {
      const result = results[index + 1];

      if (result.status === "fulfilled") {
        const records = unwrapArray(result.value);
        loaded[section.key] = records;

        return {
          ...section,
          count: records?.length ?? null,
          status: records ? ("online" as const) : ("error" as const),
        };
      }

      loaded[section.key] = null;

      return {
        ...section,
        count: null,
        status: "error" as const,
      };
    });

    setSections(nextSections);

    const activityItems = [
      ...getActivity(loaded.projects ?? [], "project"),
      ...getActivity(loaded.requests ?? [], "request"),
      ...getActivity(loaded.conversations ?? [], "conversation"),
    ]
      .sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;

        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })
      .slice(0, 6);

    setActivity(activityItems);
    setLastUpdated(new Date().toISOString());

    if (statsResult.status === "fulfilled" && !unwrapStats(statsResult.value)) {
      setError(
        "The API responded, but its statistics did not match the expected format.",
      );
    }

    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const totalRecords = sections.reduce(
    (sum, section) => sum + (section.count ?? 0),
    0,
  );

  const failedSections = sections.filter(
    (section) => section.status === "error",
  ).length;

  return (
    <main className="nexus-page min-h-dvh px-4 pb-12 pt-20 sm:px-6 lg:ml-[50px] lg:px-9 lg:pt-9">
      <div className="mx-auto max-w-[1440px] space-y-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col justify-between gap-5 border-b border-[var(--border)] pb-7 sm:flex-row sm:items-end"
        >
          <div>
            <div className="mb-3 flex items-center gap-2 text-[11px] font-medium text-[var(--text-muted)]">
              <Database size={14} />
              <span>Administration</span>
              <span>/</span>
              <span className="text-[var(--text-secondary)]">Data Center</span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-3xl">
              Data Center
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--text-secondary)]">
              Inspect your workspace records, monitor API availability, and
              navigate the underlying data.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void loadData(true)}
            disabled={loading || refreshing}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 self-start rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-hover)] disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
          >
            <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
            {refreshing ? "Refreshing" : "Refresh data"}
          </button>
        </motion.header>

        {/* API status */}
        <section className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]">
              <Server size={18} className="text-[var(--text-secondary)]" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                Backend connection
              </h2>
              <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
                Status based on the statistics endpoint response.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:justify-end">
            <div className="flex items-center gap-2">
              {apiStatus === "checking" ? (
                <LoaderCircle
                  size={15}
                  className="animate-spin text-[var(--text-muted)]"
                />
              ) : apiStatus === "online" ? (
                <CheckCircle2 size={15} className="text-[var(--success)]" />
              ) : (
                <XCircle size={15} className="text-[var(--danger)]" />
              )}

              <span className="text-xs font-semibold text-[var(--text-primary)]">
                {apiStatus === "checking"
                  ? "Checking connection"
                  : apiStatus === "online"
                    ? "API responding"
                    : "Connection failed"}
              </span>
            </div>

            <span className="hidden h-4 w-px bg-[var(--border)] sm:block" />

            <span className="text-[11px] text-[var(--text-muted)]">
              {lastUpdated
                ? `Updated ${relativeDate(lastUpdated)}`
                : "Waiting for response"}
            </span>
          </div>
        </section>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-start gap-3 rounded-xl border border-[var(--danger)]/30 bg-[var(--danger-soft)] p-4"
            >
              <CircleAlert
                size={17}
                className="mt-0.5 shrink-0 text-[var(--danger)]"
              />
              <p className="flex-1 text-xs leading-5 text-[var(--text-primary)]">
                {error}
              </p>
              <button
                type="button"
                aria-label="Dismiss error"
                onClick={() => setError("")}
                className="rounded-md p-1 text-[var(--text-muted)] hover:bg-[var(--surface)]"
              >
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overview */}
        <section>
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                Workspace overview
              </h2>
              <p className="mt-1 text-xs text-[var(--text-muted)]">
                Counts returned by your existing API endpoints.
              </p>
            </div>

            <span className="text-[10px] text-[var(--text-muted)]">
              Live API data
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Total projects",
                value: stats?.totalProjects,
                icon: FolderKanban,
                note: "All accessible projects",
              },
              {
                label: "Active projects",
                value: stats?.activeProjects,
                icon: Activity,
                note: "Currently in progress",
              },
              {
                label: "Completed projects",
                value: stats?.completedProjects,
                icon: CheckCircle2,
                note: "Marked completed",
              },
              {
                label: "Total requests",
                value: stats?.requests,
                icon: Clock3,
                note: "Accessible requests",
              },
            ].map((metric, index) => {
              const Icon = metric.icon;

              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.25 }}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-medium text-[var(--text-secondary)]">
                      {metric.label}
                    </span>
                    <Icon
                      size={16}
                      strokeWidth={1.8}
                      className="text-[var(--text-muted)]"
                    />
                  </div>

                  <div className="mt-5">
                    {loading ? (
                      <div className="h-8 w-16 animate-pulse rounded-md bg-[var(--surface-tertiary)]" />
                    ) : (
                      <p className="text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                        {metric.value ?? "—"}
                      </p>
                    )}
                  </div>

                  <p className="mt-2 text-[11px] text-[var(--text-muted)]">
                    {metric.note}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Data collections */}
        <section>
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-[var(--text-primary)]">
              Data collections
            </h2>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Open a collection to inspect its records.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {sections.map((section, index) => {
              const Icon = section.icon;

              return (
                <motion.div
                  key={section.key}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.25 }}
                >
                  <Link
                    href={section.href}
                    className="group flex min-h-[132px] items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)] sm:p-6"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-secondary)] transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
                      <Icon size={19} strokeWidth={1.8} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                          {section.title}
                        </h3>

                        {section.status === "online" && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-[var(--success)]">
                            <CheckCircle2 size={11} />
                            Available
                          </span>
                        )}

                        {section.status === "error" && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-[var(--danger)]">
                            <CircleAlert size={11} />
                            Unavailable
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
                        {section.description}
                      </p>

                      <div className="mt-3 flex items-center gap-2">
                        {loading ? (
                          <span className="h-4 w-12 animate-pulse rounded bg-[var(--surface-tertiary)]" />
                        ) : (
                          <span className="text-xs font-semibold tabular-nums text-[var(--text-primary)]">
                            {section.count ?? "—"}
                          </span>
                        )}
                        <span className="text-[10px] text-[var(--text-muted)]">
                          {section.label.toLowerCase()}
                        </span>
                      </div>
                    </div>

                    <ArrowRight
                      size={16}
                      className="shrink-0 text-[var(--text-muted)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--accent)]"
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Progress and record health */}
        <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                  Delivery progress
                </h2>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  Average progress across accessible projects.
                </p>
              </div>

              <FolderKanban size={17} className="text-[var(--text-muted)]" />
            </div>

            <div className="mt-7 flex items-end justify-between gap-4">
              <div>
                <p className="text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
                  {loading || !stats ? "—" : `${stats.averageProgress}%`}
                </p>
                <p className="mt-2 text-[11px] text-[var(--text-muted)]">
                  Average project progress
                </p>
              </div>

              <Link
                href="/admin/progress"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
              >
                View progress
                <ArrowUpRight size={13} />
              </Link>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-[var(--surface-tertiary)]">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(100, Math.max(0, stats?.averageProgress ?? 0))}%`,
                }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="h-full rounded-full bg-[var(--accent)]"
              />
            </div>

            <div className="mt-3 flex justify-between text-[10px] text-[var(--text-muted)]">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                  Collection health
                </h2>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  Results from the collection endpoints.
                </p>
              </div>

              <ShieldCheck size={17} className="text-[var(--text-muted)]" />
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={15} className="text-[var(--success)]" />
                  <span className="text-xs text-[var(--text-secondary)]">
                    Responding collections
                  </span>
                </div>
                <span className="text-xs font-semibold tabular-nums text-[var(--text-primary)]">
                  {loading
                    ? "—"
                    : `${sections.filter((section) => section.status === "online").length}/${sections.length}`}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <CircleAlert size={15} className="text-[var(--danger)]" />
                  <span className="text-xs text-[var(--text-secondary)]">
                    Failed collections
                  </span>
                </div>
                <span className="text-xs font-semibold tabular-nums text-[var(--text-primary)]">
                  {loading ? "—" : failedSections}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <HardDrive size={15} className="text-[var(--text-muted)]" />
                  <span className="text-xs text-[var(--text-secondary)]">
                    Records returned
                  </span>
                </div>
                <span className="text-xs font-semibold tabular-nums text-[var(--text-primary)]">
                  {loading ? "—" : totalRecords.toLocaleString()}
                </span>
              </div>
            </div>

            <p className="mt-5 border-t border-[var(--border-subtle)] pt-4 text-[10px] leading-5 text-[var(--text-muted)]">
              Counts reflect records returned to the current administrator. They
              are not a measurement of database storage usage.
            </p>
          </div>
        </section>

        {/* Recent activity */}
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] px-5 py-4 sm:px-6">
            <div>
              <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                Recent records
              </h2>
              <p className="mt-1 text-xs text-[var(--text-muted)]">
                Latest project, request, and conversation records returned by
                the API.
              </p>
            </div>

            <Clock3 size={17} className="shrink-0 text-[var(--text-muted)]" />
          </div>

          {loading ? (
            <div className="space-y-4 p-5 sm:p-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex gap-3">
                  <div className="h-9 w-9 animate-pulse rounded-xl bg-[var(--surface-tertiary)]" />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-3 w-1/3 animate-pulse rounded bg-[var(--surface-tertiary)]" />
                    <div className="h-2.5 w-1/2 animate-pulse rounded bg-[var(--surface-tertiary)]" />
                  </div>
                </div>
              ))}
            </div>
          ) : activity.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-5 py-12 text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]">
                <Database size={18} className="text-[var(--text-muted)]" />
              </div>
              <p className="mt-3 text-sm font-medium text-[var(--text-primary)]">
                No records to display
              </p>
              <p className="mt-1 max-w-sm text-xs leading-5 text-[var(--text-muted)]">
                Records will appear here when the API returns project, request,
                or conversation data.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[var(--border-subtle)]">
              {activity.map((item) => {
                const Icon =
                  item.type === "project"
                    ? FolderKanban
                    : item.type === "request"
                      ? Clock3
                      : MessageSquare;

                return (
                  <div
                    key={`${item.type}-${item.id}`}
                    className="flex items-center gap-3 px-5 py-4 transition-colors hover:bg-[var(--surface-hover)] sm:px-6"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]">
                      <Icon
                        size={15}
                        className="text-[var(--text-secondary)]"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-[var(--text-primary)]">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[10px] text-[var(--text-muted)]">
                        {item.description}
                      </p>
                    </div>

                    <span className="shrink-0 text-[10px] text-[var(--text-muted)]">
                      {relativeDate(item.date)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] px-5 py-4 sm:px-6">
            <span className="text-[10px] text-[var(--text-muted)]">
              {loading
                ? "Loading records…"
                : `${activity.length} recent records shown`}
            </span>

            <Link
              href="/admin/inbox"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
            >
              Open inbox
              <ArrowRight size={13} />
            </Link>
          </div>
        </section>

        {/* Planned data tools */}
        <section>
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-[var(--text-primary)]">
              More data tools
            </h2>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Additional admin data views to build next.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-2xl border border-dashed border-[var(--border-strong)] p-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-secondary)]">
                <Bot size={17} className="text-[var(--text-secondary)]" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-xs font-semibold text-[var(--text-primary)]">
                  AI conversations
                </h3>
                <p className="mt-1 text-[11px] leading-5 text-[var(--text-muted)]">
                  Inspect persisted AI conversations and their message history.
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] text-[var(--text-muted)]">
                  <Clock3 size={11} />
                  Planned
                </span>
              </div>

              <ArrowDownRight
                size={15}
                className="shrink-0 text-[var(--text-muted)]"
              />
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-dashed border-[var(--border-strong)] p-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-secondary)]">
                <Activity size={17} className="text-[var(--text-secondary)]" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-xs font-semibold text-[var(--text-primary)]">
                  Activity logs
                </h3>
                <p className="mt-1 text-[11px] leading-5 text-[var(--text-muted)]">
                  Review recorded workspace events and administrative activity.
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] text-[var(--text-muted)]">
                  <Clock3 size={11} />
                  Planned
                </span>
              </div>

              <ArrowDownRight
                size={15}
                className="shrink-0 text-[var(--text-muted)]"
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-col gap-2 border-t border-[var(--border)] pt-5 text-[10px] text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>Nexus Administration · Data Center</span>
          <span>Data access is subject to your administrator permissions.</span>
        </footer>
      </div>
    </main>
  );
}
