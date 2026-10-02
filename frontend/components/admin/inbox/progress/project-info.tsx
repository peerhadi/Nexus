import { Circle, Clock3, Sparkles, UserRound } from "lucide-react";
import type { Project } from "@/lib/inbox/progress-types";
import InfoCard from "./info-card";

type ProjectInfoProps = {
  project: Project;
};

function formatDeadline(deadline: string | null) {
  if (!deadline) {
    return "No deadline";
  }

  return new Date(deadline).toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ProjectInfo({ project }: ProjectInfoProps) {
  return (
    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
      <InfoCard
        label="Client"
        value={project.client?.name ?? "Unknown"}
        icon={<UserRound size={11} />}
      />

      <InfoCard
        label="Status"
        value={project.status.replaceAll("_", " ")}
        icon={<Sparkles size={11} />}
      />

      <InfoCard
        label="Deadline"
        value={formatDeadline(project.deadline)}
        icon={<Clock3 size={11} />}
      />

      <InfoCard
        label="Project ID"
        value={project.id}
        icon={<Circle size={11} />}
      />
    </div>
  );
}
