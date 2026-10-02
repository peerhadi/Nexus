"use client";

import { motion } from "framer-motion";
import { Settings } from "lucide-react";

export default function SettingsHeader() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">
        <Settings size={12} />
        Preferences
      </div>

      <h1 className="mt-2 text-4xl font-black tracking-[-0.05em] text-slate-800">
        Settings
      </h1>

      <p className="mt-2 text-[11px] font-medium text-slate-400">
        Manage your Nexus account and customize your experience.
      </p>
    </motion.div>
  );
}
