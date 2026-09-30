"use client";

import { motion } from "framer-motion";
import { CalendarDays, FolderKanban, MessageCircle, Zap } from "lucide-react";
import { stats } from "./data";

const icons = [FolderKanban, Zap, MessageCircle, CalendarDays];

export default function OverviewStats() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = icons[index];

        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            whileHover={{
              y: -5,
              scale: 1.015,
            }}
            className={`rounded-[22px] border border-white bg-gradient-to-br ${stat.gradient} p-5 shadow-sm transition-shadow hover:shadow-xl`}
          >
            <div
              className={`mb-7 flex h-9 w-9 items-center justify-center rounded-xl ${stat.iconBg}`}
            >
              <Icon size={17} className={stat.iconColor} />
            </div>

            <div className="text-2xl font-black tracking-tight text-slate-800">
              {stat.value}
            </div>

            <div className="mt-1 text-[10px] font-bold text-slate-500/70">
              {stat.label}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
