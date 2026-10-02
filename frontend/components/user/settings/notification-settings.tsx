"use client";

import { useState } from "react";
import { Bell, Mail, Sparkles } from "lucide-react";

function Toggle({
  enabled,
  onClick,
}: {
  enabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={onClick}
      className={`relative flex h-7 w-12 shrink-0 items-center rounded-full p-1 transition-all duration-300 ${
        enabled
          ? "bg-cyan-400 shadow-[0_4px_14px_rgba(34,211,238,0.25)]"
          : "bg-slate-200"
      }`}
    >
      <span
        className={`block h-5 w-5 rounded-full bg-white shadow-[0_2px_5px_rgba(0,0,0,0.15)] transition-transform duration-300 ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export default function NotificationSettings() {
  const [email, setEmail] = useState(true);
  const [updates, setUpdates] = useState(true);
  const [news, setNews] = useState(false);

  const items = [
    {
      title: "Email notifications",
      description: "Receive important account updates by email.",
      icon: Mail,
      value: email,
      setValue: setEmail,
    },
    {
      title: "Workspace updates",
      description: "Get notified about activity in your workspace.",
      icon: Bell,
      value: updates,
      setValue: setUpdates,
    },
    {
      title: "Nexus news",
      description: "Occasional updates about new Nexus features.",
      icon: Sparkles,
      value: news,
      setValue: setNews,
    },
  ];

  return (
    <div className="divide-y divide-black/[0.05]">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="flex items-center gap-4 p-5 transition-colors duration-300 hover:bg-black/[0.012]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/[0.035] text-slate-400">
              <Icon size={16} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-black text-slate-700">
                {item.title}
              </div>

              <div className="mt-1 text-[9px] font-medium text-slate-400">
                {item.description}
              </div>
            </div>

            <Toggle
              enabled={item.value}
              onClick={() => item.setValue(!item.value)}
            />
          </div>
        );
      })}
    </div>
  );
}
