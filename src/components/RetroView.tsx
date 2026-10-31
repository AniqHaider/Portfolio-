"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { readRetroCount, setView, useView } from "@/lib/view";

const NUDGE_KEY = "viewNudge";
const NOTE_KEY = "appNudge";
const APP_URL = "https://github.com/AniqHaider/prep-pocket/releases/latest";
const CONFETTI = ["#ff0", "#f0f", "#0ff", "#21ed00", "#f22", "#00e"];

const ticker = [
  "★ WELCOME TO ANIQ'S HOMEPAGE ★",
  "NOW WITH 100% MORE COMIC SANS",
  "★ BEST VIEWED IN ANY BROWSER ★",
  "SIGN MY GUESTBOOK (THERE IS NO GUESTBOOK)",
  "★ THIS SITE IS ALWAYS UNDER CONSTRUCTION ★",
];

function burstConfetti() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const bits = Array.from({ length: 40 }, (_, i) => {
    const el = document.createElement("span");
    el.className = "retro-confetti";
    el.setAttribute("aria-hidden", "true");
    el.style.left = `${Math.random() * 100}%`;
    el.style.background = CONFETTI[i % CONFETTI.length];
    el.style.setProperty("--drift", `${Math.round((Math.random() - 0.5) * 240)}px`);
    el.style.animationDelay = `${Math.random() * 0.4}s`;
    document.body.append(el);
    return el;
  });
  setTimeout(() => bits.forEach((b) => b.remove()), 2800);
}

/** Ticker and visitor strip shown above the page in the retro view. */
export function RetroTop() {
  const retro = useView() === "retro";
  const [still, setStill] = useState(false);

  useEffect(() => {
    document.documentElement.toggleAttribute("data-retro-still", retro && still);
  }, [retro, still]);

  if (!retro) return null;
  const count = Math.max(1, readRetroCount());
  const line = ticker.join("   ");

  return (
    <div className="retro-top" data-testid="retro-top">
      <div className="retro-ticker" aria-hidden>
        <div className="retro-ticker-track">
          <span>{line}</span>
          <span>{line}</span>
        </div>
      </div>
      <div className="retro-counter">
        You have gone retro
        <b aria-label={`${count} times`}>{String(count).padStart(6, "0")}</b>
        time{count === 1 ? "" : "s"} <small>(counted in this browser only, no analytics here)</small>
        <button type="button" aria-pressed={still} onClick={() => setStill((s) => !s)} data-testid="retro-pause">
          {still ? "RESUME MOTION" : "MAKE IT STOP"}
        </button>
      </div>
    </div>
  );
}

/** The taskbar in the retro view, and the one-time nudge offering it in the normal view. */
export function RetroDock() {
  const view = useView();
  const retro = view === "retro";
  const [menu, setMenu] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [note, setNote] = useState(false);
  const [asked, setAsked] = useState(false);
  const path = usePathname();
  const [clock, setClock] = useState("");
  const prev = useRef(view);

  // The nudge appears once per browser, a few seconds after arrival, and never steals focus.
  useEffect(() => {
    setNudge(false);
    if (retro) return;
    let seen = false;
    try {
      seen = !!localStorage.getItem(NUDGE_KEY);
    } catch {}
    if (seen) {
      setAsked(true);
      return;
    }
    const t = setTimeout(() => setNudge(true), 6000);
    return () => clearTimeout(t);
  }, [retro]);

  // The note about the app waits until the view prompt has been answered, so only one popup shows at a time.
  useEffect(() => {
    if (!asked && !retro) return;
    let seen = path.startsWith("/blog/preppy");
    try {
      seen = seen || !!localStorage.getItem(NOTE_KEY);
    } catch {}
    if (seen) return;
    const t = setTimeout(() => setNote(true), 6500);
    return () => clearTimeout(t);
  }, [asked, retro, path]);

  const closeNote = () => {
    setNote(false);
    try {
      localStorage.setItem(NOTE_KEY, "dismissed");
    } catch {}
  };

  useEffect(() => {
    if (!note) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeNote();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [note]);

  const dismiss = () => {
    setNudge(false);
    setAsked(true);
    try {
      localStorage.setItem(NUDGE_KEY, "dismissed");
    } catch {}
  };

  useEffect(() => {
    if (!nudge) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nudge]);

  useEffect(() => {
    if (prev.current !== view && retro) burstConfetti();
    prev.current = view;
    setMenu(false);
  }, [view, retro]);

  useEffect(() => {
    if (!retro) return;
    const tick = () => setClock(new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, [retro]);

  useEffect(() => {
    if (!menu) return;
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !(e.target as Element).closest(".retro-start-wrap")) setMenu(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, [menu]);

  const noteEl = note ? (
    <aside
      aria-label="A note for fellow developers"
      data-testid="app-note"
      className="view-nudge fixed inset-x-4 bottom-4 z-[60] rounded-2xl border border-line bg-surface p-4 shadow-2xl sm:left-auto sm:right-6 sm:bottom-6 sm:w-[25rem]"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">A note for fellow devs</p>
      <p className="mt-2 text-sm font-semibold">I built a free, offline app for interview prep.</p>
      <p className="mt-1 text-sm text-muted">
        Preppy puts notes, animated lessons, quizzes and real code on your Android phone. If you are brushing up too, it might help you.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href="/blog/preppy"
          onClick={closeNote}
          data-testid="note-learn"
          className="inline-flex h-10 items-center rounded-full bg-accent-fill px-4 text-sm font-semibold text-white transition hover:brightness-110"
        >
          See how it works
        </a>
        <a
          href={APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeNote}
          data-testid="note-apk"
          className="inline-flex h-10 items-center rounded-full border border-line bg-surface-2 px-4 text-sm font-semibold transition hover:border-accent"
        >
          Get the APK
        </a>
        <button
          type="button"
          onClick={closeNote}
          data-testid="note-dismiss"
          className="inline-flex h-10 items-center rounded-full px-3 text-sm font-semibold text-muted transition hover:text-fg"
        >
          Not now
        </button>
      </div>
    </aside>
  ) : null;

  if (retro) {
    return (
      <>
      {noteEl}
      <nav className="retro-taskbar" aria-label="Taskbar" data-testid="retro-taskbar">
        <div className="retro-start-wrap">
          <button
            type="button"
            className="retro-start"
            aria-expanded={menu}
            aria-controls="retro-start-menu"
            onClick={() => setMenu((m) => !m)}
            data-testid="retro-start"
          >
            ★ start
          </button>
          {menu && (
            <ul id="retro-start-menu" className="retro-menu">
              <li className="retro-menu-title" aria-hidden>
                Aniq 98
              </li>
              {[
                ["Experience", "/#experience"],
                ["Writing", "/#writing"],
                ["Skills", "/#skills"],
                ["Contact", "/#contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} onClick={() => setMenu(false)}>
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <button type="button" onClick={() => setView("modern")} data-testid="retro-menu-back">
                  ↩ Back to normal view
                </button>
              </li>
            </ul>
          )}
        </div>
        <span className="retro-tab" aria-hidden>
          ▣ aniq_haider.html
        </span>
        <div className="retro-tray">
          <button type="button" className="retro-back" onClick={() => setView("modern")} data-testid="retro-back">
            ↩ Back to normal view
          </button>
          {clock && <time className="retro-clock">{clock}</time>}
        </div>
      </nav>
      </>
    );
  }

  if (!nudge) return noteEl;
  return (
    <aside
      aria-label="Try the edgy view"
      data-testid="view-nudge"
      className="view-nudge fixed inset-x-4 bottom-4 z-[60] rounded-2xl border border-line bg-surface p-4 shadow-2xl sm:left-auto sm:right-6 sm:bottom-6 sm:w-[21rem]"
    >
      <p className="text-sm font-semibold">
        <span aria-hidden className="mr-1 text-accent">
          ✦
        </span>
        Want to see this site the edgy way?
      </p>
      <p className="mt-1 text-sm text-muted">A loud, very 90s version of the same page. One click brings you back.</p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => {
            dismiss();
            setView("retro");
          }}
          data-testid="nudge-accept"
          className="inline-flex h-10 items-center rounded-full bg-accent-fill px-4 text-sm font-semibold text-white transition hover:brightness-110"
        >
          Show me
        </button>
        <button
          type="button"
          onClick={dismiss}
          data-testid="nudge-dismiss"
          className="inline-flex h-10 items-center rounded-full border border-line bg-surface-2 px-4 text-sm font-semibold transition hover:border-accent"
        >
          No thanks
        </button>
      </div>
    </aside>
  );
}
