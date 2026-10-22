export type Tone = "yellow" | "blue" | "green" | "pink" | "purple" | "gray";

export type FlowNode = { label: string; sub?: string; tone?: Tone };
export type FlowLane = { title?: string; note?: string; nodes: FlowNode[] };

export type Block =
  | { t: "p"; text: string }
  | { t: "h"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "callout"; text: string }
  | { t: "diagram"; title: string; caption?: string; lanes: FlowLane[] };

export type Post = {
  slug: string;
  date: string;
  title: string;
  summary: string;
  tag: string;
  readTime: string;
  stack: string[];
  blocks: Block[];
};

export const posts: Post[] = [
  {
    slug: "cardify",
    date: "2026-10-13",
    title: "Cardify: restyling a storefront's product cards without touching its code",
    summary:
      "A drop-in app for the Ratio platform, live on 16 storefronts. A merchant flips one switch and the storefront's product cards are replaced by one of five designs, safely and with no reload.",
    tag: "Platform app",
    readTime: "5 min read",
    stack: ["Lit", "Fastify", "MySQL", "React", "Playwright"],
    blocks: [
      {
        t: "p",
        text: "Merchants on a commerce platform often want a different look for their product cards, but changing card markup means touching every widget that renders one: collection grids, carousels, search results and related products. I built Cardify as an app that does it from the outside. The merchant picks a design in an admin screen, and the storefront's own cards are swapped live.",
      },
      {
        t: "diagram",
        title: "How a card gets replaced",
        caption: "The storefront only exposes a few data attributes. Everything else is loaded on demand.",
        lanes: [
          {
            title: "Setup",
            nodes: [
              { label: "Merchant admin", sub: "React + Vite. Switch on, pick a design and colours", tone: "yellow" },
              { label: "Settings API", sub: "Fastify + MySQL. Admin writes are key-protected", tone: "blue" },
              { label: "Public config", sub: "Read-only endpoint the storefront loader calls", tone: "green" },
            ],
          },
          {
            title: "On the storefront",
            nodes: [
              { label: "Tiny loader", sub: "0.5 KB gzipped. Fetches the config", tone: "purple" },
              { label: "Config says off?", sub: "Do nothing. Native cards stay", tone: "gray" },
              { label: "Load widget", sub: "About 10 KB gzipped, imported lazily", tone: "blue" },
              { label: "Overlay", sub: "Hide each native card, mount a Cardify card in its cell", tone: "green" },
            ],
          },
          {
            title: "When a shopper clicks",
            nodes: [
              { label: "Cardify card", sub: "Click or quick-buy", tone: "yellow" },
              { label: "Hidden native link", sub: "The click is delegated to the store's own element", tone: "pink" },
              { label: "Store behaviour runs", sub: "Routing, quick-buy popup and analytics, unchanged", tone: "green" },
            ],
          },
        ],
      },
      { t: "h", text: "Design choices that matter" },
      {
        t: "ul",
        items: [
          "Purely cosmetic. A card uses exactly the data the native card already renders, so there is no new data contract for the storefront to maintain.",
          "Native cards are hidden, never removed. The overlay mounts inside the same cell, so the store's grid and carousel layout is untouched, and a MutationObserver picks up cards that appear later.",
          "Behaviour is delegated back to the host. Clicking a Cardify card clicks the hidden native link, so the store's own routing, popups and tracking keep running.",
          "It fails safe. If the backend is down, the config call errors or the bundle is blocked, the shopper simply sees the original cards.",
          "No polling. The config refreshes on page load and when the tab regains focus. A timer would make every visitor's tab hit the backend.",
          "The server refuses to start without an admin key, so a missing setting can never mean an open admin.",
        ],
      },
      { t: "h", text: "Five designs, one structure" },
      {
        t: "p",
        text: "Classic, minimal, overlay, hover-reveal and editorial all share one DOM structure and differ only in CSS. That is why click and quick-buy bridging works for every design for free. Merchants can tune accent, text and background colours, corner radius, image shape and toggles for the badge, quick-buy, rating and compare-at price, all validated with a shared zod schema. Adding a sixth design is a registry entry plus one CSS block.",
      },
      {
        t: "callout",
        text: "Status: live in production on 16 storefronts on the Ratio platform, backed by unit tests and a headless-Chromium end-to-end suite.",
      },
    ],
  },
  {
    slug: "agent-cloning-pipeline",
    date: "2026-10-13",
    title: "A multi-agent pipeline that clones live sites into production components",
    summary:
      "Five specialised agents turn a URL or a Figma frame into reviewed, build-verified UI, one section at a time, and learn from every run.",
    tag: "AI engineering",
    readTime: "5 min read",
    stack: ["Claude Code", "Subagents", "Playwright", "Figma MCP", "Next.js"],
    blocks: [
      {
        t: "p",
        text: "Rebuilding a page section by hand means inspecting the DOM, copying design tokens, chasing hover states and fixing responsive breakpoints. It is slow, and it is mostly mechanical. I built a pipeline of Claude Code subagents that does the mechanical part and leaves the review to a human.",
      },
      {
        t: "diagram",
        title: "How a clone run flows",
        caption: "Sections run strictly one at a time, so each agent keeps a small, clean context.",
        lanes: [
          {
            title: "Once per page",
            nodes: [
              { label: "Input", sub: "Live URL or Figma frames", tone: "yellow" },
              { label: "Phase 0 · Discover", sub: "Scroll, find sections, capture 4 breakpoints", tone: "blue" },
              { label: "Pick sections", sub: "One, several, or all", tone: "gray" },
            ],
          },
          {
            title: "For each section, in order",
            nodes: [
              { label: "Phase 1 · Harvest", sub: "Tokens, assets, hover and scroll behaviour, screenshots", tone: "blue" },
              { label: "Compress", sub: "Shrink the handoff JSON before the next agent reads it", tone: "purple" },
              { label: "Phase 2 · Build UI", sub: "Widget code wired into the page template", tone: "green" },
              { label: "Verify build", sub: "Pass moves on. Fail retries, up to 3 times", tone: "pink" },
            ],
          },
          {
            title: "After the run",
            nodes: [
              { label: "Hill-climb", sub: "Mine notes and failures into reusable rules", tone: "yellow" },
              { label: "learnings.md", sub: "Read by every agent at the start of the next run", tone: "gray" },
            ],
          },
        ],
      },
      { t: "h", text: "Why separate agents" },
      {
        t: "ul",
        items: [
          "Each phase has one job and one output file (sections.json, harvest.json, the generated widget). A failed phase can be re-run without redoing the others.",
          "The main session orchestrates instead of a nested orchestrator agent. That saves context, and I can step in between phases.",
          "A Figma branch replaces only the discovery and harvest agents. It emits the same files, so the UI agent is reused untouched.",
        ],
      },
      { t: "h", text: "What keeps it reliable" },
      {
        t: "ul",
        items: [
          "A hard build gate: a section only counts as done when the project builds. Errors go back to the agent for up to three retries.",
          "Guardrails written into the pipeline: shared directories are off limits, and protected files may only be changed by commenting out the original, never deleting it.",
          "A learning loop. Every run's notes and failures are distilled into rules the next run reads, so the same mistake is not repeated.",
        ],
      },
      {
        t: "callout",
        text: "The result: new sections that used to take days now take hours, and most of that time is human review instead of pixel-pushing.",
      },
    ],
  },
  {
    slug: "github-repo-mcp",
    date: "2026-10-13",
    title: "github-repo-mcp: letting an AI explore any GitHub repo without cloning it by hand",
    summary:
      "A small MCP server that clones, maps, searches and reads any repository on demand, with a local cache and a symbol map built with tree-sitter.",
    tag: "Developer tooling",
    readTime: "4 min read",
    stack: ["MCP", "TypeScript", "Bun", "tree-sitter", "ripgrep"],
    blocks: [
      {
        t: "p",
        text: "When an assistant needs to understand a codebase it does not have locally, the usual options are pasting files or cloning by hand. I wanted something better: point the assistant at owner/repo and let it explore, the way a developer would. So I wrote github-repo-mcp, a local Model Context Protocol server.",
      },
      {
        t: "diagram",
        title: "Architecture",
        caption: "The server runs over stdio. Repos are cloned once and reused from a local cache.",
        lanes: [
          {
            title: "Request path",
            nodes: [
              { label: "Claude", sub: "MCP client", tone: "yellow" },
              { label: "github-repo-mcp", sub: "stdio server, written in TypeScript on Bun", tone: "blue" },
              { label: "Local clone cache", sub: "~/.cache/github-repo-mcp/owner/repo", tone: "green" },
              { label: "GitHub", sub: "Cloned once, pulled on refresh", tone: "gray" },
            ],
          },
          {
            title: "Five tools",
            nodes: [
              { label: "load_repo", sub: "Clone or reuse, return a summary", tone: "purple" },
              { label: "get_repo_map", sub: "Files and exported symbols", tone: "purple" },
              { label: "grep", sub: "Regex search with context", tone: "purple" },
              { label: "read_file", sub: "A file or a line range", tone: "purple" },
              { label: "refresh_repo", sub: "Pull latest, invalidate the map", tone: "purple" },
            ],
          },
        ],
      },
      { t: "h", text: "How it works" },
      {
        t: "ul",
        items: [
          "load_repo clones a repo (or reuses the cached copy) and returns languages, file count, a top-level tree and a README excerpt, enough to decide where to look next.",
          "get_repo_map builds a structural map of paths and exported symbols. TypeScript gets a fast extraction path, and other languages such as Python are parsed with tree-sitter.",
          "grep uses ripgrep for speed and falls back to a pure-JS search when ripgrep is not installed.",
          "A GitHub token is optional and only needed for private repos. Path guards keep reads inside the cloned repo.",
        ],
      },
      { t: "h", text: "The workflow it enables" },
      {
        t: "p",
        text: "Load the repo, read the map to find the right module, grep for the call sites, then read only the lines that matter. The assistant spends its context on understanding the code and not on scrolling through it.",
      },
      {
        t: "callout",
        text: "It is a small server with a deliberately small surface: five tools, one cache directory, and tests around the guards and the parser.",
      },
    ],
  },
  {
    slug: "editor-update-system",
    date: "2026-10-13",
    title: "An editor update system with a human approval gate on every write",
    summary:
      "A safe workflow for reading and changing a visual editor's theme and template data through its APIs, with confirmation before each mutation and a backup before each delete.",
    tag: "Platform tooling",
    readTime: "4 min read",
    stack: ["REST APIs", "Claude Code", "Runbooks", "Safety gates"],
    blocks: [
      {
        t: "p",
        text: "A visual editor stores each page as structured template data behind an API. Changing that data in bulk is powerful, and also easy to get catastrophically wrong. I built an editor update system around one rule: reads are free, writes are never automatic.",
      },
      {
        t: "diagram",
        title: "Safe change workflow",
        caption: "Every mutating call passes through the same gate. Nothing is batched under one approval.",
        lanes: [
          {
            title: "Understand",
            nodes: [
              { label: "API catalog", sub: "Every endpoint recorded with a verified response shape", tone: "yellow" },
              { label: "GET and inspect", sub: "Reads run freely to see the real data", tone: "green" },
              { label: "Plan the change", sub: "Exact request body, reviewed before it is sent", tone: "blue" },
            ],
          },
          {
            title: "Change",
            nodes: [
              { label: "Approval gate", sub: "A person confirms each POST, PUT, PATCH or DELETE", tone: "pink" },
              { label: "Backup first", sub: "For deletes, save the full template JSON to disk", tone: "purple" },
              { label: "Mutate", sub: "One call at a time", tone: "blue" },
              { label: "Verify with GET", sub: "Confirm the saved shape matches the plan", tone: "green" },
            ],
          },
        ],
      },
      { t: "h", text: "The design decisions" },
      {
        t: "ul",
        items: [
          "An isolated workspace with its own instructions, so nothing bleeds into other projects and the rules are impossible to miss.",
          "A growing, append-only API catalog. Each endpoint is recorded with its method, whether it mutates, a working request and the response shape I actually observed.",
          "Backup before delete is mandatory. A deleted template is saved with a timestamp, and restoring it is a single PUT of the saved page configuration.",
          "Approvals do not carry over: a similar call approved earlier in the session does not authorise the next one.",
        ],
      },
      {
        t: "callout",
        text: "The goal is speed without fear. Automation does the tedious inspection and bookkeeping, and a person keeps the final say on anything that changes live data.",
      },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
