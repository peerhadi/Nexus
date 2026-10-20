"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, RefreshCw } from "lucide-react";

import AboutNexus from "./about-nexus";
import AccountPanel from "./account-panel";
import AppearancePanel from "./appearance-panel";
import SecurityOverview from "./security-overview";
import SystemStatusPanel from "./system-status-panel";
import WorkspaceShortcuts from "./workspace-shortcuts";
import { API_URL } from "./settings-data";
import type { AdminUser, ConnectionState } from "./settings-types";
import {
  getSavedAppearance,
  getSavedTheme,
  getToken,
} from "./settings-utils";

export default function SettingsContent() {
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
      localStorage.setItem("nexus_mode", nextAppearance);

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
            <AppearancePanel
              theme={theme}
              appearance={appearance}
              onApplyAppearance={applyAppearance}
            />

            {/* Account */}
            <AccountPanel
              user={user}
              accountState={accountState}
              initials={initials}
              showEmail={showEmail}
              onToggleEmail={() => setShowEmail((visible) => !visible)}
            />

            {/* System */}
            <SystemStatusPanel
              apiState={apiState}
              accountState={accountState}
              lastChecked={lastChecked}
            />
          </div>

          {/* Right column */}
          <aside className="space-y-5">
            <SecurityOverview user={user} accountState={accountState} />
            <WorkspaceShortcuts />
            <AboutNexus />
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
