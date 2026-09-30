"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function AccountStatus() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="overflow-hidden rounded-[22px] border border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-cyan-50 p-5"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-500">
          <ShieldCheck size={18} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-black text-slate-700">
            Everything looks good
          </div>

          <div className="mt-1 text-[9px] font-medium text-slate-400">
            Your Nexus account is active and verified.
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-[8px] font-black text-emerald-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Active
        </div>
      </div>
    </motion.section>
  );
}
