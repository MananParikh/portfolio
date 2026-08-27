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
  [{ t: "// Cache invalidation, pushed from the catalog service.", c: "com" }],
  [{ t: "// A per-stock write lock blocks lookups for only that stock.", c: "com" }],
  [],
  [
    { t: "public", c: "kw" },
    { t: " ", c: "pun" },
    { t: "void", c: "kw" },
    { t: " ", c: "pun" },
    { t: "removeEntry", c: "fn" },
    { t: "(", c: "pun" },
    { t: "String", c: "typ" },
    { t: " key", c: "var" },
    { t: ") {", c: "pun" },
  ],
  [
    { t: "  ", c: "pun" },
    { t: "if", c: "kw" },
    { t: " (", c: "pun" },
    { t: "cacheMap", c: "var" },
    { t: ".", c: "pun" },
    { t: "containsKey", c: "fn" },
    { t: "(key)) {", c: "pun" },
  ],
  [
    { t: "    ", c: "pun" },
    { t: "cacheReadWriteLocks", c: "var" },
    { t: ".", c: "pun" },
    { t: "putIfAbsent", c: "fn" },
    { t: "(key, ", c: "pun" },
    { t: "new", c: "kw" },
    { t: " ", c: "pun" },
    { t: "ReentrantReadWriteLock", c: "typ" },
    { t: "());", c: "pun" },
  ],
  [
    { t: "    ", c: "pun" },
    { t: "ReentrantReadWriteLock", c: "typ" },
    { t: " lock ", c: "var" },
    { t: "= ", c: "pun" },
    { t: "cacheReadWriteLocks", c: "var" },
    { t: ".", c: "pun" },
    { t: "get", c: "fn" },
    { t: "(key);", c: "pun" },
  ],
  [
    { t: "    ", c: "pun" },
    { t: "lock", c: "var" },
    { t: ".", c: "pun" },
    { t: "writeLock", c: "fn" },
    { t: "().", c: "pun" },
    { t: "lock", c: "fn" },
    { t: "();", c: "pun" },
    { t: "        ", c: "pun" },
    { t: "// block lookups for this stock", c: "com" },
  ],
  [
    { t: "    ", c: "pun" },
    { t: "try", c: "kw" },
    { t: " {", c: "pun" },
  ],
  [
    { t: "      ", c: "pun" },
    { t: "Node", c: "typ" },
    { t: " node ", c: "var" },
    { t: "= ", c: "pun" },
    { t: "cacheMap", c: "var" },
    { t: ".", c: "pun" },
    { t: "get", c: "fn" },
    { t: "(key);", c: "pun" },
  ],
  [
    { t: "      ", c: "pun" },
    { t: "remove", c: "fn" },
    { t: "(node);", c: "pun" },
    { t: "              ", c: "pun" },
    { t: "// unlink from the doubly linked list", c: "com" },
  ],
  [
    { t: "      ", c: "pun" },
    { t: "cacheMap", c: "var" },
    { t: ".", c: "pun" },
    { t: "remove", c: "fn" },
    { t: "(key);", c: "pun" },
    { t: "      ", c: "pun" },
    { t: "// drop from the HashMap", c: "com" },
  ],
  [
    { t: "    } ", c: "pun" },
    { t: "finally", c: "kw" },
    { t: " {", c: "pun" },
  ],
  [
    { t: "      ", c: "pun" },
    { t: "lock", c: "var" },
    { t: ".", c: "pun" },
    { t: "writeLock", c: "fn" },
    { t: "().", c: "pun" },
    { t: "unlock", c: "fn" },
    { t: "();", c: "pun" },
  ],
  [{ t: "    }", c: "pun" }],
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
                The cache the catalog{" "}
                <span className="display-italic text-rust">invalidates</span>.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink/75 text-pretty">
                When the catalog approves a trade, it pushes an invalidation to the
                front-end for that one stock. A per-stock write lock means only lookups
                for the traded stock wait — every other read passes straight through.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/75 text-pretty">
                Underneath it&apos;s a HashMap for O(1) lookup and a doubly linked list
                for LRU order, capacity 5. Deployed on AWS EC2, lookups averaged around
                58&nbsp;ms across 5 concurrent clients.
              </p>

              <div className="mt-6 border-t border-ink/15 pt-4">
                <div className="label text-faded">Why this matters</div>
                <ul className="mt-2 space-y-2 text-sm text-ink/75">
                  <li className="flex gap-2">
                    <Asterisk size={12} className="mt-1 shrink-0 text-rust" />
                    <span>Invalidation is push-based — the catalog owns correctness, so there are no TTLs and no stale-read window.</span>
                  </li>
                  <li className="flex gap-2">
                    <Asterisk size={12} className="mt-1 shrink-0 text-rust" />
                    <span>Locking is per-stock, not global: a hot ticker being traded never freezes reads for the other four.</span>
                  </li>
                  <li className="flex gap-2">
                    <Asterisk size={12} className="mt-1 shrink-0 text-rust" />
                    <span>A <code className="font-mono text-[12px] bg-paper-2 px-1">HashMap</code> plus a doubly linked list keeps get, put, and evict all O(1).</span>
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
                    <span>Java</span>
                    <span className="h-3 w-px bg-ink/20" />
                    <span>LRU</span>
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
                    { v: "~58ms", l: "avg lookup · EC2" },
                    { v: "~20%", l: "cache latency cut" },
                    { v: "5×1k", l: "client load test" },
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
