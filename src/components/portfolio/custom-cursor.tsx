"use client";

import * as React from "react";

/**
 * Enterprise-grade custom cursor.
 *
 * Design principles:
 *  - A precision dot (4px) that follows the pointer 1:1 — the "true" position
 *  - A thin ring (1px, 22px) that lags behind with spring easing — the "intention"
 *  - NO mix-blend-mode (gimmicky, breaks on colored backgrounds)
 *  - Labels appear in a separate pill BELOW the cursor, not crammed into the ring
 *  - On "view" elements: ring fills solid, label sits inside
 *  - Colors via CSS variables — adapts to light/dark automatically
 *  - Desktop only (hover + fine pointer); hidden on touch
 *
 * Contextual states picked up from `data-cursor` attributes:
 *   data-cursor="link"            → ring expands, optional label pill below
 *   data-cursor="view"            → ring fills solid, label inside
 *   data-cursor-label="..."       → custom label text
 */

type CursorState = "default" | "link" | "view";

export function CustomCursor() {
  const dotRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);
  const pillRef = React.useRef<HTMLDivElement>(null);
  const [state, setState] = React.useState<CursorState>("default");
  const [label, setLabel] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [enabled, setEnabled] = React.useState(false);

  // Pointer position (instant)
  const pos = React.useRef({ x: 0, y: 0 });
  // Ring position (lagged)
  const ring = React.useRef({ x: 0, y: 0 });
  // Pill position (more lagged)
  const pill = React.useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-desktop");

    let raf = 0;

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (!visible) setVisible(true);

      // Detect cursor context
      const t = e.target as HTMLElement | null;
      const cursorEl = t?.closest("[data-cursor]") as HTMLElement | null;
      if (cursorEl) {
        const v = (cursorEl.dataset.cursor as CursorState) || "link";
        setState(v);
        setLabel(cursorEl.dataset.cursorLabel || "");
      } else {
        setState("default");
        setLabel("");
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => {
      if (ringRef.current) ringRef.current.style.transform += " scale(0.7)";
    };
    const onUp = () => {
      // recompute on next frame
    };

    const loop = () => {
      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Ring lags with spring easing
      ring.current.x += (pos.current.x - ring.current.x) * 0.16;
      ring.current.y += (pos.current.y - ring.current.y) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Pill lags even more, offsets below cursor
      pill.current.x += (pos.current.x - pill.current.x) * 0.12;
      pill.current.y += (pos.current.y - pill.current.y) * 0.12;
      if (pillRef.current) {
        pillRef.current.style.transform = `translate3d(${pill.current.x}px, ${pill.current.y + 28}px, 0) translate(-50%, 0)`;
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.classList.remove("cursor-none-desktop");
    };
  }, []);

  if (!enabled) return null;

  const ringSize = state === "view" ? 52 : state === "link" ? 40 : 22;
  const ringFilled = state === "view";
  const showPill = state === "link" && label.length > 0;

  return (
    <>
      {/* Precision dot — always visible, follows instantly */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          width: 4,
          height: 4,
          background: "var(--ink)",
          opacity: visible && state !== "view" ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      />

      {/* Ring — lags behind, expands contextually */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full flex items-center justify-center"
        style={{
          width: ringSize,
          height: ringSize,
          border: ringFilled ? "none" : "1px solid var(--ink)",
          background: ringFilled ? "var(--ink)" : "transparent",
          opacity: visible ? 1 : 0,
          transition: "width 0.25s cubic-bezier(0.2,0.7,0.2,1), height 0.25s cubic-bezier(0.2,0.7,0.2,1), background-color 0.25s ease, border-color 0.25s ease, opacity 0.2s ease",
        }}
      >
        {ringFilled && label && (
          <span
            className="font-mono text-[9px] uppercase tracking-[0.14em]"
            style={{ color: "var(--paper)" }}
          >
            {label}
          </span>
        )}
      </div>

      {/* Label pill — appears below cursor for link states */}
      <div
        ref={pillRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          opacity: showPill && visible ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      >
        {label && (
          <span
            className="inline-block whitespace-nowrap border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em]"
            style={{
              borderColor: "var(--ink)",
              background: "var(--paper)",
              color: "var(--ink)",
            }}
          >
            {label}
          </span>
        )}
      </div>
    </>
  );
}
