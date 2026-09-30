"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ProjectVisual from "./project-visual";
import { projects } from "./projects";

export default function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const large = index === 0 || index === 3;

  return (
    <motion.article
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.08,
      }}
      whileHover={{ y: -8 }}
      className={`group relative overflow-hidden rounded-[36px] border border-black/[0.08] ${project.background} ${
        large ? "lg:col-span-2" : ""
      }`}
    >
      <motion.div
        animate={{
          x: [0, 25, -20, 0],
          y: [0, -20, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 11 + index,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute -right-[10%] -top-[25%] h-[500px] w-[500px] rounded-full bg-gradient-to-br ${project.gradient} opacity-60 blur-[90px]`}
      />

      <div className="relative flex min-h-[700px] flex-col p-7 sm:p-10 lg:p-12">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-[0.25em] text-black/30">
              {project.number} / {project.type}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-black/[0.07] bg-white/55 px-3 py-1.5 text-[10px] font-semibold text-black/45 backdrop-blur-xl"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <motion.div
            whileHover={{ rotate: 45, scale: 1.08 }}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-black/[0.08] bg-white/70 shadow-sm backdrop-blur-xl"
          >
            <ArrowUpRight className="h-5 w-5" />
          </motion.div>
        </div>

        <ProjectVisual index={index} gradient={project.gradient} />

        <div className="relative z-10 mt-auto max-w-3xl pt-[390px]">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-black/30">
            {project.type}
          </p>

          <h3
            className={`font-black leading-[0.9] tracking-[-0.075em] ${
              large
                ? "text-[clamp(4rem,7vw,7.5rem)]"
                : "text-[clamp(3.5rem,6vw,6rem)]"
            }`}
          >
            {project.title}
          </h3>

          <p className="mt-7 max-w-xl text-sm leading-7 text-black/45 sm:text-base">
            {project.description}
          </p>

          <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-black/40 transition-all duration-300 group-hover:gap-4 group-hover:text-black">
            Explore project
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className={`absolute bottom-0 left-0 h-1 w-full origin-left bg-gradient-to-r ${project.gradient}`}
        />
      </div>
    </motion.article>
  );
}
