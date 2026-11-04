import Image from "next/image";
import Link from "next/link";
import { formatPostDate, posts } from "@/lib/posts";
import { education, experience, profile, skills, stats } from "@/lib/data";

function Shell({
  id,
  num,
  eyebrow,
  title,
  children,
}: {
  id: string;
  num: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mx-auto max-w-[88rem] px-6 md:px-10">
        <div className="rule" />
        <header className="grid gap-x-10 gap-y-5 pt-10 md:grid-cols-12">
          <p className="label md:col-span-4">
            {num} &nbsp;/&nbsp; {eyebrow}
          </p>
          <h2
            data-reveal
            className="font-serif text-[clamp(1.9rem,4vw,3.25rem)] font-light leading-[1.08] tracking-[-0.01em] md:col-span-8"
          >
            {title}
          </h2>
        </header>
        <div className="pb-16 pt-10 md:pb-24">{children}</div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <Shell id="about" num="01" eyebrow="About" title="Turning ambiguous requirements into clean, scalable systems.">
      <p data-reveal className="max-w-3xl text-[1.15rem] leading-relaxed text-muted md:ml-[33.33%]">
        {profile.summary}
      </p>
      <div className="mt-16 grid grid-cols-2 gap-px border-y border-line bg-line md:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label} data-reveal data-reveal-delay={i * 0.06} className="bg-bg p-7">
            <div className="font-serif text-[clamp(2rem,4vw,3rem)] font-light leading-none text-accent">{s.value}</div>
            <div className="label mt-3">{s.label}</div>
          </div>
        ))}
      </div>
    </Shell>
  );
}

export function Experience() {
  return (
    <Shell id="experience" num="02" eyebrow="Selected Work" title="Production work across web platforms, fintech and documents.">
      {experience.map((job) => (
        <div key={job.company}>
          <div data-reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-b border-line-strong pb-6">
            <h3 className="font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-light leading-none">{job.company}</h3>
            <p className="label">{job.place} · {job.period}</p>
          </div>
          <ol data-reveal className="flex flex-wrap items-center gap-x-3 gap-y-2 py-6 text-sm" aria-label="Career progression">
            {job.progression.map((step, i) => (
              <li key={step} className="flex items-center gap-3">
                <span className={i === job.progression.length - 1 ? "font-semibold text-accent" : "text-muted"}>{step}</span>
                {i < job.progression.length - 1 && <span aria-hidden className="text-muted/50">→</span>}
              </li>
            ))}
          </ol>

          <div>
            {job.projects.map((p, i) => (
              <article
                key={p.name}
                data-reveal
                data-testid={`project-${p.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="grid gap-x-10 gap-y-5 border-b border-line py-11 md:grid-cols-12"
              >
                <div className="md:col-span-4">
                  <span className="label text-muted/70">{String(i + 1).padStart(2, "0")}</span>
                  <h4 className="mt-3 font-serif text-[1.6rem] font-light leading-tight">{p.name}</h4>
                  <p className="label mt-3 text-accent">{p.tag}</p>
                </div>
                <div className="md:col-span-8">
                  <p className="text-[1.1rem] leading-relaxed">{p.blurb}</p>
                  <ul className="mt-6 space-y-3.5 text-[1rem] leading-relaxed text-muted">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-4">
                        <span className="mt-[0.72em] h-px w-5 shrink-0 bg-accent" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </Shell>
  );
}

export function Writing() {
  return (
    <Shell id="writing" num="03" eyebrow="Writing" title="Notes on the tools I build.">
      <div className="grid gap-x-10 gap-y-16 md:grid-cols-2">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            data-testid={`blog-tile-${p.slug}`}
            data-reveal
            className="group block"
          >
            <div data-reveal="mask" className="relative aspect-[16/10] overflow-hidden rounded-sm bg-surface-2">
              <Image
                src={p.video?.poster ?? "/portrait.jpg"}
                alt=""
                fill
                sizes="(max-width: 767px) 100vw, 44vw"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
              />
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="label text-accent">{p.tag}</span>
              <time dateTime={p.date} className="label text-muted/70">{formatPostDate(p.date)}</time>
            </div>
            <h3 className="mt-3 font-serif text-[1.65rem] font-light leading-snug tracking-tight">{p.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{p.summary}</p>
            <span className="label mt-5 inline-flex items-center gap-2 text-fg">
              {p.readTime} · Read
              <span aria-hidden className="text-accent transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        ))}
      </div>
    </Shell>
  );
}

export function Skills() {
  return (
    <Shell id="skills" num="04" eyebrow="Capabilities" title="A full-stack toolkit, extended with AI-augmented workflows.">
      <div className="border-b border-line">
        {skills.map((group) => (
          <div key={group.title} data-reveal className="grid gap-x-10 gap-y-4 border-t border-line py-7 md:grid-cols-12">
            <h3 className="label pt-1.5 md:col-span-3">{group.title}</h3>
            <ul className="flex flex-wrap gap-x-6 gap-y-2.5 md:col-span-9">
              {group.items.map((item) => (
                <li key={item} className="text-[1.08rem] text-fg/90">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Shell>
  );
}

export function Education() {
  return (
    <Shell id="education" num="05" eyebrow="Education" title="Where I learned the fundamentals.">
      <div className="grid gap-px border-y border-line bg-line md:grid-cols-2">
        {education.map((e, i) => (
          <div key={e.title} data-reveal data-reveal-delay={i * 0.06} className="bg-bg p-8">
            <h3 className="font-serif text-2xl font-light leading-tight">{e.title}</h3>
            <p className="mt-2 text-muted">{e.place}</p>
            <p className="label mt-4 text-accent">{e.period}</p>
          </div>
        ))}
      </div>
    </Shell>
  );
}

const contactRows = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, testid: "contact-email", ext: false },
  { label: "LinkedIn", value: "in/aniq-haider", href: profile.linkedin, testid: "contact-linkedin", ext: true },
  { label: "GitHub", value: "@AniqHaider", href: profile.github, testid: "contact-github", ext: true },
  { label: "Phone", value: profile.phone, href: profile.phoneHref, testid: "contact-phone", ext: false },
];

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24">
      <div className="mx-auto max-w-[88rem] px-6 md:px-10">
        <div className="rule" />
        <div className="grid gap-x-10 gap-y-10 pt-10 md:grid-cols-12">
          <p className="label md:col-span-4">06 &nbsp;/&nbsp; Contact</p>
          <div className="pb-6 md:col-span-8">
            <h2 data-reveal className="font-serif text-[clamp(2.1rem,5vw,4rem)] font-light leading-[1.04] tracking-[-0.01em]">
              Let&apos;s build something that scales.
            </h2>
            <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Open to software engineering roles, full-stack and frontend-lead work, and AI-integrated products.
            </p>

            <div data-reveal className="mt-12 flex flex-col border-t border-line">
              {contactRows.map((r) => (
                <a
                  key={r.testid}
                  href={r.href}
                  data-testid={r.testid}
                  {...(r.ext ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="group flex items-center justify-between gap-6 border-b border-line py-5 transition-colors hover:text-accent"
                >
                  <span className="font-serif text-xl font-light md:text-2xl">{r.value}</span>
                  <span className="label flex items-center gap-3">
                    {r.label}
                    <span aria-hidden className="text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                  </span>
                </a>
              ))}
            </div>

            <a
              href="/Aniq-Haider-Resume.pdf"
              download="Aniq-Haider-Resume.pdf"
              data-testid="contact-resume"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-accent px-6 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent-fill hover:text-bg"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 3v12M7 10l5 5 5-5M4 20h16" />
              </svg>
              Download résumé
            </a>
          </div>
        </div>

        <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line py-10">
          <p className="label">© {new Date().getFullYear()} {profile.name}</p>
          <p className="label">{profile.location}</p>
        </footer>
      </div>
    </section>
  );
}
