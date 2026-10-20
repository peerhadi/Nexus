"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { DashboardMetric } from "./dashboard-types";

type OverviewCardsProps = {
  metrics: DashboardMetric[];
  loading: boolean;
};

export default function OverviewCards({ metrics, loading }: OverviewCardsProps) {
  return (
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
  );
}
