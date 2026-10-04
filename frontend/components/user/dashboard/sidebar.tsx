"use client";

import Link from "next/link";
import { ArrowLeft, X } from "lucide-react";
import { useEffect, useState } from "react";
import SidebarNav from "./sidebar-nav";

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const openSidebar = () => setMobileOpen(true);

    window.addEventListener("nexus:open-sidebar", openSidebar);

    return () => {
      window.removeEventListener("nexus:open-sidebar", openSidebar);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[235px] border-r border-[var(--border-subtle)] bg-[var(--surface)] px-4 py-5 backdrop-blur-2xl lg:flex lg:flex-col">
        <Link
          href="/home"
          className="group mb-8 flex items-center gap-3 rounded-xl px-2 py-2.5 transition-all duration-300 hover:bg-[var(--surface-hover)]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--surface-hover)] transition-all duration-300 group-hover:bg-[var(--accent-soft)]">
            <ArrowLeft className="h-3.5 w-3.5 text-[var(--text-muted)] transition-all duration-300 group-hover:-translate-x-0.5 group-hover:text-[var(--accent)]" />
          </span>

          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] transition-colors duration-300 group-hover:text-[var(--accent)]">
              Nexus
            </span>

            <span className="mt-0.5 text-[9px] text-[var(--text-muted)]">
              Back to main site
            </span>
          </div>
        </Link>

        <SidebarNav />
      </aside>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-[var(--overlay)] backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[285px] flex-col border-r border-[var(--border-subtle)] bg-[var(--surface)] px-4 py-5 shadow-[12px_0_40px_var(--shadow-lg)] transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile header */}
        <div className="mb-6 flex items-center justify-between px-1">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2.5"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--accent-contrast)] shadow-[0_4px_14px_var(--accent-soft-strong)]">
              <span className="text-[11px] font-black">N</span>
            </div>

            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                Nexus
              </div>

              <div className="mt-0.5 text-[8px] font-medium text-[var(--text-muted)]">
                Client space
              </div>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-[var(--text-muted)] transition hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mb-3 px-2 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Workspace
        </div>

        <div onClick={() => setMobileOpen(false)}>
          <SidebarNav />
        </div>
      </aside>
    </>
  );
}
