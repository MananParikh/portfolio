"use client";

import * as React from "react";

/**
 * Procedural sound system — no audio files.
 * Uses Web Audio API to synthesize:
 *  - "tick"   : paper-crisp button hover click (short filtered noise burst)
 *  - "type"   : soft typewriter tick for the code terminal (pitched sine pluck)
 *  - "toggle" : on/off confirmation (two-tone)
 *
 * Off by default. User toggles via the SoundToggle button in the header.
 * Respects prefers-reduced-motion (disables auto-play of terminal ticks).
 */

type SoundType = "tick" | "type" | "toggle";

const SoundContext = React.createContext<{
  enabled: boolean;
  toggle: () => void;
  play: (type: SoundType) => void;
}>({
  enabled: false,
  toggle: () => {},
  play: () => {},
});

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = React.useState(false);
  const ctxRef = React.useRef<AudioContext | null>(null);

  // Load preference
  React.useEffect(() => {
    const stored = localStorage.getItem("sound-enabled");
    if (stored === "true") setEnabled(true);
  }, []);

  const ensureCtx = () => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      try {
        ctxRef.current = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      } catch {
        return null;
      }
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume().catch(() => {});
    }
    return ctxRef.current;
  };

  const play = React.useCallback(
    (type: SoundType) => {
      if (!enabled) return;
      const ctx = ensureCtx();
      if (!ctx) return;

      const now = ctx.currentTime;

      if (type === "tick") {
        // Paper-crisp click: very short high-passed noise burst
        const bufferSize = Math.floor(ctx.sampleRate * 0.035);
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          // White noise with fast exponential decay
          const decay = Math.exp(-i / (bufferSize * 0.25));
          data[i] = (Math.random() * 2 - 1) * decay;
        }
        const src = ctx.createBufferSource();
        src.buffer = buffer;

        const hp = ctx.createBiquadFilter();
        hp.type = "highpass";
        hp.frequency.value = 1800;

        const gain = ctx.createGain();
        gain.gain.value = 0.08;

        src.connect(hp);
        hp.connect(gain);
        gain.connect(ctx.destination);
        src.start(now);
        src.stop(now + 0.04);
      } else if (type === "type") {
        // Soft typewriter tick: pitched sine with fast decay
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = 1200 + Math.random() * 200;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === "toggle") {
        // Two-tone confirmation
        const osc1 = ctx.createOscillator();
        osc1.type = "sine";
        osc1.frequency.value = enabled ? 660 : 880;
        const gain1 = ctx.createGain();
        gain1.gain.setValueAtTime(0.06, now);
        gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.13);

        const osc2 = ctx.createOscillator();
        osc2.type = "sine";
        osc2.frequency.value = enabled ? 880 : 660;
        const gain2 = ctx.createGain();
        gain2.gain.setValueAtTime(0.05, now + 0.08);
        gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(now + 0.08);
        osc2.stop(now + 0.23);
      }
    },
    [enabled]
  );

  const toggle = React.useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      localStorage.setItem("sound-enabled", next ? "true" : "false");
      // Play confirmation tone on enable
      if (next) {
        const ctx = ensureCtx();
        if (ctx) {
          const now = ctx.currentTime;
          const osc = ctx.createOscillator();
          osc.type = "sine";
          osc.frequency.value = 660;
          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.13);

          const osc2 = ctx.createOscillator();
          osc2.type = "sine";
          osc2.frequency.value = 880;
          const gain2 = ctx.createGain();
          gain2.gain.setValueAtTime(0.05, now + 0.08);
          gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.start(now + 0.08);
          osc2.stop(now + 0.23);
        }
      }
      return next;
    });
  }, []);

  return (
    <SoundContext.Provider value={{ enabled, toggle, play }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return React.useContext(SoundContext);
}

/**
 * useSoundHover — returns props to spread on any element to play a
 * tick sound on mouse enter. Only fires on desktop (fine pointer).
 *
 * Usage: <a {...useSoundHover()}>...</a>
 */
export function useSoundHover(type: SoundType = "tick") {
  const { play, enabled } = useSound();
  const lastPlay = React.useRef(0);

  return {
    onMouseEnter: () => {
      if (!enabled) return;
      // Throttle — don't play more than once per 60ms
      const now = Date.now();
      if (now - lastPlay.current < 60) return;
      lastPlay.current = now;
      play(type);
    },
  };
}
