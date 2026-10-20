"use client";

import Link from "next/link";
import { Activity, ArrowRight, Clock3, LoaderCircle } from "lucide-react";

import type { ActivityItem } from "./dashboard-types";
import {
  formatDate,
  recordDate,
  recordSubtitle,
  recordTitle,
} from "./dashboard-utils";

type RecentActivityProps = {
  loading: boolean;
  recentActivity: ActivityItem[];
};

export default function RecentActivity({
  loading,
  recentActivity,
}: RecentActivityProps) {
  return (
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
            New requests, messages and projects will appear here when records
            are available.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-[var(--border-subtle)]">
          {recentActivity.map((activity, index) => {
            const Icon = activity.icon;

            return (
              <Link
                key={`${activity.type}-${String(activity.item.id ?? index)}`}
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
    </section>
  );
}
