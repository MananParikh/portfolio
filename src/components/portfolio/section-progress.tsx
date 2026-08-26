"use client";

import * as React from "react";

/**
 * SectionProgress — a thin vertical bar on the left edge of a section
 * that fills based on how far through the section the viewport has scrolled.
 *
 * Place it as a child of any <section>. It reads the closest <section>
 * ancestor and tracks its scroll progress.
 *
 * Pairs with the page-level ScrollProgress bar at the top of the viewport.
 */
export function SectionProgress({
  color = "var(--rust)",
  width = 2,
  className = "",
}: {
  color?: string;
  width?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [progress, setProgress] = React.useState(0);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const section = el.closest("section");
    if (!section) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress = how much of the section has been scrolled past.
      // 0 when section bottom is at viewport bottom (just entering).
      // 1 when section top is at viewport top - sectionHeight (just left).
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const scrollable = sectionHeight + vh;
      const passed = vh - sectionTop;
      const p = Math.min(1, Math.max(0, passed / scrollable));
      setProgress(p);
    };

    const io = new IntersectionObserver(
      (entries) => {
        setInView(entries[0].isIntersecting);
      },
      { rootMargin: "0px", threshold: 0 }
    );
    io.observe(section);

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute left-0 top-0 bottom-0 ${className}`}
      style={{ width, opacity: inView ? 1 : 0, transition: "opacity 0.4s ease" }}
    >
      {/* Track */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--ink)", opacity: 0.08 }}
      />
      {/* Fill */}
      <div
        className="absolute inset-x-0 top-0 origin-top"
        style={{
          background: color,
          height: "100%",
          transform: `scaleY(${progress})`,
          transition: "transform 0.1s linear",
        }}
      />
    </div>
  );
}
