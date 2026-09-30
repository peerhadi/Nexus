"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface SettingItemProps {
  item: {
    icon: React.ElementType;
    title: string;
    text: string;
    gradient: string;
    background: string;
    iconColor: string;
  };
  index: number;
}

export default function SettingItem({ item, index }: SettingItemProps) {
  const Icon = item.icon;

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.08,
      }}
      whileHover={{
        x: 4,
        y: -2,
      }}
      whileTap={{
        scale: 0.995,
      }}
      className={`group flex items-center gap-4 rounded-[22px] border border-white bg-gradient-to-r ${item.background} p-5 text-left shadow-sm transition hover:shadow-lg`}
    >
      <motion.div
        whileHover={{
          scale: 1.08,
          rotate: 5,
        }}
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ${item.iconColor}`}
      >
        <Icon size={18} />
      </motion.div>

      <div className="min-w-0 flex-1">
        <div className="text-[12px] font-black text-slate-800">
          {item.title}
        </div>

        <div className="mt-1 text-[9px] font-bold text-slate-400">
          {item.text}
        </div>
      </div>

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/70 text-slate-300 transition group-hover:bg-white group-hover:text-violet-400">
        <ChevronRight size={15} />
      </div>
    </motion.button>
  );
}
