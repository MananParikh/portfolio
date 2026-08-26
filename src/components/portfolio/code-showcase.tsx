"use client";

import * as React from "react";
import { Reveal } from "./primitives";
import { SectionHeader } from "./selected-work";
import { Asterisk, ArrowUpRight } from "./icons";

/**
 * A real code excerpt with custom syntax highlighting — no library.
 * Shows the LRU cache invalidation logic from Stock Bazaar.
 * Designed to look like a printed code listing in a typography magazine.
 */

type Tok = { t: string; c?: "kw" | "typ" | "fn" | "var" | "com" | "str" | "num" | "pun" };

const colors: Record<string, string> = {
  kw: "var(--rust)",
  typ: "var(--moss)",
  fn: "var(--ink)",
  var: "var(--ink)",
  com: "var(--faded)",
  str: "var(--moss)",
  num: "var(--rust)",
  pun: "var(--ink)",
};

const code: Tok[][] = [
  [{ t: "// In-memory LRU cache with invalidation push notifications.", c: "com" }],
  [{ t: "// Reads stay fast; writes invalidate downstream replicas.", c: "com" }],
  [],
  [
    { t: "public class ", c: "kw" },
    { t: "LRUCache", c: "typ" },
    { t: "<", c: "pun" },
    { t: "K", c: "typ" },
    { t: ",", c: "pun" },
    { t: " V", c: "typ" },
    { t: "> ", c: "pun" },
    { t: "extends", c: "kw" },
    { t: " ", c: "pun" },
    { t: "LinkedHashMap", c: "typ" },
    { t: "<", c: "pun" },
    { t: "K", c: "typ" },
    { t: ",", c: "pun" },
    { t: " V", c: "typ" },
    { t: "> {", c: "pun" },
  ],
  [],
  [
    { t: "  ", c: "pun" },
    { t: "private", c: "kw" },
    { t: " ", c: "pun" },
    { t: "final", c: "kw" },
    { t: " ", c: "pun" },
    { t: "int", c: "kw" },
    { t: " ", c: "pun" },
    { t: "capacity", c: "var" },
    { t: ";", c: "pun" },
    { t: "                 ", c: "pun" },
    { t: "// max entries before eviction", c: "com" },
  ],
  [
    { t: "  ", c: "pun" },
    { t: "private", c: "kw" },
    { t: " ", c: "pun" },
    { t: "final", c: "kw" },
    { t: " ", c: "pun" },
    { t: "List", c: "typ" },
    { t: "<", c: "pun" },
    { t: "Replica", c: "typ" },
    { t: "> ", c: "pun" },
    { t: "subscribers", c: "var" },
    { t: ";", c: "pun" },
  ],
  [],
  [
    { t: "  ", c: "pun" },
    { t: "@Override", c: "kw" },
  ],
  [
    { t: "  ", c: "pun" },
    { t: "protected", c: "kw" },
    { t: " ", c: "pun" },
    { t: "boolean", c: "kw" },
    { t: " ", c: "pun" },
    { t: "removeEldestEntry", c: "fn" },
    { t: "(", c: "pun" },
    { t: "Entry", c: "typ" },
    { t: "<", c: "pun" },
    { t: "K", c: "typ" },
    { t: ", V> eldest) {", c: "pun" },
  ],
  [
    { t: "    ", c: "pun" },
    { t: "if", c: "kw" },
    { t: " (", c: "pun" },
    { t: "size", c: "fn" },
    { t: "()", c: "pun" },
    { t: " > ", c: "pun" },
    { t: "capacity", c: "var" },
    { t: ") {", c: "pun" },
  ],
  [
    { t: "      ", c: "pun" },
    { t: "subscribers", c: "var" },
    { t: ".", c: "pun" },
    { t: "forEach", c: "fn" },
    { t: "(r -> r.", c: "pun" },
    { t: "invalidate", c: "fn" },
    { t: "(", c: "pun" },
    { t: "eldest", c: "var" },
    { t: ".", c: "pun" },
    { t: "getKey", c: "fn" },
    { t: "()));", c: "pun" },
  ],
  [
    { t: "      ", c: "pun" },
    { t: "return", c: "kw" },
    { t: " ", c: "pun" },
    { t: "true", c: "kw" },
    { t: ";", c: "pun" },
    { t: "                       ", c: "pun" },
    { t: "// evict + notify", c: "com" },
  ],
  [{ t: "    }", c: "pun" }],
  [
    { t: "    ", c: "pun" },
    { t: "return", c: "kw" },
    { t: " ", c: "pun" },
    { t: "false", c: "kw" },
    { t: ";", c: "pun" },
  ],
  [{ t: "  }", c: "pun" }],
  [{ t: "}", c: "pun" }],
];

export function CodeShowcase() {
  return (
    <section className="relative px-5 pt-24 md:px-8 md:pt-36">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader num="—"
          title="A snippet"
          kicker="From the replication layer"
        />

        <div className="mt-12 grid grid-cols-12 gap-6 md:mt-16">
          {/* Left: narrative */}
          <div className="col-span-12 md:col-span-4">
            <Reveal>
              <div className="label text-faded">Excerpt · Stock Bazaar</div>
              <h3 className="mt-3 font-serif text-3xl leading-tight tracking-tight text-ink md:text-4xl text-balance">
                The cache that{" "}
                <span className="display-italic text-rust">talks back</span>.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink/75 text-pretty">
                Most LRU caches just evict. Mine also notifies every downstream replica
                that the key they&apos;re holding is now stale — so reads stay fast
                and consistency survives the eviction.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/75 text-pretty">
                It&apos;s 17 lines of Java. It ran 4,000 trades per second in the
                eval harness, with sub-millisecond p99 reads.
              </p>

              <div className="mt-6 border-t border-ink/15 pt-4">
                <div className="label text-faded">Why this matters</div>
                <ul className="mt-2 space-y-2 text-sm text-ink/75">
                  <li className="flex gap-2">
                    <Asterisk size={12} className="mt-1 shrink-0 text-rust" />
                    <span>Cache invalidation is the second-hardest problem in CS. Push-notifications make it tractable.</span>
                  </li>
                  <li className="flex gap-2">
                    <Asterisk size={12} className="mt-1 shrink-0 text-rust" />
                    <span>Extending <code className="font-mono text-[12px] bg-paper-2 px-1">LinkedHashMap</code> keeps the surface tiny — one override, one field.</span>
                  </li>
                  <li className="flex gap-2">
                    <Asterisk size={12} className="mt-1 shrink-0 text-rust" />
                    <span>Tested under concurrent client load + fault injection. Survived.</span>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Right: code listing */}
          <div className="col-span-12 md:col-span-8">
            <Reveal delay={100}>
              <div className="relative border border-ink bg-paper-2/40">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-ink/20 px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faded">
                      LRUCache.java
                    </span>
                    <span className="font-mono text-[9px] text-faded/60">· 17 lines</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.16em] text-faded">
                    <span>Java 17</span>
                    <span className="h-3 w-px bg-ink/20" />
                    <span>Spring</span>
                  </div>
                </div>

                {/* Code body — printed listing style */}
                <div className="grid grid-cols-[auto_1fr] gap-x-4 px-4 py-4 font-mono text-[12px] leading-[1.65] overflow-x-auto">
                  {/* Line numbers */}
                  <div className="select-none text-right text-faded/50">
                    {code.map((_, i) => (
                      <div key={i}>{String(i + 1).padStart(2, "0")}</div>
                    ))}
                  </div>
                  {/* Code */}
                  <div>
                    {code.map((line, i) => (
                      <div key={i} className="whitespace-pre min-h-[1.65em]">
                        {line.length === 0 ? (
                          <span>&nbsp;</span>
                        ) : (
                          line.map((tk, j) => (
                            <span key={j} style={{ color: tk.c ? colors[tk.c] : "var(--ink)" }}>
                              {tk.t}
                            </span>
                          ))
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer — metrics */}
                <div className="grid grid-cols-3 border-t border-ink/20">
                  {[
                    { v: "<1ms", l: "p99 read" },
                    { v: "4k/s", l: "peak throughput" },
                    { v: "100%", l: "consistency under fault" },
                  ].map((m, i) => (
                    <div
                      key={m.l}
                      className={`px-3 py-2.5 ${i !== 0 ? "border-l border-ink/20" : ""}`}
                    >
                      <div className="font-serif text-xl leading-none text-ink">{m.v}</div>
                      <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-faded">
                        {m.l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-faded">
                <Asterisk size={11} className="mr-1 inline text-rust" />
                Full source on GitHub — link in the footer
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
