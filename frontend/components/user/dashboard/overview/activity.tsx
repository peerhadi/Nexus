"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  CircleCheck,
  Flag,
  MessageCircle,
  TrendingUp,
} from "lucide-react";
import ActivityItem from "./activity-item";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

type ProjectUpdate = {
  id: string;
  title: string;
  description: string;
  type: "PROGRESS" | "MILESTONE" | "NOTE" | "COMPLETED";
  progress: number;
  createdAt: string;
  author: {
    id: string;
    name: string;
    role: "CLIENT" | "ADMIN";
  };
};

type Project = {
  id: string;
  name: string;
  updates: ProjectUpdate[];
};

type Activity = {
  icon: React.ElementType;
  title: string;
  text: string;
  time: string;
  iconBg: string;
  iconColor: string;
};

function getActivityStyle(type: ProjectUpdate["type"]) {
  switch (type) {
    case "COMPLETED":
      return {
        icon: CircleCheck,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-500",
      };

    case "MILESTONE":
      return {
        icon: Flag,
        iconBg: "bg-violet-50",
        iconColor: "text-violet-500",
      };

    case "NOTE":
      return {
        icon: MessageCircle,
        iconBg: "bg-pink-50",
        iconColor: "text-pink-500",
      };

    case "PROGRESS":
    default:
      return {
        icon: TrendingUp,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
      };
  }
}

function formatTime(date: string) {
  const value = new Date(date);
  const now = new Date();

  const diff = now.getTime() - value.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return value.toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
}

export default function OverviewActivity() {
  const [activity, setActivity] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadActivity = async () => {
      try {
        const token =
          localStorage.getItem("nexus_token") ??
          sessionStorage.getItem("nexus_token");

        if (!token) return;

        const response = await fetch(`${API_URL}/projects`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) return;

        const data = await response.json();

        const projects: Project[] = Array.isArray(data)
          ? data
          : (data.projects ?? []);

        const updates = projects.flatMap((project) =>
          project.updates.map((update) => {
            const style = getActivityStyle(update.type);

            return {
              icon: style.icon,
              title: update.title,
              text: `${project.name} · ${update.description}`,
              time: formatTime(update.createdAt),
              iconBg: style.iconBg,
              iconColor: style.iconColor,
            };
          }),
        );

        setActivity(
          updates
            .sort((a, b) => {
              return (
                new Date(
                  projects
                    .flatMap((project) => project.updates)
                    .find((update) => update.title === a.title)?.createdAt ?? 0,
                ).getTime() -
                new Date(
                  projects
                    .flatMap((project) => project.updates)
                    .find((update) => update.title === b.title)?.createdAt ?? 0,
                ).getTime()
              );
            })
            .reverse()
            .slice(0, 5),
        );
      } catch (error) {
        console.error("Failed to load activity:", error);
      } finally {
        setLoading(false);
      }
    };

    void loadActivity();
  }, []);

  return (
    <section>
      <div className="mb-4">
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Timeline
        </div>

        <h2 className="mt-1 text-xl font-black tracking-tight text-slate-800">
          Recent activity
        </h2>
      </div>

      <div className="rounded-[22px] border border-white bg-white/75 p-5 shadow-sm backdrop-blur-xl">
        {loading ? (
          <div className="py-6 text-center text-[11px] font-semibold text-slate-400">
            Loading activity...
          </div>
        ) : activity.length === 0 ? (
          <div className="py-6 text-center text-[11px] font-semibold text-slate-400">
            No recent activity yet.
          </div>
        ) : (
          <div className="space-y-6">
            {activity.map((item, index) => (
              <ActivityItem
                key={`${item.title}-${item.time}-${index}`}
                item={item}
                index={index}
                total={activity.length}
              />
            ))}
          </div>
        )}

        <Link
          href="/dashboard/messages"
          className="mt-7 flex items-center justify-between rounded-xl bg-gradient-to-r from-violet-50 to-pink-50 px-3 py-3 text-[10px] font-black text-violet-600 transition hover:from-violet-100 hover:to-pink-100"
        >
          Open communication
          <ChevronRight size={13} />
        </Link>
      </div>
    </section>
  );
}
