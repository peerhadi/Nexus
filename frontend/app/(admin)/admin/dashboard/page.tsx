"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  Archive,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  CircleAlert,
  ClipboardList,
  Clock3,
  Database,
  FolderKanban,
  Inbox,
  LoaderCircle,
  RefreshCw,
  Settings,
  Users,
  Wifi,
  WifiOff,
} from "lucide-react";

type RecordItem = Record<string, unknown>;

type DashboardData = {
  stats: RecordItem | null;
  requests: RecordItem[];
  projects: RecordItem[];
  conversations: RecordItem[];
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

const emptyData: DashboardData = {
  stats: null,
  requests: [],
  projects: [],
  conversations: [],
};

const sections = [
  {
    title: "Inbox",
    description: "Client conversations and replies",
    href: "/admin/inbox",
    icon: Inbox,
  },
  {
    title: "Requests",
    description: "Review incoming client requests",
    href: "/admin/requests",
    icon: ClipboardList,
  },
  {
    title: "Clients",
    description: "Manage registered clients",
    href: "/admin/clients",
    icon: Users,
  },
  {
    title: "Progress",
    description: "Projects, milestones and updates",
    href: "/admin/progress",
    icon: FolderKanban,
  },
  {
    title: "Archive",
    description: "Previously closed conversations",
    href: "/admin/archive",
    icon: Archive,
  },
  {
    title: "Data Center",
    description: "Explore platform records",
    href: "/admin/data-center",
    icon: Database,
  },
  {
    title: "Settings",
    description: "Administrative preferences",
    href: "/admin/settings",
    icon: Settings,
  },
];

function recordsFrom(value: unknown): RecordItem[] {
  if (Array.isArray(value)) {
    return value.filter(
      (item): item is RecordItem => typeof item === "object" && item !== null,
    );
  }

  if (typeof value !== "object" || value === null) return [];

  const object = value as RecordItem;

  for (const key of [
    "data",
    "items",
    "results",
    "requests",
    "projects",
    "conversations",
  ]) {
    if (Array.isArray(object[key])) {
      return recordsFrom(object[key]);
    }
  }

  return [];
}

function objectFrom(value: unknown): RecordItem | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return null;
  }

  const object = value as RecordItem;

  if (
    typeof object.data === "object" &&
    object.data !== null &&
    !Array.isArray(object.data)
  ) {
    return object.data as RecordItem;
  }

  return object;
}

function numberFrom(
  object: RecordItem | null,
  keys: string[],
  fallback: number,
) {
  if (!object) return fallback;

  for (const key of keys) {
    const value = object[key];

    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === "string" && value.trim()) {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) return parsed;
    }
  }

  return fallback;
}

function statusOf(item: RecordItem) {
  return String(item.status ?? "").toUpperCase();
}

function recordTitle(item: RecordItem) {
  for (const key of ["subject", "title", "name", "email"]) {
    const value = item[key];

    if (typeof value === "string" && value.trim()) return value;
  }

  return "Untitled record";
}

function recordSubtitle(item: RecordItem) {
  for (const key of ["email", "clientEmail", "description", "status"]) {
    const value = item[key];

    if (typeof value === "string" && value.trim()) return value;
  }

  return "No additional details";
}

function recordDate(item: RecordItem) {
  return item.updatedAt ?? item.createdAt ?? item.timestamp;
}

function formatDate(value: unknown) {
  if (typeof value !== "string" && typeof value !== "number") {
    return "Date unavailable";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function isOpenConversation(item: RecordItem) {
  return !["CLOSED", "ARCHIVED"].includes(statusOf(item));
}

function isPendingRequest(item: RecordItem) {
  return ["NEW", "PENDING"].includes(statusOf(item));
}

function isActiveProject(item: RecordItem) {
  return ["IN_PROGRESS", "REVIEW"].includes(statusOf(item));
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData>(emptyData);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [apiStatus, setApiStatus] = useState<"checking" | "online" | "offline">(
    "checking",
  );
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async (manual = false) => {
    if (manual) setRefreshing(true);
    else setLoading(true);

    setError("");

    try {
      const token =
        localStorage.getItem("nexus_token") ??
        sessionStorage.getItem("nexus_token");

      const headers: HeadersInit = {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      async function get(path: string): Promise<unknown> {
        const response = await fetch(`${API_URL}${path}`, {
          headers,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`${path}: HTTP ${response.status}`);
        }

        return response.json();
      }

      const results = await Promise.allSettled([
        get("/stats"),
        get("/requests"),
        get("/projects"),
        get("/conversations"),
      ]);

      const [statsResult, requestsResult, projectsResult, conversationsResult] =
        results;

      const stats =
        statsResult.status === "fulfilled"
          ? objectFrom(statsResult.value)
          : null;

      const requests =
        requestsResult.status === "fulfilled"
          ? recordsFrom(requestsResult.value)
          : [];

      const projects =
        projectsResult.status === "fulfilled"
          ? recordsFrom(projectsResult.value)
          : [];

      const conversations =
        conversationsResult.status === "fulfilled"
          ? recordsFrom(conversationsResult.value)
          : [];

      const successful = results.filter(
        (result) => result.status === "fulfilled",
      ).length;

      if (successful === 0) {
        throw new Error("Could not retrieve dashboard data from the API.");
      }

      setData({ stats, requests, projects, conversations });
      setApiStatus("online");
      setLastUpdated(new Date());

      if (successful !== results.length) {
        setError(
          "Some sections could not load. Check the corresponding API endpoints.",
        );
      }
    } catch (cause) {
      setApiStatus("offline");
      setError(
        cause instanceof Error
          ? cause.message
          : "Unable to connect to the Nexus API.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  const { stats, requests, projects, conversations } = data;

  const openConversations = conversations.filter(isOpenConversation);
  const pendingRequests = requests.filter(isPendingRequest);
  const activeProjects = projects.filter(isActiveProject);

  const metrics = [
    {
      title: "Open conversations",
      value: numberFrom(
        stats,
        ["openConversations", "openConversationsCount", "activeConversations"],
        openConversations.length,
      ),
      description: "Client communication",
      href: "/admin/inbox",
      icon: Inbox,
    },
    {
      title: "Pending requests",
      value: numberFrom(
        stats,
        ["pendingRequests", "pendingRequestsCount", "newRequests"],
        pendingRequests.length,
      ),
      description: "Awaiting review",
      href: "/admin/requests",
      icon: ClipboardList,
    },
    {
      title: "Active projects",
      value: numberFrom(
        stats,
        ["activeProjects", "activeProjectsCount", "inProgressProjects"],
        activeProjects.length,
      ),
      description: "In progress or review",
      href: "/admin/progress",
      icon: FolderKanban,
    },
    {
      title: "Total clients",
      value: numberFrom(
        stats,
        ["totalClients", "clientsCount", "totalUsers", "userCount"],
        0,
      ),
      description: "Registered accounts",
      href: "/admin/clients",
      icon: Users,
    },
  ];

  const recentActivity = [
    ...requests.map((item) => ({
      item,
      type: "Request",
      href: "/admin/requests",
      icon: ClipboardList,
    })),
    ...conversations.map((item) => ({
      item,
      type: "Conversation",
      href: "/admin/inbox",
      icon: Inbox,
    })),
    ...projects.map((item) => ({
      item,
      type: "Project",
      href: "/admin/progress",
      icon: FolderKanban,
    })),
  ]
    .sort((a, b) => {
      const dateA = new Date(String(recordDate(a.item) ?? 0)).getTime();
      const dateB = new Date(String(recordDate(b.item) ?? 0)).getTime();

      return (
        (Number.isFinite(dateB) ? dateB : 0) -
        (Number.isFinite(dateA) ? dateA : 0)
      );
    })
    .slice(0, 6);

  return (
    <main className="nexus-page min-h-full">
      <div className="mx-auto w-full max-w-[1600px] space-y-7 p-4 sm:p-6 lg:p-8">
        {/* Page heading */}
        <motion.header
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
        >
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-[var(--text-muted)]">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
              Nexus Administration
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
              Dashboard
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-muted)]">
              Your workspace at a glance. Monitor activity and manage every part
              of Nexus from one place.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void loadDashboard(true)}
            disabled={loading || refreshing}
            className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 text-sm font-medium text-[var(--text-primary)] transition hover:bg-[var(--surface-hover)] disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
          >
            <RefreshCw size={15} className={refreshing ? "animate-spin" : ""} />
            Refresh data
          </button>
        </motion.header>

        {/* API connection */}
        <section className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--surface-secondary)]">
              {apiStatus === "checking" ? (
                <LoaderCircle
                  size={17}
                  className="animate-spin text-[var(--text-muted)]"
                />
              ) : apiStatus === "online" ? (
                <Wifi size={17} className="text-[var(--success)]" />
              ) : (
                <WifiOff size={17} className="text-[var(--danger)]" />
              )}
            </div>

            <div>
              <p className="text-sm font-medium text-[var(--text-primary)]">
                {apiStatus === "checking"
                  ? "Connecting to Nexus API"
                  : apiStatus === "online"
                    ? "API reachable"
                    : "API connection failed"}
              </p>

              <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                {lastUpdated
                  ? `Last refreshed at ${lastUpdated.toLocaleTimeString(
                      "en-IN",
                      {
                        hour: "numeric",
                        minute: "2-digit",
                      },
                    )}`
                  : "Checking dashboard endpoints"}
              </p>
            </div>
          </div>

          <span
            className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-medium"
            style={{
              color:
                apiStatus === "online"
                  ? "var(--success)"
                  : apiStatus === "offline"
                    ? "var(--danger)"
                    : "var(--text-muted)",
              background:
                apiStatus === "online"
                  ? "var(--success-soft)"
                  : apiStatus === "offline"
                    ? "var(--danger-soft)"
                    : "var(--surface-secondary)",
            }}
          >
            {apiStatus === "checking"
              ? "Checking"
              : apiStatus === "online"
                ? "Connected"
                : "Offline"}
          </span>
        </section>

        {error && (
          <div className="flex items-start gap-3 rounded-xl border border-[var(--warning)] bg-[var(--warning-soft)] p-4">
            <CircleAlert
              size={18}
              className="mt-0.5 shrink-0 text-[var(--warning)]"
            />
            <div className="min-w-0">
              <p className="text-sm font-medium text-[var(--text-primary)]">
                Dashboard notice
              </p>
              <p className="mt-1 break-words text-sm text-[var(--text-secondary)]">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Overview cards */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[var(--text-primary)]">
              Overview
            </h2>
            <span className="text-xs text-[var(--text-muted)]">
              {loading ? "Loading figures…" : "Current figures"}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;

              return (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.04 }}
                >
                  <Link
                    href={metric.href}
                    className="nexus-card group block rounded-2xl p-5 transition hover:bg-[var(--card-hover)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-sm text-[var(--text-muted)]">
                          {metric.title}
                        </p>

                        {loading ? (
                          <div className="mt-4 h-9 w-16 animate-pulse rounded-lg bg-[var(--surface-tertiary)]" />
                        ) : (
                          <p className="mt-3 text-3xl font-semibold tracking-tight tabular-nums text-[var(--text-primary)]">
                            {metric.value.toLocaleString("en-IN")}
                          </p>
                        )}
                      </div>

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] transition group-hover:bg-[var(--accent-soft-strong)]">
                        <Icon size={19} />
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-2">
                      <span className="text-xs text-[var(--text-muted)]">
                        {metric.description}
                      </span>
                      <ArrowUpRight
                        size={15}
                        className="text-[var(--text-muted)] transition group-hover:text-[var(--accent)]"
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Activity and navigation */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.25fr_0.85fr]">
          <section className="overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card)]">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                  Recent activity
                </h2>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  Latest requests, conversations and projects
                </p>
              </div>

              <Activity size={17} className="text-[var(--text-muted)]" />
            </div>

            {loading ? (
              <div className="flex min-h-48 items-center justify-center">
                <LoaderCircle
                  size={20}
                  className="animate-spin text-[var(--accent)]"
                />
              </div>
            ) : recentActivity.length === 0 ? (
              <div className="flex min-h-48 flex-col items-center justify-center px-6 text-center">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--surface-secondary)]">
                  <Clock3 size={19} className="text-[var(--text-muted)]" />
                </div>
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  No recent activity
                </p>
                <p className="mt-1 max-w-xs text-xs leading-5 text-[var(--text-muted)]">
                  New requests, messages and projects will appear here when
                  records are available.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-[var(--border-subtle)]">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon;

                  return (
                    <Link
                      key={`${activity.type}-${String(
                        activity.item.id ?? index,
                      )}`}
                      href={activity.href}
                      className="group flex items-center gap-3 px-5 py-4 transition hover:bg-[var(--surface-hover)] sm:px-6"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-secondary)] text-[var(--text-secondary)]">
                        <Icon size={17} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                          {recordTitle(activity.item)}
                        </p>
                        <p className="mt-1 truncate text-xs text-[var(--text-muted)]">
                          {activity.type} · {recordSubtitle(activity.item)}
                        </p>
                      </div>

                      <div className="hidden shrink-0 text-right sm:block">
                        <p className="text-xs text-[var(--text-muted)]">
                          {formatDate(recordDate(activity.item))}
                        </p>
                        {typeof activity.item.status === "string" && (
                          <p className="mt-1 text-[10px] uppercase tracking-wide text-[var(--text-tertiary)]">
                            {activity.item.status.replaceAll("_", " ")}
                          </p>
                        )}
                      </div>

                      <ArrowRight
                        size={15}
                        className="shrink-0 text-[var(--text-muted)] transition group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
                      />
                    </Link>
                  );
                })}
              </div>
            )}

            <div className="border-t border-[var(--border-subtle)] px-5 py-3 sm:px-6">
              <Link
                href="/admin/inbox"
                className="inline-flex items-center gap-2 text-xs font-medium text-[var(--text-secondary)] transition hover:text-[var(--accent)]"
              >
                Go to inbox
                <ArrowRight size={14} />
              </Link>
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-5 sm:p-6">
            <div className="mb-5">
              <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                All admin sections
              </h2>
              <p className="mt-1 text-xs text-[var(--text-muted)]">
                Everything in your workspace, one click away
              </p>
            </div>

            <div className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;

                return (
                  <Link
                    key={section.title}
                    href={section.href}
                    className="group flex items-center gap-3 rounded-xl p-3 transition hover:bg-[var(--surface-hover)]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-secondary)] text-[var(--text-secondary)] transition group-hover:bg-[var(--accent-soft)] group-hover:text-[var(--accent)]">
                      <Icon size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[var(--text-primary)]">
                        {section.title}
                      </p>
                      <p className="mt-1 text-xs leading-4 text-[var(--text-muted)]">
                        {section.description}
                      </p>
                    </div>

                    <ArrowUpRight
                      size={15}
                      className="shrink-0 text-[var(--text-muted)] transition group-hover:text-[var(--accent)]"
                    />
                  </Link>
                );
              })}
            </div>
          </section>
        </div>

        <footer className="flex flex-col justify-between gap-2 border-t border-[var(--border-subtle)] pt-5 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center">
          <p>Nexus Administration</p>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} />
            <span>
              {apiStatus === "online"
                ? "Connected to the existing API"
                : apiStatus === "offline"
                  ? "API connection needs attention"
                  : "Checking API connection"}
            </span>
          </div>
        </footer>
      </div>
    </main>
  );
}
