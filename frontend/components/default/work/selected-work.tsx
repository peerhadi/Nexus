import Reveal from "./reveal";
import ProjectCard from "./project-card";
import { galleryProjects } from "./gallery-data";

export default function SelectedWork() {
  return (
    <section
      id="selected-work"
      className="scroll-mt-20 px-5 pb-24 sm:px-8 sm:pb-32 lg:px-12 lg:pb-40"
    >
      <div className="mx-auto max-w-[1500px]">
        <Reveal>
          <div
            className="mb-8 flex flex-col gap-5 border-b pb-7 sm:mb-10 sm:flex-row sm:items-end sm:justify-between"
            style={{ borderColor: "var(--border)" }}
          >
            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-[0.22em]"
                style={{ color: "var(--text-muted)" }}
              >
                A few things we have made
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.07em] sm:text-6xl">
                Selected work<span style={{ color: "var(--accent)" }}>.</span>
              </h2>
            </div>
            <p
              className="max-w-xs text-sm leading-6"
              style={{ color: "var(--text-secondary)" }}
            >
              Four projects. Four different directions. Take a closer look.
            </p>
          </div>
        </Reveal>

        <div className="grid items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
          {galleryProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
