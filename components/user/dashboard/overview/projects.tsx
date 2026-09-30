import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { projects } from "./data";
import OverviewProjectCard from "./project-card";

export default function OverviewProjects() {
  return (
    <section>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Workspace
          </div>

          <h2 className="mt-1 text-xl font-black tracking-tight text-slate-800">
            Your projects
          </h2>
        </div>

        <Link
          href="/dashboard/projects"
          className="flex items-center gap-1 text-[10px] font-black text-violet-500 transition hover:text-fuchsia-500"
        >
          See all
          <ChevronRight size={13} />
        </Link>
      </div>

      <div className="space-y-3">
        {projects.map((project, index) => (
          <OverviewProjectCard
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
