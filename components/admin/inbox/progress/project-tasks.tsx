"use client";

import { Check } from "lucide-react";
import type { Project } from "@/lib/inbox/progress-types";

type ProjectTasksProps = {
  project: Project;
  onToggle: (todoId: number) => void;
};

export default function ProjectTasks({ project, onToggle }: ProjectTasksProps) {
  const completedTodos = project.todos.filter((todo) => todo.done).length;

  return (
    <div className="rounded-2xl border border-black/[0.07] bg-white shadow-[0_4px_18px_rgba(0,0,0,0.025)]">
      <div className="flex items-center justify-between border-b border-black/[0.07] px-5 py-4">
        <div>
          <div className="flex items-center gap-2">
            <Check size={12} />

            <span className="text-[10px] font-bold">Project tasks</span>
          </div>

          <div className="mt-1 text-[8px] text-black/30">
            {completedTodos} of {project.todos.length} completed
          </div>
        </div>

        <div className="h-7 w-7 rounded-full bg-black/[0.04] p-[5px]">
          <div
            className="h-full rounded-full"
            style={{
              backgroundColor: project.color,
              transform: `scaleX(${completedTodos / project.todos.length})`,
              transformOrigin: "left",
            }}
          />
        </div>
      </div>

      <div className="p-3">
        {project.todos.map((todo) => (
          <button
            key={todo.id}
            type="button"
            onClick={() => onToggle(todo.id)}
            className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all hover:bg-[#f7f7f5]"
          >
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                todo.done
                  ? "border-transparent text-white"
                  : "border-black/[0.12] bg-white"
              }`}
              style={
                todo.done
                  ? {
                      backgroundColor: project.color,
                    }
                  : undefined
              }
            >
              {todo.done && <Check size={10} />}
            </span>

            <span
              className={`text-[9px] font-semibold transition-all ${
                todo.done
                  ? "text-black/25 line-through"
                  : "text-black/65 group-hover:text-black"
              }`}
            >
              {todo.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
