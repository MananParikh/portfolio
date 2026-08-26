"use client";

import * as React from "react";

/**
 * Thin rust line at the very top of the viewport that fills
 * based on page scroll progress. Sits above the header.
 */
export function ScrollProgress() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[70] h-[2px] bg-transparent"
    >
      <div
        className="h-full bg-rust origin-left transition-transform duration-100 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

/**
 * Tracks which section is currently in view and shares it via context.
 * Used by the header nav to highlight the active item.
 */
const ActiveSectionContext = React.createContext<string>("");

export function ActiveSectionTracker({
  children,
  ids,
}: {
  children: React.ReactNode;
  ids: string[];
}) {
  const [active, setActive] = React.useState<string>("");

  React.useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the most-visible intersecting section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [ids]);

  return (
    <ActiveSectionContext.Provider value={active}>
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSection() {
  return React.useContext(ActiveSectionContext);
}
