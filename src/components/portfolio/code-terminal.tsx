"use client";

import * as React from "react";

/**
 * A terminal-style code window that types out a snippet line-by-line,
 * then re-types it on a loop. Custom syntax highlighting (no library).
 *
 * The snippet is a real piece of Java-flavored pseudocode for the
 * leader-based replication protocol Manan built for Stock Bazaar.
 */

type Token = { t: string; c?: string };

const snippet: Token[][] = [
  [
    { t: "// leader election — runs on every order-service node", c: "com" },
  ],
  [
    { t: "public class ", c: "kw" },
    { t: "ReplicationLeader ", c: "typ" },
    { t: "{" },
  ],
  [{ t: "  ", c: "spc" }, { t: "private", c: "kw" }, { t: " ", c: "spc" }, { t: "Log ", c: "typ" }, { t: "wal;" }],
  [
    { t: "  ", c: "spc" },
    { t: "private", c: "kw" },
    { t: " ", c: "spc" },
    { t: "List", c: "typ" },
    { t: "<", c: "pun" },
    { t: "Replica", c: "typ" },
    { t: "> ", c: "pun" },
    { t: "followers;" },
  ],
  [{ t: "" }],
  [
    { t: "  ", c: "spc" },
    { t: "public ", c: "kw" },
    { t: "void ", c: "kw" },
    { t: "append", c: "fn" },
    { t: "(", c: "pun" },
    { t: "Order ", c: "typ" },
    { t: "o)", c: "pun" },
    { t: " ", c: "spc" },
    { t: "throws", c: "kw" },
    { t: " ", c: "spc" },
    { t: "CrashException ", c: "typ" },
    { t: "{" },
  ],
  [{ t: "    ", c: "spc" }, { t: "wal", c: "var" }, { t: ".", c: "pun" }, { t: "append", c: "fn" }, { t: "(o);", c: "pun" }, { t: "    ", c: "spc" }, { t: "// write-ahead log", c: "com" }],
  [
    { t: "    ", c: "spc" },
    { t: "for ", c: "kw" },
    { t: "(", c: "pun" },
    { t: "Replica ", c: "typ" },
    { t: "r : followers)", c: "pun" },
    { t: " {" },
  ],
  [
    { t: "      ", c: "spc" },
    { t: "r", c: "var" },
    { t: ".", c: "pun" },
    { t: "replicate", c: "fn" },
    { t: "(", c: "pun" },
    { t: "wal", c: "var" },
    { t: ".", c: "pun" },
    { t: "tail", c: "fn" },
    { t: "());", c: "pun" },
    { t: "  ", c: "spc" },
    { t: "// log-based sync", c: "com" },
  ],
  [{ t: "    }" }],
  [
    { t: "    ", c: "spc" },
    { t: "if ", c: "kw" },
    { t: "(", c: "pun" },
    { t: "quorum", c: "var" },
    { t: ".", c: "pun" },
    { t: "acknowledged", c: "fn" },
    { t: "()) ", c: "pun" },
    { t: "return;", c: "kw" },
  ],
  [
    { t: "    ", c: "spc" },
    { t: "else ", c: "kw" },
    { t: "stepDown", c: "fn" },
    { t: "();       ", c: "pun" },
    { t: "// trigger re-election", c: "com" },
  ],
  [{ t: "  }" }],
  [{ t: "}" }],
];

const colorMap: Record<string, string> = {
  kw: "var(--rust)",
  typ: "var(--moss)",
  fn: "var(--ink)",
  var: "var(--ink)",
  com: "var(--faded)",
  pun: "var(--ink)",
  spc: "inherit",
};

export function CodeTerminal() {
  const [typedLines, setTypedLines] = React.useState<number>(0);
  const [typedChars, setTypedChars] = React.useState<number>(0);
  const [phase, setPhase] = React.useState<"typing" | "hold" | "clear">("typing");
  const [paused, setPaused] = React.useState(false);

  // Pause typing on hover (so users can read)
  const onEnter = () => setPaused(true);
  const onLeave = () => setPaused(false);

  React.useEffect(() => {
    if (paused) return;
    if (phase === "hold") {
      const t = setTimeout(() => setPhase("clear"), 4200);
      return () => clearTimeout(t);
    }
    if (phase === "clear") {
      const t = setTimeout(() => {
        setTypedLines(0);
        setTypedChars(0);
        setPhase("typing");
      }, 600);
      return () => clearTimeout(t);
    }

    // typing
    if (typedLines >= snippet.length) {
      setPhase("hold");
      return;
    }

    const line = snippet[typedLines];
    const lineLen = line.reduce((s, tk) => s + tk.t.length, 0);
    if (typedChars >= lineLen) {
      // advance to next line
      const t = setTimeout(() => {
        setTypedLines((n) => n + 1);
        setTypedChars(0);
      }, 120);
      return () => clearTimeout(t);
    }

    // type the next character cluster
    const t = setTimeout(() => {
      setTypedChars((c) => c + Math.max(1, Math.floor(lineLen / 28)));
    }, 16);
    return () => clearTimeout(t);
  }, [typedLines, typedChars, phase, paused]);

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative border border-ink bg-[#14110d] text-paper font-mono text-[11px] leading-[1.7] shadow-[8px_8px_0_0_var(--ink)]"
      data-cursor="link"
      data-cursor-label="Code"
    >
      {/* Window chrome */}
      <div className="flex items-center justify-between border-b border-paper/15 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-rust" />
          <span className="h-2 w-2 rounded-full bg-clay" />
          <span className="h-2 w-2 rounded-full bg-moss" />
        </div>
        <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-paper/50">
          ReplicationLeader.java
        </div>
        <div className="font-mono text-[9px] text-paper/50">
          {phase === "typing" ? "● typing" : phase === "hold" ? "● saved" : "○ reset"}
        </div>
      </div>

      {/* Code body */}
      <div className="relative grid grid-cols-[auto_1fr] gap-x-3 px-3 py-3 min-h-[280px]">
        {/* Line numbers */}
        <div className="select-none text-right text-paper/25">
          {snippet.map((_, i) => (
            <div key={i} className="leading-[1.7]">
              {i < typedLines ? String(i + 1).padStart(2, "0") : i === typedLines ? String(i + 1).padStart(2, "0") : ""}
            </div>
          ))}
        </div>

        {/* Code text */}
        <div className="relative">
          {snippet.slice(0, typedLines).map((line, i) => (
            <Line key={i} line={line} chars={line.reduce((s, tk) => s + tk.t.length, 0)} />
          ))}
          {typedLines < snippet.length && (
            <Line
              line={snippet[typedLines]}
              chars={typedChars}
              showCursor
            />
          )}
          {phase === "hold" && (
            <div className="mt-1 flex items-center gap-2 text-[10px] text-paper/50">
              <span className="pulse-dot inline-block h-1 w-1 rounded-full bg-moss" />
              3 replicas acked · log synced · quorum reached
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Line({
  line,
  chars,
  showCursor = false,
}: {
  line: Token[];
  chars: number;
  showCursor?: boolean;
}) {
  let used = 0;
  const out: React.ReactNode[] = [];
  for (let i = 0; i < line.length; i++) {
    const tk = line[i];
    const remaining = chars - used;
    if (remaining <= 0) break;
    const slice = tk.t.slice(0, remaining);
    if (slice.length > 0) {
      out.push(
        <span key={i} style={{ color: tk.c ? colorMap[tk.c] : "inherit" }}>
          {slice}
        </span>
      );
    }
    used += tk.t.length;
  }
  return (
    <div className="whitespace-pre min-h-[1.7em]">
      {out}
      {showCursor && (
        <span className="ml-px inline-block h-[1.1em] w-[7px] -mb-[2px] bg-rust animate-pulse" />
      )}
    </div>
  );
}
