"use client";

import { MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import type { Project } from "@/lib/inbox/progress-types";

type ProjectUpdatesProps = {
  project: Project;
  onAddUpdate: (
    title: string,
    description: string,
    type: "PROGRESS" | "MILESTONE" | "NOTE" | "COMPLETED",
  ) => Promise<void>;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatType(type: string) {
  return type.replaceAll("_", " ");
}

export default function ProjectUpdates({
  project,
  onAddUpdate,
}: ProjectUpdatesProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<
    "PROGRESS" | "MILESTONE" | "NOTE" | "COMPLETED"
  >("PROGRESS");
  const [submitting, setSubmitting] = useState(false);

  async function submitUpdate() {
    const cleanTitle = title.trim();
    const cleanDescription = description.trim();

    if (!cleanTitle || !cleanDescription || submitting) {
      return;
    }

    try {
      setSubmitting(true);

      await onAddUpdate(cleanTitle, cleanDescription, type);

      setTitle("");
      setDescription("");
      setType("PROGRESS");
    } catch (error) {
      console.error("Failed to create project update:", error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_4px_18px_rgba(0,0,0,0.025)]">
      <div className="border-b border-[var(--border)] px-5 py-4">
        <div className="flex items-center gap-2">
          <MessageSquare size={12} />

          <span className="text-[10px] font-bold">Project updates</span>
        </div>

        <div className="mt-1 text-[8px] text-[var(--text-muted)]">
          Post an update to the client's project timeline.
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-2">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Update title..."
            className="h-9 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] px-3 text-[9px] font-semibold outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--border-strong)] focus:bg-[var(--surface)]"
          />

          <div className="flex gap-2">
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Write a project update..."
              rows={3}
              className="min-w-0 flex-1 resize-none rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] p-3 text-[9px] leading-4 outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--border-strong)] focus:bg-[var(--surface)]"
            />

            <button
              type="button"
              onClick={() => void submitUpdate()}
              disabled={!title.trim() || !description.trim() || submitting}
              className="flex h-9 w-9 shrink-0 items-center justify-center self-end rounded-xl bg-[var(--accent)] text-[var(--accent-contrast)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_15px_rgba(0,0,0,0.13)] disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:translate-y-0"
            >
              <Send size={12} />
            </button>
          </div>

          <select
            value={type}
            onChange={(event) =>
              setType(
                event.target.value as
                  "PROGRESS" | "MILESTONE" | "NOTE" | "COMPLETED",
              )
            }
            className="h-8 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] px-3 text-[8px] font-bold uppercase outline-none focus:bg-[var(--surface)]"
          >
            <option value="PROGRESS">Progress</option>
            <option value="MILESTONE">Milestone</option>
            <option value="NOTE">Note</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        <div className="mt-4 space-y-3">
          {project.updates.length === 0 ? (
            <div className="rounded-xl bg-[var(--surface-secondary)] px-4 py-8 text-center">
              <div className="text-[9px] font-bold text-[var(--text-tertiary)]">
                No updates yet
              </div>

              <div className="mt-1 text-[8px] text-[var(--text-muted)]">
                Your first project update will appear here.
              </div>
            </div>
          ) : (
            project.updates.map((update, index) => (
              <div key={update.id} className="relative flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`mt-1 h-2 w-2 rounded-full ${
                      update.type === "COMPLETED"
                        ? "bg-emerald-500"
                        : update.type === "MILESTONE"
                          ? "bg-violet-500"
                          : "bg-[var(--accent)]"
                    }`}
                  />

                  {index < project.updates.length - 1 && (
                    <div className="mt-1 h-full w-px bg-[var(--border)]" />
                  )}
                </div>

                <div className="min-w-0 flex-1 pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-[9px] font-bold text-[var(--text-secondary)]">
                      {update.title}
                    </div>

                    <span className="shrink-0 rounded-full bg-[var(--surface-hover)] px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-[0.06em] text-[var(--text-muted)]">
                      {formatType(update.type)}
                    </span>
                  </div>

                  <div className="mt-1 text-[8px] leading-4 text-[var(--text-tertiary)]">
                    {update.description}
                  </div>

                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-[7px] font-bold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                      {formatDate(update.createdAt)}
                    </span>

                    <span className="text-[7px] font-bold text-[var(--text-muted)]">
                      {update.progress}% progress
                    </span>
                  </div>

                  {update.comments?.length > 0 && (
                    <div className="mt-3 space-y-2 border-l border-[var(--border)] pl-3">
                      {update.comments.map((comment) => (
                        <div key={comment.id}>
                          <div className="text-[8px] leading-4 text-[var(--text-secondary)]">
                            {comment.content}
                          </div>

                          <div className="mt-0.5 text-[7px] font-bold uppercase tracking-[0.08em] text-[var(--text-disabled)]">
                            {formatDate(comment.createdAt)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
