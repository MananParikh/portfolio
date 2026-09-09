"use client";

import * as React from "react";
import { projects, profile, type Project } from "@/data/resume";
import { Reveal, Tilt } from "./primitives";
import { ProjectArt } from "./project-art";
import { ArrowUpRight, Asterisk } from "./icons";
import { SectionProgress } from "./section-progress";

const accentMap: Record<Project["accent"], { bg: string; text: string; label: string }> = {
  rust: { bg: "var(--rust)", text: "var(--paper)", label: "var(--rust)" },
  moss: { bg: "var(--moss)", text: "var(--paper)", label: "var(--moss)" },
  ink: { bg: "var(--ink)", text: "var(--paper)", label: "var(--ink)" },
  clay: { bg: "var(--clay)", text: "var(--ink)", label: "var(--ink)" },
};

export function SelectedWork() {
  return (
    <section id="work" className="relative px-5 pt-20 md:px-8 md:pt-32">
      <SectionProgress />
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader num="01" title="Selected work" kicker="2022 — 2024" />

        {/* Desktop: horizontal rail */}
        <div className="relative mt-12 hidden md:block">
          <div className="no-scrollbar flex gap-6 overflow-x-auto pb-6 snap-x-mandatory">
            {projects.map((p, i) => (
              <Reveal key={p.id} delay={i * 80} className="snap-start shrink-0">
                <ProjectCard project={p} />
              </Reveal>
            ))}
            {/* End card */}
            <Reveal delay={projects.length * 80} className="snap-start shrink-0">
              <EndCard />
            </Reveal>
          </div>
          <div className="pointer-events-none mt-2 flex justify-end font-mono text-[10px] uppercase tracking-[0.12em] text-faded">
            <span className="inline-flex items-center gap-2">
              Scroll →
              <span className="inline-block h-px w-12 bg-ink/30" />
            </span>
          </div>
        </div>

        {/* Mobile: vertical stack */}
        <div className="mt-8 flex flex-col gap-6 md:hidden">
          {projects.map((p) => (
            <Reveal key={p.id}>
              <ProjectCard project={p} mobile />
            </Reveal>
          ))}
          <Reveal>
            <EndCard mobile />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, mobile = false }: { project: Project; mobile?: boolean }) {
  const width = mobile ? "w-full" : "w-[440px]";
  const a = accentMap[project.accent];

  return (
    <article
      className={`${width} group relative`}
      data-cursor="view"
      data-cursor-label="Case"
    >
      <Tilt max={4}>
        <div className="relative overflow-hidden hard-border">
          <div className="aspect-[4/3] overflow-hidden">
            <ProjectArt
              id={project.id}
              className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          </div>
          {/* Top overlay strip */}
          <div
            className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em]"
            style={{ background: a.bg, color: a.text }}
          >
            <span>{project.index} · {project.year}</span>
            <span className="inline-flex items-center gap-1.5">
              {project.client}
            </span>
          </div>

          {/* Hover overlay — slides up from bottom */}
          <div
            className="absolute inset-x-0 bottom-0 translate-y-full bg-ink/95 p-4 text-paper backdrop-blur-sm transition-transform duration-500 ease-out group-hover:translate-y-0"
            style={{ borderTop: `2px solid ${a.label}` }}
          >
            <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-paper/60">
              Stack
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {project.medium.map((m) => (
                <span
                  key={m}
                  className="border border-paper/30 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em]"
                >
                  {m}
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-paper/20 pt-2">
              <span className="font-serif text-base italic text-paper">
                {project.highlights.length} highlights
              </span>
              {project.href && project.href !== "#" ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  data-cursor-label="Open"
                  className="relative z-10 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] hover:underline"
                  style={{ color: a.label === "var(--ink)" ? "var(--clay)" : "var(--paper)" }}
                >
                  View case
                  <ArrowUpRight size={12} />
                </a>
              ) : (
                <span
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em]"
                  style={{ color: a.label === "var(--ink)" ? "var(--clay)" : "var(--paper)" }}
                >
                  View case
                  <ArrowUpRight size={12} />
                </span>
              )}
            </div>
          </div>

          {/* Corner index that scales on hover */}
          <div
            className="pointer-events-none absolute right-3 top-12 font-serif text-2xl leading-none text-paper/80 transition-transform duration-500 group-hover:scale-125"
            aria-hidden
          >
            {project.index}
          </div>
        </div>
      </Tilt>

      {/* Meta below */}
      <div className="mt-4">
        <div className="flex items-baseline justify-between">
          <h3 className="font-serif text-3xl leading-none tracking-tight text-ink">
            {project.title}
          </h3>
          <ArrowUpRight
            size={18}
            className="text-ink/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-rust"
          />
        </div>
        <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-faded">
          {project.role}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-ink/80 text-pretty">
          {project.summary}
        </p>

        {/* Highlights */}
        <ul className="mt-4 space-y-1.5">
          {project.highlights.map((h) => (
            <li
              key={h}
              className="flex items-start gap-2 text-[13px] leading-snug text-ink/70"
            >
              <span
                className="mt-1.5 inline-block h-1 w-1 shrink-0"
                style={{ background: a.label }}
              />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {/* Medium tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.medium.map((m) => (
            <span
              key={m}
              className="border border-ink/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink/70"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function EndCard({ mobile = false }: { mobile?: boolean }) {
  const width = mobile ? "w-full" : "w-[300px]";
  return (
    <a
      href={`mailto:${profile.email}`}
      data-cursor="link"
      data-cursor-label="Mail"
      className={`${width} group flex aspect-[4/5] flex-col justify-between bg-ink p-6 text-paper`}
    >
      <div>
        <Asterisk size={20} className="text-rust" />
        <p className="mt-6 font-serif text-3xl leading-tight">
          Got a backend<br />
          <span className="display-italic text-clay">that has to stay up</span>?
        </p>
      </div>
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-paper/60">
          Start a conversation
        </div>
        <div className="mt-2 inline-flex items-center gap-2 border-b border-paper pb-1 font-mono text-sm text-paper">
          {profile.email}
          <ArrowUpRight size={14} className="text-rust transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </a>
  );
}

export function SectionHeader({
  num,
  title,
  kicker,
}: {
  num: string;
  title: string;
  kicker?: string;
}) {
  return (
    <Reveal className="border-t border-ink pt-5">
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex items-baseline gap-3 sm:gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-rust">{num}</span>
          <h2 className="font-serif text-3xl leading-none tracking-tight text-ink sm:text-4xl md:text-6xl">
            {title}
          </h2>
        </div>
        {kicker && (
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-faded text-right sm:text-[10px] md:text-[11px]">
            {kicker}
          </span>
        )}
      </div>
    </Reveal>
  );
}
