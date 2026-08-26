"use client";

import * as React from "react";
import { skillProficiencies } from "@/data/resume";
import { Reveal } from "./primitives";
import { SectionHeader } from "./selected-work";
import { Asterisk } from "./icons";
import { SectionProgress } from "./section-progress";

export function SkillProficiency() {
  const [active, setActive] = React.useState<number>(0);
  const activeSkill = skillProficiencies[active];

  return (
    <section id="capabilities" className="relative px-5 pt-24 md:px-8 md:pt-36">
      <SectionProgress />
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader num="05" title="Capabilities" kicker="Depth, charted" />

        <div className="mt-10 grid grid-cols-12 gap-6 md:mt-14">
          {/* Left: Radar chart */}
          <div className="col-span-12 md:col-span-5">
            <Reveal>
              <div className="border border-ink bg-paper-2/30 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div className="label text-faded">Radar · All skills</div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-faded">
                    Hover to inspect
                  </div>
                </div>
                <RadarChart
                  skills={skillProficiencies}
                  active={active}
                  onSelect={setActive}
                />
              </div>
            </Reveal>
          </div>

          {/* Right: Bar meters + detail */}
          <div className="col-span-12 md:col-span-7">
            <Reveal delay={100}>
              {/* Bar meters */}
              <div className="border border-ink bg-paper-2/30">
                {skillProficiencies.map((s, i) => (
                  <BarMeter
                    key={s.skill}
                    skill={s}
                    index={i}
                    active={active === i}
                    onSelect={() => setActive(i)}
                  />
                ))}
              </div>

              {/* Detail panel */}
              <div className="mt-4 border border-ink bg-paper p-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-2xl leading-tight tracking-tight text-ink md:text-3xl">
                    {activeSkill.skill}
                  </h3>
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-4xl leading-none text-rust tabular-nums md:text-5xl">
                      {activeSkill.level}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-faded">
                      / 100
                    </span>
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.12em] text-faded">
                  <span>{activeSkill.years} years</span>
                  <span className="text-ink/30">·</span>
                  <span>
                    {activeSkill.level >= 85
                      ? "Deep"
                      : activeSkill.level >= 75
                      ? "Strong"
                      : "Working"}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-ink/80 text-pretty">
                  {activeSkill.detail}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {activeSkill.tags.map((t) => (
                    <span
                      key={t}
                      className="border border-ink/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function RadarChart({
  skills,
  active,
  onSelect,
}: {
  skills: typeof skillProficiencies;
  active: number;
  onSelect: (i: number) => void;
}) {
  const size = 320;
  const center = size / 2;
  const maxRadius = 120;
  const numAxes = skills.length;

  // Compute polygon points for the data shape
  const dataPoints = skills.map((s, i) => {
    const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
    const r = (s.level / 100) * maxRadius;
    return {
      x: center + Math.cos(angle) * r,
      y: center + Math.sin(angle) * r,
      angle,
    };
  });

  const dataPath = dataPoints
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ") + " Z";

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="mx-auto block w-full max-w-[340px]"
      role="img"
      aria-label="Skill proficiency radar chart"
    >
      {/* Concentric grid — 4 rings at 25/50/75/100 */}
      {[0.25, 0.5, 0.75, 1].map((ring) => {
        const r = maxRadius * ring;
        const pts = Array.from({ length: numAxes }).map((_, i) => {
          const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
          return `${center + Math.cos(angle) * r},${center + Math.sin(angle) * r}`;
        }).join(" ");
        return (
          <polygon
            key={ring}
            points={pts}
            fill="none"
            stroke="var(--ink)"
            strokeOpacity={ring === 1 ? 0.3 : 0.12}
            strokeWidth={0.5}
          />
        );
      })}

      {/* Axis lines */}
      {skills.map((_, i) => {
        const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
        const x2 = center + Math.cos(angle) * maxRadius;
        const y2 = center + Math.sin(angle) * maxRadius;
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={x2}
            y2={y2}
            stroke="var(--ink)"
            strokeOpacity={0.1}
            strokeWidth={0.5}
          />
        );
      })}

      {/* Data shape */}
      <path
        d={dataPath}
        fill="var(--rust)"
        fillOpacity={0.12}
        stroke="var(--rust)"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />

      {/* Data points + labels */}
      {skills.map((s, i) => {
        const p = dataPoints[i];
        const labelAngle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
        const labelR = maxRadius + 24;
        const lx = center + Math.cos(labelAngle) * labelR;
        const ly = center + Math.sin(labelAngle) * labelR;
        const isActive = active === i;
        return (
          <g
            key={s.skill}
            style={{ cursor: "pointer" }}
            onMouseEnter={() => onSelect(i)}
          >
            {/* Invisible hit area */}
            <circle cx={p.x} cy={p.y} r={14} fill="transparent" />
            {/* Visible point */}
            <circle
              cx={p.x}
              cy={p.y}
              r={isActive ? 5 : 3}
              fill={isActive ? "var(--rust)" : "var(--ink)"}
              stroke="var(--paper)"
              strokeWidth={1.5}
            />
            {/* Label */}
            <text
              x={lx}
              y={ly}
              textAnchor={Math.abs(Math.cos(labelAngle)) < 0.3 ? "middle" : Math.cos(labelAngle) > 0 ? "start" : "end"}
              dominantBaseline="middle"
              fontFamily="ui-monospace, monospace"
              fontSize="8"
              letterSpacing="0.5"
              fill={isActive ? "var(--rust)" : "var(--ink)"}
              fillOpacity={isActive ? 1 : 0.65}
              style={{ textTransform: "uppercase" }}
            >
              {s.skill.split(" ")[0]}
            </text>
          </g>
        );
      })}

      {/* Center dot */}
      <circle cx={center} cy={center} r={2} fill="var(--ink)" />

      {/* Scale labels */}
      {[25, 50, 75].map((scale) => {
        const r = (scale / 100) * maxRadius;
        return (
          <text
            key={scale}
            x={center + 3}
            y={center - r + 3}
            fontFamily="ui-monospace, monospace"
            fontSize="7"
            fill="var(--ink)"
            fillOpacity={0.4}
          >
            {scale}
          </text>
        );
      })}
    </svg>
  );
}

function BarMeter({
  skill,
  index,
  active,
  onSelect,
}: {
  skill: (typeof skillProficiencies)[number];
  index: number;
  active: boolean;
  onSelect: () => void;
}) {
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    const el = document.getElementById(`bar-fill-${index}`);
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setWidth(skill.level);
          io.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [skill.level, index]);

  return (
    <button
      type="button"
      id={`bar-fill-${index}`}
      onMouseEnter={onSelect}
      onClick={onSelect}
      data-cursor="link"
      data-cursor-label=""
      className={`group block w-full border-b border-ink/15 px-4 py-3.5 text-left transition-colors last:border-b-0 ${
        active ? "bg-paper" : "hover:bg-paper/50"
      }`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-faded">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-serif text-base leading-tight text-ink md:text-lg">
            {skill.skill}
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-faded">
            {skill.years}y
          </span>
          <span className="font-serif text-lg leading-none text-ink tabular-nums">
            {skill.level}
          </span>
        </div>
      </div>

      {/* Bar */}
      <div className="mt-2 h-1.5 w-full bg-paper-2">
        <div
          className="h-full transition-[width] duration-1000 ease-out"
          style={{
            width: `${width}%`,
            background: active ? "var(--rust)" : "var(--ink)",
          }}
        />
      </div>
    </button>
  );
}
