"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, X, AlertTriangle, Info, XIcon } from "lucide-react";
import { useCallback, useState } from "react";

import { AlertContext, Alert, AlertType } from "./alert-context";

const alertStyles: Record<
  AlertType,
  {
    icon: typeof Check;
    surface: string;
    border: string;
    accent: string;
    iconBackground: string;
    iconClass: string;
    glow: string;
  }
> = {
  success: {
    icon: Check,
    surface: "bg-emerald-50/95",
    border: "border-emerald-400/30",
    accent: "bg-emerald-500",
    iconBackground: "bg-emerald-500/10",
    iconClass: "text-emerald-600",
    glow: "bg-emerald-400/20",
  },

  error: {
    icon: X,
    surface: "bg-red-50/95",
    border: "border-red-400/35",
    accent: "bg-red-500",
    iconBackground: "bg-red-500/10",
    iconClass: "text-red-600",
    glow: "bg-red-400/20",
  },

  warning: {
    icon: AlertTriangle,
    surface: "bg-amber-50/95",
    border: "border-amber-400/35",
    accent: "bg-amber-500",
    iconBackground: "bg-amber-500/10",
    iconClass: "text-amber-600",
    glow: "bg-amber-400/20",
  },

  info: {
    icon: Info,
    surface: "bg-cyan-50/95",
    border: "border-cyan-400/30",
    accent: "bg-cyan-500",
    iconBackground: "bg-cyan-500/10",
    iconClass: "text-cyan-600",
    glow: "bg-cyan-400/20",
  },
};

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const removeAlert = useCallback((id: string) => {
    setAlerts((current) => current.filter((alert) => alert.id !== id));
  }, []);

  const showAlert = useCallback(
    (type: AlertType, title: string, message?: string) => {
      const id = `${Date.now()}-${Math.random()}`;

      setAlerts((current) => [
        ...current,
        {
          id,
          type,
          title,
          message,
        },
      ]);

      window.setTimeout(() => {
        removeAlert(id);
      }, 4500);
    },
    [removeAlert],
  );

  return (
    <AlertContext.Provider
      value={{
        showAlert,
        removeAlert,
      }}
    >
      {children}

      <div className="pointer-events-none fixed top-6 right-6 z-[9999] flex w-[calc(100vw-48px)] max-w-[390px] flex-col gap-3">
        <AnimatePresence mode="popLayout">
          {alerts.map((alert) => {
            const style = alertStyles[alert.type];
            const Icon = style.icon;

            return (
              <motion.div
                key={alert.id}
                layout
                initial={{
                  opacity: 0,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.97,
                }}
                transition={{
                  duration: 0.28,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`
                  pointer-events-auto
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  ${style.border}
                  ${style.surface}
                  shadow-[0_18px_55px_rgba(0,0,0,0.12)]
                  backdrop-blur-2xl
                `}
              >
                {/* Ambient glow */}
                <div
                  className={`
                    pointer-events-none
                    absolute
                    -left-10
                    -top-10
                    h-28
                    w-28
                    rounded-full
                    blur-3xl
                    ${style.glow}
                  `}
                />

                <div className="relative flex items-start gap-3.5 p-4 pl-5">
                  {/* Icon */}
                  <div
                    className={`
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      ${style.iconBackground}
                    `}
                  >
                    <Icon
                      strokeWidth={2.5}
                      className={`h-[18px] w-[18px] ${style.iconClass}`}
                    />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1 pt-0.5">
                    <p className="text-[13px] font-bold text-black/80">
                      {alert.title}
                    </p>

                    {alert.message && (
                      <p className="mt-1 text-[11px] font-medium leading-relaxed text-black/50">
                        {alert.message}
                      </p>
                    )}
                  </div>

                  {/* Close */}
                  <button
                    type="button"
                    aria-label="Close alert"
                    onClick={() => removeAlert(alert.id)}
                    className="
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      transition-all
                      duration-200
                      hover:bg-black/[0.06]
                    "
                  >
                    <XIcon className="h-3.5 w-3.5 text-black/30 transition-colors hover:text-black/60" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </AlertContext.Provider>
  );
}
