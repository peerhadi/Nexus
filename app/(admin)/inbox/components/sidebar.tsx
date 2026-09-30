"use client";

import {
  Archive,
  ArrowLeft,
  ChartPieIcon,
  Clock3,
  Mail,
  Settings,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Inbox", href: "/inbox", icon: Mail },
  { label: "Requests", href: "/inbox/requests", icon: Clock3 },
  { label: "Clients", href: "/inbox/clients", icon: UserRound },
  { label: "Archive", href: "/inbox/archive", icon: Archive },
  { label: "Progress", href: "/inbox/progress", icon: ChartPieIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[235px] shrink-0 border-r border-black/[0.08] bg-white lg:flex lg:flex-col max-h-screen">
      <div className="flex h-[74px] items-center border-b border-black/[0.07] px-5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-12 w-30 items-center justify-center rounded-[11px] text-sm font-black text-white transition-all duration-300 group-hover:-rotate-6 group-hover:scale-105 group-hover:shadow-[3px_3px_0_transparent]">
            <img src="logo.png" />
          </span>
        </Link>
      </div>

      <div className="flex-1 px-3 py-5">
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
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[12px] font-semibold transition-all ${
                  isActive
                    ? "bg-[#111] text-white shadow-[0_5px_18px_rgba(0,0,0,0.08)]"
                    : "text-black/45 hover:bg-black/[0.045] hover:text-black"
                }`}
              >
                <Icon
                  size={16}
                  className={isActive ? "text-white" : "text-black/35"}
                />

                <span>{item.label}</span>

                {item.label === "Inbox" && (
                  <span
                    className={`ml-auto rounded-full px-1.5 py-0.5 text-[9px] ${
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

      <div className="border-t border-black/[0.07] p-3">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-black/[0.04]"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/[0.06]">
            <UserRound size={14} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-bold">Nexus</div>
            <div className="text-[9px] text-black/35">Administrator</div>
          </div>

          <Settings size={14} className="text-black/25" />
        </Link>
      </div>
    </aside>
  );
}
