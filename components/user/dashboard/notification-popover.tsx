"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface NotificationPopoverProps {
  open: boolean;
  onClose: () => void;
}

export default function NotificationPopover({
  open,
  onClose,
}: NotificationPopoverProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          className="absolute right-5 top-[62px] z-50 w-[320px] rounded-2xl border border-black/5 bg-white p-4 shadow-2xl"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="text-[13px] font-black">Notifications</div>

            <button onClick={onClose}>
              <X size={15} />
            </button>
          </div>

          <div className="rounded-xl bg-cyan-50 p-3">
            <div className="text-[11px] font-black">Project update ✨</div>

            <div className="mt-1 text-[10px] leading-relaxed text-black/45">
              Your Nexus Portal project moved into development.
            </div>
          </div>

          <div className="mt-2 rounded-xl bg-pink-50 p-3">
            <div className="text-[11px] font-black">New message</div>

            <div className="mt-1 text-[10px] leading-relaxed text-black/45">
              You have a new message from the Nexus team.
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
