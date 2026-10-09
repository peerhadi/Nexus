"use client";

import {
  Archive,
  ChartPie,
  Clock3,
  Database,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Settings,
  UserRound,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Inbox", href: "/admin/inbox", icon: Mail },
  { label: "Requests", href: "/admin/requests", icon: Clock3 },
  { label: "Clients", href: "/admin/clients", icon: UserRound },
  { label: "Archive", href: "/admin/archive", icon: Archive },
  { label: "Progress", href: "/admin/progress", icon: ChartPie },
  { label: "Data Center", href: "/admin/data-center", icon: Database },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden h-dvh w-[250px] flex-col overflow-hidden border-r border-[var(--border)] bg-[var(--surface)] lg:flex">
        <SidebarContent onNavigate={() => {}} />
      </aside>

      <button
        type="button"
        aria-label="Open admin menu"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] shadow-[0_8px_25px_rgba(0,0,0,0.08)] transition-all hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)] lg:hidden"
      >
        <Menu size={17} />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close admin menu"
              className="fixed inset-0 z-40 bg-[var(--overlay)] backdrop-blur-[2px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                stiffness: 340,
                damping: 32,
                mass: 0.8,
              }}
              className="fixed inset-y-0 left-0 z-50 flex w-[min(88vw,320px)] flex-col overflow-hidden border-r border-[var(--border)] bg-[var(--surface)] shadow-2xl lg:hidden"
            >
              <div className="flex h-[74px] shrink-0 items-center justify-between border-b border-[var(--border)] px-5">
                <Link
                  href="/"
                  aria-label="Nexus home"
                  onClick={() => setMobileOpen(false)}
                  className="group flex items-center"
                >
                  <span className="flex h-24 w-[120px] items-center justify-start overflow-hidden rounded-[11px] transition-all duration-300 group-hover:scale-[1.02]">
                    <img
                      src="/logo.png"
                      alt="Nexus"
                      className="h-full w-full object-contain object-left"
                    />
                  </span>
                </Link>

                <button
                  type="button"
                  aria-label="Close admin menu"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-secondary)] transition hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)]"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto">
                <SidebarContent onNavigate={() => setMobileOpen(false)} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function SidebarContent({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("nexus_token");
    localStorage.removeItem("nexus_user");
    sessionStorage.removeItem("nexus_token");
    sessionStorage.removeItem("nexus_user");
    onNavigate();
    router.replace("/login");
    router.refresh();
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <Link
        href="/"
        aria-label="Nexus home"
        onClick={onNavigate}
        className="group flex items-center"
      >
        <span className="hidden h-[68px] w-[160px] items-center justify-start overflow-hidden px-5 transition-all duration-300 group-hover:scale-[1.02] lg:flex">
          <img
            src="/logo.png"
            alt="Nexus"
            className="h-full w-full object-contain object-left"
          />
        </span>
      </Link>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-5">
        <div className="mb-2 mt-5 px-3 text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
          Administration
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin/dashboard" &&
                pathname.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[12px] font-semibold transition-all ${
                  isActive
                    ? "bg-[var(--accent)] text-white shadow-[0_5px_18px_rgba(0,0,0,0.08)]"
                    : "text-[var(--text-tertiary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Icon
                  size={16}
                  strokeWidth={1.8}
                  className={
                    isActive
                      ? "text-white"
                      : "text-[var(--text-muted)] transition-colors group-hover:text-[var(--text-secondary)]"
                  }
                />

                <span className="min-w-0 flex-1 truncate">{item.label}</span>

                {item.label === "Inbox" && (
                  <span
                    className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] ${
                      isActive
                        ? "bg-white/15 text-white"
                        : "bg-[var(--surface-hover)] text-[var(--text-tertiary)]"
                    }`}
                  >
                    1
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="shrink-0 space-y-1 border-t border-[var(--border)] p-3">
        <Link
          href="/admin/settings"
          onClick={onNavigate}
          className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-[var(--surface-hover)]"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-hover)] transition-colors group-hover:bg-[var(--border-strong)]">
            <UserRound size={14} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="truncate text-[11px] font-bold">Nexus</div>
            <div className="truncate text-[9px] text-[var(--text-muted)]">
              Administrator
            </div>
          </div>

          <Settings
            size={14}
            className="shrink-0 text-[var(--text-muted)] transition-transform duration-200 group-hover:rotate-45 group-hover:text-[var(--text-secondary)]"
          />
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[12px] font-semibold text-[var(--text-tertiary)] transition-colors hover:bg-red-500/10 hover:text-red-600"
        >
          <LogOut
            size={16}
            strokeWidth={1.8}
            className="text-[var(--text-muted)] transition-colors group-hover:text-red-600"
          />
          <span className="flex-1">Log out</span>
        </button>
      </div>
    </div>
  );
}
