import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProjectHero from "@/components/user/dashboard/projects/project-hero";
import ProjectMilestones from "@/components/user/dashboard/projects/project-milestones";
import ProjectSidebar from "@/components/user/dashboard/projects/project-sidebar";

export default function ProjectPage() {
  return (
    <div className="space-y-7">
      <Link
        href="/dashboard/projects"
        className="inline-flex items-center gap-2 text-[10px] font-black text-black/40 transition hover:text-black"
      >
        <ArrowLeft size={13} />
        All projects
      </Link>

      <ProjectHero />

      <div className="grid gap-7 xl:grid-cols-[1.5fr_1fr]">
        <ProjectMilestones />

        <ProjectSidebar />
      </div>
    </div>
  );
}
