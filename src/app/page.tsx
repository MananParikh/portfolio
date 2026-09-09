"use client";

import { CustomCursor } from "@/components/portfolio/custom-cursor";
import { ScrollProgress, ActiveSectionTracker } from "@/components/portfolio/scroll-progress";
import { Header } from "@/components/portfolio/header";
import { Hero } from "@/components/portfolio/hero";
import { SelectedWork } from "@/components/portfolio/selected-work";
import { About } from "@/components/portfolio/about";
import { CodeShowcase } from "@/components/portfolio/code-showcase";
import { ArchitectureDiagram } from "@/components/portfolio/architecture-diagram";
import { ContributionGraph } from "@/components/portfolio/contribution-graph";
import { SkillProficiency } from "@/components/portfolio/skill-proficiency";
import { Experience, Recognition } from "@/components/portfolio/sections";
import { Contact, Footer } from "@/components/portfolio/contact-footer";

const sectionIds = [
  "top",
  "work",
  "about",
  "architecture",
  "activity",
  "capabilities",
  "experience",
  "recognition",
  "contact",
];

export default function Home() {
  return (
    <ActiveSectionTracker ids={sectionIds}>
      <div className="relative flex min-h-screen flex-col">
        <ScrollProgress />
        <CustomCursor />
        <Header />
        <main className="flex-1">
          <Hero />
          <SelectedWork />
          <About />
          <CodeShowcase />
          <ArchitectureDiagram />
          {/* <ContributionGraph /> */}
          {/* <SkillProficiency /> */}
          <Experience />
          <Recognition />
          <Contact />
        </main>
        <Footer />
      </div>
    </ActiveSectionTracker>
  );
}
