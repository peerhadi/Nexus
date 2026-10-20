"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "./reveal";
import ProjectArtwork from "./project-artwork";
import type { GalleryProject } from "./gallery-data";

export default function ProjectCard({
  project,
  index,
}: {
  project: GalleryProject;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  const content = (
    <motion.article
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={false}
      animate={{
        y: hovered && !reducedMotion ? -7 : 0,
        scale: hovered && !reducedMotion ? 1.005 : 1,
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[30px] border sm:rounded-[38px] border-none"
      style={{
        background: "var(--card)",
      }}
    >
      <div className="relative p-3 sm:p-4">
        <div className="relative overflow-hidden rounded-[23px] sm:rounded-[29px] ">
          <ProjectArtwork type={project.visual} />
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "var(--gradient-shimmer)",
              opacity: 0,
            }}
            animate={{ opacity: hovered && !reducedMotion ? 0.45 : 0 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-6 pb-7 pt-3 sm:px-8 sm:pb-9 sm:pt-4 lg:px-9">
        <div className="flex items-center justify-between gap-3">
          <span
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.19em] sm:text-[11px]"
            style={{ color: "var(--text-muted)" }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            {project.category}
          </span>
          <span
            className="text-xs font-semibold tabular-nums"
            style={{ color: "var(--text-muted)" }}
          >
            {project.id}
          </span>
        </div>

        <h2 className="mt-5 text-[clamp(2rem,4vw,3.25rem)] font-black leading-[0.96] tracking-[-0.065em]">
          {project.name}
        </h2>

        <p
          className="mt-4 max-w-xl text-sm leading-7 sm:text-base"
          style={{ color: "var(--text-secondary)" }}
        >
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="rounded-full border px-3 py-1.5 text-[10px] font-semibold sm:text-[11px]"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface-secondary)",
                color: "var(--text-secondary)",
              }}
            >
              {item}
            </span>
          ))}
        </div>

        <div
          className="mt-7 flex items-center justify-between gap-4 border-t pt-5"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <span
            className="flex min-w-0 items-center gap-2 text-xs font-bold sm:text-sm"
            style={{
              color: project.href ? "var(--text-primary)" : "var(--text-muted)",
            }}
          >
            <span className="truncate">{project.action}</span>
          </span>
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45"
            style={{
              background: project.href
                ? "var(--accent)"
                : "var(--surface-secondary)",
              color: project.href ? "white" : "var(--text-muted)",
              border: project.href ? "none" : "1px solid var(--border)",
            }}
          >
            {project.href ? (
              <ArrowUpRight size={19} />
            ) : (
              <ArrowRight size={18} />
            )}
          </span>
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 h-[3px] w-full origin-left"
        style={{ background: "var(--gradient-primary)" }}
        animate={{ scaleX: hovered ? 1 : 0.12 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      />
    </motion.article>
  );

  return (
    <Reveal delay={index * 0.07} className="h-full">
      {project.href ? (
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.action}: ${project.name}`}
          className="block h-full rounded-[30px] focus-visible:outline-2 focus-visible:outline-offset-4"
          style={{ outlineColor: "var(--focus-ring)" }}
        >
          {content}
        </a>
      ) : (
        <div className="h-full">{content}</div>
      )}
    </Reveal>
  );
}
