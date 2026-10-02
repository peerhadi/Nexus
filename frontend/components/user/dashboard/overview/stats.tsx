"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, FolderKanban, MessageCircle, Zap } from "lucide-react";
import { API_URL } from "@/lib/api";

const statStyles = [
  {
    key: "totalProjects",
    label: "Projects",
    gradient: "from-violet-100 to-fuchsia-50",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-600",
  },
  {
    key: "averageProgress",
    label: "Average progress",
    gradient: "from-cyan-100 to-blue-50",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-600",
  },
  {
    key: "requests",
    label: "Requests",
    gradient: "from-pink-100 to-rose-50",
    iconBg: "bg-pink-500/10",
    iconColor: "text-pink-600",
  },
  {
    key: "activeProjects",
    label: "Active projects",
    gradient: "from-orange-100 to-amber-50",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-600",
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
            className={`rounded-[22px] border border-white bg-gradient-to-br ${stat.gradient} p-5 shadow-sm transition-shadow hover:shadow-xl`}
          >
            <div
              className={`mb-7 flex h-9 w-9 items-center justify-center rounded-xl ${stat.iconBg}`}
            >
              <Icon size={17} className={stat.iconColor} />
            </div>

            <div className="text-2xl font-black tracking-tight text-slate-800">
              {values[index]}
            </div>

            <div className="mt-1 text-[10px] font-bold text-slate-500/70">
              {stat.label}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
