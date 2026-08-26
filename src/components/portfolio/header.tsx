"use client";

import * as React from "react";
import { nav, profile } from "@/data/resume";
import { Menu, Close, ArrowUpRight } from "./icons";
import { ThemeToggle } from "./theme-toggle";
import { Magnetic } from "./primitives";
import { useActiveSection } from "./scroll-progress";

export function Header() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const active = useActiveSection();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body when sheet open
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "bg-paper/85 backdrop-blur-md border-b border-ink/15"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-8 md:py-5">
          {/* Wordmark */}
          <a
            href="#top"
            className="group flex items-baseline gap-2"
            data-cursor="link"
            data-cursor-label="Top"
          >
            <span className="font-serif text-xl leading-none tracking-tight md:text-2xl">
              {profile.firstName}
              <span className="display-italic"> {profile.lastName.charAt(0)}.</span>
            </span>
            <span className="hidden label text-faded sm:inline">
              /{new Date().getFullYear()}
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {nav.slice(1, -1).map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`group relative font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
                    isActive ? "text-ink" : "text-ink/70 hover:text-ink"
                  }`}
                  data-cursor="link"
                >
                  <span className={isActive ? "text-rust" : "text-faded"}>{item.num}</span>
                  <span className="ml-2">{item.label}</span>
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-ink transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 md:gap-3">
            <a
              href="#contact"
              className="hidden font-mono text-[11px] uppercase tracking-[0.12em] text-ink/70 transition-colors hover:text-rust md:inline"
              data-cursor="link"
            >
              <span className="inline-flex items-center gap-1.5">
                <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-rust" />
                Available
              </span>
            </a>
            <ThemeToggle />
            <Magnetic strength={6}>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className="grid h-8 w-8 place-items-center text-ink md:hidden"
              >
                <Menu size={20} />
              </button>
            </Magnetic>
          </div>
        </div>
      </header>

      {/* Mobile sheet menu */}
      <div
        className={`fixed inset-0 z-[60] md:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        {/* Sheet */}
        <div
          className={`absolute right-0 top-0 flex h-full w-[88%] max-w-md flex-col bg-paper border-l-2 border-ink transition-transform duration-500 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-ink/15 px-5 py-4">
            <span className="label text-faded">Menu</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid h-8 w-8 place-items-center text-ink"
            >
              <Close size={20} />
            </button>
          </div>
          <nav className="flex flex-1 flex-col">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline justify-between border-b border-ink/10 px-5 py-5"
              >
                <span className="font-serif text-3xl tracking-tight text-ink transition-transform duration-300 group-hover:translate-x-1">
                  {item.label}
                </span>
                <span className="label text-faded">{item.num}</span>
              </a>
            ))}
          </nav>
          <div className="border-t border-ink/15 px-5 py-5">
            <a
              href={`mailto:${profile.email}`}
              className="group flex items-center justify-between"
            >
              <span className="font-mono text-sm text-ink">{profile.email}</span>
              <ArrowUpRight size={16} className="text-rust" />
            </a>
            <p className="mt-3 label text-faded">{profile.location}</p>
          </div>
        </div>
      </div>
    </>
  );
}
