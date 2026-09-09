"use client";

import * as React from "react";
import { profile, MS_GPA } from "@/data/resume";
import { Marquee, Magnetic } from "./primitives";
import { Asterisk, ArrowDown, ArrowUpRight } from "./icons";
import { CodeTerminal } from "./code-terminal";

export function Hero() {
  const now = useNowLabel();

  return (
    <section id="top" className="relative px-5 pt-10 md:px-8 md:pt-16">
      <div className="mx-auto max-w-[1400px]">
        {/* Top metadata strip */}
        <div className="grid grid-cols-2 gap-4 border-b border-ink/15 pb-4 font-mono text-[10px] uppercase tracking-[0.12em] text-faded md:grid-cols-4">
          <div>
            <div className="text-ink/40">Index</div>
            <div className="mt-1 text-ink">00 / Portfolio</div>
          </div>
          <div>
            <div className="text-ink/40">Location</div>
            <div className="mt-1 text-ink">{profile.location}</div>
          </div>
          <div className="hidden md:block">
            <div className="text-ink/40">Time</div>
            <div className="mt-1 text-ink tabular-nums">{now}</div>
          </div>
          <div className="hidden md:block">
            <div className="text-ink/40">Status</div>
            <div className="mt-1 inline-flex items-center gap-1.5 text-ink">
              <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-rust" />
              {profile.availability}
            </div>
          </div>
        </div>

        {/* Hero block — full width, name stretches edge to edge */}
        <div className="relative pt-8 md:pt-14">
          {/* Top horizontal band — fills the space above the name */}
          <div className="flex items-center justify-between border-b border-ink/15 pb-3 font-mono text-[10px] uppercase tracking-[0.12em]">
            <div className="flex items-center gap-4">
              <Asterisk size={14} className="text-rust" />
              <span className="text-faded">Software Engineer</span>
              <span className="hidden text-ink/30 sm:inline">/</span>
              <span className="hidden text-faded sm:inline">Distributed Systems</span>
              <span className="hidden text-ink/30 md:inline">/</span>
              <span className="hidden text-faded md:inline">Full Stack</span>
            </div>
            {/* <div className="flex items-center gap-4"> */}
              {/* <span className="hidden text-faded sm:inline">v3.0</span> */}
              {/* <span className="hidden text-ink/30 sm:inline">/</span> */}
              {/* <span className="inline-flex items-center gap-1.5 text-ink"> */}
                {/* <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-rust" /> */}
                {/* Open to 2026 roles */}
              {/* </span> */}
            {/* </div> */}
          </div>

          {/* Creative masthead — solid + outline + staircase + vertical sidebar */}
          <div className="relative">
            {/* Decorative watermark asterisk — shows on ALL screens, fills negative space */}
            <svg
              aria-hidden
              className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 opacity-[0.05] sm:opacity-[0.06]"
              width="180"
              height="180"
              viewBox="0 0 100 100"
              style={{ maxWidth: "40vw", height: "auto" }}
            >
              <g stroke="var(--ink)" strokeWidth="1.2" strokeLinecap="round">
                <line x1="50" y1="10" x2="50" y2="90" />
                <line x1="15" y1="30" x2="85" y2="70" />
                <line x1="85" y1="30" x2="15" y2="70" />
                <line x1="10" y1="50" x2="90" y2="50" />
                <line x1="30" y1="15" x2="70" y2="85" />
                <line x1="70" y1="15" x2="30" y2="85" />
              </g>
            </svg>

            {/* Vertical rotated label on the far right — fills vertical space */}
            <div
              className="absolute right-0 top-0 bottom-0 hidden lg:flex items-start pt-2"
              aria-hidden
            >
              {/* <span className="vertical-text font-mono text-[10px] uppercase tracking-[0.4em] text-faded">
                Portfolio · Vol. 03 · 2026
              </span> */}
            </div>

            <h1 className="display-tight text-ink w-full pr-0 lg:pr-12">
              {/* Line 1: "Manan" solid + descriptor filling the right space */}
              <span className="flex items-end justify-between gap-4 border-b border-ink/12 pb-1">
                <span className="flex items-baseline gap-3 sm:gap-4">
                  <span className="font-mono text-[clamp(0.7rem,1.2vw,0.9rem)] uppercase tracking-[0.2em] text-rust">
                    01
                  </span>
                  <span className="text-[clamp(3.5rem,14vw,11rem)] leading-[0.86] whitespace-nowrap">
                    {profile.firstName}
                    <span className="text-rust">.</span>
                  </span>
                </span>
                <span
                  className="display-italic text-[clamp(1.15rem,2.8vw,2rem)] leading-[1.05] text-ink/70 text-right hidden sm:block max-w-[42%]"
                >
                  builds the parts of software
                  <br />
                  <span className="text-rust">that have to stay up</span>
                </span>
              </span>

              {/* Line 2: "Parikh" OUTLINE italic, staircase-indented + descriptor */}
              <span className="flex items-end justify-between gap-4">
                <span className="flex items-baseline gap-4 md:pl-[8%]">
                  <span className="display-italic outline-text text-[clamp(3.5rem,14vw,11rem)] leading-[0.86] whitespace-nowrap">
                    {profile.lastName}
                  </span>
                  <span className="display-tight text-rust text-[clamp(3.5rem,14vw,11rem)] leading-[0.86]">
                    /
                  </span>
                </span>
                {/* <span
                  className="font-mono text-[clamp(0.7rem,1.15vw,0.88rem)] uppercase tracking-[0.2em] leading-[1.8] text-faded text-right hidden sm:block"
                >
                  — engineer
                  <br />
                  <span className="text-ink/70">distributed</span>
                  <br />
                  <span className="text-ink/70">full-stack</span>
                  <br />
                </span> */}
              </span>
            </h1>

            {/* Mobile-only descriptor band — replaces the hidden right-side text on phones */}
            <div className="mt-3 flex items-center gap-3 border-t border-ink/12 pt-3 sm:hidden">
              <Asterisk size={14} className="shrink-0 text-rust" />
              <p className="display-italic text-base leading-snug text-ink/70">
                builds the parts of software{" "}
                <span className="text-rust">that have to stay up</span>
              </p>
            </div>

            {/* Mobile-only tag row — engineer / distributed / Amherst */}
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[9px] uppercase tracking-[0.16em] text-faded sm:hidden">
              <span className="text-ink/70">engineer</span>
              <span className="text-ink/30">/</span>
              <span className="text-ink/70">distributed</span>
              <span className="text-ink/30">/</span>
              <span className="text-ink/70">full-stack</span>
              {/* <span className="text-ink/30">/</span> */}
              {/* <span>Amherst → anywhere</span> */}
            </div>
          </div>

          {/* Credentials band directly under the name — fills the width */}
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-y border-ink/15 py-3 font-mono text-[10px] uppercase tracking-[0.12em]">
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
              <span className="text-faded">MS CS</span>
              <span className="text-ink">UMass Amherst</span>
              <span className="text-ink/30">·</span>
              <span className="text-faded">Prev</span>
              <span className="text-ink">Thomson Reuters</span>
              <span className="text-ink/30">·</span>
              <span className="text-faded">GPA</span>
              <span className="text-ink">{MS_GPA} / 4.0</span>
            </div>
            <div className="flex items-baseline gap-5">
              {/* <span className="text-faded">Based in</span> */}
              {/* <span className="text-ink">{profile.location}</span> */}
            </div>
          </div>

          {/* Two-column: pitch + typing terminal */}
          <div className="mt-8 grid grid-cols-12 gap-6 md:mt-12">
              <div className="col-span-12 md:col-span-6">
                <p className="font-serif text-xl leading-snug text-ink md:text-2xl text-balance">
                  {profile.pitch}
                </p>

                <p className="mt-6 text-sm text-ink/75 text-pretty">
                  {profile.currently}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Magnetic strength={6}>
                    <a
                      href="#work"
                      data-cursor="link"
                      data-cursor-label="Go"
                      className="group inline-flex items-center gap-2 bg-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-paper transition-colors hover:bg-rust"
                    >
                      See selected work
                      <ArrowDown size={14} className="transition-transform group-hover:translate-y-0.5" />
                    </a>
                  </Magnetic>
                  <Magnetic strength={6}>
                    <a
                      href={`mailto:${profile.email}`}
                      data-cursor="link"
                      data-cursor-label="Mail"
                      className="group inline-flex items-center gap-2 border border-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink transition-colors hover:bg-ink hover:text-paper"
                    >
                      Get in touch
                      <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </Magnetic>
                </div>

                {/* Mini stats inline */}
                <div className="mt-8 grid grid-cols-3 border-t border-ink/15">
                  {[
                    { v: "1M+", l: "records encrypted", icon: "lock" },
                    { v: "15+", l: "REST APIs shipped", icon: "api" },
                    { v: "94%", l: "ML accuracy", icon: "spark" },
                  ].map((s, i) => (
                    <div
                      key={s.v}
                      className={`py-3 ${i !== 0 ? "border-l border-ink/15 pl-3" : ""}`}
                    >
                      <div className="flex items-center gap-1.5">
                        <StatIcon kind={s.icon} />
                        <div className="font-serif text-2xl leading-none text-ink md:text-3xl">
                          {s.v}
                        </div>
                      </div>
                      <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-faded">
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typing terminal */}
              <div className="col-span-12 md:col-span-6">
                <div className="mb-3 flex items-center justify-between">
                  <div className="label text-faded">Live · From the replication layer</div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-faded">
                    Stock Bazaar · v2
                  </div>
                </div>
                <CodeTerminal />
                <p className="mt-3 font-mono text-[10px] text-ink/50 text-pretty">
                  An excerpt from the leader-based replication protocol I built for the
                  distributed trading system. The full impl is in the case study below.
                </p>
              </div>
          </div>
        </div>

        {/* Bottom marquee — keywords */}
        <div className="mt-14 border-y border-ink/15 py-3 md:mt-20">
          <Marquee duration={48} pauseOnHover>
            {profile.keywords.map((t, i) => (
              <span
                key={t}
                className="mx-6 inline-flex items-center gap-6 font-serif text-2xl text-ink md:text-3xl"
              >
                <span className={i % 2 === 0 ? "display-italic text-rust" : ""}>{t}</span>
                <Asterisk size={14} className="text-ink/40" />
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

function useNowLabel() {
  const [now, setNow] = React.useState("");
  React.useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      setNow(`${hh}:${mm} ${profile.timezone}`);
    };
    fmt();
    const id = setInterval(fmt, 30_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/**
 * Tiny inline SVG icons for the mini-stats. Hand-drawn, no library.
 */
function StatIcon({ kind }: { kind: string }) {
  const common = {
    width: 12,
    height: 12,
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "var(--rust)",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "shrink-0",
  };
  if (kind === "lock") {
    return (
      <svg {...common}>
        <rect x="3" y="7" width="10" height="7" rx="0.5" />
        <path d="M5 7V5a3 3 0 0 1 6 0v2" />
      </svg>
    );
  }
  if (kind === "api") {
    return (
      <svg {...common}>
        <path d="M2 8h12" />
        <path d="M5 5 2 8l3 3" />
        <path d="m11 5 3 3-3 3" />
      </svg>
    );
  }
  if (kind === "spark") {
    return (
      <svg {...common}>
        <path d="M8 2v4M8 10v4M2 8h4M10 8h4" />
        <path d="M4 4l2 2M10 10l2 2M12 4l-2 2M6 10l-2 2" opacity="0.6" />
      </svg>
    );
  }
  return null;
}
