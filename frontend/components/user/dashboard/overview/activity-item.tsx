"use client";

import { motion } from "framer-motion";

type ActivityItemProps = {
  item: {
    icon: React.ElementType;
    title: string;
    text: string;
    time: string;
    iconBg: string;
    iconColor: string;
  };
  index: number;
  total: number;
};

export default function ActivityItem({
  item,
  index,
  total,
}: ActivityItemProps) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.25 + index * 0.1 }}
      className="relative flex gap-3"
    >
      {index !== total - 1 && (
        <div className="absolute left-[15px] top-9 h-[calc(100%+10px)] w-px bg-gradient-to-b from-violet-200 to-transparent" />
      )}

      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${item.iconBg}`}
      >
        <Icon size={13} className={item.iconColor} />
      </motion.div>

      <div className="min-w-0">
        <div className="text-[11px] font-black text-slate-700">
          {item.title}
        </div>

        <div className="mt-1 text-[10px] leading-relaxed text-slate-500/70">
          {item.text}
        </div>

        <div className="mt-2 text-[9px] font-bold text-slate-400">
          {item.time}
        </div>
      </div>
    </motion.div>
  );
}
