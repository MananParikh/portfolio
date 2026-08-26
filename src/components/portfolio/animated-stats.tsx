"use client";

import * as React from "react";
import { stats } from "@/data/resume";
import { Reveal } from "./primitives";

/**
 * Stats strip with count-up animation when scrolled into view.
 * Parses numeric prefix from the stat value (e.g. "1M+", "94%").
 */
export function AnimatedStats() {
  return (
    <Reveal className="mt-16 grid grid-cols-2 border-y border-ink/15 md:mt-24 md:grid-cols-4">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`border-ink/15 px-4 py-6 ${
            i !== 0 ? "border-l" : ""
          } ${i === 2 ? "border-l-0 md:border-l" : ""}`}
        >
          <StatValue value={s.value} index={i} />
          <div className="mt-2 label text-faded">{s.label}</div>
        </div>
      ))}
    </Reveal>
  );
}

function StatValue({ value, index }: { value: string; index: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [display, setDisplay] = React.useState(value);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Parse the leading number out of the value
    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) return;
    const target = parseFloat(match[1]);
    const suffix = match[2] || "";
    const hasDecimal = match[1].includes(".");

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const duration = 1100;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - p, 3);
            const v = target * eased;
            setDisplay(
              (hasDecimal ? v.toFixed(0) : Math.floor(v).toString()) + suffix
            );
            if (p < 1) requestAnimationFrame(tick);
            else setDisplay(value);
          };
          requestAnimationFrame(tick);
          io.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <div
      ref={ref}
      className="font-serif text-5xl leading-none tracking-tight text-ink md:text-6xl tabular-nums"
    >
      {display}
    </div>
  );
}
