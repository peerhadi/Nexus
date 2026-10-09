"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  Briefcase,
  ChevronRight,
  Clock3,
  FolderKanban,
  Plus,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/(default)/components/Navbar";
import Footer from "@/app/(default)/components/Footer";
import { useAlert } from "@/lib/alert";
import { API_URL } from "@/lib/api";

type User = {
  id: string;
  name: string;
  email: string;
  role: "CLIENT" | "ADMIN";
};

type Project = {
  id: string;
  name?: string;
  title?: string;
  type?: string;
  status?: string;
  progress?: number;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};

type Stats = {
  totalProjects: number;
  completedProjects: number;
  activeProjects: number;
  requests: number;
  averageProgress: number;
};

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    completedProjects: 0,
    activeProjects: 0,
    requests: 0,
    averageProgress: 0,
  });

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loadingDashboard, setLoadingDashboard] = useState(true);

  const router = useRouter();
  const { showAlert } = useAlert();

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const token =
          localStorage.getItem("nexus_token") ??
          sessionStorage.getItem("nexus_token");

        if (!token) {
          router.replace("/");
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        /*
         * ------------------------------------------------------------
         * AUTH
         * ------------------------------------------------------------
         */

        const meResponse = await fetch(`${API_URL}/auth/me`, {
          headers,
        });

        if (meResponse.status === 401) {
          localStorage.removeItem("nexus_token");
          localStorage.removeItem("nexus_user");

          sessionStorage.removeItem("nexus_token");
          sessionStorage.removeItem("nexus_user");

          router.replace("/");
          return;
        }

        const meData = await meResponse.json();

        const currentUser: User = meData.user ?? meData;

        setUser(currentUser);

        /*
         * Keep the existing local cache updated.
         */
        const storage = localStorage.getItem("nexus_token")
          ? localStorage
          : sessionStorage;

        storage.setItem("nexus_user", JSON.stringify(currentUser));

        setCheckingAuth(false);

        /*
         * ------------------------------------------------------------
         * PROJECTS
         * ------------------------------------------------------------
         */

        const projectsResponse = await fetch(`${API_URL}/projects`, {
          headers,
        });

        if (projectsResponse.status === 401) {
          localStorage.removeItem("nexus_token");
          localStorage.removeItem("nexus_user");

          sessionStorage.removeItem("nexus_token");
          sessionStorage.removeItem("nexus_user");

          router.replace("/");
          return;
        }

        if (!projectsResponse.ok) {
          throw new Error("Unable to load your projects.");
        }

        const projectsData = await projectsResponse.json();

        const projectList: Project[] =
          projectsData.projects ??
          projectsData.data ??
          (Array.isArray(projectsData) ? projectsData : []);

        setProjects(projectList);

        /*
         * ------------------------------------------------------------
         * STATS
         * ------------------------------------------------------------
         */

        const statsResponse = await fetch(`${API_URL}/stats`, {
          headers,
        });

        if (statsResponse.status === 401) {
          localStorage.removeItem("nexus_token");
          localStorage.removeItem("nexus_user");

          sessionStorage.removeItem("nexus_token");
          sessionStorage.removeItem("nexus_user");

          router.replace("/");
          return;
        }

        if (!statsResponse.ok) {
          throw new Error("Unable to load dashboard statistics.");
        }

        const statsData = await statsResponse.json();

        setStats(
          statsData.stats ?? {
            totalProjects: 0,
            completedProjects: 0,
            activeProjects: 0,
            requests: 0,
            averageProgress: 0,
          },
        );
      } catch (error) {
        console.error("Failed to load dashboard:", error);

        showAlert(
          "error",
          "Dashboard failed to load",
          error instanceof Error
            ? error.message
            : "Unable to load your dashboard.",
        );
      } finally {
        setCheckingAuth(false);
        setLoadingDashboard(false);
      }
    };

    loadDashboard();
  }, [router, showAlert]);

  if (checkingAuth) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--background)]">
        <div className="absolute left-[15%] top-[20%] h-72 w-72 rounded-full bg-[var(--accent-soft-strong)] blur-3xl" />
        <div className="absolute bottom-[10%] right-[15%] h-80 w-80 rounded-full bg-[var(--accent-soft)] blur-3xl" />
        <div className="absolute left-1/2 top-[35%] h-64 w-64 -translate-x-1/2 rounded-full bg-[var(--hero-glow-tertiary)] blur-3xl" />

        <div className="relative flex flex-col items-center">
          <div className="relative mb-7 flex h-16 w-16 items-center justify-center rounded-[20px] border border-[var(--card-border)] bg-[var(--surface)] shadow-[var(--shadow-lg)] backdrop-blur-xl">
            <div className="absolute inset-2 rounded-[14px] bg-[var(--accent)] opacity-15" />

            <div className="relative flex flex-col gap-[4px]">
              <span className="h-[3px] w-7 rounded-full bg-[var(--accent)]" />
              <span className="ml-2 h-[3px] w-5 rounded-full bg-[var(--accent)]" />
              <span className="h-[3px] w-7 rounded-full bg-[var(--accent)]" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[12px] font-black tracking-[0.25em] text-[var(--text-secondary)]">
              NEXUS
            </span>

            <span className="flex gap-1">
              <span className="h-1 w-1 animate-pulse rounded-full bg-[var(--accent)]" />
              <span className="h-1 w-1 animate-pulse rounded-full bg-[var(--accent-hover)] [animation-delay:150ms]" />
              <span className="h-1 w-1 animate-pulse rounded-full bg-[var(--accent-active)] [animation-delay:300ms]" />
            </span>
          </div>

          <p className="mt-2 text-[11px] font-medium text-[var(--text-muted)]">
            Getting things ready
          </p>
        </div>
      </div>
    );
  }

  const firstName = user?.name?.trim()
    ? user.name.trim().split(" ")[0]
    : "there";

  /*
   * Only show the latest three projects in the dashboard.
   */
  const visibleProjects = projects.slice(0, 3);

  /*
   * Build activity from actual backend project data.
   *
   * We don't have a separate /activity endpoint in the backend,
   * so we derive useful activity from project updatedAt/createdAt.
   */
  const activity = [...projects]
    .sort((a, b) => {
      const aDate = new Date(a.updatedAt ?? a.createdAt ?? 0).getTime();

      const bDate = new Date(b.updatedAt ?? b.createdAt ?? 0).getTime();

      return bDate - aDate;
    })
    .slice(0, 3)
    .map((project) => ({
      title:
        project.status?.toLowerCase() === "completed"
          ? "Project completed"
          : "Project update",
      description: `${project.name ?? project.title ?? "Untitled project"} ${
        project.status ? `is ${project.status.toLowerCase()}` : "was updated"
      }`,
      time: project.updatedAt ?? project.createdAt,
      icon:
        project.status?.toLowerCase() === "completed"
          ? TrendingUp
          : FolderKanban,
    }));

  const formatTime = (date?: string) => {
    if (!date) return "Recently";

    const timestamp = new Date(date).getTime();

    if (Number.isNaN(timestamp)) return "Recently";

    const difference = Date.now() - timestamp;

    const minutes = Math.floor(difference / 60000);
    const hours = Math.floor(difference / 3600000);
    const days = Math.floor(difference / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hr${hours === 1 ? "" : "s"} ago`;
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;

    return new Date(date).toLocaleDateString();
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--text-primary)]">
      {/* ================================================================ */}
      {/* BACKGROUND                                                       */}
      {/* ================================================================ */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[var(--hero-glow-primary)] blur-[120px]" />

        <motion.div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[var(--hero-glow-secondary)] blur-[120px]" />

        <motion.div className="absolute bottom-[-180px] left-[35%] h-[500px] w-[500px] rounded-full bg-[var(--hero-glow-tertiary)] blur-[130px]" />

        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(var(--text-primary)_1px,transparent_1px),linear-gradient(90deg,var(--text-primary)_1px,transparent_1px)] [background-size:45px_45px]" />
      </div>

      {/* ================================================================ */}
      {/* CONTENT                                                          */}
      {/* ================================================================ */}

      <div className="relative z-10 mx-auto mt-20 max-w-7xl px-5 pb-20 pt-10 sm:px-8 lg:px-12">
        {/* HERO */}

        <motion.section className="relative overflow-hidden rounded-[36px] border border-[var(--card-border)] bg-[var(--surface)] p-7 shadow-[var(--shadow-xl)] backdrop-blur-2xl sm:p-10 lg:p-14">
          <motion.div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--gradient-rainbow)] opacity-15 blur-2xl" />

          <div className="absolute right-10 top-10 hidden h-24 w-24 rounded-full border border-[var(--accent-soft-strong)] lg:block" />
          <div className="absolute right-16 top-16 hidden h-12 w-12 rounded-full border border-[var(--accent-soft-strong)] lg:block" />

          <div className="relative max-w-3xl">
            <motion.div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--accent-soft-strong)] bg-[var(--accent-soft)] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--accent)]">
              <Sparkles size={11} />
              Your Nexus space
            </motion.div>

            <h1 className="text-[42px] font-black leading-[0.95] tracking-[-0.06em] text-[var(--text-primary)] sm:text-[58px] lg:text-[72px]">
              Hey,{" "}
              <span className="bg-[var(--gradient-primary)] bg-clip-text ">
                {firstName}.
              </span>
              <br />
              Let&apos;s make something.
            </h1>

            <p className="mt-6 max-w-xl text-[13px] font-medium leading-6 text-[var(--text-muted)] sm:text-[14px]">
              Everything you&apos;re building with Nexus, all in one place.
              Explore your projects, track progress, and turn your next idea
              into something real.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/build"
                className="group flex items-center gap-2 rounded-2xl bg-[var(--accent)] px-5 py-3.5 text-[11px] font-black text-[var(--text-inverse)] shadow-[var(--shadow-md)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]"
              >
                <Plus size={14} />
                Start a project
                <ArrowUpRight
                  size={13}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              <Link
                href="/dashboard/projects"
                className="flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3.5 text-[11px] font-black text-[var(--text-tertiary)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-soft-strong)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
              >
                View projects
                <ChevronRight size={13} />
              </Link>
            </div>
          </div>
        </motion.section>

        {/* ============================================================ */}
        {/* STATS                                                         */}
        {/* ============================================================ */}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Projects",
              value: stats.totalProjects.toString().padStart(2, "0"),
              description: "Across your workspace",
              icon: Briefcase,
              gradient: "var(--gradient-cyan-violet)",
            },
            {
              label: "In progress",
              value: stats.activeProjects.toString().padStart(2, "0"),
              description: "Currently being worked on",
              icon: Zap,
              gradient: "var(--gradient-violet-pink)",
            },
            {
              label: "Completed",
              value: stats.completedProjects.toString().padStart(2, "0"),
              description: "Projects delivered",
              icon: TrendingUp,
              gradient: "var(--gradient-emerald-cyan)",
            },
            {
              label: "Requests",
              value: stats.requests.toString().padStart(2, "0"),
              description: "Project requests",
              icon: BarChart3,
              gradient: "var(--gradient-orange-pink)",
            },
          ].map((stat) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                className="group relative overflow-hidden rounded-[24px] border border-[var(--border-subtle)] bg-[var(--surface)] p-5 shadow-[var(--shadow-md)] backdrop-blur-xl"
              >
                <div
                  className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-[0.08] blur-xl transition-all duration-500 group-hover:scale-150"
                  style={{ background: stat.gradient }}
                />

                <div className="relative flex items-start justify-between">
                  <div>
                    <div className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--text-disabled)]">
                      {stat.label}
                    </div>

                    <div className="mt-2 text-[27px] font-black tracking-[-0.05em] text-[var(--text-primary)]">
                      {stat.value}
                    </div>

                    <div className="mt-1 text-[9px] font-medium text-[var(--text-muted)]">
                      {stat.description}
                    </div>
                  </div>

                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--text-inverse)] shadow-[var(--shadow-md)]"
                    style={{ background: stat.gradient }}
                  >
                    <Icon size={15} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </section>

        {/* ============================================================ */}
        {/* PROJECTS + ACTIVITY                                           */}
        {/* ============================================================ */}

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* PROJECTS */}

          <motion.div className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6 shadow-[var(--shadow-lg)] backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--accent)]">
                  Workspace
                </div>

                <h2 className="mt-1 text-[20px] font-black tracking-[-0.04em] text-[var(--text-primary)]">
                  Your projects
                </h2>
              </div>

              <Link
                href="/dashboard/projects"
                className="flex items-center gap-1 text-[9px] font-black uppercase tracking-[0.12em] text-[var(--text-disabled)] transition-colors hover:text-[var(--accent)]"
              >
                View all
                <ArrowUpRight size={11} />
              </Link>
            </div>

            <div className="space-y-3">
              {visibleProjects.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)]/60 px-5 py-10 text-center">
                  <FolderKanban
                    className="mx-auto text-[var(--text-disabled)]"
                    size={22}
                  />

                  <div className="mt-3 text-[11px] font-black text-[var(--text-tertiary)]">
                    No projects yet
                  </div>

                  <div className="mt-1 text-[9px] text-[var(--text-disabled)]">
                    Start your first project with Nexus.
                  </div>

                  <Link
                    href="/build"
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-[9px] font-black text-[var(--text-inverse)]"
                  >
                    <Plus size={12} />
                    Start a project
                  </Link>
                </div>
              ) : (
                visibleProjects.map((project, index) => {
                  const gradients = [
                    "var(--gradient-cyan-violet)",
                    "var(--gradient-violet-pink)",
                    "var(--gradient-emerald-cyan)",
                  ];

                  const gradient = gradients[index % gradients.length];

                  const progress = Math.min(
                    100,
                    Math.max(0, Number(project.progress ?? 0)),
                  );

                  return (
                    <motion.div
                      key={project.id}
                      className="group relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-4 transition-all duration-300 hover:border-[var(--accent-soft-strong)] hover:shadow-[var(--shadow-md)]"
                    >
                      <div
                        className="absolute left-0 top-0 h-full w-1"
                        style={{
                          background: `linear-gradient(to bottom, var(--accent), var(--accent-hover))`,
                        }}
                      />

                      <div className="flex items-center gap-4">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[var(--text-inverse)]"
                          style={{ background: gradient }}
                        >
                          <FolderKanban size={16} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <div className="truncate text-[11px] font-black text-[var(--text-secondary)]">
                              {project.name ??
                                project.title ??
                                "Untitled project"}
                            </div>

                            <span className="shrink-0 rounded-full bg-[var(--surface-secondary)] px-2 py-1 text-[7px] font-black uppercase tracking-[0.1em] text-[var(--text-muted)]">
                              {project.status ?? "Active"}
                            </span>
                          </div>

                          <div className="mt-1 text-[9px] font-medium text-[var(--text-disabled)]">
                            {project.type ?? "Project"}
                          </div>

                          <div className="mt-3 flex items-center gap-3">
                            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--surface-secondary)]">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ background: gradient }}
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{
                                  duration: 0.7,
                                  ease: "easeOut",
                                }}
                              />
                            </div>

                            <span className="text-[8px] font-black text-[var(--text-muted)]">
                              {progress}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </motion.div>

          {/* ACTIVITY */}

          <motion.div className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6 shadow-[var(--shadow-lg)] backdrop-blur-xl">
            <div className="mb-5">
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--accent)]">
                Timeline
              </div>

              <h2 className="mt-1 text-[20px] font-black tracking-[-0.04em] text-[var(--text-primary)]">
                Recent activity
              </h2>
            </div>

            <div className="space-y-5">
              {activity.length === 0 ? (
                <div className="py-8 text-center">
                  <Clock3
                    className="mx-auto text-[var(--text-disabled)]"
                    size={20}
                  />

                  <div className="mt-3 text-[10px] font-black text-[var(--text-tertiary)]">
                    No recent activity
                  </div>

                  <div className="mt-1 text-[8px] text-[var(--text-disabled)]">
                    Your project activity will appear here.
                  </div>
                </div>
              ) : (
                activity.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div key={`${item.title}-${index}`} className="flex gap-3">
                      <div className="relative">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                          <Icon size={14} />
                        </div>

                        {index !== activity.length - 1 && (
                          <div className="absolute left-1/2 top-10 h-7 w-px -translate-x-1/2 bg-[var(--border-subtle)]" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] font-black text-[var(--text-secondary)]">
                          {item.title}
                        </div>

                        <div className="mt-1 text-[9px] leading-4 text-[var(--text-muted)]">
                          {item.description}
                        </div>

                        <div className="mt-1.5 flex items-center gap-1 text-[7px] font-bold uppercase tracking-[0.1em] text-[var(--text-disabled)]">
                          <Clock3 size={9} />
                          {formatTime(item.time)}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <Link
              href="/dashboard/projects"
              className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-[var(--border-subtle)] py-3 text-[9px] font-black uppercase tracking-[0.12em] text-[var(--text-muted)] transition-all hover:border-[var(--accent-soft-strong)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
            >
              View projects
              <ArrowUpRight size={11} />
            </Link>
          </motion.div>
        </section>

        {/* ============================================================ */}
        {/* CTA                                                           */}
        {/* ============================================================ */}

        <motion.section className="relative mt-6 overflow-hidden rounded-[30px] border border-[var(--accent-soft-strong)] bg-[var(--gradient-soft)] p-7 text-[var(--text-primary)] shadow-[var(--shadow-lg)] sm:p-9">
          <motion.div className="absolute -right-20 -top-32 h-72 w-72 rounded-full bg-[var(--hero-glow-primary)] blur-[90px]" />

          <motion.div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[var(--hero-glow-secondary)] blur-[90px]" />

          <motion.div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[var(--hero-glow-tertiary)] blur-[80px]" />

          <div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--accent)]">
                <Sparkles size={11} />
                Got an idea?
              </div>

              <h2 className="max-w-xl text-[27px] font-black tracking-[-0.05em] text-[var(--text-primary)] sm:text-[34px]">
                Your next project could start right now.
              </h2>

              <p className="mt-2 max-w-lg text-[10px] font-medium leading-5 text-[var(--text-muted)]">
                Tell us what you&apos;re thinking. We&apos;ll help turn the idea
                into something tangible.
              </p>
            </div>

            <Link
              href="/build"
              className="group relative flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[var(--gradient-primary)] px-6 py-4 text-[10px] font-black uppercase tracking-[0.12em] text-[var(--text-inverse)] shadow-[var(--shadow-md)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start building
                <ArrowUpRight
                  size={13}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>

              <span className="absolute inset-0 -translate-x-full bg-[var(--surface)]/20 transition-transform duration-500 group-hover:translate-x-full" />
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
