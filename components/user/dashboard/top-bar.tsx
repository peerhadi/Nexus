"use client";

import Link from "next/link";
import { Bell, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import NotificationPopover from "./notification-popover";

export default function TopBar() {
  const [notifications, setNotifications] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-[70px] items-center justify-between border-b border-black/5 bg-[#f8f8f6]/75 px-5 backdrop-blur-2xl lg:px-8">
        <div className="lg:hidden">
          <Link href="/dashboard" className="font-black">
            NEXUS
          </Link>
        </div>

        <Link href="/dashboard" className="flex items-center gap-3 px-2">
          <motion.div
            whileHover={{ rotate: 8, scale: 1.08 }}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white shadow-lg"
          >
            <Sparkles size={17} />
          </motion.div>

          <div>
            <div className="text-[15px] font-black tracking-tight">NEXUS</div>

            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/35">
              Client space
            </div>
          </div>
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setNotifications(!notifications)}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-black/5 bg-white transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <Bell size={16} />

            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-pink-500" />
          </button>

          <Link
            href="/dashboard/profile"
            className="flex items-center gap-2 rounded-xl border border-black/5 bg-white py-1.5 pl-1.5 pr-3 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-pink-400 via-violet-400 to-cyan-400 text-[10px] font-black text-white">
              H
            </div>

            <span className="hidden text-[11px] font-black sm:block">Hadi</span>
          </Link>
        </div>
      </header>

      <NotificationPopover
        open={notifications}
        onClose={() => setNotifications(false)}
      />
    </>
  );
}
