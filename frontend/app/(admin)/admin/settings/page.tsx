"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  ExternalLink,
  Eye,
  EyeOff,
  LoaderCircle,
  Monitor,
  Moon,
  Palette,
  RefreshCw,
  ShieldCheck,
  Sun,
  UserRound,
  Wifi,
  WifiOff,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

type AdminUser = {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
};

type ConnectionState = "checking" | "connected" | "error";

const themes = [
  {
    id: "neon",
    name: "Neon",
    description: "Clean white surfaces with cyan accents.",
    accent: "#06b6d4",
  },
  {
    id: "aurora",
    name: "Aurora",
    description: "A cool cyan-to-green accent palette.",
    accent: "#14b8a6",
  },
  {
    id: "violet",
    name: "Violet",
    description: "A subtle violet accent palette.",
    accent: "#8b5cf6",
  },
  {
    id: "sunrise",
    name: "Sunrise",
    description: "Warm orange accents on light surfaces.",
    accent: "#f97316",
  },
];

function getToken() {
  if (typeof window === "undefined") return null;

  return (
    localStorage.getItem("nexus_token") ?? sessionStorage.getItem("nexus_token")
  );
}

function getSavedTheme() {
  if (typeof window === "undefined") return "neon";

  const saved = localStorage.getItem("nexus_theme");
  return themes.some((theme) => theme.id === saved) ? saved! : "neon";
}

function getSavedAppearance() {
  if (typeof window === "undefined") return "dark";

  return localStorage.getItem("nexus_appearance") === "dark" ? "dark" : "light";
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
        {eyebrow}
      </p>
      <h2 className="mt-1.5 text-sm font-semibold text-[var(--text-primary)]">
        {title}
      </h2>
      <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
        {description}
      </p>
    </div>
  );
}

function SettingRow({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: typeof UserRound;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-t border-[var(--border-subtle)] py-4 first:border-t-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)]">
          <Icon size={15} className="text-[var(--text-secondary)]" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold text-[var(--text-primary)]">
            {title}
          </p>
          <p className="mt-1 max-w-lg text-[11px] leading-5 text-[var(--text-muted)]">
            {description}
          </p>
        </div>
      </div>

      <div className="shrink-0 sm:pl-5">{children}</div>
    </div>
  );
}

function StatusLabel({ state }: { state: ConnectionState }) {
  const connected = state === "connected";
  const checking = state === "checking";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[10px] font-medium ${
        connected
          ? "border-[var(--success)]/20 bg-[var(--success-soft)] text-[var(--success)]"
          : checking
            ? "border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-muted)]"
            : "border-[var(--danger)]/20 bg-[var(--danger-soft)] text-[var(--danger)]"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          connected
            ? "bg-[var(--success)]"
            : checking
              ? "animate-pulse bg-[var(--text-muted)]"
              : "bg-[var(--danger)]"
        }`}
      />
      {checking ? "Checking" : connected ? "Connected" : "Unavailable"}
    </span>
  );
}

export default function AdminSettingsPage() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [accountState, setAccountState] = useState<ConnectionState>("checking");
  const [apiState, setApiState] = useState<ConnectionState>("checking");
  const [theme, setTheme] = useState("neon");
  const [appearance, setAppearance] = useState("dark");
  const [showEmail, setShowEmail] = useState(true);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setTheme(getSavedTheme());
    setAppearance(getSavedAppearance());
  }, []);

  const applyAppearance = useCallback(
    (nextTheme: string, nextAppearance: string) => {
      const root = document.documentElement;

      root.dataset.theme = nextTheme;
      root.classList.toggle("dark", nextAppearance === "dark");

      localStorage.setItem("nexus_theme", nextTheme);
      localStorage.setItem("nexus_appearance", nextAppearance);

      setTheme(nextTheme);
      setAppearance(nextAppearance);
      setMessage("Appearance preferences saved on this device.");

      window.setTimeout(() => setMessage(""), 3000);
    },
    [],
  );

  const loadSettings = useCallback(async () => {
    const token = getToken();

    setAccountState("checking");
    setApiState("checking");

    const healthCheck = fetch(`${API_URL}/health`, {
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) throw new Error("API unavailable");
        setApiState("connected");
      })
      .catch(() => {
        setApiState("error");
      });

    const accountCheck = (async () => {
      if (!token) {
        setUser(null);
        setAccountState("error");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });

        if (!response.ok) throw new Error("Could not load account");

        const payload = await response.json();
        const account =
          payload?.user ?? payload?.data?.user ?? payload?.data ?? payload;

        if (!account || typeof account !== "object") {
          throw new Error("Invalid account response");
        }

        setUser(account as AdminUser);
        setAccountState("connected");
      } catch {
        setUser(null);
        setAccountState("error");
      }
    })();

    await Promise.all([healthCheck, accountCheck]);
    setLastChecked(new Date());
  }, []);

  useEffect(() => {
    void loadSettings();
  }, [loadSettings]);

  const initials = (user?.name ?? "N").trim().slice(0, 1).toUpperCase();

  return (
    <main className="nexus-page min-h-dvh px-4 pb-12 pt-20 sm:px-6  lg:px-9 lg:pt-9">
      <div className="mx-auto max-w-[1100px] space-y-7">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col justify-between gap-4 border-b border-[var(--border)] pb-6 sm:flex-row sm:items-end"
        >
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)]">
              Workspace / Configuration
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
              Settings
            </h1>
            <p className="mt-1.5 max-w-lg text-xs leading-5 text-[var(--text-secondary)]">
              Manage your administrator account, appearance, and workspace
              connection status.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void loadSettings()}
            className="inline-flex h-9 items-center justify-center gap-2 self-start rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 text-xs font-semibold text-[var(--text-primary)] transition hover:bg-[var(--surface-hover)] sm:self-auto"
          >
            <RefreshCw size={13} />
            Refresh status
          </button>
        </motion.header>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 rounded-lg border border-[var(--success)]/20 bg-[var(--success-soft)] px-4 py-3 text-xs text-[var(--success)]"
          >
            <Check size={14} />
            {message}
          </motion.div>
        )}

        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0 space-y-6">
            {/* Appearance */}
            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
              <SectionHeading
                eyebrow="Personalization"
                title="Appearance"
                description="Customize how the Nexus admin workspace looks on this device."
              />

              <SettingRow
                icon={Palette}
                title="Accent theme"
                description="Choose the accent color used by interface elements."
              >
                <div className="flex flex-wrap gap-2">
                  {themes.map((option) => {
                    const active = theme === option.id;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        aria-label={option.name}
                        aria-pressed={active}
                        title={option.name}
                        onClick={() => applyAppearance(option.id, appearance)}
                        className={`flex h-9 items-center gap-2 rounded-lg border px-2.5 transition ${
                          active
                            ? "border-[var(--border-strong)] bg-[var(--surface-secondary)]"
                            : "border-[var(--border)] hover:bg-[var(--surface-hover)]"
                        }`}
                      >
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: option.accent }}
                        />
                        <span className="text-[10px] font-medium text-[var(--text-primary)]">
                          {option.name}
                        </span>
                        {active && (
                          <Check
                            size={12}
                            className="text-[var(--text-secondary)]"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </SettingRow>

              <SettingRow
                icon={Sun}
                title="Interface mode"
                description="Switch between the light and dark interface."
              >
                <div className="flex rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)] p-1">
                  <button
                    type="button"
                    aria-pressed={appearance === "light"}
                    onClick={() => applyAppearance(theme, "light")}
                    className={`flex h-8 items-center gap-2 rounded-md px-3 text-[11px] font-medium transition ${
                      appearance === "light"
                        ? "bg-[var(--surface)] text-[var(--text-primary)] shadow-sm"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    <Sun size={13} />
                    Light
                  </button>

                  <button
                    type="button"
                    aria-pressed={appearance === "dark"}
                    onClick={() => applyAppearance(theme, "dark")}
                    className={`flex h-8 items-center gap-2 rounded-md px-3 text-[11px] font-medium transition ${
                      appearance === "dark"
                        ? "bg-[var(--surface)] text-[var(--text-primary)] shadow-sm"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    <Moon size={13} />
                    Dark
                  </button>
                </div>
              </SettingRow>

              <div className="mt-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-secondary)] px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <Monitor size={13} className="text-[var(--text-muted)]" />
                  <p className="text-[10px] leading-5 text-[var(--text-muted)]">
                    These preferences are stored in this browser. They are not
                    synchronized across devices.
                  </p>
                </div>
              </div>
            </section>

            {/* Account */}
            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
              <SectionHeading
                eyebrow="Identity"
                title="Administrator account"
                description="Your authenticated account details returned by the Nexus API."
              />

              <div className="mb-5 flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm font-semibold text-[var(--text-primary)]">
                  {accountState === "checking" ? (
                    <LoaderCircle size={17} className="animate-spin" />
                  ) : (
                    initials
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
                    {user?.name || "Administrator"}
                  </p>
                  <p className="mt-1 truncate text-[11px] text-[var(--text-muted)]">
                    {showEmail
                      ? user?.email || "Account email unavailable"
                      : "••••••••••••"}
                  </p>
                </div>

                <button
                  type="button"
                  aria-label={showEmail ? "Hide email" : "Show email"}
                  onClick={() => setShowEmail((visible) => !visible)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  {showEmail ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>

              <SettingRow
                icon={UserRound}
                title="Account name"
                description="Name associated with your authenticated account."
              >
                <span className="text-xs font-medium text-[var(--text-primary)]">
                  {user?.name || "Unavailable"}
                </span>
              </SettingRow>

              <SettingRow
                icon={ShieldCheck}
                title="Access role"
                description="Permissions assigned to this account."
              >
                <span
                  className={`inline-flex rounded-md border px-2 py-1 text-[10px] font-semibold ${
                    user?.role?.toUpperCase() === "ADMIN"
                      ? "border-[var(--accent)]/20 bg-[var(--accent-soft)] text-[var(--accent)]"
                      : "border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-secondary)]"
                  }`}
                >
                  {user?.role || "Unavailable"}
                </span>
              </SettingRow>

              <SettingRow
                icon={ShieldCheck}
                title="Session status"
                description="Whether the API accepted your current session."
              >
                <StatusLabel state={accountState} />
              </SettingRow>

              {accountState === "error" && (
                <p className="mt-3 rounded-lg border border-[var(--warning)]/20 bg-[var(--warning-soft)] px-3 py-2 text-[11px] leading-5 text-[var(--text-secondary)]">
                  Account information could not be loaded. Your session may be
                  missing or expired. Refresh the status to try again.
                </p>
              )}

              <div className="mt-4 border-t border-[var(--border-subtle)] pt-4">
                <p className="text-[10px] leading-5 text-[var(--text-muted)]">
                  Account editing and password changes are not enabled here;
                  this page does not submit profile changes to the backend.
                </p>
              </div>
            </section>

            {/* System */}
            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
              <SectionHeading
                eyebrow="Infrastructure"
                title="System status"
                description="Live connectivity checks for the services this dashboard depends on."
              />

              <SettingRow
                icon={Wifi}
                title="Nexus API"
                description="Backend health endpoint."
              >
                <StatusLabel state={apiState} />
              </SettingRow>

              <SettingRow
                icon={ShieldCheck}
                title="Authenticated API"
                description="Account endpoint using your current session token."
              >
                <StatusLabel state={accountState} />
              </SettingRow>

              <SettingRow
                icon={Clock3}
                title="Last status check"
                description="Most recent completed connectivity check."
              >
                <span className="text-[11px] text-[var(--text-secondary)]">
                  {lastChecked
                    ? lastChecked.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })
                    : "Checking..."}
                </span>
              </SettingRow>

              <div className="mt-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-secondary)] p-3">
                <div className="flex items-start gap-2.5">
                  {apiState === "connected" ? (
                    <Wifi size={14} className="mt-0.5 text-[var(--success)]" />
                  ) : (
                    <WifiOff
                      size={14}
                      className="mt-0.5 text-[var(--text-muted)]"
                    />
                  )}

                  <div>
                    <p className="text-[11px] font-semibold text-[var(--text-primary)]">
                      {apiState === "connected"
                        ? "Backend is responding"
                        : apiState === "checking"
                          ? "Checking backend connection"
                          : "Backend connection unavailable"}
                    </p>
                    <p className="mt-1 break-all text-[10px] leading-5 text-[var(--text-muted)]">
                      {API_URL}/health
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right column */}
          <aside className="space-y-5">
            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)]">
                  <ShieldCheck
                    size={15}
                    className="text-[var(--text-secondary)]"
                  />
                </div>
                <h2 className="text-xs font-semibold text-[var(--text-primary)]">
                  Security overview
                </h2>
              </div>

              <div className="mt-4 divide-y divide-[var(--border-subtle)]">
                <div className="flex items-center justify-between gap-3 py-3">
                  <span className="text-[11px] text-[var(--text-muted)]">
                    Authentication
                  </span>
                  <span className="text-[10px] font-medium text-[var(--text-primary)]">
                    Bearer token
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 py-3">
                  <span className="text-[11px] text-[var(--text-muted)]">
                    Account role
                  </span>
                  <span className="text-[10px] font-medium text-[var(--text-primary)]">
                    {user?.role || "Unknown"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 py-3">
                  <span className="text-[11px] text-[var(--text-muted)]">
                    API access
                  </span>
                  <StatusLabel state={accountState} />
                </div>
              </div>

              <p className="mt-2 text-[10px] leading-5 text-[var(--text-muted)]">
                Keep your session token private. This page never displays the
                token itself.
              </p>
            </section>

            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <div className="flex items-center gap-2">
                <CircleHelp
                  size={15}
                  className="text-[var(--text-secondary)]"
                />
                <h2 className="text-xs font-semibold text-[var(--text-primary)]">
                  Workspace shortcuts
                </h2>
              </div>

              <div className="mt-3">
                {[
                  {
                    label: "Admin dashboard",
                    href: "/admin/dashboard",
                  },
                  {
                    label: "Data Center",
                    href: "/admin/data-center",
                  },
                  {
                    label: "Inbox",
                    href: "/admin/inbox",
                  },
                  {
                    label: "Progress",
                    href: "/admin/progress",
                  },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="group flex items-center justify-between border-t border-[var(--border-subtle)] py-3 first:border-t-0"
                  >
                    <span className="text-[11px] font-medium text-[var(--text-secondary)] transition-colors group-hover:text-[var(--text-primary)]">
                      {item.label}
                    </span>
                    <ChevronRight
                      size={13}
                      className="text-[var(--text-muted)] transition-transform group-hover:translate-x-0.5"
                    />
                  </a>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)] p-5">
              <div className="flex items-center gap-2">
                <CircleHelp
                  size={15}
                  className="text-[var(--text-secondary)]"
                />
                <h2 className="text-xs font-semibold text-[var(--text-primary)]">
                  About Nexus
                </h2>
              </div>

              <p className="mt-3 text-[11px] leading-5 text-[var(--text-secondary)]">
                Nexus is your workspace for managing clients, projects,
                requests, conversations, and delivery progress.
              </p>

              <a
                href="/"
                className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold text-[var(--text-primary)] hover:text-[var(--accent)]"
              >
                Visit website
                <ArrowUpRight size={13} />
              </a>
            </section>
          </aside>
        </div>

        <footer className="flex flex-col gap-1 border-t border-[var(--border)] pt-4 text-[10px] text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>Nexus Administration</span>
          <span>Workspace configuration</span>
        </footer>
      </div>
    </main>
  );
}
