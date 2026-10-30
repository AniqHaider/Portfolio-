import Link from "next/link";
import Reveal from "./Reveal";
import { formatPostDate, posts } from "@/lib/posts";
import { education, experience, profile, skills, stats } from "@/lib/data";

function Shell({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl scroll-mt-28 px-6 py-24 md:px-10">
      <Reveal>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
        <h2 className="mb-12 max-w-3xl text-balance text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-tight tracking-tight">
          {title}
        </h2>
      </Reveal>
      {children}
    </section>
  );
}

export function About() {
  return (
    <Shell id="about" eyebrow="About" title="Turning ambiguous requirements into clean, scalable systems.">
      <Reveal>
        <p className="max-w-3xl text-lg leading-relaxed text-muted">{profile.summary}</p>
      </Reveal>
      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.07}>
            <div className="rounded-3xl border border-line bg-surface p-6">
              <div className="text-4xl font-bold tracking-tight text-accent">{s.value}</div>
              <div className="mt-2 text-sm text-muted">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Shell>
  );
}

export function Experience() {
  return (
    <Shell id="experience" eyebrow="Experience" title="Production work across web platforms, fintech and documents.">
      {experience.map((job) => (
        <div key={job.company}>
          <Reveal>
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-2xl font-semibold">{job.company}</h3>
              <p className="text-sm text-muted">
                {job.place} · {job.period}
              </p>
            </div>
            <ol className="mb-10 flex flex-wrap items-center gap-2 text-sm" aria-label="Career progression">
              {job.progression.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span
                    className={`rounded-full border px-3 py-1 ${
                      i === job.progression.length - 1
                        ? "border-accent bg-accent-soft font-semibold text-accent"
                        : "border-line text-muted"
                    }`}
                  >
                    {step}
                  </span>
                  {i < job.progression.length - 1 && <span className="text-muted">→</span>}
                </li>
              ))}
            </ol>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-2">
            {job.projects.map((p, i) => (
              <Reveal key={p.name} delay={(i % 2) * 0.08} className={i === 0 ? "lg:col-span-2" : ""}>
                <article
                  data-testid={`project-${p.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="h-full rounded-3xl border border-line bg-surface p-7 transition hover:border-accent/60"
                >
                  <div className="mb-1 flex flex-wrap items-center gap-3">
                    <h4 className="text-xl font-semibold">{p.name}</h4>
                    <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                      {p.tag}
                    </span>
                  </div>
                  <p className="mb-4 text-muted">{p.blurb}</p>
                  <ul className="space-y-2.5 text-[0.95rem] leading-relaxed">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      ))}
    </Shell>
  );
}

export function Writing() {
  return (
    <Shell id="writing" eyebrow="Writing" title="Notes on the tools I build.">
      <div className="grid gap-5 md:grid-cols-2">
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08}>
            <Link
              href={`/blog/${p.slug}`}
              data-testid={`blog-tile-${p.slug}`}
              className="group flex h-full flex-col rounded-3xl border border-line bg-surface p-6 transition hover:-translate-y-1 hover:border-accent/60"
            >
              <span className="mb-4 w-fit rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                {p.tag}
              </span>
              <time dateTime={p.date} className="mb-2 block text-xs text-muted">
                {formatPostDate(p.date)}
              </time>
              <h3 className="text-xl font-semibold leading-snug tracking-tight">{p.title}</h3>
              <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">{p.summary}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.stack.slice(0, 3).map((t) => (
                  <span key={t} className="rounded-full border border-line bg-surface-2 px-2.5 py-0.5 text-xs">
                    {t}
                  </span>
                ))}
              </div>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                {p.readTime} · Read{" "}
                <span aria-hidden className="transition group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Shell>
  );
}

export function Skills() {
  return (
    <Shell id="skills" eyebrow="Skills" title="A full-stack toolkit, extended with AI-augmented workflows.">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.title} delay={(i % 3) * 0.07}>
            <div className="h-full rounded-3xl border border-line bg-surface p-6">
              <h3 className="mb-4 font-semibold">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full border border-line bg-surface-2 px-3 py-1 text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Shell>
  );
}

export function Education() {
  return (
    <Shell id="education" eyebrow="Education" title="Where I learned the fundamentals.">
      <div className="grid gap-5 md:grid-cols-2">
        {education.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.08}>
            <div className="rounded-3xl border border-line bg-surface p-6">
              <h3 className="text-lg font-semibold">{e.title}</h3>
              <p className="mt-1 text-muted">{e.place}</p>
              <p className="mt-3 text-sm text-accent">{e.period}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Shell>
  );
}

export function Contact() {
  return (
    <section id="contact" className="mx-auto w-full max-w-6xl scroll-mt-28 px-6 pb-28 pt-12 md:px-10">
      <Reveal>
        <div className="rounded-[2.5rem] border border-line bg-surface p-10 text-center md:p-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">Contact</p>
          <h2 className="mx-auto max-w-2xl text-balance text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-tight tracking-tight">
            Let&apos;s build something that scales.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Open to software engineering roles, full-stack and frontend-lead work, and AI-integrated products.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              data-testid="contact-email"
              className="inline-flex h-12 items-center rounded-full bg-accent-fill px-7 font-semibold text-white transition hover:brightness-110"
            >
              {profile.email}
            </a>
            <a
              href="/Aniq-Haider-Resume.pdf"
              download="Aniq-Haider-Resume.pdf"
              data-testid="contact-resume"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-accent bg-accent-soft px-7 font-semibold text-accent transition hover:bg-accent-fill hover:text-white"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 3v12M7 10l5 5 5-5M4 20h16" />
              </svg>
              Download resume
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              data-testid="contact-linkedin"
              className="inline-flex h-12 items-center rounded-full border border-line bg-surface-2 px-7 font-semibold transition hover:border-accent"
            >
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              data-testid="contact-github"
              className="inline-flex h-12 items-center rounded-full border border-line bg-surface-2 px-7 font-semibold transition hover:border-accent"
            >
              GitHub
            </a>
            <a
              href={profile.phoneHref}
              data-testid="contact-phone"
              className="inline-flex h-12 items-center rounded-full border border-line bg-surface-2 px-7 font-semibold transition hover:border-accent"
            >
              {profile.phone}
            </a>
          </div>
        </div>
      </Reveal>
      <footer className="mt-12 text-center text-sm text-muted">
        © {new Date().getFullYear()} {profile.name} · {profile.location}
      </footer>
    </section>
  );
}
