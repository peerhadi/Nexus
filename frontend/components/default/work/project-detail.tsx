import type { WorkProject } from "./data";
import ProjectHero from "./project-hero";
import ProjectOverview from "./project-overview";
import Capabilities from "./project-capabilities";
import WorkflowSection from "./project-workflow";
import DeepDive from "./project-deep-dive";
import TechnologySection from "./project-technology";
import ChallengesSection from "./project-challenges";
import FAQSection from "./project-faq";
import NextProject from "./project-next";

export default function ProjectDetail({ project }: { project: WorkProject }) {
  return (
    <main className="nexus-page min-h-screen overflow-hidden">
      <ProjectHero project={project} />

      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="space-y-20 sm:space-y-24 lg:space-y-28">
          <ProjectOverview project={project} />
          <Capabilities project={project} />
          <WorkflowSection project={project} />
          <DeepDive project={project} />
          <TechnologySection project={project} />
          <ChallengesSection project={project} />
          <FAQSection project={project} />
          <NextProject project={project} />
        </div>
      </div>
    </main>
  );
}
