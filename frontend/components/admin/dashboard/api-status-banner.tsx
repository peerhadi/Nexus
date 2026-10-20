"use client";

import { LoaderCircle, Wifi, WifiOff } from "lucide-react";

import type { ApiStatus } from "./dashboard-types";

type ApiStatusBannerProps = {
  apiStatus: ApiStatus;
  lastUpdated: Date | null;
};

export default function ApiStatusBanner({
  apiStatus,
  lastUpdated,
}: ApiStatusBannerProps) {
  return (
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
              ? `Last refreshed at ${lastUpdated.toLocaleTimeString("en-IN", {
                  hour: "numeric",
                  minute: "2-digit",
                })}`
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
  );
}
