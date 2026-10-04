"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type Notification = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
};

interface NotificationPopoverProps {
  open: boolean;
  onClose: () => void;
  notifications: Notification[];
}

function formatTime(date: string) {
  const value = new Date(date);
  const now = new Date();

  const difference = now.getTime() - value.getTime();

  const minutes = Math.floor(difference / (1000 * 60));

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days}d ago`;
  }

  return value.toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
}

export default function NotificationPopover({
  open,
  onClose,
  notifications,
}: NotificationPopoverProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
            y: -8,
            scale: 0.97,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -8,
            scale: 0.97,
          }}
          className="absolute right-5 top-[62px] z-50 w-[320px] rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-4 shadow-2xl"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-[13px] font-black">Notifications</div>

              <div className="mt-0.5 text-[9px] font-bold text-[var(--text-muted)]">
                {notifications.length === 0
                  ? "You're all caught up"
                  : `${notifications.length} recent update${
                      notifications.length === 1 ? "" : "s"
                    }`}
              </div>
            </div>

            <button
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-[var(--surface-hover)]"
              aria-label="Close notifications"
            >
              <X size={15} />
            </button>
          </div>

          {notifications.length === 0 ? (
            <div className="rounded-xl bg-[var(--surface-hover)] px-4 py-7 text-center">
              <div className="text-[11px] font-black text-[var(--text-tertiary)]">
                No notifications
              </div>

              <div className="mt-1 text-[9px] font-medium text-[var(--text-muted)]">
                Project updates will appear here.
              </div>
            </div>
          ) : (
            <div className="max-h-[360px] space-y-2 overflow-y-auto">
              {notifications.map((notification, index) => (
                <div
                  key={notification.id}
                  className={`rounded-xl p-3 ${
                    index % 2 === 0 ? "bg-cyan-50" : "bg-pink-50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-[11px] font-black">
                      {notification.title}
                    </div>

                    <div className="shrink-0 text-[8px] font-bold text-[var(--text-muted)]">
                      {formatTime(notification.createdAt)}
                    </div>
                  </div>

                  <div className="mt-1 text-[10px] leading-relaxed text-[var(--text-tertiary)]">
                    {notification.description}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
