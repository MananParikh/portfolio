"use client";

import * as React from "react";

/**
 * Reveal — fades children in when they enter the viewport.
 * Respects prefers-reduced-motion via the .reveal CSS utility.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  ...rest
}: {
  children: React.ReactNode;
  as?: React.ElementType;
  delay?: number;
  className?: string;
} & React.HTMLAttributes<HTMLElement>) {
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.transitionDelay = `${delay}ms`;
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "-8% 0px -8% 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <Tag ref={ref} className={`reveal ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * Magnetic — wraps an element so it drifts toward the cursor on hover.
 * Desktop only.
 */
export function Magnetic({
  children,
  strength = 18,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      const dx = (x / rect.width) * strength;
      const dy = (y / rect.height) * strength;
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    };
    const onLeave = () => {
      el.style.transform = "translate3d(0,0,0)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <div
      ref={ref}
      className={`inline-block transition-transform duration-500 ease-out ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Marquee — duplicates children and animates horizontally with pure CSS.
 * Set `reverse` to flip direction, `duration` in seconds.
 */
export function Marquee({
  children,
  duration = 36,
  reverse = false,
  pauseOnHover = false,
  className = "",
}: {
  children: React.ReactNode;
  duration?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${pauseOnHover ? "marquee-paused" : ""} ${className}`}>
      <div
        className="marquee-track"
        style={
          {
            "--marquee-duration": `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        <span className="inline-flex">{children}</span>
        <span className="inline-flex" aria-hidden>
          {children}
        </span>
      </div>
    </div>
  );
}

/**
 * Tilt — tilts children slightly based on pointer position.
 * Used on project cards.
 */
export function Tilt({
  children,
  className = "",
  max = 6,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg)`;
    };
    const onLeave = () => {
      el.style.transform = "perspective(900px) rotateY(0) rotateX(0)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [max]);

  return (
    <div
      ref={ref}
      className={`transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
