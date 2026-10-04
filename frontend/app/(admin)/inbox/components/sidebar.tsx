"use client";

import {
  Archive,
  ChartPieIcon,
  Clock3,
  Mail,
  Menu,
  Settings,
  UserRound,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Inbox", href: "/inbox", icon: Mail },
  { label: "Requests", href: "/inbox/requests", icon: Clock3 },
  { label: "Clients", href: "/inbox/clients", icon: UserRound },
  { label: "Archive", href: "/inbox/archive", icon: Archive },
  { label: "Progress", href: "/inbox/progress", icon: ChartPieIcon },
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
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden h-dvh w-[250px] flex-col overflow-hidden border-r border-black/[0.08] bg-white lg:flex">
        <SidebarContent onNavigate={() => {}} />
      </aside>

      {/* Mobile menu trigger */}
      <button
        type="button"
        aria-label="Open admin menu"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-xl border border-black/[0.08] bg-white text-black shadow-[0_8px_25px_rgba(0,0,0,0.08)] transition-all hover:bg-black hover:text-white lg:hidden"
      >
        <Menu size={17} />
      </button>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close admin menu"
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] lg:hidden"
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
              className="fixed inset-y-0 left-0 z-50 flex w-[min(88vw,320px)] flex-col overflow-hidden border-r border-black/[0.08] bg-white shadow-2xl lg:hidden"
            >
              {/* Mobile drawer header */}
              <div className="flex h-[74px] shrink-0 items-center justify-between border-b border-black/[0.07] px-5">
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
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-black/[0.08] bg-[#f7f7f5] text-black/50 transition hover:bg-black hover:text-white"
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

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Navigation */}
      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-5">
        <div className="mb-2 px-3 text-[9px] font-bold uppercase tracking-[0.18em] text-black/30">
          Communication
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[12px] font-semibold transition-all ${
                  isActive
                    ? "bg-[#111] text-white shadow-[0_5px_18px_rgba(0,0,0,0.08)]"
                    : "text-black/45 hover:bg-black/[0.045] hover:text-black"
                }`}
              >
                <Icon
                  size={16}
                  strokeWidth={1.8}
                  className={
                    isActive
                      ? "text-white"
                      : "text-black/35 transition-colors group-hover:text-black/60"
                  }
                />

                <span className="min-w-0 flex-1 truncate">{item.label}</span>

                {item.label === "Inbox" && (
                  <span
                    className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] ${
                      isActive
                        ? "bg-white/15 text-white"
                        : "bg-black/[0.06] text-black/40"
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

      {/* Account */}
      <div className="shrink-0 border-t border-black/[0.07] p-3">
        <Link
          href="/settings"
          onClick={onNavigate}
          className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-black/[0.04]"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black/[0.06] transition-colors group-hover:bg-black/[0.09]">
            <UserRound size={14} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="truncate text-[11px] font-bold">Nexus</div>

            <div className="truncate text-[9px] text-black/35">
              Administrator
            </div>
          </div>

          <Settings
            size={14}
            className="shrink-0 text-black/25 transition-transform duration-200 group-hover:rotate-45 group-hover:text-black/50"
          />
        </Link>
      </div>
    </div>
  );
}
