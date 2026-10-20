"use client";

import { Bot, Code2, FileText, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function Suggestion({
  icon,
  title,
  text,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-[var(--accent-border,var(--border-strong,var(--border)))] hover:bg-[var(--surface-hover)]"
    >
      <div className="flex items-center gap-2 text-[var(--accent)]">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-[var(--accent-subtle)]">
          {icon}
        </span>
        <span className="text-xs font-bold text-[var(--text-primary)]">
          {title}
        </span>
      </div>
      <p className="mt-3 text-xs leading-5 text-[var(--text-secondary)]">
        {text}
      </p>
    </button>
  );
}

export function EmptyChat({ onPick }: { onPick: (draft: string) => void }) {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-4xl flex-col justify-center px-4 py-10 sm:px-8 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="mb-6 grid h-14 w-14 place-items-center rounded-[20px] border border-[var(--accent-border,var(--border))] bg-[var(--accent-subtle)] text-[var(--accent)] shadow-[var(--shadow-sm)]">
          <Bot className="h-7 w-7" />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
          Nexus operations workspace
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-tight tracking-[-0.045em] sm:text-4xl">
          Let’s build something{" "}
          <span className="text-[var(--accent)]">better.</span>
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
          Your internal partner for debugging, architecture decisions, code
          reviews, security, and planning the next steps for Nexus. What are we
          working on?
        </p>
        <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
          <Suggestion
            icon={<Code2 className="h-4 w-4" />}
            title="Debug a problem"
            text="Help me trace a bug from the logs and code."
            onClick={() =>
              onPick(
                "Help me debug an issue. I'll provide the relevant code and logs.",
              )
            }
          />
          <Suggestion
            icon={<ShieldCheck className="h-4 w-4" />}
            title="Review security"
            text="Find risks in a route, component, or workflow."
            onClick={() =>
              onPick(
                "Help me review a Nexus feature for security issues. Tell me which files you need to inspect.",
              )
            }
          />
          <Suggestion
            icon={<FileText className="h-4 w-4" />}
            title="Plan a feature"
            text="Break an idea into practical implementation steps."
            onClick={() =>
              onPick(
                "Help me plan a new Nexus feature. Start with architecture and implementation steps.",
              )
            }
          />
          <Suggestion
            icon={<Sparkles className="h-4 w-4" />}
            title="Improve Nexus"
            text="Identify high-impact product and UX improvements."
            onClick={() =>
              onPick(
                "Help me identify high-impact improvements for Nexus. Separate known facts from assumptions.",
              )
            }
          />
        </div>
        <div className="mt-6 flex items-start gap-2 text-[11px] leading-5 text-[var(--text-muted)]">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>
            Internal guidance only. Verify important code and security
            recommendations before deploying.
          </span>
        </div>
      </motion.div>
    </div>
  );
}
