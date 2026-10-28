"use client";

import { Fragment, useEffect, useId, useRef, useState } from "react";
import type { FlowLane, PostVideo, Tone } from "@/lib/posts";

// FigJam-style sticky-note palette. Pastel backgrounds with dark text stay legible in both themes.
const tones: Record<Tone, string> = {
  yellow: "bg-[#fff0a8] border-[#e6d36b]",
  blue: "bg-[#cfe6ff] border-[#8fc0f2]",
  green: "bg-[#c9f0d2] border-[#86d29a]",
  pink: "bg-[#ffd3dc] border-[#f09bad]",
  purple: "bg-[#e1d4ff] border-[#b59df0]",
  gray: "bg-[#e6e8ec] border-[#bcc1ca]",
};

function Arrow() {
  return (
    <span aria-hidden className="flex shrink-0 items-center justify-center text-accent">
      <svg className="h-6 w-6 rotate-90 md:rotate-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </span>
  );
}

type View = "diagram" | "animation";

export default function FlowDiagram({
  title,
  caption,
  lanes,
  video,
}: {
  title: string;
  caption?: string;
  lanes: FlowLane[];
  video?: PostVideo;
}) {
  const id = useId();
  // A post with an animation opens on it; the diagram is one tab away (and stays in the page for search engines).
  const [view, setView] = useState<View>(video ? "animation" : "diagram");
  const videoRef = useRef<HTMLVideoElement>(null);
  // Browsers only autoplay muted video, so it starts silent; the Sound button (or the player's own volume control) turns the lofi track on.
  const [muted, setMuted] = useState(true);
  const tabs: { id: View; label: string }[] = video
    ? [
        { id: "diagram", label: "Diagram" },
        { id: "animation", label: "Animation" },
      ]
    : [];

  // The video plays only while it is on screen, so it does not run unseen further down the page.
  useEffect(() => {
    const el = videoRef.current;
    if (!el || view !== "animation") return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void el.play().catch(() => {});
      else el.pause();
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [view]);

  const choose = (next: View) => {
    setView(next);
    if (next === "diagram") videoRef.current?.pause();
  };

  // Arrow keys move between the two tabs, as a tablist should.
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    const next: View = e.key === "ArrowLeft" || e.key === "Home" ? "diagram" : "animation";
    choose(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  };

  return (
    <figure
      className="my-10 rounded-3xl border border-line bg-surface p-5 md:p-8"
      data-testid="flow-diagram"
    >
      <figcaption className="mb-6 flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <span className="min-w-0 flex-[1_1_18rem]">
          <span className="block text-sm font-semibold uppercase tracking-[0.18em] text-accent">{title}</span>
          {caption && <span className="mt-1 block text-sm text-muted">{caption}</span>}
        </span>
        {video && (
          <span
            role="tablist"
            aria-label={`${title}: choose a view`}
            onKeyDown={onKey}
            className="inline-flex shrink-0 rounded-full border border-line bg-surface-2 p-1"
          >
            {tabs.map((t) => (
              <button
                key={t.id}
                id={`${id}-tab-${t.id}`}
                role="tab"
                type="button"
                aria-selected={view === t.id}
                aria-controls={`${id}-panel-${t.id}`}
                tabIndex={view === t.id ? 0 : -1}
                data-testid={`flow-tab-${t.id}`}
                onClick={() => choose(t.id)}
                className={`min-h-10 rounded-full px-4 text-sm font-semibold transition-colors ${
                  view === t.id ? "bg-accent-fill text-white" : "text-muted hover:text-fg"
                }`}
              >
                {t.label}
              </button>
            ))}
          </span>
        )}
      </figcaption>

      <div
        id={`${id}-panel-diagram`}
        role={video ? "tabpanel" : undefined}
        aria-labelledby={video ? `${id}-tab-diagram` : undefined}
        hidden={view !== "diagram"}
        className="space-y-7"
      >
        {lanes.map((lane, li) => (
          <div key={li}>
            {lane.title && (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">{lane.title}</p>
            )}
            <ol
              className="flex flex-col items-stretch gap-1 md:grid md:items-stretch md:gap-2"
              style={{ gridTemplateColumns: lane.nodes.map((_, i) => (i < lane.nodes.length - 1 ? "minmax(0,1fr) auto" : "minmax(0,1fr)")).join(" ") }}
            >
              {lane.nodes.map((n, i) => (
                <Fragment key={n.label}>
                  <li
                    className={`rounded-xl border-2 p-3.5 text-[#1c1c1c] shadow-[2px_3px_0_rgba(0,0,0,0.12)] ${tones[n.tone ?? "gray"]}`}
                  >
                    <div className="text-sm font-bold leading-snug">{n.label}</div>
                    {n.sub && <div className="mt-1 text-xs leading-snug opacity-80">{n.sub}</div>}
                  </li>
                  {i < lane.nodes.length - 1 && (
                    <li aria-hidden className="flex items-center justify-center self-center">
                      <Arrow />
                    </li>
                  )}
                </Fragment>
              ))}
            </ol>
          </div>
        ))}
      </div>

      {video && (
        <div
          id={`${id}-panel-animation`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-animation`}
          hidden={view !== "animation"}
        >
          {/* The file is only requested once the Animation tab is opened. */}
          {view === "animation" && (
            <div className="relative">
              <video
                ref={videoRef}
                data-testid="flow-video"
                className="aspect-video w-full rounded-2xl border border-line bg-black"
                src={video.src}
                poster={video.poster}
                controls
                playsInline
                muted={muted}
                onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
                loop
                preload="metadata"
                aria-label={video.label}
              >
                Your browser can't play this video. Use the Diagram tab instead.
              </video>
              <button
                type="button"
                data-testid="flow-sound"
                aria-pressed={!muted}
                onClick={() => setMuted((m) => !m)}
                className="absolute right-3 top-3 inline-flex min-h-10 items-center gap-2 rounded-full bg-black/70 px-4 text-sm font-semibold text-white backdrop-blur hover:bg-black/85"
              >
                <svg aria-hidden className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 5 6 9H3v6h3l5 4z" />
                  {muted ? <path d="m16 9 5 6m0-6-5 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 6a9 9 0 0 1 0 12" />}
                </svg>
                {muted ? "Sound on" : "Sound off"}
              </button>
            </div>
          )}
        </div>
      )}
    </figure>
  );
}
