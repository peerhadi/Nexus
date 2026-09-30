"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { nav } from "./data";

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {nav.map((item) => {
        const Icon = item.icon;

        const active =
          pathname === item.href ||
          (item.href !== "/dashboard" && pathname.startsWith(item.href));

        return (
          <Link key={item.href} href={item.href}>
            <motion.div
              whileHover={{ x: 3 }}
              className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-bold transition ${
                active
                  ? "bg-black text-white shadow-lg"
                  : "text-black/50 hover:bg-black/[0.04] hover:text-black"
              }`}
            >
              <Icon size={16} />

              {item.label}

              {item.label === "Messages" && (
                <span
                  className={`ml-auto flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[9px] font-black ${
                    active ? "bg-white text-black" : "bg-pink-500 text-white"
                  }`}
                >
                  2
                </span>
              )}
            </motion.div>
          </Link>
        );
      })}
    </nav>
  );
}
