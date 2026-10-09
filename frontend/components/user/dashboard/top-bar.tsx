"use client";

import Link from "next/link";
import { Bell, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NotificationPopover from "./notification-popover";
import { useAlert } from "@/lib/alert";
import { API_URL } from "@/lib/api";

type User = {
  id: string;
  name: string;
  email: string;
  role: "CLIENT" | "ADMIN";
};

type Notification = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
};

export default function TopBar() {
  const router = useRouter();

  const [notifications, setNotifications] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [notificationItems, setNotificationItems] = useState<Notification[]>(
    [],
  );

  useEffect(() => {
    const token =
      localStorage.getItem("nexus_token") ??
      sessionStorage.getItem("nexus_token");

    if (!token) {
      router.replace("/login");
      return;
    }

    const loadUser = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to load user");
        }

        const data = await response.json();
        const currentUser = data.user ?? data;

        setUser(currentUser);
        localStorage.setItem("nexus_user", JSON.stringify(currentUser));
      } catch (error) {
        console.error("Failed to load current user:", error);

        const storedUser =
          localStorage.getItem("nexus_user") ??
          sessionStorage.getItem("nexus_user");

        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch {
            // Ignore invalid stored user data.
          }
        }
      }
    };

    const loadNotifications = async () => {
      try {
        const response = await fetch(`${API_URL}/projects`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) return;

        const data = await response.json();

        const projects = Array.isArray(data) ? data : (data.projects ?? []);

        const updates: Notification[] = projects
          .flatMap((project: any) =>
            (project.updates ?? []).map((update: any) => ({
              id: update.id,
              title: update.title,
              description: `${project.name}: ${update.description}`,
              createdAt: update.createdAt,
            })),
          )
          .sort(
            (a: Notification, b: Notification) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .slice(0, 5);

        setNotificationItems(updates);
      } catch (error) {
        console.error("Failed to load notifications:", error);
      }
    };

    void loadUser();
    void loadNotifications();
  }, [router]);
  const { showAlert } = useAlert();
  const handleLogout = () => {
    localStorage.removeItem("nexus_token");
    localStorage.removeItem("nexus_user");

    sessionStorage.removeItem("nexus_token");
    sessionStorage.removeItem("nexus_user");

    showAlert("success", "Signed out", "You've been successfully logged out.");

    router.replace("/login");
  };
  const openSidebar = () => {
    window.dispatchEvent(new Event("nexus:open-sidebar"));
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "N";

  const displayName = user?.name?.trim()
    ? user.name.trim().split(" ")[0]
    : "there";

  return (
    <>
      <header className="sticky top-0 z-30 flex h-[66px] items-center border-b border-[var(--border-subtle)] bg-[var(--surface)] px-4 backdrop-blur-2xl sm:px-5 lg:px-7">
        <div className="ml-3 flex items-center gap-2.5 lg:hidden">
          {/* Mobile menu */}
          <button
            type="button"
            onClick={openSidebar}
            aria-label="Open navigation"
            className="group flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--surface)] transition-all duration-300 hover:border-cyan-200 hover:bg-cyan-50"
          >
            <span className="flex flex-col gap-[4px]">
              <span className="h-[2px] w-[18px] rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)] transition-all duration-300 group-hover:w-[21px]" />

              <span className="h-[2px] w-[14px] rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)] transition-all duration-300 group-hover:w-[18px]" />

              <span className="h-[2px] w-[18px] rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)] transition-all duration-300 group-hover:w-[21px]" />
            </span>
          </button>

          {/* Mobile logo */}
          <Link href="/dashboard">
            <span className="text-[12px] font-black tracking-[-0.02em] text-[var(--text-primary)]">
              NEXUS
            </span>
          </Link>
        </div>

        {/* Desktop identity */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="px-2 ml-2">
              <div className="text-[12px] font-black tracking-[-0.02em] text-[var(--text-primary)]">
                NEXUS
              </div>

              <div className="text-[7px] font-black uppercase tracking-[0.18em] text-[var(--text-disabled)]">
                Client space
              </div>
            </div>
          </Link>

          <div className="ml-2 h-5 w-px bg-[var(--surface-hover)]" />

          <div className="text-[8px] font-black uppercase tracking-[0.18em] text-[var(--text-disabled)]">
            Dashboard
          </div>
        </div>

        {/* Right controls */}
        <div className="ml-auto flex items-center gap-2">
          {/* Notifications */}
          <button
            type="button"
            onClick={() => setNotifications((current) => !current)}
            className={`relative flex h-9 w-9 items-center justify-center rounded-xl border transition-colors ${
              notifications
                ? "border-cyan-200 bg-cyan-50 text-cyan-500"
                : "border-[var(--border-subtle)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-500"
            }`}
            aria-label="Notifications"
            aria-expanded={notifications}
          >
            <Bell size={15} />

            {notificationItems.length > 0 && (
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-pink-400 ring-2 ring-white" />
            )}
          </button>

          {/* User */}
          <div className="flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] py-1 pl-1 pr-2.5">
            <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-400 via-violet-400 to-cyan-400 text-[9px] font-black text-white">
              {initials}
            </div>

            <div className="hidden sm:block">
              <div className="text-[9px] font-black leading-none text-[var(--text-secondary)]">
                {displayName}
              </div>

              <div className="mt-1 text-[7px] font-bold uppercase tracking-[0.12em] text-[var(--text-disabled)]">
                {user?.role ?? "Client"}
              </div>
            </div>
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] text-[var(--text-disabled)] transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-400"
            aria-label="Log out"
            title="Log out"
          >
            <LogOut size={14} />
          </button>
        </div>
      </header>

      <NotificationPopover
        open={notifications}
        onClose={() => setNotifications(false)}
        notifications={notificationItems}
      />
    </>
  );
}
