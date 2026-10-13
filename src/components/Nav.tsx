"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
];

export default function Nav() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const t = document.documentElement.getAttribute("data-theme");
    setTheme(t === "light" ? "light" : "dark");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center gap-3 px-4 pt-4 md:px-16">
      <nav
        aria-label="Primary"
        className="flex h-[70px] flex-1 items-center justify-between rounded-full border border-line bg-surface/80 px-5 shadow-lg backdrop-blur-xl md:px-8"
      >
        <a href="#top" className="flex items-center gap-3" data-testid="nav-logo">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-accent-fill text-sm font-extrabold text-white">
            AH
          </span>
          <span className="hidden text-sm tracking-[0.18em] min-[460px]:inline">
            <span className="font-bold">ANIQ</span>
            <span className="font-light">HAIDER</span>
          </span>
        </a>
        <div className="flex items-center gap-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-${l.label.toLowerCase()}`}
              className="hidden h-11 items-center rounded-full border border-line bg-surface-2 px-5 text-sm font-semibold transition hover:border-accent sm:inline-flex"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            data-testid="nav-contact"
            className="inline-flex h-11 items-center rounded-full bg-accent-fill px-5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Contact
          </a>
        </div>
      </nav>
      <button
        type="button"
        onClick={toggle}
        aria-label="Toggle theme"
        data-testid="theme-toggle"
        className="grid h-[70px] w-[70px] shrink-0 place-items-center rounded-full border border-line bg-surface/80 backdrop-blur-xl transition hover:border-accent"
      >
        {theme === "dark" ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        )}
      </button>
    </header>
  );
}
