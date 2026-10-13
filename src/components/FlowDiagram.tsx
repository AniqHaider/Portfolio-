import { Fragment } from "react";
import type { FlowLane, Tone } from "@/lib/posts";

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

export default function FlowDiagram({
  title,
  caption,
  lanes,
}: {
  title: string;
  caption?: string;
  lanes: FlowLane[];
}) {
  return (
    <figure
      className="my-10 rounded-3xl border border-line bg-surface p-5 md:p-8"
      data-testid="flow-diagram"
    >
      <figcaption className="mb-6">
        <span className="block text-sm font-semibold uppercase tracking-[0.18em] text-accent">{title}</span>
        {caption && <span className="mt-1 block text-sm text-muted">{caption}</span>}
      </figcaption>
      <div className="space-y-7">
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
    </figure>
  );
}
