"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";

export default function ProfileHeader() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-violet-400">
        <User size={12} />
        Account
      </div>

      <h1 className="mt-2 text-4xl font-black tracking-[-0.05em] text-slate-800">
        Profile
      </h1>

      <p className="mt-2 text-[11px] font-medium text-slate-400">
        Manage your account and how you interact with Nexus.
      </p>
    </motion.div>
  );
}
