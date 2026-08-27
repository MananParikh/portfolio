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
    { t: "// leader fans every committed order out to its followers", c: "com" },
  ],
  [
    { t: "public ", c: "kw" },
    { t: "static ", c: "kw" },
    { t: "void ", c: "kw" },
    { t: "UpdateFollowers", c: "fn" },
    { t: "(", c: "pun" },
    { t: "String ", c: "typ" },
    { t: "body", c: "var" },
    { t: ") {" },
  ],
  [
    { t: "  ", c: "spc" },
    { t: "int", c: "kw" },
    { t: "[] ", c: "pun" },
    { t: "ids ", c: "var" },
    { t: "= {0, 1, 2};", c: "pun" },
  ],
  [
    { t: "  ", c: "spc" },
    { t: "for ", c: "kw" },
    { t: "(", c: "pun" },
    { t: "int ", c: "kw" },
    { t: "i : ids) {", c: "pun" },
  ],
  [
    { t: "    ", c: "spc" },
    { t: "if ", c: "kw" },
    { t: "(i == myId) ", c: "pun" },
    { t: "continue;", c: "kw" },
    { t: "        ", c: "spc" },
    { t: "// skip self", c: "com" },
  ],
  [
    { t: "    ", c: "spc" },
    { t: "String ", c: "typ" },
    { t: "node ", c: "var" },
    { t: "= ", c: "pun" },
    { t: "getenv", c: "fn" },
    { t: "(", c: "pun" },
    { t: "\"orderservice\"", c: "typ" },
    { t: " + i);", c: "pun" },
  ],
  [
    { t: "    ", c: "spc" },
    { t: "var ", c: "kw" },
    { t: "conn ", c: "var" },
    { t: "= (", c: "pun" },
    { t: "HttpURLConnection", c: "typ" },
    { t: ") ", c: "pun" },
    { t: "open", c: "fn" },
    { t: "(node + ", c: "pun" },
    { t: "\"/update\"", c: "typ" },
    { t: ");" },
  ],
  [
    { t: "    ", c: "spc" },
    { t: "conn", c: "var" },
    { t: ".", c: "pun" },
    { t: "setConnectTimeout", c: "fn" },
    { t: "(20);", c: "pun" },
    { t: "      ", c: "spc" },
    { t: "// fail fast if down", c: "com" },
  ],
  [
    { t: "    ", c: "spc" },
    { t: "conn", c: "var" },
    { t: ".", c: "pun" },
    { t: "getOutputStream", c: "fn" },
    { t: "().", c: "pun" },
    { t: "write", c: "fn" },
    { t: "(body);", c: "pun" },
  ],
  [
    { t: "    ", c: "spc" },
    { t: "int ", c: "kw" },
    { t: "status ", c: "var" },
    { t: "= ", c: "pun" },
    { t: "conn", c: "var" },
    { t: ".", c: "pun" },
    { t: "getResponseCode", c: "fn" },
    { t: "();", c: "pun" },
    { t: "  ", c: "spc" },
    { t: "// 200 = in sync", c: "com" },
  ],
  [{ t: "  }" }],
  [{ t: "}" }],
];

const colorMap: Record<string, string> = {
  kw: "var(--rust)",
  typ: "#a3b18a",   // soft moss — readable on the dark terminal
  fn: "#c8b89e",    // clay — function names
  var: "#f1ece1",   // paper — identifiers
  com: "#8a8275",   // faded
  pun: "#f1ece1",   // paper — punctuation
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
          OrderService.java
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
              2 followers updated · order log synced
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
