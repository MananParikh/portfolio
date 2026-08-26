"use client";

import * as React from "react";
import { archNodes, archEdges, type ArchNode } from "@/data/resume";
import { Reveal } from "./primitives";
import { SectionHeader } from "./selected-work";
import { Asterisk } from "./icons";
import { SectionProgress } from "./section-progress";

const kindStyles: Record<
  ArchNode["kind"],
  { fill: string; stroke: string; text: string; accent: string }
> = {
  client: { fill: "var(--paper-2)", stroke: "var(--ink)", text: "var(--ink)", accent: "var(--faded)" },
  frontend: { fill: "var(--ink)", stroke: "var(--ink)", text: "var(--paper)", accent: "var(--clay)" },
  service: { fill: "var(--paper-2)", stroke: "var(--ink)", text: "var(--ink)", accent: "var(--moss)" },
  leader: { fill: "var(--rust)", stroke: "var(--rust)", text: "var(--paper)", accent: "var(--paper)" },
  replica: { fill: "var(--paper)", stroke: "var(--ink)", text: "var(--ink)", accent: "var(--moss)" },
  cache: { fill: "var(--moss)", stroke: "var(--moss)", text: "var(--paper)", accent: "var(--paper)" },
  store: { fill: "var(--paper-2)", stroke: "var(--ink)", text: "var(--ink)", accent: "var(--faded)" },
};

const NODE_W = 130;
const NODE_H = 56;

export function ArchitectureDiagram() {
  const [selected, setSelected] = React.useState<string>("frontend");
  const [hovered, setHovered] = React.useState<string | null>(null);

  const selectedNode = archNodes.find((n) => n.id === selected) || archNodes[0];
  const activeEdges = React.useMemo(() => {
    const focus = hovered || selected;
    return new Set(
      archEdges
        .filter((e) => e.from === focus || e.to === focus)
        .map((e) => `${e.from}-${e.to}`)
    );
  }, [hovered, selected]);

  return (
    <section id="architecture" className="relative px-5 pt-24 md:px-8 md:pt-36">
      <SectionProgress />
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader num="03" title="Architecture" kicker="Stock Bazaar · Interactive" />

        <div className="mt-10 grid grid-cols-12 gap-6 md:mt-14">
          {/* Diagram */}
          <div className="col-span-12 md:col-span-8">
            <Reveal>
              <div className="border border-ink bg-paper-2/30 p-4 md:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="label text-faded">System topology · click any node</div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-faded">
                    3 services · 2 replicas · 1 cache
                  </div>
                </div>

                <div className="relative">
                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="absolute inset-0 h-full w-full"
                    aria-hidden
                  >
                    {/* Edges */}
                    {archEdges.map((edge) => {
                      const from = archNodes.find((n) => n.id === edge.from)!;
                      const to = archNodes.find((n) => n.id === edge.to)!;
                      const key = `${edge.from}-${edge.to}`;
                      const isActive = activeEdges.has(key);
                      return (
                        <g key={key}>
                          <line
                            x1={from.x}
                            y1={from.y}
                            x2={to.x}
                            y2={to.y}
                            stroke={isActive ? "var(--rust)" : "var(--ink)"}
                            strokeOpacity={isActive ? 0.9 : 0.18}
                            strokeWidth={isActive ? 0.4 : 0.2}
                            strokeDasharray={edge.animated ? "0.8 0.8" : "0.4 1.2"}
                          >
                            {isActive && edge.animated && (
                              <animate
                                attributeName="stroke-dashoffset"
                                from="0"
                                to="-3.2"
                                dur="0.8s"
                                repeatCount="indefinite"
                              />
                            )}
                          </line>
                          {/* Edge label */}
                          <text
                            x={(from.x + to.x) / 2}
                            y={(from.y + to.y) / 2 - 0.5}
                            textAnchor="middle"
                            fontFamily="ui-monospace, monospace"
                            fontSize="1.4"
                            fill={isActive ? "var(--rust)" : "var(--ink)"}
                            fillOpacity={isActive ? 1 : 0.4}
                          >
                            {edge.label}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Nodes (HTML overlaid on SVG) */}
                  <div className="relative" style={{ height: "min(60vh, 540px)" }}>
                    {archNodes.map((node) => {
                      const isSelected = selected === node.id;
                      const isHovered = hovered === node.id;
                      const s = kindStyles[node.kind];
                      return (
                        <button
                          key={node.id}
                          type="button"
                          onClick={() => setSelected(node.id)}
                          onMouseEnter={() => setHovered(node.id)}
                          onMouseLeave={() => setHovered(null)}
                          data-cursor="link"
                          data-cursor-label="Inspect"
                          className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-105"
                          style={{
                            left: `${node.x}%`,
                            top: `${node.y}%`,
                            width: NODE_W,
                            height: NODE_H,
                            background: s.fill,
                            border: `1.5px solid ${s.stroke}`,
                            color: s.text,
                            boxShadow: isSelected
                              ? `4px 4px 0 0 var(--rust)`
                              : `3px 3px 0 0 ${s.stroke}`,
                            transform: `translate(-50%, -50%) scale(${isSelected ? 1.05 : isHovered ? 1.03 : 1})`,
                            zIndex: isSelected ? 10 : isHovered ? 5 : 1,
                          }}
                        >
                          <div className="flex h-full flex-col justify-center px-2.5 text-left">
                            <div className="font-serif text-[13px] leading-tight">
                              {node.label}
                            </div>
                            <div
                              className="font-mono text-[8px] uppercase tracking-[0.1em] leading-tight mt-0.5"
                              style={{ color: s.accent, opacity: 0.85 }}
                            >
                              {node.sublabel}
                            </div>
                          </div>
                          {/* Metric badge */}
                          {node.metric && (
                            <div
                              className="absolute -top-2 -right-2 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.08em]"
                              style={{
                                background: "var(--paper)",
                                border: `1px solid ${s.stroke}`,
                                color: "var(--rust)",
                              }}
                            >
                              {node.metric}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-ink/15 pt-3">
                  {([
                    ["leader", "Leader"],
                    ["replica", "Replica"],
                    ["cache", "Cache"],
                    ["frontend", "Gateway"],
                    ["service", "Service"],
                    ["client", "Client"],
                  ] as const).map(([kind, label]) => (
                    <div key={kind} className="flex items-center gap-1.5">
                      <span
                        className="inline-block h-2.5 w-2.5"
                        style={{
                          background: kindStyles[kind].fill,
                          border: `1px solid ${kindStyles[kind].stroke}`,
                        }}
                      />
                      <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-faded">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Side panel — node detail */}
          <div className="col-span-12 md:col-span-4">
            <Reveal delay={100}>
              <div className="sticky top-24 border border-ink bg-paper p-5">
                <div className="flex items-center gap-2">
                  <Asterisk size={14} className="text-rust" />
                  <div className="label text-faded">Inspector</div>
                </div>

                <h3 className="mt-4 font-serif text-2xl leading-tight tracking-tight text-ink">
                  {selectedNode.label}
                </h3>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-faded">
                  {selectedNode.role}
                </div>

                {/* Metric */}
                {selectedNode.metric && (
                  <div className="mt-4 inline-block border border-rust bg-rust/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-rust">
                    {selectedNode.metric}
                  </div>
                )}

                {/* Detail */}
                <p className="mt-4 text-sm leading-relaxed text-ink/80 text-pretty">
                  {selectedNode.detail}
                </p>

                {/* Tech tags */}
                <div className="mt-5">
                  <div className="label text-faded">Tech</div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {selectedNode.tech.map((t) => (
                      <span
                        key={t}
                        className="border border-ink/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Connections */}
                <div className="mt-5 border-t border-ink/15 pt-3">
                  <div className="label text-faded">Connections</div>
                  <ul className="mt-2 space-y-1.5">
                    {archEdges
                      .filter((e) => e.from === selectedNode.id || e.to === selectedNode.id)
                      .map((e) => {
                        const other = e.from === selectedNode.id ? e.to : e.from;
                        const otherNode = archNodes.find((n) => n.id === other)!;
                        return (
                          <li
                            key={`${e.from}-${e.to}`}
                            className="flex items-baseline justify-between gap-2 text-[12px]"
                          >
                            <span className="font-mono text-faded uppercase tracking-[0.08em]">
                              {e.label}
                            </span>
                            <span className="font-serif italic text-ink/80">
                              {otherNode.label}
                            </span>
                          </li>
                        );
                      })}
                  </ul>
                </div>

                <p className="mt-5 border-t border-ink/15 pt-3 font-mono text-[9px] uppercase tracking-[0.12em] text-faded">
                  Click any node in the diagram to inspect it
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
