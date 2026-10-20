import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getWorkProject,
  workProjects,
} from "@/components/default/work/data";
import ProjectDetail from "@/components/default/work/project-detail";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return workProjects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getWorkProject(id);

  if (!project) {
    return { title: "Project not found | Nexus" };
  }

  return {
    title: `${project.title} | Nexus`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Nexus`,
      description: project.description,
      type: "article",
    },
  };
}

export default async function WorkProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = getWorkProject(id);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
