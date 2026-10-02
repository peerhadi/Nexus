"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { nav } from "./data";
import { API_URL } from "@/lib/api";

export default function SidebarNav() {
  const pathname = usePathname();
  const [conversationCount, setConversationCount] = useState(0);

  useEffect(() => {
    const loadConversationCount = async () => {
      try {
        const token =
          localStorage.getItem("nexus_token") ??
          sessionStorage.getItem("nexus_token");

        if (!token) return;

        const response = await fetch(`${API_URL}/conversations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) return;

        const data = await response.json();

        const conversations = Array.isArray(data)
          ? data
          : (data.conversations ?? []);

        setConversationCount(conversations.length);
      } catch (error) {
        console.error("Failed to load conversation count:", error);
      }
    };

    void loadConversationCount();
  }, []);

  return (
    <nav className="space-y-1.5">
      {nav.map((item) => {
        const Icon = item.icon;

        const active =
          item.href != "/home" &&
          (pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href)));

        return (
          <Link key={item.href} href={item.href}>
            <motion.div
              whileHover={{ x: 2 }}
              className={`group relative flex items-center gap-3 rounded-2xl border px-3 py-3 transition-all duration-300 ${
                active
                  ? "border-cyan-200/80 bg-cyan-50/80 shadow-[0_6px_20px_rgba(34,211,238,0.08)]"
                  : "border-transparent text-black/50 hover:border-black/[0.05] hover:bg-black/[0.025] hover:text-black"
              }`}
            >
              {/* Icon */}
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                  active
                    ? "bg-cyan-400 text-white shadow-[0_4px_14px_rgba(34,211,238,0.25)]"
                    : "bg-black/[0.035] text-black/35 group-hover:bg-cyan-50 group-hover:text-cyan-400"
                }`}
              >
                <Icon size={15} />
              </div>

              {/* Text */}
              <div className="min-w-0 flex-1">
                <div
                  className={`text-[10px] font-black leading-none ${
                    active ? "text-cyan-600" : "text-black/65"
                  }`}
                >
                  {item.label}
                </div>

                <div
                  className={`mt-1 text-[8px] font-medium leading-3.5 ${
                    active ? "text-cyan-500/60" : "text-black/30"
                  }`}
                >
                  {item.description}
                </div>
              </div>

              {/* Message count */}
              {item.label === "Messages" && conversationCount > 0 && (
                <span
                  className={`flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1 text-[8px] font-black ${
                    active ? "bg-cyan-400 text-white" : "bg-pink-500 text-white"
                  }`}
                >
                  {conversationCount}
                </span>
              )}
            </motion.div>
          </Link>
        );
      })}
    </nav>
  );
}
