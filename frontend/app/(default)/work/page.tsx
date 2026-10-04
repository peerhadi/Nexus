"use client";

import Hero from "@/components/default/work/hero";
import WorkHeader from "@/components/default/work/work-header";
import ProjectCard from "@/components/default/work/project-card";
import { projects } from "@/components/default/work/projects";
import BigStatement from "@/components/default/work/big-statement";
import Numbers from "@/components/default/work/numbers";
import Capabilities from "@/components/default/work/capabilities";
import FinalCta from "@/components/default/work/final-cta";

export default function WorkPage() {
  return (
    <main className="relative overflow-hidden bg-[var(--background)] text-[var(--text-primary)]">
      <Hero />

      <WorkHeader />

      <section className="px-5 pb-36 sm:px-8 lg:px-12 lg:pb-52">
        <div className="mx-auto grid max-w-[1450px] gap-5 lg:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.number} project={project} index={index} />
          ))}
        </div>
      </section>

      <BigStatement />

      <Numbers />

      <Capabilities />

      <FinalCta />
    </main>
  );
}
