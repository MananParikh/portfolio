"use client";

import * as React from "react";
import { experience, capabilities, awards, profile } from "@/data/resume";
import { Reveal } from "./primitives";
import { SectionHeader } from "./selected-work";
import { Asterisk } from "./icons";
import { SectionProgress } from "./section-progress";

export function Experience() {
  return (
    <section id="experience" className="relative px-5 pt-24 md:px-8 md:pt-36">
      <SectionProgress />
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader num="06" title="Experience" kicker="A short timeline" />

        <ol className="mt-12 md:mt-16">
          {experience.map((item, i) => (
            <Reveal as="li" key={`${item.company}-${i}`} delay={i * 60} className="group grid grid-cols-12 items-baseline gap-4 border-t border-ink/15 py-6 transition-colors hover:bg-paper-2/40 md:py-8">
              {/* Period */}
              <div className="col-span-12 font-mono text-[11px] uppercase tracking-[0.12em] text-ink/60 md:col-span-2">
                {item.period}
              </div>

              {/* Role + company */}
              <div className="col-span-12 md:col-span-5">
                <h3 className="font-serif text-2xl leading-tight tracking-tight text-ink md:text-3xl">
                  {item.role}
                </h3>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-faded">
                  {item.company} · {item.location}
                </div>
              </div>

              {/* Note */}
              <div className="col-span-12 md:col-span-5">
                <p className="text-sm leading-relaxed text-ink/75 text-pretty">
                  {item.note}
                </p>
              </div>

              {/* Index */}
              <div className="pointer-events-none absolute right-0 -translate-y-2 font-serif text-[10px] text-ink/20 md:block" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </div>
            </Reveal>
          ))}
        </ol>
        <div className="border-t border-ink/15" />
      </div>
    </section>
  );
}

export function Capabilities() {
  return (
    <section id="capabilities" className="relative px-5 pt-24 md:px-8 md:pt-36">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader num="04" title="Capabilities" kicker="What I do, roughly" />

        <div className="mt-12 border-t border-ink/15 md:mt-16">
          {capabilities.map((cap, i) => (
            <Reveal key={cap.title} delay={i * 50}>
              <CapabilitiesRow index={i} cap={cap} />
            </Reveal>
          ))}
        </div>
        <div className="border-t border-ink/15" />

        {/* Tools strip */}
        <Reveal className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-6">
          {[
            "Figma",
            "React",
            "TypeScript",
            "WebGL / GLSL",
            "Framer Motion",
            "Linear",
            "Cursor",
            "Notion",
            "Are.na",
            "iA Writer",
            "Rive",
            "After Effects",
          ].map((t) => (
            <div
              key={t}
              className="border border-ink/20 px-3 py-2 text-center font-mono text-[11px] uppercase tracking-[0.08em] text-ink/70"
            >
              {t}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function CapabilitiesRow({
  cap,
  index,
}: {
  cap: (typeof capabilities)[number];
  index: number;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="group border-b border-ink/15">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-6 text-left md:py-8"
        aria-expanded={open}
      >
        <div className="flex items-baseline gap-4 md:gap-8">
          <span className="label text-faded">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="font-serif text-3xl leading-none tracking-tight text-ink md:text-5xl">
            {cap.title}
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`label transition-opacity ${
              open ? "text-rust opacity-100" : "text-faded opacity-60"
            }`}
          >
            {open ? "Close" : "Open"}
          </span>
          <Asterisk
            size={18}
            className={`text-rust transition-transform duration-500 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>
      <div
        className="grid transition-all duration-500 ease-out"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          <div className="grid grid-cols-12 gap-4 pb-8">
            <p className="col-span-12 max-w-2xl text-base leading-relaxed text-ink/80 text-pretty md:col-span-7">
              {cap.detail}
            </p>
            <div className="col-span-12 flex flex-wrap content-start gap-1.5 md:col-span-5">
              {cap.tags.map((t) => (
                <span
                  key={t}
                  className="border border-ink/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Recognition() {
  return (
    <section id="recognition" className="relative px-5 pt-24 md:px-8 md:pt-36">
      <SectionProgress />
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader num="07" title="Recognition" kicker="Press & awards" />

        <ul className="mt-12 md:mt-16">
          {awards.map((a, i) => (
            <Reveal as="li" key={`${a.year}-${a.name}`} delay={i * 50} className="grid grid-cols-12 items-baseline gap-4 border-t border-ink/15 py-5 md:py-6">
              <div className="col-span-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink/60 md:col-span-2">
                {a.year}
              </div>
              <div className="col-span-9 md:col-span-7">
                <h3 className="font-serif text-lg leading-tight text-ink md:text-xl">
                  {a.name}
                </h3>
              </div>
              <div className="col-span-12 text-sm text-ink/60 md:col-span-3 md:text-right">
                <span className="display-italic">{a.outlet}</span>
              </div>
            </Reveal>
          ))}
        </ul>
        <div className="border-t border-ink/15" />

        {/* Pull quote */}
        <Reveal className="mt-16 border-y-2 border-ink py-12 md:mt-24 md:py-16">
          <blockquote className="mx-auto max-w-4xl text-center">
            <Asterisk size={22} className="mx-auto text-rust" />
            <p className="mt-6 font-serif text-3xl leading-snug text-ink md:text-5xl text-balance">
              &ldquo;{profile.pullQuote}&rdquo;
            </p>
            <footer className="mt-6 label text-faded">
              {profile.pullQuoteAttribution}
            </footer>
          </blockquote>
        </Reveal>

        {/* Closing line + email */}
        <Reveal className="mt-16 flex flex-col items-start justify-between gap-6 md:mt-24 md:flex-row md:items-end">
          <div>
            <div className="label text-faded">{profile.recognitionCta.label}</div>
            <p className="mt-3 max-w-xl font-serif text-2xl leading-snug text-ink md:text-3xl text-balance">
              {profile.recognitionCta.body}
            </p>
          </div>
          <a
            href={`mailto:${profile.email}?subject=One-pager%20please`}
            data-cursor="link"
            data-cursor-label="Mail"
            className="group inline-flex items-center gap-3 border border-ink px-6 py-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            {profile.recognitionCta.button}
            <Asterisk size={14} className="text-rust transition-transform duration-500 group-hover:rotate-180" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
