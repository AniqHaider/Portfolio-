"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "#experience", label: "Work" },
  { href: "#writing", label: "Writing" },
  { href: "#skills", label: "Skills" },
];

export default function Nav() {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const t = document.documentElement.getAttribute("data-theme");
    setTheme(t === "dark" ? "dark" : "light");
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-bg/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[68px] max-w-[88rem] items-center justify-between px-6 md:px-10"
      >
        <a href="#top" className="group flex items-baseline gap-2" data-testid="nav-logo">
          <span className="font-serif text-xl tracking-tight">Aniq Haider</span>
          <span className="hidden text-[0.7rem] tracking-[0.2em] text-muted min-[460px]:inline">
            — SOFTWARE ENGINEER
          </span>
        </a>

        <div className="flex items-center gap-5 md:gap-7">
          <ul className="hidden items-center gap-6 sm:flex md:gap-7">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  data-testid={`nav-${l.label.toLowerCase()}`}
                  className="label transition-colors hover:text-fg"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            data-testid="nav-contact"
            className="label border-b border-accent pb-0.5 text-accent transition-opacity hover:opacity-70"
          >
            Contact
          </a>

          <Link
            href="/"
            prefetch
            aria-label="Back to the classic site"
            title="Back to the classic site"
            data-testid="view-classic"
            className="grid h-9 w-9 place-items-center rounded-full text-accent transition-colors hover:text-fg"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2l2.9 6.6 7.1.7-5.3 4.8 1.5 7-6.2-3.6-6.2 3.6 1.5-7L2 9.3l7.1-.7z" />
            </svg>
          </Link>

          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle colour theme"
            data-testid="theme-toggle"
            className="grid h-9 w-9 place-items-center rounded-full text-fg/80 transition-colors hover:text-accent"
          >
            {theme === "dark" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
