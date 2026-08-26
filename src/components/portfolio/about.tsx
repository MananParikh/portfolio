import * as React from "react";
import { profile } from "@/data/resume";
import { Reveal } from "./primitives";
import { SectionHeader } from "./selected-work";
import { Pin, Mail, Phone } from "./icons";
import { AnimatedStats } from "./animated-stats";
import { SectionProgress } from "./section-progress";

export function About() {
  return (
    <section id="about" className="relative px-5 pt-24 md:px-8 md:pt-36">
      <SectionProgress />
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader num="02" title="About" kicker="A short note" />

        <div className="mt-12 grid grid-cols-12 gap-4 md:mt-20">
          {/* Big bio */}
          <div className="col-span-12 md:col-span-8">
            <Reveal as="p" className="font-serif text-2xl leading-snug text-ink md:text-[2rem] md:leading-[1.25] text-balance">
              I&apos;m {profile.firstName} — an engineer who likes the parts of software most people skip past. The test suite. The cache invalidation strategy. The replication protocol that survives a node going down at 3 a.m. I&apos;ve spent the last two years writing production Java at Thomson Reuters and the two before that building distributed systems in C++ for coursework that I treated like <span className="display-italic text-rust">production</span>.
            </Reveal>

            <Reveal as="p" delay={80} className="mt-8 max-w-2xl text-base leading-relaxed text-ink/75 text-pretty">
              {profile.bioBody1}
            </Reveal>

            <Reveal as="p" delay={120} className="mt-6 max-w-2xl text-base leading-relaxed text-ink/75 text-pretty">
              {profile.bioBody2}
            </Reveal>
          </div>

          {/* Sidenotes */}
          <aside className="col-span-12 mt-8 md:col-span-4 md:mt-0">
            <Reveal className="border border-ink/20 bg-paper-2/40 p-5">
              <div className="label text-faded">Now</div>
              <p className="mt-2 font-serif text-lg leading-snug text-ink">
                {profile.now}
              </p>
            </Reveal>

            <Reveal delay={60} className="mt-3 border border-ink/20 p-5">
              <div className="label text-faded">Studied</div>
              <p className="mt-2 text-sm leading-relaxed text-ink/80">
                {profile.studied}
              </p>
            </Reveal>

            <Reveal delay={120} className="mt-3 border border-ink/20 p-5">
              <div className="label text-faded">Reach</div>
              <ul className="mt-2 space-y-2 text-sm text-ink/80">
                <li className="flex items-center gap-2">
                  <Pin size={13} className="text-rust" />
                  {profile.location}
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={13} className="text-rust" />
                  <a href={`mailto:${profile.email}`} className="link-underline">
                    {profile.email}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={13} className="text-rust" />
                  <a href={`tel:${profile.phone.replace(/[^\d+]/g, "")}`} className="link-underline">
                    {profile.phone}
                  </a>
                </li>
              </ul>
            </Reveal>
          </aside>
        </div>

        {/* Stats strip — animated count-up */}
        <AnimatedStats />
      </div>
    </section>
  );
}
