"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  X,
  ChevronRight,
  LayoutDashboard,
  Briefcase,
  BarChart3,
  FileText,
  Settings,
  Inbox,
  Home,
  LockOpen,
  Lock,
} from "lucide-react";

type UserRole = "CLIENT" | "ADMIN";

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

const menuLinks = [
  {
    name: "Home",
    href: "/",
    desc: "Go back home",
    icon: Home,
    noAuth: true,
  },
  {
    name: "Build",
    href: "/build",
    desc: "Start something new",
    icon: FileText,
    requiresAuth: true,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    desc: "Manage your Nexus workspace",
    icon: LayoutDashboard,
    requiresAuth: true,
  },
  {
    name: "Projects",
    href: "/dashboard/projects",
    desc: "View and manage your projects",
    icon: Briefcase,
    requiresAuth: true,
  },
  {
    name: "Messages",
    href: "/dashboard/messages",
    desc: "Check new messages from admins",
    icon: BarChart3,
    requiresAuth: true,
  },
  {
    name: "Settings",
    href: "/settings",
    desc: "Configure your workspace",
    icon: Settings,
    requiresAuth: true,
  },
  {
    name: "About",
    href: "/about",
    desc: "Learn more about Nexus",
    icon: FileText,
    requiresAuth: false,
  },
  {
    name: "Services",
    href: "/services",
    desc: "Digital products, tools and solutions",
    icon: LayoutDashboard,
    requiresAuth: false,
  },
  {
    name: "Work",
    href: "/work",
    desc: "Explore our latest projects and work",
    icon: Briefcase,
    requiresAuth: false,
  },
  {
    name: "Sign up",
    href: "/signup",
    desc: "Sign up and create new projects",
    icon: LockOpen,
    noAuth: true,
  },
  {
    name: "Log In",
    href: "/login",
    desc: "Log back in and start working",
    icon: Lock,
    noAuth: true,
  },
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    desc: "Admin Dashboard",
    icon: Inbox,
    requiresAuth: true,
    adminOnly: true,
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const token =
      localStorage.getItem("nexus_token") ??
      sessionStorage.getItem("nexus_token");

    if (!token) {
      setIsLoggedIn(false);
      setUserRole(null);
      setAuthChecked(true);
      return;
    }

    setIsLoggedIn(true);

    const storedUser =
      localStorage.getItem("nexus_user") ??
      sessionStorage.getItem("nexus_user");

    if (!storedUser) {
      setUserRole(null);
      setAuthChecked(true);
      return;
    }

    try {
      const user: User = JSON.parse(storedUser);
      setUserRole(user.role ?? null);
    } catch {
      setUserRole(null);
    }

    setAuthChecked(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isAdmin = userRole === "ADMIN";

  const visibleMenuLinks = menuLinks.filter((item) => {
    if (item.noAuth && isLoggedIn) {
      return false;
    }

    if (!item.requiresAuth) {
      return true;
    }

    if (!isLoggedIn) {
      return false;
    }

    if (item.adminOnly && !isAdmin) {
      return false;
    }

    return true;
  });

  const desktopLinks = visibleMenuLinks.slice(0, 3);

  return (
    <>
      {/* NAVBAR */}
      <header
        className={`fixed inset-x-0 top-0 z-50 px-5 transition-all duration-500 ${
          scrolled ? "pt-3" : "pt-5"
        }`}
      >
        <nav
          className={`relative mx-auto flex h-[68px] max-w-6xl items-center justify-between rounded-[20px] px-4 transition-all duration-500 ${
            scrolled
              ? "bg-[var(--surface)] shadow-[0_12px_40px_rgba(0,0,0,0.07)] backdrop-blur-2xl"
              : "bg-[var(--surface)] backdrop-blur-xl"
          }`}
        >
          <span className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full bg-[var(--surface)] opacity-80 transition-transform duration-500 hover:scale-150" />

          {/* EVERYTHING INSIDE WAITS FOR AUTH */}
          <div
            className={`flex w-full items-center justify-between transition-opacity duration-300 ${
              authChecked ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* LEFT */}
            <div className="flex items-center gap-3">
              {/* MENU BUTTON */}
              <div
                aria-label="Open menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(true)}
                className="group flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--surface)] transition-all duration-300 hover:bg-[var(--surface-hover)]"
              >
                <span className="flex flex-col gap-[5px]">
                  <span className="h-[2px] w-[18px] rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)] transition-all duration-300 group-hover:w-[21px]" />

                  <span className="h-[2px] w-[14px] rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)] transition-all duration-300 group-hover:w-[18px]" />

                  <span className="h-[2px] w-[18px] rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)] transition-all duration-300 group-hover:w-[21px]" />
                </span>
              </div>

              {/* LOGO */}
              <Link href="/" className="group flex items-center justify-center">
                <span className="flex h-12 w-30 items-center justify-center rounded-[11px] transition-all duration-300 group-hover:-rotate-6 group-hover:scale-105">
                  <img src="/logo.png" alt="Nexus" />
                </span>
              </Link>
            </div>

            {/* DESKTOP LINKS */}
            <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
              {desktopLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative rounded-xl px-4 py-2 text-[14px] font-medium text-[var(--text-secondary)] transition-all duration-300 hover:-translate-y-0.5 hover:text-[var(--text-primary)]"
                >
                  <span>{item.name}</span>

                  <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--text-primary)] opacity-0 transition-all duration-300 group-hover:w-4 group-hover:opacity-100" />
                </Link>
              ))}
            </div>

            {/* RIGHT SIDE */}
            <div className="ml-auto">
              {isLoggedIn ? (
                <Link
                  href="/dashboard"
                  className="group ml-auto hidden items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-[13px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#a78bfa] md:flex"
                >
                  <span>Dashboard</span>

                  <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </Link>
              ) : (
                <div className="ml-auto flex items-center justify-end gap-2">
                  <Link
                    href="/signup"
                    className="rounded-xl bg-[var(--gradient-primary)] px-5 py-3 text-[13px] font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#111]"
                  >
                    Sign up
                  </Link>

                  <div className="ml-auto hidden items-center justify-end gap-2 md:flex">
                    <Link
                      href="/login"
                      className="rounded-xl bg-[var(--surface)] px-5 py-3 text-[13px] font-semibold text-[var(--text-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#a78bfa]"
                    >
                      Sign in
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed left-0 top-0 z-[100]
          h-screen w-full max-w-[360px]
          overflow-hidden
          bg-[var(--surface)]
          shadow-[20px_0_60px_rgba(0,0,0,0.08)]
          backdrop-blur-2xl
          transition-all duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          ${
            menuOpen
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }
        `}
      >
        {/* BACKGROUND EFFECTS */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-0 h-[280px] w-[280px] rounded-full bg-cyan-400/10 blur-[110px]" />

          <div className="absolute bottom-0 right-0 h-[240px] w-[240px] rounded-full bg-violet-400/10 blur-[110px]" />

          <div className="absolute inset-0 opacity-[0.035]">
            <div className="h-full w-full bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:50px_50px]" />
          </div>
        </div>

        {/* HEADER */}
        <div className="absolute left-7 right-5 top-5 z-20 flex items-center justify-between">
          <span className="text-[30px] font-black uppercase tracking-[0.28em] text-[var(--text-muted)]">
            Nexus
          </span>

          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="group flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface)] transition-all duration-300 hover:bg-[var(--surface-hover)]"
          >
            <X className="h-4 w-4 text-[var(--text-tertiary)] transition-colors duration-300 group-hover:text-cyan-500" />
          </button>
        </div>

        {/* MENU */}
        <nav
          className={`
            relative z-10
            flex h-full flex-col
            overflow-y-auto
            px-4 pb-6 pt-20
            transition-all duration-500
            ${
              menuOpen ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
            }
          `}
        >
          {authChecked &&
            visibleMenuLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-center justify-between rounded-2xl px-4 py-4 transition-all duration-300 hover:bg-[var(--surface-hover)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-hover)] transition-all duration-300 group-hover:bg-[var(--accent-soft)]">
                      <Icon className="h-4 w-4 text-[var(--text-muted)] transition-colors duration-300 group-hover:text-[var(--accent)]" />
                    </div>

                    <div>
                      <h3 className="text-[12px] font-black uppercase tracking-[0.14em] text-[var(--text-secondary)] transition-colors duration-300 group-hover:text-[var(--accent)]">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-[10px] text-[var(--text-muted)]">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="h-4 w-4 shrink-0 text-[var(--text-disabled)] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--accent)]" />
                </Link>
              );
            })}
        </nav>
      </aside>

      {/* BACKDROP */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`
          fixed inset-0 z-[90]
          bg-[var(--overlay)]
          backdrop-blur-[3px]
          transition-all duration-500
          ${
            menuOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />
    </>
  );
}
