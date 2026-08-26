import * as React from "react";

/**
 * Hand-drawn icon set.
 * Slightly off-kilter paths, mixed stroke widths, no rounded caps everywhere.
 * No icon library — these are bespoke SVGs so the UI doesn't read as a template.
 */

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
});

export function ArrowUpRight({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function ArrowRight({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M3 12h17" />
      <path d="m13 6 7 6-7 6" />
    </svg>
  );
}

export function ArrowDown({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M12 4v15" />
      <path d="m6 13 6 7 6-7" />
    </svg>
  );
}

/* Asterisk — used as section marker, slightly hand-skewed */
export function Asterisk({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={1.4} {...props}>
      <path d="M12 3v18" />
      <path d="m4 7 16 10" />
      <path d="m20 7-16 10" />
    </svg>
  );
}

/* Plus used as the cursor crosshair */
export function Plus({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={1} {...props}>
      <path d="M12 2v20" />
      <path d="M2 12h20" />
    </svg>
  );
}

/* Email — envelope but with a single, slightly wobbling flap line */
export function Mail({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <rect x="3" y="6" width="18" height="13" rx="0.5" />
      <path d="m3 7 9 7 9-7" />
    </svg>
  );
}

/* GitHub — abstract cat silhouette, simplified */
export function Github({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M12 2a9.5 9.5 0 0 0-3 18.5c.5.1.7-.2.7-.5v-2c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3000001-4.5-1.1-4.5-5a4 4 0 0 1 1-2.7c-.1-.3-.5-1.3.1-2.7 0 0 .8-.3 2.7 1a9 9 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .6 1.4.2 2.4.1 2.7a4 4 0 0 1 1 2.7c0 3.9-2.3 4.7-4.5 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A9.5 9.5 0 0 0 12 2z" />
    </svg>
  );
}

/* Read.cv / bookmark style */
export function Bookmark({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M6 3h12v18l-6-4-6 4z" />
    </svg>
  );
}

/* Are.na — four squares abstracted */
export function Grid({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

/* Instagram — simplified square camera */
export function Instagram({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="0.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* Phone — handset */
export function Phone({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M5 3h3l2 5-2 1c1 2 3 4 5 5l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" />
    </svg>
  );
}

/* Location pin — slim */
export function Pin({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

/* A small sun — for theme toggle */
export function Sun({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5" />
    </svg>
  );
}

/* Moon — crescent */
export function Moon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M20 14a8 8 0 1 1-10-10 6 6 0 0 0 10 10z" />
    </svg>
  );
}

/* Menu — three lines with the middle one slightly short */
export function Menu({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M3 7h18" />
      <path d="M5 12h14" />
      <path d="M3 17h18" />
    </svg>
  );
}

export function Close({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M5 5l14 14" />
      <path d="M19 5 5 19" />
    </svg>
  );
}

/* LinkedIn — the "in" mark, simplified */
export function LinkedIn({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="0.5" />
      <path d="M7 10v7" />
      <circle cx="7" cy="7" r="0.8" fill="currentColor" stroke="none" />
      <path d="M11 17v-4a2 2 0 0 1 4 0v4" />
      <path d="M11 10v7" />
    </svg>
  );
}
