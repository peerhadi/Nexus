"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, FolderKanban, MessageCircle, Zap } from "lucide-react";
import { API_URL } from "@/lib/api";

const statStyles = [
  {
    key: "totalProjects",
    label: "Projects",
    background: "var(--surface)",
    iconBg: "var(--accent-soft-strong)",
    iconColor: "var(--accent)",
    glow: "var(--accent-soft)",
  },
  {
    key: "averageProgress",
    label: "Average progress",
    background: "var(--surface)",
    iconBg: "var(--accent-soft-strong)",
    iconColor: "var(--accent)",
    glow: "var(--accent-soft)",
  },
  {
    key: "requests",
    label: "Requests",
    background: "var(--surface)",
    iconBg: "var(--accent-soft-strong)",
    iconColor: "var(--accent)",
    glow: "var(--accent-soft)",
  },
  {
    key: "activeProjects",
    label: "Active projects",
    background: "var(--surface)",
    iconBg: "var(--accent-soft-strong)",
    iconColor: "var(--accent)",
    glow: "var(--accent-soft)",
  },
] as const;

const icons = [FolderKanban, Zap, MessageCircle, CalendarDays];

type Stats = {
  totalProjects: number;
  completedProjects: number;
  activeProjects: number;
  requests: number;
  averageProgress: number;
};

const emptyStats: Stats = {
  totalProjects: 0,
  completedProjects: 0,
  activeProjects: 0,
  requests: 0,
  averageProgress: 0,
};

export default function OverviewStats() {
  const [stats, setStats] = useState<Stats>(emptyStats);

  useEffect(() => {
    let cancelled = false;

    const loadStats = async () => {
      try {
        const token =
          localStorage.getItem("nexus_token") ??
          sessionStorage.getItem("nexus_token");

        if (!token) return;

        const response = await fetch(`${API_URL}/stats`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        if (!response.ok) {
          console.error(
            "Failed to load dashboard stats:",
            response.status,
            response.statusText,
          );
          return;
        }

        const data = await response.json();

        /*
         * Backend response:
         *
         * {
         *   stats: {
         *     totalProjects,
         *     completedProjects,
         *     activeProjects,
         *     requests,
         *     averageProgress
         *   }
         * }
         */
        const backendStats = data.stats ?? data;

        if (cancelled) return;

        setStats({
          totalProjects: Number(backendStats.totalProjects ?? 0),
          completedProjects: Number(backendStats.completedProjects ?? 0),
          activeProjects: Number(backendStats.activeProjects ?? 0),
          requests: Number(backendStats.requests ?? 0),
          averageProgress: Number(backendStats.averageProgress ?? 0),
        });
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to load dashboard stats:", error);
        }
      }
    };

    void loadStats();

    return () => {
      cancelled = true;
    };
  }, []);

  const values = [
    stats.totalProjects,
    `${Math.round(stats.averageProgress)}%`,
    stats.requests,
    stats.activeProjects,
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {statStyles.map((stat, index) => {
        const Icon = icons[index];

        return (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.06,
              duration: 0.35,
              ease: "easeOut",
            }}
            whileHover={{
              y: -5,
              scale: 1.015,
            }}
            style={{
              background: stat.background,
              boxShadow: `0 0 45px ${stat.glow}`,
            }}
            className="relative overflow-hidden rounded-[22px] border border-[var(--border)] p-5 shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-lg)]"
          >
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-70 blur-3xl"
              style={{ background: stat.glow }}
            />

            <div
              className="relative mb-7 flex h-9 w-9 items-center justify-center rounded-xl"
              style={{
                background: stat.iconBg,
                color: stat.iconColor,
              }}
            >
              <Icon size={17} strokeWidth={2.5} />
            </div>

            <div className="relative text-2xl font-black tracking-tight text-[var(--text-primary)]">
              {values[index]}
            </div>

            <div className="relative mt-1 text-[10px] font-bold text-[var(--text-tertiary)]">
              {stat.label}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
