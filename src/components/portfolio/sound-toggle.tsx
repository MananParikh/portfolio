"use client";

import * as React from "react";
import { useSound } from "./sound-system";

/**
 * Sound toggle — a small icon button for the header.
 * Shows a muted/unmuted speaker. Plays a confirmation tone on enable.
 */
export function SoundToggle() {
  const { enabled, toggle } = useSound();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={enabled ? "Mute interface sounds" : "Enable interface sounds"}
      aria-pressed={enabled}
      data-cursor="link"
      data-cursor-label={enabled ? "Mute" : "Sound"}
      className="grid h-8 w-8 place-items-center text-ink transition-colors hover:text-rust"
      title={enabled ? "Sound on — click to mute" : "Sound off — click to enable"}
    >
      <SoundIcon on={enabled} />
    </button>
  );
}

function SoundIcon({ on }: { on: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Speaker body */}
      <path d="M4 9v6h4l5 4V5L8 9H4z" />
      {on ? (
        <>
          {/* Sound waves */}
          <path d="M16 8.5a4 4 0 0 1 0 7" opacity="0.9" />
          <path d="M18.5 6a7 7 0 0 1 0 12" opacity="0.5" />
        </>
      ) : (
        <>
          {/* Mute slash */}
          <line x1="16" y1="9" x2="22" y2="15" />
          <line x1="22" y1="9" x2="16" y2="15" />
        </>
      )}
    </svg>
  );
}
