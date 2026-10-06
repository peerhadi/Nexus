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
    <nav className="flex gap-1 flex-col">
      {nav.map((item) => {
        const Icon = item.icon;

        const active =
          item.href !== "/" &&
          (pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href)));

        return (
          <Link key={item.href} href={item.href}>
            <motion.div
              whileHover={{ x: 2 }}
              className={`group relative flex items-center gap-3 rounded-2xl px-3 py-3 transition-all duration-300 ${
                active
                  ? " bg-[var(--accent-soft)] shadow-[0_6px_20px_var(--accent-soft)]"
                  : "border-transparent text-[var(--text-secondary)] hover:border-[var(--border-subtle)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
              }`}
            >
              {/* Icon */}
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                  active
                    ? "bg-[var(--accent)] text-[var(--accent-contrast)] shadow-[0_4px_14px_var(--accent-soft-strong)]"
                    : "bg-[var(--surface-hover)] text-[var(--text-muted)] group-hover:bg-[var(--accent-soft)] group-hover:text-[var(--accent)]"
                }`}
              >
                <Icon size={15} />
              </div>

              {/* Text */}
              <div className="min-w-0 flex-1">
                <div
                  className={`text-[10px] font-black leading-none ${
                    active
                      ? "text-[var(--accent)]"
                      : "text-[var(--text-secondary)]"
                  }`}
                >
                  {item.label}
                </div>

                <div
                  className={`mt-1 text-[8px] font-medium leading-3.5 ${
                    active
                      ? "text-[var(--accent)] opacity-60"
                      : "text-[var(--text-muted)]"
                  }`}
                >
                  {item.description}
                </div>
              </div>

              {/* Message count */}
              {item.label === "Messages" && conversationCount > 0 && (
                <span
                  className={`flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1 text-[8px] font-black ${
                    active
                      ? "bg-[var(--accent)] text-[var(--accent-contrast)]"
                      : "bg-[var(--accent)] text-[var(--accent-contrast)]"
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
