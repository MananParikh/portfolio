import * as React from "react";
import { profile, socials } from "@/data/resume";
import { Reveal, Marquee } from "./primitives";
import { ArrowUpRight, Asterisk, Mail, Bookmark, Grid, Github, Instagram, LinkedIn, Phone } from "./icons";
import { SectionProgress } from "./section-progress";

const socialIcon: Record<string, React.ReactNode> = {
  Email: <Mail size={16} />,
  LinkedIn: <LinkedIn size={16} />,
  GitHub: <Github size={16} />,
  Phone: <Phone size={16} />,
  "Read.cv": <Bookmark size={16} />,
  "Are.na": <Grid size={16} />,
  Instagram: <Instagram size={16} />,
};

export function Contact() {
  return (
    <section id="contact" className="relative px-5 pt-24 md:px-8 md:pt-36">
      <SectionProgress />
      <div className="mx-auto max-w-[1400px]">
        {/* Big marquee CTA */}
        <div className="border-y-2 border-ink py-6 md:py-8">
          <Marquee duration={28}>
            {["Let's talk", "Let's talk", "Let's talk", "Let's talk"].map((t, i) => (
              <span
                key={i}
                className="mx-6 inline-flex items-center gap-6 font-serif text-[clamp(3rem,12vw,9rem)] leading-none tracking-tight text-ink"
              >
                <span className={i % 2 === 0 ? "display-italic" : ""}>{t}</span>
                <Asterisk size={36} className="text-rust" />
              </span>
            ))}
          </Marquee>
        </div>

        {/* Big email link */}
        <div className="mt-12 grid grid-cols-12 gap-4 md:mt-20 md:gap-8">
          <div className="col-span-12 md:col-span-7 md:pr-4">
            <Reveal>
              <div className="label text-faded">Direct line</div>
              <a
                href={`mailto:${profile.email}`}
                data-cursor="link"
                data-cursor-label="Mail"
                className="group mt-4 block"
              >
                <span className="font-serif text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] tracking-tight text-ink transition-colors group-hover:text-rust break-all">
                  {profile.email}
                </span>
                <span className="mt-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-faded">
                  <ArrowUpRight
                    size={14}
                    className="text-rust transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                  Or just say hi
                </span>
              </a>
            </Reveal>
          </div>

          {/* Socials list */}
          <div className="col-span-12 mt-10 md:col-span-5 md:mt-0 md:pl-8 md:border-l md:border-ink/15">
            <Reveal>
              <div className="label text-faded">Elsewhere</div>
              <ul className="mt-4 border-t border-ink/15">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      data-cursor="link"
                      data-cursor-label="Open"
                      className="group flex items-center justify-between border-b border-ink/15 py-3.5"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="flex items-center gap-3 text-ink">
                        <span className="text-rust">{socialIcon[s.label] ?? <Bookmark size={16} />}</span>
                        <span className="font-mono text-[11px] uppercase tracking-[0.12em]">
                          {s.label}
                        </span>
                      </span>
                      <span className="flex items-center gap-2 text-sm text-ink/70 transition-colors group-hover:text-rust">
                        <span>{s.handle}</span>
                        <ArrowUpRight
                          size={14}
                          className="text-ink/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-rust"
                        />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/15 px-5 pb-10 pt-12 md:mt-36 md:px-8 md:pt-16">
      <div className="mx-auto max-w-[1400px]">
        {/* Top row */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-5">
            <div className="font-serif text-3xl tracking-tight text-ink md:text-4xl">
              {profile.firstName}{" "}
              <span className="display-italic">{profile.lastName}</span>
              <span className="text-rust">.</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-ink/70 text-pretty">
              Designed and built from scratch — no templates, no shortcuts.
              The colophon is below if you&apos;re into that kind of thing.
            </p>
            {/* Hand-drawn signature */}
            <svg
              viewBox="0 0 200 50"
              className="mt-4 h-10 w-40 text-rust"
              role="img"
              aria-label="Manan Parikh signature"
            >
              <path
                d="M8 38 Q 12 12, 22 28 Q 26 36, 32 22 Q 36 14, 42 30 Q 48 40, 56 24 Q 62 12, 70 32 Q 76 42, 84 22 Q 88 14, 96 28 L 102 22 M 112 36 Q 118 12, 128 26 Q 132 32, 138 22 M 148 30 Q 154 14, 164 26 Q 168 32, 174 22 L 184 28"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M70 38 q 14 -4 28 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.6"
              />
            </svg>
          </div>

          <div className="col-span-6 md:col-span-2">
            <div className="label text-faded">Sitemap</div>
            <ul className="mt-3 space-y-1.5 text-sm text-ink/80">
              <li><a href="#top" className="link-underline">Index</a></li>
              <li><a href="#work" className="link-underline">Work</a></li>
              <li><a href="#about" className="link-underline">About</a></li>
              <li><a href="#experience" className="link-underline">Experience</a></li>
              <li><a href="#contact" className="link-underline">Contact</a></li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2">
            <div className="label text-faded">Elsewhere</div>
            <ul className="mt-3 space-y-1.5 text-sm text-ink/80">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="link-underline">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 md:col-span-3">
            <div className="label text-faded">Colophon</div>
            <p className="mt-3 text-xs leading-relaxed text-ink/70">
              Set in <span className="display-italic">Fraunces</span>, Space Grotesk,
              and JetBrains Mono. Hand-built with Next.js, TypeScript, and Tailwind CSS.
              No icon libraries, no stock photos, no AI gradients.
              Paper texture baked into the canvas.
            </p>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-ink/15 pt-5 font-mono text-[10px] uppercase tracking-[0.12em] text-faded md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-rust" />
            {profile.availability}
          </div>
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} {profile.name}</span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline">v3.0.2 — last edited 04 / 2024</span>
          </div>
          <a
            href="#top"
            className="link-underline"
            data-cursor="link"
            data-cursor-label="Top"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
