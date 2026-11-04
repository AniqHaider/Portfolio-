"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/* One-time hint, shown a few seconds after arrival, pointing at the ★ that opens the
   animated version of the site. Mirrors the old nudge's format. Lives on the classic home. */
const KEY = "studioNudge";

export default function ViewNudge() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = !!localStorage.getItem(KEY);
    } catch {}
    if (seen) return;
    const t = setTimeout(() => setShow(true), 5000);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setShow(false);
    try {
      localStorage.setItem(KEY, "dismissed");
    } catch {}
  };

  useEffect(() => {
    if (!show) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show]);

  if (!show) return null;

  return (
    <aside
      aria-label="See the animated version"
      data-testid="view-nudge"
      className="view-nudge fixed inset-x-4 bottom-4 z-[60] rounded-2xl border border-line bg-surface p-4 shadow-2xl sm:bottom-6 sm:left-auto sm:right-6 sm:w-[21rem]"
    >
      <p className="text-sm font-semibold">
        <span aria-hidden className="mr-1 text-accent">✦</span>
        Want to see this site come alive?
      </p>
      <p className="mt-1 text-sm text-muted">
        An animated, editorial cut of the same work — tap the ★ any time to switch.
      </p>
      <div className="mt-3 flex gap-2">
        <Link
          href="/studio"
          prefetch
          onClick={dismiss}
          data-testid="nudge-accept"
          className="inline-flex h-10 items-center rounded-full bg-accent-fill px-4 text-sm font-semibold text-white transition hover:brightness-110"
        >
          Show me
        </Link>
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
