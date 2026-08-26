"use client";

import * as React from "react";
import { Sun, Moon } from "./icons";

export function ThemeToggle() {
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="grid h-8 w-8 place-items-center text-ink hover:text-rust transition-colors"
      data-cursor="link"
      data-cursor-label={dark ? "Light" : "Dark"}
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
