"use client";

import * as React from "react";
import {
  contributionWeeks,
  contributionStats,
  type ContributionWeek,
} from "@/data/resume";
import { Reveal } from "./primitives";
import { SectionHeader } from "./selected-work";
import { Asterisk } from "./icons";
import { SectionProgress } from "./section-progress";

const intensityColors = [
  "var(--paper-2)",     // 0 — empty
  "var(--clay)",        // 1 — light
  "var(--moss)",        // 2 — moderate (will be overridden below)
  "var(--rust)",        // 3 — heavy
  "var(--ink)",         // 4 — peak
];

// Refined palette — stays on-paper, ramps from paper → clay → rust
const intensityFills = [
  "var(--paper-2)",
  "rgba(200, 184, 158, 0.55)",  // clay light
  "rgba(200, 184, 158, 0.95)",  // clay full
  "rgba(210, 74, 28, 0.7)",     // rust medium
  "var(--rust)",                // rust full
];

const monthLabels = [
  "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov",
  "Dec", "Jan", "Feb", "Mar",
];

const dayLabels = ["M", "W", "F"];

export function ContributionGraph() {
  const [hovered, setHovered] = React.useState<{
    week: number;
    day: number;
    level: number;
  } | null>(null);

  const totalDays = contributionWeeks.length * 7;
  const activeDays = contributionWeeks.reduce(
    (sum, w) => sum + w.days.filter((d) => d > 0).length,
    0
  );

  return (
    <section id="activity" className="relative px-5 pt-24 md:px-8 md:pt-36">
      <SectionProgress />
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader num="04" title="Activity" kicker="Last 52 weeks · Representative" />

        <div className="mt-10 grid grid-cols-12 gap-6 md:mt-14">
          {/* Graph */}
          <div className="col-span-12 md:col-span-8">
            <Reveal>
              <div className="border border-ink bg-paper-2/30 p-4 md:p-6">
                {/* Header row */}
                <div className="mb-4 flex items-baseline justify-between">
                  <div className="label text-faded">
                    {contributionStats.total} contributions in the last year
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-faded">
                    Commits · PRs · Issues
                  </div>
                </div>

                {/* The grid — scrollable on mobile */}
                <div className="overflow-x-auto no-scrollbar">
                  <div className="min-w-[680px]">
                    {/* Month labels row */}
                    <div className="mb-1 flex pl-6">
                      {monthLabels.map((m, i) => (
                        <div
                          key={m}
                          className="flex-1 font-mono text-[9px] uppercase tracking-[0.12em] text-faded"
                          style={{ minWidth: 0 }}
                        >
                          {i % 1 === 0 ? m : ""}
                        </div>
                      ))}
                    </div>

                    {/* Grid body — day labels + cells */}
                    <div className="flex gap-1.5">
                      {/* Day labels */}
                      <div className="flex flex-col gap-[3px] pr-1">
                        {Array.from({ length: 7 }).map((_, dayIdx) => (
                          <div
                            key={dayIdx}
                            className="flex h-[10px] items-center font-mono text-[8px] uppercase tracking-[0.1em] text-faded/60"
                            style={{ height: 10, lineHeight: "10px" }}
                          >
                            {dayIdx % 2 === 1 ? dayLabels[Math.floor(dayIdx / 2)] : ""}
                          </div>
                        ))}
                      </div>

                      {/* Weeks */}
                      <div className="flex gap-[3px]">
                        {contributionWeeks.map((week: ContributionWeek, weekIdx) => (
                          <div key={weekIdx} className="flex flex-col gap-[3px]">
                            {week.days.map((level, dayIdx) => (
                              <button
                                key={dayIdx}
                                type="button"
                                onMouseEnter={() => setHovered({ week: weekIdx, day: dayIdx, level })}
                                onMouseLeave={() => setHovered(null)}
                                data-cursor="link"
                                data-cursor-label=""
                                className="transition-transform duration-150 hover:scale-150 hover:z-10 hover:ring-1 hover:ring-ink"
                                style={{
                                  width: 10,
                                  height: 10,
                                  background: intensityFills[level],
                                  border: level === 0 ? "1px solid var(--ink)" : "none",
                                  borderColor: level === 0 ? "var(--ink)" : undefined,
                                  borderWidth: level === 0 ? 0.5 : 0,
                                  borderStyle: "solid",
                                  opacity: level === 0 ? 0.25 : 1,
                                  transformOrigin: "center",
                                }}
                                aria-label={`Week ${weekIdx + 1}, day ${dayIdx + 1}, level ${level}`}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="mt-4 flex items-center justify-between border-t border-ink/15 pt-3">
                      <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-faded">
                        {hovered ? (
                          <span>
                            Week {hovered.week + 1}, day {hovered.day + 1} —{" "}
                            <span className="text-rust">
                              {hovered.level === 0 ? "no activity" : `level ${hovered.level}/4`}
                            </span>
                          </span>
                        ) : (
                          <span>Hover any cell to inspect</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-faded">
                          Less
                        </span>
                        {intensityFills.map((fill, i) => (
                          <span
                            key={i}
                            className="inline-block"
                            style={{
                              width: 10,
                              height: 10,
                              background: fill,
                              border: i === 0 ? "0.5px solid var(--ink)" : "none",
                              opacity: i === 0 ? 0.25 : 1,
                            }}
                          />
                        ))}
                        <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-faded">
                          More
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Stats sidebar */}
          <div className="col-span-12 md:col-span-4">
            <Reveal delay={100}>
              <div className="grid grid-cols-2 gap-3">
                <StatCard label="Total contributions" value={contributionStats.total.toString()} />
                <StatCard label="Current streak" value={`${contributionStats.streak} days`} />
                <StatCard label="Best day" value={`${contributionStats.bestDay} commits`} />
                <StatCard label="Longest streak" value={`${contributionStats.longestStreak} days`} />
              </div>

              <div className="mt-3 border border-ink/20 bg-paper-2/40 p-5">
                <div className="flex items-center gap-2">
                  <Asterisk size={14} className="text-rust" />
                  <div className="label text-faded">Reading the graph</div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink/75 text-pretty">
                  The peak weeks (autumn 2025) were the distributed systems course
                  and the Stock Bazaar build. The lighter stretch in the middle was
                  ML coursework — fewer commits, more notebooks.
                </p>
                <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-faded">
                  {activeDays} active days · {totalDays} total ·{" "}
                  {Math.round((activeDays / totalDays) * 100)}% coverage
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-ink p-4">
      <div className="font-serif text-2xl leading-none text-ink tabular-nums md:text-3xl">
        {value}
      </div>
      <div className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-faded">
        {label}
      </div>
    </div>
  );
}
