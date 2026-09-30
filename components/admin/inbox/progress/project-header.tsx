import { getInitials } from "@/lib/inbox/progress-utils";
import type { Project } from "@/lib/inbox/progress-types";

type ProjectHeaderProps = {
  project: Project;
};

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <div className="flex h-[74px] shrink-0 items-center justify-between border-b border-black/[0.08] bg-white px-5 sm:px-7">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[10px] font-bold"
          style={{
            backgroundColor: project.light,
            color: project.color,
          }}
        >
          {getInitials(project.client)}
        </div>

        <div className="min-w-0">
          <div className="truncate text-[12px] font-bold">{project.client}</div>

          <div className="mt-0.5 truncate text-[9px] text-black/30">
            {project.email}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span
          className="rounded-lg px-2.5 py-1.5 text-[8px] font-bold"
          style={{
            backgroundColor: project.light,
            color: project.color,
          }}
        >
          {project.status}
        </span>

        <span className="hidden rounded-lg border border-black/[0.07] bg-[#f7f7f5] px-2.5 py-1.5 text-[8px] font-bold text-black/35 sm:block">
          {project.id}
        </span>
      </div>
    </div>
  );
}
