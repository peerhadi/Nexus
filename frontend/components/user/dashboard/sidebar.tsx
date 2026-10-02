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
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[235px] border-r border-black/5 bg-white/80 px-4 py-5 backdrop-blur-2xl lg:flex lg:flex-col">
        <Link
          href="/home"
          className="group mb-8 flex items-center gap-3 rounded-xl px-2 py-2.5 transition-all duration-300 hover:bg-black/[0.025]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/[0.035] transition-all duration-300 group-hover:bg-cyan-100">
            <ArrowLeft className="h-3.5 w-3.5 text-black/35 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:text-cyan-500" />
          </span>

          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/55 transition-colors duration-300 group-hover:text-cyan-500">
              Nexus
            </span>

            <span className="mt-0.5 text-[9px] text-black/25">
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
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[285px] flex-col border-r border-black/[0.06] bg-white px-4 py-5 shadow-[12px_0_40px_rgba(0,0,0,0.08)] transition-transform duration-300 lg:hidden ${
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
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-400 text-white shadow-[0_4px_14px_rgba(34,211,238,0.2)]">
              <span className="text-[11px] font-black">N</span>
            </div>

            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-black/65">
                Nexus
              </div>

              <div className="mt-0.5 text-[8px] font-medium text-black/25">
                Client space
              </div>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-black/30 transition hover:bg-cyan-50 hover:text-cyan-500"
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mb-3 px-2 text-[9px] font-black uppercase tracking-[0.2em] text-black/25">
          Workspace
        </div>

        <div onClick={() => setMobileOpen(false)}>
          <SidebarNav />
        </div>
      </aside>
    </>
  );
}
