import Link from "next/link";
import { Plus } from "lucide-react";
import ProjectCard from "@/components/user/dashboard/projects/project-card";
import { projects } from "@/components/user/dashboard/projects/data";

export default function ProjectsPage() {
  return (
    <div className="space-y-7">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30">
            Workspace
          </div>

          <h1 className="mt-2 text-4xl font-black tracking-[-0.04em]">
            Projects
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-black/40">
            Everything Nexus is building for you, in one place.
          </p>
        </div>

        <Link
          href="/contact"
          className="flex w-fit items-center gap-2 rounded-xl bg-black px-4 py-3 text-[11px] font-black text-white shadow-lg transition hover:-translate-y-1"
        >
          <Plus size={14} />
          New project
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
