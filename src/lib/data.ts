export const profile = {
  name: "Aniq Haider",
  role: "Software Engineer",
  location: "Gurugram, India",
  email: "aniqhaider@gmail.com",
  phone: "+91 83188 42530",
  phoneHref: "tel:+918318842530",
  github: "https://github.com/AniqHaider",
  linkedin: "https://linkedin.com/in/aniq-haider-71965b24b",
  headline: ["Software engineer building fast, scalable products with", "AI"],
  tagline:
    "I'm Aniq Haider. I design and ship full-stack web apps, APIs and AI-powered developer tools.",
  summary:
    "Software engineer (3+ years) at a product-based company, shipping production web platforms, AI-integrated fintech tools and large-scale document-processing systems. I work across the stack: React and Next.js on the frontend; Node.js, NestJS, Python and FastAPI services; MySQL schema design; and AWS and Docker deployments. Lately I build AI-augmented engineering tooling, including agent pipelines, MCP servers and internal platforms, that compress hours of work into a single prompt.",
};

export const stats = [
  { value: "3+", label: "Years shipping" },
  { value: "7+", label: "Storefronts shipped" },
  { value: "SDE 2", label: "Promoted 3 times" },
  { value: "100%", label: "Lighthouse scores" },
];

export const experience = [
  {
    company: "Primathon Technology Ventures",
    period: "Dec 2023 – Present",
    place: "Indore, India",
    progression: ["SDE Intern", "Associate SDE", "SDE 1", "SDE 2"],
    projects: [
      {
        name: "Ratio",
        tag: "Multi-tenant commerce platform",
        blurb:
          "Multi-tenant Next.js storefront platform on a custom commerce stack, built as a Shopify alternative for D2C brands.",
        points: [
          "Architected and shipped production storefronts for 7+ merchants, handling cart, checkout, payment and product-API differences vs. Shopify.",
          "Built a widget-based page-builder architecture (variant dispatcher, theme tokens, scoped CSS) with a visual editor, enabling brand-specific UI on one shared codebase.",
          "Built discount-migration and reviews-migration APIs that pull live data from Shopify into the platform's data model for zero-loss brand onboarding.",
          "Designed a custom order-confirmation package end to end (FE + BE) with post-purchase upsell and re-buy flows.",
          "Designed a multi-phase AI agent pipeline that pixel-perfect-clones live storefronts into Next.js, cutting new-section build time from days to hours.",
          "Shipped SEO infrastructure (dynamic sitemap, robots, canonical URLs, Google Merchant feed) and a reusable customer-reviews widget.",
        ],
      },
      {
        name: "Cardify",
        tag: "Live in production · Ratio app",
        blurb:
          "A drop-in app that swaps a storefront's product cards for alternative designs from a single admin switch, with no change to the store's own data.",
        points: [
          "Built the full stack: a Fastify + MySQL settings API, a Lit web-component SDK, and a React admin with live previews of five card designs.",
          "Overlay engine hides native cards (never removes them) and delegates clicks and quick-buy back to the host, so the store's own routing and analytics keep working.",
          "Fails safe: if the backend is down or the bundle is blocked, the native cards stay exactly as they were. The loader is 0.5 KB gzipped and the widget about 10 KB.",
          "Used in production, and covered by unit tests plus a headless-Chromium end-to-end regression suite.",
        ],
      },
      {
        name: "Axis Robo Advisory",
        tag: "AI-driven investment platform",
        blurb: "Frontend and backend work on an AI-integrated fintech product.",
        points: [
          "Built an AI-driven dynamic widget rendering system that adapts to unpredictable AI response shapes with zero UI breakage.",
          "Built backend APIs for large-scale PDF processing, structuring financial documents for downstream LLM use.",
          "Designed and implemented SSO across frontend and backend, and owned Docker containerization in production.",
          "Partnered with the backend AI team to lift response accuracy to 85–90%.",
        ],
      },
      {
        name: "Documitra",
        tag: "Document processing platform",
        blurb: "Large-scale document upload and processing.",
        points: [
          "Designed the MySQL database for the upload flow and optimized queries to cut API response time.",
          "Owned deployment and AWS infrastructure (S3, environment and config setup).",
          "Built the Notifications module and post-payment review flow from scratch, and drove payment integration end to end.",
        ],
      },
      {
        name: "CREST",
        tag: "Fintech",
        blurb: "Frontend technical lead on Next.js 15 + Zustand.",
        points: [
          "Own end-to-end UX architecture, secure data encryption and context-aware redirection flows.",
        ],
      },
    ],
  },
];

export const skills = [
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Zustand", "React Query", "GSAP", "Redux"],
  },
  {
    title: "Backend & Data",
    items: ["Node.js", "NestJS", "FastAPI", "Python", "REST APIs", "SSO / OAuth", "MySQL", "MongoDB"],
  },
  {
    title: "Cloud & Infra",
    items: ["AWS (S3)", "Docker", "CI/CD", "Git / GitHub", "Bun"],
  },
  {
    title: "Commerce",
    items: ["Ratio", "Custom checkout", "BFF proxy patterns", "Shopify migrations", "ISR caching", "SEO"],
  },
  {
    title: "AI-augmented dev",
    items: ["Claude Code agents", "MCP integrations", "Prompt engineering", "Agent pipelines"],
  },
  {
    title: "Testing & Tools",
    items: ["Jest", "React Testing Library", "Playwright", "Lighthouse", "Sentry", "Postman"],
  },
];

export const education = [
  { title: "Software Development Bootcamp", place: "Primathon Academy, Gurugram", period: "2023" },
  { title: "Bachelor of Science", place: "Shri Harishchandra College, Varanasi", period: "2019 – 2022" },
];
